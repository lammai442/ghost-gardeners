/**
 * Author: Lam
 * Menupage that display the menu of Mojjens meals.
 */

import './index.scss';
import { ProductCard } from '@mojjen/productcard';

export const MenuPage = () => {
	return (
		<>
			<h1>MenuPage</h1>
			<main className="main">
				<section className="product-list">
					<ProductCard />
					<ProductCard />
					<ProductCard />
					<ProductCard />
				</section>
			</main>
		</>
	);
};
