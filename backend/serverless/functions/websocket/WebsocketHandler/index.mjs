import middy from '@middy/core';
import { errorHandler } from '../../../middlewares/errorHandler.mjs';
import { sendResponses } from '../../../responses/index.mjs';

import connectSocket from '../routes/connectSocket.mjs';
import disconnectSocket from '../routes/disconnectSocket.mjs';
import defaultSocket from '../routes/defaultSocket.mjs';

const routeHandlers = {
	$connect: connectSocket,
	$disconnect: disconnectSocket,
	$default: defaultSocket,
};

export const handler = middy(async (event) => {
	// routeKey is the websocket call made
	// connectionId is the user
	const { routeKey, connectionId } = event.requestContext;

	let body = {};
	// Checks to see if body is valid.
	if (event.body) {
		try {
			body = JSON.parse(event.body);
		} catch (error) {
			console.error('Invalid JSON in request body:', error);

			return sendResponses(400, {
				success: false,
				message: 'Invalid JSON in request body',
				error: error,
			});
		}
	}

	const routeHandler = routeHandlers[routeKey];
	// Check to see if the routeKey is valid.
	if (!routeHandler) {
		console.error(`No handler found for route: ${routeKey}`);
		return sendResponses(400, {
			success: false,
			message: `No handler found for route: ${routeKey}`,
		});
	}

	// Sends the props to the requested route.
	// Check to see whether the route itself returns an error or not.
	try {
		return await routeHandler(connectionId, body, event);
	} catch (error) {
		console.error(`Error in route ${routeKey}`, error);
		return sendResponses(500, {
			success: false,
			message: `Error in route ${routeKey}`,
			error: error,
		});
	}
}).use(errorHandler());

/**
 * Author: StefanMogren
 * Created WebsocketHandler which first checks whether the connection request to the Websocket is valid or not. Then forwards the request.
 * Created with the help of Amazon Q (the built-in AI on AWS)
 *
 */
