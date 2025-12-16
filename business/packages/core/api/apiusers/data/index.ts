import type { User } from '@mojjen/productdata';
import axios from 'axios';

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

// API-call to get user by id
export const apiGetUserById = async (
	userId: string | undefined,
	token: string | undefined
) => {
	const apiUrl: string = import.meta.env.VITE_API_URL;

	const response = await axios
		.get(`${apiUrl}/auth/me/${userId}`, {
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
		})
		.then((response) => {
			return response;
		})
		.catch((error) => {
			return error.response.data.message;
		});
	return response;
};

// API-call to get user by token
export async function apiGetUserByToken(token: string | undefined) {
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
