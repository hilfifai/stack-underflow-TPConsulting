// ========================= AUTH COMPOSABLE =========================
import type { User } from "@/types";
import { login as apiLogin, signup as apiSignup, logout as apiLogout, getCurrentUser } from "@/api/auth";

export const useAuth = () => {
  const user = useState<User | null>("auth-user", () => null);
  const loading = useState("auth-loading", () => false);
  const error = useState<string | null>("auth-error", () => null);

  const loginFn = async (username: string, password: string) => {
    loading.value = true;
    error.value = null;
    try {
      const userData = await apiLogin({ username, password });
      user.value = userData;
      return userData;
    } catch (err) {
      error.value = err instanceof Error ? err.message : "Login failed";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const signupFn = async (username: string, password: string) => {
    loading.value = true;
    error.value = null;
    try {
      const userData = await apiSignup({ username, password });
      user.value = userData;
      return userData;
    } catch (err) {
      error.value = err instanceof Error ? err.message : "Signup failed";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const logoutFn = async () => {
    loading.value = true;
    try {
      await apiLogout();
      user.value = null;
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      loading.value = false;
    }
  };

  const clearError = () => {
    error.value = null;
  };

  const initAuth = async () => {
    loading.value = true;
    try {
      const currentUser = await getCurrentUser();
      user.value = currentUser;
    } catch (err) {
      console.error("Auth check failed:", err);
    } finally {
      loading.value = false;
    }
  };

  return {
    user,
    loading,
    error,
    login: loginFn,
    signup: signupFn,
    logout: logoutFn,
    clearError,
    initAuth
  };
};
