import Button from "@/components/ui/Button/Button";
import Card from "@/components/ui/Card/Card";
import { useSubscriptionStore } from "@/features/subscription/store/subscription.store";
import { hasPlanAccess } from "@/features/subscription/services/subscription.logic";
import { useNavigate } from "react-router-dom";

function FeatureGate({ requiredPlan = "plus", children, title, description }) {
  const navigate = useNavigate();
  const currentPlan = useSubscriptionStore((state) => state.currentPlan);

  const allowed = hasPlanAccess(currentPlan, requiredPlan);

  if (allowed) return children;

  return (
    <Card>
      <h3 className="text-base font-semibold text-white">
        {title || "Fonctionnalité premium"}
      </h3>
      <p className="mt-2 text-sm leading-6 text-slate-300">
        {description ||
          `Cette fonctionnalité nécessite au minimum le plan ${requiredPlan}.`}
      </p>

      <div className="mt-4">
        <Button type="button" onClick={() => navigate("/subscription")}>
          Voir les abonnements
        </Button>
      </div>
    </Card>
  );
}

export default FeatureGate;
