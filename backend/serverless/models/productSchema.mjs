import Joi from 'joi';

/**
 * Author: KlaraSk
 * Product schema
 */

const regExItemId = /^prod-[0-9a-fA-F]{5}$/;

export const productSchema = Joi.object({
	name: Joi.string().min(3).max(15).required(),
	category: Joi.string()
		.uppercase()
		.valid('PROTEIN', 'MEAL', 'SIDE', 'DRINK', 'TOPPING')
		.required(),
	price: Joi.number().required(),
	summary: Joi.string().min(5).max(50).required(),
	description: Joi.string().min(5).max(200).required(),
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
		then: Joi.string()
			.min(4)
			.max(10)
			.pattern(regExItemId)
			.default('prod-c3536'),
	}),
	allergenes: Joi.array()
		.items(
			Joi.string()
				.lowercase()
				.valid('gluten', 'laktos', 'mjölkprotein', 'nötter', 'ägg')
		)
		.unique(),
});
