export const SUBSCRIPTION_PLANS = {
  free: {
    id: "free",
    name: "Free",
    priceLabel: "Gratuit",
    features: [
      "Swipes limités par jour",
      "Match et chat standard",
      "Profil standard",
    ],
  },
  plus: {
    id: "plus",
    name: "Plus",
    priceLabel: "9,99€ / mois",
    features: [
      "Swipes illimités",
      "Rewind",
      "Filtres avancés",
      "Mode incognito",
      "1 boost / mois",
    ],
  },
  gold: {
    id: "gold",
    name: "Gold",
    priceLabel: "19,99€ / mois",
    features: [
      "Tout Plus",
      "Voir qui t’a liké",
      "Top picks",
      "Super likes",
      "Visibilité renforcée",
    ],
  },
  platinum: {
    id: "platinum",
    name: "Platinum",
    priceLabel: "29,99€ / mois",
    features: [
      "Tout Gold",
      "Likes prioritaires",
      "Message avant match",
      "Mise en avant premium",
      "Fonctionnalités exclusives",
    ],
  },
};

export const PLAN_ORDER = ["free", "plus", "gold", "platinum"];