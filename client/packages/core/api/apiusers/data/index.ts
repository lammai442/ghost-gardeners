import axios from 'axios';

export const apiGetOrdersByUser = async (userId: string | undefined) => {
	const apiUrl: string = import.meta.env.VITE_API_URL;
	try {
		const response = await fetch(
			`https://re7yle0qc7.execute-api.eu-north-1.amazonaws.com/api/order/user/${userId}`
		);

		const data = await response.json();

		return data;
	} catch (error) {
		console.log('Error in apiGetOrdersByUser', error);
	}
	// const response = await axios
	// 	.get(`${apiUrl}/orders/user/${userId}`)
	// 	.then((response) => {
	// 		return {
	// 			success: true,
	// 			data: response.data,
	// 			status: response.status,
	// 		};
	// 	})
	// 	.catch((error) => {
	// 		return {
	// 			success: false,
	// 			data: error.response?.data || { message: error.message },
	// 			status: error.response?.status || 500,
	// 		};
	// 	});

	return response;
};
