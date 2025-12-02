import './index.scss';

// Vi definierar vilka props som inputen ska ta emot
type Props = {
	label: string; // Texten ovanför input
	name: string; // Fältets namn (kopplat till state i formuläret)
	type?: string; // Om inget anges blir det text
	value: string; // Det aktuella värdet från formuläret
	placeholder?: string; // Hjälptext i input
	error?: string; // Felmeddelande, visas under input
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Event för ändringar
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
