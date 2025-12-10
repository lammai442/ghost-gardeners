import { updateUserSchema } from '../models/updateUserSchema.mjs';

export const validateUserUpdate = () => ({
	before: (handler) => {
		const { error } = updateUserSchema.validate(handler.event.body);

		if (error) throw new Error(error.details[0].message);
		return;
	},
});
