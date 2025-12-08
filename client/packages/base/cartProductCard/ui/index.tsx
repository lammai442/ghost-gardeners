import './index.scss';
import clsx from 'clsx';
import type { Meal } from '@mojjen/productdata';
import { useCartStore } from '../../../core/stores/usecartstore/data';
import { ContentBox } from '@mojjen/contentbox';
import { CircleIcon } from '@mojjen/circleicon';
import { IoClose } from 'react-icons/io5';
import { useState } from 'react';
import { Modal } from '../../modal/ui';
import { ModalProductCard } from '../../modalproductcard/ui';

type Props = {
	item: Meal;
	allProdList: Meal[];
	classBgColor: string;
	showQty?: boolean;
	showIncramentBtn?: boolean;
	isFlexColumn?: boolean;
	isCartItem?: boolean;
};

export const CartProductCard = ({ item, classBgColor, allProdList }: Props) => {
	const [modalOpen, setModalOpen] = useState(false);
	const { deleteCartItem } = useCartStore();
	const {
		name,
		img,
		summary,
		price,
		status,
		includeDrink,
		includeDrinkName,
		itemId,
	} = item;

	const imgClassNames = clsx('cart-item__img', {
		inactive: status === 'inactive',
	});

	return (
		<>
			{modalOpen && (
				<Modal
					open={modalOpen}
					titleContent={<h3 className="heading-3 text-light-beige">{name}</h3>}
					setModalOpen={setModalOpen}
				>
					<ModalProductCard
						item={item}
						allProdList={allProdList}
						classBgColor={classBgColor}
						setModalOpen={setModalOpen}
					/>
				</Modal>
			)}
			<ContentBox extraClass="cart-item">
				<li className=" cart-item__list-item">
					<div
						onClick={() => setModalOpen(true)}
						className={`cart-item__img-box grid grid__center ${classBgColor}`}
					>
						<img className={imgClassNames} src={img} alt="Image of meal" />
					</div>

					<section
						className=" cart-item__info-box flex flex__column flex__gap-0-5 text__left"
						onClick={() => setModalOpen(true)}
					>
						<h2 className="heading-4">{name}</h2>
						<p className="base-small">{summary}</p>
						{includeDrink && (
							<p className="heading-5">
								<span className="base-small">Dryck: {includeDrinkName}</span>
							</p>
						)}
						<hr className="cart-item__line" />
						<div className="flex flex__space-between cart-item__price">
							<p className="btn-text flex">Pris</p>
							<p className="btn-text">{price} kr</p>
						</div>
					</section>

					{/* {Had to replace the Button component since it would not allow position absolute.} */}
					<button
						onClick={() => deleteCartItem(itemId)}
						className="cart-item__delete-btn"
						aria-label={`Ta bort ${name} från varukorgen`}
					>
						<CircleIcon style="red" extraClasses="cart-item__icon-box">
							<IoClose
								style={{
									strokeWidth: '10%',
									fontSize: '1.25rem',
								}}
							/>
						</CircleIcon>
					</button>
				</li>
			</ContentBox>
		</>
	);
};

/**
 * Author: Klara
 * Product card displayed in cart view.
 *
 * Bugfix: StefanMogren
 * Fixed classname of product-card__img and product-card__img-box, changed font size of included drink
 *
 * Update: Klara
 * Fixed mobile view.
 */
