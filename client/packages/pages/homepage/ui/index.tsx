import { Page } from '@mojjen/page';
import './index.scss';
import { Button } from '@mojjen/button';
import { useNavigate } from 'react-router-dom';

/**
 * Update: Klara
 * Page component added
 *
 */

export const HomePage = () => {
	const navigate = useNavigate();
	const handleClick = () => {
		navigate('/menu');
	};
	return (
		<Page
			titleText="Vad är du sugen på idag?"
			extraClasses="flex flex__column home-page"
		>
			{/* <img src="../../../public/mojjan.png" alt="" /> */}
			<p className="base">
				Det här är Mojjens startsida. In a while crocodile kommer en massa info
				dyka upp här. T ex meals, dina favoriter (om du är inloggad), bygg din
				egen kôrv etc... Tills vidare tycker vi att du kan gå och köpa en kôrv.
			</p>
			<section className="flex home-btns">
				<Button
					aria="Till menyn"
					onClick={handleClick}
					extraClasses="home-page__btn"
				>
					Färdiga mojmenyer
				</Button>
				<Button
					aria="Till menyn"
					onClick={handleClick}
					extraClasses="home-page__btn"
					style="outlined"
				>
					Bygg din egen moj
				</Button>
			</section>
		</Page>
	);
};
