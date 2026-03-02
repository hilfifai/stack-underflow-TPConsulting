// ========================= REAL AUTH API =========================
import type { User } from "~/types";

const API_URL = process.env.NUXT_PUBLIC_API_URL || "http://localhost:8080/api";

export const login = async (data: { username: string; password: string }): Promise<User> => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw createError({ statusCode: response.status, message: error.message || "Login failed" });
  }
  
  const result = await response.json();
  return result.data;
};

export const signup = async (data: { username: string; password: string }): Promise<User> => {
  const response = await fetch(`${API_URL}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw createError({ statusCode: response.status, message: error.message || "Signup failed" });
  }
  
  const result = await response.json();
  return result.data;
};

export const logout = async (): Promise<void> => {
  console.log("[Real API] Logout called");
};

export const getCurrentUser = async (): Promise<User | null> => {
  return null;
};
