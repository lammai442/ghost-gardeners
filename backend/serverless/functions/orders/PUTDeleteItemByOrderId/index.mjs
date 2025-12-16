import middy from '@middy/core';
import { errorHandler } from '../../../middlewares/errorHandler.mjs';
import { sendResponses } from '../../../responses/index.mjs';
import { replaceOrder } from '../../../services/order.mjs';
import httpJsonBodyParser from '@middy/http-json-body-parser';
import { deletedItemsFromOrder } from '../../../utils/orderHelpers.mjs';
import { authenticateUser } from '../../../middlewares/authenticateUser.mjs';

// Function to deleting a specific meal from an order
export const handler = middy(async (event) => {
	// Checking authorization
	const user = event.user;

	if (user.role !== 'ADMIN') {
		return sendResponses(403, {
			success: false,
			message: 'Du har inte behörighet att komma åt dessa orders',
		});
	}

	// Id is referring to orderId
	const { id } = event.pathParameters || {};

	// Checking for if id is in pathParameters
	if (!id) {
		return sendResponses(400, {
			success: false,
			message: 'Order ID saknas i URL.',
		});
	}

	// Checking for the body is send in the req
	if (!event.body) {
		return sendResponses(400, {
			success: false,
			message: 'Request body saknas.',
		});
	}

	// Decomposing itemId from body with is the id for the specific meal
	const { itemId } = event.body;

	// Invoke function for deleting a specific item from the order and get the updated order in return
	const updatedOrder = await deletedItemsFromOrder(id, itemId);

	// Invoke updating the order with the new updated order
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
