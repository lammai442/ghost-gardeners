import './index.scss';
import { useState } from 'react';
import { useAuthStore } from '@mojjen/useauthstore';
import { Button } from '@mojjen/button';
import { ReusableInput } from '@mojjen/reusableinput';
import { validateAuthForm } from '@mojjen/helpfunctions';
import { loginInputs } from '@mojjen/data';
import { apiGetUserByToken, apiLoginUser } from '@mojjen/apiusers';
import { LoadingMsg } from '@mojjen/loadingmsg';
import { Modal } from '@mojjen/modal';
import { useNavigate } from 'react-router-dom';

export const AuthForm = () => {
	const [loading, setLoading] = useState(false);
	const { updateUserStorage } = useAuthStore();
	const navigate = useNavigate();

	// Stores all form field values
	const [form, setForm] = useState({
		email: '',
		password: '',
	});

	// Stores all validation error messages in a key-value pair object
	const [errors, setErrors] = useState<Record<string, string>>({});

	// Validates entire form using external validation function
	const validate = () => {
		// Runs validation depending on mode
		const e = validateAuthForm(form);
		// Stores validation errors
		setErrors(e);
		// Returns true if no errors
		return Object.keys(e).length === 0;
	};

	// Updates form values when user types in an input field
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setForm({ ...form, [e.target.name]: e.target.value }); // Updates specific field by name

		// Removes error message for this field as soon as user starts correcting it
		setErrors((prev) => {
			const copy = { ...prev };
			delete copy[e.target.name];
			delete copy.apiError;
			return copy;
		});
	};

	const handleSubmit = async (e?: React.FormEvent) => {
		e?.preventDefault();
		// Runs validation and stops if errors exist
		if (!validate()) return;

		// Locks submission to avoid spam clicks
		setLoading(true);
		// Builds user object to store after successful login/register
		let user;

		user = {
			email: form.email,
			password: form.password,
		};

		const response = await apiLoginUser(user);
		setLoading(false);
		if (!response.success) {
			// Handles API errors here (e.g., show error messages)
			setErrors({ apiError: response.data.message || 'Ett fel uppstod' });
			return;
		}

		const token: string = response.data.data.token;
		const res = await apiGetUserByToken(token);

		const userFromBackend = res.data.user;
		if (userFromBackend.attribute.role !== 'ADMIN') {
			setErrors({ apiError: 'Ditt konto har inte tillgång till denna sida' });
			return;
		}
		const localStorageUser = {
			token: token,
			userId: userFromBackend.attribute.userId,
			role: userFromBackend.attribute.role,
		};
		// On successful login, update global user state and navigate to homepage
		updateUserStorage(localStorageUser);
		navigate('/');
	};

	return (
		<>
			{loading && (
				<Modal
					open={true}
					setModalOpen={(loading) => setLoading(loading)}
					titleContent={<h3 className="heading-3 text-light-beige">Laddar</h3>}
				>
					<LoadingMsg
						title="Bearbetar"
						text="Din förfrågan skickas. Vänta ett ögonblick."
					/>
				</Modal>
			)}
			<form className="auth-form" onSubmit={handleSubmit} noValidate>
				{loginInputs.map((input) => (
					<ReusableInput
						key={input.name}
						label={input.label}
						name={input.name}
						type={input.type || 'text'}
						value={form[input.name as keyof typeof form]}
						onChange={handleChange}
						error={errors[input.name]}
					/>
				))}
				<section className="auth-form__actions">
					{errors.apiError && (
						<span className="auth-form__error-message base">
							{errors.apiError}
						</span>
					)}
					<Button
						onClick={handleSubmit}
						aria="Button to submit auth form"
						extraClasses="auth-form__action-btn"
					>
						Logga in
					</Button>
				</section>
			</form>
		</>
	);
};

/**
 * Author: Lam
 * AI-assisted code creation: Github Copilot and ChatGPT
 * Created a reusable authentication form for login and registration. Uses localStorage to store user data upon successful login/registration.
 *
 */
