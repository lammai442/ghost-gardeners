import './index.scss';
import { Order } from '@mojjen/order';
import type { OrderItems, OrderItem } from '@mojjen/orderitems';
import { useEffect, useState } from 'react';
import { Modal } from '../../../base/modal/ui';
import { Button } from '@mojjen/button';
import { CartProductCard } from '../../../base/cartProductCard';
import { Meal } from '@mojjen/productdata';
import { apiGetMeals } from '../../../core/api/apiproducts/data';
import {Comment} from '@mojjen/comment'

export const OrderPage = () => {
	const [pendingOrders, setPendingOrders] = useState<OrderItems[]>([]);
	const [confirmedOrders, setConfirmedOrders] = useState<OrderItems[]>([]);
	const [doneOrders, setDoneOrders] = useState<OrderItems[]>([]);
	const [selectedOrder, setSelectedOrder] = useState<OrderItems | null>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [allProdList, setAllProdList] = useState<Meal[]>([]);



	useEffect(() => {
		const fetchMeals = async () => {
			const res = await apiGetMeals();
			if (res.success) setAllProdList(res.data);
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
		const fetchOrders = async () => {
			try {
				const [pendingRes, confirmedRes, doneRes] = await Promise.all([
					fetch(`${import.meta.env.VITE_API_URL}/orders/status/pending`).then(
						(res) => res.json()
					),
					fetch(`${import.meta.env.VITE_API_URL}/orders/status/confirmed`).then(
						(res) => res.json()
					),
					fetch(`${import.meta.env.VITE_API_URL}/orders/status/done`).then(
						(res) => res.json()
					),
				]);

				/**
				 * Updates states with the orders
				 */
				setPendingOrders(pendingRes.orders || []);
				setConfirmedOrders(confirmedRes.orders || []);
				setDoneOrders(doneRes.orders || []);
			} catch (error) {
				console.error('Kunde inte hämta ordrar:', error);
			}
		};

		fetchOrders();
	}, []);

	/**
	 * Function to confirm order. It takes the orderId and makes a PUT call to the API endpoint
	 */
	const confirmOrder = async (orderId: string, newStatus: string, updatedStaffComment?: string, updatedItems?: OrderItem[]) => {
		const orderIdForApi = trimOrderId(selectedOrder?.SK, true);

		try {
			await fetch(`${import.meta.env.VITE_API_URL}/order/${orderIdForApi}`, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ status: newStatus, staffComment: updatedStaffComment, items: updatedItems }),
			});

			setPendingOrders((prev) => prev.filter((o) => o.id !== orderId));
			setConfirmedOrders((prev) => prev.filter((o) => o.id !== orderId));
			setDoneOrders((prev) => prev.filter((o) => o.id !== orderId));

			const updatedOrder = {
				...selectedOrder!,
				status: newStatus,
				attribute: {
					...selectedOrder!.attribute,
					staffComment: updatedStaffComment ?? selectedOrder!.attribute.staffComment,
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
		<main className="order-page">
			<section className="order-page__container flex flex__column flex__gap-3">
				<section className="order-page__orders">
					<section className="flex flex__column flex__gap-2">
						<h2 className="heading-3">Väntande ({pendingOrders.length} st)</h2>
						<ul className="order-page__orders-container">
							{pendingOrders.map((o) => (
								<div
									key={o.id}
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
					<section className="flex flex__column flex__gap-2">
						<h2 className="heading-3">
							Tillagas ({confirmedOrders.length} st)
						</h2>
						<ul className="order-page__orders-container">
							{confirmedOrders.map((o) => (
								<div
									key={o.id}
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
					<section className="flex flex__column flex__gap-2">
						<h2 className="heading-3">
							Redo att hämtas ({doneOrders.length} st)
						</h2>
						<ul className="order-page__orders-container">
							{doneOrders.map((o) => (
								<div
									key={o.id}
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
			</section>

			<Modal
				open={isModalOpen}
				setModalOpen={setIsModalOpen}
				titleContent=
				{<h3 className="heading-4 text-light-beige">
				Order {selectedOrder && trimOrderId(selectedOrder?.SK)}
				</h3>}
			>
			{selectedOrder && (
				<div className="order-modal-content">
				{selectedOrder.attribute.items.map((item, index) => (
					<CartProductCard
					key={`${selectedOrder.id}-${item.id}-${index}`}
					item={item}
					allProdList={allProdList}
					classBgColor="bg-super-light-beige"
					selectedOrder={selectedOrder}
					setSelectedOrder={setSelectedOrder}
					/>
				))}

			{/* Staff Comment */}
			{selectedOrder.status === 'pending' ? (
				<Comment
				comment={selectedOrder.attribute.staffComment || ''}
				commentCount={(selectedOrder.attribute.staffComment || '').length}
				handleChangeComment={(e) => {
					const newComment = e.target.value;
					setSelectedOrder((prev) =>
					prev
						? { ...prev, attribute: { ...prev.attribute, staffComment: newComment } }
						: prev
					);
				}}
				/>
			) : (
				<div className="comment read-only">
				<h5 className="heading-5 font-color-red text-ketchup">Staff Kommentar</h5>
				<p className="base">{selectedOrder.attribute.staffComment || '-'}</p>
				</div>
			)}

			{/* Buttons */}
			{selectedOrder.status === 'pending' && (
				<Button
				onClick={() => confirmOrder(selectedOrder.id, 'confirmed', selectedOrder.attribute.staffComment, selectedOrder.attribute.items)}
				aria="Bekräfta order"
				>
				Bekräfta order
				</Button>
			)}
			{/* Gör ingenting just nu */}
			<Button
				onClick={() => confirmOrder(selectedOrder.id, 'confirmed')}
				aria="Avbryt"
				style="outlined"
				>
				Avbryt
				</Button>

				{selectedOrder.status === 'confirmed' && (
					<Button
					onClick={() => confirmOrder(selectedOrder.id, 'done')}
					aria="Markera som klar"
					>
					Flytta till Klar
					</Button>
				)}
				</div>
			)}
			</Modal>
		</main>
	);
};

/**
 * Author: StefanMogren
 * Created most of OrderPage. Missing actually fetching the orders from database.
 * Modified by: ninerino
 * Added functions to fetch orders, show them on the page, trim the orderId, change it to uppercase and change time format to HH:mm
 * Added functions to confirm and complete orders
 */
