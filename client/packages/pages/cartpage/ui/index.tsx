import './index.scss';
import { Page } from '@mojjen/page';
import { ProductCard } from '@mojjen/productcard';
import { testMeals } from '../../../../src/testdata';

/**
 * Author: Klara Sköld
 * This is the cart page.
 *
 */

const bgColors: string[] = ['bg-mustard', 'bg-ketchup', 'bg-cucumber'];

export const CartPage = () => {
	const generateCartProducts = () => {
		{
			return (
				testMeals.length > 0 && (
					<section className="product-list">
						{testMeals.map((item, index) => {
							// Solution from ChatGTP to give a bgColor to every meal with a pattern
							const classBgColor = bgColors[index % bgColors.length];
							return (
								<ProductCard
									key={item.id}
									item={item}
									classBgColor={classBgColor}
									showQty={true}
									showIncramentBtn={false}
								/>
							);
						})}
					</section>
				)
			);
		}
	};

	return <Page titleText="Varukorg">{generateCartProducts()}</Page>;
};
