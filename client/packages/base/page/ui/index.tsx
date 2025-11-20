import type { ReactNode } from 'react';
import './index.scss';

/**
 * Author: Klara Sköld
 * A page template
 *
 */

type Props = {
	children?: ReactNode;
	titleText: string;
};

export const Page = ({ titleText, children }: Props) => {
	return (
		<section className="page page__wrapper cart">
			<h1 className="heading-1 page__title">{titleText}</h1>
			{children}
		</section>
	);
};
