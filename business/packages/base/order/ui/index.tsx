import './index.scss';

/**
 * Author: StefanMogren
 * Created Order component
 *
 */

type Props = {
	orderId: string;
	time: string;
	orderStatus: string;
};

export const Order = ({ orderId, time, orderStatus }: Props) => {
	return (
		// Creates a box with the orderId and the time of creation.
		<li className={`order-page__order order-page__order-${orderStatus}`}>
			<span className="heading-5">#{orderId}</span>
			<span className="flex flex__align-items flex__gap-0-5 base">
				{/* SVG for the clock icon. Used to get access to its color. */}
				<svg
					width="16"
					height="16"
					viewBox="0 0 16 16"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M0.777832 7.77783C0.777832 8.69709 0.958892 9.60734 1.31068 10.4566C1.66246 11.3059 2.17807 12.0776 2.82808 12.7276C3.47809 13.3776 4.24977 13.8932 5.09905 14.245C5.94833 14.5968 6.85858 14.7778 7.77783 14.7778C8.69709 14.7778 9.60734 14.5968 10.4566 14.245C11.3059 13.8932 12.0776 13.3776 12.7276 12.7276C13.3776 12.0776 13.8932 11.3059 14.245 10.4566C14.5968 9.60734 14.7778 8.69709 14.7778 7.77783C14.7778 5.92132 14.0403 4.14084 12.7276 2.82808C11.4148 1.51533 9.63435 0.777832 7.77783 0.777832C5.92132 0.777832 4.14084 1.51533 2.82808 2.82808C1.51533 4.14084 0.777832 5.92132 0.777832 7.77783Z"
						stroke="#2E2E2E"
						strokeWidth="1.55556"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
					<path
						d="M7.77783 3.88892V7.7778L10.1112 10.1111"
						stroke="#2E2E2E"
						strokeWidth="1.55556"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>

				{/* The time the order was created */}
				<time dateTime={`${time.replace('.', ':')}`}>{time}</time>
			</span>
		</li>
	);
};
