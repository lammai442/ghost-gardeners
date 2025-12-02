export type OrderItem = {
	id: string;
	name: string;
	subtotal: number;
	summary: string;
	includeDrink: string | null;
	includeDrinkName: string | null;
};

export type OrderItems = {
	id: string;
	status: string;
	PK?: string;
	SK?: string;
	statusCategory?: string;

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