import './index.scss';
/**
 * Author: StefanMogren
 * Created mobile view for footer component
 *
 * Update: Klara
 * Added responsive design
 */

export const FooterComp = () => {
	return (
		<>
			<div className="footer__wave"></div>
			<footer className="footer bg-cucumber ">
				<div className="flex flex__space-between footer__top">
					{/**
					 * * ----- Kontakt -----
					 */}
					<section className="flex-column-1-5">
						<h3 className="heading-4 text-dark-beige">Kontakt</h3>
						<address className="footer__container base-small text-light-beige">
							<span>Korvgatan 1</span>
							<span>666 66 Edsvalla</span>

							<a className="text-light-beige" href="tel:+4653212345">
								Tel: 0532-123 45
							</a>
							<a className="text-light-beige" href="mailto:info@mojjen.se">
								info@mojjen.se
							</a>
						</address>
					</section>
					{/**
					 * * ----- Öppettider -----
					 */}
					<section className="flex-column-1-5">
						<h3 className="heading-4 text-dark-beige">Öppettider</h3>
						<ul className="footer__container text-light-beige base-small">
							<li className="footer__open-hours">
								<span>Mån-Fre:</span>
								<span>
									<time dateTime="11:00">11:00</time>
									{' - '}
									<time dateTime="21:00">21:00</time>
								</span>
							</li>
							<li className="footer__open-hours ">
								<span>Lördag:</span>
								<span>
									<time dateTime="12:00">12:00</time>
									{' - '}
									<time dateTime="22:00">22:00</time>
								</span>
							</li>
							<li className="footer__open-hours">
								<span>Söndag:</span>
								<span>
									<time dateTime="12:00">12:00</time>
									{' - '}
									<time dateTime="22:00">20:00</time>
								</span>
							</li>
						</ul>
					</section>
					{/**
					 * * ----- Följ oss -----
					 */}
					<section className="flex-column-1-5">
						<h3 className="heading-4 text-dark-beige">Följ oss</h3>
						<section className="footer__social-container">
							<a
								href="https://www.facebook.com/"
								className="btn-base footer__social-link bg-light-beige"
							>
								<img
									src="/assets/facebook-logo.svg"
									className="footer__social-logo"
									alt="Facebook logga"
								/>
							</a>
							<a
								href="https://www.instagram.com/"
								className="btn-base footer__social-link bg-light-beige"
							>
								<img
									src="/assets/instagram-logo.svg"
									className="footer__social-logo"
									alt="Instagram logga"
								/>
							</a>
							<a
								href="https://www.tumblr.com/"
								className="btn-base footer__social-link bg-light-beige"
							>
								<img
									src="/assets/tumblr-logo.svg"
									className="footer__social-logo"
									alt="Tumblr logga"
								/>
							</a>
						</section>
					</section>
				</div>
				<hr className="footer__horizontal-rule bg-dark-beige" />
				<section className="footer__bottom-container">
					<h3 className="heading-4 text-dark-beige">
						Det är alltid läge för en kôrv
					</h3>
					<p className="text-light-beige base-small">
						© 2024 Mojjen. Sedan 1974
					</p>
				</section>
			</footer>
		</>
	);
};
