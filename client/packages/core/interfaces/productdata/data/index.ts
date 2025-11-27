/**
 * Author: Lam
 * Interface for Meal products
 *
 * Modified: StefanMogren
 * Added category to Meal
 */

export interface Meal {
	category: string;
	id: string;
	name: string;
	summary: string;
	details?: string;
	price: number;
	img: string;
	classBgColor?: string;
	status: string;
	items?: string[];
	includeDrink: string | null;
	itemId?: string;
	includeDrinkName?: string | null;
	subtotal?: number;
}

export interface Drink {
	id: string;
	name: string;
	summary: string;
	price: number;
	img: string;
	category: string;
}

export interface OrderItem extends Meal {
	itemId: string;
	includeDrink: string | null;
	subtotal: number;
	includeDrinkName?: string | null;
}

export interface Order {
	orderId: string;
	status: string;
	total: number;
	userComment?: string;
	items: OrderItem[];
}
