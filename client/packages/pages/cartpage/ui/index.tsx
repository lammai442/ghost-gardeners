import './index.scss';
import { Page } from '@mojjen/page';
import { ProductsList } from '@mojjen/productslist';
import { useCartStore } from '../../../core/stores/usecartstore/data';
import { Button } from '../../../base/button/ui';
import { getItemsForOrder } from '../../../core/stores/usecartstore/data';
import { useNavigate } from 'react-router-dom';
import { ContentBox } from '@mojjen/contentbox';
import { calcSum } from '../../../../src/utils/utils';
import { useEffect, useState, type ChangeEvent } from 'react';
import { apiGetMeals } from '@mojjen/apiproducts';
import type { Meal } from '@mojjen/productdata';
import { Comment } from '@mojjen/comment';
import { ModalLoading } from '@mojjen/modalloading';
import { useAuthStore } from '@mojjen/useauthstore';

type GetMealsResponse = {
	data: Meal[];
	status: number;
	success: boolean;
};

export const CartPage = () => {
	const { cart, emptyCart } = useCartStore();
	const { user } = useAuthStore();
	const [allProdList, setAllProdList] = useState<Meal[]>([]);
	const [comment, setComment] = useState('');
	const [loading, setLoading] = useState<boolean>(false);
	const [commentCount, setCommentCount] = useState(0);
	const apiUrl: string = import.meta.env.VITE_API_URL;

	useEffect(() => {
		const fetchMeals = async () => {
			const response: GetMealsResponse = await apiGetMeals();
			if (response.success) setAllProdList(response.data);
		};
		fetchMeals();
	}, []);

	const navigate = useNavigate();
	const handleSubmit = async () => {
		setLoading(true);

		try {
			// Transformera cart → order-format
			const items = getItemsForOrder();
			// POST till backend
			const response = await fetch(`${apiUrl}/order`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					items,
					userComment: comment,
					staffComment: '',
					userId: user?.userId,
				}),
			});
			const data = await response.json();
			setLoading(false);
			emptyCart();
			// Navigera till ConfirmedOrderPage med orderdata
			navigate('/order', { state: data.order });
		} catch (error) {
			console.error('Error creating order:', error);
		}
	};

	const handleBackToMenu = () => navigate('/menu');
	const handleEmpty = () => emptyCart();
	const handleChangeComment = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setComment(e.target.value);
		setCommentCount(e.target.value.length);
	};

	const generateCartProducts = () => {
		if (cart.length === 0) return null;
		return (
			<ProductsList
				isCartItem={true}
				prodList={cart}
				allProdList={allProdList}
			/>
		);
	};

	console.log(cart);

	return (
		<Page titleText="Varukorg" extraClasses="cart flex">
			{/* Cart items */}
			{generateCartProducts()}
			{loading && (
				<ModalLoading
					headTitle="Laddar"
					title="Bearbetar"
					text="Din förfrågan skickas. Vänta ett ögonblick."
					setModalOpen={setLoading}
				/>
			)}

			{/* User comment */}
			<div className="flex flex__column flex__gap-3 cart__comment-summary-div">
				{cart.length > 0 && (
					<Comment
						comment={comment}
						handleChangeComment={handleChangeComment}
						commentCount={commentCount}
					/>
				)}

				{/* Summary */}
				<ContentBox
					titleLevel="h3"
					titleTxt="Totalt"
					extraClass="cart__summary"
				>
					<div className="flex flex__space-between cart__summary--gap">
						<h5 className="heading-4">{cart.length} artiklar</h5>
						<h5 className="heading-4">
							{calcSum(cart, (item) => item.price)} kr
						</h5>
					</div>
					<div className="flex flex__column cart__ctas">
						{cart.length > 0 ? (
							<>
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
								<Button
									aria="Töm varukorgen"
									onClick={handleEmpty}
									style="outlined"
								>
									Töm varukorgen
								</Button>
							</>
						) : (
							<>
								<h2 className="heading-5 cart__empty-text">
									Varukorgen är tom just nu. Ta en sväng förbi menyn och unna
									dig en riktigt gôttig kôrv.
								</h2>
								<Button
									aria="Gå tillbaka till menyn"
									onClick={handleBackToMenu}
								>
									Till menyn
								</Button>
							</>
						)}
					</div>
				</ContentBox>
			</div>
		</Page>
	);
};

/**
 * Author: Klara Sköld
 * This is the cart page.
 * Updated: Lam
 * Change calculation of sum of articles and total amount
 * Added fetching of apiGetMeals to send allProdList to modal
 *
 * Updated: Klara
 * Added a textarea for user comment on order.
 *
 * Updated: Lam
 * Added loadingModal when fetching createOrder and user from useUserStore
 *
 */
