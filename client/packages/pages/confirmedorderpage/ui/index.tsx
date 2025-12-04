import './index.scss';
import { ContentBox } from '@mojjen/contentbox';
import { OrderArticle } from '@mojjen/orderarticle';
import { Button } from '@mojjen/button';
import {
	useNavigate,
	useLocation,
	type NavigateFunction,
} from 'react-router-dom';
import { /*useEffect,*/ useState, type ReactNode } from 'react';
import { Page } from '@mojjen/page';
import { OrderStatusBox } from '@mojjen/orderstatusbox';

/* 
* Imports for WebSocket
import { connectWebSocket } from '@mojjen/websocket';
import type { WebSocketOrder } from '@mojjen/productdata'; 
*/

/**
 * Author: Klara Sköld
 * This page is rendered after a successful order.It contains white boxes with different type of content.
 * Modified by: ninerino
 * Fixed orderId-splicing to map with cancelOrder and changeOrder functions
 */

export const ConfirmedOrderPage = () => {
	const navigate: NavigateFunction = useNavigate();
	const location = useLocation();
	const order = location.state;
	const [status, setStatus] = useState(order.status);
	/* 	
// Code for WebSocket
// "Currently" connects the user to the WebSocket when the ConfirmedOrderPage is loaded.
// Commented out until it'll actually be used.

	const [ws, setWs] = useState<WebSocket | null>(null);
	const [wsOrder, setWsOrder] = useState<WebSocketOrder | null>(null);

	useEffect(() => {
		const websocket = connectWebSocket((update: WebSocketOrder) => {
			console.log('Received update!');
			console.log(update);

			if (update.type === 'orderUpdate') {
				console.log('ORDER received from WebSocket!');
				setWsOrder(update);
			}
		});

		setWs(websocket);

		return () => websocket.close();
	}, []); */

	if (!order)
		return <Page titleText="Orderbekräftelse">Ingen order hittades.</Page>;
	console.log('order: ', order);
	// ! Acivate this when the function accepts a proper order object instead of a testobject.
	// ! The design may be updated in a future sprint
	// useEffect(()=>{setStatus(order.status)},[status])

	const generateOrderArticles = (): ReactNode => {
		return order.items.map(
			(item: { name: string; subtotal: number; summary: string }) => (
				<OrderArticle key={item.name} item={item} />
			)
		);
	};
	const handleClick = () => {
		navigate('/');
		window.scrollTo(0, 0);
	};
	return (
		<Page titleText="Orderbekräftelse" extraClasses="grid order">
			{/* Content: "Tack för din order" */}
			<OrderStatusBox
				orderId={order.orderId}
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
						<span className="base">{order.total * 0.88} kr</span>
					</div>
					<div className="flex flex__space-between">
						<span className="base">Moms</span>
						<span className="base">12 %</span>
					</div>
					<hr className="order__line" />
					<div className="flex flex__space-between">
						<h4 className="heading-4">Totalt</h4>
						<h4 className="heading-4">{order.total} kr</h4>
					</div>
					<Button aria="Tillbaka till startsidan" onClick={handleClick}>
						Köp mer
					</Button>
				</ContentBox>

				{/* Content: "Din kommentar" */}
				{order.userComment && (
					<ContentBox
						extraClass="order__content-box order__comment"
						titleTxt="Din kommentar"
						titleLevel="h3"
						text={order.userComment}
					/>
				)}

				{/* Content: "Betalningsinformation" */}
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

				{/* Content: "Din beställning" */}
				<ContentBox
					extraClass="order__content-box order__articles"
					titleTxt="Din beställning"
					titleLevel="h2"
				>
					{generateOrderArticles()}
				</ContentBox>
			</div>
		</Page>
	);
};
