import './index.scss';
import { ContentBox } from '@mojjen/contentbox';
import { Page } from '@mojjen/page';
import { formatDate } from '../../../../src/utils/utils';
import { Button } from '@mojjen/button';

const testOrderObj = {
	orderId: 'order-62d40',
	user: 'guest',
	status: 'pending',
	items: [
		{
			category: 'MEAL',
			itemId: 'a9dea',
			id: 'meal-62a7b',
			name: 'Ostkôrv i brôd',
			summary: 'Saftig ostkôrv serverad i luftigt kôrvbrôd.',
			price: 70,
			includeDrink: null,
			subtotal: 70,
			img: 'src/assets/icons/meal.png',
			status: 'active',
			includeDrinkName: null,
		},
		{
			category: 'MEAL',
			itemId: '44d6a',
			id: 'meal-1b337',
			name: 'Varmkôrv mä räksallad',
			summary: 'Lättkryddad varmkôrv, toppad med räksallad.',
			price: 65,
			includeDrink: null,
			subtotal: 65,
			img: 'src/assets/icons/meal.png',
			status: 'active',
			includeDrinkName: null,
		},
		{
			category: 'MEAL',
			itemId: '170cb',
			id: 'meal-7e9cf',
			name: 'Kôrv mä mos',
			summary: 'En kokt kôrv mä mos, inga kônstigheter.',
			price: 55,
			includeDrink: null,
			subtota: 55,
			img: 'src/assets/icons/meal.png',
			status: 'active',
			includeDrinkName: null,
		},
	],
	total: 190,
	userComment: '',
	staffComment: '',
	createdAt: '2025-12-03T10:06:44.690Z',
	modifiedAt: '2025-12-03T10:06:44.690Z',
};

export const ProfilePage = () => {
	const generateOrderItems = () => {
		return testOrderObj.items.map((orderItem) => {
			return (
				<li key={orderItem.id} className="base-small orders__list-items">
					<span> {orderItem.name}</span>
					<span className="heading-5">{orderItem.price}</span>
				</li>
			);
		});
	};

	const handleDuplicateOrder = () => {
		console.log('handleDuplicateOrder');
	};

	return (
		<Page titleText="Min sida" extraClasses="flex flex__column menu">
			<section className="orders">
				<h3 className="heading-3">Orderhistorik</h3>
				<ContentBox
					titleTxt={`Order #${testOrderObj.orderId.slice(6)}`}
					titleLevel="h4"
				>
					<p className="base">{formatDate(testOrderObj.createdAt)}</p>

					<ul className="orders__list">
						<h5 className="heading-5">Beställda produkter</h5>
						{generateOrderItems()}
					</ul>
					<Button
						onClick={handleDuplicateOrder}
						aria="Beställ samma order igen"
					>
						Beställ igen
					</Button>
				</ContentBox>
			</section>
		</Page>
	);
};
