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
	cancelFn?: () => void;
	primaryFn?: () => void;
	secondaryFn?: () => void;
	setModalOpen: (arg0: boolean) => void;
	titleContent?: React.ReactNode;
	className?: string;
	children?: ReactNode;
};

export const Modal = ({
	open,
	cancelFn,

	titleContent,
	children,
	setModalOpen,
}: Props) => {
	// Listens for all keyboard events. If the Escape key is pressed, the modal closes.
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape' && open) {
				if (cancelFn) {
					cancelFn();
				}
			}
		};
		// Disables Background Scrolling whilst the SideDrawer/Modal is open
		if (typeof window != 'undefined' && window.document) {
			document.body.style.overflow = 'hidden';
		}
		document.addEventListener('keydown', handleKeyDown);
		return () => document.removeEventListener('keydown', handleKeyDown);
	}, [open, cancelFn]);

	if (!open) return null;

	// Unsets Background Scrolling to use when SideDrawer/Modal is closed
	// https://medium.com/@nikhil_gupta/how-to-disable-background-scroll-when-a-modal-side-drawer-is-open-in-react-js-999653a8eebb
	const closeModal = () => {
		// cancelFn;
		setModalOpen(false);
	};

	return (
		<div className="modalBackground grid grid__center">
			<ContentBox setModalOpen={setModalOpen} extraClass="modal2 ">
				{titleContent && (
					<header className="modal__header flex bg-ketchup flex__space-between flex__align-items">
						{titleContent}
						<Button style="simple" onClick={closeModal} aria="Stäng rutan">
							<IoClose style={{ strokeWidth: '1.25rem' }} />
						</Button>
					</header>
				)}

				<section className="modal__content">{children}</section>
			</ContentBox>
		</div>
	);
};
