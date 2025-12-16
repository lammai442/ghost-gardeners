import { getAllOrders } from '../../../services/order.mjs';
import { errorHandler } from '../../../middlewares/errorHandler.mjs';
import { authenticateUser } from '../../../middlewares/authenticateUser.mjs';
import middy from '@middy/core';
import { sendResponses } from '../../../responses/index.mjs';

// GetAllOrders is secured so only ADMIN users are allowed to access it.
export const handler = middy(async (event) => {
	// Checking authorization from the token
	const user = event.user;

	if (user.role !== 'ADMIN') {
		return sendResponses(403, {
			success: false,
			message: 'Du har inte behörighet att komma åt dessa orders',
		});
	}

	try {
		const items = await getAllOrders();

		return sendResponses(200, {
			success: true,
			orders: items,
		});
	} catch (err) {
		console.error('Error in GetAllOrders:', err);
		return sendResponses(400, { success: false, response: null, error: err });
	}
})
	.use(authenticateUser())
	.use(errorHandler());

/**
 * Author: ninerino
 * Lambda-handler to get all orders
 *
 * Update: Lam
 * Added authenticateUser for verify JWT
 */
