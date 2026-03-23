import { create } from "zustand";

const STORAGE_KEY = "tineritt-discover-history";

function getInitialState() {
  const raw = localStorage.getItem(STORAGE_KEY);

  if (!raw) {
    return {
      likedProfiles: [],
      passedProfiles: [],
      actionStack: [],
    };
  }

  try {
    return JSON.parse(raw);
  } catch {
    return {
      likedProfiles: [],
      passedProfiles: [],
      actionStack: [],
    };
  }
}

export const useDiscoverHistoryStore = create((set, get) => ({
  ...getInitialState(),

  persist: () => {
    const { likedProfiles, passedProfiles, actionStack } = get();

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        likedProfiles,
        passedProfiles,
        actionStack,
      })
    );
  },

  addLike: (profile) => {
    set((state) => ({
      likedProfiles: [profile, ...state.likedProfiles],
      actionStack: [{ type: "like", profile }, ...state.actionStack],
    }));
    get().persist();
  },

  addPass: (profile) => {
    set((state) => ({
      passedProfiles: [profile, ...state.passedProfiles],
      actionStack: [{ type: "pass", profile }, ...state.actionStack],
    }));
    get().persist();
  },

  popLastAction: () => {
    const { actionStack, likedProfiles, passedProfiles } = get();

    if (!actionStack.length) {
      return null;
    }

    const [lastAction, ...restActions] = actionStack;

    let nextLiked = likedProfiles;
    let nextPassed = passedProfiles;

    if (lastAction.type === "like") {
      nextLiked = likedProfiles.filter(
        (item) => item.id !== lastAction.profile.id
      );
    }

    if (lastAction.type === "pass") {
      nextPassed = passedProfiles.filter(
        (item) => item.id !== lastAction.profile.id
      );
    }

    set({
      likedProfiles: nextLiked,
      passedProfiles: nextPassed,
      actionStack: restActions,
    });

    get().persist();
    return lastAction;
  },

  clearHistory: () => {
    set({
      likedProfiles: [],
      passedProfiles: [],
      actionStack: [],
    });
    localStorage.removeItem(STORAGE_KEY);
  },
}));