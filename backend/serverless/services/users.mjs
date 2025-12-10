import {
	GetItemCommand,
	PutItemCommand,
	QueryCommand,
} from '@aws-sdk/client-dynamodb';
import { hashPassword } from '../utils/bcrypt.mjs';
import { client, docClient } from './client.mjs';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';
import { generateDate, generateId } from '../utils/index.mjs';
import { UpdateCommand } from '@aws-sdk/lib-dynamodb';

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
				userId,
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

// Got help from Claude AI with the following issues:
// Understanding how to update only the fields provided in the request body, not the entire obj.
// How to create placeholders, which were necessary since "attribute" is a reserved word in DynamoDB.
// Using DynamoDBDocumentClient and UpdateCommand instead of DynamoDBClient and UpdateItemCommand to simplify working with nested attributes.
export const updateUserById = async (updatedUser, userId) => {
	const updateExpressions = [];
	const expressionAttributeNames = {};
	const expressionAttributeValues = {};

	// Top level field, everything else is inside attribute in the document.
	// Checks if email is included in the body request. If not, it will not be updated.
	if (updatedUser.email !== undefined) {
		// Checks if the email already is in use in the DB.
		const existingUser = await getUserByEmail(updatedUser.email);
		if (existingUser !== false) throw new Error('Email is already in use');

		// Adds email to the update expression.
		expressionAttributeNames['#email'] = 'email';
		expressionAttributeValues[':email'] = updatedUser.email;
		updateExpressions.push('#email = :email');
	}

	expressionAttributeNames['#attribute'] = 'attribute';

	// Fields inside attribute that the user is allowed to update
	const attributeFields = ['firstname', 'lastname', 'phone', 'password'];

	// Loops through all allowed update-fields. For example: is firstname included in the request body? If yes: do the stuff inside the if-statement.
	for (const field of attributeFields) {
		if (updatedUser[field] !== undefined) {
			// Creates placeholders since attribute is a reserved word.
			const namePlaceholder = `#attr_${field}`;
			const valuePlaceholder = `:attr_${field}`;

			// Ternary operator that determines value for each field. If the field is password, then we want to hash it before storing it in DB. Else simply use the value from the request body.
			const value =
				field === 'password'
					? await hashPassword(updatedUser[field])
					: updatedUser[field];
			// Connects placeholder with the actual field NAME. i.e { "#attr_firstname": "firstname" }
			expressionAttributeNames[namePlaceholder] = field;
			// Connects placeholder with the actual field VALUE. i.e { ":attr_firstname": "Sören" }
			expressionAttributeValues[valuePlaceholder] = value;

			// The expression looks like this: "#attribute.#attr_firstname = :attr_firstname"
			updateExpressions.push(
				`#attribute.${namePlaceholder} = ${valuePlaceholder}`
			);
		}
	}
	// Adds or overwrites modifiedAt every update.
	expressionAttributeNames['#attr_modifiedAt'] = 'modifiedAt';
	expressionAttributeValues[':attr_modifiedAt'] = generateDate();
	updateExpressions.push('#attribute.#attr_modifiedAt = :attr_modifiedAt');

	const command = new UpdateCommand({
		TableName: 'mojjen-table',
		Key: {
			PK: `USER#${userId}`,
			SK: 'USER#PROFILE',
		},

		UpdateExpression: `SET ${updateExpressions.join(', ')}`,
		ExpressionAttributeNames: expressionAttributeNames,
		ExpressionAttributeValues: expressionAttributeValues,

		// Returns all of the attributes of the item, as they appear after the UpdateItem operation.
		ReturnValues: 'ALL_NEW',
	});
	try {
		const result = await docClient.send(command);
		return result.Attributes;
	} catch (error) {
		console.log('Error in updateOrder-db', error.message);
		return false;
	}
};

export const getUserById = async (userId) => {
	const command = new GetItemCommand({
		TableName: 'mojjen-table',
		Key: marshall({ PK: `USER#${userId}`, SK: 'USER#PROFILE' }),
	});

	try {
		const { Item } = await client.send(command);

		if (!Item) throw new Error('No message found');
		const user = unmarshall(Item);

		return user;
	} catch (error) {
		console.log('ERROR in db:', error.message);
		return false;
	}
};

/**
 * Author: Klara
 * Function to create a user. The solution to add a GSI3 with email and using a Query Command to prevent duplicates on email comes from ChatGPT.
 *
 * Modified by: Klara
 * Function to update a user.
 */
