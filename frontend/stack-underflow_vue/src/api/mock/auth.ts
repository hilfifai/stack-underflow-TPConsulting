import type { User } from "@/types";
import { dataStore } from "@/store/dataStore";

// ========================= MOCK AUTH API =========================

/**
 * Login - uses in-memory data store
 */
export const login = async (data: {
  username: string;
  password: string;
}): Promise<User> => {
  await new Promise((resolve) => setTimeout(resolve, 200));

  const user: User = {
    id: `user_${Date.now()}`,
    username: data.username.trim(),
  };
  dataStore.login(data.username.trim(), data.password.trim());
  return user;
};

/**
 * Signup - uses in-memory data store
 */
export const signup = async (data: {
  username: string;
  password: string;
}): Promise<User> => {
  await new Promise((resolve) => setTimeout(resolve, 200));

  const user: User = {
    id: `user_${Date.now()}`,
    username: data.username.trim(),
  };
  dataStore.signup(data.username.trim(), data.password.trim());
  return user;
};

/**
 * Logout - uses in-memory data store
 */
export const logout = async (): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, 100));
  dataStore.logout();
};

/**
 * Get current user - uses in-memory data store
 */
export const getCurrentUser = async (): Promise<User | null> => {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return dataStore.getCurrentUser();
};
