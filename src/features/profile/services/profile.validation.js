export function validateProfile(profile) {
  const errors = {}

  if (!profile.avatar && !profile.introVideo) {
    errors.media = 'Ajoute au moins une image ou une vidéo.'
  }

  if (!profile.fullName.trim()) {
    errors.fullName = 'Le nom complet est obligatoire.'
  }

  if (!profile.headline.trim()) {
    errors.headline = 'Le headline est obligatoire.'
  }

  if (!profile.location.trim()) {
    errors.location = 'La localisation est obligatoire.'
  }

  if (!profile.bio.trim()) {
    errors.bio = 'La bio est obligatoire.'
  } else if (profile.bio.trim().length < 20) {
    errors.bio = 'La bio doit contenir au moins 20 caractères.'
  }

  if (!profile.experience.trim()) {
    errors.experience = "L'expérience est obligatoire."
  }

  if ((profile.role === 'candidate' || profile.role === 'hybrid') && !profile.lookingFor.trim()) {
    errors.lookingFor = 'Le poste recherché est obligatoire.'
  }

  if ((profile.role === 'recruiter' || profile.role === 'hybrid') && !profile.company.trim()) {
    errors.company = "L'entreprise est obligatoire."
  }

  if (!profile.contractType.trim()) {
    errors.contractType = 'Le type de contrat est obligatoire.'
  }

  if (!profile.workMode.trim()) {
    errors.workMode = 'Le mode de travail est obligatoire.'
  }

  if (profile.portfolioUrl && !isValidUrl(profile.portfolioUrl)) {
    errors.portfolioUrl = 'Le lien portfolio est invalide.'
  }

  if (profile.linkedinUrl && !isValidUrl(profile.linkedinUrl)) {
    errors.linkedinUrl = 'Le lien LinkedIn est invalide.'
  }

  return errors
}

function isValidUrl(value) {
  try {
    new URL(value)
    return true
  } catch {
    return false
  }
}