import './index.scss';
/**
 * Author: StefanMogren
 * Created base header component
 *
 */

export const HeaderComp = () => {
	return (
		<header className="header bg-ketchup">
			<a href="/" className="btn-base bg-light-beige">
				<img
					src="/assets/mojjen.svg"
					className="header__logo-img"
					alt="Mojjen text logga"
				/>
			</a>
			<img src="/assets/hamburger-meny.svg" alt="Menyknapp" />
		</header>
	);
};
