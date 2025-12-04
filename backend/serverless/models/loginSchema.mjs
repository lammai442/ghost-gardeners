import Joi from 'joi';

/**
 * Author: Klara
 * Login user schema.
 *
 * Update: Lam/Stefan
 * Added return of messages if any of the requiremnts are false
 */

export const loginSchema = Joi.object({
	// email: Joi.string().email().required(),
	email: Joi.string().email().required().messages({
		'string.empty': 'Email är obligatoriskt',
		'string.email': 'Email måste vara en giltig adress',
		'any.required': 'Email är obligatoriskt',
	}),
	password: Joi.string().required(),
});
