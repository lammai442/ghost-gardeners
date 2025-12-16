import type { ReactNode } from 'react';
import './index.scss';
import { useEffect } from 'react';
import { IoClose } from 'react-icons/io5';
import { Button } from '@mojjen/button';
import { ContentBox } from '@mojjen/contentbox';

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

	useEffect(() => {
		// Functions that listens to key stokes.
		const handleKeyDown = (e: KeyboardEvent) => {
			// Closes the modal closes if its open and the user hits Escape.
			if (e.key === 'Escape' && open) {
				closeModal(); // Rad 3. Stäng modalen
			}
		};

		// Locks background scroll when the modal is open.
		if (open) {
			document.body.style.overflow = 'hidden';
		}

		// Adds eventlistener
		document.addEventListener('keydown', handleKeyDown);

		// Cleanup runs when open toggles or when the component is removed.
		return () => {
			// Remove eventlistener
			document.removeEventListener('keydown', handleKeyDown);

			// Reset scroll the the modal closes.
			document.body.style.overflow = 'auto';
		};
	}, [open]);

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
							<IoClose className="modal__icon" style={{ color: '#f3f0e7' }} />
						</Button>
					</header>
				)}

				<section className="modal__content flex flex__column flex__gap-1-5">
					{children}
				</section>
			</ContentBox>
		</div>
	);
};

/**
 * Author: Klara Sköld
 * Created a reusable modal.
 *  * Solution based on this code: https://www.freecodecamp.org/news/create-react-reusable-modal-component/
 */
