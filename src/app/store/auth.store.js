import { create } from 'zustand'

const AUTH_STORAGE_KEY = 'tineritt-auth'

function getInitialAuthState() {
  const saved = localStorage.getItem(AUTH_STORAGE_KEY)

  if (!saved) {
    return {
      user: null,
      isAuthenticated: false,
      onboardingCompleted: false,
    }
  }

  try {
    const parsed = JSON.parse(saved)

    return {
      user: parsed.user || null,
      isAuthenticated: Boolean(parsed.isAuthenticated),
      onboardingCompleted: Boolean(parsed.onboardingCompleted),
    }
  } catch {
    return {
      user: null,
      isAuthenticated: false,
      onboardingCompleted: false,
    }
  }
}

export const useAuthStore = create((set, get) => ({
  ...getInitialAuthState(),

  persist: () => {
    const { user, isAuthenticated, onboardingCompleted } = get()

    localStorage.setItem(
      AUTH_STORAGE_KEY,
      JSON.stringify({
        user,
        isAuthenticated,
        onboardingCompleted,
      })
    )
  },

  login: (user) => {
    set({
      user,
      isAuthenticated: true,
    })
    get().persist()
  },

  logout: () => {
    set({
      user: null,
      isAuthenticated: false,
      onboardingCompleted: false,
    })
    localStorage.removeItem(AUTH_STORAGE_KEY)
  },

  completeOnboarding: () => {
    set({
      onboardingCompleted: true,
    })
    get().persist()
  },
}))