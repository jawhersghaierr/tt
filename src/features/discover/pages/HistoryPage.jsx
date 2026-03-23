import AppLayout from "@/layouts/AppLayout";
import Card from "@/components/ui/Card/Card";
import Chip from "@/components/ui/Chip/Chip";
import EmptyState from "@/components/common/EmptyState/EmptyState";
import Button from "@/components/ui/Button/Button";
import { useDiscoverHistoryStore } from "@/features/discover/store/discover-history.store";

function HistorySection({ title, items, tone = "default" }) {
  if (!items.length) {
    return (
      <Card>
        <h3 className="text-base font-semibold text-white">{title}</h3>
        <p className="mt-2 text-sm text-slate-500">
          Aucun élément pour le moment.
        </p>
      </Card>
    );
  }

  return (
    <Card>
      <h3 className="text-base font-semibold text-white">{title}</h3>

      <div className="mt-4 space-y-3">
        {items.map((profile) => (
          <div
            key={`${title}-${profile.id}`}
            className="flex items-center gap-3 rounded-2xl bg-slate-50 p-3"
          >
            <img
              src={profile.image}
              alt={profile.name}
              className="h-14 w-14 rounded-2xl object-cover"
            />

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-white">
                {profile.name}, {profile.age}
              </p>
              <p className="truncate text-xs text-slate-500">{profile.title}</p>
            </div>

            <Chip active={tone === "like"}>
              {profile.superLiked
                ? "Super Like"
                : tone === "like"
                  ? "Like"
                  : "Pass"}
            </Chip>
          </div>
        ))}
      </div>
    </Card>
  );
}

function HistoryPage() {
  const likedProfiles = useDiscoverHistoryStore((state) => state.likedProfiles);
  const passedProfiles = useDiscoverHistoryStore(
    (state) => state.passedProfiles,
  );
  const clearHistory = useDiscoverHistoryStore((state) => state.clearHistory);

  const hasData = likedProfiles.length > 0 || passedProfiles.length > 0;

  return (
    <AppLayout title="Historique">
      <section className="space-y-4">
        {!hasData ? (
          <EmptyState
            title="Aucun historique"
            description="Tes likes et tes pass apparaîtront ici."
          />
        ) : (
          <>
            <HistorySection
              title="Profils likés"
              items={likedProfiles}
              tone="like"
            />
            <HistorySection
              title="Profils passés"
              items={passedProfiles}
              tone="pass"
            />

            <Button
              type="button"
              variant="outline"
              fullWidth
              onClick={clearHistory}
            >
              Vider l’historique
            </Button>
          </>
        )}
      </section>
    </AppLayout>
  );
}

export default HistoryPage;
