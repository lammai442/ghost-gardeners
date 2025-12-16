import './index.scss';
import { HamburgerMenu } from '@mojjen/hamburger-menu';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useOnClickOutside } from 'usehooks-ts';
import { useRef } from 'react';
import { HamburgerIcon } from '@mojjen/hamburger-icon';
import { AuthBtn } from '@mojjen/authbtn';

export const HeaderComp = () => {
	const [showNavMenu, setShowNavMenu] = useState(false);

	const location = useLocation();

	const ref = useRef<HTMLDivElement>(null!);

	const handleClickOutside = (): void => {
		setShowNavMenu(false);
	};

	useOnClickOutside(ref, handleClickOutside);

	useEffect(() => {
		setShowNavMenu(false);
	}, [location.pathname]);

	return (
		<header className="header bg-ketchup">
			{/**
			 * * ----- Sidloggan -----
			 */}

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
					aria-label="Öppna meny"
				>
					<HamburgerIcon showNavMenu={showNavMenu} />
				</button>
			</div>

			<section className="header__user-content flex flex__space-between flex__gap-1">
				{/**
				 * * ----- Profil -----
				 */}
				<AuthBtn />

				{/**
				 * * ----- Varukorg -----
				 */}
			</section>
		</header>
	);
};

/**
 * Author: StefanMogren
 * Created base header component
 *
 * Update: Stefan Mogren
 * Added profile placeholder and initial cart button functionality.
 *
 * Update: Lam
 * Added cartCount from useCartStore
 *
 * Update: Stefan Mogren
 * Reworked positioning of content inside the header.
 *
 * Update: Lam
 * Added user from usaAuthStore and implemented ternary operator for log in or username
 *
 */
