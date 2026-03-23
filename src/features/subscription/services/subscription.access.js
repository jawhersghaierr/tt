import { PLAN_LIMITS } from "@/features/subscription/data/plan-limits.data";

export function getPlanLimits(plan) {
  return PLAN_LIMITS[plan] || PLAN_LIMITS.free;
}

export function canUseFeature(plan, featureKey) {
  const limits = getPlanLimits(plan);
  return Boolean(limits[featureKey]);
}