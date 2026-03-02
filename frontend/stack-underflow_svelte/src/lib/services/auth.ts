import type { LoginRequest, LoginResponse, RegisterRequest, User } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api/v1';

export async function login(data: LoginRequest): Promise<LoginResponse> {
	const response = await fetch(`${API_URL}/auth/login`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	});

	if (!response.ok) {
		const error = await response.json().catch(() => ({ message: 'Login failed' }));
		throw new Error(error.message || 'Login failed');
	}

	return response.json();
}

export async function register(data: RegisterRequest): Promise<LoginResponse> {
	const response = await fetch(`${API_URL}/auth/register`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	});

	if (!response.ok) {
		const error = await response.json().catch(() => ({ message: 'Registration failed' }));
		throw new Error(error.message || 'Registration failed');
	}

	return response.json();
}

export async function getCurrentUser(token: string): Promise<User> {
	const response = await fetch(`${API_URL}/auth/me`, {
		headers: {
			'Authorization': `Bearer ${token}`
		}
	});

	if (!response.ok) {
		throw new Error('Failed to get current user');
	}

	return response.json();
}
