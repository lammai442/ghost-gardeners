import { Page } from '@mojjen/page';
import './index.scss';
import { Button } from '@mojjen/button';
import { useNavigate } from 'react-router-dom';

export const HomePage = () => {
	const navigate = useNavigate();
	const handleClick = () => {
		navigate('/menu');
	};

	const navToConstructionPage = () => {
		navigate('/buildmeal');
	};
	return (
		<Page
			titleText="Vad är du sugen på idag?"
			extraClasses="flex flex__column home-page"
		>
			<p className="base">
				Upptäck våra färdiga mojmenyer redan nu. In a while crocodile kommer du
				att kunna bygga din alldeles egen moj. Vi jobbar på bakom kulisserna!
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
					onClick={navToConstructionPage}
					extraClasses="home-page__btn"
					style="outlined"
				>
					Bygg din egen moj
				</Button>
			</section>
		</Page>
	);
};

/**
 * Update: Klara
 * Page component added
 *
 * Update: Klara
 * Navigates user to a Under Construction Page on "Bygg din egen moj"-click
 */
