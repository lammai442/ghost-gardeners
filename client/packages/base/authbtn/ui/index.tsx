import './index.scss';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@mojjen/useauthstore';
import type { Order, User } from '@mojjen/productdata';
import { Modal } from '@mojjen/modal';
import { useState, useEffect } from 'react';
import { AuthForm } from '@mojjen/authform';
import { apiGetUserById } from '@mojjen/apiusers';
import { Notification } from '@mojjen/notification';
import { useWebSocketStore } from '@mojjen/usewebsocketstore';
import { apiGetOrdersByUser } from '@mojjen/apiusers';

export const AuthBtn = () => {
	const { user, logout } = useAuthStore();
	const navigate = useNavigate();
	const [modalOpen, setModalOpen] = useState<boolean>(false);
	const [authTitle, setAuthTitle] = useState<string>('Logga in');
	const [currentUserName, setCurrentUserName] = useState<string | null>(null);
	const [autoPlay, setAutoPlay] = useState<boolean>(false);
	const [openOrderStatus, setOpenOrderStatus] = useState<boolean>(false);
	const { orderFromWs } = useWebSocketStore();
	const [userOrderList, setUserOrdersList] = useState([]);

	useEffect(() => {
		if (!user) setCurrentUserName(null);

		// Displays username in header
		const fetchUser = async () => {
			if (!user?.userId || !user.token) return;
			const userFromBackend = await apiGetUserById(user?.userId, user?.token);
			setCurrentUserName(userFromBackend.data.user.attribute.firstname);
		};
		fetchUser();
	}, [user]);

	// Runs every time whenever 'user' from localStorage updates
	// Runs every time when WebSocket sends an updated order to 'orderFromWs'
	useEffect(() => {
		if (user) {
			setAutoPlay(true);
			const fetchOrdersByUser = async () => {
				const response = await apiGetOrdersByUser(user.userId, user.token);
				if (response) setUserOrdersList(response.orders);
			};
			fetchOrdersByUser();
		} else {
			setAutoPlay(false);
			setUserOrdersList([]);
		}
	}, [orderFromWs, user]);

	const handleLogin = (user: User | null) => {
		if (user) {
			navigate('/profile');
		} else {
			setModalOpen(true);
		}
	};

	const handleNotification = () => {
		// When click on the notification icon, AutoPlay stops the notification
		setAutoPlay(false);
		// Toggle for opening the modal for orderstatus
		setOpenOrderStatus((prev) => !prev);
	};

	// A function for generating a orderCard displayen the current order status and info
	const generateOrder = () => {
		return (
			<ul className="notification__list">
				{userOrderList
					.filter(
						(order: Order) =>
							order.status === 'pending' ||
							order.status === 'confirmed' ||
							order.status === 'done'
					)
					.map((order: Order) => (
						<li key={order.SK} className="notification__list-item btn-base">
							<span
								className={`notification__status base-bold ${
									order.status === 'pending'
										? 'bg-mustard'
										: order.status === 'confirmed'
										? 'bg-brown'
										: order.status === 'done'
										? 'bg-cucumber'
										: ''
								}`}
							>
								{order.status === 'pending'
									? 'Skickad'
									: order.status === 'confirmed'
									? 'Tillagas'
									: order.status === 'done'
									? 'Redo'
									: ''}
							</span>
							<h4 className="base-bold">Order: #{order.SK.slice(12)}</h4>
							<ul>
								<h4 className="base-bold">Produkter</h4>
								{order.attribute.items.map((meal) => (
									<li key={meal.itemId} className="base-small">
										•{'  '}
										{meal.name}
									</li>
								))}
							</ul>
							{order.attribute.deletedItems &&
								order.attribute.deletedItems?.length > 0 && (
									<ul>
										<h4>Avbrutna produkter</h4>
										{order.attribute.deletedItems.map((meal, index) => (
											<li
												key={`${meal.name}-${index}`}
												className="notification__deleted-items"
											>
												•{'  '}
												{meal.name}
											</li>
										))}
									</ul>
								)}
						</li>
					))}
			</ul>
		);
	};

	return (
		<>
			{/* Modal for opening the login/register form */}
			<Modal
				open={modalOpen}
				titleContent={
					<h3 className="heading-3 text-light-beige">{authTitle}</h3>
				}
				setModalOpen={setModalOpen}
			>
				<AuthForm setModalOpen={setModalOpen} setAuthTitle={setAuthTitle} />
			</Modal>
			{openOrderStatus && (
				// Modal for opening the orderstatus
				<Modal
					open={openOrderStatus}
					titleContent={
						<h3 className="heading-3 text-light-beige">Dina ordrar</h3>
					}
					setModalOpen={setOpenOrderStatus}
				>
					{userOrderList.length > 0
						? generateOrder()
						: 'Du har inga nuvarande ordrar'}
				</Modal>
			)}
			<div className="flex flex__gap-1 flex__align-items">
				<button className="notification__btn" onClick={handleNotification}>
					<Notification key={autoPlay ? 'play' : 'stop'} autoPlay={autoPlay} />
				</button>
				<button
					className="header__user-profile flex flex__align-items  bg-dark-ketchup"
					onClick={() => handleLogin(user)}
				>
					<img
						className="header__profile-img"
						src="/assets/profile-icon.svg"
						alt="Profilikon"
					/>
					<h5 className="heading-5 text-light-beige">
						{currentUserName ? currentUserName : 'Logga in'}
					</h5>
				</button>

				<button className="header__logout-btn" onClick={() => logout()}>
					<img
						className="header__logout-img"
						src="/assets/log-out-icon.svg"
						alt="Utloggningsknapp"
					/>
				</button>
			</div>
		</>
	);
};

/**
 * Author: Lam
 * Auth button that can be used in header. If user is not logged in then modal with authForm opens
 *
 * Update: Klara
 * Navigate to profile page if the user is logged in and the user clicks the button.
 *
 * Update: Lam
 * Added notification
 *
 */
