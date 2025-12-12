import type { ReactNode } from 'react';
import './index.scss';
import clsx from 'clsx';

type Props = {
	children: ReactNode;
	onClick?: () => void;
	style?: string;
	aria: string;
	extraClasses?: string;
	width?: string;
	isDisabled?: boolean;
	type?: 'button' | 'submit' | 'reset';
};

export const Button = ({
	extraClasses,
	children,
	aria,
	style,
	isDisabled,
	type,
	onClick,
}: Props) => {
	const classNames = clsx('btn', 'base-bold', 'border-radius', extraClasses, {
		'btn-green': !style,
		'btn-red': style === 'red',
		'btn-black': style === 'black',
		'btn-brown': style === 'brown',
		'btn-simple': style === 'simple',
		'btn-outlined': style === 'outlined',
		'btn-outlined-red': style === 'outlined-red',
	});

	return (
		<button
			className={classNames}
			disabled={isDisabled}
			aria-label={aria}
			onClick={onClick}
			type={type}
		>
			{children}
		</button>
	);
};

/**
 * Author: Klara Sköld
 * Created a reusable button that accepts children and can be used across different parts of the design.
 *
 * Update: Klara, removed redundant border-radius classes
 */
