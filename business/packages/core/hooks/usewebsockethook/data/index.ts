import { useEffect, useRef } from 'react';
import { useWebSocketStore } from '@mojjen/usewebsocketstore';
import type { WebSocketOrder } from '@mojjen/orderitems';

const webSocketUrl: string = import.meta.env.VITE_WEBSOCKET_URL;

export const useWebSocketHook = () => {
	const {
		ws,
		setWebSocket,
		setConnectionStatus,
		updateOrder,
		closeConnection,
	} = useWebSocketStore();

	const reconnectTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
		null
	);

	useEffect(() => {
		// The initial check when loading a page/the website whether the user is connected to WebSocket or not. Sets the WebSocket to the variable "ws" and automatically connects them
		if (!ws || ws.readyState === WebSocket.CLOSED) {
			const websocket = new WebSocket(webSocketUrl);

			websocket.onopen = () => {
				setWebSocket(websocket);
				setConnectionStatus(true);
			};

			// Whenever a message is received from the WebSocket, check whether its type is "orderUpdate" and whether "message.order" exists.
			// If both are true, then update the variable "orderFromWs" with the newly received order.
			// The data received from WebSocket is of the type WebSocketOrder
			// Tha data sent to "orderFromWs" is of the type Order
			websocket.onmessage = (event) => {
				try {
					const message: WebSocketOrder = JSON.parse(event.data);

					if (message.type === 'orderUpdate' && message.order) {
						updateOrder(message.order);
					}
				} catch (error) {
					console.error('Error parsing WebSocket message:', error);
				}
			};

			// For when the WebSocket discovers that the connection is lost. Sets a timeout to automatically reconnect the user.
			websocket.onclose = () => {
				setConnectionStatus(false);

				reconnectTimeoutRef.current = setTimeout(() => {
					setWebSocket(null as any);
				}, 3000);
			};

			// Whenever there's an error
			websocket.onerror = (error) => {
				console.error('WebSocket error:', error);
				setConnectionStatus(false);
			};
		}

		// Removes the reconnection timeout after a reconnection is made so it won't run all the time.
		return () => {
			if (reconnectTimeoutRef.current) {
				clearTimeout(reconnectTimeoutRef.current);
			}
		};
	}, [ws, setWebSocket, setConnectionStatus, updateOrder]);

	useEffect(() => {
		return () => {
			closeConnection();
		};
	}, [closeConnection]);

	return {
		isConnected: ws?.readyState === WebSocket.OPEN,
		ws,
	};
};

/**
 * Author: StefanMogren
 * A global and accessable state for websocket connection.
 * Created with the help of Amazon Q (AWS:s own AI)
 */
