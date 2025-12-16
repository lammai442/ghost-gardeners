import Joi from 'joi';

const regExItemId = /^prod-[0-9a-fA-F]{5}$/;

export const productSchema = Joi.object({
	name: Joi.string().min(3).max(33).required(),
	category: Joi.string()
		.uppercase()
		.valid('PROTEIN', 'MEAL', 'SIDE', 'DRINK', 'TOPPING')
		.required(),
	price: Joi.number().required(),
	summary: Joi.string().min(5).max(70).required(),
	description: Joi.when('category', {
		is: 'MEAL',
		then: Joi.string().min(5).max(200).required(),
	}),
	img: Joi.string(),
	items: Joi.when('category', {
		is: 'MEAL',
		then: Joi.array()
			.items(
				Joi.string().lowercase().pattern(regExItemId).messages({
					'string.pattern.base': 'Items must be of type prod-83vFs',
				})
			)
			.unique()

			.min(2)
			.required(),
	}),
	includeDrink: Joi.when('category', {
		is: 'MEAL',
		then: Joi.string().lowercase().pattern(regExItemId).messages({
			'string.pattern.base': 'Items must be of type prod-83vFs',
		}),
	}),
	allergenes: Joi.array()
		.items(
			Joi.string()
				.lowercase()
				.valid('gluten', 'laktos', 'mjölkprotein', 'skaldjur', 'ägg')
		)
		.unique(),
});

/**
 * Author: KlaraSk
 * Product schema
 *
 * Update: Lam, KlaraSk, Nikki
 * Added when state for description to only apply on category:Meal and change name to 33 characters and summary to 70
 *
 * Update: Lam
 * Changed includeDrink to optional for meals
 * */
