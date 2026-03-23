const PROFILE_STORAGE_KEY = 'tineritt-profile'

export function saveProfileToStorage(profile) {
  localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile))
}

export function getProfileFromStorage() {
  const raw = localStorage.getItem(PROFILE_STORAGE_KEY)

  if (!raw) return null

  try {
    return JSON.parse(raw)
  } catch {
    return null
  }
}

export function clearProfileStorage() {
  localStorage.removeItem(PROFILE_STORAGE_KEY)
}