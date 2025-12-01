import { v4 as uuid } from 'uuid';
import { getProductsByIds } from './orderHelpers.mjs';

/**
 * Author: Lam
 * Helper functions to search for all products and return allergenes if the product contains it
 */

export const generateDate = () => {
	return new Date().toISOString();
};

export const generateId = (prefix) => {
	return `${prefix}-${uuid().substring(0, 5)}`;
};

export const generateAllergenes = async (prodIds) => {
	if (!prodIds.length) return null;

	// Get all products with prodIds
	const productList = await getProductsByIds(prodIds);

	// Create a set that automatic delete all duplicates
	const allergenesSet = new Set();

	// Loop in the productList
	Object.values(productList).forEach((prod) => {
		if (prod.allergenes && prod.allergenes.length > 0) {
			// Add each allergenes to allergenesSet
			prod.allergenes.forEach((allergene) => allergenesSet.add(allergene));
		}
	});

	// If there are none, then return null
	if (allergenesSet.size === 0) return null;

	// Convert the set to an array and return the list
	return Array.from(allergenesSet);
};
