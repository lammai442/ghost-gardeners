import middy from '@middy/core';
import { errorHandler } from '../../../middlewares/errorHandler.mjs';
import { sendResponses } from '../../../responses/index.mjs';
import { getOrder } from '../../../services/order.mjs';
import { authenticateUser } from '../../../middlewares/authenticateUser.mjs';

export const handler = middy(async (event) => {
	const { id } = event.pathParameters || {};

	if (!id) {
		return sendResponses(400, { success: false, message: 'Order ID saknas.' });
	}

	const order = await getOrder(id);

	const user = event.user;
	if (order.userId !== user.sub && user.role !== 'ADMIN') {
		return sendResponses(403, {
			success: false,
			message: 'Du har inte behörighet att se denna order',
		});
	}

	return sendResponses(200, { success: true, order });
})
	.use(authenticateUser())
	.use(errorHandler());
