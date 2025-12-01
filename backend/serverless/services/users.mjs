import { PutItemCommand, QueryCommand } from '@aws-sdk/client-dynamodb';
import { hashPassword } from '../utils/bcrypt.mjs';
import { client } from './client.mjs';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';
import { generateDate, generateId } from '../utils/index.mjs';

/**
 * Author: Klara
 * Function to create a user. The solution to add a GSI3 with email and using a Query Command to prevent duplicates on email comes from ChatGPT.
 */

export const getUserByEmail = async (email) => {
	const command = new QueryCommand({
		TableName: 'mojjen-table',
		IndexName: 'GSI3',
		KeyConditionExpression: 'email = :mail',
		ExpressionAttributeValues: marshall({
			':mail': email,
		}),
	});

	try {
		const result = await client.send(command);

		// Query Commands returns a list of Items. If the list is empty = no users with that email address.
		if (result.Items.length === 0) return false;
		const user = unmarshall(result.Items[0]);
		return user;
	} catch (error) {
		console.error('ERROR in db: ', error.message);
		return false;
	}
};

export const createUser = async (user) => {
	// Early return. A query command searches the database by email. If no user with this address is found, user creation proceeds.
	const isEmailinUse = await getUserByEmail(user.email);
	if (isEmailinUse !== false)
		throw new Error('Mailadressen finns redan i databasen.');

	const userId = generateId('user');

	const command = new PutItemCommand({
		TableName: 'mojjen-table',
		Item: marshall({
			PK: `USER#${userId}`,
			SK: 'USER#PROFILE',
			attribute: {
				firstname: user.firstname,
				lastname: user.lastname,
				phone: user.phone,
				password: await hashPassword(user.password),
				role: 'USER',
				createdAt: generateDate(),
			},
			category: user.role ? user.role : 'USER',
			status: 'active',
			id: userId,
			statusCategory: 'STATUS#USER',
			email: user.email,
		}),
	});

	try {
		await client.send(command);
		return 201;
	} catch (error) {
		console.error('ERROR in db: ', error.message);
		return 404;
	}
};
