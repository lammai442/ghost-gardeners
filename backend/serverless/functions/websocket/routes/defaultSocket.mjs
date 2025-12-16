import { sendToConnection } from '../../../utils/connection.mjs';

// Base WebSocket connection for AWS which happens in the background
export default async (connectionId, body, event) => {
	await sendToConnection(connectionId, {
		type: 'error',
		message: 'Unknown message type',
	});
	return { statusCode: 200 };
};

/**
 * Author: StefanMogren
 * Default Socket
 */
