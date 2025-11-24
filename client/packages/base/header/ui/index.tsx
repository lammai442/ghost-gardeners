import './index.scss';
import { useCartStore } from '../../../core/stores/usecartstore/data';
import { HamburgerMenu } from '@mojjen/hamburger-menu';
import { useState } from 'react';

/**
 * Author: StefanMogren
 * Created base header component
 *
 * Modified: Stefan Mogren
 * Added profile placeholder and initial cart button functionality.
 *
 * Modified: Lam
 * Added cartCount from useCartStore
 */

export const HeaderComp = () => {
	const { cartCount } = useCartStore();
	const [showNavMenu, setShowNavMenu] = useState(false);
	return (
		<header className="header">
			<section className="header__container flex flex__space-between bg-ketchup">
				{/**
				 * * ----- Sidloggan -----
				 */}
				<a href="/" className="btn-base bg-light-beige">
					<img
						src="/assets/mojjen.svg"
						className="header__logo-img"
						alt="Mojjen text logga"
					/>
				</a>
				{/**
				 * * ----- Hamburgarmenyn -----
				 */}
				<button className="" onClick={(): void => setShowNavMenu(!showNavMenu)}>
					<img src="/assets/hamburger-meny.svg" alt="Menyknapp" />
				</button>
			</section>
			<HamburgerMenu showNavMenu={showNavMenu} />

			<section className="header__user-content flex flex__space-between">
				{/**
				 * * ----- Profil -----
				 */}
				<section className="header__user-profile flex flex__align-items">
					<img
						className="header__profile-img"
						src="/assets/profile-icon.svg"
						alt="Profilikon"
					/>
					<h5 className="heading-5">Logga in</h5>
				</section>
				{/**
				 * * ----- Varukorg -----
				 */}
				<a href="/cart" className="header__cart flex btn-base ">
					<img src="/assets/cart-icon.svg" alt="Varukorgsikon" />
					<h5 className="heading-5">Varukorg {cartCount}</h5>
				</a>
			</section>
		</header>
	);
};
