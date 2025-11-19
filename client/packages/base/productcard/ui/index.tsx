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
	status,
}: Meal) => {
	console.log(classBgColor);

	return (
		<section
			className={`product-card ${status === 'inactive' ? 'inactive' : ''}`}
		>
			<section
				className={`product-card__img-box ${classBgColor}`}
				onClick={() => (status !== 'inactive' ? console.log('click') : '')}
			>
				<img
					className="product-card__img"
					src={img}
					alt="Image of meal with sausage icon"
				/>
				<button className="product-card__add-btn">+</button>
			</section>
			<section className="product-card__info-box">
				<h2 className="product-card__title heading-5">{title}</h2>
				<p className="product-card__summary base-small">{summary}</p>
				<span className="product-card__price">{price} kr</span>
			</section>
		</section>
	);
};
