import clsx from 'clsx';
import './index.scss';

type Props = {
	label: string;
	name: string;
	type?: string;
	readonly?: boolean;
	value: string;
	placeholder?: string;
	error?: string;
	autocomplete?: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const ReusableInput = ({
	label,
	name,
	type = 'text',
	value,
	placeholder,
	error,
	autocomplete,
	readonly,
	onChange,
}: Props) => {
	const classNames = clsx('input-base', {
		'input-base__readonly': readonly === true,
	});

	return (
		<div className="input-wrapper">
			<label className="base">{label}</label>

			<input
				name={name}
				type={type}
				value={value}
				placeholder={placeholder}
				onChange={onChange}
				className={classNames}
				// className="input-base"
				autoComplete={autocomplete}
				readOnly={readonly}
			/>

			{/* Om error finns visas det här under inputen */}
			{error && <p className="form-error base">{error}</p>}
		</div>
	);
};

/**
 * Author: Lam
 * AI generated code: Github Copilot and ChatGPT
 * Description: A reusable input component with label, error display, and styling
 *
 *Update: Klara
 * Props autocomplete and readonly with clsx class added
 */
