import type { User } from '../../types';
import { DataStore } from '../../store/data.store';

const dataStore = new DataStore();

export const login = async (data: { username: string; password: string }): Promise<User> => {
  await new Promise((resolve) => setTimeout(resolve, 100));
  const user = dataStore.login(data.username, data.password);
  if (!user) {
    throw new Error('Invalid credentials');
  }
  return user;
};

export const signup = async (data: { username: string; password: string }): Promise<User> => {
  await new Promise((resolve) => setTimeout(resolve, 100));
  const user = dataStore.signup(data.username, data.password);
  if (!user) {
    throw new Error('Username already exists');
  }
  return user;
};

export const logout = async (): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, 50));
  dataStore.logout();
};

export const getCurrentUser = async (): Promise<User | null> => {
  await new Promise((resolve) => setTimeout(resolve, 50));
  return dataStore.getCurrentUser();
};
