import './index.scss';
import { Button } from '../../button/ui';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import type { Meal } from '@mojjen/productdata';
import { useCartStore } from '../../../core/stores/usecartstore/data';
import { Modal } from '../../modal/ui';

/**
 * Author: Lam
 * Menupage that display the menu of Mojjens meals with connection to cart of useCartStore.
 *
 * Update: Klara
 * When the user clicks on a product card a modal opens.
 */

type Props = {
	item: Meal;
	classBgColor: string;
	showQty?: boolean;
	showIncramentBtn?: boolean;
	isFlexColumn?: boolean;
	isCartItem?: boolean;
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
	const [modalOpen, setModalOpen] = useState(false);

	useEffect(() => {
		const itemExistInCart = cart.find((i) => i.id === item.id);
		// Add to the qty count of the product
		if (itemExistInCart) setQuantity(itemExistInCart.qty);
		if (!itemExistInCart) setQuantity(0);
	}, [cart]);

	const productCardClassNames = clsx('flex product-card', {
		flex__column: isFlexColumn,
		inactive: status === 'inactive',
	});
	const imgClassNames = clsx('product-card__img', {
		inactive: status === 'inactive',
	});

	const handleModal = () => {
		console.log('Opens modal');
		setModalOpen(true);
	};
	// If the modal is open the background is unscrollable.
	useEffect(() => {
		if (modalOpen === false) {
			document.body.style.overflow = 'unset';
		}
	}, [modalOpen, handleModal]);

	return (
		<>
			<Modal
				open={modalOpen}
				titleContent={<h3 className="heading-3 text-light-beige">{name}</h3>}
				secondaryFn={() => setModalOpen(false)}
				cancelFn={() => setModalOpen(false)}
				setModalOpen={setModalOpen}
			>
				<p>Placeholder modal content</p>
			</Modal>

			<li className={productCardClassNames}>
				{/* <li className="product-card flex flex__column"> */}
				<section
					onClick={handleModal}
					className={`product-card__img-box flex ${classBgColor}`}
				>
					<img className={imgClassNames} src={img} alt="Image of meal" />
					{/* {showIncramentBtn && ( */}
					<Button
						aria={`Lägg till en ${item.name} i varukorgen`}
						onClick={handleModal}
						extraClasses="product-card__add-btn"
						style="black"
						isDisabled={true}
					>
						<span className="heading-5">+</span>
					</Button>
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
							<button
								className="btn-qty-base--decrament"
								onClick={() => decrament(item.id)}
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
			</li>
		</>
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
