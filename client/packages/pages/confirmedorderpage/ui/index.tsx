import './index.scss';
import { ContentBox } from '@mojjen/contentbox';
import { OrderArticle } from '@mojjen/orderarticle';
import { Button } from '@mojjen/button';
import {
	useNavigate,
	useLocation,
	type NavigateFunction,
} from 'react-router-dom';
import { useEffect, useState, type ReactNode } from 'react';
import { Page } from '@mojjen/page';
import { OrderStatusBox } from '@mojjen/orderstatusbox';
import { useWebSocketStore } from '@mojjen/usewebsocketstore';
import { apiGetOrdersByUser } from '@mojjen/apiusers';
import type { Order } from '@mojjen/productdata';

/**
 * Author: Klara Sköld
 * This page is rendered after a successful order.It contains white boxes with different type of content.
 * Modified by: ninerino
 * Fixed orderId-splicing to map with cancelOrder and changeOrder functions
 *
 * Modified: Stefan Mogren
 * Added example code on how to access the updated order from WebSocket
 *
 * Modified: Stefan Mogren
 * Added proper WebSocket integration
 */

export const ConfirmedOrderPage = () => {
	const navigate: NavigateFunction = useNavigate();
	const location = useLocation();
	const order = location.state;
	const [status, setStatus] = useState<string>('');
	const { orderFromWs } = useWebSocketStore();
	const [activeOrder, setActiveOrder] = useState<Order | null>(null);

	useEffect(() => {
		const fetchOrdersByUser = async () => {
			const response = await apiGetOrdersByUser(order.user);

			if (response) {
				// Currently have an array of all orders from the user. Need to find the one being displayed on the page.
				const currentOrder: Order = response.orders.find(
					(o: Order) => o.SK.substring(6) === order.orderId
				);
				if (currentOrder) {
					setActiveOrder(currentOrder);
					setStatus(currentOrder.status);
				}
			}
		};

		fetchOrdersByUser();
	}, [orderFromWs]);

	if (!activeOrder)
		return <Page titleText="Orderbekräftelse">Ingen order hittades.</Page>;
	console.log('This is the activeOrder!: ', activeOrder);
	// ! Acivate this when the function accepts a proper order object instead of a testobject.
	// ! The design may be updated in a future sprint
	// useEffect(()=>{setStatus(order.status)},[status])

	const generateOrderArticles = (): ReactNode => {
		return activeOrder.attribute.items.map((item) => (
			<OrderArticle key={item.name} item={item} />
		));
	};

	const generateOrderDeletedArticles = (): ReactNode => {
		if (activeOrder.attribute.deletedItems) {
			return activeOrder.attribute.deletedItems.map((item) => (
				<OrderArticle key={item.name} item={item} deletedItems={true} />
			));
		}
	};

	const handleClick = () => {
		navigate('/');
		window.scrollTo(0, 0);
	};
	return (
		<Page titleText="Orderbekräftelse" extraClasses="grid order">
			{/* Content: "Tack för din order" */}
			<OrderStatusBox
				orderId={activeOrder.SK.substring(6)}
				status={status}
				setStatus={setStatus}
			></OrderStatusBox>

			<div className="order__content-boxes">
				{/* Content: "Sammanfattning" */}
				<ContentBox
					extraClass="order__content-box order__summary"
					titleTxt="Sammanfattning"
					titleLevel="h2"
				>
					<div className="flex flex__space-between">
						<span className="base">Delsumma</span>
						<span className="base">
							{activeOrder.attribute.total * 0.88} kr
						</span>
					</div>
					<div className="flex flex__space-between">
						<span className="base">Moms</span>
						<span className="base">12 %</span>
					</div>
					<hr className="order__line" />
					<div className="flex flex__space-between">
						<h4 className="heading-4">Totalt</h4>
						<h4 className="heading-4">{activeOrder.attribute.total} kr</h4>
					</div>
					<Button aria="Tillbaka till startsidan" onClick={handleClick}>
						Köp mer
					</Button>
				</ContentBox>

				{/* Content: "Din kommentar" */}
				{activeOrder.attribute.userComment && (
					<ContentBox
						extraClass="order__content-box order__comment"
						titleTxt="Din kommentar"
						titleLevel="h3"
						text={activeOrder.attribute.userComment}
					/>
				)}

				{/* Content: "Betalningsinformation" */}
				{activeOrder.status !== 'cancelled' && (
					<>
						<ContentBox
							style="red"
							titleTxt="Betalningsinformation"
							titleLevel="h3"
							extraClass="order__content-box"
							text="Betala med kort eller Swish i kassan när du hämtar din order."
						/>

						{/* Content: "Order-id" */}
						<ContentBox extraClass="order__content-box order__order-id">
							<aside className="flex flex__space-between flex__align-items text__left">
								<div className="flex flex__column">
									<h5 className="heading-5">Beräknad tid</h5>
									<p className="base">15 minuter</p>
								</div>
								<div className="flex flex__column ">
									<h5 className="heading-5">Upphämtning</h5>
									<p className="base">Vid kassan</p>
								</div>
							</aside>
						</ContentBox>
					</>
				)}

				{/* Content: "Din beställning" */}
				<ContentBox
					extraClass={`order__content-box order__articles ${
						activeOrder.status === 'cancelled'
							? 'order__cancelled-order-item'
							: ''
					}`}
					titleTxt="Din beställning"
					titleLevel="h2"
				>
					{generateOrderArticles()}
					{generateOrderDeletedArticles()}
				</ContentBox>
			</div>
		</Page>
	);
};
