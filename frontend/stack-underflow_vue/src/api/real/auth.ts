import type { User } from "@/types";

// Get API URL from environment variable
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api";

// ========================= REAL AUTH API =========================
// Connects to a real backend server

/**
 * Login - Real API call
 */
export const login = async (data: {
  username: string;
  password: string;
}): Promise<User> => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Login failed");
  }

  const result = await response.json();
  console.log("[Real API] Login successful:", result);
  return result.data;
};

/**
 * Signup - Real API call
 */
export const signup = async (data: {
  username: string;
  password: string;
}): Promise<User> => {
  const response = await fetch(`${API_URL}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Signup failed");
  }

  const result = await response.json();
  console.log("[Real API] Signup successful:", result);
  return result.data;
};

/**
 * Logout - Real API call
 */
export const logout = async (): Promise<void> => {
  const token = localStorage.getItem("token");

  await fetch(`${API_URL}/auth/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  // Clear local storage
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  console.log("[Real API] Logout successful");
};

/**
 * Get current user - Real API call
 */
export const getCurrentUser = async (): Promise<User | null> => {
  const token = localStorage.getItem("token");

  if (!token) {
    return null;
  }

  const response = await fetch(`${API_URL}/auth/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    // Token might be expired
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return null;
  }

  const result = await response.json();
  console.log("[Real API] Get current user:", result);
  return result.data;
};
