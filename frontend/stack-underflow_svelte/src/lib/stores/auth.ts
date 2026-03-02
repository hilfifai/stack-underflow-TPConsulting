import { writable, derived } from 'svelte/store';
import type { User } from '../types';

interface AuthState {
	user: User | null;
	token: string | null;
	isAuthenticated: boolean;
	loading: boolean;
}

const initialState: AuthState = {
	user: null,
	token: null,
	isAuthenticated: false,
	loading: true
};

function createAuthStore() {
	const { subscribe, set, update } = writable<AuthState>(initialState);

	return {
		subscribe,
		init: () => {
			if (typeof window !== 'undefined') {
				const token = localStorage.getItem('token');
				const user = localStorage.getItem('user');
				if (token && user) {
					set({
						token,
						user: JSON.parse(user),
						isAuthenticated: true,
						loading: false
					});
				} else {
					update(state => ({ ...state, loading: false }));
				}
			}
		},
		login: (token: string, user: User) => {
			localStorage.setItem('token', token);
			localStorage.setItem('user', JSON.stringify(user));
			set({ token, user, isAuthenticated: true, loading: false });
		},
		logout: () => {
			localStorage.removeItem('token');
			localStorage.removeItem('user');
			set({ user: null, token: null, isAuthenticated: false, loading: false });
		},
		updateUser: (user: User) => {
			localStorage.setItem('user', JSON.stringify(user));
			update(state => ({ ...state, user }));
		}
	};
}

export const auth = createAuthStore();
export const isAuthenticated = derived(auth, $auth => $auth.isAuthenticated);
export const currentUser = derived(auth, $auth => $auth.user);
export const authToken = derived(auth, $auth => $auth.token);
