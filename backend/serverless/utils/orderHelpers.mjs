/**
 * Author: ninerino
 * Helper functions to fetch product information, add it to items array and calculate sum
 */

import { client } from '../services/client.mjs';
import { BatchGetItemCommand } from '@aws-sdk/client-dynamodb';

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
			price: a.price?.N ? Number(a.price.N) : (a.price?.S ? Number(a.price.S) : 0),
			img: a.img?.S || '',
			stock: a.stock?.N ? Number(a.stock.N) : 0,
			summary: a.summary?.S || '',
			description: a.description?.S || '',
			category: a.category?.S || '',
			includeDrink: a.includeDrink?.S || null,
			items: a.items?.L?.map((x) => x.S) || [],
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

		const extras = (i.extras || []).map((id) => productMap[id]).filter(Boolean);
		const without = (i.without || [])
			.map((id) => productMap[id])
			.filter(Boolean);
		const subtotal =
			(base.price + extras.reduce((s, e) => s + e.price, 0)) * i.quantity;

		return {
			...i,
			name: base.name,
			extras,
			without,
			subtotal,
			summary: base.summary,
			includesDrinkName: i.includeDrink
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
