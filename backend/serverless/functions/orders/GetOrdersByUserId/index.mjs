import { errorHandler } from '../../../middlewares/errorHandler.mjs';
import middy from '@middy/core';
import { getAllOrdersByUserId } from '../../../services/order.mjs';
import { sendResponses } from '../../../responses/index.mjs';
import httpCors from '@middy/http-cors';
import { getProductsByIds } from '../../../utils/orderHelpers.mjs';

export const handler = middy(async (event) => {
	const userId = event.pathParameters.id;

	const response = await getAllOrdersByUserId(userId);

	if (response) {
		// ChatGPT solution for getting all itemId from all orders and remove duplicates
		const uniqueItemIds = Array.from(
			new Set(
				response.flatMap((order) =>
					order.attribute.items.map((item) => item.id)
				)
			)
		);

		const productMap = await getProductsByIds(uniqueItemIds);
		// Remove all keyname and the object to an array for mealList
		const mealList = Object.values(productMap);

		return sendResponses(200, {
			success: true,
			messages: 'Successfully fetching all orders by userId',
			orders: response,
			mealList: mealList,
		});
	} else {
		return sendResponses(400, {
			success: false,
			message: 'Failed to fetch all orders by userId',
		});
	}
})
	.use(httpCors())
	.use(errorHandler());

/**
 * Author: Lam
 * Lambda-handler to get all orders by userId
 */
