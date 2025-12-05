import './index.scss';
import type { Meal, Drink } from '@mojjen/productdata';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import { useOnClickOutside } from 'usehooks-ts';
import { useRef, useEffect } from 'react';
import type { OrderItem } from '@mojjen/orderitems';

/**
 * Author: Lam Mai
 * Filtering options section for menu page. Content from Lam.
 *
 */

type Props = {
	extraClasses?: string;
	item:
		| Meal
		| OrderItem;
	allProdList: Meal[];
	setCurrentItem: Dispatch<SetStateAction<Meal | OrderItem>>;
};

export const DrinkFilter = ({
	extraClasses,
	item,
	allProdList,
	setCurrentItem,
}: Props) => {
	const ref = useRef<HTMLDivElement | null>(null);
	const [openList, setOpenList] = useState<boolean>(false);
	const [drinks, SetDrinks] = useState<Drink[]>([]);
	const [selected, setSelected] = useState<string | null | undefined>(
		item.includeDrink
	);

	const handleSelectBtn = (): void => {
		setOpenList((prev) => !prev);
	};

	// Set the drinkList in the beginning and display the right name to the prodId
	useEffect(() => {
		let drinkList: Meal[] = [];

		allProdList.forEach((prodItem) => {
			if (prodItem.category === 'DRINK') drinkList.push(prodItem);
		});

		// const findDrink = drinkList.find((d) => d.id === item.includeDrink);
		// const findDrinkName = findDrink ? findDrink.name : '';
		setSelected(item.includeDrinkName);
		SetDrinks(drinkList);
	}, []);

	// If user choose other drink the name will change in the filter choice.
	// Send back the new prodId for the drinkt to modalProductCard
	const handleSelectItem = (name: string, id: string): void => {
		setSelected(name);
		setOpenList((prev) => !prev);
		let updatedItem = item;
		updatedItem.includeDrink = id;
		updatedItem.includeDrinkName = name;
		setCurrentItem(updatedItem);
	};

	useOnClickOutside(ref as React.RefObject<HTMLElement>, () => {
		setOpenList(false);
	});

	return (
		<div className={`drink-filter ${extraClasses}`}>
			<div ref={ref}>
				<button
					aria-label="Button for choice of drinks"
					onClick={handleSelectBtn}
					className="btn-base drink-filter__btn text-black"
				>
					<span className="base truncate">{selected}</span>
					<MdKeyboardArrowDown />
				</button>
				{openList && (
					<ul className="drink-filter__list">
						{drinks.map((d) => {
							return (
								<li
									key={d.id}
									className="drink-filter__item base"
									onClick={() => handleSelectItem(d.name, d.id)}
								>
									{d.name}
								</li>
							);
						})}
					</ul>
				)}
			</div>
		</div>
	);
};
