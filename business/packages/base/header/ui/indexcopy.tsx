import './index.scss';
import { Link, useLocation } from 'react-router-dom';
import { useRef } from 'react';
import { AuthBtn } from '../../authbtn/ui';

export const HeaderComp = () => {
	const location = useLocation();

	const ref = useRef<HTMLDivElement>(null!);

	return (
		<header className="header bg-ketchup">
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
				<AuthBtn />
			</section>
		</header>
	);
};

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
