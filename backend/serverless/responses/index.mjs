import 'dotenv/config';

export const sendResponses = (statusCode, data) => {
	return {
		statusCode: statusCode,
		headers: {
			'Content-Type': 'application/json',
			'Content-Security-Policy': `default-src 'self'; 
  			script-src 'self' https://cdnjs.cloudflare.com https://assets10.lottiefiles.com; 
  			style-src 'self' https://fonts.googleapis.com; 
  			font-src 'self' https://fonts.gstatic.com; 
  			img-src 'self' data:; 
			connect-src 'self' https://re7yle0qc7.execute-api.eu-north-1.amazonaws.com ws:;`,
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
