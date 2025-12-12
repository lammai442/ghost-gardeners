import { create } from 'zustand';
import type { OrderItems } from '@mojjen/orderitems';

type WebSocketState = {
	ws: WebSocket | null;
	isConnected: boolean;
	orderFromWs: OrderItems | null;
	setWebSocket: (websocket: WebSocket) => void;
	setConnectionStatus: (status: boolean) => void;
	updateOrder: (newOrder: OrderItems) => void;
	closeConnection: () => void;
	reset: () => void;
};

export const useWebSocketStore = create<WebSocketState>((set, get) => ({
	ws: null,
	isConnected: false,
	orderFromWs: null,

	// Stores the WebSocket when it connects.
	setWebSocket: (websocket) => {
		set({ ws: websocket, isConnected: true });
	},

	// Updates the variable that's used in Frontend
	updateOrder: (newOrder: OrderItems): void => {
		set({ orderFromWs: newOrder });
	},

	setConnectionStatus: (status) => {
		set({ isConnected: status });
	},

	// For when you need to manually close the connection. Otherwise the backend does that automatically whenever connection is lost
	closeConnection: () => {
		const { ws } = get();
		if (ws) {
			ws.close();
			set({ ws: null, isConnected: false });
		}
	},

	reset: () => {
		set({
			ws: null,
			isConnected: false,
			orderFromWs: null,
		});
	},
}));

/**
 * Author: StefanMogren
 * A global and accessable state for websocket connection
 */
