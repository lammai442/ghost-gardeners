import './index.scss';
import { Page } from '@mojjen/page';
import { OrderHistoryListItem } from '@mojjen/orderhistorylistitem';
import { ProfileForm } from '@mojjen/profileform';
import {
	apiGetOrdersByUser,
	apiGetUserById,
} from '../../../core/api/apiusers/data';
import { useAuthStore } from '@mojjen/useauthstore';

import { useEffect, useState } from 'react';
import type { Order } from '@mojjen/productdata';
import { useWebSocketStore } from '@mojjen/usewebsocketstore';
import { LoadingMsg } from '@mojjen/loading-msg';

export const ProfilePage = () => {
	const { user } = useAuthStore();
	const [userOrdersList, setUserOrdersList] = useState<Order[]>([]);
	const { orderFromWs } = useWebSocketStore();
	const [fetchedUser, setFetchedUser] = useState(null);
	const [loadingUser, setLoadingUser] = useState(true);

	// Hooks körs alltid, även om user är null
	useEffect(() => {
		const fetchUserById = async () => {
			if (!user) return;

			setLoadingUser(true);
			const response = await apiGetUserById(user.userId, user.token);
			setFetchedUser(response.data.user);
			setLoadingUser(false);
		};
		fetchUserById();
	}, [user]);

	useEffect(() => {
		const fetchOrdersByUser = async () => {
			if (!user) return;

			const response = await apiGetOrdersByUser(user.userId, user.token);
			if (response) setUserOrdersList(response.orders);
		};
		fetchOrdersByUser();
	}, [orderFromWs, user]);

	const generateListItems = () => {
		if (!userOrdersList) return null;
		return userOrdersList.map((order, index) => (
			<OrderHistoryListItem key={index} order={order} />
		));
	};

	// Rendera loading innan user finns
	if (!user || loadingUser) return <LoadingMsg title="Laddar" />;

	return (
		<Page titleText="Mitt konto" extraClasses="flex flex__column profile">
			<ProfileForm fetchedUser={fetchedUser} />

			<div className="flex flex__column flex__gap-2">
				<h3 className="heading-3">Orderhistorik</h3>
				<ul className="grid profile__orders-list">{generateListItems()}</ul>
			</div>
		</Page>
	);
};

/**
 * Author: Klara
 * Profile page, shows profile info and order history.
 *
 * Update: Klara
 * Switched from flex to grid on ul. Now all order history card has the same width.
 *
 * Update: StefanMogren
 * Added dynamic update when WebSocket sends an updated order
 *
 * Update: Klara
 * Fetched user from api.
 */
