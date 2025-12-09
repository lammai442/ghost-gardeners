/**
 * Author: Lam
 * Interface for Meal products
 *
 * Modified: StefanMogren
 * Added category to Meal
 *
 * Updated: Lam
 * Added allergenes? and change details to description to Meal
 * Added interface User
 */

export interface Meal {
	category: string;
	id: string;
	name: string;
	summary: string;
	description?: string;
	price: number;
	img: string;
	classBgColor?: string;
	status: string;
	items?: string[];
	includeDrink: string | null;
	itemId?: string;
	includeDrinkName?: string | null;
	subtotal?: number;
	allergenes?: string[] | null;
}

export interface Drink {
	id: string;
	name: string;
	summary: string;
	price: number;
	img: string;
	category: string;
}

export interface Order {
	PK: string;
	SK: string;
	// orderId: string;
	status: string;
	statusCategory: string;
	category: string;
	// total: number;
	// userComment?: string;
	attribute: {
		items: Meal[];
		createdAt: string;
		total: number;
		staffComment: string;
		user: string;
		userComment: string;
		modifiedAt?: string;
	};
	id: string;
}

export interface User {
	firstname?: string;
	lastname?: string;
	phone?: string;
	email: string;
	password?: string;
	token?: string;
	role?: string;
	userId?: string;
}

export interface WebSocketOrder {
	eventName: string;
	timestamp: string;
	type: string;
	order: Order;
}
