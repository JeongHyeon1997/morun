'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface AuthUser {
  id: string;
  nickname: string;
  email: string;
  name: string;
  avatarUrl: string | null;
}

interface AuthState {
  user: AuthUser | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  setSession: (user: AuthUser, accessToken: string) => void;
  clearSession: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      isAuthenticated: false,
      setSession: (user, accessToken) =>
        set({ user, accessToken, isAuthenticated: true }),
      clearSession: () =>
        set({ user: null, accessToken: null, isAuthenticated: false }),
    }),
    {
      name: 'morun.auth',
      storage: createJSONStorage(() =>
        typeof window === 'undefined'
          ? {
              getItem: () => null,
              setItem: () => {},
              removeItem: () => {},
            }
          : window.localStorage,
      ),
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
