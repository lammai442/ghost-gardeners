import './index.scss';

/**
 * Author: Klara Sköld
 * Details for each article in the order.
 *
 */

type Props = {
	item: {
		extras: string[];
		name: string;
		quantity: number;
		subtotal: number;
		without: string[];
	};
};

export const OrderArticle = ({ item }: Props) => {
	console.log('item: ', item);
	return (
		<>
			<div className="grid order-article">
				<h5 className="grid__col-1 grid__row-1 heading-5">{item.name}</h5>
				<div className="flex flex__justify-end grid__col-2 grid__row-1 order-article__quantity-price-div">
					<span className="base">x{item.quantity}</span>
					<span className="heading-5">{item.subtotal} kr</span>
				</div>

				<p className="base grid__col-1 grid__row-2">
					Här ska item.summary stå med
				</p>
			</div>
			<hr className="order__line" />
		</>
	);
};
