import middy from '@middy/core';
import { errorHandler } from '../../../middlewares/errorHandler.mjs';
import { sendResponses } from '../../../responses/index.mjs';
import { createOrder } from '../../../services/order.mjs';
import { authenticateUser } from '../../../middlewares/authenticateUser.mjs';

export const handler = middy(async (event) => {
	const body = JSON.parse(event.body);

	const user = event.user?.sub || null;

	const orderData = {
		...body,
		userId: user,
	};

	const order = await createOrder(orderData);

	return sendResponses(201, {
		success: true,
		order,
	});
})
	.use(authenticateUser())
	.use(errorHandler());

/**
 * Author:
 *
 * Updated: Lam / ninero
 * Added authenticateUser for verify JWT
 */
