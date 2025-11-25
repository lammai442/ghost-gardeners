import './index.scss';
import type { Meal } from '@mojjen/productdata';
import { useState, useEffect } from 'react';
import { apiGetMeals } from '@mojjen/apiproducts';
import { ConstructError } from '@mojjen/construct-error';
import { LoadingMsg } from '@mojjen/loading-msg';
import { Page } from '@mojjen/page';
import { Button } from '@mojjen/button';
import { ProductsList } from '@mojjen/productslist';
import { useNavigate } from 'react-router-dom';
import { Filter } from '@mojjen/filter';

/**
 * Author: Lam
 * Menupage that display the menu of Mojjens meals by fetching from database
 *
 */

/**
 * Update: Klara
 * Page and button components added
 *
 */

type GetMealsResponse = {
	data: Meal[];
	status: number;
	success: boolean;
};

export const MenuPage = () => {
	const [mealsData, setMealsData] = useState<Meal[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [fetchError, setFetchError] = useState<boolean>(false);
	const navigate = useNavigate();

	useEffect(() => {
		setLoading(true);

		const fetchMeals = async () => {
			const response: GetMealsResponse = await apiGetMeals();
			setLoading(false);
			if (response.success) setMealsData(response.data);
			else setFetchError(true);
		};
		fetchMeals();
	}, []);

	const handleNavigate = () => navigate('/cart');
	console.log(mealsData);
	return (
		<Page titleText="Mojmeny" extraClasses="flex flex__column menu">
			<Filter />

			{fetchError && (
				<ConstructError
					color="bg-ketchup"
					title="Kunde inte ladda menyn"
					text={`Just nu verkar vi ha tekniska problem med vår server, prova gärna igen om en liten stund.`}
				/>
			)}
			{loading && <LoadingMsg title="Laddar menyn" />}

			{mealsData.length > 0 && <ProductsList prodlist={mealsData} />}
			<Button
				aria="Gå till varukorgen"
				extraClasses="menu__button"
				onClick={handleNavigate}
			>
				Gå till varukorgen
			</Button>
		</Page>
	);
};

// ! Original
// type GetMealsResponse = {
// 	data: Meal[];
// 	status: number;
// 	success: boolean;
// };

// const bgColors: string[] = ['bg-mustard', 'bg-ketchup', 'bg-cucumber'];

// export const MenuPage = () => {
// 	const [mealsData, setMealsData] = useState<Meal[]>([]);
// 	const [loading, setLoading] = useState<boolean>(false);
// 	const [fetchError, setFetchError] = useState<boolean>(false);

// 	useEffect(() => {
// 		setLoading(true);

// 		const fetchMeals = async () => {
// 			const response: GetMealsResponse = await apiGetMeals();
// 			setLoading(false);
// 			if (response.success) setMealsData(response.data);
// 			else setFetchError(true);
// 		};
// 		fetchMeals();
// 	}, []);

// 	return (
// 		<>
// 			<main className="main">
// 				<section className="product__wrapper">
// 					<section className="product-top">
// 						<h1 className="heading-3">Mojmeny</h1>
// 						<button className="filter__btn btn-text text-light-beige btn-base bg-cucumber">
// 							<CiFilter className="filter__icon" />
// 							<span>Filter</span>
// 							<MdKeyboardArrowDown className="filter__icon" />
// 						</button>
// 					</section>
// 					{fetchError && (
// 						<ConstructError
// 							color="bg-ketchup"
// 							title="Kunde inte ladda menyn"
// 							text={`Just nu verkar vi ha tekniska problem med vår server, prova gärna igen om en liten stund.`}
// 						/>
// 					)}
// 					{loading && <LoadingMsg title="Laddar menyn" />}
// 					{mealsData.length > 0 && (
// 						<section className="product-list">
// 							{mealsData.map((item, index) => {
// 								// Solution from ChatGTP to give a bgColor to every meal with a pattern
// 								const classBgColor = bgColors[index % bgColors.length];
// 								return (
// 									<ProductCard
// 										key={item.id}
// 										item={item}
// 										classBgColor={classBgColor}
// 										showQty={false}
// 										showIncramentBtn={true}
// 										isFlexColumn={true}
// 									/>
// 								);
// 							})}
// 						</section>
// 					)}
// 				</section>
// 			</main>
// 		</>
// 	);
// };
