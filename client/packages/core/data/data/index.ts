export const getAllInputs = (mode: 'login' | 'register') => [
	{
		show: mode === 'register',
		label: 'Förnamn',
		name: 'firstname',
		defaultValue: 'Adam',
	},
	{
		show: mode === 'register',
		label: 'Efternamn',
		name: 'lastname',
		defaultValue: 'Svensson',
	},
	{
		show: mode === 'register',
		label: 'Telefon',
		name: 'phone',
		defaultValue: '0739905938',
	},
	{
		show: true,
		label: 'E-post',
		name: 'email',
		defaultValue: 'adam.s@gmail.com',
	},
	{
		show: true,
		label: 'Lösenord',
		name: 'password',
		type: 'password',
		defaultValue: 'Mamma1234!',
	},
	{
		show: mode === 'register',
		label: 'Bekräfta lösenord',
		name: 'confirmpassword',
		type: 'password',
		defaultValue: 'Mamma1234!',
	},
];

/**
 * Author: Lam
 * Added data to use in authForm
 */
