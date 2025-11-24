import './index.scss';
import { NavLink } from 'react-router-dom';
/**
 * Author: StefanMogren
 *
 *
 */
type Props = {
	showNavMenu: boolean;
};

export const HamburgerMenu = ({ showNavMenu }: Props) => {
	return (
		<section
			className={`${showNavMenu ? 'nav-menu-expand' : 'nav-menu'}
			bg-light-beige`}
		>
			<ul className="nav-menu__nav-list">
				<li>
					<NavLink
						to={'/'}
						className={({ isActive }) =>
							`heading-3 text-black ${
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
							`heading-3 text-black ${
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
							`heading-3 text-black ${
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
		</section>
	);
};
