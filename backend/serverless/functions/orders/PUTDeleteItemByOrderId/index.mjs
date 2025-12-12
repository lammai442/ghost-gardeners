import middy from '@middy/core';
import { errorHandler } from '../../../middlewares/errorHandler.mjs';
import { sendResponses } from '../../../responses/index.mjs';
import { replaceOrder } from '../../../services/order.mjs';
import httpJsonBodyParser from '@middy/http-json-body-parser';
import { deletedItemsFromOrder } from '../../../utils/orderHelpers.mjs';
import { authenticateUser } from '../../../middlewares/authenticateUser.mjs';

export const handler = middy(async (event) => {
	// Checking authorization
	const user = event.user;

	if (user.role !== 'ADMIN') {
		return sendResponses(403, {
			success: false,
			message: 'Du har inte behörighet att komma åt dessa orders',
		});
	}

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

	const { itemId } = event.body;

	const updatedOrder = await deletedItemsFromOrder(id, itemId);

	await replaceOrder(updatedOrder);

	return sendResponses(200, {
		success: true,
		updatedOrder,
	});
})
	.use(authenticateUser())
	.use(httpJsonBodyParser())
	.use(errorHandler());

/**
 * Author: Lam
 * Delete item from an order and add deleteItems array in attribute
 * Added authenticateUser for verify JWT
 */
