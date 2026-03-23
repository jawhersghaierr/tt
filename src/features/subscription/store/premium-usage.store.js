import { create } from "zustand";

const STORAGE_KEY = "tineritt-premium-usage";

function getWeekKey() {
  const now = new Date();
  const firstDay = new Date(now.getFullYear(), 0, 1);
  const pastDays = Math.floor((now - firstDay) / 86400000);
  const week = Math.ceil((pastDays + firstDay.getDay() + 1) / 7);
  return `${now.getFullYear()}-W${week}`;
}

function getMonthKey() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
}

function getInitialState() {
  const raw = localStorage.getItem(STORAGE_KEY);

  const fallback = {
    monthKey: getMonthKey(),
    weekKey: getWeekKey(),
    boostsUsed: 0,
    superLikesUsed: 0,
  };

  if (!raw) return fallback;

  try {
    const parsed = JSON.parse(raw);

    return {
      monthKey: parsed.monthKey === getMonthKey() ? parsed.monthKey : getMonthKey(),
      weekKey: parsed.weekKey === getWeekKey() ? parsed.weekKey : getWeekKey(),
      boostsUsed: parsed.monthKey === getMonthKey() ? parsed.boostsUsed || 0 : 0,
      superLikesUsed: parsed.weekKey === getWeekKey() ? parsed.superLikesUsed || 0 : 0,
    };
  } catch {
    return fallback;
  }
}

export const usePremiumUsageStore = create((set, get) => ({
  ...getInitialState(),

  persist: () => {
    const { monthKey, weekKey, boostsUsed, superLikesUsed } = get();

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        monthKey,
        weekKey,
        boostsUsed,
        superLikesUsed,
      })
    );
  },

  useBoost: () => {
    set((state) => ({
      ...state,
      monthKey: getMonthKey(),
      boostsUsed: state.monthKey === getMonthKey() ? state.boostsUsed + 1 : 1,
    }));
    get().persist();
  },

  useSuperLike: () => {
    set((state) => ({
      ...state,
      weekKey: getWeekKey(),
      superLikesUsed:
        state.weekKey === getWeekKey() ? state.superLikesUsed + 1 : 1,
    }));
    get().persist();
  },

  syncPeriods: () => {
    const monthKey = getMonthKey();
    const weekKey = getWeekKey();

    set((state) => ({
      monthKey,
      weekKey,
      boostsUsed: state.monthKey === monthKey ? state.boostsUsed : 0,
      superLikesUsed: state.weekKey === weekKey ? state.superLikesUsed : 0,
    }));
    get().persist();
  },
}));