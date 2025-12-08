import './index.scss';
import { useAuthStore } from '@mojjen/useauthstore';

export const AuthBtn = () => {
	const { user, logout } = useAuthStore();

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
					<h5 className="heading-5 text-light-beige">{user?.firstname}</h5>
				</section>

				{/* Placeholder för utloggningsfunktionen */}
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
 */
