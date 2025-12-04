// import axios from 'axios';

export const apiGetOrdersByUser = async (userId: string | undefined) => {
	const apiUrl: string = import.meta.env.VITE_API_URL;

	try {
		const response = await fetch(`${apiUrl}/order/user/${userId}`);

		const data = await response.json();

		return data;
	} catch (error) {
		console.log('Error in apiGetOrdersByUser', error);
	}
};
