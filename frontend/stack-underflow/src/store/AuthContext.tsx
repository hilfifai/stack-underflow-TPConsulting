import { createContext, useContext, useState, type ReactNode } from "react";
import { dataStore } from "./dataStore";
import type { User } from "#src/types";

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(dataStore.getCurrentUser());

  const login = (username: string, password: string) => {
    const loggedInUser = dataStore.login(username, password);
    setUser(loggedInUser);
  };

  const logout = () => {
    dataStore.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: user !== null,
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
