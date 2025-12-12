import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';
import {
	PutItemCommand,
	GetItemCommand,
	UpdateItemCommand,
	QueryCommand,
} from '@aws-sdk/client-dynamodb';
import { client } from './client.mjs';
import {
	getProductsByIds,
	enrichItems,
	calculateTotal,
	trimFields,
	deleteAllItemsFromOrder,
} from '../utils/orderHelpers.mjs';
import { generateId } from '../utils/index.mjs';

export const createOrder = async ({
	items,
	userComment = '',
	staffComment = '',
	userId,
}) => {
	const orderId = generateId('order');
	const now = new Date().toISOString();
	const user = userId ? userId : generateId('guest');

	// Flatten all product IDs from items, extras, without, and includeDrink
	const allIds = [
		...new Set(
			items.flatMap((i) => [i.id, i.includeDrink || null]).filter(Boolean)
		),
	];

	// Fetch product details
	const productMap = await getProductsByIds(allIds);
	console.log('Product map', productMap);

	// Add includeDrinkName where applicable
	Object.values(productMap).forEach((p) => {
		if (p.includeDrink && productMap[p.includeDrink]) {
			p.includeDrinkName = productMap[p.includeDrink].name;
		}
	});

	// Enrich items with product data
	const fullItems = enrichItems(items, productMap);

	// Trim extras to only keep id, name, price
	const trimmedItems = fullItems.map((item) => ({
		...item,
	}));

	const total = calculateTotal(fullItems);

	const orderDBItem = {
		PK: 'ORDER',
		SK: `ORDER#${orderId}`,
		attribute: {
			user,
			userComment,
			staffComment,
			items: trimmedItems, // Saving the trimmed version of the data to not fill up the database with unneccesary information about the order
			total,
			createdAt: now,
			modifiedAt: now,
		},
		category: 'ORDER',
		status: 'pending',
		id: user,
		statusCategory: 'STATUS#ORDER',
	};
	console.log('orderDBItem: ', orderDBItem);

	// Save to DynamoDB
	await client.send(
		new PutItemCommand({
			TableName: 'mojjen-table',
			Item: marshall(orderDBItem, { removeUndefinedValues: true }),
		})
	);

	// Return trimmed version to frontend
	return {
		orderId,
		user,
		status: 'pending',
		items: trimmedItems,
		total,
		userComment,
		staffComment,
		createdAt: now,
		modifiedAt: now,
	};
};

export const cancelOrder = async (orderId) => {
	const key = {
		PK: { S: 'ORDER' },
		SK: { S: `ORDER#${orderId}` },
	};

	const getRes = await client.send(
		new GetItemCommand({
			TableName: 'mojjen-table',
			Key: key,
		})
	);

	if (!getRes.Item) {
		throw new Error(`Order med ID ${orderId} hittades inte.`);
	}
	const order = unmarshall(getRes.Item);

	deleteAllItemsFromOrder(order);

	const now = new Date().toISOString();

	await client.send(
		new UpdateItemCommand({
			TableName: 'mojjen-table',
			Key: key,
			UpdateExpression: `
			SET #status = :cancelled,
				modifiedAt = :now,
				#attribute.#items = :items,
				#attribute.#deleted = :deleted
		`,
			ExpressionAttributeNames: {
				'#status': 'status',
				'#attribute': 'attribute',
				'#items': 'items',
				'#deleted': 'deletedItems',
			},
			ExpressionAttributeValues: marshall({
				':cancelled': 'cancelled',
				':now': now,
				':items': order.attribute.items,
				':deleted': order.attribute.deletedItems,
			}),
		})
	);

	return {
		...order,
		status: 'cancelled',
		modifiedAt: now,
	};
};

export const changeOrder = async ({
	orderId,
	items,
	userComment,
	staffComment,
	status,
}) => {
	const key = { PK: { S: 'ORDER' }, SK: { S: `ORDER#${orderId}` } };

	// Hämta befintlig order
	const res = await client.send(
		new GetItemCommand({ TableName: 'mojjen-table', Key: key })
	);
	if (!res.Item) throw new Error(`Order ${orderId} hittades inte.`);
	const existing = unmarshall(res.Item);

	if (['completed'].includes(existing.status)) {
		throw new Error('Denna order kan inte längre ändras.');
	}

	const updateExprParts = [];
	const exprAttrNames = {};
	const exprAttrValues = {};
	const now = new Date().toISOString();

	// Villkorlig uppdatering av items
	let mergedItems = existing.attribute.items;

	// Uppdatera items om det finns nya
	if (items && Array.isArray(items)) {
		// Mergar varje item baserat på itemId
		mergedItems = existing.attribute.items.map((orig) => {
			const update = items.find((i) => i.itemId === orig.itemId);
			return update ? { ...orig, ...update } : orig; // Uppdatera eller behåll original
		});

		// Bygg update-expression EFTER att mergedItems är klart
		updateExprParts.push('#attr.#items = :items');
		exprAttrNames['#attr'] = 'attribute';
		exprAttrNames['#items'] = 'items';
		exprAttrValues[':items'] = mergedItems;

		// Uppdatera total om alla items har subtotal
		const hasSubtotal = mergedItems.every(
			(i) => typeof i.subtotal === 'number'
		);
		if (hasSubtotal) {
			const total = mergedItems.reduce((sum, i) => sum + i.subtotal, 0);
			updateExprParts.push('#attr.#total = :total');
			exprAttrNames['#total'] = 'total';
			exprAttrValues[':total'] = total;
		}
	}

	// Villkorlig uppdatering av staffComment
	if (staffComment !== undefined) {
		updateExprParts.push('#attr.#staffComment = :staffComment'); // Uppdateras på rätt sätt (enligt Insomnia)
		exprAttrNames['#attr'] = 'attribute';
		exprAttrNames['#staffComment'] = 'staffComment';
		exprAttrValues[':staffComment'] = staffComment;
	}

	// Villkorlig uppdatering av userComment
	if (userComment !== undefined) {
		updateExprParts.push('#attr.#userComment = :userComment'); // Uppdateras på rätt sätt (enligt Insomnia)
		exprAttrNames['#attr'] = 'attribute';
		exprAttrNames['#userComment'] = 'userComment';
		exprAttrValues[':userComment'] = userComment;
	}

	// Villkorlig uppdatering av status
	if (status !== undefined) {
		updateExprParts.push('#statusRoot = :status'); // Uppdateras på rätt sätt
		exprAttrNames['#statusRoot'] = 'status';
		exprAttrValues[':status'] = status;
	}

	// Always set modifiedAt
	updateExprParts.push('modifiedAt = :now');
	exprAttrValues[':now'] = now;

	// Skicka uppdateringen
	await client.send(
		new UpdateItemCommand({
			TableName: 'mojjen-table',
			Key: key,
			UpdateExpression: 'SET ' + updateExprParts.join(', '),
			ExpressionAttributeNames: exprAttrNames,
			ExpressionAttributeValues: marshall(exprAttrValues),
		})
	);

	return {
		...existing,
		attribute: {
			...existing.attribute,
			items: mergedItems,
			userComment: userComment ?? existing.attribute.userComment,
			staffComment: staffComment ?? existing.attribute.staffComment,
			total: exprAttrValues[':total'] ?? existing.attribute.total,
			modifiedAt: now,
		},
		status: status ?? existing.status,
		modifiedAt: now,
	};
};

export const getOrder = async (orderId) => {
	const key = {
		PK: { S: 'ORDER' },
		SK: { S: `ORDER#${orderId}` },
	};

	const res = await client.send(
		new GetItemCommand({
			TableName: 'mojjen-table',
			Key: key,
		})
	);

	if (!res.Item) {
		// Returnera ett "tomt" objekt istället för null
		return {
			id: orderId,
			status: 'unknown',
			attribute: {
				items: [],
			},
			PK: 'ORDER',
			SK: `ORDER#${orderId}`,
			category: 'ORDER',
		};
	}

	return unmarshall(res.Item);
};

// Get ALL orders
export async function getAllOrders() {
	const cmd = new QueryCommand({
		TableName: 'mojjen-table',
		IndexName: 'GSI2',
		KeyConditionExpression: 'statusCategory = :sc',
		ExpressionAttributeValues: {
			':sc': { S: 'STATUS#ORDER' },
		},
	});

	const res = await client.send(cmd);
	return res.Items.map((i) => unmarshall(i));
}

// Get ALL orders by status
export async function getAllOrdersByStatus(status) {
	const res = await client.send(
		new QueryCommand({
			TableName: 'mojjen-table',
			IndexName: 'GSI2',
			KeyConditionExpression:
				'statusCategory = :pk AND begins_with(#s, :status)',
			ExpressionAttributeNames: {
				'#s': 'status',
			},
			ExpressionAttributeValues: {
				':pk': { S: 'STATUS#ORDER' },
				':status': { S: status },
			},
		})
	);

	return res.Items.map((item) => unmarshall(item));
}
// Get ALL orders by userId
export async function getAllOrdersByUserId(userId) {
	const command = new QueryCommand({
		TableName: 'mojjen-table',
		IndexName: 'GSI1',
		KeyConditionExpression: 'category = :category AND id = :id',
		ExpressionAttributeValues: {
			':category': { S: 'ORDER' },
			':id': { S: userId },
		},
	});

	try {
		const res = await client.send(command);

		if (res) return res.Items.map((item) => unmarshall(item));
	} catch (error) {
		console.log('Error in getAllOrdersByUserId: ' + error.message);
	}
}

export const replaceOrder = async (order) => {
	const params = {
		TableName: 'mojjen-table',
		Item: marshall(order),
	};

	try {
		await client.send(new PutItemCommand(params));
	} catch (error) {
		console.log('Error in replaceOrder: ' + error.message);
	}
};

/**
 * Author: ninerino
 * Functions to handle everything with orders.
 *
 * Updated: Lam
 * Added in createOrder if userId comes from bodyreq then use it i GSI1SK Id otherwise create new guestId
 * Added function getAllordersByUserId
 * Added deletedItems to changeOrder function
 */
