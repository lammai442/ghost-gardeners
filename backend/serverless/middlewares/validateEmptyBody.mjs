export const validateEmptyBody = () => ({
	before: (handler) => {
		const isBodyEmptyObj = Object.keys(handler.event.body).length === 0;
		console.log('isBodyEmptyObj: ', isBodyEmptyObj);
		if (isBodyEmptyObj) throw new Error('No body in request');

		return;
	},
});

/**
 * Author: Klara
 * Throws an error if the body is empty.
 */
