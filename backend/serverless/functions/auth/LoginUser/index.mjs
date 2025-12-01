import middy from '@middy/core';
import { sendResponses } from '../../../responses/index.mjs';
import httpJsonBodyParser from '@middy/http-json-body-parser';
import { errorHandler } from '../../../middlewares/errorHandler.mjs';
import { comparePasswords } from '../../../utils/bcrypt.mjs';
import { generateToken } from '../../../utils/tokens.mjs';
import { validateLogin } from '../../../middlewares/validateLogin.mjs';
import { getUserByEmail } from '../../../services/users.mjs';

/**
 * Author: Klara
 * Function to login a user.
 */

export const handler = middy(async (event) => {
	const user = await getUserByEmail(event.body.email);

	if (!user) throw new Error('Användaren gick inte att hitta.');

	const validPassword = await comparePasswords(
		event.body.password,
		user.attribute.password
	);

	if (!validPassword) throw new Error('Ogiltigt lösenord');

	const token = generateToken(user);
	console.log('user: ', user);
	return sendResponses(200, {
		success: true,
		messages: 'Inloggningen lyckades',
		firstname: user.attribute.firstname,
		phone: user.attribute.phone,
		lastname: user.attribute.lastname,
		email: user.email,
		role: user.attribute.role,
		token: `Bearer ${token}`,
	});
})
	.use(httpJsonBodyParser())
	.use(validateLogin())
	.use(errorHandler());
