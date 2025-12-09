import type { ReactNode } from 'react';
import './index.scss';
import clsx from 'clsx';

/**
 * Author: Klara Sköld
 * Created a reusable button that accepts children and can be used across different parts of the design.
 * Edited by: ninerino
 * Added btn-outlined-red
 */

type Props = {
	children: ReactNode;
	onClick: () => void;
	style?: string;
	aria: string;
	extraClasses?: string;
	width?: string;
	isDisabled?: boolean;
};

export const Button = ({
	extraClasses,
	children,
	aria,
	style,
	isDisabled,
	onClick,
}: Props) => {
	const classNames = clsx('btn', 'base-bold', 'border-radius', extraClasses, {
		'btn-green border-radius': !style,
		'btn-red border-radius': style === 'red',
		'btn-black border-radius': style === 'black',
		'btn-brown border-radius': style === 'brown',
		'btn-simple': style === 'simple',
		'btn-outlined': style === 'outlined',
		'btn-outlined-red': style ==='outlined-red'
	});

	return (
		<button
			className={classNames}
			disabled={isDisabled}
			aria-label={aria}
			onClick={onClick}
		>
			{children}
		</button>
	);
};
