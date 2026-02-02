import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { login, signup, logout, getCurrentUser } from "#src/api/auth";
import type { User } from "#src/types";
import { ApiError } from "#src/api/types";
import { QUERY_KEYS } from "#src/api/constants";

export function useAuth() {
  const queryClient = useQueryClient();

  // ========================= QUERIES =========================
  const {
    data: currentUser = null,
    isLoading,
    error,
    refetch: refetchCurrentUser,
  } = useQuery({
    queryKey: QUERY_KEYS.AUTH_USER(),
    queryFn: () => getCurrentUser(),
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
  });

  // ========================= MUTATIONS =========================
  const loginMutation = useMutation({
    mutationFn: (data: { username: string; password: string }) => login(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.AUTH_USER() });
    },
    onError: (error: ApiError) => {
      console.error("[useAuth] Login error:", {
        code: error.code,
        message: error.message,
        details: error.details,
        timestamp: new Date().toISOString(),
      });
    },
  });

  const signupMutation = useMutation({
    mutationFn: (data: { username: string; password: string }) => signup(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.AUTH_USER() });
    },
    onError: (error: ApiError) => {
      console.error("[useAuth] Signup error:", {
        code: error.code,
        message: error.message,
        details: error.details,
        timestamp: new Date().toISOString(),
      });
    },
  });

  const logoutMutation = useMutation({
    mutationFn: () => logout(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.AUTH_USER() });
    },
    onError: (error: ApiError) => {
      console.error("[useAuth] Logout error:", {
        code: error.code,
        message: error.message,
        details: error.details,
        timestamp: new Date().toISOString(),
      });
    },
  });

  return {
    currentUser,
    loading: isLoading,
    error,
    refetchCurrentUser,

    loginMutation,
    signupMutation,
    logoutMutation,
  };
}
