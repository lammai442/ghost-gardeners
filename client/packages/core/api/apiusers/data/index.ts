// import axios from 'axios';

export const apiGetOrdersByUser = async (
	userId: string | undefined,
	token: string | undefined
) => {
	const apiUrl: string = import.meta.env.VITE_API_URL;
	console.log('här');

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
				Authorization: token,
				'Content-Type': 'application/json',
			},
		});

		const data = await response.json();

		return data;
	} catch (error) {
		console.log('Error in apiGetOrdersByUser', error);
	}
};
