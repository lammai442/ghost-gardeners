import './index.scss';
import { Button } from '../../button/ui';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import type { Meal, OrderItem } from '@mojjen/productdata';
import { useCartStore } from '../../../core/stores/usecartstore/data';
import { ContentBox } from '@mojjen/contentbox';
import { CircleIcon } from '@mojjen/circleicon';
import { IoClose } from 'react-icons/io5';
import { log } from 'console';

/**
 * Author: Klara
 * Product card displayed in cart view.
 */

type Props = {
	item: OrderItem;
	// item: Meal;
	classBgColor: string;
	showQty?: boolean;
	showIncramentBtn?: boolean;
	isFlexColumn?: boolean;
	isCartItem?: boolean;
};

export const CartProductCard = ({
	item,
	classBgColor,

	isFlexColumn,
}: Props) => {
	const { cart, decrament } = useCartStore();
	const { name, img, summary, price, status, includeDrink, id } = item;
	console.log('item från CartProductCard: ', item);
	const [quantity, setQuantity] = useState<number | undefined>(0);

	useEffect(() => {
		const itemExistInCart = cart.find((i) => i.id === item.id);
		// Add to the qty count of the product
		if (itemExistInCart) setQuantity(itemExistInCart.qty);
		if (!itemExistInCart) setQuantity(0);
	}, [cart]);

	const imgClassNames = clsx('product-card__img2', {
		inactive: status === 'inactive',
	});

	return (
		<>
			<ContentBox extraClass="flex__row cart-item">
				<li className="flex flex__gap-1  cart-item__list-item ">
					<div
						className={`product-card__img-box2 flex flex__column ${classBgColor}`}
					>
						<img className={imgClassNames} src={img} alt="Image of meal" />
					</div>
					<section className=" info-box flex flex__column text__left  ">
						<div className=" flex flex__column flex____gap-0-5">
							<h2 className="heading-4">{name}</h2>
							<p className="base-small">{summary}</p>
							{includeDrink && (
								<p className="heading-5">
									<span className="">Dryck: </span>
								</p>
							)}
							<hr className="cart-item__line" />
							<div className="flex flex__space-between cart-item__price">
								<p className="btn-text flex">Pris</p>
								<p className="btn-text">{price} kr</p>
							</div>
						</div>
					</section>
					<Button
						aria={`Ta bort ${name} från varukorgen`}
						extraClasses="cart-item__delete-btn"
						onClick={() => decrament(id)}
						style="simple"
					>
						<CircleIcon style="red">
							<IoClose />
						</CircleIcon>
					</Button>
				</li>
			</ContentBox>
		</>
	);
};
