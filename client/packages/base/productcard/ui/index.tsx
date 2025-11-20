/**
 * Author: Lam
 * Menupage that display the menu of Mojjens meals.
 */

import './index.scss';
import { useState } from 'react';
import type { Meal } from '@mojjen/productdata';

type Props = {
	item: Meal;
	classBgColor: string;
	showQty?: boolean;
};

export const ProductCard = ({ item, classBgColor, showQty }: Props) => {
	const { name, img, summary, price } = item;
	const [quantity, setQuantity] = useState<number>(0);
	const status: string = 'inactive';

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
				<h2 className="heading-5">{name}</h2>
				<p className="base-small">{summary}</p>
				<span className="product-card__price btn-text">{price} kr</span>
				{showQty && (
					<section className="quantity">
						<button className="btn-qty-base--decrament">-</button>
						<span className="btn-text">{quantity}</span>
						<button className="btn-qty-base--incrament">+</button>
					</section>
				)}
			</section>
		</section>
	);
};
