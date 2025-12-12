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
import { Modal } from '@mojjen/modal';
import { useAuthStore } from '@mojjen/useauthstore';
import { apiGetOrdersByUser } from '@mojjen/apiusers';
import { sortMealListByLetter } from '@mojjen/helpfunctions';

type GetMealsResponse = {
	data: Meal[];
	status: number;
	success: boolean;
};

export const MenuPage = () => {
	const [allProdList, setAllProdList] = useState<Meal[]>([]);
	const [userOrdersList, setUserOrdersList] = useState<Meal[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [fetchError, setFetchError] = useState<boolean>(false);
	const navigate = useNavigate();
	const [modalOpen, setModalOpen] = useState(false);
	const { user } = useAuthStore();

	useEffect(() => {
		setLoading(true);

		const fetchMeals = async () => {
			const response: GetMealsResponse = await apiGetMeals();
			setLoading(false);
			if (response.success) setAllProdList(response.data);
			else setFetchError(true);
		};
		fetchMeals();

		if (user) {
			const fetchOrdersByUser = async () => {
				const response = await apiGetOrdersByUser(user.userId, user.token);
				const sortedMealList = sortMealListByLetter(response.mealList);
				setUserOrdersList(sortedMealList);
			};

			fetchOrdersByUser();
		}
	}, []);

	const handleNavigate = () => navigate('/cart');

	// If the modal is open the background is unscrollable.
	useEffect(() => {
		if (modalOpen === false) {
			document.body.style.overflow = 'unset';
		}
	}, [modalOpen]);

	const prodList = allProdList.filter((product) => product.category === 'MEAL');
	const sortedProdList = sortMealListByLetter(prodList);

	const generateTopContent = () => {
		return (
			<section className="flex flex__column flex__gap-1 menu__top-content">
				<h3 className="heading-3">Du har tidigare beställt</h3>

				{user && userOrdersList.length > 0 && (
					<ProductsList
						isCartItem={false}
						classBgColor={'bg-cucumber'}
						prodList={userOrdersList}
						allProdList={allProdList}
					/>
				)}
			</section>
		);
	};

	return (
		<>
			<Modal
				open={modalOpen}
				titleContent={<h3 className="heading-3 text-light-beige">Logga in</h3>}
				setModalOpen={setModalOpen}
			>
				<p>Placeholder modal content</p>
			</Modal>
			<Page
				titleText="Mojmeny"
				extraClasses="flex flex__column menu"
				topContent={
					user &&
					userOrdersList &&
					userOrdersList.length > 0 &&
					generateTopContent()
				}
			>
				{/* <Filter /> */}
				{/* <div className="App">
					<button onClick={handleOpenModal}>Open</button> */}
				{/* <button onClick={() => setModalOpen(true)}>Open</button> */}
				{/* </div> */}
				{fetchError && (
					<ConstructError
						color="bg-ketchup"
						title="Kunde inte ladda menyn"
						text={`Just nu verkar vi ha tekniska problem med vår server, prova gärna igen om en liten stund.`}
					/>
				)}
				{loading && <LoadingMsg title="Laddar menyn" />}
				{sortedProdList.length > 0 && (
					<ProductsList
						isCartItem={false}
						classBgColor={'bg-mustard'}
						prodList={sortedProdList}
						allProdList={allProdList}
					/>
				)}
				<Button
					aria="Gå till varukorgen"
					extraClasses="menu__button"
					onClick={handleNavigate}
				>
					Gå till varukorgen
				</Button>
			</Page>
		</>
	);
};

/**
 * Author: Lam
 * Menupage that display the menu of Mojjens meals by fetching from database
 *
 * Update: Klara
 * Page and button components added
 *
 * Bugfix: StefanMogren
 * Made so only meals show up, hid <Filter>
 *
 * Update: Lam
 * Change name of useState from mealData to allProdList because we fetch for all products in database
 *
 * Update: Klara
 * topContent added to page component
 *
 * Update: Klara
 * Added extra spacing between recent orders and menu
 *
 * Update: Klara
 * Edited the space between recept orders and menu.
 *
 * Update: Klara
 * Edited classBgColor
 *
 * Update: Lam
 * Change so top content array list always come in alphabetic order
 *
 * */
