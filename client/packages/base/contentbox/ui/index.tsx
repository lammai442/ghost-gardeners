import type { ReactNode } from 'react';
import './index.scss';
import clsx from 'clsx';
/**
 * Author: Klara Sköld
 * Created a reusable white box that accepts children and can be used across different parts of the design.
 *
 */

type Props = {
	extraClass: string;
	titleTxt?: string;
	text?: string;
	titleLevel?: string;
	style?: string;
	children?: ReactNode;
};

export const ContentBox = ({
	titleTxt,
	titleLevel,
	extraClass,
	style,
	children,
	text,
}: Props) => {
	const classNames = clsx(
		`flex flex__column bg-super-light-beige border-radius content-box ${extraClass}`,
		{ 'bg__light-red': style === 'red' }
	);

	const generateTitle = (
		titleLevel: string | undefined,
		titleText: string | undefined
	) => {
		if (titleLevel === 'h1') return <h1 className="heading-1 ">{titleText}</h1>;
		else if (titleLevel === 'h2')
			return <h2 className="heading-2 ">{titleText}</h2>;
		else if (titleLevel === 'h3')
			return <h3 className="heading-3 ">{titleText}</h3>;
	};
	const generateText = (text: string | undefined) => {
		return <p className="base ">{text}</p>;
	};

	return (
		<div className={classNames}>
			{generateTitle(titleLevel, titleTxt)}
			{generateText(text)}

			{children}
		</div>
	);
};
