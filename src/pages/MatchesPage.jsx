import { useNavigate } from "react-router-dom";
import AppLayout from "@/layouts/AppLayout";
import Card from "@/components/ui/Card/Card";
import Button from "@/components/ui/Button/Button";
import Chip from "@/components/ui/Chip/Chip";
import EmptyState from "@/components/common/EmptyState/EmptyState";
import { useDiscoverHistoryStore } from "@/features/discover/store/discover-history.store";

function MatchesPage() {
  const navigate = useNavigate();

  const likedProfiles = useDiscoverHistoryStore((state) => state.likedProfiles);

  const matches = likedProfiles.filter((profile) => profile.likedYou === true);

  return (
    <AppLayout title="Matches">
      <section className="space-y-4">
        <Card className="bg-slate-900 text-white">
          <p className="text-sm text-slate-300">Tes connexions</p>
          <h2 className="mt-1 text-2xl font-semibold tracking-tight">
            Matches
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-300">
            Retrouve ici les profils avec lesquels le like est mutuel.
          </p>
        </Card>

        {!matches.length ? (
          <EmptyState
            title="Aucun match pour le moment"
            description="Like des profils qui t’ont aussi liké pour créer des connexions."
            actionLabel="Retour à Discover"
            onAction={() => navigate("/")}
          />
        ) : (
          <div className="space-y-3">
            {matches.map((profile) => (
              <Card key={profile.id} className="overflow-hidden p-0">
                <div className="flex items-center gap-4 p-4">
                  <div className="h-16 w-16 overflow-hidden rounded-2xl bg-slate-100">
                    <img
                      src={profile.image}
                      alt={profile.name}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="truncate text-base font-semibold text-white">
                        {profile.name}, {profile.age}
                      </h3>
                      <Chip active>Match</Chip>
                    </div>

                    <p className="mt-1 truncate text-sm text-slate-300">
                      {profile.title}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">Nouveau match</p>
                  </div>
                </div>

                <div className="border-t border-slate-100 p-4">
                  <Button
                    fullWidth
                    onClick={() => navigate(`/messages/${profile.id}`)}
                  >
                    Ouvrir la conversation
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </section>
    </AppLayout>
  );
}

export default MatchesPage;
