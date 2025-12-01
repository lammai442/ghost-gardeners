import Joi from 'joi';

/**
 * Author: Klara
 * Login user schema.
 */

export const loginSchema = Joi.object({
	email: Joi.string().email().required(),
	password: Joi.string().required(),
});
