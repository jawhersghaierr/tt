import Button from "@/components/ui/Button/Button";

function EmptyState({
  title = "Aucune donnée",
  description = "Il n’y a rien à afficher pour le moment.",
  actionLabel,
  onAction,
}) {
  return (
    <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center">
      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white/5 text-lg shadow-sm">
        ✨
      </div>

      <h3 className="text-base font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-300">{description}</p>

      {actionLabel ? (
        <div className="mt-5">
          <Button onClick={onAction}>{actionLabel}</Button>
        </div>
      ) : null}
    </div>
  );
}

export default EmptyState;
