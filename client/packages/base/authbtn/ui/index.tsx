import './index.scss';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../core/stores/useauthstore/data';
import type { User } from '@mojjen/productdata';

/**
 * Author: Lam
 * Auth button that can be used in header
 *
 */

export const authBtn = () => {
	const { user } = useAuthStore();
	const navigate = useNavigate();

	const handleLogin = (user: User | null) => {
		if (user) {
			console.log('här');

			navigate('/cart');
		} else {
			console.log('ej inloggad');
		}
	};

	return (
		<div className="flex flex__gap-1 flex__align-items">
			{/* Placeholder för profilsidan */}
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
					{user ? user.firstname : 'Logga in'}
				</h5>
			</button>
			{/* Placeholder för utloggningsfunktionen */}
			<img
				className="header__logout-img"
				src="/assets/log-out-icon.svg"
				alt="Utloggningsknapp"
			/>
		</div>
	);
};
