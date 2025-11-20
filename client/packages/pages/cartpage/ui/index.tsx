import './index.scss';
import { Page } from '@mojjen/page';
import { ProductCard } from '@mojjen/productcard';
import { useCartStore } from '../../../core/stores/usecartstore/data';
// import { testMeals } from '../../../../src/testdata';

/**
 * Author: Klara Sköld
 * This is the cart page.
 *
 */

const bgColors: string[] = ['bg-mustard', 'bg-ketchup', 'bg-cucumber'];

export const CartPage = () => {
	const { cart, incrament, decrament } = useCartStore();

	const generateCartProducts = () => {
		{
			return (
				cart.length > 0 && (
					<section className="product-list">
						{cart.map((item, index) => {
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
