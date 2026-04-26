'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface CrewMembershipState {
  joinedCrewId: string | null;
  joinCrew: (crewId: string) => void;
  leaveCrew: () => void;
}

/**
 * Local-only stand-in for real crew membership while the backend isn't wired.
 * `/crew/new` submit calls `joinCrew(...)` so the rest of the app can render
 * the joined-state view (e.g. swap the bottom tab "설정" → "일정").
 */
export const useCrewStore = create<CrewMembershipState>()(
  persist(
    (set) => ({
      joinedCrewId: null,
      joinCrew: (crewId) => set({ joinedCrewId: crewId }),
      leaveCrew: () => set({ joinedCrewId: null }),
    }),
    {
      name: 'morun.crew',
      storage: createJSONStorage(() =>
        typeof window === 'undefined'
          ? {
              getItem: () => null,
              setItem: () => {},
              removeItem: () => {},
            }
          : window.localStorage,
      ),
      partialize: (state) => ({ joinedCrewId: state.joinedCrewId }),
    },
  ),
);
