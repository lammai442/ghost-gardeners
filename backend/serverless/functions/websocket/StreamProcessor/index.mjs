// import middy from '@middy/core';
// import { errorHandler } from '../../../middlewares/errorHandler.mjs';
import {
	removeConnection,
	sendToConnection,
} from '../../../utils/connection.mjs';
import AWS from 'aws-sdk';
import { sendResponses } from '../../../responses/index.mjs';

const dynamodb = new AWS.DynamoDB.DocumentClient();

// Helper function to see whether the updated database is related to ORDER
// Also checks if the database is updated compared to before
const isOrderRelated = (record) => {
	const newImage = record.dynamodb?.NewImage;
	const oldImage = record.dynamodb?.OldImage;

	const newPK = newImage?.PK?.S;
	const oldPK = oldImage?.PK?.S;

	return (newPK && newPK === 'ORDER') || (oldPK && oldPK === 'ORDER');
};

// Another helper function which fetches all the active connections saved in the database
// Removes the "CONNECTION#" part from the SK from each entry and returns an array with only the connectionId
async function getActiveConnections() {
	const result = await dynamodb
		.query({
			TableName: 'mojjen-table',
			KeyConditionExpression: 'PK = :pk',
			ExpressionAttributeValues: {
				':pk': 'CONNECTION',
			},
			ProjectionExpression: 'SK',
		})
		.promise();

	return result.Items.map((item) => item.SK.replace('CONNECTION#', ''));
}

// Main function
export const handler = async (event) => {
	console.log('StreamProcessor received:', JSON.stringify(event, null, 2));

	for (const record of event.Records) {
		// If the update in the database isn't related to ORDER, skip everything
		if (!isOrderRelated(record)) {
			continue;
		}

		try {
			// Gets an array of all connectionId
			const connections = await getActiveConnections();

			if (connections.length === 0) {
				console.log('No active connections, skipping broadcast');
				continue;
			}

			// The data to send back to each connectionId
			// The "order" contains either the new or old version of ORDER
			const message = {
				type: 'orderUpdate',
				eventName: record.eventName,
				order: record.dynamodb.NewImage || record.dynamodb.OldImage,
				timestamp: new Date().toISOString(),
			};

			console.log(`Broadcasting to ${connections.length} connections`);

			// Maps through all connectionId and saves an array of "promises"
			// Each promise returns an object
			// {connectionId, success: true} if everything works
			// {connectionId, success: false, removed: true/false} depending on the error
			const sendPromises = connections.map(async (connectionId) => {
				try {
					await sendToConnection(connectionId, message);
					return { connectionId, success: true };

					// If it fails to send the message to the connectionId
				} catch (error) {
					console.error(`Failed to send to connection ${connectionId}`, error);

					// An additional check whether the error is due to a stale connection.
					// Removes the stale connection in that case.
					// Status code 410 stands for "Gone"
					// Still returns an object
					if (error.statusCode === 410 || error.code === 'GoneException') {
						console.log(`Removing stale connection: ${connectionId}`);
						try {
							await removeConnection(connectionId);
							return { connectionId, success: false, removed: true };
						} catch (removeError) {
							// If the code fails to remove the stale connection for some reason
							console.error(
								`Failed to remove stale connection ${connectionId}`
							);
						}
					}
					return { connectionId, success: false, removed: false };
				}
			});

			// Gets the results from all the promises.
			const results = await Promise.all(sendPromises);

			// Filters out how many connections got the message
			// Also filters out how many stale connections were removed
			const successful = results.filter((r) => r.success).length;
			const removed = results.filter((r) => r.removed).length;
			console.log(
				`Sent to ${successful}/${connections.length} connections, removed ${removed} stale connections`
			);
		} catch (error) {
			console.error('Error processing stream record:', error);
		}
	}

	return sendResponses(200, {
		success: true,
	});
};

/**
 * Author: StefanMogren
 * Created StreamProcessor to both handle updates to the database and send data back to the connections. Created with the help of Amazon Q (the built-in AI on AWS)
 *
 */
