import './index.scss';
import { useCartStore } from '../../../core/stores/usecartstore/data';
import { HamburgerMenu } from '@mojjen/hamburger-menu';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
// import OutsideClickHandler from 'react-outside-click-handler';
import { useOnClickOutside } from 'usehooks-ts';
import { useRef } from 'react';

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
 */

export const HeaderComp = () => {
	const { cartCount } = useCartStore();
	const [showNavMenu, setShowNavMenu] = useState(false);
	const location = useLocation();

	const ref = useRef<HTMLDivElement>(null!);

	const handleClickOutside = (): void => {
		setShowNavMenu(false);
		console.log('I am clicked outside!');
	};

	useOnClickOutside(ref, handleClickOutside);

	useEffect(() => {
		setShowNavMenu(false);
	}, [location.pathname]);

	return (
		<header className="header bg-ketchup">
			<section className="header__container flex flex__space-between">
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
				<div ref={ref}>
					<HamburgerMenu showNavMenu={showNavMenu} />
				</div>

				{/**
				 * * ----- Hamburgarmenyn -----
				 */}
				<button className="" onClick={(): void => setShowNavMenu(!showNavMenu)}>
					<img src="/assets/hamburger-meny.svg" alt="Menyknapp" />
				</button>
			</section>

			<section className="header__user-content flex flex__space-between">
				{/**
				 * * ----- Profil -----
				 */}
				<section className="header__user-profile flex flex__align-items  bg-dark-ketchup">
					<img
						className="header__profile-img"
						src="/assets/profile-icon.svg"
						alt="Profilikon"
					/>
					<h5 className="heading-5 text-light-beige">Hej Lennart!</h5>
				</section>
				{/**
				 * * ----- Varukorg -----
				 */}

				<Link to="/cart" className="header__cart flex btn-base bg-light-beige">
					<img src="/assets/cart-icon.svg" alt="Varukorgsikon" />
					<h5 className="heading-5 text-black header__cart-amount">{`Varukorg ${cartCount}`}</h5>
				</Link>
			</section>
		</header>
	);
};
