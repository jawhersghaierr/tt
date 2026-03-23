import { useEffect, useMemo, useState } from "react";
import discoverService from "@/features/discover/services/discover.service";
import { useSubscriptionStore } from "@/features/subscription/store/subscription.store";
import { useUsageStore } from "@/features/subscription/store/usage.store";
import { usePremiumUsageStore } from "@/features/subscription/store/premium-usage.store";
import { useDiscoverHistoryStore } from "@/features/discover/store/discover-history.store";
import {
  canUseFeature,
  getPlanLimits,
} from "@/features/subscription/services/subscription.access";

export function useDiscover() {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRole, setSelectedRole] = useState("All");
  const [advancedFilters, setAdvancedFilters] = useState({
    location: "",
    skill: "",
    experience: "",
  });

  const currentPlan = useSubscriptionStore((state) => state.currentPlan);
  const swipesUsed = useUsageStore((state) => state.swipesUsed);
  const incrementSwipes = useUsageStore((state) => state.incrementSwipes);

  const boostsUsed = usePremiumUsageStore((state) => state.boostsUsed);
  const superLikesUsed = usePremiumUsageStore((state) => state.superLikesUsed);
  const useBoost = usePremiumUsageStore((state) => state.useBoost);
  const useSuperLike = usePremiumUsageStore((state) => state.useSuperLike);
  const syncPeriods = usePremiumUsageStore((state) => state.syncPeriods);

  const addLike = useDiscoverHistoryStore((state) => state.addLike);
  const addPass = useDiscoverHistoryStore((state) => state.addPass);
  const popLastAction = useDiscoverHistoryStore((state) => state.popLastAction);

  const limits = getPlanLimits(currentPlan);

  const hasUnlimitedSwipes = limits.dailySwipes === Infinity;
  const swipesRemaining = hasUnlimitedSwipes
    ? Infinity
    : Math.max(limits.dailySwipes - swipesUsed, 0);

  const canUseAdvancedFilters = canUseFeature(currentPlan, "advancedFilters");
  const canUseRewind = canUseFeature(currentPlan, "rewind");

  const boostsRemaining = Math.max((limits.monthlyBoosts || 0) - boostsUsed, 0);
  const superLikesRemaining = Math.max(
    (limits.weeklySuperLikes || 0) - superLikesUsed,
    0
  );

  useEffect(() => {
    syncPeriods();
  }, [syncPeriods]);

  useEffect(() => {
    let isMounted = true;

    const loadProfiles = async () => {
      try {
        setLoading(true);
        const data = await discoverService.getProfiles();

        if (isMounted) {
          setProfiles(data);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadProfiles();

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredProfiles = useMemo(() => {
    let result = profiles;

    if (selectedRole !== "All") {
      result = result.filter((profile) => profile.role === selectedRole);
    }

    if (canUseAdvancedFilters) {
      if (advancedFilters.location.trim()) {
        result = result.filter((profile) =>
          profile.location
            .toLowerCase()
            .includes(advancedFilters.location.toLowerCase())
        );
      }

      if (advancedFilters.skill.trim()) {
        result = result.filter((profile) =>
          profile.skills.some((skill) =>
            skill.toLowerCase().includes(advancedFilters.skill.toLowerCase())
          )
        );
      }

      if (advancedFilters.experience.trim()) {
        result = result.filter((profile) =>
          profile.experience
            .toLowerCase()
            .includes(advancedFilters.experience.toLowerCase())
        );
      }
    }

    return result;
  }, [profiles, selectedRole, advancedFilters, canUseAdvancedFilters]);

  const currentProfile = filteredProfiles[0] || null;
  const nextProfile = filteredProfiles[1] || null;
  const canSwipe = hasUnlimitedSwipes || swipesRemaining > 0;

  const removeProfile = (profileId) => {
    setProfiles((prev) => prev.filter((profile) => profile.id !== profileId));
    incrementSwipes();
  };

  const handlePass = () => {
    if (!currentProfile || !canSwipe) return;
    addPass(currentProfile);
    removeProfile(currentProfile.id);
  };

  const handleLike = () => {
    if (!currentProfile || !canSwipe) return;
    addLike(currentProfile);
    removeProfile(currentProfile.id);
  };

  const handleSuperLike = () => {
    if (!currentProfile || !canSwipe || superLikesRemaining <= 0) return;
    useSuperLike();
    addLike({
      ...currentProfile,
      superLiked: true,
    });
    removeProfile(currentProfile.id);
  };

  const handleRewind = () => {
    if (!canUseRewind) return;

    const lastAction = popLastAction();
    if (!lastAction?.profile) return;

    setProfiles((prev) => [lastAction.profile, ...prev]);
  };

  const handleBoost = () => {
    if (boostsRemaining <= 0) return false;
    useBoost();
    return true;
  };

  const resetProfiles = async () => {
    setLoading(true);
    const data = await discoverService.getProfiles();
    setProfiles(data);
    setLoading(false);
  };

  const setAdvancedFilter = (key, value) => {
    setAdvancedFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const resetAdvancedFilters = () => {
    setAdvancedFilters({
      location: "",
      skill: "",
      experience: "",
    });
  };

  return {
    profiles: filteredProfiles,
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
  };
}