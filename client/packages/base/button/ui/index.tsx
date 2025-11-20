import type { ReactNode } from 'react';
import './index.scss';
import clsx from 'clsx';

/**
 * Author: Klara Sköld
 * Created a reusable button that accepts children and can be used across different parts of the design.
 *
 */

type Props = {
	children: ReactNode;
	onClick: () => void;
	style?: string;
	aria: string;
};

export const Button = ({ children, aria, style, onClick }: Props) => {
	const classNames = clsx(
		'btn',
		'border-radius',
		'base-bold',

		{
			'btn-green': !style,
			'btn-black': style === 'black',
			'btn-brown': style === 'brown',
		}
	);

	return (
		<button className={classNames} aria-label={aria} onClick={onClick}>
			{children}
		</button>
	);
};
