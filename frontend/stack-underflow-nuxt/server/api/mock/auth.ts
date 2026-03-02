// ========================= MOCK AUTH API =========================
import type { User } from "~/types";

const users: Map<string, { user: User; password: string }> = new Map();
let currentUser: User | null = null;

const initDefaultUser = () => {
  if (users.size === 0) {
    const defaultUser: User = { id: "user_1", username: "admin" };
    users.set("admin", { user: defaultUser, password: "password123" });
    currentUser = defaultUser;
  }
};

export const login = async (data: { username: string; password: string }): Promise<User> => {
  await new Promise((resolve) => setTimeout(resolve, 100));
  initDefaultUser();
  
  if (!data.username.trim() || !data.password.trim()) {
    throw createError({ statusCode: 400, message: "Username and password are required" });
  }
  
  const userRecord = users.get(data.username.toLowerCase());
  if (!userRecord || userRecord.password !== data.password) {
    throw createError({ statusCode: 401, message: "Invalid username or password" });
  }
  
  currentUser = userRecord.user;
  return currentUser;
};

export const signup = async (data: { username: string; password: string }): Promise<User> => {
  await new Promise((resolve) => setTimeout(resolve, 100));
  initDefaultUser();
  
  if (!data.username.trim() || !data.password.trim()) {
    throw createError({ statusCode: 400, message: "Username and password are required" });
  }
  
  if (users.has(data.username.toLowerCase())) {
    throw createError({ statusCode: 400, message: "Username already exists" });
  }
  
  const user: User = { id: `user_${Date.now()}`, username: data.username.trim() };
  users.set(data.username.toLowerCase(), { user, password: data.password });
  currentUser = user;
  
  return user;
};

export const logout = async (): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, 50));
  currentUser = null;
};

export const getCurrentUser = async (): Promise<User | null> => {
  await new Promise((resolve) => setTimeout(resolve, 50));
  return currentUser;
};
