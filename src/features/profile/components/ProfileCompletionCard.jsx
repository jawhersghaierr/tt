import Card from "@/components/ui/Card/Card";
import Chip from "@/components/ui/Chip/Chip";

function ProfileCompletionCard({ progress, onGoToSection }) {
  const encouragement =
    progress.percentage < 40
      ? "Commence par remplir les infos essentielles."
      : progress.percentage < 80
        ? "Très bon début, ton profil prend forme."
        : "Excellent, ton profil est presque complet.";
  return (
    <Card className="overflow-hidden bg-slate-900 text-white">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-slate-300">Complétion du profil</p>
          <h2 className="mt-1 text-2xl font-semibold tracking-tight">
            {progress.percentage}%
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-300">
            {encouragement}
          </p>
        </div>

        <div className="rounded-2xl bg-white/5/10 px-3 py-2 text-sm font-medium backdrop-blur">
          {progress.completed}/{progress.total}
        </div>
      </div>

      <div className="mt-5 h-3 w-full overflow-hidden rounded-full bg-white/5/10">
        <div
          className="h-full rounded-full bg-white/5 transition-all duration-300"
          style={{ width: `${progress.percentage}%` }}
        />
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {progress.sections.map((section) => (
          <button
            key={section.key}
            type="button"
            onClick={() => onGoToSection(section.key)}
            className="bg-transparent"
          >
            <Chip className="border-0 bg-white/5/10 text-white hover:bg-white/5/15">
              {section.label} · {section.percentage}%
            </Chip>
          </button>
        ))}
      </div>
    </Card>
  );
}

export default ProfileCompletionCard;
