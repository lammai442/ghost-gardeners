/**
 * Author: Lam
 * Menupage that display the menu of Mojjens meals.
 */

import './index.scss';
import type { Meal } from '@mojjen/productdata';

export const ProductCard = ({
	title,
	summary,
	price,
	classBgColor,
	img,
}: Meal) => {
	return (
		<section className="product-card">
			<section className="product-card__img-box">
				<img
					className={`product-card__img ${classBgColor}`}
					src={img}
					alt="Image of meal with sausage icon"
				/>
				<button className="product-card__add-btn">+</button>
			</section>
			<section className="product-card__info-box">
				<h2 className="product-card__title">{title}</h2>
				<p className="product-card__summary">{summary}</p>
				<span className="product-card__price">{price}</span>
			</section>
		</section>
	);
};
