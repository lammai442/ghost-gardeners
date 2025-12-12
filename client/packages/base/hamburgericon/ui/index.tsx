import './index.scss';

type Props = {
	showNavMenu: boolean;
};

export const HamburgerIcon = ({ showNavMenu }: Props) => {
	return (
		// ChatGPT-lösning för att animera SVG-linjer med CSS
		<svg
			width="34"
			height="19"
			viewBox="0 0 34 19"
			xmlns="http://www.w3.org/2000/svg"
			className={showNavMenu ? 'open' : ''}
		>
			<line className="line top" x1="1.5" y1="1.5" x2="32.5" y2="1.5" />
			<line className="line middle " x1="1.5" y1="9.5" x2="32.5" y2="9.5" />
			<line className="line bottom" x1="1.5" y1="17.5" x2="32.5" y2="17.5" />
		</svg>
	);
};

/**
 * Author: StefanMogren
 *
 * Created animated Hamburger icon
 */
