export const cspMiddleware = () => ({
	// 'after' körs efter att din handler har körts
	after: async (request) => {
		// Hämtar svaret som ska skickas tillbaka
		const response = request.response;

		// Lägger till CSP-headern på svaret
		response.headers['Content-Security-Policy'] = `
			default-src 'self';
			script-src 'self' https://cdnjs.cloudflare.com https://assets10.lottiefiles.com;
			style-src 'self' https://fonts.googleapis.com;
			font-src 'self' https://fonts.gstatic.com;
			img-src 'self' data:;
			connect-src 'self' ws:;
		`;

		// Returnerar uppdaterat svar
		return response;
	},
});

/**
 * Author: Lam
 * CSP Middleware
 */