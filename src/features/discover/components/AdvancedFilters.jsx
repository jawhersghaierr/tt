import { useMemo, useState } from "react";
import Input from "@/components/ui/Input/Input";
import Button from "@/components/ui/Button/Button";
import Card from "@/components/ui/Card/Card";

function AdvancedFilters({ filters, onChange, onReset }) {
  const [isOpen, setIsOpen] = useState(false);

  const hasActiveFilters = useMemo(() => {
    return Boolean(
      filters.location?.trim() ||
      filters.skill?.trim() ||
      filters.experience?.trim(),
    );
  }, [filters]);

  return (
    <Card>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex w-full items-center justify-between bg-transparent text-left"
      >
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-semibold text-white">
              Filtres avancés
            </h3>

            {hasActiveFilters ? (
              <span className="rounded-full bg-violet-500/20 px-2 py-0.5 text-[10px] font-medium text-violet-300">
                Actifs
              </span>
            ) : null}
          </div>

          <p className="mt-1 text-sm text-slate-300">
            Affine la découverte par lieu, compétence et expérience.
          </p>
        </div>

        <span
          className={`ml-4 text-sm text-slate-400 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          ▼
        </span>
      </button>

      <div
        className={`grid transition-all duration-300 ${
          isOpen
            ? "mt-4 grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="space-y-3">
            <Input
              label="Localisation"
              value={filters.location}
              onChange={(event) => onChange("location", event.target.value)}
              placeholder="Paris"
            />

            <Input
              label="Compétence"
              value={filters.skill}
              onChange={(event) => onChange("skill", event.target.value)}
              placeholder="React"
            />

            <Input
              label="Expérience minimum"
              value={filters.experience}
              onChange={(event) => onChange("experience", event.target.value)}
              placeholder="3 ans"
            />

            <Button type="button" variant="outline" fullWidth onClick={onReset}>
              Réinitialiser les filtres
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default AdvancedFilters;
