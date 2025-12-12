import { create } from 'zustand';
import type { Meal } from '@mojjen/productdata';
import { generateId } from '@mojjen/helpfunctions';

type CartStore = {
	cartCount: number;
	cart: Meal[];
	incrament: (product: Meal) => void;
	decrament: (id: string | undefined) => void;
	emptyCart: () => void;
	deleteCartItem: (id: string | undefined) => void;
	setCartItems: (items: Meal[]) => void;
	updateCartItem: (item: Meal) => void;
};

// Solution from ChatGPT to update the count when refreshing the page
const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
const initialCartCount: number = savedCart.length;

export const useCartStore = create<CartStore>((set) => ({
	cartCount: initialCartCount,
	cart: savedCart,
	incrament: (product: Meal) =>
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
		set(() => {
			const emptyArray: Meal[] = [];

			localStorage.setItem('cart', JSON.stringify(emptyArray));

			return {
				cart: emptyArray,
				cartCount: 0,
			};
		}),
	deleteCartItem: (itemId) =>
		set((state) => {
			const updatedCart: Meal[] = state.cart.filter((i) => i.itemId !== itemId);

			localStorage.setItem('cart', JSON.stringify(updatedCart));

			return {
				cart: updatedCart,
				cartCount: updatedCart.length,
			};
		}),
	setCartItems: (items: Meal[]) => {
		set(() => {
			// Mappa order-items till store-format
			const mappedItems = items.map((item) => ({
				...item,
				subtotal: item.price,
				status: 'cancelled', // sätt status till cancelled när kunden ändrar
			}));

			localStorage.setItem('cart', JSON.stringify(mappedItems));

			return {
				cart: mappedItems,
				cartCount: mappedItems.length,
			};
		});
	},
	updateCartItem: (item: Meal) => {
		set((state) => {
			const updatedCart = state.cart.map((i) =>
				i.itemId === item.itemId ? item : i
			);

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
export function getItemsForOrder(): Meal[] {
	const { cart } = useCartStore.getState();

	return cart.map((item) => ({
		category: item.category,
		itemId: item.itemId,
		id: item.id,
		name: item.name,
		summary: item.summary,
		price: item.price,
		includeDrink: item.includeDrink ?? null,
		includeDrinkName: item.includeDrinkName ?? null,
		subtotal: item.price,
		img: item.img,
		status: item.status,
		description: item.description,
	}));
}

/**
 * Author: Lam
 * Cartstore using Zustand to access the cart globally in the project
 * Update: Lam
 * Added save to localstorage, deleteCartItem
 * Update: ninerino
 * Changed functions to work with changeOrder
 * Update: Lam
 * Added itemId to all items thats added to cart and logic for cartCount
 */
