/**
 * Author: Lam
 * Cartstore using Zustand to access the cart global in the project
 */

import { create } from 'zustand';
import type { Meal } from '@mojjen/productdata';

type CartItem = {
	product: Meal;
	qty: number;
}

type CartStore = {
	cartCount: number;
	cart: CartItem[];
	increase: (product: Meal) => void;
	decrease: (id: string) => void;
};

export const useCartStore = create<CartStore>((set) => ({
	cartCount: 0,
	cart: [],
	increase: (product) =>
		set((state) => {
			const existing = state.cart.find((item) => item.product.id === product.id);
			if(existing) {
				 return {
        cart: state.cart.map((item) =>
          item.product.id === product.id
            ? { ...item, qty: item.qty + 1 }
            : item
        ),
		cartCount: state.cartCount + 1,
      }}),
	decrease: (productId) =>
		set((state) => ({
			cartCount: state.cartCount - 1,
			cart: ,
		})),
}));
