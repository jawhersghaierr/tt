function hasText(value) {
  return Boolean(String(value || '').trim())
}

export function getProfileProgressDetails(profile) {
  return {
    media: [
      { label: 'Photo de profil', done: Boolean(profile.avatar) },
      { label: 'Vidéo de présentation', done: Boolean(profile.introVideo) },
    ],
    identity: [
      { label: 'Nom complet', done: hasText(profile.fullName) },
      { label: 'Headline', done: hasText(profile.headline) },
      { label: 'Localisation', done: hasText(profile.location) },
      {
        label: 'Bio complète',
        done: hasText(profile.bio) && profile.bio.trim().length >= 20,
      },
      { label: 'Type de profil', done: hasText(profile.role) },
    ],
    professional: [
      { label: 'Expérience', done: hasText(profile.experience) },
      { label: 'Mode de travail', done: hasText(profile.workMode) },
      { label: 'Type de contrat', done: hasText(profile.contractType) },
      {
        label: 'Poste recherché',
        done:
          profile.role === 'candidate' || profile.role === 'hybrid'
            ? hasText(profile.lookingFor)
            : true,
      },
      {
        label: 'Entreprise',
        done:
          profile.role === 'recruiter' || profile.role === 'hybrid'
            ? hasText(profile.company)
            : true,
      },
      { label: 'Compétences', done: Array.isArray(profile.skills) && profile.skills.length > 0 },
    ],
    preferences: [
      {
        label: 'Profils recherchés',
        done:
          Array.isArray(profile.preferredRoles) &&
          profile.preferredRoles.length > 0,
      },
      {
        label: 'Localisations préférées',
        done:
          Array.isArray(profile.preferredLocations) &&
          profile.preferredLocations.length > 0,
      },
    ],
  }
}