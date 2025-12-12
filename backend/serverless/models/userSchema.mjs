import Joi from 'joi';
import { passwordRegEx, safeCharacters, regExOrderId } from './patterns.mjs';

export const userSchema = Joi.object({
	firstname: Joi.string()
		.min(2)
		.max(25)
		.required()
		.label('Förnamn')
		.pattern(safeCharacters)
		.messages({
			'string.pattern.base':
				'{{#label}}: Endast A-Ö, a-ö, 0-9 och skiljetecken är tillåtna.',
		}),
	lastname: Joi.string()
		.min(2)
		.max(25)
		.required()
		.label('Efternamn')
		.pattern(safeCharacters)
		.messages({
			'string.pattern.base':
				'{{#label}}: Endast A-Ö, a-ö, 0-9 och skiljetecken är tillåtna.',
		}),
	phone: Joi.string()
		.min(7)
		.max(25)
		.required()
		.label('Telefon')
		.pattern(safeCharacters)
		.messages({
			'string.pattern.base':
				'{{#label}}: Endast A-Ö, a-ö, 0-9 och skiljetecken är tillåtna.',
		}),
	email: Joi.string()
		.required()
		.pattern(safeCharacters)
		.label('Email')
		.messages({
			'string.pattern.base':
				'{{#label}}: Endast A-Ö, a-ö, 0-9 och skiljetecken är tillåtna.',
		})
		.email(),
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

/**
 * Author: KlaraSk
 * User schema
 *
 * Update: Klara
 * Imported regex from patterns. No emojis allowed.
 */
