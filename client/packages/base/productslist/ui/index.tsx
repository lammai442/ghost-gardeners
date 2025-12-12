import './index.scss';
import clsx from 'clsx';
import type { Meal } from '@mojjen/productdata';
import { ProductCard } from '@mojjen/productcard';
import { CartProductCard } from '@mojjen/cartproductcard';

type Props =
	| {
			isCartItem?: boolean;
			allProdList?: Meal[];
			prodList: Meal[];
			classBgColor: string;
	  }
	| {
			isCartItem?: boolean;
			allProdList: Meal[];
			prodList: Meal[];
			classBgColor: string;
	  };

export const ProductsList = ({
	isCartItem,
	classBgColor,
	prodList,
	allProdList = [],
}: Props) => {
	const classNames = clsx('product-list', {
		'flex flex__column product-list__cart': isCartItem,
		grid: !isCartItem,
	});

	return (
		<ul className={classNames}>
			{prodList.map((item, index) => {
				return isCartItem === false ? (
					<ProductCard
						key={item.id}
						allProdList={allProdList}
						prodList={prodList}
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
						key={index}
						item={item}
						classBgColor={classBgColor}
						showQty={true}
						showIncramentBtn={false}
						isFlexColumn={true}
						isCartItem={isCartItem}
						allProdList={allProdList}
					/>
				);
			})}
		</ul>
	);
};

/**
 * Author: Klara Sköld
 * Products list
 *
 * Update: StefanMogren
 * Added filter to the API response from GetMenu
 * Update: Klara
 * Ternary operator: CartPage = CartProductCard, menuPage= ProductCard
 * Update: Lam
 * Removed OrderItem and replaced with Meal[]
 *
 * Update: Klara
 * Switched from autofit to autofill on grid to avoid extra spacing between columns
 *
 * Update: Klara
 * Edited classBgColor
 * */
