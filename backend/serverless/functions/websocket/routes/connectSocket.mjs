import { storeConnection } from '../../../utils/connection.mjs';

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