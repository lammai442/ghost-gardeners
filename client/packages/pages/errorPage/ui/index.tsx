import { Page } from '@mojjen/page';
import './index.scss';

import { ConstructError } from '@mojjen/construct-error';

export const ErrorPage = () => {
	return (
		<Page titleText="404 - error" srOnly={true}>
			<ConstructError
				color="bg-ketchup"
				title="Aj då"
				text={`Den här sidan verkar inte existera. Men ingen fara! Du kan snabbt komma tillbaka till startsidan och hitta våra goa mojjar med knappen här under!`}
			/>
		</Page>
	);
};

/**
 * Author: StefanMogren
 * Created ErrorPage. Catches any page not inside the Router.
 *
 */

/**
 * Update: Klara
 * Page component added
 *
 */
