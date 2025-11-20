import './index.scss';
import { Page } from '@mojjen/page';
import { ProductsList } from '@mojjen/productslist';
import { testMeals } from '../../../../src/testdata';

/**
 * Author: Klara Sköld
 * This is the cart page.
 *
 */

export const CartPage = () => {
	const generateCartProducts = () => {
		{
			return testMeals.length > 0 && <ProductsList prodlist={testMeals} />;
		}
	};

	return <Page titleText="Varukorg">{generateCartProducts()}</Page>;
};
