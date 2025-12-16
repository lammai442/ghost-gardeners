import { create } from 'zustand';
import type { User } from '@mojjen/userdata';

type userStore = {
	user: User | null;
	updateUserStorage: (user: User | null) => void;
	logout: () => void;
};

// Initializes the auth state from localStorage on app load.
// If a user is found, it is parsed and used as the initial store state;
// otherwise, the state defaults to null. The store keeps the user state
// and localStorage in sync and provides helpers for updating and logging out.
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
