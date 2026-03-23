import { useNavigate } from "react-router-dom";
import AppLayout from "@/layouts/AppLayout";
import Card from "@/components/ui/Card/Card";
import Input from "@/components/ui/Input/Input";
import Button from "@/components/ui/Button/Button";
import { useAuthStore } from "@/app/store/auth.store";
import { useState } from "react";

function LoginPage() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (field) => (event) => {
    setForm((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    login({
      id: 1,
      name: "Jawhar",
      email: form.email || "demo@tineritt.app",
      role: "candidate",
    });

    navigate("/onboarding", { replace: true });
  };

  return (
    <AppLayout title="Connexion" showBottomNav={false}>
      <section className="space-y-4">
        <Card>
          <h2 className="text-xl font-semibold tracking-tight text-white">
            Bon retour
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-300">
            Connecte-toi pour accéder à ton espace TINDER-ITT.
          </p>

          <form className="mt-5 space-y-3" onSubmit={handleSubmit}>
            <Input
              label="Email"
              type="email"
              placeholder="nom@entreprise.com"
              value={form.email}
              onChange={handleChange("email")}
            />
            <Input
              label="Mot de passe"
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange("password")}
            />
            <Button type="submit" fullWidth>
              Se connecter
            </Button>
          </form>
        </Card>
      </section>
    </AppLayout>
  );
}

export default LoginPage;
