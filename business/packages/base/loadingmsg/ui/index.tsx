import './index.scss';

type Props = {
	extraClasses?: string;
	title: string;
	text?: string;
};
export const LoadingMsg = ({ title, text, extraClasses }: Props) => {
	return (
		<section className={`info-loading bg-super-light-beige ${extraClasses}`}>
			<div className="loader"></div>
			<section className="info-loading__container">
				<h2 className="heading-5">{title}</h2>
				<p className="base info-loading__text">{text}</p>
			</section>
		</section>
	);
};

/**
 * Author: Lam
 * Loading component with spinner animation and options for title and text
 *
 */
