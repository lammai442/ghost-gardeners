export const cspMiddleware = () => ({
	// 'after' körs efter att din handler har körts
	after: async (request) => {
		// Hämtar svaret som ska skickas tillbaka
		const response = request.response;

		// Lägger till CSP-headern på svaret
		response.headers['Content-Security-Policy'] =
			"default-src 'self'; img-src 'self'; script-src 'self'; style-src 'self'";

		// Returnerar uppdaterat svar
		return response;
	},
});
