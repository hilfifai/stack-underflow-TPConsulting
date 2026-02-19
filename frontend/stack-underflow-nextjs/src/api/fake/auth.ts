// ========================= FAKE AUTH API =========================
// Simulates API responses with artificial delays and occasional errors
// Useful for testing UI states like loading, error, success

import type { User } from "@/types";
import { validateUsername, validatePassword, ValidationError } from "../types";

/**
 * Simulates network delay (200-500ms)
 */
const delay = (ms: number): Promise<void> => 
  new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Login - fake API with random delays
 */
export const login = async (data: {
  username: string;
  password: string;
}): Promise<User> => {
  // Simulate network delay (200-500ms)
  await delay(200 + Math.random() * 300);

  // Simulate occasional server errors (5% chance)
  if (Math.random() < 0.05) {
    throw new Error("Server error. Please try again.");
  }

  // Simulate validation errors
  if (!data.username.trim()) {
    throw ValidationError.USERNAME_REQUIRED.message;
  }
  if (!data.password.trim()) {
    throw ValidationError.PASSWORD_REQUIRED.message;
  }

  // Simulate invalid credentials (10% chance)
  if (data.password !== "password123") {
    throw ValidationError.INVALID_CREDENTIALS.message;
  }

  const user: User = {
    id: `user_${Date.now()}`,
    username: data.username.trim(),
  };

  console.log("[Fake API] Login successful:", user);
  return user;
};

/**
 * Signup - fake API with random delays
 */
export const signup = async (data: {
  username: string;
  password: string;
}): Promise<User> => {
  // Simulate network delay (300-600ms)
  await delay(300 + Math.random() * 300);

  // Simulate occasional server errors (5% chance)
  if (Math.random() < 0.05) {
    throw new Error("Server error. Please try again.");
  }

  // Simulate username already exists (10% chance for demo)
  if (data.username.toLowerCase() === "admin") {
    throw ValidationError.USERNAME_EXISTS.message;
  }

  // Simulate validation errors
  if (!data.username.trim()) {
    throw ValidationError.USERNAME_REQUIRED.message;
  }
  if (!data.password.trim()) {
    throw ValidationError.PASSWORD_REQUIRED.message;
  }

  const user: User = {
    id: `user_${Date.now()}`,
    username: data.username.trim(),
  };

  console.log("[Fake API] Signup successful:", user);
  return user;
};

/**
 * Logout - fake API with random delays
 */
export const logout = async (): Promise<void> => {
  // Simulate network delay (100-300ms)
  await delay(100 + Math.random() * 200);
  console.log("[Fake API] Logout successful");
};

/**
 * Get current user - fake API with random delays
 */
export const getCurrentUser = async (): Promise<User | null> => {
  // Simulate network delay (100-200ms)
  await delay(100 + Math.random() * 100);

  // Return null for unauthenticated state
  // In real app, this would check for stored token
  console.log("[Fake API] Get current user: null");
  return null;
};
