import { useState } from 'react';
import { DrinkFilter } from '@mojjen/drinkfilter';
import { CircleIcon } from '../../circleicon/ui';
import { IoClose } from 'react-icons/io5';
import type { OrderItem, OrderItems } from '@mojjen/orderitems';
import './index.scss';

type Props = {
	item: //	| Meal
	OrderItem;
	allProdList: OrderItem[]; // Ändrat från Meal
	// classBgColor: string;
	selectedOrder?: OrderItems; // OrderItems kommer från OrderPage
	setSelectedOrder?: React.Dispatch<React.SetStateAction<OrderItems | null>>; //React.Dispatch<React.SetStateAction<OrderItems | null>> kommer från OrderPage
};

/* type Order = {
    attribute: { items: OrderItem[] }; // Ändrat från Meal
    status: string;
} */

export const CartProductCard = ({
	item,
	// classBgColor,
	allProdList,
	selectedOrder,
	setSelectedOrder,
}: Props) => {
	const [modalOpen, setModalOpen] = useState(false);

	return (
		<>
			<li className="flex flex__gap-2 flex__column cart-item bg-super-light-beige border-radius">
				<section
					className="info-box flex flex__column text__left flex__gap-1 cart-item "
					onClick={() => setModalOpen(true)}
				>
					<h2 className="heading-4 flex flex__row flex__align-items flex__space-between">
						{item.name}
						{/* Gör ingenting just nu, behöver lägga till delete-funktion */}
						<CircleIcon style="red">
							<IoClose style={{color: "#f3f0e7"}}/>
						</CircleIcon>
					</h2>
					{item.includeDrink && (
						<section className="flex flex__row flex__gap-3">

							<article className="flex flex__column">
								<p className="base-bold text-ketchup">Vald dryck:</p>
								<p className="base-small">Ändra vid lagerbrist</p>
							</article>

							<article className="flex flex__column">
								{/* Om setSelectedOrder finns och ordern är pending, visa DrinkFilter */}
								{setSelectedOrder &&
									selectedOrder &&
									selectedOrder.status === 'pending' && (
										<DrinkFilter
											item={item}
											allProdList={allProdList}
											setCurrentItem={
												((updatedItem: OrderItem) => {
													// Ändrat från Meal
													setSelectedOrder?.((prev: OrderItems | null) => {
														if (!prev) return null; // hantera null
														const updatedItems = prev.attribute.items.map(
															(i: OrderItem) =>
																i.id === item.id ? updatedItem : i
														);
														return {
															...prev,
															attribute: {
																...prev.attribute,
																items: updatedItems,
															},
														};
													});
												}) as React.Dispatch<React.SetStateAction<OrderItem>>
											}
										/>
									)}
							</article>
						</section>
					)}
				</section>


			</li>
		</>
	);
};
