import middy from '@middy/core';
import { sendResponses } from '../../../responses/index.mjs';
import httpJsonBodyParser from '@middy/http-json-body-parser';
import { errorHandler } from '../../../middlewares/errorHandler.mjs';
import { validateUserUpdate } from '../../../middlewares/validateUserUpdate.mjs';
import { getUserById, updateUserById } from '../../../services/users.mjs';
import { validateEmptyBody } from '../../../middlewares/validateEmptyBody.mjs';
import { authenticateUser } from '../../../middlewares/authenticateUser.mjs';

export const handler = middy(async (event) => {
	const userId = event.pathParameters.id;
	const updatedUser = event.body;
	const payload = event.user;

	if (payload.sub !== userId) {
		return sendResponses(403, { success: false, message: 'Forbidden' });
	}

	const user = await getUserById(userId);
	if (user) {
		const result = await updateUserById(updatedUser, userId);

		if (result) {
			return sendResponses(201, {
				success: true,
				user: result,
				messages: 'User successfully updated',
			});
		}
	} else {
		return sendResponses(404, {
			success: false,
			message: 'Unauthorized user or invalid userId',
		});
	}

	if (!user) {
		return sendResponses(404, { success: false, message: 'User not found' });
	}

	await updateUserById(updatedUser, userId);

	return sendResponses(200, {
		success: true,
		message: 'User successfully updated',
	});
})
	.use(httpJsonBodyParser())
	.use(validateEmptyBody())
	.use(validateUserUpdate())
	.use(authenticateUser())
	.use(errorHandler());

/**
 * Author: Klara
 * Function to update a user.
 *
 * Update: Klara
 * authenticateUser added
 *
 * Update: Klara
 * Return updated user
 */
