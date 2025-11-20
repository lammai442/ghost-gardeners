/**
 * Author: Lam
 * Cartstore using Zustand to access the cart globally in the project
 * Modified: Lam
 * Added save to localstorage
 */

import { create } from 'zustand';
import type { Meal } from '@mojjen/productdata';

type CartStore = {
	cartCount: number;
	cart: Meal[];
	incrament: (product: Meal) => void;
	decrament: (id: string | undefined) => void;
};

// Solution from ChatGPT to update the count when refreshing the page
const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
const initialCartCount: number = savedCart.reduce(
	(acc: number, item: Meal) => acc + (item.qty ?? 0),
	0
);

export const useCartStore = create<CartStore>((set) => ({
	cartCount: initialCartCount,
	cart: savedCart,
	incrament: (product) =>
		set((state) => {
			const existingInCart = state.cart.find((item) => item.id === product.id);
			let newCart: Meal[];
			if (existingInCart) {
				newCart = state.cart.map((item) =>
					item.id === product.id ? { ...item, qty: (item.qty ?? 0) + 1 } : item
				);
			} else {
				newCart = [...state.cart, { ...product, qty: 1 }];
			}

			// Spara i localStorage
			localStorage.setItem('cart', JSON.stringify(newCart));

			return {
				cart: newCart,
				cartCount: existingInCart ? state.cartCount + 1 : state.cartCount + 1,
			};
		}),
	decrament: (id) =>
		set((state) => {
			let storedCart: Meal[] = JSON.parse(localStorage.getItem('cart') || '[]');

			const existingInCart = storedCart.find((item) => item.id === id);

			// If the product doesnt exist
			if (!existingInCart) return state;

			let updatedCart: Meal[] = [];

			// Remove product if qty becomes 0
			if (existingInCart.qty === 1) {
				updatedCart = storedCart.filter((item) => item.id !== id);
			} else {
				updatedCart = storedCart.map((item) =>
					item.id === id
						? {
								...item,
								qty: (item.qty ?? 0) - 1,
						  }
						: item
				);
			}

			localStorage.setItem('cart', JSON.stringify(updatedCart));

			return {
				cart: updatedCart,
				cartCount: state.cartCount - 1,
			};
		}),
}));

/**
 * Transformerar cart från Zustand till det format som createOrder förväntar sig
 */
export function getItemsForOrder() {
  const { cart } = useCartStore.getState();

  return cart.map(item => ({
    id: item.id,
	price: item.price,
    quantity: item.qty ?? 1,   // qty från store, default 1
    extras: [],                // tom array tills vi lägger till extra-val
    without: [],               // tom array tills vi lägger till without-val
    includeDrink: item.includeDrink ?? null
  }));
}