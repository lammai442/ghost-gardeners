import { removeConnection } from '../../../utils/connection.mjs';

// Base WebSocket connection for AWS which happens in the background
export default async (connectionId, body, event) => {
	await removeConnection(connectionId);
	return { statusCode: 200 };
};

/**
 * Author: StefanMogren
 * Disconnect Socket
 */
