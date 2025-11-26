import './index.scss';
import clsx from 'clsx';
import { Meal } from '@mojjen/productdata';
import { Button } from '@mojjen/button';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { useState } from 'react';
import { useOnClickOutside } from 'usehooks-ts';
import { useRef } from 'react';

/**
 * Author: Lam Mai
 * Filtering options section for menu page. Content from Lam.
 *
 */

type Props = {
	extraClasses: string;
	item: Meal;
	onDrinkChange: (item: Meal, id: string) => void;
};

// { item, onDrinkChange }: Props

export const DrinkFilter = ({ extraClasses }: Props) => {
	const ref = useRef<HTMLDivElement | null>(null);
	const [openList, setOpenList] = useState<boolean>(false);
	const [selected, setSelected] = useState<string>(
		'Coca-Cola Original Taste 33 cl'
	);
	const handleSelectBtn = (): void => {
		setOpenList((prev) => !prev);
	};

	const handleSelectItem = (name: string, id: string): void => {
		setSelected(name);
		setOpenList((prev) => !prev);
		// Skickas tillbaka till productCard för att ändra på vald dryck.
		// handleSelectedDrink(item.id)
	};

	useOnClickOutside(ref as React.RefObject<HTMLElement>, () => {
		setOpenList(false);
	});

	// MockupData men ändras så att det fetchas från backend efter category
	const drinks = [
		{
			name: 'Fanta 33 cl',
			id: 'prod-59aed',
		},
		{
			name: 'Coca Cola 33 cl',
			id: 'prod-1214d',
		},
		{
			name: 'Loka 25 cl',
			id: 'prod-5135v',
		},
	];

	return (
		<div className={`drink-filter ${extraClasses}`}>
			<section>
				<h3 className="text-ketchup heading-5">Välj dryck</h3>
				<p className="base-small">Din inkluderande dryck: </p>
			</section>
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
									className="drink-filter__item"
									onClick={() => handleSelectItem(d.name, d.id)}
								>
									{d.name}
								</li>
							);
						})}
					</ul>
				)}
			</div>

			{/* <select onChange={handleSelect} value={''} name="" id="">
				{drinks.map((i) => {
					return <option value={i.id}>{i.name}</option>;
				})}
			</select> */}
		</div>
	);
};
