// ========================= FAKE AUTH API =========================
import type { User } from "~/types";

const delay = (ms: number): Promise<void> => 
  new Promise((resolve) => setTimeout(resolve, ms));

export const login = async (data: { username: string; password: string }): Promise<User> => {
  await delay(200 + Math.random() * 300);
  
  if (Math.random() < 0.05) {
    throw createError({ statusCode: 500, message: "Server error. Please try again." });
  }
  
  if (!data.username.trim() || !data.password.trim()) {
    throw createError({ statusCode: 400, message: "Username and password are required" });
  }
  
  if (data.password !== "password123") {
    throw createError({ statusCode: 401, message: "Invalid username or password" });
  }
  
  const user: User = {
    id: `user_${Date.now()}`,
    username: data.username.trim(),
  };
  
  console.log("[Fake API] Login successful:", user);
  return user;
};

export const signup = async (data: { username: string; password: string }): Promise<User> => {
  await delay(300 + Math.random() * 300);
  
  if (Math.random() < 0.05) {
    throw createError({ statusCode: 500, message: "Server error. Please try again." });
  }
  
  if (data.username.toLowerCase() === "admin") {
    throw createError({ statusCode: 400, message: "Username already exists" });
  }
  
  if (!data.username.trim() || !data.password.trim()) {
    throw createError({ statusCode: 400, message: "Username and password are required" });
  }
  
  const user: User = {
    id: `user_${Date.now()}`,
    username: data.username.trim(),
  };
  
  console.log("[Fake API] Signup successful:", user);
  return user;
};

export const logout = async (): Promise<void> => {
  await delay(100 + Math.random() * 200);
  console.log("[Fake API] Logout successful");
};

export const getCurrentUser = async (): Promise<User | null> => {
  await delay(100 + Math.random() * 100);
  console.log("[Fake API] Get current user: null");
  return null;
};
