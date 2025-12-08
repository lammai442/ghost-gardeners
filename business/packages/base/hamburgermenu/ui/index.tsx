import './index.scss';
import { NavLink } from 'react-router-dom';
/**
 * Author: StefanMogren
 *
 * Created hamburger menu, added NavLinks for page navigation
 */
type Props = {
	showNavMenu: boolean;
};

export const HamburgerMenu = ({ showNavMenu }: Props) => {
	return (
		<section
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
						Orders
					</NavLink>
				</li>
				<li>
					<NavLink
						to={'/products'}
						className={({ isActive }) =>
							`heading-3 text-light-beige ${
								isActive
									? 'nav-menu__nav-active'
									: 'nav-menu__nav-inactive heading-3'
							}`
						}
					>
						Produkter
					</NavLink>
				</li>
			</ul>
		</section>
	);
};
