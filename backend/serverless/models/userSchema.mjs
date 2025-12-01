import Joi from 'joi';

/**
 * Author: KlaraSk
 * User schema
 *
 */

// The password must contain at least one of the following: 1 uppercase letter, 1 lowercase letter, 1 special character, 1 number (0-9). Regex from: https://ihateregex.io/expr/password/.
const passwordRegEx =
	/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;

const regExOrderId = /^order-[0-9a-fA-F]{5}$/;

export const userSchema = Joi.object({
	firstname: Joi.string().min(2).max(25).required(),
	lastname: Joi.string().min(2).max(25).required(),
	phone: Joi.string().min(7).max(25).required(),
	email: Joi.string().email().required(),
	password: Joi.string()
		.pattern(passwordRegEx)
		.messages({
			'string.pattern.base':
				'Lösenordet måste innehålla minst en stor och en liten bokstav, en siffra och ett specialtecken.',
		})
		.required(),
	role: Joi.string()
		.valid('USER', 'ADMIN')
		.messages({ 'any.only': 'Roll måste vara antingen user eller admin' }),
	orders: Joi.array().items(
		Joi.string().pattern(regExOrderId).messages({
			'string.pattern.base': 'Items must be of type order-83vFs',
		})
	),
});
