import './index.scss'; // Imports styling for the auth form
import { useState } from 'react'; // Imports useState for local state management
import { useAuthStore } from '@mojjen/useauthstore'; // Imports global auth store actions
import { Button } from '@mojjen/button'; // Imports reusable button component
import { ReusableInput } from '@mojjen/reusableinput'; // Imports reusable input component
import { validateAuthForm } from '@mojjen/helpfunctions'; // Imports form validation helper
import { getAllInputs } from '@mojjen/data'; // Imports input field definitions
import { apiLoginUser } from '@mojjen/apiusers';
import type { User } from '@mojjen/userdata';
import { LoadingMsg } from '@mojjen/loadingmsg';
import { Modal } from '@mojjen/modal';

type Props = {};

export const AuthForm = () => {
	const [loading, setLoading] = useState(false);
	const { updateUserStorage } = useAuthStore();

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
		return Object.keys(e).length === 0; // Returns true if no errors
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
		// Prevents multiple clicks
		// Runs validation and stops if errors exist
		if (!validate()) return;

		// Locks submission to avoid spam clicks
		setLoading(true);
		// Builds user object to store after successful login/register
		let user: User;

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

		user = response.data.data as User;

		// On successful login/register, update global user state
		updateUserStorage(user);
	};

	const inputs = getAllInputs();

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
				{/* Maps all input definitions and renders only those where show = true */}
				{inputs.map((input) =>
					input.show ? (
						<ReusableInput
							key={input.name}
							label={input.label}
							name={input.name}
							type={input.type || 'text'}
							value={form[input.name as keyof typeof form]}
							onChange={handleChange}
							error={errors[input.name]}
						/>
					) : null
				)}
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
 *
 */
