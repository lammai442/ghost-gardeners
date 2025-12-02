import AWS from 'aws-sdk';

const apiGatewayManagementApi = new AWS.ApiGatewayMangementApi({
	endpoint: process.env.WEBSOCKET_ENDPOINT,
});

const dynamodb = new AWS.DynamoDB.DocumentClient();

export async function sendToConnection(connectionId, data) {
	await apiGatewayManagementApi
		.postToConnection({
			ConnectionId: connectionId,
			Data: JSON.stringify(data),
		})
		.promise();
}

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
