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
		// Rad 1. Funktion som lyssnar på tangenter
		const handleKeyDown = (e: KeyboardEvent) => {
			// Rad 2. Om man trycker Escape och modalen är öppen
			if (e.key === 'Escape' && open) {
				closeModal(); // Rad 3. Stäng modalen
			}
		};

		// Rad 4. Om modalen är öppen. Lås scroll
		if (open) {
			document.body.style.overflow = 'hidden';
		}

		// Rad 5. Lägg till keydown-eventlyssnaren
		document.addEventListener('keydown', handleKeyDown);

		// Rad 6. Cleanup körs när open ändras eller komponenten tas bort
		return () => {
			// Rad 7. Ta bort keydown-eventlyssnaren
			document.removeEventListener('keydown', handleKeyDown);

			// Rad 8. Återställ scroll när modalen stängs
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
