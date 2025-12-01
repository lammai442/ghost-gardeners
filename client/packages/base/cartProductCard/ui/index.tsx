import './index.scss';
import { Button } from '../../button/ui';
import clsx from 'clsx';
import type { Meal } from '@mojjen/productdata';
import { useCartStore } from '../../../core/stores/usecartstore/data';
import { ContentBox } from '@mojjen/contentbox';
import { CircleIcon } from '@mojjen/circleicon';
import { IoClose } from 'react-icons/io5';
import { useState } from 'react';
import { Modal } from '../../modal/ui';
import { ModalProductCard } from '../../modalproductcard/ui';

/**
 * Author: Klara
 * Product card displayed in cart view.
 *
 * Bugfix: StefanMogren
 * Fixed classname of product-card__img and product-card__img-box, changed font size of included drink
 */

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

	const imgClassNames = clsx('product-card__img', {
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
			<ContentBox extraClass="flex__row cart-item">
				<li className="flex flex__gap-1  cart-item__list-item ">
					<div
						className={`product-card__img-box flex flex__column ${classBgColor}`}
					>
						<img
							className={imgClassNames}
							src={img}
							alt="Image of meal"
							onClick={() => {
								setModalOpen(true);
							}}
						/>
					</div>
					<section
						className=" info-box flex flex__column text__left"
						onClick={() => setModalOpen(true)}
					>
						<div className=" flex flex__column flex____gap-0-5">
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
						</div>
					</section>
					<Button
						aria={`Ta bort ${name} från varukorgen`}
						extraClasses="cart-item__delete-btn"
						onClick={() => deleteCartItem(itemId)}
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
