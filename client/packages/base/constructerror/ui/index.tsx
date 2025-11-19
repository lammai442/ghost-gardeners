import './index.scss';

type DataContent = {
	color: string;
	title: string;
	text: string;
};
export const ConstructError = ({ color, title, text }: DataContent) => {
	return (
		<section className="info bg-super-light-beige">
			<section className={`circle ${color}`}>
				<img src="/assets/socket-icon.svg" className="info__img" alt="" />
			</section>
			<section className="info__container">
				<h2 className="heading-2">{title}</h2>
				<p className="base info__text">{text}</p>
			</section>
			<a
				href="/"
				className="btn-base info__return-link bg-cucumber btn-text text-light-beige"
			>
				Till startsidan
			</a>
		</section>
	);
};
