import Chip from "@/components/ui/Chip/Chip";
import { cn } from "@/lib/cn";

function DiscoverCard({
  profile,
  style,
  overlay,
  onPointerDown,
  onPointerMove,
  onPointerUp,
  isBehind = false,
}) {
  if (!profile) return null;

  return (
    <div
      className={cn(
        "overflow-hidden rounded-[32px] border border-white/10 bg-slate-900/70 shadow-[0_25px_70px_rgba(0,0,0,0.45)] backdrop-blur-xl select-none",
        isBehind && "scale-[0.97] opacity-50",
      )}
      style={style}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      <div className="relative h-[460px] w-full overflow-hidden bg-slate-800">
        <img
          src={profile.image}
          alt={profile.name}
          className="h-full w-full object-cover"
          draggable={false}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />

        {overlay ? (
          <div
            className={cn(
              "absolute top-5 rounded-2xl border-2 px-4 py-2 text-sm font-bold tracking-[0.2em]",
              overlay.label === "LIKE"
                ? "left-5 rotate-[-10deg] border-emerald-400 text-emerald-300"
                : "right-5 rotate-[10deg] border-rose-400 text-rose-300",
            )}
          >
            {overlay.label}
          </div>
        ) : null}

        <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
          <div className="flex items-end justify-between gap-3">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight">
                {profile.name}, {profile.age}
              </h2>
              <p className="mt-1 text-sm text-slate-200">{profile.title}</p>
            </div>

            <span className="rounded-full border border-white/10 bg-white/5/10 px-3 py-1 text-xs font-medium backdrop-blur">
              {profile.role}
            </span>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <span className="rounded-full border border-white/10 bg-white/5/10 px-3 py-1.5 text-xs backdrop-blur">
              {profile.location}
            </span>
            <span className="rounded-full border border-white/10 bg-white/5/10 px-3 py-1.5 text-xs backdrop-blur">
              {profile.experience}
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-4 p-5 text-slate-100">
        <div>
          <h3 className="text-sm font-semibold text-white">À propos</h3>
          <p className="mt-2 text-sm leading-6 text-slate-300">{profile.bio}</p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white">Compétences</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {profile.skills.map((skill) => (
              <Chip key={skill}>{skill}</Chip>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DiscoverCard;
