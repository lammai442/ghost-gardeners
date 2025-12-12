/**
 * Author: ninerino
 * Helper functions to fetch product information, add it to items array and calculate sum
 *
 * Update: Lam
 * Added allergenes in acc to getProductsByIds
 */

import { client } from '../services/client.mjs';
import { BatchGetItemCommand } from '@aws-sdk/client-dynamodb';
import { getOrder } from '../services/order.mjs';

/**
 * Fetch product by ID
 */
export async function getProductsByIds(ids) {
	if (!ids.length) return {};

	const batchParams = {
		RequestItems: {
			'mojjen-table': {
				Keys: ids.map((id) => ({
					PK: { S: 'PRODUCT' },
					SK: { S: `PRODUCT#${id}` },
				})),
			},
		},
	};

	const response = await client.send(new BatchGetItemCommand(batchParams));
	const items = response.Responses?.['mojjen-table'] || [];

	// Bygg productMap
	const productMap = items.reduce((acc, item) => {
		const a = item.attribute?.M || {};
		const id = a.id?.S;
		if (!id) return acc;

		acc[id] = {
			id,
			name: a.name?.S || '',
			price: a.price?.N
				? Number(a.price.N)
				: a.price?.S
				? Number(a.price.S)
				: 0,
			img: a.img?.S || '',
			stock: a.stock?.N ? Number(a.stock.N) : 0,
			summary: a.summary?.S || '',
			description: a.description?.S || '',
			category: a.category?.S || '',
			includeDrink: a.includeDrink?.S || null,
			includeDrinkName: a.includeDrinkName?.S || null,
			items: a.items?.L?.map((x) => x.S) || [],
			allergenes: a.allergenes?.L?.map((x) => x.S) || null,
		};

		return acc;
	}, {});

	// Add status
	Object.values(productMap).forEach((p) => {
		p.status = getMealStatus(p, productMap);
	});

	return productMap;
}

/**
 * Add name and price of product to item
 */
export function enrichItems(items, productMap) {
	return items.map((i) => {
		const base = productMap[i.id];
		if (!base) throw new Error(`Produkt ${i.id} finns inte i databasen.`);

		return {
			...i,
			itemId: i.itemId,
			name: base.name,
			subtotal: base.price,
			summary: base.summary,
			includeDrinkName: i.includeDrink
				? productMap[i.includeDrink]?.name || null
				: null,
		};
	});
}

/**
 * Calculate total sum
 */
export function calculateTotal(items) {
	return items.reduce((sum, i) => sum + i.subtotal, 0);
}

/**
 * Function to trim information from products
 */
export function trimFields(data, fieldsToRemove = []) {
	if (Array.isArray(data)) {
		return data.map((item) => trimFields(item, fieldsToRemove));
	}

	return Object.fromEntries(
		Object.entries(data)
			.filter(([key]) => !fieldsToRemove.includes(key))
			.map(([key, value]) => [
				key,
				value && typeof value === 'object' && !Array.isArray(value)
					? trimFields(value, fieldsToRemove)
					: value,
			])
	);
}

export function getMealStatus(product, productMap) {
	if (product.category !== 'MEAL') {
		return product.stock === 0 ? 'inactive' : 'active';
	}

	const itemProducts = product.items
		.map((id) => productMap[id])
		.filter(Boolean);

	const isAnyOutOfStock = itemProducts.some((p) => p.stock === 0);
	return isAnyOutOfStock ? 'inactive' : 'active';
}

export const deletedItemsFromOrder = async (id, itemId) => {
	const order = await getOrder(id);

	// Create deletedItemsArray if it doesnt exist
	if (!order.attribute.deletedItems) {
		order.attribute.deletedItems = [];
	}
	const remainingItems = [];

	// Loopar igenom nuvarande items
	for (const item of order.attribute.items) {
		if (item.itemId === itemId) {
			// Lägg till i deletedItems
			order.attribute.deletedItems.push(item);
		} else {
			// Annars sparar vi den kvar i items
			remainingItems.push(item);
		}
	}

	order.attribute.items = remainingItems;
	// If there are no items left in order then change status to cancel
	if (order.attribute.items.length === 0) {
		order.status = 'cancelled';
		order.attribute.total = 0;
	}
	// Else count the new total price
	else {
		order.attribute.total = order.attribute.items.reduce(
			(sum, item) => sum + item.price,
			0
		);
	}

	order.modifiedAt = new Date().toISOString();
	order.attribute.modifiedAt = new Date().toISOString();

	return order;
};

export const deleteAllItemsFromOrder = (order) => {
	const currentItems = order.attribute.items || [];

	const deleted = order.attribute.deletedItems || [];

	const updatedDeleted = [...deleted, ...currentItems];

	const updatedItems = [];

	order.attribute.deletedItems = updatedDeleted;
	order.attribute.items = updatedItems;

	return order;
};
