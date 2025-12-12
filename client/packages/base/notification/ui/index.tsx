import './index.scss';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useEffect, useState } from 'react';

type Props = {
	autoPlay: boolean;
};

export const Notification = ({ autoPlay }: Props) => {
	const [playKey, setPlayKey] = useState(0);

	useEffect(() => {
		setPlayKey((prev) => prev + 1); // ökar key varje gång autoPlay ändras
	}, [autoPlay]);

	return (
		<div key={playKey}>
			<DotLottieReact
				src="https://lottie.host/3188d197-8286-4c0c-ad1f-e79501157e00/RBBtB3ZC7L.lottie"
				loop={autoPlay}
				autoplay={autoPlay}
				style={{ width: '50px', marginRight: '-15px' }} // Sätter bredden direkt via inline-style
			/>
		</div>
	);
};
