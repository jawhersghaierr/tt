const onboardingService = {
  saveStep: async (payload) => {
    console.log('onboarding step:', payload)
    return { success: true }
  },
}

export default onboardingService