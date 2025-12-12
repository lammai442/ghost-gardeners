import './index.scss';
import { Button } from '@mojjen/button';
import clsx from 'clsx';
import { useEffect, useState, useRef } from 'react';
import type { Meal } from '@mojjen/productdata';
import { useCartStore } from '@mojjen/usecartstore';
import { Modal } from '@mojjen/modal';
import { ModalProductCard } from '@mojjen/modalproductcard';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

type Props = {
	allProdList: Meal[];
	prodList: Meal[];
	item: Meal;
	classBgColor: string;
	showQty?: boolean;
	showIncramentBtn?: boolean;
	isFlexColumn?: boolean;
	isCartItem?: boolean;
	showDrinkOpt: boolean;
};

export const ProductCard = ({
	item,
	classBgColor,
	isFlexColumn,
	allProdList,
}: Props) => {
	const { incrament } = useCartStore();
	const { name, img, summary, price, status } = item;
	const [modalOpen, setModalOpen] = useState(false);
	const dotLottieRef = useRef<any>(null);

	const productCardClassNames = clsx('flex product-card', {
		flex__column: isFlexColumn,
		inactive: status === 'inactive',
	});
	const imgClassNames = clsx('product-card__img', {
		inactive: status === 'inactive',
	});

	const handleModal = () => {
		setModalOpen(true);
	};
	// If the modal is open the background is unscrollable.
	useEffect(() => {
		if (modalOpen === false) {
			document.body.style.overflow = 'unset';
		}
	}, [modalOpen, handleModal]);

	return (
		<>
			<Modal
				open={modalOpen}
				titleContent={<h3 className="heading-3 text-light-beige">{name}</h3>}
				setModalOpen={setModalOpen}
			>
				<ModalProductCard
					item={item}
					allProdList={allProdList}
					classBgColor={classBgColor}
					setModalOpen={setModalOpen}
				/>
			</Modal>

			<li className={productCardClassNames}>
				{/* <li className="product-card flex flex__column"> */}
				<section
					// onClick={handleModal}
					className={`product-card__img-box flex ${classBgColor}`}
				>
					<img
						className={imgClassNames}
						src={img}
						alt={name}
						onClick={handleModal}
					/>
					{/* {IncramentBtn ( */}
					<Button
						aria={`Lägg till en ${item.name} i varukorgen`}
						onClick={() => {
							incrament(item);
							dotLottieRef.current?.stop();
							dotLottieRef.current?.play();
						}}
						extraClasses="product-card__add-btn"
						style="black"
						isDisabled={false}
					>
						<span className="heading-5">
							<DotLottieReact
								src="https://lottie.host/240c6042-69b9-4665-b723-f3ad9e4156f3/U859aQ4IPy.lottie"
								autoplay={false}
								className="check-animation"
								dotLottieRefCallback={(dotLottie) => {
									dotLottieRef.current = dotLottie;
								}}
							/>
						</span>
					</Button>
				</section>
				<section className="product-card__info-box info-box flex flex__column text__left">
					<div className="info-box__top flex flex__column">
						<h2 className="heading-5" onClick={handleModal}>
							{name}
						</h2>
						<p className="base-small">{summary}</p>
						<span className="info-box__top--align-self info-box__top--margin-top btn-text flex ">
							{price} kr
						</span>
					</div>
				</section>
			</li>
		</>
	);
};

/**
 * Author: 

 * Update: Klara
 * Added name as alt-text
 */
