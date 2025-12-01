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

	console.log(item);

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
					<section className="modal__allergene--wrapper">
						<h3 className="heading-4 text-ketchup">Allergener</h3>
						{item.allergenes && item.allergenes?.length > 0 ? (
							<>
								<span className="base-small">Denna produkt innehåller:</span>
								<div className="modal__allergene">
									{item.allergenes.map((allergene) => {
										return (
											<div key={allergene} className="modal__allergene--item">
												<div className="modal__allergene--letter">
													<div className="base-small">
														{allergene.charAt(0).toUpperCase()}
													</div>
												</div>
												<span className="btn-text">
													{allergene.charAt(0).toUpperCase() +
														allergene.slice(1)}
												</span>
											</div>
										);
									})}
								</div>
							</>
						) : (
							<span className="base-small">
								Denna måltid innehåller inga allergener.
							</span>
						)}
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
