import { removeConnection } from '../../../utils/connection.mjs';

export default async (connectionId, body, event) => {
	await removeConnection(connectionId);
	return { statusCode: 200 };
};
