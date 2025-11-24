import { type ReactNode } from 'react';
import './index.scss';
import { ContentBox } from '@mojjen/contentbox';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { Button } from '@mojjen/button';
import { useNavigate } from 'react-router-dom';
import { cancelOrder } from '../../../core/api/apiproducts/data';

/**
 * Author: Klara Sköld
 * A white box on the order confirmation page that updates as the order status changes.
 * Modified by: ninerino
 * Added functionality to handleCancel
 */

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
		acceptedString: string
	): string => {
		if (status === 'confirmed') return confirmedString;
		else if (status === 'accepted') return acceptedString;
		else return pendingString;
	};

	// Created two separated functions. Merge into one?
	const handleCancel = async () => {
	try {
		if (orderId) {
		await cancelOrder(orderId);
	}

	setStatus("cancelled");

	navigate("/");
	} catch (err) {
		console.error(err);
	}
};

	const handleEdit = () => {
		// Add edit function
		navigate(-1);
	};

	const renderButtons = (): ReactNode => {
		return (
			<div className="flex btns">
				<Button aria="Avbryt order och" onClick={handleCancel} style="red">
					Avbryt
				</Button>
				<Button aria="Avbryt order och" onClick={handleEdit} style="outlined">
					Ändra order
				</Button>
			</div>
		);
	};

	return (
		<ContentBox
			extraClass="order__content-box order__thanks flex text__center flex__column"
			titleLevel="h1"
			titleTxt={generateString(
				status,
				'Din order är skickad',
				'Köket tillagar din mat',
				'Din beställning är klar. Välkommen fram till kassan för att hämta din mat. Smaklig måltid och välkommen tillbaka!'
			)}
			text={generateString(
				status,
				'Din beställning har tagits emot, men har ännu inte bekräftats. Du kan fortfarande ändra din order.',
				'Köket har bekräftat din order och din mat håller på att tillagas. Vi meddelar dig när du kan hämta din beställning.',
				'Din beställning är klar. Välkommen fram till kassan för att hämta din mat. Smaklig måltid och välkommen tillbaka!'
			)}
			icon={
				<DotLottieReact
					src={generateString(
						status,
						'https://lottie.host/064a35cd-92d2-4ebc-98ea-6cd257546173/NAcVaHUHd3.lottie',
						'https://lottie.host/7efecad1-efeb-40b2-a28f-a785d4b3642e/wyawnIxZGM.lottie',
						'https://lottie.host/aebe50b3-c3fb-41d9-b5ad-50d1f752d479/rInLWuCz37.lottie'
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
	);
};
