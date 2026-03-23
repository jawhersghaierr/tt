// MatchCard.jsx
import React from "react";

export default function MatchCard({ match, onOpen }) {
  return (
    <div
      className="flex items-center p-3 bg-white/5 rounded-lg shadow mb-2 cursor-pointer"
      onClick={() => onOpen(match.matchId)}
    >
      <img
        src={match.image}
        alt={match.name}
        className="w-14 h-14 rounded-full object-cover mr-3"
      />
      <div className="flex-1">
        <div className="font-semibold">{match.name}</div>
        <div className="text-xs text-gray-500">
          {match.headline || match.bio}
        </div>
        <div className="text-xs text-blue-600 mt-1">
          {match.lastMessage
            ? `Dernier message: ${match.lastMessage}`
            : match.seen
              ? "Match vu"
              : "Nouveau match !"}
        </div>
      </div>
      {!match.seen && (
        <span className="ml-2 w-2 h-2 bg-blue-500 rounded-full" />
      )}
    </div>
  );
}
