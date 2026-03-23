import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AppLayout from "@/layouts/AppLayout";
import Card from "@/components/ui/Card/Card";
import Button from "@/components/ui/Button/Button";
import EmptyState from "@/components/common/EmptyState/EmptyState";
import { useDiscoverHistoryStore } from "@/features/discover/store/discover-history.store";

function ConversationPage() {
  const navigate = useNavigate();
  const { matchId } = useParams();

  const likedProfiles = useDiscoverHistoryStore((state) => state.likedProfiles);

  const matchProfile = useMemo(() => {
    return likedProfiles.find(
      (profile) => String(profile.id) === String(matchId) && profile.likedYou,
    );
  }, [likedProfiles, matchId]);

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "them",
      text: "Salut 👋 Ravi(e) d’avoir matché avec toi.",
      createdAt: "09:41",
    },
    {
      id: 2,
      sender: "me",
      text: "Hello ! Merci, ton profil m’a beaucoup plu.",
      createdAt: "09:43",
    },
  ]);

  const [messageInput, setMessageInput] = useState("");

  const handleSendMessage = () => {
    const value = messageInput.trim();

    if (!value) return;

    const nextMessage = {
      id: Date.now(),
      sender: "me",
      text: value,
      createdAt: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, nextMessage]);
    setMessageInput("");
  };

  if (!matchProfile) {
    return (
      <AppLayout title="Conversation">
        <EmptyState
          title="Conversation introuvable"
          description="Ce match n’existe pas encore ou n’est plus disponible."
          actionLabel="Retour aux matches"
          onAction={() => navigate("/matches")}
        />
      </AppLayout>
    );
  }

  return (
    <AppLayout title="Messages" showBottomNav={false}>
      <section className="flex min-h-[calc(100vh-7rem)] flex-col gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigate("/matches")}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-700 transition hover:bg-slate-200"
            >
              ←
            </button>

            <div className="h-12 w-12 overflow-hidden rounded-2xl bg-slate-100">
              <img
                src={matchProfile.image}
                alt={matchProfile.name}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="min-w-0 flex-1">
              <h2 className="truncate text-base font-semibold text-white">
                {matchProfile.name}, {matchProfile.age}
              </h2>
              <p className="truncate text-sm text-slate-500">
                {matchProfile.title}
              </p>
            </div>
          </div>
        </Card>

        <Card className="flex-1 p-4">
          <div className="flex h-full flex-col gap-3">
            <div className="flex-1 space-y-3 overflow-y-auto">
              {messages.map((message) => {
                const isMe = message.sender === "me";

                return (
                  <div
                    key={message.id}
                    className={`flex ${isMe ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-3xl px-4 py-3 shadow-sm ${
                        isMe
                          ? "bg-slate-900 text-white"
                          : "bg-slate-100 text-white"
                      }`}
                    >
                      <p className="text-sm leading-6">{message.text}</p>
                      <p
                        className={`mt-1 text-[11px] ${
                          isMe ? "text-slate-300" : "text-slate-500"
                        }`}
                      >
                        {message.createdAt}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="border-t border-white/10 pt-4">
              <div className="flex items-end gap-2">
                <textarea
                  value={messageInput}
                  onChange={(event) => setMessageInput(event.target.value)}
                  placeholder="Écrire un message..."
                  className="min-h-[52px] flex-1 rounded-2xl border border-slate-300 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-400 focus:border-slate-900"
                />

                <Button type="button" onClick={handleSendMessage}>
                  Envoyer
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </section>
    </AppLayout>
  );
}

export default ConversationPage;
