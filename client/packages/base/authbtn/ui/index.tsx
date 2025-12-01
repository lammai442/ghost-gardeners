import './index.scss';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../core/stores/useauthstore/data';
import type { User } from '@mojjen/productdata';
import { Modal } from '../../modal/ui';
import { useState } from 'react';

/**
 * Author: Lam
 * Auth button that can be used in header. If user is not logged in then modal with authForm opens
 *
 */

export const AuthBtn = () => {
	const { user } = useAuthStore();
	const navigate = useNavigate();
	const [modalOpen, setModalOpen] = useState<boolean>(false);

	const handleLogin = (user: User | null) => {
		if (user) {
			navigate('/cart');
		} else {
			setModalOpen(true);
		}
	};

	return (
		<>
			<Modal
				open={modalOpen}
				titleContent={<h3 className="heading-3 text-light-beige">Logga in</h3>}
				setModalOpen={setModalOpen}
			></Modal>
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
		</>
	);
};
