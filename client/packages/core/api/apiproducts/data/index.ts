/**
 * Author: Lam
 * Api fetch of products using axios
 */

import axios from 'axios';

export const apiGetMeals = async () => {
	const response = await axios
		.get('https://re7yle0qc7.execute-api.eu-north-1.amazonaws.com/api/menu ')
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
