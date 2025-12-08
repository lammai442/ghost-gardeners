import './index.scss';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

type Props = {
	autoPlay: boolean;
};

export const CheckAnimation = ({ autoPlay }: Props) => {
	return (
		<DotLottieReact
			//   src="https://lottie.host/2e0ed6a9-1442-4edf-af49-b306ea0e215b/6tmmOBjFWQ.lottie"
			src="https://lottie.host/6e3dc89f-013b-469b-ac5d-f86ed351f5f9/hNqrvPnSlC.lottie"
			loop={false}
			autoplay={autoPlay}
			className="check-animation"
		/>
	);
};
