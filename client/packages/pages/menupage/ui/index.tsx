/**
 * Author: Lam
 * Menupage that display the menu of Mojjens meals.
 */

import './index.scss';
import { ProductCard } from '@mojjen/productcard';
import type { Meal } from '@mojjen/productdata';
import { useState, useEffect } from 'react';
import { getMeals } from '@mojjen/apiproducts';

const meals: Meal[] = [
	{
		prodId: 'prod-2313',
		title: 'Vålberg vego',
		summary: 'Falafelkôrv med harissa och koriander',
		price: 45,
		img: 'src/assets/icons/sausage-icon.png',
		status: 'inactive',
	},
	{
		prodId: 'prod-2313',
		title: 'Vålberg vego',
		summary: 'Falafelkôrv med harissa och koriander',
		price: 45,
		img: 'src/assets/icons/hotdog.png',
		status: 'active',
	},
	{
		prodId: 'prod-2313',
		title: 'Vålberg vego',
		summary: 'Falafelkôrv med harissa och koriander',
		price: 45,
		img: 'src/assets/icons/sausage-icon.png',
		status: 'active',
	},
	{
		prodId: 'prod-2313',
		title: 'Vålberg vego',
		summary: 'Falafelkôrv med harissa och koriander',
		price: 45,
		img: 'src/assets/icons/sausage-icon.png',
		status: 'active',
	},
	{
		prodId: 'prod-2313',
		title: 'Vålberg vego',
		summary: 'Falafelkôrv med harissa och koriander',
		price: 45,
		img: 'src/assets/icons/sausage-icon.png',
		status: 'inactive',
	},
];

const bgColors: string[] = [
	'bg-mustard',
	'bg-ketchup',
	'bg-cucumber',
	'bg-black',
];

export const MenuPage = () => {
	const [mealsData, setMealsData] = useState([]);

	useEffect(() => {
		const fetchMeals = async () => {
			const mealsData = await getMeals();
			console.log(mealsData.data);
		};
		fetchMeals();
	}, []);

	return (
		<>
			<main className="main">
				<section className="product-list">
					{meals.map((item, index) => {
						// Solution from ChatGTP to give a bgColor to every meal
						const classBgColor = bgColors[index % bgColors.length];
						return (
							<ProductCard
								key={index}
								title={item.title}
								summary={item.summary}
								classBgColor={classBgColor}
								price={item.price}
								img={item.img}
								status={item.status}
							/>
						);
					})}
				</section>
			</main>
		</>
	);
};
