import { useMemo, useState } from 'react'
import { initialProfile } from '@/features/profile/data/profile.initial'
import {
  getProfileFromStorage,
  saveProfileToStorage,
} from '@/features/profile/services/profile.storage'
import { validateProfile } from '@/features/profile/services/profile.validation'

export function useProfileForm() {
  const savedProfile = useMemo(() => getProfileFromStorage(), [])
  const [profile, setProfile] = useState(savedProfile || initialProfile)
  const [errors, setErrors] = useState({})
  const [successMessage, setSuccessMessage] = useState('')

  const setField = (field, value) => {
    setProfile((prev) => ({
      ...prev,
      [field]: value,
    }))

    setErrors((prev) => ({
      ...prev,
      [field]: '',
      media: field === 'avatar' || field === 'introVideo' ? '' : prev.media,
    }))

    setSuccessMessage('')
  }

  const validate = () => {
    const nextErrors = validateProfile(profile)
    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const save = () => {
    const isValid = validate()

    if (!isValid) {
      setSuccessMessage('')
      return false
    }

    saveProfileToStorage(profile)
    setSuccessMessage('Profil sauvegardé avec succès.')
    return true
  }

  return {
    profile,
    setProfile,
    setField,
    errors,
    successMessage,
    save,
    setErrors,
  }
}