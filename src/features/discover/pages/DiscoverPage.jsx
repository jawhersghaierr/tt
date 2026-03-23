import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "@/layouts/AppLayout";
import Card from "@/components/ui/Card/Card";
import Loader from "@/components/common/Loader/Loader";
import EmptyState from "@/components/common/EmptyState/EmptyState";
import Button from "@/components/ui/Button/Button";
import FeatureGate from "@/features/subscription/components/FeatureGate";
import FormAlert from "@/components/common/FormAlert/FormAlert";
import DiscoverFilters from "@/features/discover/components/DiscoverFilters";
import DiscoverCard from "@/features/discover/components/DiscoverCard";
import DiscoverActions from "@/features/discover/components/DiscoverActions";
import AdvancedFilters from "@/features/discover/components/AdvancedFilters";
import { useDiscover } from "@/features/discover/hooks/useDiscover";
import { useSwipeCard } from "@/features/discover/hooks/useSwipeCard";

function DiscoverPage() {
  const navigate = useNavigate();
  const [boostMessage, setBoostMessage] = useState("");

  const {
    currentProfile,
    nextProfile,
    loading,
    selectedRole,
    setSelectedRole,
    handlePass,
    handleLike,
    handleSuperLike,
    handleRewind,
    handleBoost,
    resetProfiles,
    canSwipe,
    swipesRemaining,
    hasUnlimitedSwipes,
    currentPlan,
    canUseAdvancedFilters,
    advancedFilters,
    setAdvancedFilter,
    resetAdvancedFilters,
    canUseRewind,
    boostsRemaining,
    superLikesRemaining,
  } = useDiscover();

  const {
    cardStyle,
    overlay,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
    triggerSwipe,
  } = useSwipeCard({
    onLike: handleLike,
    onPass: handlePass,
  });

  const handleBoostClick = () => {
    const success = handleBoost();

    setBoostMessage(
      success
        ? "Boost activé avec succès."
        : "Aucun boost disponible sur ton plan actuel.",
    );
  };

  return (
    <AppLayout title="Discover">
      <section className="space-y-4">
        <Card className="bg-slate-900 text-white">
          <p className="text-sm text-slate-300">Matching intelligent</p>
          <h2 className="mt-1 text-2xl font-semibold tracking-tight">
            Découvre les meilleurs profils
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-300">
            Explore des candidats et recruteurs dans une expérience mobile-first
            premium.
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate("/likes-you")}
            >
              Likes You
            </Button>

            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate("/first-message")}
            >
              First Message
            </Button>

            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate("/history")}
            >
              Historique
            </Button>
          </div>
        </Card>

        <FormAlert
          type={boostMessage.includes("succès") ? "success" : "error"}
          message={boostMessage}
        />

        <Card>
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-medium text-white">Ton plan</p>
              <p className="mt-1 text-sm capitalize text-slate-300">
                {currentPlan}
              </p>
            </div>

            <div className="text-right">
              <p className="text-sm font-medium text-white">Swipes restants</p>
              <p className="mt-1 text-sm text-slate-300">
                {hasUnlimitedSwipes ? "Illimités" : swipesRemaining}
              </p>
            </div>
          </div>
        </Card>

        <DiscoverFilters
          selectedRole={selectedRole}
          onSelectRole={setSelectedRole}
        />

        {canUseAdvancedFilters ? (
          <AdvancedFilters
            filters={advancedFilters}
            onChange={setAdvancedFilter}
            onReset={resetAdvancedFilters}
          />
        ) : (
          <FeatureGate
            requiredPlan="plus"
            title="Filtres avancés"
            description="Passe à Plus pour filtrer par lieu, compétence et expérience."
          >
            <div />
          </FeatureGate>
        )}

        {loading ? (
          <Loader label="Chargement des profils..." />
        ) : !canSwipe ? (
          <EmptyState
            title="Quota de swipes atteint"
            description="Passe à Plus pour continuer à swiper sans limite."
            actionLabel="Voir les abonnements"
            onAction={() => navigate("/subscription")}
          />
        ) : currentProfile ? (
          <>
            <div className="relative min-h-[640px]">
              {nextProfile ? (
                <div className="absolute inset-x-0 top-4">
                  <DiscoverCard profile={nextProfile} isBehind />
                </div>
              ) : null}

              <div className="absolute inset-x-0 top-0 z-10">
                <DiscoverCard
                  profile={currentProfile}
                  style={cardStyle}
                  overlay={overlay}
                  onPointerDown={handlePointerDown}
                  onPointerMove={handlePointerMove}
                  onPointerUp={handlePointerUp}
                />
              </div>
            </div>

            <DiscoverActions
              onPass={() => triggerSwipe("left")}
              onLike={() => triggerSwipe("right")}
              onRewind={handleRewind}
              onSuperLike={handleSuperLike}
              onBoost={handleBoostClick}
              disabled={!canSwipe}
              canUseRewind={canUseRewind}
              boostsRemaining={boostsRemaining}
              superLikesRemaining={superLikesRemaining}
            />
          </>
        ) : (
          <EmptyState
            title="Plus de profils disponibles"
            description="Tu as parcouru tous les profils disponibles pour ce filtre."
            actionLabel="Recharger"
            onAction={resetProfiles}
          />
        )}
      </section>
    </AppLayout>
  );
}

export default DiscoverPage;
