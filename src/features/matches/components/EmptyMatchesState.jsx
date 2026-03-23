// EmptyMatchesState.jsx
import React from "react";

export default function EmptyMatchesState() {
  return (
    <div className="flex flex-col items-center justify-center h-64 text-center text-gray-400">
      <span className="text-5xl mb-4">💔</span>
      <div className="font-semibold mb-2">Aucun match pour l’instant</div>
      <div className="text-sm">
        Continue à swiper pour trouver des matches !
      </div>
    </div>
  );
}
