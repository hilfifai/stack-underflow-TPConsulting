// Auth API - Selects implementation based on VITE_API_LAYER environment variable
// Default: mock (in-memory data store)
// Options: mock, fake (simulated responses), real (backend API)

import type { User } from "@/types";

// Get API layer from environment variable, default to mock
const API_LAYER = (import.meta.env.VITE_API_LAYER as string) || "mock";

// Dynamic import based on API layer
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
