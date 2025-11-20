/**
 * Author: Lam
 * Cartstore using Zustand to access the cart globally in the project
 */

import { create } from 'zustand';
import type { Meal } from '@mojjen/productdata';

type CartStore = {
	cartCount: number;
	cart: Meal[];
	incrament: (product: Meal) => void;
	decrament: (id: string | undefined) => void;
};

export const useCartStore = create<CartStore>((set) => ({
	cartCount: 0,
	cart: [],
	incrament: (product) =>
		set((state) => {
			const existingInCart = state.cart.find((item) => item.id === product.id);

			if (existingInCart) {
				return {
					cart: state.cart.map((item) =>
						item.id === product.id
							? { ...item, qty: (item.qty ?? 0) + 1 }
							: item
					),
					cartCount: state.cartCount + 1,
				};
			}

			// Add to cart if product doesnt exist
			return {
				cart: [...state.cart, { ...product, qty: 1 }],
				cartCount: state.cartCount + 1,
			};
		}),
	decrament: (id) =>
		set((state) => {
			const existingInCart = state.cart.find((item) => item.id === id);

			// If the product doesnt exist
			if (!existingInCart) return state;

			// Remove product if qty becomes 0
			if (existingInCart.qty === 1) {
				return {
					cart: state.cart.filter((item) => item.id !== id),
					cartCount: state.cartCount - 1,
				};
			}

			return {
				cart: state.cart.map((item) =>
					item.id === id ? { ...item, qty: (item.qty ?? 0) - 1 } : item
				),
				cartCount: state.cartCount - 1,
			};
		}),
}));
