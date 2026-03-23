import { useState } from "react";
import AppLayout from "@/layouts/AppLayout";
import FeatureGate from "@/features/subscription/components/FeatureGate";
import Card from "@/components/ui/Card/Card";
import Button from "@/components/ui/Button/Button";

function FirstMessageContent() {
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSend = () => {
    if (!message.trim()) return;
    setSent(true);
  };

  return (
    <Card>
      <h3 className="text-lg font-semibold text-white">Message avant match</h3>
      <p className="mt-2 text-sm leading-6 text-slate-300">
        Envoie un premier message premium avant même qu’un match soit établi.
      </p>

      <textarea
        value={message}
        onChange={(event) => {
          setMessage(event.target.value);
          setSent(false);
        }}
        placeholder="Écris un message d’introduction..."
        className="mt-4 min-h-[140px] w-full rounded-2xl border border-slate-300 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-400 focus:border-slate-900"
      />

      {sent ? (
        <p className="mt-3 text-sm text-emerald-600">Message premium envoyé.</p>
      ) : null}

      <div className="mt-4">
        <Button type="button" onClick={handleSend}>
          Envoyer
        </Button>
      </div>
    </Card>
  );
}

function FirstMessagePage() {
  return (
    <AppLayout title="First Message">
      <FeatureGate
        requiredPlan="platinum"
        title="Message avant match"
        description="Passe à Platinum pour contacter un profil avant le match."
      >
        <FirstMessageContent />
      </FeatureGate>
    </AppLayout>
  );
}

export default FirstMessagePage;
