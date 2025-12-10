import './index.scss';
import type { Meal } from '@mojjen/productdata';
/**
 * Author: Klara Sköld
 * Details for each article in the order.
 *
 * Author: ninerino
 * Additional functionality to fetch and write to database.
 */

type Props = {
	item: Meal;
};

export const OrderArticle = ({ item }: Props) => {
	return (
		<>
			<div className="grid order-article">
				<h5 className="grid__col-1 grid__row-1 heading-5">{item.name}</h5>
				<div className="flex flex__justify-end grid__col-2 grid__row-1 order-article__quantity-price-div">
					<span className="heading-5">{item.subtotal} kr</span>
				</div>

				<p className="base grid__col-1 grid__row-2">{item.summary}</p>
				<p className="base grid__col-1 grid__row-3">
					Dryck: {item.includeDrinkName}
				</p>
			</div>
			<hr className="order__line" />
		</>
	);
};
