import './index.scss';
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
					<a className="heading-3" href="/menu">
						Vår meny
					</a>
				</li>
				{/* 				<li>
					<a href="/order">Din order</a>
				</li> */}
				<li>
					<a className="heading-3" href="/cart">
						Din kundvagn
					</a>
				</li>
				<li>
					<a className="heading-3" href="/about">
						Om Mojjen
					</a>
				</li>
			</ul>
		</section>
	);
};
