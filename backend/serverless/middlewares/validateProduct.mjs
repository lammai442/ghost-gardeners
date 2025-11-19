import { productSchema } from '../models/productSchema.mjs';

export const validateProduct = () => ({
	before: (handler) => {
		const { error } = productSchema.validate(handler.event.body);

		if (error) throw new Error(error.details[0].message);
		return;
	},
});
