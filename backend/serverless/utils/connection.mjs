import AWS from 'aws-sdk';
// process.env.WEBSOCKET_ENDPOINT is found in serverless.yml, as
// 	provider:
// 		environment:
// 			WEBSOCKET_ENDPOINT
const apiGatewayManagementApi = new AWS.ApiGatewayManagementApi({
	endpoint: process.env.WEBSOCKET_ENDPOINT,
});

const dynamodb = new AWS.DynamoDB.DocumentClient();

// Takes the connectionId and sends data to it.
// Current data is the ORDER object from the database
export async function sendToConnection(connectionId, data) {
	await apiGatewayManagementApi
		.postToConnection({
			ConnectionId: connectionId,
			Data: JSON.stringify(data),
		})
		.promise();
}

// Saves the connectionId to the database
export async function storeConnection(connectionId, metadata = {}) {
	await dynamodb
		.put({
			TableName: 'mojjen-table',
			Item: {
				PK: 'CONNECTION',
				SK: `CONNECTION#${connectionId}`,
				timestamp: Date.now(),
				...metadata,
			},
		})
		.promise();
}

// Removes the connectionId to the database
export async function removeConnection(connectionId) {
	await dynamodb
		.delete({
			TableName: 'mojjen-table',
			Key: {
				PK: 'CONNECTION',
				SK: `CONNECTION#${connectionId}`,
			},
		})
		.promise();
}

/**
 * Author: StefanMogren
 * Created connection utils to be used in WebsocketHandler and StreamProcessor.
 * Created with the help of Amazon Q (the built-in AI on AWS)
 *
 */
