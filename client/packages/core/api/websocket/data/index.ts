// import type { User } from '@mojjen/productdata';
// import axios from 'axios';

type OrderProp = {
	order: string;
};

export const connectWebSocket = (onDataReceived?: (data: any) => void) => {
	const webSocketUrl: string = import.meta.env.VITE_WEBSOCKET_URL;

	const webSocket = new WebSocket(webSocketUrl);

	// Logs that a connection has opened
	webSocket.onopen = (event) => {
		console.log('WebSocket connected - listening for updates');
	};

	webSocket.onmessage = (event) => {
		const update = JSON.parse(event.data);
		console.log('Table update received');
		console.log(update);

		if (onDataReceived) {
			onDataReceived(update);
		}
	};

	webSocket.onclose = (event) => {
		console.log('Disconnected from updates');
	};

	return webSocket;
};

/**
 * Author: StefanMogren
 * API for WebSocket
 *
 */
