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

export const changeOrder = async ({ orderId, items, userComment = "", staffComment = "", status = "cancelled" }) => {
  const key = { PK: { S: "ORDER" }, SK: { S: `ORDER#${orderId}` } };

  const res = await client.send(new GetItemCommand({ TableName: "mojjen-table", Key: key }));
  if (!res.Item) throw new Error(`Order ${orderId} hittades inte.`);

  const existing = unmarshall(res.Item);
  if (["completed"].includes(existing.status)) throw new Error("Denna order kan inte längre ändras.");

const allIds = [...new Set(items.flatMap(i => [
  i.id,
  i.includeDrink || null
]).filter(Boolean))];
  const productMap = await getProductsByIds(allIds);
  const enriched = enrichItems(items, productMap);
  const trimmedItems = enriched.map(i => ({
    id: i.id,
    itemId: i.itemId,
    name: i.name,
    subtotal: i.subtotal,
    includeDrink: i.includeDrink || null,
    includesDrinkName: i.includesDrinkName || null,
    summary: i.summary || null,
    // stock: i.stock || null, <- onödig?
    // img: i.img || null <- onödig?
  }));
  const total = calculateTotal(enriched);
  const now = new Date().toISOString();

  const updateExprParts = [
    "SET #attr.#items = :items",
    "#attr.#userComment = :userComment",
    "#attr.#staffComment = :staffComment",
    "#attr.#total = :total",
    "#statusRoot = :status",
    "modifiedAt = :now"
  ];

  const exprAttrNames = {
    "#attr": "attribute",
    "#items": "items",
    "#userComment": "userComment",
    "#staffComment": "staffComment",
    "#total": "total",
    "#statusRoot": "status"
  };

  await client.send(new UpdateItemCommand({
    TableName: "mojjen-table",
    Key: key,
    UpdateExpression: updateExprParts.join(", "),
    ExpressionAttributeNames: exprAttrNames,
    ExpressionAttributeValues: marshall({
      ":items": trimmedItems,
      ":userComment": userComment,
      ":staffComment": staffComment,
      ":total": total,
      ":status": status,
      ":now": now
    })
  }));

  return {
    ...existing,
    items: trimmedItems,
    userComment,
    staffComment,
    total,
    status,
    modifiedAt: now
  };
};


export const getOrder = async (orderId) => {
  const key = {
    PK: { S: "ORDER" },
    SK: { S: `ORDER#${orderId}` },
  };

  const res = await client.send(
    new GetItemCommand({
      TableName: "mojjen-table",
      Key: key,
    })
  );

  if (!res.Item) {
    // Returnera ett "tomt" objekt istället för null
    return {
      id: orderId,
      status: "unknown",
      attribute: {
        items: [],
      },
      PK: "ORDER",
      SK: `ORDER#${orderId}`,
      category: "ORDER",
    };
  }

  return unmarshall(res.Item);
};
