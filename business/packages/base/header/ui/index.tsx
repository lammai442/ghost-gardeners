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
					aria-label="Öppna meny"
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
				{/* 
				<div className="flex flex__gap-1 flex__align-items">
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
					<img
						className="header__logout-img"
						src="/assets/log-out-icon.svg"
						alt="Utloggningsknapp"
						/>
				</div>
				*/}

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
