import './index.scss';
import { Modal } from '@mojjen/modal';
import { LoadingMsg } from '@mojjen/loading-msg';

type Props = {
	headTitle: string;
	title: string;
	text: string;
	setModalOpen: (value: boolean) => void;
};

export const ModalLoading = ({
	headTitle,
	title,
	text,
	setModalOpen,
}: Props) => {
	return (
		<Modal
			open={true}
			setModalOpen={setModalOpen}
			titleContent={<h3 className="heading-3 text-light-beige">{headTitle}</h3>}
		>
			<LoadingMsg title={title} text={text} />
		</Modal>
	);
};

/**
 * Author: Lam
 * A loading component which open a modal for full view that takes in headTitle, title, text and function setModalOpen as component.
 *
 */
