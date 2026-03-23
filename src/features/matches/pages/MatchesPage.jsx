// MatchesPage.jsx
import React, { useEffect } from "react";
import { useMatchesStore } from "../store/matches.store";
import MatchesList from "../components/MatchesList";
import EmptyMatchesState from "../components/EmptyMatchesState";
import { useNavigate } from "react-router-dom";

export default function MatchesPage() {
  const { matches, loadMatches, markAsSeen } = useMatchesStore();
  const navigate = useNavigate();

  useEffect(() => {
    loadMatches();
  }, [loadMatches]);

  const handleOpen = (matchId) => {
    markAsSeen(matchId);
    navigate(`/messages/${matchId}`);
  };

  if (!matches.length) return <EmptyMatchesState />;

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Mes Matches</h1>
      <MatchesList matches={matches} onOpen={handleOpen} />
    </div>
  );
}
