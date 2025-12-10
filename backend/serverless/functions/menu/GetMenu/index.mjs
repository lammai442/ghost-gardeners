import { client } from '../../../services/client.mjs';
import { QueryCommand } from '@aws-sdk/client-dynamodb';
import { errorHandler } from '../../../middlewares/errorHandler.mjs';
import {
	getProductsByIds,
	getMealStatus,
} from '../../../utils/orderHelpers.mjs';

export const handler = async () => {
	try {
		const menuResponse = await client.send(
			new QueryCommand({
				TableName: 'mojjen-table',
				// IndexName: 'GSI1',
				KeyConditionExpression: 'PK = :pk',
				ExpressionAttributeValues: {
					':pk': { S: 'PRODUCT' },
				},
			})
		);

		//
		const allProductIds = [
			...new Set(
				(menuResponse.Items || []).flatMap((item) => {
					const a = item.attribute?.M || {};
					return [
						...(a.items?.L?.map((i) => i.S) || []),
						...(a.includeDrink?.S ? [a.includeDrink.S] : []), // <-- lägg till dryckens ID
					];
				})
			),
		];

		//
		const productMap = await getProductsByIds(allProductIds);

		//
		const menuItems = (menuResponse.Items || []).map((item) => {
			const a = item.attribute?.M || {};
			const base = {
				id: a.id?.S || '',
				name: a.name?.S || '',
				category: a.category?.S || '',
				price: a.price?.N ? Number(a.price.N) : null,
				summary: a.summary?.S || '',
				description: a.description?.S || '',
				img: a.img?.S || '',
				includeDrink: a.includeDrink?.S || null,
				// includeDrinkName: a.includeDrinkName?.S
				// 	? productMap[a.includeDrinkName.S]?.name || null
				// 	: null,
				includeDrinkName: a.includeDrinkName?.S || null,
				createdAt: a.createdAt?.S || '',
				items: a.items?.L?.map((i) => i.S) || [],
				allergenes: a.allergenes?.L?.map((x) => x.S) || [],
			};

			//
			base.status = getMealStatus(base, productMap);

			return base;
		});

		return {
			statusCode: 200,
			body: JSON.stringify(menuItems),
		};
	} catch (error) {
		console.error('Error in Menu Handler:', error);
		return errorHandler().onError({ response: null, error });
	}
};

/**
 * Author: ninerino
 * Function to fetch menu items from the API, as well as map the product IDs to their correct name
 */

/**
 * Author: ninerino
 * Function to fetch menu items from the API, including stock-based status
 *
 * Modified: StefanMogren
 * Changed so function fetches all products instead of just meals
 *
 * Updated: Lam
 * Changed details to description for menuItem and added Allergenes
 */
