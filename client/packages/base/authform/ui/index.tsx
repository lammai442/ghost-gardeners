import './index.scss'; // Imports styling for the auth form
import { useState } from 'react'; // Imports useState for local state management
import { useAuthStore } from '../../../core/stores/useauthstore/data'; // Imports global auth store actions
import { Button } from '@mojjen/button'; // Imports reusable button component
import { ReusableInput } from '@mojjen/reusableinput'; // Imports reusable input component
import { validateAuthForm } from '@mojjen/helpfunctions'; // Imports form validation helper
import { getAllInputs } from '@mojjen/data'; // Imports input field definitions
import { apiRegisterUser } from '../../../core/api/apiproducts/data';

type Props = {
	setModalOpen?: (open: boolean) => void; // Optional function for closing the modal
};

export const AuthForm = ({ setModalOpen }: Props) => {
	// Extracts function to update logged-in user data in storage
	const updateUserStorage = useAuthStore((s: any) => s.updateUserStorage);

	// Controls whether the user is logging in or registering
	const [mode, setMode] = useState<'login' | 'register'>('login');

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
			return copy; // Returns updated error object
		});
	};

	// Handles submit action when user clicks login/register
	const handleSubmit = async (e?: React.FormEvent) => {
		e?.preventDefault();
		// Prevents multiple clicks
		if (submitting) return;

		// Runs validation and stops if errors exist
		if (!validate()) return;

		// Locks submission to avoid spam clicks
		setSubmitting(true);

		// Builds user object to store after successful login/register
		const user = {
			firstname: form.firstname,
			lastname: form.lastname,
			phone: form.phone,
			email: form.email,
			password: form.password,
		};
		console.log('här');

		const response = await apiRegisterUser(user);
		console.log(response);

		if (!response.success) {
			return;
		}

		// updateUserStorage(user);

		setSubmitting(false);

		// setModalOpen && setModalOpen(false);
	};

	const inputs = getAllInputs(mode);

	return (
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
				{mode === 'login' ? 'Skapa konto' : 'Har du redan ett konto? Logga in'}{' '}
			</button>
		</form>
	);
};
