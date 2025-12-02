import { Page } from '@mojjen/page';
import './index.scss';
import { Button } from '@mojjen/button';
import { useNavigate } from 'react-router-dom';

/**
 * Update: Klara
 * Page component added
 *
 */

export const AboutPage = () => {
	const navigate = useNavigate();
	const handleClick = () => {
		navigate('/menu');
	};
	return (
		<Page titleText="Om oss" extraClasses="flex flex__column about-page"></Page>
	);
};
