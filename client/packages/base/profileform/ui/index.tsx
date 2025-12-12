import './index.scss';
import { Button } from '@mojjen/button';
import { ReusableInput } from '@mojjen/reusableinput';
import { useAuthStore } from '@mojjen/useauthstore';
import { ContentBox } from '@mojjen/contentbox';
import { type ChangeEvent, useState, useEffect } from 'react';
import type { FullUser } from '@mojjen/productdata';
import { apiUpdateUser } from '@mojjen/apiusers';
import { Modal } from '@mojjen/modal';

type Props = {
	fetchedUser: FullUser | null;
};

type FormState = {
	firstname: string;
	lastname: string;
	email: string;
	phone: string;
	password: string;
	repeatedPassword: string;
};

export const ProfileForm = ({ fetchedUser }: Props) => {
	const { user } = useAuthStore();
	const [modalOpen, setModalOpen] = useState<boolean>(false);
	const [errorMsg, setErrorMsg] = useState('');
	const [readOnly, setReadOnly] = useState(true);

	const [formData, setFormData] = useState<FormState>({
		firstname: fetchedUser?.attribute.firstname || '',
		lastname: fetchedUser?.attribute.lastname || '',
		email: fetchedUser?.email || '',
		phone: fetchedUser?.attribute.phone || '',
		password: '***********',
		repeatedPassword: '***********',
	});

	// Syncs state when fetchedUser is collected from the API.
	useEffect(() => {
		if (fetchedUser) {
			setFormData({
				firstname: fetchedUser.attribute.firstname || '',
				lastname: fetchedUser.attribute.lastname || '',
				email: fetchedUser.email || '',
				phone: fetchedUser.attribute.phone || '',
				password: '***********',
				repeatedPassword: '***********',
			});
			setReadOnly(true);
		}
	}, [fetchedUser]);

	if (!user) return null;
	if (fetchedUser === null) return null;

	// Updates form on change
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	// Resets form when user clicks "Avbryt"
	const handleCancel = () => {
		setFormData({
			firstname: fetchedUser.attribute.firstname || '',
			lastname: fetchedUser.attribute.lastname || '',
			email: fetchedUser.email || '',
			phone: fetchedUser.attribute.phone || '',
			password: '***********',
			repeatedPassword: '***********',
		});
		setReadOnly(true);
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		// Validering av lösenord
		if (
			formData.password !== '***********' &&
			formData.password !== formData.repeatedPassword
		) {
			setErrorMsg('Lösenorden matchar inte');
			setModalOpen(true);
			return;
		}

		try {
			const updatedUser: Record<string, string> = {};

			if (formData.firstname !== fetchedUser.attribute.firstname) {
				updatedUser.firstname = formData.firstname;
			}

			if (formData.lastname !== fetchedUser.attribute.lastname) {
				updatedUser.lastname = formData.lastname;
			}

			if (formData.email !== fetchedUser.email) {
				updatedUser.email = formData.email;
			}

			if (formData.phone !== fetchedUser.attribute.phone) {
				updatedUser.phone = formData.phone;
			}

			if (
				formData.password !== '***********' &&
				formData.password === formData.repeatedPassword
			) {
				updatedUser.password = formData.password;
			}

			// Om inget har ändrats
			if (Object.keys(updatedUser).length === 0) {
				setReadOnly(true);
				return;
			}

			const result = await apiUpdateUser(user.userId, updatedUser, user.token);

			if (result?.data?.success === true) {
				const newData = result.data.user;
				setFormData({
					firstname: newData.attribute.firstname || '',
					lastname: newData.attribute.lastname || '',
					email: newData.email || '',
					phone: newData.attribute.phone || '',
					password: '***********',
					repeatedPassword: '***********',
				});
				setReadOnly(true);
			} else {
				setErrorMsg(result?.data?.message || 'Ett oväntat fel inträffade');
				setModalOpen(true);
			}
		} catch (error) {
			console.error('Error updating user:', error);
			setErrorMsg('Ett oväntat fel inträffade');
			setModalOpen(true);
		}
	};

	return (
		<>
			<Modal
				open={modalOpen}
				titleContent={
					<h3 className="heading-3 text-light-beige">Aj då, försök igen</h3>
				}
				setModalOpen={setModalOpen}
			>
				<p className="base">{errorMsg}</p>
			</Modal>
			<form
				onSubmit={handleSubmit}
				className="flex flex__column flex__gap-1 profile-form"
			>
				<h2 className="heading-3">Profilinformation</h2>
				<ContentBox extraClass="flex flex__column flex__gap-1-5 profile-form__content">
					<ReusableInput
						type="text"
						name="firstname"
						onChange={handleChange}
						value={formData.firstname}
						label="Förnamn"
						autocomplete="given-name"
						readonly={readOnly}
					/>
					<ReusableInput
						type="text"
						name="lastname"
						onChange={handleChange}
						value={formData.lastname}
						label="Efternamn"
						autocomplete="family-name"
						readonly={readOnly}
					/>
					<ReusableInput
						type="email"
						name="email"
						onChange={handleChange}
						value={formData.email}
						label="Mailadress"
						autocomplete="email"
						readonly={readOnly}
					/>
					<ReusableInput
						type="tel"
						name="phone"
						onChange={handleChange}
						value={formData.phone}
						label="Telefonnummer"
						autocomplete="tel"
						readonly={readOnly}
					/>
					<ReusableInput
						type="password"
						name="password"
						onChange={handleChange}
						value={formData.password}
						label={readOnly ? 'Lösenord' : 'Ändra lösenord'}
						autocomplete="current-password"
						readonly={readOnly}
					/>
					{readOnly === false && (
						<ReusableInput
							type="password"
							name="repeatedPassword"
							onChange={handleChange}
							value={formData.repeatedPassword}
							label="Upprepa nytt lösenord"
							autocomplete="new-password"
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
								onClick={handleCancel}
								style="outlined-red"
								aria="Avbryt redigering"
							>
								Avbryt
							</Button>

							<Button
								type="submit"
								aria="Spara ändringar"
								extraClasses="profile-form__btn"
							>
								Ändra uppgifter
							</Button>
						</div>
					)}
				</ContentBox>
			</form>
		</>
	);
};

/**
 * Author: Klara Sköld
 * Form for editing profile info.
 *
 * Update: Klara
 * Added VERY basic mvp validation with error messages from backend. This component needs refactoring. Or to be deleted and replaced with an updated Authform.
 *
 * Update: Klara and Nikki
 * Bugfix, merged state variables into one from obj. Simplified validation. Help from Claude to understand why the form updated randomly.
 *
 * Update: Klara
 * Changed heading levels to remove WAVE warning about skipped levels.
 */
