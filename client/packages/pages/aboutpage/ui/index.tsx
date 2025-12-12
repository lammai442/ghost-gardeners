import { Page } from '@mojjen/page';
import './index.scss';
import { Button } from '@mojjen/button';
import { useNavigate } from 'react-router-dom';
import { ContentBox } from '@mojjen/contentbox';

export const AboutPage = () => {
	const navigate = useNavigate();
	const handleClick = () => {
		navigate('/menu');
	};
	return (
		<Page titleText="Om oss" extraClasses="flex flex__column about-page">
			<section className="about-page__container base flex flex__column flex__gap-2">
				<article className="about-page__story base text-black">
					<div className="about-page__hero">
						<img src={'/assets/hero-about-mojjen.png'} alt="Mojjen" />
					</div>
					<h2 className="heading-2">"Det var en gång..."</h2>
					<p>
						En man som hette Göte. Göte var egentligen bara en helt vanlig kille
						från Edsvalla, men han hade ett ovanligt intresse. Han tyckte så
						rysligt mycket om korv.
					</p>
					<p>
						På det viset var det ledsamt att bo i Edsvalla. Där fanns nämligen
						varken pizzeria eller kiosk, förutom när det var match på
						fotbollsplanen. Men då serverades endast hamburgare. Dessutom
						tvingades man kolla på sport samtidigt.
					</p>
					<p>
						“Nu har jag fått nog!”, skrek Göte till sist en dag när han rullade
						ut från grusparkeringen i sin Ford Fiesta vars kofångare var
						dekorerad med dekalen “Förbjud radiosport”, efter att ha tvingas
						bevittna ännu en match mellan Edsvalla IF och Grums BK. “Jag öppnar
						en kôrvmoj.”
					</p>
					<p>
						Sagt och gjort. Göte startade sitt korvföretag år 1974 och än idag
						sjuder kokkorven i det klara, lagerbladsångande spadet.
					</p>
				</article>

				<section className="about-page__values text-black">
					<h2 className="heading-3 ">Våra hjärtefrågor</h2>
					<div className="about-page__values-grid">
						<ContentBox
							icon={
								<img
									src={'/assets/icons/hotdog.png'}
									alt=""
									aria-hidden="true"
								/>
							}
							titleLevel="h4"
							titleTxt="Kvalitet"
							text="Vi lagar allt med omsorg — från kryddblandning till brödets knaprighet. Kvalitet betyder bra råvaror och noggrannhet i varje steg."
						/>
						<ContentBox
							icon={
								<img
									src={'/assets/icons/bacon-bratwurst.png'}
									alt=""
									aria-hidden="true"
								/>
							}
							titleLevel="h4"
							titleTxt="Nära dig"
							text="Från Edsvalla med kärlek sedan 1974. Vi är en del av lokalsamhället och stolta över våra rötter."
						/>
						<ContentBox
							icon={
								<img
									src={'/assets/icons/protein.png'}
									alt=""
									aria-hidden="true"
								/>
							}
							titleLevel="h4"
							titleTxt="Hållbarhet"
							text="Vi strävar efter att välja lokala råvaror och minimera svinn. Hållbarhet får plats även i små kök."
						/>
					</div>
				</section>
				<aside className="about-page__contact base">
					<h2 className="heading-3 text-brown">Kontakt</h2>
					<address className="base base-small text-black">
						<div>Mojjen AB</div>
						<div>Adress: Korvgatan 1, Edsvalla</div>
						<div>
							Telefon:{' '}
							<a
								href="tel:+46532-123 45"
								aria-label="Ring Korvmojen på 0532-123 45"
							>
								0532-123 45
							</a>
						</div>
						<div>
							Mejladress:{' '}
							<a
								href="mailto:info@mojjen.se"
								aria-label="E-posta Korvmojen på info@mojjen.se"
							>
								info@mojjen.se
							</a>
						</div>
					</address>

					<div className="about-page__ctas flex flex__row flex__gap-1">
						<Button
							onClick={handleClick}
							aria={'Gå till menyn'}
							extraClasses={'btn-outlined'}
						>
							Se menyn
						</Button>
					</div>
				</aside>
			</section>
		</Page>
	);
};

/**
 * Author: Klara
 * AI Generated Content as part of this weeks assignments.
 * Page component added. The page content was generated using the AI tool included in vsCode.
 *
 * Update: Klara
 * Fixed img-src. Changed heading levels to remove WAVE warning about skipped levels.
 */
