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

// 'cartCount' contains the number of items in the cart
// 'cart' contains the meal objects
export const useCartStore = create<CartStore>((set) => ({
	cartCount: initialCartCount,
	cart: savedCart,

	// incrament increases the number in 'cartCount'
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

	// decrament decreases the number in 'cartCount'
	decrament: (itemId) =>
		set((state) => {
			const updatedCart = state.cart.filter((item) => item.itemId !== itemId);

			localStorage.setItem('cart', JSON.stringify(updatedCart));

			return {
				cart: updatedCart,
				cartCount: updatedCart.length,
			};
		}),

	// emptyCart empties 'cart' and sets 'cartCount' to 0
	emptyCart: () =>
		set(() => {
			const emptyArray: Meal[] = [];

			localStorage.setItem('cart', JSON.stringify(emptyArray));

			return {
				cart: emptyArray,
				cartCount: 0,
			};
		}),

	// deleteCartItem removes a selected item from 'cart'
	deleteCartItem: (itemId) =>
		set((state) => {
			const updatedCart: Meal[] = state.cart.filter((i) => i.itemId !== itemId);

			localStorage.setItem('cart', JSON.stringify(updatedCart));

			return {
				cart: updatedCart,
				cartCount: updatedCart.length,
			};
		}),

	// setCartItems is an old (almost) unused code which sets the status of a meal to 'cancelled'
	// It was originally meant to be used whenever a meal was missing ingredients and thus couldn't be offered to customers
	setCartItems: (items: Meal[]) => {
		set(() => {
			// Map order-items till store-format
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

	// updateCartItem adds a meal to 'cart'
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
