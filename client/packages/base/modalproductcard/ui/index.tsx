import './index.scss';
import type { Meal } from '@mojjen/productdata';
import { DrinkFilter } from '../../drinkfilter/ui';
import { Button } from '../../button/ui';
import { useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import { useCartStore } from '@mojjen/usecartstore';

type Props = {
	item: Meal;
	allProdList: Meal[];
	classBgColor: string;
	setModalOpen: Dispatch<SetStateAction<boolean>>;
};

export const ModalProductCard = ({
	item,
	allProdList,
	classBgColor,
	setModalOpen,
}: Props) => {
	const [currentItem, setCurrentItem] = useState<Meal>(item);
	const { incrament, updateCartItem } = useCartStore();

	const handlePutToCart = (): void => {
		// If it is edit from cart then update the current item in cart
		if (item.itemId) updateCartItem(currentItem);
		// else add a new item to cart
		else incrament(currentItem);
		setModalOpen(false);
	};

	return (
		<section className="modal__meal-wrapper">
			<section className="modal__top-section">
				<div className={`modal__top-left ${classBgColor}`}>
					<img src={item.img} className="product-card__img" alt="" />
				</div>
				<section className="modal__top-right">
					<section className="modal__desc-box">
						<h3 className="heading-4 text-ketchup">Beskrivning</h3>
						<p className="base">{item.description}</p>
					</section>
					<section>
						<hr />
						<div className="modal__price-box">
							<span className="heading-3">Pris</span>
							<span className="heading-3">{item.price} kr</span>
						</div>
						<hr />
					</section>
					<section>
						<h3 className="heading-4 text-ketchup">Allergener</h3>
						<span>Denna produkt innehåller:</span>
						<span>{}</span>
					</section>
				</section>
			</section>
			{item.includeDrinkName && (
				<section>
					<DrinkFilter
						extraClasses=""
						item={item}
						allProdList={allProdList}
						setCurrentItem={setCurrentItem}
					/>
				</section>
			)}
			<Button
				extraClasses="modal__to-cart-btn"
				aria="Button to add item to cart"
				onClick={handlePutToCart}
				children={item.itemId ? 'Ändra i varukorgen' : 'Lägg till i varukorgen'}
			/>
		</section>
	);
};
