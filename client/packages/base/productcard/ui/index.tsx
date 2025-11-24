import './index.scss';
import { Button } from '../../button/ui';
import clsx from 'clsx';
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
	isFlexColumn?: boolean;
};

export const ProductCard = ({
	item,
	classBgColor,
	showQty,
	showIncramentBtn,
	isFlexColumn,
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

	const productCardClassNames = clsx('flex product-card', {
		flex__column: isFlexColumn,
	});

	const increase = () => {
		console.log(increase);
	};

	return (
		<li className={productCardClassNames}>
			{/* <li className="product-card flex flex__column"> */}
			<section className={`product-card__img-box flex ${classBgColor}`}>
				<img className="product-card__img" src={img} alt="Image of meal" />
				{showIncramentBtn && (
					<Button
						aria={`Lägg till en ${item.name} i varukorgen`}
						onClick={increase}
						extraClasses="product-card__add-btn"
						style="black"
					>
						<span className="heading-5">+</span>
					</Button>
				)}
			</section>
			<section className="product-card__info-box info-box flex flex__column text__left">
				<div className="info-box__top flex flex__column">
					<h2 className="heading-5">{name}</h2>
					<p className="base-small">{summary}</p>
					<span className="info-box__top--align-self info-box__top--margin-top btn-text flex ">
						{price} kr
					</span>
				</div>

				{showQty && (
					<section className="info-box__bottom flex">
						<button className="btn-qty-base--decrament">-</button>
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
		</li>
		// <section className={productCardClassNames}>
		// 	{status === 'inactive' && (
		// 		<div className="inactive">
		// 			<span className="heading-2">SLUT</span>
		// 		</div>
		// 	)}
		// 	<section className={`product-card__img-box ${classBgColor}`}>
		// 		<img className="product-card__img" src={img} alt="Image of meal" />
		// 		{showIncramentBtn && (
		// 			<button className="product-card__add-btn">+</button>
		// 		)}
		// 	</section>
		// 	<section className="product-card__info-box">
		// 		<h2 className="heading-5">{name}</h2>
		// 		<p className="base-small">{summary}</p>
		// 		<span className="product-card__price btn-text">{price} kr</span>
		// 		{showQty && (
		// 			<section className="quantity">
		// 				<button className="btn-qty-base--decrament">-</button>
		// 				<span className="btn-text">{quantity}</span>
		// 				<button className="btn-qty-base--incrament">+</button>
		// 			</section>
		// 		)}
		// 	</section>
		// </section>
	);
};

// ! Original
// export const ProductCard = ({
// 	item,
// 	classBgColor,
// 	showQty,
// 	showIncramentBtn,
// 	isFlexColumn,
// }: Props) => {
// 	const { name, img, summary, price, status } = item;
// 	const [quantity, setQuantity] = useState<number>(0);

// 	const productCardClassNames = clsx('flex product-card', {
// 		flex__column: isFlexColumn,
// 	});
// 	return (
// 		<section className={productCardClassNames}>
// 			{status === 'inactive' && (
// 				<div className="inactive">
// 					<span className="heading-2">SLUT</span>
// 				</div>
// 			)}
// 			<section className={`product-card__img-box ${classBgColor}`}>
// 				<img className="product-card__img" src={img} alt="Image of meal" />
// 				{showIncramentBtn && (
// 					<button className="product-card__add-btn">+</button>
// 				)}
// 			</section>
// 			<section className="product-card__info-box">
// 				<h2 className="heading-5">{name}</h2>
// 				<p className="base-small">{summary}</p>
// 				<span className="product-card__price btn-text">{price} kr</span>
// 				{showQty && (
// 					<section className="quantity">
// 						<button className="btn-qty-base--decrament">-</button>
// 						<span className="btn-text">{quantity}</span>
// 						<button className="btn-qty-base--incrament">+</button>
// 					</section>
// 				)}
// 			</section>
// 		</section>
// 	);
// };
