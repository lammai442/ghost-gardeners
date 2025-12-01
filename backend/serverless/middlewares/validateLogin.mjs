import { loginSchema } from '../models/loginSchema.mjs';

/**
 * Author: Klara
 * Middleware user login.
 */

export const validateLogin = () => ({
	before: (handler) => {
		const { error, value } = loginSchema.validate(handler.event.body);

		if (error) throw new Error(error.details[0].message);
		return;
	},
});
