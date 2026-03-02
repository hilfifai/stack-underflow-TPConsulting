import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { User } from "@/types";
import { dataStore } from "./dataStore";

export const useAuthStore = defineStore("auth", () => {
  const user = ref<User | null>(dataStore.getCurrentUser());

  const isAuthenticated = computed(() => user.value !== null);

  const login = (username: string, password: string): void => {
    const loggedInUser = dataStore.login(username, password);
    user.value = loggedInUser;
  };

  const signup = (username: string, password: string): boolean => {
    const newUser = dataStore.signup(username, password);
    if (newUser) {
      user.value = newUser;
      return true;
    }
    return false;
  };

  const logout = (): void => {
    dataStore.logout();
    user.value = null;
  };

  return {
    user,
    isAuthenticated,
    login,
    signup,
    logout,
  };
});
