import { getAllOrdersByStatus } from '../../../services/order.mjs';
import { errorHandler } from '../../../middlewares/errorHandler.mjs';
import { authenticateUser } from '../../../middlewares/authenticateUser.mjs';
import middy from '@middy/core';
import { sendResponses } from '../../../responses/index.mjs';

export const handler = middy(async (event) => {
	// Checking authorization
	const user = event.user;

	if (user.role !== 'ADMIN') {
		return sendResponses(403, {
			success: false,
			message: 'Du har inte behörighet att komma åt dessa orders',
		});
	}

	try {
		const status = event?.pathParameters?.status;

		if (!status) {
			return sendResponses(400, {
				success: false,
				message: 'Missing status parameter',
			});
		}

		const items = await getAllOrdersByStatus(status);

		return sendResponses(200, {
			success: true,
			orders: items,
		});
	} catch (err) {
		console.error('Error in GetOrdersByStatus:', err);
		return sendResponses(400, { success: false, error: err });
	}
})
	.use(authenticateUser())
	.use(errorHandler());

/**
 * Author: ninerino
 * Lambda-handler to get all orders by status
 *
 * Update: Lam
 * Added authenticateUser for verify JWT
 */
