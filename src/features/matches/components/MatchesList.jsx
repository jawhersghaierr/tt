// MatchesList.jsx
import React from "react";
import MatchCard from "./MatchCard";

export default function MatchesList({ matches, onOpen }) {
  return (
    <div>
      {matches.map((match) => (
        <MatchCard key={match.matchId} match={match} onOpen={onOpen} />
      ))}
    </div>
  );
}
