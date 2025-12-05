import type { User } from '@mojjen/productdata';
import axios from 'axios';

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

/**
 * Author: Lam
 * Api fetch of products using axios
 * Modified by: ninerino
 * Added fetch for delete
 */
