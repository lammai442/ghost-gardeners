import './index.scss';
/**
 * Author: StefanMogren
 *
 *
 */

console.log('Navmenu is loaded!');

export const NavMenu = () => {
	return (
		<section>
			<ul>
				<li>
					<a href="/menu">Vår meny</a>
				</li>
				<li>
					<a href="/order">Din order</a>
				</li>
				<li>
					<a href="/cart">Din kundvagn</a>
				</li>
				<li>
					<a href="/about">Om Mojjen</a>
				</li>
			</ul>
		</section>
	);
};
