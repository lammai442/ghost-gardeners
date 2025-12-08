/**
 * Author: StefanMogren
 * A global and accessable state for websocket connection
 */

import { create } from 'zustand';
import type { WebSocketOrder } from '@mojjen/productdata';

type WebSocketState = {
	ws: WebSocket | null;
	isConnected: boolean;
	order: WebSocketOrder | null;
	setWebSocket: (websocket: WebSocket) => void;
	setConnectionStatus: (status: boolean) => void;
	updateOrder: (newOrder: WebSocketOrder) => void;
	closeConnection: () => void;
	reset: () => void;
};

export const useWebSocketStore = create<WebSocketState>((set, get) => ({
	ws: null,
	isConnected: false,
	order: null,

	setWebSocket: (websocket) => {
		set({ ws: websocket, isConnected: true });
	},

	updateOrder: (newOrder: WebSocketOrder): void => {
		set({ order: newOrder });
	},

	setConnectionStatus: (status) => {
		set({ isConnected: status });
	},

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
			order: null,
		});
	},
}));
