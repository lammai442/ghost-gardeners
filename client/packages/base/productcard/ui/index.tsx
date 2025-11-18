/**
 * Author: Lam
 * Menupage that display the menu of Mojjens meals.
 */

import './index.scss';
import sausageIcon from '../../../../src/assets/icons/sausage-icon.png';

export const ProductCard = () => {
	return (
		<section className="product-card">
			<section className="product-card__img-box">
				<img
					className="product-card__img"
					src={sausageIcon}
					alt="Image of meal with sausage icon"
				/>
				<button className="product-card__add-btn">+</button>
			</section>
			<section className="product-card__info-box">
				<h2 className="product-card__title">Vålbergs vego</h2>
				<p className="product-card__summary">
					Falafelkôrv med harissa och koriander
				</p>
				<span className="product-card__price">45 kr</span>
			</section>
		</section>
	);
};
