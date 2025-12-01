import './index.scss';
import { Order } from '@mojjen/order';

/**
 * Author: StefanMogren
 * Created most of OrderPage. Missing actually fetching the orders from database.
 *
 */

export const OrderPage = () => {
	return (
		<main className="order-page">
			<section className="order-page__container flex flex__column flex__gap-3">
				<h1 className="heading-1">Ordrar</h1>

				<section className="order-page__orders">
					<section className="flex flex__column flex__gap-2">
						<h2 className="heading-3">Väntande (5 st)</h2>
						<ul className="order-page__orders-container">
							{/* Every order uses the three prompts orderId, time, and orderStatus */}
							{/* orderStatus="pending" */}
							<Order orderId="di7bv" time="14.33" orderStatus="pending" />
							<Order orderId="di7bv" time="14.33" orderStatus="pending" />
							<Order orderId="di7bv" time="14.33" orderStatus="pending" />
							<Order orderId="di7bv" time="14.33" orderStatus="pending" />
							<Order orderId="di7bv" time="14.33" orderStatus="pending" />
						</ul>
					</section>
					<section className="flex flex__column flex__gap-2">
						<h2 className="heading-3">Tillagas</h2>
						<ul className="order-page__orders-container">
							{/* orderStatus="confirmed" */}
							<Order orderId="di7bv" time="14.33" orderStatus="confirmed" />
							<Order orderId="di7bv" time="14.33" orderStatus="confirmed" />
							<Order orderId="di7bv" time="14.33" orderStatus="confirmed" />
						</ul>
					</section>
					<section className="flex flex__column flex__gap-2">
						<h2 className="heading-3">Redo att hämtas</h2>
						<ul className="order-page__orders-container">
							{/* orderStatus="done" */}
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
