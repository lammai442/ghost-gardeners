import { useState, useEffect } from 'react';
import './index.scss';
import { formatDate } from '../../../../src/utils/utils';
import { Button } from '@mojjen/button';
import type { Order, Meal } from '@mojjen/productdata';
import { useCartStore } from '../../../core/stores/usecartstore/data';
import { useNavigate } from 'react-router-dom';

type Props = {
	order: Order;
};

export const OrderHistoryListItem = ({ order }: Props) => {
	const [statusText, setStatusText] = useState(order.status);
	const { incrament } = useCartStore();
	const navigate = useNavigate();

	const generateOrderItems = () => {
		return order.attribute.items?.map((orderItem: Meal, index) => {
			return (
				<li
					key={index}
					className="flex flex__align-end flex__space-between base-small products-list__list-item flex__gap-1-5"
				>
					<span>
						•{'  '}
						{orderItem.name}{' '}
						{orderItem.includeDrink && `+ ${orderItem.includeDrinkName}`}
					</span>
					<span className="order__price">{orderItem.price} kr</span>
				</li>
			);
		});
	};

	const statusMap = {
		pending: {
			text: 'Skickad',
			bgColor: 'mustard',
		},
		confirmed: {
			text: 'Tillagas',
			bgColor: 'brown',
		},
		done: {
			text: 'Levererad',
			bgColor: 'cucumber',
		},
		cancelled: {
			text: 'Avbruten',
			bgColor: 'ketchup',
		},
	} as const;

	const currentStatus = statusMap[statusText as keyof typeof statusMap];

	const generateStatus = () => {
		return (
			<p
				className={`btn-text bg-${currentStatus.bgColor} text-super-light-beige history-list-item__status`}
			>
				{currentStatus.text}
			</p>
		);
	};

	useEffect(() => {
		setStatusText(order.status);
	}, [order.status]);

	const handleDuplicateOrder = () => {
		order.attribute.items.map((orderItem) => {
			incrament(orderItem);
			navigate('/cart');
		});
	};

	return (
		<li
			key={order.SK}
			className="flex flex__column flex__gap-1-5 bg-super-light-beige border-radius flex__space-between history-list-item"
		>
			<div className="flex flex__column flex__gap-2">
				<div className="flex flex__space-between history-list-item__top-div ">
					<div className="flex flex__column flex__gap-0-5">
						<h4 className="heading-4">Order #{order.SK.slice(12)}</h4>
						<p className="base">{formatDate(order.attribute.createdAt)}</p>
					</div>
					<div className="flex flex__column flex__align-items flex__gap-0-25">
						<p className="heading-5">{order.attribute.total} kr</p>
						{generateStatus()}
					</div>
				</div>
				<ul className="products-list">
					<h5 className="heading-5">Beställda produkter</h5>
					{generateOrderItems()}
				</ul>{' '}
			</div>

			<Button onClick={handleDuplicateOrder} aria="Beställ samma order igen">
				Beställ igen
			</Button>
		</li>
	);
};

/**
 * Author: Klara Sköld
 * Created a list item for each object in the users order history
 *
 * Update: Klara
 * Added max-width on cards.
 *
 * Update: Lam
 * Added dynamic statustext and color for order depending on the status.
 * Added css for gap and price so it aligns with each other in responsive view
 */
