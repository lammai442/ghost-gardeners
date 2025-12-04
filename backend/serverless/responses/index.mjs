export const sendResponses = (statusCode, data) => {
	return {
		statusCode: statusCode,
		body: JSON.stringify({
			...data,
		}),
	};
};

/**
 * Author: Lam
 * Function to use when sending responses
 */
