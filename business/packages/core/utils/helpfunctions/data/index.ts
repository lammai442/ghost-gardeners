// Validationform for a User
export const validateAuthForm = (form: any) => {
	const e: Record<string, string> = {};

	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	const passRegex = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9])/;

	// Validate email
	if (!form.email || !emailRegex.test(form.email)) {
		e.email = 'Ange en giltig e-postadress';
	}

	// Validate password
	if (!form.password || !passRegex.test(form.password)) {
		e.password =
			'Lösenord måste innehålla minst 1 gemen, 1 versal, 1 siffra och 1 specialtecken';
	}
	// Return errors-object
	return e;
};

/**
 * Author: Lam
 * GenerateId function
 *
 * Update: Lam
 * Added validateAuthForm with code from ChatGPT for AI assignment
 */
