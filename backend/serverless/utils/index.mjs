import { v4 as uuid } from 'uuid';
import { getProductsByIds } from './orderHelpers.mjs';
import 'dotenv/config';

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

export const cspHeader =
	"default-src 'self'; " +
	"script-src 'self' https://cdnjs.cloudflare.com https://assets10.lottiefiles.com; " +
	"style-src 'self' https://fonts.googleapis.com; " +
	"font-src 'self' https://fonts.gstatic.com; " +
	"img-src 'self' data:; " +
	`connect-src 'self' ${process.env.API_URL} ${process.env.CLIENT_API_URL} ws:;`;
