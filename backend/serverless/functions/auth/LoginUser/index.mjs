import middy from '@middy/core';
import { sendResponses } from '../../../responses/index.mjs';
import httpJsonBodyParser from '@middy/http-json-body-parser';
import { errorHandler } from '../../../middlewares/errorHandler.mjs';
import { comparePasswords } from '../../../utils/bcrypt.mjs';
import { generateToken } from '../../../utils/tokens.mjs';
import { validateLogin } from '../../../middlewares/validateLogin.mjs';
import { getUserByEmail } from '../../../services/users.mjs';

export const handler = middy(async (event) => {
	const user = await getUserByEmail(event.body.email);

	if (!user) throw new Error('Användaren gick inte att hitta.');

	const validPassword = await comparePasswords(
		event.body.password,
		user.attribute.password
	);

	if (!validPassword) throw new Error('Fel lösenord');

	const token = generateToken(user);

	return sendResponses(200, {
		success: true,
		messages: 'Inloggningen lyckades',
		data: {
			firstname: user.attribute.firstname,
			phone: user.attribute.phone,
			lastname: user.attribute.lastname,
			email: user.email,
			role: user.attribute.role,
			token: `Bearer ${token}`,
			userId: user.attribute.userId,
		},
	});
})
	.use(httpJsonBodyParser())
	.use(validateLogin())
	.use(errorHandler());

/**
 * Author: Klara
 * Function to login a user.
 *
 * Updated: Lam
 * Changes in return response with keys to success, messages, data and return of userId
 */
