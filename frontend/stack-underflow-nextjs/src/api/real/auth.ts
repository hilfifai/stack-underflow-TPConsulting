// ========================= REAL AUTH API =========================
// Connects to a real backend server

import type { User } from "@/types";
import { API_URL } from "../config";

/**
 * Get stored token from localStorage
 */
const getToken = (): string | null => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
};

/**
 * Set token in localStorage
 */
const setToken = (token: string): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem("token", token);
  }
};

/**
 * Clear token from localStorage
 */
const clearToken = (): void => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }
};

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
  const token = result.data?.token || result.token;
  
  if (token) {
    setToken(token);
  }

  console.log("[Real API] Login successful:", result.data);
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
  const token = result.data?.token || result.token;
  
  if (token) {
    setToken(token);
  }

  console.log("[Real API] Signup successful:", result.data);
  return result.data;
};

/**
 * Logout - Real API call
 */
export const logout = async (): Promise<void> => {
  const token = getToken();

  if (token) {
    await fetch(`${API_URL}/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  }

  // Clear local storage regardless of API call result
  clearToken();
  console.log("[Real API] Logout successful");
};

/**
 * Get current user - Real API call
 */
export const getCurrentUser = async (): Promise<User | null> => {
  const token = getToken();

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
    clearToken();
    return null;
  }

  const result = await response.json();
  console.log("[Real API] Get current user:", result.data);
  return result.data;
};
