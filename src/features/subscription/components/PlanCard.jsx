import Button from "@/components/ui/Button/Button";
import Card from "@/components/ui/Card/Card";
import Chip from "@/components/ui/Chip/Chip";

function PlanCard({ plan, isCurrent, onSelect }) {
  return (
    <Card className={isCurrent ? "border-slate-900 ring-1 ring-slate-900" : ""}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-white">{plan.name}</h3>
          <p className="mt-1 text-sm text-slate-300">{plan.priceLabel}</p>
        </div>

        {isCurrent ? <Chip active>Actuel</Chip> : null}
      </div>

      <ul className="mt-4 space-y-2 text-sm text-slate-300">
        {plan.features.map((feature) => (
          <li key={feature}>• {feature}</li>
        ))}
      </ul>

      <div className="mt-5">
        <Button
          type="button"
          fullWidth
          variant={isCurrent ? "secondary" : "primary"}
          onClick={onSelect}
          disabled={isCurrent}
        >
          {isCurrent ? "Plan actif" : `Passer à ${plan.name}`}
        </Button>
      </div>
    </Card>
  );
}

export default PlanCard;
