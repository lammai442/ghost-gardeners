import './index.scss';
/**
 * Author: StefanMogren
 * Created UnderConstructionPage. Placeholder for every currently unfinished pages.
 *
 */
import { ConstructError } from '@mojjen/construct-error';

export const UnderConstructionPage = () => {
	return (
		<ConstructError
			color="bg-cucumber"
			title="Under uppbyggnad"
			text={`Just nu jobbar vi på något nytt och spännande här. Men oroa dig inte -
  menyn och beställningen funkar precis som vanligt. Kom tillbaka snart
  och upptäck vår nya moj!`}
		/>
	);
};
