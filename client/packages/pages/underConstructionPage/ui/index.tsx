import { Page } from '@mojjen/page';
import './index.scss';

import { ConstructError } from '@mojjen/construct-error';

export const UnderConstructionPage = () => {
	return (
		<Page titleText={'Sidan är under uppbyggnad'} srOnly={true}>
			<ConstructError
				color="bg-cucumber"
				title="Under uppbyggnad"
				text={`Just nu jobbar vi på något nytt och spännande här. Men oroa dig inte -
  menyn och beställningen funkar precis som vanligt. Kom tillbaka snart
  och upptäck vår nya moj!`}
			/>
		</Page>
	);
};

/**
 * Author: StefanMogren
 * Created UnderConstructionPage. Placeholder for every currently unfinished pages.
 *
 */

/**
 * Update: Klara
 * Page component added
 *
 */
