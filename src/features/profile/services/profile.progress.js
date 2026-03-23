function isFilled(value) {
  if (Array.isArray(value)) return value.length > 0
  return Boolean(String(value || '').trim())
}

export function getProfileProgress(profile) {
  const mediaChecks = [
    Boolean(profile.avatar),
    Boolean(profile.introVideo),
  ]

  const identityChecks = [
    isFilled(profile.fullName),
    isFilled(profile.headline),
    isFilled(profile.location),
    isFilled(profile.bio) && profile.bio.trim().length >= 20,
    isFilled(profile.role),
  ]

  const professionalChecks = [
    isFilled(profile.experience),
    isFilled(profile.workMode),
    isFilled(profile.contractType),
    profile.role === 'candidate' || profile.role === 'hybrid'
      ? isFilled(profile.lookingFor)
      : true,
    profile.role === 'recruiter' || profile.role === 'hybrid'
      ? isFilled(profile.company)
      : true,
    isFilled(profile.skills),
  ]

  const preferencesChecks = [
    isFilled(profile.preferredRoles),
    isFilled(profile.preferredLocations),
  ]

  const sections = [
    {
      key: 'media',
      label: 'Média',
      completed: mediaChecks.filter(Boolean).length,
      total: mediaChecks.length,
    },
    {
      key: 'identity',
      label: 'Identité',
      completed: identityChecks.filter(Boolean).length,
      total: identityChecks.length,
    },
    {
      key: 'professional',
      label: 'Infos pro',
      completed: professionalChecks.filter(Boolean).length,
      total: professionalChecks.length,
    },
    {
      key: 'preferences',
      label: 'Préférences',
      completed: preferencesChecks.filter(Boolean).length,
      total: preferencesChecks.length,
    },
  ].map((section) => {
    const percentage =
      section.total === 0
        ? 0
        : Math.round((section.completed / section.total) * 100)

    return {
      ...section,
      percentage,
      isComplete: section.completed === section.total,
    }
  })

  const completed = sections.reduce((sum, section) => sum + section.completed, 0)
  const total = sections.reduce((sum, section) => sum + section.total, 0)

  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100)

  return {
    percentage,
    completed,
    total,
    sections,
  }
}