import type { User } from "@/types";

// ========================= FAKE AUTH API =========================
// Simulates API responses with artificial delays
// Useful for testing UI states like loading, error, success

/**
 * Login - fake API with random delays
 */
export const login = async (data: {
  username: string;
  password: string;
}): Promise<User> => {
  // Simulate network delay (200-500ms)
  await new Promise((resolve) => setTimeout(resolve, 200 + Math.random() * 300));

  // Simulate occasional server errors (5% chance)
  if (Math.random() < 0.05) {
    throw new Error("Server error. Please try again.");
  }

  // Simulate validation errors
  if (!data.username.trim()) {
    throw new Error("Username is required");
  }
  if (!data.password.trim()) {
    throw new Error("Password is required");
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
  await new Promise((resolve) => setTimeout(resolve, 300 + Math.random() * 300));

  // Simulate occasional server errors (5% chance)
  if (Math.random() < 0.05) {
    throw new Error("Server error. Please try again.");
  }

  // Simulate username already exists (10% chance for demo)
  if (data.username.toLowerCase() === "admin") {
    throw new Error("Username already exists");
  }

  // Simulate validation errors
  if (!data.username.trim()) {
    throw new Error("Username is required");
  }
  if (!data.password.trim()) {
    throw new Error("Password is required");
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
  await new Promise((resolve) => setTimeout(resolve, 100 + Math.random() * 200));
  console.log("[Fake API] Logout successful");
};

/**
 * Get current user - fake API with random delays
 */
export const getCurrentUser = async (): Promise<User | null> => {
  // Simulate network delay (100-200ms)
  await new Promise((resolve) => setTimeout(resolve, 100 + Math.random() * 100));

  // Return null for unauthenticated state
  // In real app, this would check for stored token
  console.log("[Fake API] Get current user: null");
  return null;
};
