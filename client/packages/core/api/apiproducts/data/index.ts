/**
 * Author: Lam
 * Api fetch of products using axios
 */

import axios from 'axios';

export const apiGetMeals = async () => {
	const apiUrl: string = import.meta.env.VITE_API_URL;

	const response = await axios
		.get(`${apiUrl}menu`)
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
