import './index.scss';
import { NavLink } from 'react-router-dom';

type Props = {
	showNavMenu: boolean;
};

export const HamburgerMenu = ({ showNavMenu }: Props) => {
	return (
		<nav
			aria-label="Huvudmeny"
			className={showNavMenu ? 'nav-menu-expand bg-ketchup' : 'nav-menu'}
		>
			<ul className="nav-menu__nav-list">
				<li>
					<NavLink
						to={'/'}
						className={({ isActive }) =>
							`heading-3 text-light-beige ${
								isActive
									? 'nav-menu__nav-active'
									: 'nav-menu__nav-inactive heading-3'
							}`
						}
					>
						Start
					</NavLink>
				</li>
				<li>
					<NavLink
						to={'/menu'}
						className={({ isActive }) =>
							`heading-3 text-light-beige ${
								isActive
									? 'nav-menu__nav-active'
									: 'nav-menu__nav-inactive heading-3'
							}`
						}
					>
						Meny
					</NavLink>
				</li>
				<li>
					<NavLink
						to={'/about'}
						className={({ isActive }) =>
							`heading-3 text-light-beige ${
								isActive
									? 'nav-menu__nav-active'
									: 'nav-menu__nav-inactive heading-3'
							}`
						}
					>
						Om oss
					</NavLink>
				</li>
			</ul>
		</nav>
	);
};

/**
 * Author: StefanMogren
 *
 * Created hamburger menu, added NavLinks for page navigation
 *
 * Update: Klara
 * WCAG fixes, nav element and aria-label
 *
 */
