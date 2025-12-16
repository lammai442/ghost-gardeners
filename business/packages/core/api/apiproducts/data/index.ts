import type { User } from '@mojjen/productdata';
import axios from 'axios';

// API-call to fetch all meals
export const apiGetMeals = async () => {
	const apiUrl: string = import.meta.env.VITE_API_URL;

	const response = await axios
		.get(`${apiUrl}/menu`)
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

// API-call to cancel an order
export async function cancelOrder(orderId: string) {
	const token = localStorage.getItem('token');
	const res = await fetch(`${import.meta.env.VITE_API_URL}/order/${orderId}`, {
		method: 'DELETE',
		headers: {
			Authorization: `${token}`,
			'Content-Type': 'application/json',
		},
	});

	if (!res.ok) {
		throw new Error('Kunde inte avbryta order.');
	}

	return res.json();
}

// API-call to register a user
export async function apiRegisterUser(user: User) {
	const apiUrl: string = import.meta.env.VITE_API_URL;

	try {
		const response = await axios.post(`${apiUrl}/auth/register`, user);
		return {
			success: true,
			data: response.data,
			status: response.status,
		};
	} catch (error: any) {
		return {
			success: false,
			data: error.response?.data || { message: error.message },
			status: error.response?.status || 500,
		};
	}
}

// API-call to fetch user by token
export async function apiGetUserByToken(token: string) {
	const apiUrl: string = import.meta.env.VITE_API_URL;

	try {
		const response = await axios.get(`${apiUrl}/auth/me`, {
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
		});
		return {
			success: true,
			data: response.data,
			status: response.status,
		};
	} catch (error: any) {
		return {
			success: false,
			data: error.response?.data || { message: error.message },
			status: error.response?.status || 500,
		};
	}
}

// API-call to login a user
export async function apiLoginUser(user: User) {
	const apiUrl: string = import.meta.env.VITE_API_URL;

	try {
		const response = await axios.post(`${apiUrl}/auth/login`, user);
		return {
			success: true,
			data: response.data,
			status: response.status,
		};
	} catch (error: any) {
		return {
			success: false,
			data: error.response?.data || { message: error.message },
			status: error.response?.status || 500,
		};
	}
}

// API-call to delete an item from an order
export async function apiDeletItemFromOrder(
	orderId: string | undefined,
	itemId: string
) {
	const apiUrl: string = import.meta.env.VITE_API_URL;
	const userFromLocal = JSON.parse(localStorage.getItem('user') || '{}');

	try {
		const response = await axios.put(
			`${apiUrl}/orders/deleteitem/${orderId}`,
			{
				itemId: itemId,
			},
			{
				headers: {
					Authorization: `Bearer ${userFromLocal.token}`,
					'Content-Type': 'application/json',
				},
			}
		);
		return {
			success: true,
			updatedOrder: response.data.updatedOrder,
			status: response.status,
		};
	} catch (error: any) {
		return {
			success: false,
			message: error.message,
			status: error.response?.status || 500,
		};
	}
}

/**
 * Author: Lam
 * Api fetch of products using axios
 *
 * Update: ninerino
 * Added fetch for delete
 *
 * Update: Lam
 * Added apiDeletItemFromOrder for delete an item from an order
 */
