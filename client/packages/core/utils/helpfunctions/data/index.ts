import { v4 as uuid } from 'uuid';
import type { Meal } from '@mojjen/productdata';

export const generateId = (): string => {
	return uuid().substring(0, 5);
};

// Validationform for a User
export const validateAuthForm = (
	form: any,
	mode: 'login' | 'register' | 'update'
) => {
	const e: Record<string, string> = {};

	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	const phoneRegex = /^0\d{7,12}$/;
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
			e.phone =
				'Telefonnumret måste börja med 0 och vara mellan 8 och 13 siffror';

		if (!form.confirmpassword || form.confirmpassword !== form.password)
			e.confirmpassword = 'Lösenorden matchar inte';
	}

	// Return errors-object
	return e;
};

// Sort an array by alphabetic order
export const sortMealListByLetter = (list: Meal[]): Meal[] => {
	const sortedList = list.sort((a, b) => {
		const nameA = a.name.toLowerCase();
		const nameB = b.name.toLowerCase();

		if (nameA < nameB) return -1;
		if (nameA > nameB) return 1;
		return 0;
	});

	return sortedList;
};

/**
 * Author: Lam
 * GenerateId function
 *
 * Update: Lam
 * Added validateAuthForm with code from ChatGPT for AI assignment
 * Added sortMealListByLetter
 */
