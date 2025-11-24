import './index.scss';
import { NavLink } from 'react-router-dom';
/**
 * Author: StefanMogren
 *
 *
 */
type Test = {
	showNavMenu: boolean;
};

export const HamburgerMenu = ({ showNavMenu }: Test) => {
	return (
		<section
			className={`${showNavMenu ? 'nav-menu-expand' : 'nav-menu'}
			bg-ketchup`}
		>
			<ul className="nav-menu__nav-list">
				<li>
					<NavLink to={'/'}>Start</NavLink>
				</li>
				<li>
					<NavLink to={'/menu'}>Meny</NavLink>
				</li>
				<li>
					<NavLink to={'/menu'}>Om oss</NavLink>
				</li>
			</ul>
		</section>
	);
};
