import middy from '@middy/core';
import { sendResponses } from '../../../responses/index.mjs';
import { errorHandler } from '../../../middlewares/errorHandler.mjs';
import { getUserById } from '../../../services/users.mjs';
import { authenticateUser } from '../../../middlewares/authenticateUser.mjs';

export const handler = middy(async (event) => {
	// Checking authorization
	const tokenUser = event.user;

	if (!tokenUser?.sub) {
		return sendResponses(401, {
			success: false,
			message: 'No token provided or invalid token',
		});
	}

	// Continue only if the logged-in user matches the userId from the path parameter.
	const user = await getUserById(tokenUser.sub);
	if (user && user.id === tokenUser.sub) {
		return sendResponses(200, {
			success: true,
			messages: 'Success',
			user: user,
		});
	} else {
		return sendResponses(404, {
			success: false,
			message: 'No user found',
		});
	}
})
	.use(authenticateUser())
	.use(errorHandler());

	/**
 * Author: Lam
 * Function to get a user by id.
 *
 * Updated: ninerino
 * Worked with Lam to make it work with credentials
 */