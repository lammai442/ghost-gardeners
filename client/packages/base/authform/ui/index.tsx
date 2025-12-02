import './index.scss'; // Imports styling for the auth form
import { useState } from 'react'; // Imports useState for local state management
import { useAuthStore } from '@mojjen/useauthstore'; // Imports global auth store actions
import { Button } from '@mojjen/button'; // Imports reusable button component
import { ReusableInput } from '@mojjen/reusableinput'; // Imports reusable input component
import { validateAuthForm } from '@mojjen/helpfunctions'; // Imports form validation helper
import { getAllInputs } from '@mojjen/data'; // Imports input field definitions
import {
	apiLoginUser,
	apiRegisterUser,
} from '../../../core/api/apiproducts/data';
import { Modal } from '@mojjen/modal';
import { User } from '@mojjen/productdata';

type Props = {
	setModalOpen?: (open: boolean) => void;
};

export const AuthForm = ({ setModalOpen }: Props) => {
	const [mode, setMode] = useState<'login' | 'register'>('login');
	const [msgModalOpen, setMsgModalOpen] = useState(false);
	const { updateUserStorage } = useAuthStore();

	// Prevents double submits
	const [submitting, setSubmitting] = useState(false);

	// Stores all form field values
	const [form, setForm] = useState({
		firstname: '',
		lastname: '',
		phone: '',
		email: '',
		password: '',
		confirmpassword: '',
	});

	// Stores all validation error messages
	const [errors, setErrors] = useState<Record<string, string>>({});

	// Validates entire form using external validation function
	const validate = () => {
		const e = validateAuthForm(form, mode); // Runs validation depending on mode
		setErrors(e); // Stores validation errors
		return Object.keys(e).length === 0; // Returns true if no errors
	};

	// Updates form values when user types in an input field
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setForm({ ...form, [e.target.name]: e.target.value }); // Updates specific field by name

		// Removes error message for this field as soon as user starts correcting it
		setErrors((prev) => {
			const copy = { ...prev }; // Copies previous error object
			delete copy[e.target.name]; // Deletes error for current field
			delete copy.apiError;
			return copy; // Returns updated error object
		});
	};

	const handleSubmit = async (e?: React.FormEvent) => {
		e?.preventDefault();
		// Prevents multiple clicks
		if (submitting) return;

		// Runs validation and stops if errors exist
		if (!validate()) return;

		// Locks submission to avoid spam clicks
		setSubmitting(true);

		// Builds user object to store after successful login/register
		let user: User;

		if (mode === 'login') {
			user = {
				email: form.email,
				password: form.password,
			};
		} else {
			user = {
				firstname: form.firstname,
				lastname: form.lastname,
				phone: form.phone,
				email: form.email,
				password: form.password,
			};
		}

		let response;
		if (mode === 'register') {
			response = await apiRegisterUser(user);
		} else {
			response = await apiLoginUser(user);
		}

		if (!response.success) {
			// Handles API errors here (e.g., show error messages)
			setErrors({ apiError: response.data.message || 'Ett fel uppstod' });

			setSubmitting(false);
			return;
		}

		// If registering, show success message modal
		if (mode === 'register') {
			setMsgModalOpen(true);
			setSubmitting(false);
			return;
		}

		user = response.data.data as User;
		// On successful login/register, update global user state
		updateUserStorage(user);

		setSubmitting(false);

		setModalOpen && setModalOpen(false);
	};

	const inputs = getAllInputs(mode);

	return (
		<>
			{msgModalOpen && (
				<Modal
					open={msgModalOpen}
					titleContent={
						<h3 className="heading-3 text-light-beige">Registrering</h3>
					}
					setModalOpen={(open) => {
						setMsgModalOpen(open);
						if (!open) {
							setMode('login');
							setForm((prev) => ({
								...prev,
								email: '',
								password: '',
							}));
							setErrors({});
						}
					}}
				>
					Din registrering lyckades!
				</Modal>
			)}
			<form className="auth-form" onSubmit={handleSubmit} noValidate>
				{' '}
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
						{mode === 'login' ? 'Logga in' : 'Skapa konto'}{' '}
					</Button>
				</section>
				<div className="auth-form__separator-content">
					<hr />
					<span className="text-black">eller</span>
					<hr />
				</div>
				<button
					type="button"
					className="auth-form__toggle"
					onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
				>
					{mode === 'login'
						? 'Skapa konto'
						: 'Har du redan ett konto? Logga in'}{' '}
				</button>
			</form>
		</>
	);
};

/**
 * Author: Lam
 * Created a reusable authentication form for login and registration. Uses localStorage to store user data upon successful login/registration.
 *
 *
 */
