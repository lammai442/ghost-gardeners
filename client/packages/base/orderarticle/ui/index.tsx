import './index.scss';
import type { Meal } from '@mojjen/productdata';

type Props = {
	item: Meal;
	deletedItems?: boolean;
};

export const OrderArticle = ({ item, deletedItems }: Props) => {
	return (
		<>
			<div className="grid order-article">
				<h5
					className={`grid__col-1 grid__row-1 heading-5 ${
						deletedItems ? 'order-article__deleted' : ''
					}`}
				>
					{item.name}
				</h5>
				<div className="flex flex__justify-end grid__col-2 grid__row-1 order-article__quantity-price-div">
					<span
						className={`heading-5 ${
							deletedItems ? 'order-article__deleted' : ''
						}`}
					>
						{item.subtotal} kr
					</span>
				</div>

				<p
					className={`base grid__col-1 grid__row-2 ${
						deletedItems ? 'order-article__deleted' : ''
					}`}
				>
					{item.summary}
				</p>
				<p
					className={`base grid__col-1 grid__row-3 ${
						deletedItems ? 'order-article__deleted' : ''
					}`}
				>
					Dryck: {item.includeDrinkName}
				</p>
			</div>
			<hr className="order__line" />
		</>
	);
};

/**
 * Author: Klara Sköld
 * Details for each article in the order.
 *
 * Author: ninerino
 * Additional functionality to fetch and write to database.
 */
