import React, { createContext, useContext, useReducer, useEffect } from "react";
import type { User } from "../types";
import * as authService from "../services/auth";

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

type AuthAction =
  | { type: "LOGIN_START" }
  | { type: "LOGIN_SUCCESS"; payload: User }
  | { type: "LOGIN_FAILURE"; payload: string }
  | { type: "LOGOUT" }
  | { type: "SET_USER"; payload: User | null }
  | { type: "CLEAR_ERROR" };

interface AuthContextType extends AuthState {
  login: (username: string, password: string) => Promise<void>;
  signup: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
}

const initialState: AuthState = {
  user: null,
  isLoading: false,
  error: null,
};

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case "LOGIN_START":
      return { ...state, isLoading: true, error: null };
    case "LOGIN_SUCCESS":
      return { ...state, isLoading: false, user: action.payload, error: null };
    case "LOGIN_FAILURE":
      return { ...state, isLoading: false, error: action.payload };
    case "LOGOUT":
      return { ...state, user: null, error: null };
    case "SET_USER":
      return { ...state, user: action.payload };
    case "CLEAR_ERROR":
      return { ...state, error: null };
    default:
      return state;
  }
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    // Check for existing user on mount
    const checkAuth = async () => {
      try {
        const user = await authService.getCurrentUser();
        dispatch({ type: "SET_USER", payload: user });
      } catch {
        dispatch({ type: "SET_USER", payload: null });
      }
    };
    checkAuth();
  }, []);

  const login = async (username: string, password: string) => {
    dispatch({ type: "LOGIN_START" });
    try {
      const user = await authService.login({ username, password });
      dispatch({ type: "LOGIN_SUCCESS", payload: user });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Login failed";
      dispatch({ type: "LOGIN_FAILURE", payload: message });
      throw error;
    }
  };

  const signup = async (username: string, password: string) => {
    dispatch({ type: "LOGIN_START" });
    try {
      const user = await authService.signup({ username, password });
      dispatch({ type: "LOGIN_SUCCESS", payload: user });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Signup failed";
      dispatch({ type: "LOGIN_FAILURE", payload: message });
      throw error;
    }
  };

  const logout = async () => {
    await authService.logout();
    dispatch({ type: "LOGOUT" });
  };

  const clearError = () => {
    dispatch({ type: "CLEAR_ERROR" });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        signup,
        logout,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
