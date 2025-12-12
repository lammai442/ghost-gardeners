import './index.scss';

import { ConstructError } from '@mojjen/construct-error';

export const ErrorPage = () => {
	return (
		<ConstructError
			color="bg-ketchup"
			title="Aj då"
			text={`Den här sidan verkar inte existera. Men ingen fara! Du kan snabbt komma tillbaka till startsidan!`}
		/>
	);
};

/**
 * Author: StefanMogren
 * Created ErrorPage. Catches any page not inside the Router.
 *
 */
