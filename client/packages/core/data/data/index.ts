export const getAllInputs = (mode: 'login' | 'register') => [
	{
		show: mode === 'register',
		label: 'Förnamn',
		name: 'firstname',
	},
	{
		show: mode === 'register',
		label: 'Efternamn',
		name: 'lastname',
	},
	{
		show: mode === 'register',
		label: 'Telefon',
		name: 'phone',
	},
	{
		show: true,
		label: 'E-post',
		name: 'email',
	},
	{
		show: true,
		label: 'Lösenord',
		name: 'password',
		type: 'password',
	},
	{
		show: mode === 'register',
		label: 'Bekräfta lösenord',
		name: 'confirmpassword',
		type: 'password',
	},
];

/**
 * Author: Lam
 * Added data to use in authForm
 */
