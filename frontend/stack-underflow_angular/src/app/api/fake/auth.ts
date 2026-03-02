import type { User } from '../../types';

// ========================= FAKE AUTH API =========================
// Simulates API responses with artificial delays

const users = new Map<string, { password: string }>();

export const login = async (data: { username: string; password: string }): Promise<User> => {
  await new Promise((resolve) => setTimeout(resolve, 100 + Math.random() * 200));
  const user = users.get(data.username);
  if (user && user.password === data.password) {
    console.log('[Fake API] Login success:', data.username);
    return { id: data.username, username: data.username };
  }
  if (!user) {
    users.set(data.username, { password: data.password });
    console.log('[Fake API] Auto-login created:', data.username);
    return { id: data.username, username: data.username };
  }
  throw new Error('Invalid credentials');
};

export const signup = async (data: { username: string; password: string }): Promise<User> => {
  await new Promise((resolve) => setTimeout(resolve, 200 + Math.random() * 300));
  if (users.has(data.username)) {
    throw new Error('Username already exists');
  }
  users.set(data.username, { password: data.password });
  console.log('[Fake API] Signup success:', data.username);
  return { id: data.username, username: data.username };
};

export const logout = async (): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, 50));
  console.log('[Fake API] Logged out');
};

export const getCurrentUser = async (): Promise<User | null> => {
  await new Promise((resolve) => setTimeout(resolve, 50));
  return null;
};
