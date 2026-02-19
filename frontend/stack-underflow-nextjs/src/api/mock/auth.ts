// ========================= MOCK AUTH API =========================
// In-memory data store with predictable responses
// Best for development and testing with consistent behavior

import type { User } from "@/types";
import { ValidationError } from "../types";

// In-memory user store
const users: Map<string, { user: User; password: string }> = new Map();
let currentUser: User | null = null;

/**
 * Initialize with a default user
 */
const initDefaultUser = () => {
  if (users.size === 0) {
    const defaultUser: User = {
      id: "user_1",
      username: "admin",
    };
    users.set("admin", { user: defaultUser, password: "password123" });
    currentUser = defaultUser;
  }
};

/**
 * Login - mock API with predictable responses
 */
export const login = async (data: {
  username: string;
  password: string;
}): Promise<User> => {
  // Simulate minimal delay
  await new Promise((resolve) => setTimeout(resolve, 100));

  // Initialize default user if needed
  initDefaultUser();

  // Validate input
  if (!data.username.trim()) {
    throw ValidationError.USERNAME_REQUIRED.message;
  }
  if (!data.password.trim()) {
    throw ValidationError.PASSWORD_REQUIRED.message;
  }

  // Check if user exists and password matches
  const userRecord = users.get(data.username.toLowerCase());
  if (!userRecord || userRecord.password !== data.password) {
    throw ValidationError.INVALID_CREDENTIALS.message;
  }

  currentUser = userRecord.user;
  console.log("[Mock API] Login successful:", currentUser);
  return currentUser;
};

/**
 * Signup - mock API with predictable responses
 */
export const signup = async (data: {
  username: string;
  password: string;
}): Promise<User> => {
  // Simulate minimal delay
  await new Promise((resolve) => setTimeout(resolve, 100));

  // Initialize default user if needed
  initDefaultUser();

  // Validate input
  if (!data.username.trim()) {
    throw ValidationError.USERNAME_REQUIRED.message;
  }
  if (!data.password.trim()) {
    throw ValidationError.PASSWORD_REQUIRED.message;
  }

  // Check if username already exists
  if (users.has(data.username.toLowerCase())) {
    throw ValidationError.USERNAME_EXISTS.message;
  }

  // Create new user
  const user: User = {
    id: `user_${Date.now()}`,
    username: data.username.trim(),
  };

  users.set(data.username.toLowerCase(), { user, password: data.password });
  currentUser = user;

  console.log("[Mock API] Signup successful:", user);
  return user;
};

/**
 * Logout - mock API
 */
export const logout = async (): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, 50));
  currentUser = null;
  console.log("[Mock API] Logout successful");
};

/**
 * Get current user - mock API
 */
export const getCurrentUser = async (): Promise<User | null> => {
  await new Promise((resolve) => setTimeout(resolve, 50));
  console.log("[Mock API] Get current user:", currentUser);
  return currentUser;
};

// Export for testing
export const mockUsers = users;
export const mockCurrentUser = currentUser;
