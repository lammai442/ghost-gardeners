import './index.scss';
/**
 * Author: StefanMogren
 * Created ErrorPage. Catches any page not inside the Router.
 *
 */
import { ConstructError } from '@mojjen/construct-error';

export const ErrorPage = () => {
	return (
		<ConstructError
			color="bg-ketchup"
			title="Aj då"
			text={`Den här sidan verkar inte existera. Men ingen fara! Du kan snabbt komma tillbaka till startsidan och hitta våra goa mojjar med knappen här under!`}
		/>
	);
};
