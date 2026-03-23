import { mockProfiles } from '@/features/discover/data/profiles.mock'

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const discoverService = {
  getProfiles: async () => {
    await wait(300)
    return mockProfiles
  },
}

export default discoverService