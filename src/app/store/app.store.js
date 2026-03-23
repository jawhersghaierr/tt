import { create } from 'zustand'

export const useAppStore = create((set) => ({
  isLoading: false,
  setIsLoading: (value) => set({ isLoading: value }),

  theme: 'light',
  setTheme: (theme) => set({ theme }),
}))