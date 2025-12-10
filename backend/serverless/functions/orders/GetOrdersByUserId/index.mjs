import { errorHandler } from '../../../middlewares/errorHandler.mjs';
import middy from '@middy/core';
import { getAllOrdersByUserId } from '../../../services/order.mjs';
import { sendResponses } from '../../../responses/index.mjs';
import httpCors from '@middy/http-cors';
import { getProductsByIds } from '../../../utils/orderHelpers.mjs';
import { authenticateUser } from '../../../middlewares/authenticateUser.mjs';

export const handler = middy(async (event) => {
	const userId = event.pathParameters.id;

	// Checking authorization
	const user = event.user;

	if (user.role !== 'ADMIN' && user.sub !== userId) {
		return sendResponses(403, {
			success: false,
			message: 'Du har inte behörighet att komma åt dessa orders',
		});
	}

	const orders = await getAllOrdersByUserId(userId);

	if (orders) {
		// ChatGPT solution for getting all itemId from all orders and remove duplicates
		const uniqueItemIds = Array.from(
			new Set(
				orders.flatMap((order) => order.attribute.items.map((item) => item.id))
			)
		);

		const productMap = await getProductsByIds(uniqueItemIds);
		// Remove all keyname and the object to an array for mealList
		const mealList = Object.values(productMap);

		return sendResponses(200, {
			success: true,
			messages: 'Successfully fetching all orders by userId',
			orders: orders,
			mealList: mealList,
		});
	} else {
		return sendResponses(400, {
			success: false,
			message: 'Failed to fetch all orders by userId',
		});
	}
})
	.use(authenticateUser())
	.use(httpCors())
	.use(errorHandler());

/**
 * Author: Lam
 * Lambda-handler to get all orders by userId
 * Added authenticateUser for verify JWT
 */
