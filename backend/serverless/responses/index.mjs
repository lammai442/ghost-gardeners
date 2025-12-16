import { cspHeader } from '../utils/index.mjs';

export const sendResponses = (statusCode, data) => {
	return {
		statusCode: statusCode,
		// Including CSP for all responses
		headers: {
			'Content-Type': 'application/json',
			'Content-Security-Policy': cspHeader,
		},
		body: JSON.stringify({
			...data,
		}),
	};
};

/**
 * Author: Lam
 * Function to use when sending responses
 * Added headers and CSP
 */
