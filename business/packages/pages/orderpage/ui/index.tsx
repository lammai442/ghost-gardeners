import './index.scss';
import { Order } from '@mojjen/order';
import type { OrderItems, OrderItem } from '@mojjen/orderitems';
import { useEffect, useState } from 'react';
import { Modal } from '../../../base/modal/ui';
import { Button } from '@mojjen/button';
import { CartProductCard } from '../../../base/cartProductCard';
import { apiGetMeals } from '../../../core/api/apiproducts/data';
import { Comment } from '@mojjen/comment';
import { HeaderComp } from '@mojjen/header';
import { IoLockClosedOutline } from 'react-icons/io5';
import { useWebSocketStore } from '@mojjen/usewebsocketstore';
import { Page } from '@mojjen/page';
import { useAuthStore } from '@mojjen/useauthstore';
import { apiGetUserByToken } from '@mojjen/apiusers';
import type { User } from '@mojjen/userdata';

export const OrderPage = () => {
	const [pendingOrders, setPendingOrders] = useState<OrderItems[]>([]);
	const [confirmedOrders, setConfirmedOrders] = useState<OrderItems[]>([]);
	const [doneOrders, setDoneOrders] = useState<OrderItems[]>([]);
	const [selectedOrder, setSelectedOrder] = useState<OrderItems | null>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [allProdList, setAllProdList] = useState<OrderItem[]>([]);
	const { orderFromWs } = useWebSocketStore();
	const { user, updateUserStorage } = useAuthStore();
	const [activeUser, setActiveUser] = useState<User | null>(null);

	useEffect(() => {
		const getUser = async () => {
			const res = await apiGetUserByToken(user?.token);
			if (!res.success) {
				const nullUser: null = null;
				updateUserStorage(nullUser);
			}
			setActiveUser(user);
		};

		getUser();
		const fetchMeals = async () => {
			const res = await apiGetMeals();
			if (res.success) setAllProdList(res.data.menuItems);
		};
		fetchMeals();
	}, []);

	/**
	 * Function to change the time format to HH:mm
	 */
	const formatTime = (isoString: string) => {
		const date = new Date(isoString);
		const hours = date.getHours().toString().padStart(2, '0');
		const minutes = date.getMinutes().toString().padStart(2, '0');
		return `${hours}:${minutes}`;
	};

	/**
	 * Removes "order" from the orderId and makes it uppercase to help the staff see better on their screen
	 */
	// sk = SK from DynamoDB (ex: "ORDER#order-xxxxx")
	const trimOrderId = (sk?: string, forApi = false) => {
		if (!sk) return 'OKÄND';

		// Remove ORDER#, we don't want to show this anywhere
		const clean = sk.replace(/^ORDER#/, '');

		if (forApi) {
			// For the API, we want order-xxxx in lowercase
			const match = clean.match(/^order-(.+)$/i);
			return match ? `order-${match[1].toLowerCase()}` : clean.toLowerCase();
		}

		// For frontend, we just want to show xxxx that's after order-
		const match = clean.match(/-(.+)$/);
		return match ? match[1].toUpperCase() : clean.toUpperCase();
	};

	/**
	 * Fetches the orders based on pending/confirmed/done
	 */
	useEffect(() => {
		if (!activeUser) {
			const fetchOrders = async () => {
				const userFromLocal = JSON.parse(localStorage.getItem('user') || '{}');

				try {
					const apiUrl = import.meta.env.VITE_API_URL;

					// Helper för fetch + auth
					const fetchWithAuth = (url: string) =>
						fetch(url, {
							headers: {
								Authorization: `Bearer ${userFromLocal.token}`,
								'Content-Type': 'application/json',
							},
						}).then((res) => res.json());

					// Kör alla anrop parallellt
					const [pendingRes, confirmedRes, doneRes] = await Promise.all([
						fetchWithAuth(`${apiUrl}/orders/status/pending`),
						fetchWithAuth(`${apiUrl}/orders/status/confirmed`),
						fetchWithAuth(`${apiUrl}/orders/status/done`),
					]);

					setPendingOrders(pendingRes.orders || []);
					setConfirmedOrders(confirmedRes.orders || []);
					setDoneOrders(doneRes.orders || []);
				} catch (error) {
					console.error('Kunde inte hämta ordrar:', error);
				}
			};

			fetchOrders();
		}
	}, [orderFromWs]);

	/**
	 * Function to confirm order. It takes the orderId and makes a PUT call to the API endpoint
	 */
	const confirmOrder = async (
		orderId: string,
		newStatus: string,
		updatedStaffComment?: string,
		updatedItems?: OrderItem[]
	) => {
		const orderIdForApi = trimOrderId(selectedOrder?.SK, true);
		const userFromLocal = JSON.parse(localStorage.getItem('user') || '{}');

		try {
			await fetch(`${import.meta.env.VITE_API_URL}/order/${orderIdForApi}`, {
				method: 'PUT',
				headers: {
					Authorization: `Bearer ${userFromLocal.token}`,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					status: newStatus,
					userComment: selectedOrder?.attribute?.userComment,
					staffComment: updatedStaffComment,
					items: updatedItems,
				}),
			});

			setPendingOrders((prev) => prev.filter((o) => o.id !== orderId));
			setConfirmedOrders((prev) => prev.filter((o) => o.id !== orderId));
			setDoneOrders((prev) => prev.filter((o) => o.id !== orderId));

			const updatedOrder = {
				...selectedOrder!,
				status: newStatus,
				attribute: {
					...selectedOrder!.attribute,
					userComment: selectedOrder!.attribute.userComment,
					staffComment:
						updatedStaffComment ?? selectedOrder!.attribute.staffComment,
					items: updatedItems ?? selectedOrder!.attribute.items,
				},
			};

			if (newStatus === 'confirmed')
				setConfirmedOrders((prev) => [...prev, updatedOrder]);
			if (newStatus === 'done')
				setDoneOrders((prev) => [...prev, updatedOrder]);

			setSelectedOrder(updatedOrder);
			setIsModalOpen(false);
		} catch (err) {
			console.error('Kunde inte uppdatera order:', err);
		}
	};

	return (
		<>
			<HeaderComp></HeaderComp>
			<Page titleText="Ordrar" srOnly={true}>
				{/* <section className="order-page__container flex flex__column flex__gap-3"> */}
				<section className="order-page__orders">
					<section className="flex flex__column flex__gap-2">
						<h2 className="heading-4">Väntande ({pendingOrders.length} st)</h2>
						{/* PENDING ORDERS */}
						<ul className={`order-page__orders-container`}>
							{pendingOrders.map((o) => (
								<div
									key={o.SK}
									onClick={() => {
										setSelectedOrder(o);
										setIsModalOpen(true);
									}}
								>
									<Order
										orderId={trimOrderId(o.SK)}
										time={formatTime(o.attribute?.createdAt)}
										orderStatus={o.status}
									/>
								</div>
							))}
						</ul>
					</section>
					{/* CONFIRMED ORDERS */}
					<section className="flex flex__column flex__gap-2">
						<h2 className="heading-4">
							Tillagas ({confirmedOrders.length} st)
						</h2>
						<ul className="order-page__orders-container">
							{confirmedOrders.map((o) => (
								<div
									key={o.SK}
									onClick={() => {
										setSelectedOrder(o);
										setIsModalOpen(true);
									}}
								>
									<Order
										orderId={trimOrderId(o.SK)}
										time={formatTime(o.attribute?.createdAt)}
										orderStatus={o.status}
									/>
								</div>
							))}
						</ul>
					</section>
					{/* DONE ORDERS */}
					<section className="flex flex__column flex__gap-2">
						<h2 className="heading-4">Redo ({doneOrders.length} st)</h2>
						<ul className="order-page__orders-container">
							{doneOrders.map((o) => (
								<div
									key={o.SK}
									onClick={() => {
										setSelectedOrder(o);
										setIsModalOpen(true);
									}}
								>
									<Order
										orderId={trimOrderId(o.SK)}
										time={formatTime(o.attribute?.createdAt)}
										orderStatus={o.status}
									/>
								</div>
							))}
						</ul>
					</section>
				</section>
				{/* </section> */}
				{/* MODAL OPENS WHEN CLICKING ON A ORDERITEM */}
				<Modal
					open={isModalOpen}
					setModalOpen={setIsModalOpen}
					titleContent={
						<h3 className="heading-4 text-light-beige">
							Order {selectedOrder && trimOrderId(selectedOrder?.SK)}
						</h3>
					}
				>
					{selectedOrder && (
						<div className="order-modal-content flex flex__column flex__gap-1-5">
							<section
								className={`order-modal-content__container ${
									selectedOrder.attribute.items.length > 2 ? 'scroll' : ''
								}`}
							>
								{selectedOrder.attribute.items.map((item, index) => (
									<CartProductCard
										key={`${selectedOrder.id}-${item.id}-${index}`}
										item={item}
										allProdList={allProdList}
										selectedOrder={selectedOrder}
										setSelectedOrder={setSelectedOrder}
									/>
								))}
							</section>

							{/* User Comment (read-only) */}
							{selectedOrder.attribute.userComment && (
								<div className="comment read-only">
									<h5 className="heading-5 font-color-red text-ketchup">
										Kommentar från kund
									</h5>
									<p className="base-small">
										{selectedOrder.attribute.userComment}
									</p>
								</div>
							)}

							{/* Staff Comment */}
							{selectedOrder.status === 'pending' ? (
								<Comment
									comment={selectedOrder.attribute.staffComment || ''}
									commentCount={
										(selectedOrder.attribute.staffComment || '').length
									}
									handleChangeComment={(e) => {
										const newComment = e.target.value;
										setSelectedOrder((prev) =>
											prev
												? {
														...prev,
														attribute: {
															...prev.attribute,
															staffComment: newComment,
														},
												  }
												: prev
										);
									}}
								/>
							) : selectedOrder.attribute.items.length > 0 ? (
								<div className="comment read-only">
									<h5 className="heading-5 font-color-red text-ketchup">
										Kommentar från personalen
									</h5>
									<p className="base-small">
										{selectedOrder.attribute.staffComment || '-'}
									</p>
								</div>
							) : null}

							{selectedOrder.attribute.items.length === 0 && (
								<>
									<h5 className="heading-5">
										Alla produkter är borttagna från ordern och därmed avbruten.
									</h5>
								</>
							)}

							{/* Buttons */}
							<div className="flex flex__column cart__ctas flex__gap-1 ">
								{selectedOrder.status === 'pending' && (
									<Button
										onClick={() =>
											confirmOrder(
												selectedOrder.id,
												'confirmed',
												selectedOrder.attribute.staffComment,
												selectedOrder.attribute.items
											)
										}
										aria="Bekräfta order"
										extraClasses="lock-btn"
									>
										<IoLockClosedOutline fontSize="1.5rem" />
										Lås och börja tillaga
									</Button>
								)}

								{selectedOrder.status === 'confirmed' && (
									<Button
										onClick={() => confirmOrder(selectedOrder.id, 'done')}
										aria="Markera som klar"
									>
										Flytta till Klar
									</Button>
								)}

								<Button
									onClick={() => setIsModalOpen(false)}
									aria="Stäng modal"
									style="outlined-red"
								>
									Stäng modal
								</Button>
							</div>
						</div>
					)}
				</Modal>
			</Page>
		</>
	);
};

/**
 * Author: StefanMogren
 * Created most of OrderPage. Missing actually fetching the orders from database.
 * Modified by: ninerino
 * Added functions to fetch orders, show them on the page, trim the orderId, change it to uppercase and change time format to HH:mm
 * Added functions to confirm and complete orders
 *
 * Modified by: StefanMogren
 * Updated useEffect to run every time WebSocket sends an order and not just once.
 *
 * Modified by: Lam
 * CSS on the site
 *
 * Modified by: Klara
 * WCAG sr-only h1, added more gap between columns "Väntande"/"Tillagas"/"Redo"
 *
 */
