import type { ReactNode } from 'react';
import './index.scss';
import clsx from 'clsx';

type Props = {
	children: ReactNode;
	style?: string;
	extraClasses?: string;
};

export const CircleIcon = ({ children, style, extraClasses }: Props) => {
	const classNames = clsx(
		`circle-icon grid ${extraClasses}`,

		{
			'bg-cucumber': !style,
			'bg-black': style === 'black',
			'bg-ketchup': style === 'red',
		}
	);

	return <div className={classNames}>{children}</div>;
};

/**
 * Author: Klara Sköld
 * Created a reusable round icon.
 *
 */
