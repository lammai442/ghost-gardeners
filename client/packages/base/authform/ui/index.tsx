import './index.scss';
import { useState } from 'react';
import { useAuthStore } from '../../../core/stores/useauthstore/data';

type Props = {
	setModalOpen?: (open: boolean) => void;
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^[0-9\s+()-]{6,20}$/;
const passRegex = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9])/;

export const AuthForm = ({ setModalOpen }: Props) => {
	const updateUserStorage = useAuthStore((s: any) => s.updateUserStorage);

	const [mode, setMode] = useState<'login' | 'register'>('login');
	const [submitting, setSubmitting] = useState(false);

	const [form, setForm] = useState({
		firstname: '',
		lastname: '',
		phone: '',
		email: '',
		password: '',
		confirmpassword: '',
	});

	const [errors, setErrors] = useState<Record<string, string>>({});

	const validate = () => {
		const e: Record<string, string> = {};

		if (!form.email || !emailRegex.test(form.email)) {
			e.email = 'Ange en giltig e-postadress';
		}

		if (!form.password || !passRegex.test(form.password)) {
			e.password =
				'Lösenord måste innehålla minst 1 gemen, 1 versal, 1 siffra och 1 specialtecken';
		}

		if (mode === 'register') {
			if (!form.firstname) e.firstname = 'Förnamn krävs';
			else if (form.firstname.length < 2 || form.firstname.length > 25)
				e.firstname = 'Förnamn måste vara 2–25 tecken';

			if (!form.lastname) e.lastname = 'Efternamn krävs';
			else if (form.lastname.length < 2 || form.lastname.length > 25)
				e.lastname = 'Efternamn måste vara 2–25 tecken';
			if (!form.phone || !phoneRegex.test(form.phone))
				e.phone = 'Ange ett giltigt telefonnummer';
			if (!form.confirmpassword || form.confirmpassword !== form.password)
				e.confirmpassword = 'Lösenorden matchar inte';
		}

		setErrors(e);
		return Object.keys(e).length === 0;
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setForm({ ...form, [e.target.name]: e.target.value });
		// remove any field-specific error when user types
		setErrors((prev) => {
			const copy = { ...prev };
			delete copy[e.target.name];
			return copy;
		});
	};

	const handleSubmit = (e?: React.FormEvent) => {
		e?.preventDefault();
		if (submitting) return;

		if (!validate()) return;

		setSubmitting(true);

		// In this demo app there's no backend hooked up, so we 'simulate' successful login/register
		const user = {
			firstname: form.firstname || 'Gäst',
			lastname: form.lastname || '',
			phone: form.phone || '',
			email: form.email,
		};

		// Persist user to global store (and localStorage)
		try {
			updateUserStorage && updateUserStorage(user);
		} catch (err) {
			// swallow — keep simple flow for demo
			console.error('Failed to update user', err);
		}

		setSubmitting(false);

		// Close modal if we have control
		setModalOpen && setModalOpen(false);
	};

	const switchTo = (m: 'login' | 'register') => {
		setMode(m);
		setErrors({});
	};

	return (
		<form className="auth-form" onSubmit={handleSubmit} noValidate>
			<nav className="auth-form__nav flex flex__gap-1">
				<button
					type="button"
					className={`btn-base ${
						mode === 'login'
							? 'bg-dark-ketchup text-light-beige'
							: 'bg-light-beige text-black'
					}`}
					onClick={() => switchTo('login')}
				>
					Logga in
				</button>
				<button
					type="button"
					className={`btn-base ${
						mode === 'register'
							? 'bg-dark-ketchup text-light-beige'
							: 'bg-light-beige text-black'
					}`}
					onClick={() => switchTo('register')}
				>
					Registrera
				</button>
			</nav>

			<div className="auth-form__body">
				{mode === 'register' && (
					<>
						<label className="base">Förnamn</label>
						<input
							name="firstname"
							value={form.firstname}
							onChange={handleChange}
							className="input-base"
							placeholder="Ditt förnamn"
						/>
						{errors.firstname && (
							<p className="form-error">{errors.firstname}</p>
						)}

						<label className="base">Efternamn</label>
						<input
							name="lastname"
							value={form.lastname}
							onChange={handleChange}
							className="input-base"
							placeholder="Ditt efternamn"
						/>
						{errors.lastname && <p className="form-error">{errors.lastname}</p>}

						<label className="base">Telefon</label>
						<input
							name="phone"
							value={form.phone}
							onChange={handleChange}
							className="input-base"
							placeholder="Telefonnummer"
						/>
						{errors.phone && <p className="form-error">{errors.phone}</p>}
					</>
				)}

				<label className="base">E-post</label>
				<input
					name="email"
					value={form.email}
					onChange={handleChange}
					className="input-base"
					placeholder="din@mail.se"
				/>
				{errors.email && <p className="form-error">{errors.email}</p>}

				<label className="base">Lösenord</label>
				<input
					name="password"
					type="password"
					value={form.password}
					onChange={handleChange}
					className="input-base"
					placeholder="Minst 6 tecken"
				/>
				{errors.password && <p className="form-error">{errors.password}</p>}

				{mode === 'register' && (
					<>
						<label className="base">Bekräfta lösenord</label>
						<input
							name="confirmpassword"
							type="password"
							value={form.confirmpassword}
							onChange={handleChange}
							className="input-base"
							placeholder="Skriv lösenordet igen"
						/>
						{errors.confirmpassword && (
							<p className="form-error">{errors.confirmpassword}</p>
						)}
					</>
				)}

				<div className="auth-form__actions flex flex__gap-1">
					<button
						className="btn-base bg-dark-ketchup text-light-beige"
						type="submit"
						disabled={submitting}
					>
						{submitting
							? 'Vänta...'
							: mode === 'login'
							? 'Logga in'
							: 'Registrera'}
					</button>
				</div>
			</div>
		</form>
	);
};
