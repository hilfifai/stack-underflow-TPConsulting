import type { User } from '../../types';
import { environment } from '../../../environments/environment';

const API_URL = environment.apiUrl;

export const login = async (data: { username: string; password: string }): Promise<User> => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Login failed');
  }
  const result = await response.json();
  if (result.data?.token) {
    localStorage.setItem('token', result.data.token);
  }
  console.log('[Real API] Login success:', data.username);
  return result.data;
};

export const signup = async (data: { username: string; password: string }): Promise<User> => {
  const response = await fetch(`${API_URL}/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Signup failed');
  }
  const result = await response.json();
  if (result.data?.token) {
    localStorage.setItem('token', result.data.token);
  }
  console.log('[Real API] Signup success:', data.username);
  return result.data;
};

export const logout = async (): Promise<void> => {
  localStorage.removeItem('token');
  console.log('[Real API] Logged out');
};

export const getCurrentUser = async (): Promise<User | null> => {
  const token = localStorage.getItem('token');
  if (!token) return null;
  const response = await fetch(`${API_URL}/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) {
    localStorage.removeItem('token');
    return null;
  }
  const result = await response.json();
  return result.data;
};
