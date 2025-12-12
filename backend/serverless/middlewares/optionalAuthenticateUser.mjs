import { verifyToken } from '../utils/tokens.mjs';

export const optionalAuthenticateUser = () => ({
	before: (handler) => {
		const authHeader =
			handler.event.headers?.Authorization ||
			handler.event.headers?.authorization;

		const userIdFromParams = handler.event?.pathParameters.id;

		try {
			// If the ID from pathParameters is a guest, the API call continues with using the guest-id for its code.
			if (!userIdFromParams) throw new Error('No userId provided.');

			if (userIdFromParams.substring(0, 5) === 'guest') {
				return;

				// If the ID from pathParameters is user, then check if the token is valid and matches the userID
			} else if (userIdFromParams.substring(0, 4) === 'user') {
				if (!authHeader) throw new Error('No token provided.');

				const token = authHeader.split(' ')[1];

				const tokenData = verifyToken(token);
				if (!tokenData) throw new Error('Expired or invalid token.');

				// Koden här används innan rätt payload från token är fixad
				// if (tokenData.attribute.userId !== userIdFromParams) {
				// 	throw new Error('Unauthorized. UserId does not match token.');
				// }

				// Koden här använder man istället när token innehåller rätt payload
				if (tokenData.sub !== userIdFromParams) {
					throw new Error('Unauthorized. UserId does not match token.');
				}
				handler.event.user = tokenData;
			} else {
				throw new Error('No userId provided.');
			}
		} catch (error) {
			console.error('ERROR in authenticateUser()', error.message);
			throw new Error('Unauthorized');
		}
	},
});

/**
 * Author: StefanMogren
 * Optional verification of token depending on whether the user is logged in or just a guest.
 */
