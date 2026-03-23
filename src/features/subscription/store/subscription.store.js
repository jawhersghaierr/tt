import { create } from "zustand";

const STORAGE_KEY = "tineritt-subscription";

function getInitialPlan() {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved || "free";
}

export const useSubscriptionStore = create((set) => ({
  currentPlan: getInitialPlan(),

  setPlan: (plan) => {
    localStorage.setItem(STORAGE_KEY, plan);
    set({ currentPlan: plan });
  },

  resetPlan: () => {
    localStorage.removeItem(STORAGE_KEY);
    set({ currentPlan: "free" });
  },
}));