/**
 * Author: Lam
 * Cartstore using Zustand to access the cart globally in the project
 * Modified: Lam
 * Added save to localstorage, deleteCartItem
 * Modified: ninerino
 * Changed functions to work with changeOrder
 * Modified: Lam
 * Added itemId to all items thats added to cart and logic for cartCount
 */

import { create } from 'zustand';
import type { Meal, Order, OrderItem } from '@mojjen/productdata';
import { generateId } from '../../../utils/helpfunctions';

type CartStore = {
	cartCount: number;
	cart: OrderItem[];
	incrament: (product: OrderItem) => void;
	decrament: (id: string | undefined) => void;
	emptyCart: () => void;
	deleteCartItem: (id: string | undefined) => void;
	setCartItems: (items: OrderItem[]) => void;
};

// Solution from ChatGPT to update the count when refreshing the page
const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
const initialCartCount: number = savedCart.length;

export const useCartStore = create<CartStore>((set) => ({
	cartCount: initialCartCount,
	cart: savedCart,
	incrament: (product: OrderItem) =>
		set((state) => {
			const productWithItemId = { ...product, itemId: generateId() };

			const updatedCart = [...state.cart, productWithItemId];
			localStorage.setItem('cart', JSON.stringify(updatedCart));

			return {
				cart: updatedCart,
				cartCount: updatedCart.length,
			};
		}),
	decrament: (itemId) =>
		set((state) => {
			const updatedCart = state.cart.filter((item) => item.itemId !== itemId);

			localStorage.setItem('cart', JSON.stringify(updatedCart));

			return {
				cart: updatedCart,
				cartCount: updatedCart.length,
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
	deleteCartItem: (itemId) =>
		set((state) => {
			const updatedCart: OrderItem[] = state.cart.filter(
				(i) => i.itemId !== itemId
			);

			localStorage.setItem('cart', JSON.stringify(updatedCart));

			return {
				cart: updatedCart,
				cartCount: updatedCart.length,
			};
		}),
	setCartItems: (items: OrderItem[]) => {
		set(() => {
			// Mappa order-items till store-format
			const mappedItems = items.map((item) => ({
				...item,
				qty: item.quantity ?? 1, // qty i store
				subtotal: item.price * (item.quantity ?? 1),
				extras: item.extras || [],
				without: item.without || [],
				status: 'cancelled', // sätt status till cancelled när kunden ändrar
			}));

			localStorage.setItem('cart', JSON.stringify(mappedItems));

			const totalCount = mappedItems.reduce((acc, i) => acc + (i.qty ?? 1), 0);

			return {
				cart: mappedItems,
				cartCount: totalCount,
			};
		});
	},
	updateCartItem: (item: OrderItem) => {
		set((state) => {
			const updatedCart = state.cart.map((i) => (i.id === item.id ? item : i));

			localStorage.setItem('cart', JSON.stringify(updatedCart));

			return {
				cart: updatedCart,
				cartCount: updatedCart.length,
			};
		});
	},
}));

/**
 * Transformerar cart från Zustand till det format som createOrder förväntar sig
 */
export function getItemsForOrder(): OrderItem[] {
	const { cart } = useCartStore.getState();

	return cart.map((item) => ({
		itemId: item.itemId,
		id: item.id,
		name: item.name,
		summary: item.summary,
		price: item.price,
		quantity: item.qty ?? 1,
		extras: item.extras || [], // alltid array
		without: item.without || [], // alltid array
		includeDrink: item.includeDrink ?? null,
		subtotal: item.price * (item.qty ?? 1),
		img: item.img,
		status: item.status,
	}));
}

// ! Gammal kod
// /**
//  * Author: Lam
//  * Cartstore using Zustand to access the cart globally in the project
//  * Modified: Lam
//  * Added save to localstorage, deleteCartItem
//  * Modified: ninerino
//  * Changed functions to work with changeOrder
//  */

// import { create } from 'zustand';
// import type { Meal, OrderItem } from '@mojjen/productdata';

// type CartStore = {
// 	cartCount: number;
// 	cart: OrderItem[];
// 	incrament: (product: OrderItem) => void;
// 	decrament: (id: string | undefined) => void;
// 	emptyCart: () => void;
// 	deleteCartItem: (id: string | undefined) => void;
// 	setCartItems: (items: OrderItem[]) => void;
// };

// // Solution from ChatGPT to update the count when refreshing the page
// const savedCart: OrderItem[] = JSON.parse(localStorage.getItem('cart') || '[]');
// const initialCartCount: number = savedCart.reduce(
// 	(acc: number, item: OrderItem) => acc + (item.qty ?? 0),
// 	0
// );

// export const useCartStore = create<CartStore>((set) => ({
// 	cartCount: initialCartCount,
// 	cart: savedCart,
// 	incrament: (product: OrderItem) =>
// 		set((state) => {
// 			// const existingInCart = state.cart.find((item) => item.id === product.id);
// 			// let newCart: OrderItem[];

// 			// const updatedCart = { ...state.cart, product };

// 			// const updatedCart: OrderItem[] = [
// 			// 	...state.cart,
// 			// 	{
// 			// 		...product,
// 			// 		qty: product.qty ?? 1, // Om qty inte finns, sätt till 1
// 			// 		subtotal: product.price * (product.qty ?? 1),
// 			// 		extras: product.extras || [],
// 			// 		without: product.without || [],
// 			// 		status: product.status || 'active',
// 			// 	},
// 			// ];
// 			console.log('product från increment()', product);
// 			const updatedCart = [...state.cart, product];

// 			// ! Skip this part
// 			// if (existingInCart) {
// 			// 	newCart = state.cart.map((item) =>
// 			// 		item.id === product.id
// 			// 		? { ...item, qty: (item.qty ?? 0) + 1, subtotal: item.price * ((item.qty ?? 0) + 1) }
// 			// 		: item
// 			// 	);
// 			// 	} else {
// 			// 	newCart = [...state.cart, { ...product, qty: 1, extras: [], without: [], subtotal: product.price }];
// 			// 	}

// 			// Spara i localStorage
// 			localStorage.setItem('cart', JSON.stringify(updatedCart));
// 			// localStorage.setItem('cart', JSON.stringify(newCart));

// 			return {
// 				cart: updatedCart,
// 				// cart: newCart,
// 				// cartCount: existingInCart ? state.cartCount + 1 : state.cartCount + 1,
// 				cartCount: updatedCart.length ? updatedCart.length : 0,
// 			};
// 		}),

// 	decrament: (id) =>
// 		set((state) => {
// 			let storedCart: OrderItem[] = JSON.parse(
// 				localStorage.getItem('cart') || '[]'
// 			);

// 			const existingInCart = storedCart.find((item) => item.id === id);

// 			// If the product doesnt exist
// 			if (!existingInCart) return state;

// 			let updatedCart: OrderItem[] = [];

// 			// Remove product if qty becomes 0
// 			if (existingInCart.qty === 1) {
// 				updatedCart = storedCart.filter((item) => item.id !== id);
// 			} else {
// 				updatedCart = storedCart.map((item) =>
// 					item.id === id
// 						? {
// 								...item,
// 								qty: (item.qty ?? 0) - 1,
// 						  }
// 						: item
// 				);
// 			}

// 			localStorage.setItem('cart', JSON.stringify(updatedCart));

// 			return {
// 				cart: updatedCart,
// 				cartCount: state.cartCount - 1,
// 			};
// 		}),

// 	emptyCart: () =>
// 		set((state) => {
// 			const emptyArray: OrderItem[] = [];

// 			localStorage.setItem('cart', JSON.stringify(emptyArray));

// 			return {
// 				cart: emptyArray,
// 				cartCount: 0,
// 			};
// 		}),

// 	deleteCartItem: (id) =>
// 		set((state) => {
// 			const updatedCart: OrderItem[] = state.cart.filter((i) => i.id !== id);

// 			const cartCountNbr: number = updatedCart.reduce(
// 				(acc, item) => acc + (item.qty ?? 0),
// 				0
// 			);

// 			return {
// 				cart: updatedCart,
// 				cartCount: cartCountNbr,
// 			};
// 		}),

// 	setCartItems: (items: OrderItem[]) => {
// 		set(() => {
// 			// Mappa order-items till store-format
// 			const mappedItems = items.map((item) => ({
// 				...item,
// 				qty: item.quantity ?? 1, // qty i store
// 				subtotal: item.price * (item.quantity ?? 1),
// 				extras: item.extras || [],
// 				without: item.without || [],
// 				status: 'cancelled', // sätt status till cancelled när kunden ändrar
// 			}));

// 			localStorage.setItem('cart', JSON.stringify(mappedItems));

// 			const totalCount = mappedItems.reduce((acc, i) => acc + (i.qty ?? 1), 0);

// 			return {
// 				cart: mappedItems,
// 				cartCount: totalCount,
// 			};
// 		});
// 	},
// }));

// /**
//  * Transformerar cart från Zustand till det format som createOrder förväntar sig
//  */
// export function getItemsForOrder(): OrderItem[] {
// 	const { cart } = useCartStore.getState();

// 	return cart.map((item) => ({
// 		id: item.id,
// 		name: item.name,
// 		summary: item.summary,
// 		price: item.price,
// 		quantity: item.qty ?? 1,
// 		extras: item.extras || [], // alltid array
// 		without: item.without || [], // alltid array
// 		includeDrink: item.includeDrink ?? null,
// 		subtotal: item.price * (item.qty ?? 1),
// 		img: item.img,
// 		status: item.status,
// 	}));
// }
