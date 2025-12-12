import './index.scss';
import { useAuthStore } from '@mojjen/useauthstore';
import { useEffect, useState } from 'react';
import { apiGetUserById } from '@mojjen/apiusers/data';

export const AuthBtn = () => {
	const { user, logout } = useAuthStore();
	const [currentUserName, setCurrentUserName] = useState<string | null>(null);

	useEffect(() => {
		if (!user) setCurrentUserName(null);

		const fetchUser = async () => {
			if (!user?.userId || !user.token) return;
			const userFromBackend = await apiGetUserById(user?.userId, user?.token);
			setCurrentUserName(userFromBackend.data.user.attribute.firstname);
		};
		fetchUser();
	}, [user]);

	return (
		<>
			<div className="flex flex__gap-1 flex__align-items">
				{/* Placeholder för profilsidan */}
				<section className="header__user-profile flex flex__align-items bg-dark-ketchup">
					<img
						className="header__profile-img"
						src="/assets/profile-icon.svg"
						alt="Profilikon"
					/>
					{currentUserName && (
						<h5 className="heading-5 text-light-beige">{currentUserName}</h5>
					)}
				</section>

				{/* Placeholder för utloggningsfunktionen */}
				<button
					className="header__logout-btn"
					onClick={() => logout()}
					aria-label="Logga ut"
				>
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
 * Ternary operator on currentUserName to avoid empty button warning from Wave.
 */
