import { sendResponses } from '../responses/index.mjs';
import { verifyToken } from '../utils/tokens.mjs';

export const authenticateUser = () => ({
	before: (handler) => {
		const authHeader =
			handler.event.headers?.Authorization ||
			handler.event.headers?.authorization;

		if (!authHeader) throw new Error('No token provided.');

		const token = authHeader.split(' ')[1];
		try {
			const user = verifyToken(token);

			if (!user) throw new Error('Ogiltig eller utgången token.');

			handler.event.user = user;
		} catch (error) {
			console.error('ERROR in authenticateUser()', error.message);
			return sendResponses(401, {
				success: false,
				message: error.message,
			});
		}
	},
});

/**
 * Author: Klara
 * Verifies token.
 *
 * Update: Lam
 * Added sendResponses for returning error message.
 */
