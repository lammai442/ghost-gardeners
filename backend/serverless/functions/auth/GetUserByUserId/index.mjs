import middy from '@middy/core';
import { sendResponses } from '../../../responses/index.mjs';
import { errorHandler } from '../../../middlewares/errorHandler.mjs';
import { getUserById } from '../../../services/users.mjs';
import { authenticateUser } from '../../../middlewares/authenticateUser.mjs';

/**
 * Author: Klara
 * Function to get a user by id.
 */

export const handler = middy(async (event) => {
	const userId = event.pathParameters.id;

	// Continue only if the logged-in user matches the userId from the path parameter.
	if (event.user.sub === userId) {
		const user = await getUserById(userId);

		if (user) {
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
	} else {
		return sendResponses(404, {
			success: false,
			message: 'Unauthorized user or invalid userId',
		});
	}
})
	.use(errorHandler())
	.use(authenticateUser());
