import './index.scss';
import { Page } from '@mojjen/page';
import { ProductsList } from '@mojjen/productslist';
import { useCartStore } from '../../../core/stores/usecartstore/data';
import { Button } from '../../../base/button/ui';
import { getItemsForOrder } from '../../../core/stores/usecartstore/data';
import { useNavigate } from 'react-router-dom';
import { ContentBox } from '@mojjen/contentbox';
import { calcSum } from '../../../../src/utils/utils';
/**
 * Author: Klara Sköld
 * This is the cart page.
 *
 */

export const CartPage = () => {
	const { cart, incrament, decrament, emptyCart } = useCartStore();
	const apiUrl: string = import.meta.env.VITE_API_URL;

	const navigate = useNavigate();
	console.log('cart: ', cart);
	const handleSubmit = async () => {
		try {
			// Transformera cart → order-format
			const items = getItemsForOrder();
			console.log('Items skickade till backend', items);

			// POST till backend
			const response = await fetch(`${apiUrl}order`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ items, userComment: '', staffComment: '' }),
			});

			const data = await response.json();

			emptyCart();
			// Navigera till ConfirmedOrderPage med orderdata
			navigate('/order', { state: data.order });
		} catch (error) {
			console.error('Error creating order:', error);
		}
	};

	const handleBackToMenu = () => navigate('/menu');
	const handleEmpty = () => console.log('handleEmpty()');

	const generateCartProducts = () => {
		if (cart.length === 0) return null;
		return <ProductsList prodlist={cart} isCartItem={true} />;
	};

	return (
		<Page titleText="Varukorg" extraClasses="cart flex">
			{generateCartProducts()}
			<ContentBox titleLevel="h3" titleTxt="Totalt" extraClass="cart__summary">
				<div className="flex flex__space-between cart__summary--gap">
					<h5 className="heading-4">
						{/* Qty is optional, that's why we need the ternary operator */}
						{calcSum(cart, (item) => (item.qty ? item.qty : 0))} artiklar
					</h5>
					<h5 className="heading-4">
						{calcSum(cart, (item) => item.price * (item.qty ? item.qty : 0))} kr
					</h5>
				</div>
				<div className="flex flex__column cart__ctas">
					<Button aria="Skicka order" onClick={handleSubmit}>
						Köp
					</Button>
					<Button
						aria="Gå tillbaka till menyn"
						onClick={handleBackToMenu}
						style="brown"
					>
						Lägg till mer
					</Button>
					<Button aria="Töm varukorgen" onClick={handleEmpty} style="outlined">
						Töm varukorgen
					</Button>
				</div>
			</ContentBox>
		</Page>
	);
};
