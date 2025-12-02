/**
 * Author: Lam
 * A global and accessable state for user
 */

import { create } from 'zustand';
import type { User } from '@mojjen/productdata';

type userStore = {
	user: User | null;
	updateUserStorage: (user: User) => void;
	logout: () => void;
};

// Initializing user for global state and localStorage
const saved = localStorage.getItem('user');
const initialUser = saved ? JSON.parse(saved) : null;
localStorage.setItem('user', JSON.stringify(initialUser));

// const example: User = {
// 	firstname: 'Bo',
// 	lastname: 'Svensson',
// 	phone: '079 454 48 41',
// 	email: 'lennart@svensson.se',
// };

export const useAuthStore = create<userStore>((set) => ({
	user: initialUser,
	updateUserStorage: (user: User) => {
		set({ user: user });
		localStorage.setItem('user', JSON.stringify(user));
	},
	logout: () => {
		set({ user: null });
		localStorage.removeItem('user');
	},
}));
