import middy from '@middy/core';
import { sendResponses } from '../../../responses/index.mjs';
import httpJsonBodyParser from '@middy/http-json-body-parser';
import { errorHandler } from '../../../middlewares/errorHandler.mjs';
import { validateUserUpdate } from '../../../middlewares/validateUserUpdate.mjs';
import { getUserById, updateUserById } from '../../../services/users.mjs';
import { validateEmptyBody } from '../../../middlewares/validateEmptyBody.mjs';

/**
 * Author: Klara
 * Function to update a user.
 */

export const handler = middy(async (event) => {
	const userId = event.pathParameters.id;
	const updatedUser = event.body;
	const user = await getUserById(userId);

	if (user) {
		const result = await updateUserById(updatedUser, userId);

		if (result) {
			return sendResponses(201, {
				success: true,
				messages: 'User successfully updated',
			});
		}
	} else {
		return sendResponses(404, {
			success: false,
			message: 'Unauthorized user or invalid userId',
		});
	}
})
	.use(httpJsonBodyParser())
	.use(validateEmptyBody())
	.use(errorHandler())
	.use(validateUserUpdate());
