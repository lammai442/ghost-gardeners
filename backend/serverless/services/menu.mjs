import { marshall } from '@aws-sdk/util-dynamodb';
import {
	generateAllergenes,
	generateDate,
	generateId,
} from '../utils/index.mjs';
import { client } from './client.mjs';
import { PutItemCommand } from '@aws-sdk/client-dynamodb';

export const postMenuItem = async () => {
	const command = new PutItemCommand({
		TableName: 'mojjen-table',
		Item: {
			PK: { S: 'PRODUCT' },
			SK: { S: 'PRODUCT#meal124' },
			attribute: {
				M: {
					name: { S: 'Vålberg vego' },
					id: { S: 'meal124' },
					category: { S: 'meal' },
					price: { N: '45' },
					summary: { S: 'Falafelkôrv med harissa och koriander' },
					details: {
						S: 'Vår Vålberg Vego är en smakrik falafelkôrv, kryddad med het harissa och färsk koriander för en spännande twist på klassiska smaker. Den serveras med färska grönsaker och en lätt dressing som kompletterar kryddigheten i korven. Perfekt för dig som vill ha en matig, växtbaserad rätt full av smak och textur.',
					},
					img: { S: 'www.bild.se' },
					items: {
						L: [{ S: 'prod3454' }, { S: 'prod4513' }],
					},
					includeDrink: { S: 'drink1451' },
					createdAt: { S: new Date().toISOString() },
				},
			},
			category: {
				S: 'MENU',
			},
			id: {
				S: 'meal124',
			},
			statusCategory: {
				S: 'STATUS#PRODUCT',
			},
			status: { S: 'active' },
		},
	});

	try {
		await client.send(command);
		return true;
	} catch (error) {
		console.log('Error in postMenuItem in client ', error.message);
	}
};

/**
 * Author: KlaraSk
 * Updated the function to accept a full product object. Added utility helpers for id and date generation and now use marshall to convert the payload to DynamoDB-compatible format.
 */
/**
 * Update: Lam, KlaraSK, Nikki
 * Made description to be optional for the body
 *
 * Update: Lam
 * Changed so includeDrink comes from either body or a default prodId
 */

export const postProductItem = async (product) => {
	const prodId =
		product.category === 'MEAL' ? generateId('meal') : generateId('prod');

	// Get all allergenes for Meal
	let allergenes = null;
	if (product.items && product.items.length > 0) {
		// Send the item array with prodId
		allergenes = await generateAllergenes(product.items);
	}

	const command = new PutItemCommand({
		TableName: 'mojjen-table',

		Item: marshall({
			PK: `PRODUCT`,
			SK: `PRODUCT#${prodId}`,
			attribute: {
				name: product.name,
				id: prodId,
				category: product.category,
				price: Number(product.price),
				summary: product.summary,
				...(product.description && { description: product.description }), // Solution from ChatGPT to avoid description: undefined
				img: product.img,
				allergenes,
				stock: 25,
				createdAt: generateDate(),
				...(product.items && { items: product.items }),
				includeDrink: product.includeDrink
					? product.includeDrink
					: 'prod-06683',
			},

			category: product.category,
			id: prodId,
			status: 'active',
			statusCategory: 'STATUS#PRODUCT',
		}),
	});

	try {
		await client.send(command);
		return true;
	} catch (error) {
		console.error('Error in postMenuItem in client ', error.message);
	}
};
