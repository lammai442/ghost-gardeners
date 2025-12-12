import { errorHandler } from '../../../middlewares/errorHandler.mjs';
import middy from '@middy/core';
import { getAllMenu } from '../../../services/menu.mjs';
import { sendResponses } from '../../../responses/index.mjs';

export const handler = middy(async () => {
	const menuItems = await getAllMenu();

	if (menuItems) {
		return sendResponses(200, {
			success: true,
			menuItems,
		});
	} else {
		return sendResponses(400, {
			success: false,
			message: 'Could not get all menu',
		});
	}
}).use(errorHandler());

/**
 * Author: ninerino
 * Function to fetch menu items from the API, including stock-based status
 *
 * Modified: StefanMogren
 * Changed so function fetches all products instead of just meals
 *
 * Updated: Lam
 * Changed details to description for menuItem and added Allergenes
 * Moved invoke of getting menu from database to services/menu.mjs and added middy to handler
 */
