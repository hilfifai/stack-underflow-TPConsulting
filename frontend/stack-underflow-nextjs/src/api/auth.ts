// ========================= AUTH API FACTORY =========================
// Selects implementation based on API_LAYER environment variable
//
// Usage: Import functions from this file
// import { login, signup, logout, getCurrentUser } from "@/api/auth";

import type { User } from "@/types";
import { API_LAYER } from "./config";

// Get the appropriate API implementation
async function getAuthAPI() {
  switch (API_LAYER) {
    case "fake":
      return await import("./fake/auth");
    case "real":
      return await import("./real/auth");
    case "mock":
    default:
      return await import("./mock/auth");
  }
}

// Export functions that delegate to the selected API implementation

export const login = async (data: { username: string; password: string }): Promise<User> => {
  const api = await getAuthAPI();
  return api.login(data);
};

export const signup = async (data: { username: string; password: string }): Promise<User> => {
  const api = await getAuthAPI();
  return api.signup(data);
};

export const logout = async (): Promise<void> => {
  const api = await getAuthAPI();
  return api.logout();
};

export const getCurrentUser = async (): Promise<User | null> => {
  const api = await getAuthAPI();
  return api.getCurrentUser();
};

// Re-export types for convenience
export type { User } from "@/types";
