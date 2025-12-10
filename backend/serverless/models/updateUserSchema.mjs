import Joi from 'joi';
import { passwordRegEx, safeCharacters } from './patterns.mjs';

/**
 * Author: KlaraSk
 * Update user schema
 *
 */

export const updateUserSchema = Joi.object({
	firstname: Joi.string()
		.min(2)
		.max(25)
		.label('Förnamn')
		.pattern(safeCharacters)
		.messages({
			'string.pattern.base':
				'{{#label}}: Endast A-Ö, a-ö, 0-9 och skiljetecken är tillåtna.',
		}),
	lastname: Joi.string()
		.min(2)
		.max(25)
		.label('Efternamn')
		.pattern(safeCharacters)
		.messages({
			'string.pattern.base':
				'{{#label}}: Endast A-Ö, a-ö, 0-9 och skiljetecken är tillåtna.',
		}),
	phone: Joi.string()
		.min(7)
		.max(25)
		.pattern(safeCharacters)
		.label('Telefon')
		.messages({
			'string.pattern.base':
				'{{#label}}: Endast A-Ö, a-ö, 0-9 och skiljetecken är tillåtna.',
		}),
	email: Joi.string().email().label('Email').pattern(safeCharacters).messages({
		'string.pattern.base':
			'{{#label}}: Endast A-Ö, a-ö, 0-9 och skiljetecken är tillåtna.',
	}),
	password: Joi.string().pattern(passwordRegEx).messages({
		'string.pattern.base':
			'Lösenordet måste innehålla minst en stor och en liten bokstav, en siffra och ett specialtecken.',
	}),
});
