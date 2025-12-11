import middy from '@middy/core';
import { sendResponses } from '../../../responses/index.mjs';
import { errorHandler } from '../../../middlewares/errorHandler.mjs';
import { getUserById } from '../../../services/users.mjs';
import { authenticateUser } from '../../../middlewares/authenticateUser.mjs';

/**
 * Author: Lam
 * Function to get a user by id.
 */

export const handler = middy(async (event) => {
	// Checking authorization
	const tokenUser = event.user;

	if (!tokenUser?.sub) {
		return sendResponses(401, {
			success: false,
			message: 'No token provided or invalid token',
		});
	}
	// if (order.id !== user.sub && user.role !== 'ADMIN') {
	// 	return sendResponses(403, {
	// 		success: false,
	// 		message: 'Du har inte behörighet att ändra denna order',
	// 	});
	// }

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
	// else {
	// 	return sendResponses(404, {
	// 		success: false,
	// 		message: 'Unauthorized user or invalid userId',
	// 	});
})
	.use(authenticateUser())
	.use(errorHandler());
