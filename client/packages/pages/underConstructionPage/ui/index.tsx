import './index.scss';
export const UnderConstructionPage = () => {
	return (
		<section className="info__container bg-light-beige">
			<section className="circle bg-cucumber">
				<img src="/assets/socket-icon.svg" className="info__img" alt="" />
			</section>
			<h2 className="heading-2">Under uppbyggnad</h2>
			<p className="base info__text">
				Just nu jobbar vi på något nytt och spännande här. Men oroa dig inte -
				menyn och beställningen funkar precis som vanligt. Kom tillbaka snart
				och upptäck vår nya moj!
			</p>
			<a
				href="/"
				className="btn-base info__return-link bg-cucumber btn-text text-light-beige"
			>
				Till startsidan
			</a>
		</section>
	);
};
