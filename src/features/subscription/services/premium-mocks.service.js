import { mockProfiles } from "@/features/discover/data/profiles.mock";

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const premiumMocksService = {
  getLikedYouProfiles: async () => {
    await wait(250);
    return mockProfiles.filter((profile) => profile.likedYou);
  },
};

export default premiumMocksService;