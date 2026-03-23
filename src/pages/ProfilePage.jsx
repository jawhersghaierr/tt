import { Link, useNavigate } from "react-router-dom";
import AppLayout from "@/layouts/AppLayout";
import Card from "@/components/ui/Card/Card";
import Button from "@/components/ui/Button/Button";
import Chip from "@/components/ui/Chip/Chip";
import { useAuthStore } from "@/app/store/auth.store";
import { useSubscriptionStore } from "@/features/subscription/store/subscription.store";
import PremiumBadge from "@/features/subscription/components/PremiumBadge";
import { getProfileFromStorage } from "@/features/profile/services/profile.storage";

function ProfilePage() {
  const navigate = useNavigate();

  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const currentPlan = useSubscriptionStore((state) => state.currentPlan);

  const savedProfile = getProfileFromStorage();

  const displayName =
    savedProfile?.fullName || user?.name || "Utilisateur inconnu";
  const displayEmail = user?.email || "email@exemple.com";
  const displayHeadline =
    savedProfile?.headline ||
    "Complète ton profil pour améliorer ton matching.";
  const displayLocation = savedProfile?.location || "Non renseignée";
  const displayRole = savedProfile?.role || user?.role || "candidate";
  const displayBio =
    savedProfile?.bio || "Aucune bio renseignée pour le moment.";
  const displayAvatar = savedProfile?.avatar || "";
  const displaySkills = savedProfile?.skills || [];
  const displayExperience = savedProfile?.experience || "Non renseignée";
  const displayCompany = savedProfile?.company || "";
  const displayLookingFor = savedProfile?.lookingFor || "";
  const displayWorkMode = savedProfile?.workMode || "Non renseigné";
  const displayContractType = savedProfile?.contractType || "Non renseigné";
  const displayPreferredRoles = savedProfile?.preferredRoles || [];
  const displayPreferredLocations = savedProfile?.preferredLocations || [];

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <AppLayout title="Profile">
      <div className="space-y-4">
        <Card className="overflow-hidden p-0">
          <div className="h-32 bg-slate-900" />

          <div className="relative px-5 pb-5">
            <div className="-mt-12 flex items-end justify-between gap-4">
              <div className="h-24 w-24 overflow-hidden rounded-3xl border-4 border-white bg-slate-100 shadow-sm">
                {displayAvatar ? (
                  <img
                    src={displayAvatar}
                    alt={displayName}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-2xl font-semibold text-slate-500">
                    {displayName.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>

              <div className="pb-2">
                <PremiumBadge plan={currentPlan} />
              </div>
            </div>

            <div className="mt-4">
              <h2 className="text-2xl font-semibold tracking-tight text-white">
                {displayName}
              </h2>

              <p className="mt-1 text-sm text-slate-300">{displayHeadline}</p>

              <div className="mt-3 flex flex-wrap gap-2">
                <Chip active>{displayRole}</Chip>
                <Chip>{displayLocation}</Chip>
                <Chip>{displayExperience}</Chip>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <Link to="/profile/edit">
                <Button fullWidth>Modifier le profil</Button>
              </Link>

              <Link to="/subscription">
                <Button fullWidth variant="outline">
                  Gérer l’abonnement
                </Button>
              </Link>
            </div>
          </div>
        </Card>

        <Card>
          <h3 className="text-base font-semibold text-white">
            Informations principales
          </h3>

          <div className="mt-4 space-y-3 text-sm text-slate-300">
            <p>
              <span className="font-medium text-white">Email :</span>{" "}
              {displayEmail}
            </p>
            <p>
              <span className="font-medium text-white">Rôle :</span>{" "}
              {displayRole}
            </p>
            <p>
              <span className="font-medium text-white">Localisation :</span>{" "}
              {displayLocation}
            </p>
            <p>
              <span className="font-medium text-white">Mode de travail :</span>{" "}
              {displayWorkMode}
            </p>
            <p>
              <span className="font-medium text-white">Type de contrat :</span>{" "}
              {displayContractType}
            </p>

            {displayCompany ? (
              <p>
                <span className="font-medium text-white">Entreprise :</span>{" "}
                {displayCompany}
              </p>
            ) : null}

            {displayLookingFor ? (
              <p>
                <span className="font-medium text-white">
                  Poste recherché :
                </span>{" "}
                {displayLookingFor}
              </p>
            ) : null}
          </div>
        </Card>

        <Card>
          <h3 className="text-base font-semibold text-white">Bio</h3>
          <p className="mt-3 text-sm leading-6 text-slate-300">{displayBio}</p>
        </Card>

        <Card>
          <h3 className="text-base font-semibold text-white">Compétences</h3>

          <div className="mt-4 flex flex-wrap gap-2">
            {displaySkills.length > 0 ? (
              displaySkills.map((skill) => <Chip key={skill}>{skill}</Chip>)
            ) : (
              <p className="text-sm text-slate-500">
                Aucune compétence renseignée.
              </p>
            )}
          </div>
        </Card>

        <Card>
          <h3 className="text-base font-semibold text-white">Préférences</h3>

          <div className="mt-4 space-y-4">
            <div>
              <p className="text-sm font-medium text-white">
                Profils recherchés
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {displayPreferredRoles.length > 0 ? (
                  displayPreferredRoles.map((role) => (
                    <Chip key={role}>{role}</Chip>
                  ))
                ) : (
                  <p className="text-sm text-slate-500">
                    Aucune préférence renseignée.
                  </p>
                )}
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-white">
                Localisations préférées
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {displayPreferredLocations.length > 0 ? (
                  displayPreferredLocations.map((location) => (
                    <Chip key={location}>{location}</Chip>
                  ))
                ) : (
                  <p className="text-sm text-slate-500">
                    Aucune localisation préférée.
                  </p>
                )}
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <h3 className="text-base font-semibold text-white">Compte</h3>

          <div className="mt-4 space-y-3">
            <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
              <div>
                <p className="text-sm font-medium text-white">Plan actuel</p>
                <p className="text-sm text-slate-500">
                  Gestion de ton abonnement premium
                </p>
              </div>

              <PremiumBadge plan={currentPlan} />
            </div>

            <Link to="/subscription">
              <Button fullWidth variant="outline">
                Voir les offres
              </Button>
            </Link>

            <Button fullWidth variant="ghost" onClick={handleLogout}>
              Se déconnecter
            </Button>
          </div>
        </Card>
      </div>
    </AppLayout>
  );
}

export default ProfilePage;
