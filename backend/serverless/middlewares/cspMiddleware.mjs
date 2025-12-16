// A middleware that was supposed to be used on the function which needed CSP but was never used because it didnt work correctly
// We intend to apply it in next sprint.
export const cspMiddleware = () => ({
	after: async (request) => {
		const response = request.response;

		response.headers['Content-Security-Policy'] = `
			default-src 'self';
			script-src 'self' https://cdnjs.cloudflare.com https://assets10.lottiefiles.com;
			style-src 'self' https://fonts.googleapis.com;
			font-src 'self' https://fonts.gstatic.com;
			img-src 'self' data:;
			connect-src 'self' ws:;
		`;

		return response;
	},
});

/**
 * Author: Lam
 * CSP Middleware
 */
