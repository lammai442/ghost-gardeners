import './index.scss';

type Props = {
	orderId: string;
	time: string;
	orderStatus: string;
};

export const Order = ({ orderId, time, orderStatus }: Props) => {
	return (
		<li className={`order-page__order order-page__order-${orderStatus}`}>
			<span className="heading-5"># {orderId}</span>
			<span className="flex flex__gap-0-5 base">
				<img src="/assets/clock-icon.svg" alt="" />
				<time dateTime={`${time.replace('.', ':')}`}>{time}</time>
			</span>
		</li>
	);
};
