import { useState, type ReactNode } from 'react';
import './index.scss';
import { ContentBox } from '@mojjen/contentbox';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { Button } from '@mojjen/button';
import { useNavigate } from 'react-router-dom';
import { cancelOrder } from '../../../core/api/apiproducts/data';
import { useCartStore } from '../../../core/stores/usecartstore/data';
import { Modal } from '@mojjen/modal';
import { useAuthStore } from '@mojjen/useauthstore';
import { LoadingMsg } from '@mojjen/loading-msg';
import { ModalLoading } from '@mojjen/modalloading';

type Props = {
	orderId?: string;
	status: string;
	setStatus: React.Dispatch<React.SetStateAction<string>>; // A function that accepts either a string ("active"/"pending"/"done") or a callback function that returns a string (for example a toggle state function). // Help from ChatGPT to understand how to type it up.
};

export const OrderStatusBox = ({ orderId, status, setStatus }: Props) => {
	const navigate = useNavigate();
	const generateString = (
		status: string,
		pendingString: string,
		confirmedString: string,
		acceptedString: string,
		cancelledString: string
	): string => {
		if (status === 'confirmed') return confirmedString;
		else if (status === 'done') return acceptedString;
		else if (status === 'cancelled') return cancelledString;
		else return pendingString;
	};

	const [showCancelModal, setShowCancelModal] = useState(false);
	const [loading, setLoading] = useState<boolean>(false);
	const [loadingModal, setLoadingModal] = useState<boolean>(false);
	const { user } = useAuthStore();

	const handleCancel = () => {
		setShowCancelModal(true);
	};

	const confirmCancel = async () => {
		try {
			if (orderId) {
				if (!user?.token) {
					throw new Error('User token is required');
				}
				setLoading(true);
				const response = await cancelOrder(orderId, user.token);
				if (!response.success) throw new Error('Cannot cancel order');
				setLoading(false);
			}

			setStatus('cancelled');
			navigate('/');
		} catch (err) {
			console.error(err);
		}
	};

	const closeCancelModal = () => {
		setShowCancelModal(false);
	};

	const handleEdit = async () => {
		if (!orderId) return;
		if (!user?.token) {
			throw new Error('User token is required');
		}
		setLoadingModal(true);
		try {
			const res = await fetch(
				`${import.meta.env.VITE_API_URL}/order/${orderId}`,
				{
					method: 'GET',
					headers: {
						Authorization: `Bearer ${user.token}`,
						'Content-Type': 'application/json',
					},
				}
			);

			if (!res.ok) throw new Error('Kunde inte hämta ordern');
			const data = await res.json();

			// Sätt status till cancelled i backend
			const response = await fetch(
				`${import.meta.env.VITE_API_URL}/order/${orderId}`,
				{
					method: 'PUT',
					headers: {
						Authorization: `Bearer ${user.token}`,
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						items: data.order.attribute.items,
						status: 'cancelled',
					}),
				}
			);

			// Lägg tillbaka samma orderId i cart
			const itemsForCart = data.order.attribute.items.map((item: any) => ({
				...item,
				subtotal: item.price,
				status: 'cancelled',
			}));

			useCartStore.getState().setCartItems(itemsForCart);
			setLoadingModal(false);
			navigate(-1); // tillbaka till cart
		} catch (err) {
			console.error('Fel vid ändra order:', err);
		} finally {
			// setLoading(false);
		}
	};

	const renderButtons = (): ReactNode => {
		return loadingModal ? (
			<ModalLoading
				headTitle="Laddar"
				title="Avbryter beställningen"
				text="Tillbaka till kundvagn"
				setModalOpen={setLoadingModal}
			/>
		) : (
			<>
				<div className="flex btns">
					<Button aria="Avbryt order" onClick={handleCancel} style="red">
						Avbryt
					</Button>

					<Button aria="Ändra order" onClick={handleEdit} style="outlined">
						Ändra order
					</Button>
				</div>
			</>
		);
	};

	return (
		<>
			<ContentBox
				extraClass="order__content-box order__thanks flex text__center flex__column"
				titleLevel="h1"
				titleTxt={generateString(
					status,
					'Din order är skickad',
					'Köket tillagar din mat',
					'Din beställning är klar.',
					'Din order är avbruten.'
				)}
				text={generateString(
					status,
					'Din beställning har tagits emot, men har ännu inte bekräftats. Du kan fortfarande ändra din order.',
					'Köket har bekräftat din order och din mat håller på att tillagas. Vi meddelar dig när du kan hämta din beställning.',
					'Din beställning är klar. Välkommen fram till kassan för att hämta din mat. Smaklig måltid och välkommen tillbaka!',
					'Vi beklagar att din beställning har blivit avbruten från köket. Prova gärna att lägga en ny beställning eller kontakta oss för beställning.'
				)}
				icon={
					<DotLottieReact
						src={generateString(
							status,
							'https://lottie.host/064a35cd-92d2-4ebc-98ea-6cd257546173/NAcVaHUHd3.lottie',
							'https://lottie.host/7efecad1-efeb-40b2-a28f-a785d4b3642e/wyawnIxZGM.lottie',
							'https://lottie.host/aebe50b3-c3fb-41d9-b5ad-50d1f752d479/rInLWuCz37.lottie',
							'https://lottie.host/5a550e87-2f0a-4919-a620-d10e585af3dc/XEbRgAzKK3.lottie'
						)}
						loop
						autoplay
						style={{ height: 100, width: 'auto' }}
					/>
				}
			>
				<h4 className="heading-4">
					Ordernr:{' #'}
					{orderId
						? orderId
						: 'Vi kunde inte hämta ditt ordernummer. Prata med oss i kassan'}
				</h4>
				{status === 'pending' && renderButtons()}
			</ContentBox>

			<Modal
				open={showCancelModal}
				setModalOpen={setShowCancelModal}
				titleContent={
					<h2 className="heading-2 text-light-beige">Avbryt order</h2>
				}
			>
				{loading ? (
					<LoadingMsg title="Avbryter ordern"></LoadingMsg>
				) : (
					<div className="flex flex__column flex__gap-1">
						<p className="base cancel-text">
							Är du säker på att du vill avbryta din order?
						</p>

						<div className="flex flex__gap-2 flex__justify-end">
							<Button
								style="outlined"
								onClick={closeCancelModal}
								aria={'Gå tillbaka'}
							>
								Gå tillbaka utan att ändra
							</Button>

							<Button style="red" onClick={confirmCancel} aria={'Avbryt order'}>
								Ja, avbryt ordern
							</Button>
						</div>
					</div>
				)}
			</Modal>
		</>
	);
};

/**
 * Author: Klara Sköld
 * A white box on the order confirmation page that updates as the order status changes.
 * Modified by: ninerino
 * Added functionality to handleCancel
 */
