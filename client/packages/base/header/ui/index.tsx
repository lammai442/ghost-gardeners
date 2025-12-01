import './index.scss';
import { useCartStore } from '../../../core/stores/usecartstore/data';
import { HamburgerMenu } from '@mojjen/hamburger-menu';
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
// import OutsideClickHandler from 'react-outside-click-handler';
import { useOnClickOutside } from 'usehooks-ts';
import { useRef } from 'react';
import { HamburgerIcon } from '@mojjen/hamburger-icon';
import { useAuthStore } from '../../../core/stores/useauthstore/data';
import type { User } from '@mojjen/productdata';

/**
 * Author: StefanMogren
 * Created base header component
 *
 * Modified: Stefan Mogren
 * Added profile placeholder and initial cart button functionality.
 *
 * Modified: Lam
 * Added cartCount from useCartStore
 *
 * Modified: Stefan Mogren
 * Reworked positioning of content inside the header.
 *
 * Modified: Lam
 * Added user from usaAuthStore and implemented ternary operator for log in or username
 *
 */

export const HeaderComp = () => {
	const { cartCount } = useCartStore();
	const [showNavMenu, setShowNavMenu] = useState(false);
	const { user } = useAuthStore();
	const navigate = useNavigate();

	const location = useLocation();

	const ref = useRef<HTMLDivElement>(null!);

	const handleClickOutside = (): void => {
		setShowNavMenu(false);
	};

	useOnClickOutside(ref, handleClickOutside);

	useEffect(() => {
		setShowNavMenu(false);
	}, [location.pathname]);

	const handleLogin = (user: User | null) => {
		if (user) {
			console.log('här');

			navigate('/cart');
		} else {
			console.log('ej inloggad');
		}
	};

	return (
		<header className="header bg-ketchup">
			{/* <section className="header__container flex flex__space-between"> */}
			{/**
			 * * ----- Sidloggan -----
			 */}
			{/* <a href="/"></a> */}
			<Link to="/" className="header__logo-nav">
				<img
					src="/assets/mojjen-logo.svg"
					className="header__logo-img"
					alt="Mojjen text logga"
				/>
			</Link>

			{/**
			 * * ----- Hamburgarmenyn -----
			 */}
			<div className="header__nav-container" ref={ref}>
				<HamburgerMenu showNavMenu={showNavMenu} />
				<button
					className="header__nav-btn bg-none border-none"
					onClick={(): void => setShowNavMenu(!showNavMenu)}
				>
					<HamburgerIcon showNavMenu={showNavMenu} />
					{/* <img src="/assets/hamburger-meny.svg" alt="Menyknapp" /> */}
				</button>
			</div>
			{/* </section> */}

			<section className="header__user-content flex flex__space-between flex__gap-1">
				{/**
				 * * ----- Profil -----
				 */}
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
				{/**
				 * * ----- Varukorg -----
				 */}

				<div>
					<Link
						to="/cart"
						className="header__cart flex btn-base bg-light-beige"
					>
						<img
							src="/assets/cart-icon.svg"
							className="header__cart-img"
							alt="Varukorgsikon"
						/>
						<h5 className="heading-5 text-black header__cart-amount">{`Varukorg ${cartCount}`}</h5>
					</Link>
				</div>
			</section>
		</header>
	);
};
