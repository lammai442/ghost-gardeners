import './index.scss';
import { Page } from '@mojjen/page';
import { ProductsList } from '@mojjen/productslist';
import { useCartStore } from '../../../core/stores/usecartstore/data';
import { Button } from '../../../base/button/ui';
import { getItemsForOrder } from '../../../core/stores/usecartstore/data';
import { useNavigate } from 'react-router-dom';

/**
 * Author: Klara Sköld
 * This is the cart page.
 *
 */

export const CartPage = () => {
	const { cart, incrament, decrament, emptyCart } = useCartStore();
	0;
	const navigate = useNavigate();

	const handleSubmit = async () => {
		try {
			// Transformera cart → order-format
			const items = getItemsForOrder();
			console.log('Items skickade till backend', items);

			// POST till backend
			const response = await fetch(
				'https://or4n888gwe.execute-api.eu-north-1.amazonaws.com/api/order',
				{
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ items, userComment: '', staffComment: '' }),
				}
			);

			const data = await response.json();

			emptyCart();
			// Navigera till ConfirmedOrderPage med orderdata
			navigate('/order', { state: data.order });
		} catch (error) {
			console.error('Error creating order:', error);
		}
	};

	const generateCartProducts = () => {
		if (cart.length === 0) return null;
		return <ProductsList prodlist={cart} />;
	};

	return (
		<Page titleText="Varukorg">
			{generateCartProducts()}
			<Button aria="Skicka order" onClick={handleSubmit} style="green">
				Skicka order
			</Button>
		</Page>
	);
};
