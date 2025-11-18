/**
 * Author: Lam
 * Menupage that display the menu of Mojjens meals.
 */

import './index.scss';
import { ProductCard } from '@mojjen/productcard';
import type { Meal } from '@mojjen/productdata';

const meals: Meal[] = [
	{
		prodId: 'prod-2313',
		title: 'Vålberg vego',
		summary: 'Falafelkôrv med harissa och koriander',
		price: 45,
		img: 'src/assets/icons/sausage-icon.png',
		classBgColor: 'cucumber',
	},
	{
		prodId: 'prod-2313',
		title: 'Vålberg vego',
		summary: 'Falafelkôrv med harissa och koriander',
		price: 45,
		img: 'src/assets/icons/sausage-icon.png',
		classBgColor: 'cucumber',
	},
];

export const MenuPage = () => {
	return (
		<>
			<main className="main">
				<section className="product-list">
					{meals.map((item, index) => {
						return (
							<ProductCard
								key={index}
								title={item.title}
								summary={item.summary}
								classBgColor={item.classBgColor}
								price={item.price}
								img={item.img}
							/>
						);
					})}
				</section>
			</main>
		</>
	);
};
