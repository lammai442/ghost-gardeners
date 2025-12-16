import { storeConnection } from '../../../utils/connection.mjs';

// Base WebSocket connection for AWS which happens in the background
export default async (connectionId, body, event) => {
	await storeConnection(connectionId, {
		queryParams: event.queryStringParameters || {},
	});
	return { statusCode: 200 };
};

/**
 * Author: StefanMogren
 * Connect socket
 */
