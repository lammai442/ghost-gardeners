export type OrderItem = {
	id: string;
	name: string;
	subtotal: number;
	summary: string;
	includeDrink: string | null;
	includeDrinkName: string | null;
	category?: string;
};

export type OrderItems = {
	id: string;
	status: string;
	PK?: string;
	SK?: string;
	statusCategory?: string;
	category?: string;

	attribute: {
		createdAt: string;
		modifiedAt: string;
		total: number;
		user: string;
		userComment: string;
		staffComment: string;
		items: OrderItem[];
	};
};

export interface WebSocketOrder {
	eventName: string;
	timestamp: string;
	type: string;
	order: OrderItems;
}
