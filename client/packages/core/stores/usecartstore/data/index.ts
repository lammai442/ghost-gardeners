/**
 * Author: Lam
 * Cartstore using Zustand to access the cart global in the project
 */

import { create } from 'zustand';
import type { Meal } from '@mojjen/productdata';

type CartItem = {
	product: Meal;
	qty: number;
};

type CartStore = {
	cartCount: number;
	cart: CartItem[];
	increase: (product: Meal) => void;
	// decrease: (id: string) => void;
};

export const useCartStore = create<CartStore>((set) => ({
	cartCount: 0,
	cart: [],
	increase: (product) =>
		set((state) => {
			const existingInCart = state.cart.find(
				(item) => item.product.id === product.id
			);

			if (existingInCart) {
				return {
					cart: state.cart.map((item) =>
						item.product.id === product.id
							? { ...item, qty: item.qty + 1 }
							: item
					),
					cartCount: state.cartCount + 1,
				};
			}

			// If product doesnt exist
			return {
				cart: [...state.cart, { product, qty: 1 }],
				cartCount: state.cartCount + 1,
			};
		}),
}));
