/**
 * Author: Lam
 * Menupage that display the menu of Mojjens meals.
 */

import './index.scss';
import type { Meal } from '@mojjen/productdata';

export const ProductCard = ({
	id,
	name,
	summary,
	price,
	classBgColor,
	img,
	status,
}: Meal) => {
	return (
		<section className={`product-card `}>
			{status === 'inactive' && (
				<div className="inactive">
					<span className="heading-2">SLUT</span>
				</div>
			)}
			<section className={`product-card__img-box ${classBgColor}`}>
				<img className="product-card__img" src={img} alt="Image of meal" />
				<button className="product-card__add-btn">+</button>
			</section>
			<section className="product-card__info-box">
				<h2 className="product-card__title heading-5">{name}</h2>
				<p className="product-card__summary base-small">{summary}</p>
				<span className="product-card__price">{price} kr</span>
			</section>
		</section>
	);
};
