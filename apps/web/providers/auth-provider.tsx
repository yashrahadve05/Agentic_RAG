"use client";

import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  setAccessToken,
  clearAccessToken,
  refreshAccessToken,
} from "@/lib/auth";
import { apiFetch } from "@/lib/api";
import type { AuthUser, MeResponse } from "@/types";

/* ============================================================
   Auth Context Shape
   ============================================================ */

export interface AuthContextValue {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (accessToken: string, user: AuthUser) => void;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  setUser: (user: AuthUser | null) => void;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

/* ============================================================
   Query Client — singleton
   ============================================================ */

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60_000,
        retry: false,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined;

function getQueryClient() {
  if (typeof window === "undefined") {
    return makeQueryClient();
  }
  if (!browserQueryClient) {
    browserQueryClient = makeQueryClient();
  }
  return browserQueryClient;
}

/* ============================================================
   Provider Component
   ============================================================ */

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Silent refresh on mount — restores session from HTTP-only cookie
  useEffect(() => {
    let cancelled = false;

    async function restore() {
      try {
        const token = await refreshAccessToken();
        if (!token || cancelled) {
          setIsLoading(false);
          return;
        }

        const data = await apiFetch<MeResponse>("/user/me");
        if (!cancelled) {
          setUser(data.user);
        }
      } catch {
        // No valid session — user stays null
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    restore();
    return () => {
      cancelled = true;
    };
  }, []);

  const login = useCallback((accessToken: string, authUser: AuthUser) => {
    setAccessToken(accessToken);
    setUser(authUser);
  }, []);

  const logout = useCallback(async () => {
    try {
      await apiFetch("/auth/logout", { method: "POST" });
    } catch {
      // Best-effort logout
    }
    clearAccessToken();
    setUser(null);
  }, []);

  const refreshUser = useCallback(async () => {
    try {
      const data = await apiFetch<MeResponse>("/user/me");
      setUser(data.user);
    } catch {
      clearAccessToken();
      setUser(null);
    }
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: !!user,
      isLoading,
      login,
      logout,
      refreshUser,
      setUser,
    }),
    [user, isLoading, login, logout, refreshUser]
  );

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    </QueryClientProvider>
  );
}
