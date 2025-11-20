import type { ReactNode } from 'react';
import './index.scss';
import clsx from 'clsx';

/**
 * Author: Klara Sköld
 * Created a reusable round icon.
 *
 */

type Props = {
	children: ReactNode;
	style?: string;
};

export const CircleIcon = ({ children, style }: Props) => {
	const classNames = clsx(
		'circle-icon grid',

		{
			'bg-cucumber': !style,
			'bg-black': style === 'black',
		}
	);

	return <div className={classNames}>{children}</div>;
};
