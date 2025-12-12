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
	SK: string;
	orderId: string;
	status: string;
	total: number;
	userComment?: string;
	attribute: {
		items: Meal[];
		createdAt: string;
		total: number;
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
	order: {
		PK: string;
		SK: string;
		attribute: {
			createdAt: string;
			items: string[];
			modifiedAt: string;
			staffComment: string;
			total: number;
			user: string;
			userComment: string;
		};
		category: string;
		id: string;
		status: string;
		statusCategory: string;
		timestamp: string;
	};
}

/**
 * Author: Lam
 * Interface for Meal products
 *
 * Update: StefanMogren
 * Added category to Meal
 *
 * Update: Lam
 * Added allergenes? and change details to description to Meal
 * Added interface User
 */
