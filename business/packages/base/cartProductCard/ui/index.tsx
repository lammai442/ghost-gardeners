import { useState } from 'react';
import { DrinkFilter } from '@mojjen/drinkfilter';
import { CircleIcon } from '@mojjen/circleicon';
import { IoClose } from 'react-icons/io5';
import type { OrderItem, OrderItems } from '@mojjen/orderitems';
import './index.scss';
import { LoadingMsg } from '@mojjen/loadingmsg';
import { apiDeletItemFromOrder } from '@mojjen/apiproducts';

type Props = {
	item: OrderItem;
	allProdList: OrderItem[]; // Ändrat från Meal

	selectedOrder?: OrderItems; // OrderItems kommer från OrderPage
	setSelectedOrder?: React.Dispatch<React.SetStateAction<OrderItems | null>>; //React.Dispatch<React.SetStateAction<OrderItems | null>> kommer från OrderPage
};

export const CartProductCard = ({
	item,
	allProdList,
	selectedOrder,
	setSelectedOrder,
}: Props) => {
	const [loadingMsg, setLoadingMsg] = useState<boolean>(false);

	const handleDeleteItem = async () => {
		setLoadingMsg(true);
		const orderId: string | undefined = selectedOrder?.SK?.slice(6);
		const response = await apiDeletItemFromOrder(orderId, item.itemId);

		if (response.updatedOrder && setSelectedOrder) {
			setSelectedOrder(response.updatedOrder);
		}
		setLoadingMsg(false);
	};

	return (
		<>
			<li className="flex flex__gap-2 flex__column cart-item bg-super-light-beige border-radius">
				<section className="info-box flex flex__column text__left flex__gap-1-5 cart-item ">
					{loadingMsg ? (
						<LoadingMsg title="Tar bort produkt" />
					) : (
						<>
							<h2 className="heading-4 flex flex__row flex__align-items flex__space-between flex__gap-1">
								{item.name}
								{selectedOrder && selectedOrder.status === 'pending' && (
									<button
										className="order__delete-item-btn"
										onClick={() => handleDeleteItem()}
									>
										<CircleIcon style="red">
											<IoClose style={{ color: '#f3f0e7' }} />
										</CircleIcon>
									</button>
								)}
							</h2>
							{item.includeDrink &&
							selectedOrder &&
							selectedOrder.status === 'pending' ? (
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
														}) as React.Dispatch<
															React.SetStateAction<OrderItem>
														>
													}
												/>
											)}
									</article>
								</section>
							) : (
								<>
									<div>
										<span className="base-bold text-ketchup">Vald dryck:</span>
										<span className="base "> {item.includeDrinkName}</span>
									</div>
								</>
							)}
						</>
					)}
				</section>
			</li>
		</>
	);
};

/**
 * Author:?
 *
 * Update: Lam
 * Added functionality of delete item button
 */
