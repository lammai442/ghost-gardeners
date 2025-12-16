import type { User } from '@mojjen/productdata';
import axios from 'axios';

// Fetches all meals
export const apiGetMeals = async () => {
	const apiUrl: string = import.meta.env.VITE_API_URL;
	const response = await axios
		.get(`${apiUrl}/menu`)
		.then((response) => {
			return {
				success: true,
				data: response.data.menuItems,
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

// Cancels an order by setting its status to 'cancelled'
export async function cancelOrder(orderId: string, token: string | undefined) {
	const apiUrl: string = import.meta.env.VITE_API_URL;
	const response = await axios
		.delete(`${apiUrl}/order/${orderId}`, {
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
}

// Registers a new user
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

// Logs in a user
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

// Fetches user info based on token
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

/**
 * Author: Lam
 * Api fetch of products using axios
 * Update: ninerino
 * Added fetch for delete
 */
