/**
 * Author: Lam
 * Cartstore using Zustand to access the cart globally in the project
 * Modified: Lam
 * Added save to localstorage
 */

import { create } from 'zustand';
import type { Meal, OrderItem } from '@mojjen/productdata';

type CartStore = {
	cartCount: number;
	cart: OrderItem[];
	incrament: (product: OrderItem) => void;
	decrament: (id: string | undefined) => void;
	emptyCart: () => void;
	setCartItems: (items: OrderItem[]) => void;
};

// Solution from ChatGPT to update the count when refreshing the page
const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
const initialCartCount: number = savedCart.reduce(
	(acc: number, item: OrderItem) => acc + (item.qty ?? 0),
	0
);

export const useCartStore = create<CartStore>((set) => ({
	cartCount: initialCartCount,
	cart: savedCart,
	incrament: (product: OrderItem) =>
		set((state) => {
			const existingInCart = state.cart.find((item) => item.id === product.id);
			let newCart: OrderItem[];
			if (existingInCart) {
				newCart = state.cart.map((item) =>
					item.id === product.id
					? { ...item, qty: (item.qty ?? 0) + 1, subtotal: item.price * ((item.qty ?? 0) + 1) }
					: item
				);
				} else {
				newCart = [...state.cart, { ...product, qty: 1, extras: [], without: [], subtotal: product.price }];
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
			let storedCart: OrderItem[] = JSON.parse(localStorage.getItem('cart') || '[]');

			const existingInCart = storedCart.find((item) => item.id === id);

			// If the product doesnt exist
			if (!existingInCart) return state;

			let updatedCart: OrderItem[] = [];

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
	emptyCart: () =>
		set((state) => {
			const emptyArray: OrderItem[] = [];

			localStorage.setItem('cart', JSON.stringify(emptyArray));

			return {
				cart: emptyArray,
				cartCount: 0,
			};
		}),
	  setCartItems: (items: OrderItem[]) => {
  set(() => {
    // Mappa order-items till store-format
    const mappedItems = items.map((item) => ({
      ...item,
      qty: item.quantity ?? 1,       // qty i store
      subtotal: item.price * (item.quantity ?? 1),
      extras: item.extras || [],
      without: item.without || [],
      status: 'cancelled',           // sätt status till cancelled när kunden ändrar
    }));

    localStorage.setItem('cart', JSON.stringify(mappedItems));

    const totalCount = mappedItems.reduce((acc, i) => acc + (i.qty ?? 1), 0);

    return {
      cart: mappedItems,
      cartCount: totalCount,
    };
  });
}

}));

/**
 * Transformerar cart från Zustand till det format som createOrder förväntar sig
 */
export function getItemsForOrder(): OrderItem[] {
	const { cart } = useCartStore.getState();

	return cart.map((item) => ({
		id: item.id,
		name: item.name,
		summary: item.summary,
		price: item.price,
		quantity: item.qty ?? 1,
		extras: item.extras || [],       // alltid array
		without: item.without || [],     // alltid array
		includeDrink: item.includeDrink ?? null,
		subtotal: item.price * (item.qty ?? 1),
		img: item.img,
		status: item.status
	}));
}
