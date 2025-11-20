import './index.scss';
import { useEffect, useState } from 'react';
import type { Meal } from '@mojjen/productdata';
import { useCartStore } from '../../../core/stores/usecartstore/data';

/**
 * Author: Lam
 * Menupage that display the menu of Mojjens meals with connection to cart of useCartStore.
 */

type Props = {
	item: Meal;
	classBgColor: string;
	showQty?: boolean;
	showIncramentBtn?: boolean;
};

export const ProductCard = ({
	item,
	classBgColor,
	showQty,
	showIncramentBtn,
}: Props) => {
	const { cart, incrament, decrament } = useCartStore();
	const { name, img, summary, price, status, id } = item;
	const [quantity, setQuantity] = useState<number | undefined>(0);

	useEffect(() => {
		const itemExistInCart = cart.find((i) => i.id === item.id);
		// Add to the qty count of the product
		if (itemExistInCart) setQuantity(itemExistInCart.qty);
		if (!itemExistInCart) setQuantity(0);
	}, [cart]);

	return (
		<section className={`product-card `}>
			{status === 'inactive' && (
				<div className="inactive">
					<span className="heading-2">SLUT</span>
				</div>
			)}
			<section className={`product-card__img-box ${classBgColor}`}>
				<img className="product-card__img" src={img} alt="Image of meal" />
				{showIncramentBtn && (
					<button
						className="product-card__add-btn"
						onClick={() => {
							incrament(item);
							console.log(cart);
						}}
					>
						+
					</button>
				)}
			</section>{' '}
			<section className="product-card__info-box">
				<h2 className="heading-5">{name}</h2>
				<p className="base-small">{summary}</p>
				<span className="product-card__price btn-text">{price} kr</span>
				{showQty && (
					<section className="quantity">
						<button
							className="btn-qty-base--decrament"
							onClick={() => {
								decrament(id);
								console.log(cart);
							}}
						>
							-
						</button>
						<span className="btn-text">{quantity}</span>
						<button
							className="btn-qty-base--incrament"
							onClick={() => {
								incrament(item);
								console.log(cart);
							}}
						>
							+
						</button>
					</section>
				)}
			</section>
		</section>
	);
};
