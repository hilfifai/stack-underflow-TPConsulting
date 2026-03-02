import { dataStore } from "../store/dataStore";
import type { User } from "../types";
import { ValidationError, validateUsername, validatePassword } from "../api/types";

// ========================= AUTH API FUNCTIONS =========================

/**
 * Login
 */
export const login = async (data: {
  username: string;
  password: string;
}): Promise<User> => {
  await new Promise((resolve) => setTimeout(resolve, 200));

  // Validate input
  validateUsername(data.username);
  validatePassword(data.password);

  // Mock login - accept any username/password
  const user: User = {
    id: `user_${Date.now()}`,
    username: data.username.trim(),
  };
  dataStore.login(data.username.trim(), data.password.trim());
  return user;
};

/**
 * Signup
 */
export const signup = async (data: {
  username: string;
  password: string;
}): Promise<User> => {
  await new Promise((resolve) => setTimeout(resolve, 200));

  // Validate input
  validateUsername(data.username);
  validatePassword(data.password);

  // Mock signup - check if username already exists
  const user: User = {
    id: `user_${Date.now()}`,
    username: data.username.trim(),
  };
  dataStore.signup(data.username.trim(), data.password.trim());
  return user;
};

/**
 * Logout
 */
export const logout = async (): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, 100));
  dataStore.logout();
};

/**
 * Get current user
 */
export const getCurrentUser = async (): Promise<User | null> => {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return dataStore.getCurrentUser();
};

/**
 * Check if user is logged in
 */
export const isLoggedIn = async (): Promise<boolean> => {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return dataStore.isLoggedIn();
};
