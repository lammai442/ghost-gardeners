import { sendToConnection } from '../../../utils/connection.mjs';

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