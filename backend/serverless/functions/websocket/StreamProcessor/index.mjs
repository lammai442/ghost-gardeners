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

export const handler = async (event) => {
	console.log('StreamProcessor received:', JSON.stringify(event, null, 2));

	for (const record of event.Records) {
		// First skips non-Order records
		if (!isOrderRelated(record)) {
			continue;
		}

		try {
			const connections = await getActiveConnections();

			if (connections.length === 0) {
				console.log('No active connections, skipping broadcast');
				continue;
			}

			const message = {
				type: 'orderUpdate',
				eventName: record.eventName,
				order: record.dynamodb.NewImage || record.dynamodb.OldImage,
				timestamp: Date.now(),
			};

			console.log(`Broadcasting to ${connections.length} connections`);

			const sendPromises = connections.map(async (connectionId) => {
				try {
					await sendToConnection(connectionId, message);
					return { connectionId, success: true };
				} catch (error) {
					console.error(`Failed to send to connection ${connectionId}`, error);

					// An additional check inside the error whether it's due to a stale connection.
					// Removes the stale connection in that case.
					if (error.statusCode === 410 || error.code === 'GoneException') {
						console.log(`Removing stale connection: ${connectionId}`);
						try {
							await removeConnection(connectionId);
							return { connectionId, success: false, removed: true };
						} catch (removeError) {
							console.error(
								`Failed to remove stale connection ${connectionId}`
							);
						}
					}
					return { connectionId, success: false, removed: false };
				}
			});

			const results = await Promise.all(sendPromises);

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
