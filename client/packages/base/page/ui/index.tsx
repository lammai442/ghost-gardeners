import type { ReactNode } from 'react';
import './index.scss';
import clsx from 'clsx';

/**
 * Author: Klara Sköld
 * A page template
 *
 */

type Props = {
	children?: ReactNode;
	titleText: string;
	extraClasses?: string;
	srOnly?: boolean;
};

export const Page = ({ titleText, children, srOnly, extraClasses }: Props) => {
	const classNames = clsx('heading-1', 'page__title', {
		'sr-only': srOnly,
	});
	return (
		<section className={`page page__wrapper flex flex__column`}>
			<h1 className={classNames}>{titleText}</h1>
			<section className={` ${extraClasses}`}>{children}</section>
		</section>
	);
};
