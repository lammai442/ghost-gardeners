import { useRef, type ReactNode, type RefObject } from 'react';
import './index.scss';
import clsx from 'clsx';
import { useOnClickOutside } from 'usehooks-ts';

type Props = {
	extraClass?: string;
	titleTxt?: string;
	text?: string;
	titleLevel?: string;
	style?: string;
	children?: ReactNode;
	icon?: ReactNode;
	setModalOpen?: (arg0: boolean) => void;
};

export const ContentBox = ({
	titleTxt,
	setModalOpen,
	titleLevel,
	extraClass,
	style,
	children,

	text,
	icon,
}: Props) => {
	const modalRef = useRef<HTMLDivElement>(null);
	const classNames = clsx(
		`flex flex__column bg-light-beige border-radius content-box ${extraClass}`,
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
		else if (titleLevel === 'h4')
			return <h4 className="heading-4 ">{titleText}</h4>;
		else if (titleLevel === 'h5')
			return <h5 className="heading-5 ">{titleText}</h5>;
	};
	const generateText = (text: string | undefined) => {
		return <p className="base ">{text}</p>;
	};

	const handleClickoutside = (): void => {
		if (setModalOpen) setModalOpen(false);
	};

	useOnClickOutside(modalRef as RefObject<HTMLElement>, handleClickoutside);

	return (
		<div ref={modalRef} className={classNames}>
			{icon}
			{generateTitle(titleLevel, titleTxt)}
			{text && generateText(text)}

			{children}
		</div>
	);
};

/**
 * Author: Klara Sköld
 * Created a reusable white box that accepts children and can be used across different parts of the design.
 *
 */
