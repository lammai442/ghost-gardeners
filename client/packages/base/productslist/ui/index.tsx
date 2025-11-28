import './index.scss';
import clsx from 'clsx';
import type { Meal } from '@mojjen/productdata';
import { ProductCard } from '@mojjen/productcard';
import { CartProductCard } from '@mojjen/cartproductcard';
/**
 * Author: Klara Sköld
 * Products list
 *
 * Modified: StefanMogren
 * Added filter to the API response from GetMenu
 * Update: Klara
 * Ternary operator: CartPage = CartProductCard, menuPage= ProductCard
 * Update: Lam
 * Removed OrderItem and replaced with Meal[]
 *
 * */

type Props =
	| {
			isCartItem?: boolean;
			allProdList?: Meal[];
			prodList: Meal[];
	  }
	| {
			isCartItem?: boolean;
			allProdList: Meal[];
			prodList: Meal[];
	  };

const bgColors: string[] = ['bg-mustard', 'bg-ketchup', 'bg-cucumber'];

export const ProductsList = ({
	isCartItem,
	prodList,
	allProdList = [],
}: Props) => {
	// const productList2: OrderItem[] = prodlist;
	const classNames = clsx('product-list', {
		'flex flex__column product-list__cart': isCartItem,
		grid: !isCartItem,
	});

	return (
		<ul className={classNames}>
			{/* <ul className="grid product-list"> */}
			{prodList.map((item, index) => {
				// console.log('item från productslist', item);
				// Solution from ChatGTP to give a bgColor to every meal with a pattern
				const classBgColor = bgColors[index % bgColors.length];

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
