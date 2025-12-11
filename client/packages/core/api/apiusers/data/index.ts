import type { UpdatedUser } from '@mojjen/productdata';
import axios from 'axios';

export const apiGetOrdersByUser = async (
	userId: string | undefined,
	token: string | undefined
) => {
	const apiUrl: string = import.meta.env.VITE_API_URL;

	if (!userId || !token) {
		return {
			success: false,
			data: null,
			status: 400,
			message: 'User ID eller token saknas',
		};
	}

	try {
		const response = await fetch(`${apiUrl}/order/user/${userId}`, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
		});

		const data = await response.json();

		return data;
	} catch (error) {
		console.log('Error in apiGetOrdersByUser', error);
	}
};

export const apiGetUserById = async (
	userId: string | undefined,
	token: string | undefined
) => {
	const apiUrl: string = import.meta.env.VITE_API_URL;

	const response = await axios
		.get(`${apiUrl}/auth/me/${userId}`, {
			headers: {
				// Authorization: token,
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

export const apiUpdateUser = async (
	userId: string | undefined,
	updatedUser: UpdatedUser,
	token: string | undefined
) => {
	const apiUrl: string = import.meta.env.VITE_API_URL;
	const response = await axios
		.patch(`${apiUrl}/auth/update/${userId}`, updatedUser, {
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
