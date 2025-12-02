import './index.scss';
import { Order } from '@mojjen/order';
import { OrderItems } from '@mojjen/orderitems'
import { useEffect, useState } from 'react';

export const OrderPage = () => {

	const [pendingOrders, setPendingOrders] = useState<OrderItems[]>([]);
	const [confirmedOrders, setConfirmedOrders] = useState<OrderItems[]>([]);
	const [doneOrders, setDoneOrders] = useState<OrderItems[]>([]);

	/**
	 * Function to change the time format to HH:mm
	 */
	const formatTime = (isoString: string) => {
		const date = new Date(isoString);
		const hours = date.getHours().toString().padStart(2, "0");
  		const minutes = date.getMinutes().toString().padStart(2, "0");
	return `${hours}:${minutes}`;
	};

	/**
	 * Removes "order" from the orderId and makes it uppercase to help the staff see better on their screen
	 */
	const trimOrderId = (id: string) => {
  		const clean = id.replace(/^order-/, "");
		return clean.toUpperCase()
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
				console.error("Kunde inte hämta ordrar:", error);
			}
		};

		fetchOrders();
	}, []);

	return (
		<main className="order-page">
			<section className="order-page__container flex flex__column flex__gap-3">


				<section className="order-page__orders">
					<section className="flex flex__column flex__gap-2">
						<h2 className="heading-3">Väntande ({pendingOrders.length} st)</h2>
						<ul className="order-page__orders-container">
							{pendingOrders.map((o) => (
								<Order
									key={o.id}
									orderId={trimOrderId(o.id)}
									time={formatTime(o.attribute?.createdAt)}
									orderStatus={o.status}
								/>
							))}
						</ul>
					</section>
					<section className="flex flex__column flex__gap-2">
						<h2 className="heading-3">Tillagas ({confirmedOrders.length} st)</h2>
						<ul className="order-page__orders-container">
							{confirmedOrders.map((o) => (
								<Order
									key={o.id}
									orderId={trimOrderId(o.id)}
									time={formatTime(o.attribute?.createdAt)}
									orderStatus={o.status}
								/>
							))}
						</ul>
					</section>
					<section className="flex flex__column flex__gap-2">
						<h2 className="heading-3">Redo att hämtas ({doneOrders.length} st)</h2>
						<ul className="order-page__orders-container">
							{doneOrders.map((o) => (
								<Order
									key={o.id}
									orderId={trimOrderId(o.id)}
									time={formatTime(o.attribute?.createdAt)}
									orderStatus={o.status}
								/>
							))}
						</ul>
					</section>
				</section>
			</section>
		</main>
	);
};

/**
 * Author: StefanMogren
 * Created most of OrderPage. Missing actually fetching the orders from database.
 * Modified by: ninerino
 * Added functions to fetch orders, show them on the page, trim the orderId, change it to uppercase and change time format to HH:mm
 */