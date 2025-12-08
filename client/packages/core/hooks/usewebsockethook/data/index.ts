/**
 * Author: StefanMogren
 * A global and accessable state for websocket connection
 */

import { useEffect, useRef } from 'react';
import { useWebSocketStore } from '@mojjen/usewebsocketstore';
// import type { WebSocketOrder } from '@mojjen/productdata';

const webSocketUrl: string = import.meta.env.VITE_WEBSOCKET_URL;

export const useWebSocketHook = () => {
	const {
		ws,
		setWebSocket,
		setConnectionStatus,
		updateOrder,
		closeConnection,
	} = useWebSocketStore();

	const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);

	useEffect(() => {
		if (!ws || ws.readyState === WebSocket.CLOSED) {
			const websocket = new WebSocket(webSocketUrl);

			websocket.onopen = () => {
				console.log('WebSocket connected');
				setWebSocket(websocket);
				setConnectionStatus(true);
			};

			websocket.onmessage = (event) => {
				try {
					const message = JSON.parse(event.data);
					console.log('Received order update:', message);
					updateOrder(message.data);
				} catch (error) {
					console.error('Error parsing WebSocket message:', error);
				}
			};
			websocket.onclose = () => {
				console.log('WebSocket disconnected');
				setConnectionStatus(false);

				reconnectTimeoutRef.current = setTimeout(() => {
					console.log('Attempting to reconnect...');
					setWebSocket(null as any);
				}, 3000);
			};

			websocket.onerror = (error) => {
				console.error('WebSocket error:', error);
				setConnectionStatus(false);
			};
		}

		return () => {
			if (reconnectTimeoutRef.current) {
				clearTimeout(reconnectTimeoutRef.current);
			}
		};
	}, [ws, setWebSocket, setConnectionStatus, updateOrder]);

	useEffect(() => {
		return () => {
			closeConnection();
			if (reconnectTimeoutRef.current) {
				clearTimeout(reconnectTimeoutRef.current);
			}
		};
	}, [closeConnection]);

	return {
		isConnected: ws?.readyState === WebSocket.OPEN,
		ws,
	};
};

/* export const useWebsocketStore = create<userStore>((set) => ({
	websocketConnection: initialUser,
	updateUserStorage: (user: User) => {
		set({ user: user });
		localStorage.setItem('user', JSON.stringify(user));
	},
	logout: () => {
		set({ user: null });
		localStorage.removeItem('user');
	},
}));
 */
