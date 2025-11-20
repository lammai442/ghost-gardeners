import './index.scss';
/**
 * Author: Lam
 * Loading component with spinner animation and options for title and text
 *
 */

type DataContent = {
	title: string;
	text?: string;
};
export const LoadingMsg = ({ title, text }: DataContent) => {
	return (
		<section className="info bg-super-light-beige">
			<div className="loader"></div>
			<section className="info__container">
				<h2 className="heading-2">{title}</h2>
				<p className="base info__text">{text}</p>
			</section>
		</section>
	);
};
