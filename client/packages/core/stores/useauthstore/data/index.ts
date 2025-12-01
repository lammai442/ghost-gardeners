/**
 * Author: Lam
 * A global and accessable state for auth.
 */

import { create } from 'zustand';
import type { User } from '@mojjen/productdata';

type userStore = {
	user: User | null;
};

// Hämtar user-raden från localStorage
const saved = localStorage.getItem('user');

// Om saved finns, parsa. Annars null.
const initialUser = saved ? JSON.parse(saved) : null;

const example: User = {
	firstname: 'Bo',
	lastname: 'Svensson',
	phone: '079 454 48 41',
	email: 'lennart@svensson.se',
};

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
