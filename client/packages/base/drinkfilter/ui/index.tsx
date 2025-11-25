import './index.scss';
import clsx from 'clsx';
import { Meal } from '@mojjen/productdata';
import { Button } from '@mojjen/button';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { useState } from 'react';
/**
 * Author: Lam Mai
 * Filtering options section for menu page. Content from Lam.
 *
 */

type Props = {
	item: Meal;
	onDrinkChange: (item: Meal, id: string) => void;
};

// { item, onDrinkChange }: Props

export const DrinkFilter = () => {
	const [openList, setOpenList] = useState<boolean>(false);
	const [];
	const handleSelect = () => {
		setOpenList(true);

		// onDrinkChange(item.id, e.target.value);
	};

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
		<div className="drink-filter">
			<section>
				<h3 className="text-ketchup heading-5">Välj dryck</h3>
				<p className="base-small">Din inkluderande dryck: </p>
			</section>
			<Button
				aria={'Button for choose drinks'}
				onClick={handleSelect}
				extraClasses="drink-filter__btn text-black"
			>
				<div className="drink-filter__content">
					<span>{drinks[0].name}</span>
					<MdKeyboardArrowDown />
				</div>
			</Button>

			{/* <select onChange={handleSelect} value={''} name="" id="">
				{drinks.map((i) => {
					return <option value={i.id}>{i.name}</option>;
				})}
			</select> */}
		</div>
	);
};
