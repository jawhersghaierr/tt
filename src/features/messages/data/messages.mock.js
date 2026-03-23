// messages.mock.js
export const messagesMock = {
  '1': [
    { fromMe: false, text: 'Salut !', timestamp: Date.now() - 60000 },
    { fromMe: true, text: 'Hello !', timestamp: Date.now() - 30000 },
  ],
  '2': [
    { fromMe: false, text: 'On se parle ?', timestamp: Date.now() - 120000 },
  ],
  // Ajoute d’autres matchId si besoin
};
