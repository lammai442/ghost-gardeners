import { sendResponses } from '../responses/index.mjs';
import { verifyToken } from '../utils/tokens.mjs';

// A middleware to check for token send from client and return the payload when success
export const authenticateUser = () => ({
	before: (handler) => {
		const authHeader =
			handler.event.headers?.Authorization ||
			handler.event.headers?.authorization;

		// Check for if token is provided in the auth
		if (!authHeader) throw new Error('No token provided.');

		// Remove the "Bearer " from authHeader
		const token = authHeader.split(' ')[1];
		try {
			// Invoke function for verifying the token
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
