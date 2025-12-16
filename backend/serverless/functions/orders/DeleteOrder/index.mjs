import middy from '@middy/core';
import { errorHandler } from '../../../middlewares/errorHandler.mjs';
import { sendResponses } from '../../../responses/index.mjs';
import { cancelOrder } from '../../../services/order.mjs';
import { authenticateUser } from '../../../middlewares/authenticateUser.mjs';
import { getOrder } from '../../../services/order.mjs';

// The function doesn't actually delete an order, but only updates the status of it.
export const handler = middy(async (event) => {
	// id is the orderId
	const { id } = event.pathParameters || {};

	if (!id) {
		return sendResponses(400, {
			success: false,
			message: 'Order ID saknas.',
		});
	}

	// Get order
	const order = await getOrder(id);
	if (!order) {
		return sendResponses(404, {
			success: false,
			message: 'Order hittades inte',
		});
	}

	// Checking authorization based on user ID of the token and the user ID of the order
	const user = event.user;
	if (order.id !== user.sub && user.role !== 'ADMIN') {
		return sendResponses(403, {
			success: false,
			message: 'Du har inte behörighet att ändra denna order',
		});
	}

	// Updates order status to "cancelled"
	const updatedOrder = await cancelOrder(id);

	return sendResponses(200, {
		success: true,
		order: updatedOrder,
	});
})
	.use(authenticateUser())
	.use(errorHandler());

/**
 * Author: ninerino
 * Delete order
 */
