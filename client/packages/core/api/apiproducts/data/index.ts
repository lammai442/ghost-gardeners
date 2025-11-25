/**
 * Author: Lam
 * Api fetch of products using axios
 * Modified by: ninerino
 * Added fetch for delete
 */

import axios from 'axios';

export const apiGetMeals = async () => {
	const apiUrl: string = import.meta.env.VITE_API_URL;

	const response = await axios
		.get(`${apiUrl}/menu`)
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

export async function cancelOrder(orderId: string) {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/order/${orderId}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Kunde inte avbryta order.");
  }

  return res.json();
}