// import axios from 'axios';

export const apiGetOrdersByUser = async (userId: string | undefined) => {
	// const apiUrl: string = import.meta.env.VITE_API_URL;

	try {
		const response = await fetch(
			`https://re7yle0qc7.execute-api.eu-north-1.amazonaws.com/api/order/user/${userId}`
		);

		const data = await response.json();

		return data;
	} catch (error) {
		console.log('Error in apiGetOrdersByUser', error);
	}
};
