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
		<Page titleText='Mojjan - "Det är alltid läge för en korv'>
			<img src="../../../public/mojjan.png" alt="" />
			<p className="base">
				Det här är Mojjens startsida. In a while crocodile kommer en massa info
				dyka upp här. T ex meals, dina favoriter (om du är inloggad), bygg din
				egen kôrv etc... Tills vidare tycker vi att du kan gå och köpa en kôrv.
			</p>
			<Button aria="Till menyn" onClick={handleClick}>
				Köp en kôrv
			</Button>
		</Page>
	);
};
