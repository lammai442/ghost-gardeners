import { verifyToken } from '../utils/tokens.mjs';

export const optionalAuthenticateUser = () => ({
	before: (handler) => {
		const authHeader =
			handler.event.headers?.Authorization ||
			handler.event.headers?.authorization;

		/* 		if (!authHeader) {
			handler.user = null;
			return next();
		} */

		const { userId } = handler.event.pathParameters;

		if (userId.substring(0, 4))
			// const token = authHeader.split(' ')[1];
			try {
				const user = verifyToken(token);

				if (!user) throw new Error('Unauthorized');

				handler.event.user = user;
			} catch (error) {
				console.error('ERROR in authenticateUser()', error.message);
				throw new Error('Unauthorized');
			}
	},
});

/**
 * Author: Klara
 * Verifies token.
 */
