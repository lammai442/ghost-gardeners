import middy from '@middy/core';
import { errorHandler } from '../../../middlewares/errorHandler.mjs';
import { sendResponses } from '../../../responses/index.mjs';
import { createOrder } from '../../../services/order.mjs';
import { authenticateUser } from '../../../middlewares/authenticateUser.mjs';

export const handler = middy(async (event) => {
	// Body containing of an object with items containing all products in the order
	const body = JSON.parse(event.body);

	// Checking if thenpayload contains userId
	const user = event.user?.sub || null;

	// Creating new variable to send to function createOrder
	const orderData = {
		...body,
		userId: user,
	};

	// A response is given back with an object of the order
	const order = await createOrder(orderData);

	return sendResponses(201, {
		success: true,
		order,
	});
})
	.use(authenticateUser())
	.use(errorHandler());

/**
 * Author: ninerino
 * Function to post order
 *
 * Updated: Lam / ninerino
 * Added authenticateUser for verify JWT
 */
