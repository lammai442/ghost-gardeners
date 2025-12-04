import './index.scss';
import { Page } from '@mojjen/page';
import { OrderHistoryListItem } from '@mojjen/orderhistorylistitem';
import { ProfileForm } from '@mojjen/profileform';
import { apiGetOrdersByUser } from '../../../core/api/apiusers/data';
import { useAuthStore } from '@mojjen/useauthstore';

import { useEffect, useState } from 'react';
import type { Order } from '@mojjen/productdata';

export const ProfilePage = () => {
	const { user } = useAuthStore();
	const [userOrdersList, setUserOrdersList] = useState<Order[]>([]);

	if (user === null) return;

	useEffect(() => {
		const fetchOrdersByUser = async () => {
			const response = await apiGetOrdersByUser(user.userId);

			if (response) setUserOrdersList(response.orders);
		};

		fetchOrdersByUser();
	}, []);

	const generateListItems = () => {
		if (!userOrdersList) return;

		return userOrdersList.map((order, index) => {
			return <OrderHistoryListItem key={index} order={order} />;
		});
	};

	return (
		<Page titleText="Mitt konto" extraClasses="flex flex__column profile">
			<ProfileForm />
			<div className="flex flex__column flex__gap-2">
				<h3 className="heading-3">Orderhistorik</h3>
				<ul className="flex flex__gap-2 profile__orders-list">
					{generateListItems()}
				</ul>
			</div>
		</Page>
	);
};

/**
 * Author: Klara
 * Profile page, shows profile info and order history.
 */
