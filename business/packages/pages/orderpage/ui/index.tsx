import './index.scss';
import { Order } from '@mojjen/order';

export const OrderPage = () => {
	return (
		<main className="order-page">
			<section className="order-page__container">
				<h1>Ordrar</h1>

				<section className="order-page__orders">
					<section>
						<h2 className="heading-3">Väntande (10 st)</h2>
						<ul className="order-page__orders-container">
							<Order orderId="di7bv" time="14.33" orderStatus="pending" />
							<Order orderId="di7bv" time="14.33" orderStatus="pending" />
							<Order orderId="di7bv" time="14.33" orderStatus="pending" />
							<Order orderId="di7bv" time="14.33" orderStatus="pending" />
							<Order orderId="di7bv" time="14.33" orderStatus="pending" />
						</ul>
					</section>
					<section>
						<h2 className="heading-3">Tillagas</h2>
						<ul className="order-page__orders-container">
							<Order orderId="di7bv" time="14.33" orderStatus="confirmed" />
							<Order orderId="di7bv" time="14.33" orderStatus="confirmed" />
							<Order orderId="di7bv" time="14.33" orderStatus="confirmed" />
						</ul>
					</section>
					<section>
						<h2 className="heading-3">Redo att hämtas</h2>
						<ul className="order-page__orders-container">
							<Order orderId="di7bv" time="14.33" orderStatus="done" />
							<Order orderId="di7bv" time="14.33" orderStatus="done" />
							<Order orderId="di7bv" time="14.33" orderStatus="done" />
							<Order orderId="di7bv" time="14.33" orderStatus="done" />
						</ul>
					</section>
				</section>
			</section>
		</main>
	);
};
