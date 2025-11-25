/**
 * Author: ninerino
 * Function to create order, save it to the database and return info to the frontend
 */

import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';
import { PutItemCommand, GetItemCommand, UpdateItemCommand } from '@aws-sdk/client-dynamodb';
import { client } from './client.mjs';
import {
	getProductsByIds,
	enrichItems,
	calculateTotal,
	trimFields,
} from '../utils/orderHelpers.mjs';
import { generateId } from '../utils/index.mjs';

export const createOrder = async ({
	items,
	userComment = '',
	staffComment = '',
}) => {
	const orderId = generateId('order');
	const now = new Date().toISOString();
	const user = 'guest'; // Temporary until user functionality exists

	// Flatten all product IDs from items, extras, without, and includeDrink
	const allIds = [
		...new Set(
			items
				.flatMap((i) => [
					i.id,
					...(i.extras || []),
					...(i.without || []),
					i.includeDrink || null,
				])
				.filter(Boolean)
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
		extras: trimFields(item.extras, [
			'img',
			'stock',
			'summary',
			'description',
			'includeDrink',
		]),
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
		id: orderId,
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
    PK: { S: "ORDER" },
    SK: { S: `ORDER#${orderId}` },
  };

  const getRes = await client.send(
    new GetItemCommand({
      TableName: "mojjen-table",
      Key: key,
    })
  );

  if (!getRes.Item) {
    throw new Error(`Order med ID ${orderId} hittades inte.`);
  }

  const now = new Date().toISOString();

  await client.send(
    new UpdateItemCommand({
      TableName: "mojjen-table",
      Key: key,
      UpdateExpression: `
        SET #status = :cancelled,
            modifiedAt = :now
      `,
      ExpressionAttributeNames: {
        "#status": "status",
      },
      ExpressionAttributeValues: marshall({
        ":cancelled": "cancelled",
        ":now": now,
      }),
    })
  );

  return {
    ...unmarshall(getRes.Item),
    status: "cancelled",
    modifiedAt: now,
  };
};