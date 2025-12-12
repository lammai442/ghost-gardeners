import { create } from 'zustand';
import type { User } from '@mojjen/userdata';

type userStore = {
	user: User | null;
	updateUserStorage: (user: User | null) => void;
	logout: () => void;
};

// Initializing user for global state and localStorage
const saved = localStorage.getItem('user');
const initialUser = saved ? JSON.parse(saved) : null;
localStorage.setItem('user', JSON.stringify(initialUser));

export const useAuthStore = create<userStore>((set) => ({
	user: initialUser,
	updateUserStorage: (user: User | null) => {
		set({ user: user });
		localStorage.setItem('user', JSON.stringify(user));
	},
	logout: () => {
		set({ user: null });
		localStorage.removeItem('user');
	},
}));

/**
 * Author: Lam
 * A global and accessable state for user
 */
