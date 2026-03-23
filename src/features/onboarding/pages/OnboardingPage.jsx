import { useNavigate } from "react-router-dom";
import AppLayout from "@/layouts/AppLayout";
import Card from "@/components/ui/Card/Card";
import Button from "@/components/ui/Button/Button";
import Chip from "@/components/ui/Chip/Chip";
import { useAuthStore } from "@/app/store/auth.store";
import { useState } from "react";

const roles = ["candidate", "recruiter", "hybrid"];

function OnboardingPage() {
  const navigate = useNavigate();
  const completeOnboarding = useAuthStore((state) => state.completeOnboarding);
  const [selectedRole, setSelectedRole] = useState("candidate");

  const handleContinue = () => {
    completeOnboarding();
    navigate("/profile/edit", { replace: true });
  };

  return (
    <AppLayout title="Onboarding">
      <section className="space-y-4">
        <Card>
          <p className="text-sm text-slate-500">Étape 1 sur 3</p>
          <h2 className="mt-1 text-xl font-semibold tracking-tight text-white">
            Configure ton profil
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-300">
            On préparera ici le choix du type de compte, les préférences et les
            informations clés.
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {roles.map((role) => (
              <button
                key={role}
                type="button"
                onClick={() => setSelectedRole(role)}
                className="bg-transparent"
              >
                <Chip active={selectedRole === role}>{role}</Chip>
              </button>
            ))}
          </div>

          <div className="mt-5">
            <Button onClick={handleContinue}>Continuer</Button>
          </div>
        </Card>
      </section>
    </AppLayout>
  );
}

export default OnboardingPage;
