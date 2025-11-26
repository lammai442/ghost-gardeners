import type { ReactNode } from 'react';
import './index.scss';

import { useEffect } from 'react';
import { IoClose } from 'react-icons/io5';
import { Button } from '@mojjen/button';
import { ContentBox } from '@mojjen/contentbox';

/**
 * Author: Klara Sköld
 * Created a reusable modal.
 *  * Solution based on this code: https://www.freecodecamp.org/news/create-react-reusable-modal-component/
 */

type Props = {
	open: boolean;

	setModalOpen: (arg0: boolean) => void;
	titleContent?: React.ReactNode;
	className?: string;
	children?: ReactNode;
};

export const Modal = ({
	open,
	titleContent,
	children,
	setModalOpen,
}: Props) => {
	const closeModal = () => {
		setModalOpen(false);
	};

	// Listens for all keyboard events. If the Escape key is pressed, the modal closes.
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape' && open) {
				closeModal();
			}
		};
		// Disables Background Scrolling whilst the SideDrawer/Modal is open
		if (typeof window != 'undefined' && window.document) {
			document.body.style.overflow = 'hidden';
		}
		document.addEventListener('keydown', handleKeyDown);
		return () => document.removeEventListener('keydown', handleKeyDown);
	}, [open, closeModal]);

	if (!open) return null;

	return (
		<div className="grid grid__center background">
			<ContentBox setModalOpen={setModalOpen} extraClass="modal">
				{titleContent && (
					<header
						className="modal__header flex bg-ketchup flex__space-between flex__gap-3 
			
		
					flex__align-items"
					>
						{titleContent}
						<Button
							style="simple"
							onClick={closeModal}
							aria="Stäng rutan"
							extraClasses="flex flex__justify-center"
						>
							<IoClose className="modal__icon" />
						</Button>
					</header>
				)}

				<section className="modal__content">{children}</section>
			</ContentBox>
		</div>
	);
};
