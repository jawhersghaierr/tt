import { PLAN_ORDER } from "@/features/subscription/data/plans.data";

export function hasPlanAccess(currentPlan, requiredPlan) {
  const currentIndex = PLAN_ORDER.indexOf(currentPlan || "free");
  const requiredIndex = PLAN_ORDER.indexOf(requiredPlan || "free");

  return currentIndex >= requiredIndex;
}

export function getUpgradeOptions(currentPlan) {
  const currentIndex = PLAN_ORDER.indexOf(currentPlan || "free");
  return PLAN_ORDER.slice(currentIndex + 1);
}