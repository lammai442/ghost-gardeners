import middy from '@middy/core';
import { errorHandler } from '../../../middlewares/errorHandler.mjs';
import { sendToConnection } from '../../../utils/connection.mjs';
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

async function getActiveConnection() {
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
			const connections = await getActiveConnection();

			const message = {
				type: 'orderUpdate',
				eventName: record.eventName,
				order: record.dynamodb.NewImage || record.dynamodb.OldImage,
				timestamp: Date.now(),
			};

			const sendPromises = connections.map(async (connectionID) => {
				try {
					await sendToConnection(connectionID, message);
				} catch (error) {
					console.error(`Failed to send to connection ${connectionID}`, error);
				}
			});

			await Promise.all(sendPromises);
		} catch (error) {
			console.error('Error processing stream record:', error);
		}
	}

	return sendResponses(200, {
		success: true,
	});
};
