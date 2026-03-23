import { useNavigate } from "react-router-dom";
import AppLayout from "@/layouts/AppLayout";
import Card from "@/components/ui/Card/Card";
import EmptyState from "@/components/common/EmptyState/EmptyState";
import Chip from "@/components/ui/Chip/Chip";
import { useDiscoverHistoryStore } from "@/features/discover/store/discover-history.store";

function MessagesPage() {
  const navigate = useNavigate();

  const likedProfiles = useDiscoverHistoryStore((state) => state.likedProfiles);

  const conversations = likedProfiles.filter(
    (profile) => profile.likedYou === true,
  );

  return (
    <AppLayout title="Messages">
      <section className="space-y-4">
        <Card className="bg-slate-900 text-white">
          <p className="text-sm text-slate-300">Messagerie</p>
          <h2 className="mt-1 text-2xl font-semibold tracking-tight">
            Tes conversations
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-300">
            Retrouve ici tous tes matchs et ouvre une conversation.
          </p>
        </Card>

        {!conversations.length ? (
          <EmptyState
            title="Aucune conversation"
            description="Quand tu auras un match, il apparaîtra ici."
            actionLabel="Aller sur Discover"
            onAction={() => navigate("/")}
          />
        ) : (
          <div className="space-y-3">
            {conversations.map((profile) => (
              <button
                key={profile.id}
                type="button"
                onClick={() => navigate(`/messages/${profile.id}`)}
                className="block w-full bg-transparent text-left"
              >
                <Card className="transition hover:border-slate-300">
                  <div className="flex items-center gap-3">
                    <div className="h-14 w-14 overflow-hidden rounded-2xl bg-slate-100">
                      <img
                        src={profile.image}
                        alt={profile.name}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-3">
                        <h3 className="truncate text-sm font-semibold text-white">
                          {profile.name}, {profile.age}
                        </h3>
                        <Chip active>Nouveau</Chip>
                      </div>

                      <p className="mt-1 truncate text-sm text-slate-300">
                        {profile.title}
                      </p>

                      <p className="mt-1 truncate text-xs text-slate-500">
                        Appuie pour ouvrir la conversation
                      </p>
                    </div>
                  </div>
                </Card>
              </button>
            ))}
          </div>
        )}
      </section>
    </AppLayout>
  );
}

export default MessagesPage;
