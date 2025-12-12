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

// https://medium.com/@anandgupta20588/how-to-use-reduce-method-to-add-the-prices-of-cart-items-in-js-abb81a930883

// <T> är en generisk typ som används för att funktionen ska kunna ta emot vilken array som helst. Typescript känner då automatiskt av vilken sorts array den får in och returnera samma sort tillbaka. Lärde mig den här lösningen i en Scrimbakurs. /Klara

// mapper-lösningen kommer från ChatGPT
export const calcSum = <T>(array: T[], mapper: (item: T) => number): number => {
	return array.reduce((acc, curr) => acc + mapper(curr), 0);
};

export const formatDate = (date: string) => {
	// Converts iso string to a Date object
	const dateObj = new Date(date);

	// Converts to local date in Sweden: "7 september"
	const dayMonth = dateObj.toLocaleDateString('sv-SE', {
		day: 'numeric',
		month: 'long',
	});

	// Converts to local time in Sweden: "11.20"
	const time = dateObj.toLocaleTimeString('sv-SE', {
		hour: '2-digit',
		minute: '2-digit',
	});

	// Combines date and time
	return `${dayMonth} kl. ${time}`;
};

/**
 * Author: Lam
 * GenerateId function
 *
 * Update: Lam
 * Added validateAuthForm with code from ChatGPT for AI assignment
 * Added sortMealListByLetter
 *
 * Update: Klara Sköld
 * Utility function for makes calculations on an array.
 * Used on the cart page to calculate the total sum and total qty
 *
 * Update: Klara
 * formatDate added.
 */
