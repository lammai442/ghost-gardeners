import type { ReactNode } from 'react';
import './index.scss';
import clsx from 'clsx';
import type { Meal } from '@mojjen/productdata';
import { ProductCard } from '@mojjen/productcard';
/**
 * Author: Klara Sköld
 * Products list
 *
 */

type Props = {
	prodlist: Meal[];
};

const bgColors: string[] = ['bg-mustard', 'bg-ketchup', 'bg-cucumber'];

export const ProductsList = ({ prodlist }: Props) => {
	return (
		<ul className="grid product-list">
			{prodlist.map((item, index) => {
				// Solution from ChatGTP to give a bgColor to every meal with a pattern
				const classBgColor = bgColors[index % bgColors.length];
				return (
					<ProductCard
						key={item.id}
						item={item}
						classBgColor={classBgColor}
						showQty={true}
						showIncramentBtn={false}
						isFlexColumn={true}
					/>
				);
			})}
		</ul>
	);
};
