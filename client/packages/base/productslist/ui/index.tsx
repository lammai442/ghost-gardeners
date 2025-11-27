import type { ReactNode } from 'react';
import './index.scss';
import clsx from 'clsx';
import type { Meal } from '@mojjen/productdata';
import { ProductCard } from '@mojjen/productcard';
import { ContentBox } from '@mojjen/contentbox';
import { CartProductCard } from '@mojjen/cartproductcard';
/**
 * Author: Klara Sköld
 * Products list
 *
 * Modified: StefanMogren
 * Added filter to the API response from GetMenu
 * Update: Klara
 * Ternary operator: CartPage = CartProductCard, menuPage= ProductCard
 *
 */

type Props = {
	prodlist: OrderItem[];
	isCartItem?: boolean;
};

const bgColors: string[] = ['bg-mustard', 'bg-ketchup', 'bg-cucumber'];

export const ProductsList = ({ prodlist, isCartItem }: Props) => {
	console.log('isCartItem: ', isCartItem);

	const mealList = prodlist.filter((product) => product.category === 'MEAL');

	const classNames = clsx('product-list', {
		'flex flex__column product-list__cart': isCartItem,
		grid: !isCartItem,
	});

	return (
		<ul className={classNames}>
			{/* <ul className="grid product-list"> */}
			{mealList.map((item, index) => {
				// console.log('item från productslist', item);
				// Solution from ChatGTP to give a bgColor to every meal with a pattern
				const classBgColor = bgColors[index % bgColors.length];
				return isCartItem === false ? (
					<ProductCard
						key={item.id}
						item={item}
						classBgColor={classBgColor}
						showQty={true}
						showIncramentBtn={false}
						isFlexColumn={true}
						isCartItem={isCartItem}
						showDrinkOpt={true}
					/>
				) : (
					<CartProductCard
						key={item.itemId}
						item={item}
						classBgColor={classBgColor}
						showQty={true}
						showIncramentBtn={false}
						isFlexColumn={true}
						isCartItem={isCartItem}
					/>
				);
			})}
		</ul>
	);
};
