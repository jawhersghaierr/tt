// matches.store.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { fetchMatches } from '../services/matches.service';

export const useMatchesStore = create(
  persist(
    (set, get) => ({
      matches: [],
      loadMatches: async () => {
        const data = await fetchMatches();
        set({ matches: data });
      },
      markAsSeen: (matchId) => {
        set(state => ({
          matches: state.matches.map(m =>
            m.matchId === matchId ? { ...m, seen: true } : m
          ),
        }));
      },
      getMatch: (matchId) => get().matches.find(m => m.matchId === matchId),
    }),
    { name: 'matches-store' }
  )
);
