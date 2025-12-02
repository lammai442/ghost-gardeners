import { v4 as uuid } from 'uuid';

export const generateId = (): string => {
	return uuid().substring(0, 5);
};

export const validateAuthForm = (form: any, mode: 'login' | 'register') => {
	const e: Record<string, string> = {};

	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	const phoneRegex = /^[0-9\s+()-]{6,20}$/;
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

	// Extrafields for register
	if (mode === 'register') {
		if (!form.firstname) e.firstname = 'Förnamn krävs';
		else if (form.firstname.length < 2 || form.firstname.length > 25)
			e.firstname = 'Förnamn måste vara 2–25 tecken';

		if (!form.lastname) e.lastname = 'Efternamn krävs';
		else if (form.lastname.length < 2 || form.lastname.length > 25)
			e.lastname = 'Efternamn måste vara 2–25 tecken';

		if (!form.phone || !phoneRegex.test(form.phone))
			e.phone = 'Ange ett giltigt telefonnummer';

		if (!form.confirmpassword || form.confirmpassword !== form.password)
			e.confirmpassword = 'Lösenorden matchar inte';
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
