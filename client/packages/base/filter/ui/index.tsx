import './index.scss';
import { Button } from '@mojjen/button';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { CiFilter } from 'react-icons/ci';

/**
 * Author: Lam Mai
 * Filtering options section for menu page. Content from Lam.
 *
 */

export const Filter = () => {
	const handleClick = () => {
		console.log('handleClick(), filter button');
	};

	return (
		<div className="filter">
			<Button
				aria="Filtrera menyn"
				onClick={handleClick}
				extraClasses="menu__button"
				style="outlined"
			>
				<CiFilter className="filter__icon" />
				<span>Filter</span>
				<MdKeyboardArrowDown className="filter__icon" />
			</Button>
		</div>
	);
};
