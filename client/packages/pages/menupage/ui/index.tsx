/**
 * Author: Lam
 * Menupage that display the menu of Mojjens meals by fetching from database
 */

import './index.scss';
import { ProductCard } from '@mojjen/productcard';
import type { Meal } from '@mojjen/productdata';
import { useState, useEffect } from 'react';
import { apiGetMeals } from '@mojjen/apiproducts';
import { CiFilter } from 'react-icons/ci';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { ConstructError } from '@mojjen/construct-error';

type GetMealsResponse = {
	data: Meal[];
	status: number;
	success: boolean;
};

const bgColors: string[] = ['bg-mustard', 'bg-ketchup', 'bg-cucumber'];

export const MenuPage = () => {
	const [mealsData, setMealsData] = useState<Meal[]>([]);
	const [fetchError, setFetchError] = useState<boolean>(false);

	useEffect(() => {
		const fetchMeals = async () => {
			const response: GetMealsResponse = await apiGetMeals();
			if (response.success) setMealsData(response.data);
			else setFetchError(true);
		};
		fetchMeals();
	}, []);

	return (
		<>
			<main className="main">
				<section className="product__wrapper">
					<section className="product-top">
						<h1 className="heading-3">Mojmeny</h1>
						<button className="filter__btn btn-text text-light-beige btn-base bg-cucumber">
							<CiFilter className="filter__icon" />
							<span>Filter</span>
							<MdKeyboardArrowDown className="filter__icon" />
						</button>
					</section>
					{fetchError && (
						<ConstructError
							color="bg-ketchup"
							title="Kunde inte ladda meny"
							text={`Just nu verkar vi ha tekniska problem med vår server, prova gärna igen om en liten stund.`}
						/>
					)}
					{mealsData.length > 0 && (
						<section className="product-list">
							{mealsData.map((item, index) => {
								// Solution from ChatGTP to give a bgColor to every meal
								const classBgColor = bgColors[index % bgColors.length];
								return (
									<ProductCard
										key={index}
										name={item.name}
										summary={item.summary}
										classBgColor={classBgColor}
										price={item.price}
										img={item.img}
										status={item.status}
										id={item.id}
									/>
								);
							})}
						</section>
					)}
				</section>
			</main>
		</>
	);
};
