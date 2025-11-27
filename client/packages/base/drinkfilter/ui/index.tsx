// import './index.scss';
// import type { Meal, Drink } from '@mojjen/productdata';
// import { MdKeyboardArrowDown } from 'react-icons/md';
// import { useState } from 'react';
// import { useOnClickOutside } from 'usehooks-ts';
// import { useRef } from 'react';

// /**
//  * Author: Lam Mai
//  * Filtering options section for menu page. Content from Lam.
//  *
//  */

// type Props = {
// 	extraClasses?: string;
// 	item: Meal;
// 	// onDrinkChange: (item: Meal, id: string) => void;
// };

// export const DrinkFilter = ({ extraClasses, item }: Props) => {
// 	const ref = useRef<HTMLDivElement | null>(null);
// 	const [openList, setOpenList] = useState<boolean>(false);
// 	const [drinks, SetDrinks] = useState<Drink[]>([]);
// 	const [selected, setSelected] = useState<string | null | undefined>(
// 		item.includeDrink
// 	);

// 	const handleSelectBtn = (): void => {
// 		setOpenList((prev) => !prev);
// 	};

// 	// useEffect(() => {
// 	// 	const findDrink = drinksData.find((d) => d.id === item.includeDrink);
// 	// 	const findDrinkName = findDrink ? findDrink.name : '';
// 	// 	setSelected(findDrinkName);
// 	// 	SetDrinks([drinksData]);
// 	// }, []);

// 	const handleSelectItem = (name: string, id: string): void => {
// 		setSelected(name);
// 		setOpenList((prev) => !prev);

// 		// updateCartItem(updatedItem);
// 	};

// 	useOnClickOutside(ref as React.RefObject<HTMLElement>, () => {
// 		setOpenList(false);
// 	});

// 	return (
// 		<div className={`drink-filter ${extraClasses}`}>
// 			<section>
// 				<h3 className="text-ketchup heading-5">Välj dryck</h3>
// 				<p className="base-small">Din inkluderande dryck: </p>
// 			</section>
// 			<div ref={ref}>
// 				<button
// 					aria-label="Button for choice of drinks"
// 					onClick={handleSelectBtn}
// 					className="btn-base drink-filter__btn text-black"
// 				>
// 					<span className="base truncate">{selected}</span>
// 					<MdKeyboardArrowDown />
// 				</button>
// 				{openList && (
// 					<ul className="drink-filter__list">
// 						{drinks.map((d) => {
// 							return (
// 								<li
// 									key={d.id}
// 									className="drink-filter__item"
// 									onClick={() => handleSelectItem(d.name, d.id)}
// 								>
// 									{d.name}
// 								</li>
// 							);
// 						})}
// 					</ul>
// 				)}
// 			</div>
// 		</div>
// 	);
// };
