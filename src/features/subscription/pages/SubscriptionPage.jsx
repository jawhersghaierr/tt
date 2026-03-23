import AppLayout from "@/layouts/AppLayout";
import Card from "@/components/ui/Card/Card";
import {
  SUBSCRIPTION_PLANS,
  PLAN_ORDER,
} from "@/features/subscription/data/plans.data";
import { useSubscriptionStore } from "@/features/subscription/store/subscription.store";
import PlanCard from "@/features/subscription/components/PlanCard";

function SubscriptionPage() {
  const currentPlan = useSubscriptionStore((state) => state.currentPlan);
  const setPlan = useSubscriptionStore((state) => state.setPlan);

  return (
    <AppLayout title="Abonnement">
      <section className="space-y-4">
        <Card className="bg-slate-900 text-white">
          <p className="text-sm text-slate-300">Premium</p>
          <h2 className="mt-1 text-2xl font-semibold tracking-tight">
            Passe au niveau supérieur
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-300">
            Débloque plus de visibilité, plus d’actions et une meilleure
            expérience de matching.
          </p>
        </Card>

        {PLAN_ORDER.map((planKey) => {
          const plan = SUBSCRIPTION_PLANS[planKey];

          return (
            <PlanCard
              key={plan.id}
              plan={plan}
              isCurrent={currentPlan === plan.id}
              onSelect={() => setPlan(plan.id)}
            />
          );
        })}
      </section>
    </AppLayout>
  );
}

export default SubscriptionPage;
