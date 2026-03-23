import { create } from "zustand";

const STORAGE_KEY = "tineritt-usage";

function getTodayKey() {
  return new Date().toISOString().slice(0, 10);
}

function getInitialUsage() {
  const raw = localStorage.getItem(STORAGE_KEY);

  if (!raw) {
    return {
      day: getTodayKey(),
      swipesUsed: 0,
    };
  }

  try {
    const parsed = JSON.parse(raw);

    if (parsed.day !== getTodayKey()) {
      return {
        day: getTodayKey(),
        swipesUsed: 0,
      };
    }

    return parsed;
  } catch {
    return {
      day: getTodayKey(),
      swipesUsed: 0,
    };
  }
}

export const useUsageStore = create((set, get) => ({
  ...getInitialUsage(),

  persist: () => {
    const { day, swipesUsed } = get();
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        day,
        swipesUsed,
      })
    );
  },

  incrementSwipes: () => {
    const today = getTodayKey();
    const current = get();

    const nextState =
      current.day === today
        ? {
            day: today,
            swipesUsed: current.swipesUsed + 1,
          }
        : {
            day: today,
            swipesUsed: 1,
          };

    set(nextState);
    get().persist();
  },

  resetUsage: () => {
    const nextState = {
      day: getTodayKey(),
      swipesUsed: 0,
    };

    set(nextState);
    get().persist();
  },
}));