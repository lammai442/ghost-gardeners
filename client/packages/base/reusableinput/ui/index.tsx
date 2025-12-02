import './index.scss';

type Props = {
	label: string;
	name: string;
	type?: string;
	value: string;
	placeholder?: string;
	error?: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const ReusableInput = ({
	label,
	name,
	type = 'text',
	value,
	placeholder,
	error,
	onChange,
}: Props) => {
	return (
		<div className="input-wrapper">
			<label className="base-small">{label}</label>

			<input
				name={name}
				type={type}
				value={value}
				placeholder={placeholder}
				onChange={onChange}
				className="input-base"
			/>

			{/* Om error finns visas det här under inputen */}
			{error && <p className="form-error">{error}</p>}
		</div>
	);
};
