import './index.scss';

import { Button } from '@mojjen/button';
import { ReusableInput } from '@mojjen/reusableinput';
import { useAuthStore } from '@mojjen/useauthstore';
import { ContentBox } from '@mojjen/contentbox';

import { type ChangeEvent, useState } from 'react';
import type { FullUser } from '@mojjen/productdata';

import { apiUpdateUser } from '@mojjen/apiusers';

type Props = {
	fetchedUser: FullUser | null;
};

export const ProfileForm = ({ fetchedUser }: Props) => {
	const { user } = useAuthStore();

	if (!user) return null;
	if (fetchedUser === null) return;

	const [firstname, setFirstname] = useState(fetchedUser.attribute.firstname);
	const [lastname, setLastname] = useState(fetchedUser.attribute.lastname);
	const [email, setEmail] = useState(fetchedUser.email);
	const [phone, setPhone] = useState(fetchedUser.attribute.phone);
	const [password, setPassword] = useState('***********');
	const [repeatedPassword, setRepeatedPassword] = useState('***********');
	const [readOnly, setReadOnly] = useState(true);

	const handleChange = (
		e: ChangeEvent<HTMLInputElement>,
		setFunction: (string: string) => void
	) => {
		setFunction(e.target.value);
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		let updatedUser = {};
		// ! Not so DRY... In a galaxy far far away I plan to fix it later.
		firstname !== fetchedUser.attribute.firstname &&
			(updatedUser = { ...updatedUser, firstname: firstname });

		lastname !== fetchedUser.attribute.lastname &&
			(updatedUser = { ...updatedUser, lastname: lastname });

		email !== fetchedUser.email &&
			(updatedUser = { ...updatedUser, email: email });

		phone !== fetchedUser.attribute.phone &&
			(updatedUser = { ...updatedUser, phone: phone });

		password !== '***********' &&
			password === repeatedPassword &&
			(updatedUser = { ...updatedUser, password: password });

		const result = await apiUpdateUser(user.userId, updatedUser, user.token);
		console.log('result: ', result);

		setReadOnly(true);
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="flex flex__column flex__gap-1 profile-form"
		>
			<h3 className="heading-3">Profilinformation</h3>
			<ContentBox extraClass="flex flex__column flex__gap-1-5 profile-form__content">
				<ReusableInput
					type="text"
					name="firstname"
					onChange={(e) => handleChange(e, setFirstname)}
					value={firstname || ''}
					label="Förnamn"
					autocomplete="given-name"
					readonly={readOnly}
				/>
				<ReusableInput
					type="text"
					name="lastname"
					onChange={(e) => handleChange(e, setLastname)}
					value={lastname || ''}
					label="Efternamn"
					autocomplete="family-name"
					readonly={readOnly}
				/>
				<ReusableInput
					type="email"
					name="email"
					onChange={(e) => handleChange(e, setEmail)}
					value={email}
					label="Mailadress"
					autocomplete="email"
					readonly={readOnly}
				/>
				<ReusableInput
					type="tel"
					name="phone"
					onChange={(e) => handleChange(e, setPhone)}
					value={phone || ''}
					label="Telefonnummer"
					autocomplete="tel"
					readonly={readOnly}
				/>
				<ReusableInput
					type="password"
					name="password"
					onChange={(e) => handleChange(e, setPassword)}
					value={password}
					label={readOnly ? 'Lösenord' : 'Ändra lösenord'}
					autocomplete="current-password"
					readonly={readOnly}
				/>
				{readOnly === false && (
					<ReusableInput
						type="password"
						name="password"
						onChange={(e) => handleChange(e, setRepeatedPassword)}
						value={repeatedPassword}
						label="Upprepa nytt lösenord"
						autocomplete="current-password"
						readonly={readOnly}
					/>
				)}
				{readOnly === true ? (
					<Button
						extraClasses="profile-form__btn"
						onClick={() => setReadOnly(false)}
						aria="Uppdatera dina uppgifter"
					>
						Uppdatera
					</Button>
				) : (
					<div className="flex flex__gap-1 profile-form__btns">
						<Button
							extraClasses="profile-form__btn"
							onClick={() => setReadOnly(false)}
							style="red"
							aria="Uppdatera dina uppgifter"
						>
							Avbryt
						</Button>

						<Button
							type={'submit'}
							aria="Uppdatera dina uppgifter"
							extraClasses="profile-form__btn"
						>
							Ändra uppgifter
						</Button>
					</div>
				)}
			</ContentBox>
		</form>
	);
};

/**
 * Author: Klara Sköld
 * Form for editing profile info.
 *
 */
