import './index.scss';
import { ContentBox } from '@mojjen/contentbox';
import { OrderArticle } from '@mojjen/orderarticle';
import { Button } from '@mojjen/button';
import clsx from 'clsx';
import { useNavigate, type NavigateFunction } from 'react-router-dom';
import { useEffect, useState, type ReactNode } from 'react';
import { testObj } from '../../../../src/testdata';
import { CircleIcon } from '@mojjen/circleicon';
import { FaCheck } from 'react-icons/fa';
import { Page } from '@mojjen/page';

/**
 * Author: Klara Sköld
 * This page is rendered after a successful order.It contains white boxes with different type of content.
 *
 */

export const ConfirmedOrderPage = () => {
	const navigate: NavigateFunction = useNavigate();
	const [status, setStatus] = useState(testObj.order.status);

	// ! Acivate this when the function accepts a proper order object instead of a testobject.
	// ! The design may be updated in a future sprint
	// useEffect(()=>{setStatus(order.status)},[status])

	const statusClassNames = clsx('heading-4', {
		'text-cucumber': status === 'pending',
		'text-black': status === 'delivered',
	});

	const generateOrderArticles = (): ReactNode => {
		return testObj.order.items.map((item) => <OrderArticle item={item} />);
	};

	const handleClick = () => {
		navigate('/');
		window.scrollTo(0, 0);
	};
	return (
		<Page titleText="Orderbekräftelse" extraClasses="grid order">
			{/* Content: "Tack för din order" */}
			<ContentBox
				extraClass="order__content-box order__thanks flex text__center flex__column"
				titleLevel="h1"
				titleTxt="Tack för din order!"
				text="Din beställning har tagits emot och håller på att mojjas ihop."
			>
				<CircleIcon>
					<FaCheck style={{ color: '#f3f0e7', fontSize: '1.5rem' }} />
				</CircleIcon>
			</ContentBox>

			<div className="grid order__content-boxes">
				{/* Content: "Sammanfattning" */}
				<ContentBox
					extraClass="order__content-box order__summary"
					titleTxt="Sammanfattning"
					titleLevel="h2"
				>
					<div className="flex flex__space-between">
						<span className="base">Delsumma</span>
						<span className="base">{testObj.order.total * 0.88} kr</span>
					</div>
					<div className="flex flex__space-between">
						<span className="base">Moms</span>
						<span className="base">12 %</span>
					</div>
					<hr className="order__line" />
					<div className="flex flex__space-between">
						<h4 className="heading-4">Totalt</h4>
						<h4 className="heading-4">{testObj.order.total} kr</h4>
					</div>
					<Button aria="Tillbaka till startsidan" onClick={handleClick}>
						Köp mer
					</Button>
				</ContentBox>

				{/* Content: "Betalningsinformation" */}
				<ContentBox
					style="red"
					titleTxt="Betalningsinformation"
					titleLevel="h3"
					extraClass="order__content-box"
					text="Betala med kort eller Swish i kassan när du hämtar din order."
				/>

				{/* Content: "Order-id" */}
				<ContentBox extraClass="order__content-box order__order-id">
					<aside className="flex flex__space-between">
						<div className="flex flex__column text__left">
							<p className="base-small">Order-id</p>
							<p className="heading-3">#{testObj.order.orderId.slice(6)}</p>
						</div>
						<p className={statusClassNames}>
							{testObj.order.status.charAt(0).toUpperCase() +
								testObj.order.status.slice(1)}
						</p>
					</aside>
					<hr className="order__line" />
					<aside className="flex flex__space-between flex__align-items text__left">
						<div className="flex flex__column">
							<h5 className="heading-5">Beräknad tid</h5>
							<p className="base">15 minuter</p>
						</div>
						<div className="flex flex__column ">
							<h5 className="heading-5">Upphämtning</h5>
							<p className="base">Vid kassan</p>
						</div>
					</aside>
				</ContentBox>

				{/* Content: "Din beställning" */}
				<ContentBox
					extraClass="order__content-box order__articles"
					titleTxt="Din beställning"
					titleLevel="h2"
				>
					{generateOrderArticles()}
				</ContentBox>

				{/* Content: "Din kommentar" */}
				{testObj.order.userComment && (
					<ContentBox
						extraClass="order__content-box order__comment"
						titleTxt="Din kommentar"
						titleLevel="h3"
						text={testObj.order.userComment}
					/>
				)}
			</div>
		</Page>
	);
};
