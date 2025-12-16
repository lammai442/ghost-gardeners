import middy from '@middy/core';
import { sendResponses } from '../../../responses/index.mjs';
import httpJsonBodyParser from '@middy/http-json-body-parser';
import { errorHandler } from '../../../middlewares/errorHandler.mjs';
import { validateUser } from '../../../middlewares/validateUser.mjs';
import { createUser } from '../../../services/users.mjs';

// Function to register new user
export const handler = middy(async (event) => {
	const result = await createUser(event.body);
	if (result === 201) {
		return sendResponses(201, {
			success: true,
			messages: 'User successfully added',
		});
	} else {
		return sendResponses(404, {
			success: false,
			message: 'User could not be created.',
		});
	}
})
	.use(httpJsonBodyParser())
	.use(validateUser())
	.use(errorHandler());

/**
 * Author: Klara
 * Function to create a user.
 */
