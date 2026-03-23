// matches.service.js
import { matchesMock } from '../data/matches.mock';

export function fetchMatches() {
  // Simule un fetch asynchrone
  return Promise.resolve(matchesMock);
}

export function getMatchById(matchId) {
  return matchesMock.find(m => m.matchId === matchId);
}
