// matches.mock.js
import { mockProfiles } from '../../discover/data/profiles.mock';

// Un match = profil liké ET likedYou: true
export const matchesMock = mockProfiles
  .filter(profile => profile.likedYou)
  .map(profile => ({
    ...profile,
    matchId: profile.id,
    lastMessage: '', // à remplir par la suite
    seen: false,
  }));
