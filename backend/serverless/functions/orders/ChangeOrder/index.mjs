import middy from '@middy/core';
import { errorHandler } from '../../../middlewares/errorHandler.mjs';
import { sendResponses } from '../../../responses/index.mjs';
import { changeOrder } from '../../../services/order.mjs';
import { authenticateUser } from '../../../middlewares/authenticateUser.mjs';
import { getOrder } from '../../../services/order.mjs';

//
export const handler = middy(async (event) => {
	// id is the orderId
	const { id } = event.pathParameters || {};

	if (!id) {
		return sendResponses(400, {
			success: false,
			message: 'Order ID saknas i URL.',
		});
	}

	if (!event.body) {
		return sendResponses(400, {
			success: false,
			message: 'Request body saknas.',
		});
	}

	//
	const {
		items = [],
		userComment = '',
		staffComment = '',
		status,
	} = JSON.parse(event.body);

	// Fetch the order
	const order = await getOrder(id);
	if (!order) {
		return sendResponses(404, {
			success: false,
			message: 'Order hittades inte',
		});
	}

	// Check if it's the correct user based on the user ID of the token and the user ID of the order
	const user = event.user;
	if (user.sub !== order.id && user.role !== 'ADMIN') {
		return sendResponses(403, { success: false, message: 'Forbidden' });
	}

	const updatedOrder = await changeOrder({
		orderId: id,
		items,
		userComment,
		staffComment,
		status,
	});

	return sendResponses(200, {
		success: true,
		order: updatedOrder,
	});
})
	.use(authenticateUser())
	.use(errorHandler());

/**
 * Author: ninerino
 * Function to change order
 *
 * Update: ninerino and Lam
 * Added credentials
 */
