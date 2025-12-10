import type { ReactNode } from 'react';
import './index.scss';
import clsx from 'clsx';

type Props = {
	children?: ReactNode;
	topContent?: ReactNode;
	titleText?: string;
	extraClasses?: string;
	srOnly?: boolean;
};

export const Page = ({
	titleText,
	children,
	topContent,
	srOnly,
	extraClasses,
}: Props) => {
	const classNames = clsx('heading-1', {
		'sr-only': srOnly,
	});
	return (
		<section className={`page page__wrapper flex flex__column flex__gap-1-5`}>
			{topContent && <section>{topContent}</section>}
			{titleText && <h1 className={classNames}>{titleText}</h1>}
			<section className={` ${extraClasses}`}>{children}</section>
		</section>
	);
};

/**
 * Author: Klara Sköld
 * A page template
 * Update: Klara
 * topContent added
 *
 * Update: Lam
 * Added gap for page
 *
 * Update: Klara
 * Removed margin-bottom on h1
 */
