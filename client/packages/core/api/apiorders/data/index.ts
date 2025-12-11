import type { Meal } from '@mojjen/productdata';
import axios from 'axios';

type Order = {
	items: Meal[];
	userComment: string;
	staffComment: string;
	userId: string | null;
};

export const apiPostOrder = async (order: Order, token: string) => {
	const apiUrl: string = import.meta.env.VITE_API_URL;
	const response = await axios
		.post(`${apiUrl}/order`, order, {
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
		})
		.then((response) => {
			return {
				success: true,
				data: response.data,
				status: response.status,
			};
		})
		.catch((error) => {
			return {
				success: false,
				data: error.response?.data || { message: error.message },
				status: error.response?.status || 500,
			};
		});

	return response;
};

/**
 * Author: Lam
 * Api fetch for post order
 *
 */
