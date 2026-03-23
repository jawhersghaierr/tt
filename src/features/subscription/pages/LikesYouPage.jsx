import { useEffect, useState } from "react";
import AppLayout from "@/layouts/AppLayout";
import Loader from "@/components/common/Loader/Loader";
import EmptyState from "@/components/common/EmptyState/EmptyState";
import Card from "@/components/ui/Card/Card";
import Chip from "@/components/ui/Chip/Chip";
import FeatureGate from "@/features/subscription/components/FeatureGate";
import premiumMocksService from "@/features/subscription/services/premium-mocks.service";

function LikesYouContent() {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        setLoading(true);
        const data = await premiumMocksService.getLikedYouProfiles();
        if (mounted) {
          setProfiles(data);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    load();

    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return <Loader label="Chargement des likes reçus..." />;
  }

  if (!profiles.length) {
    return (
      <EmptyState
        title="Aucun like reçu"
        description="Quand des profils aimeront ton profil, ils apparaîtront ici."
      />
    );
  }

  return (
    <div className="space-y-4">
      {profiles.map((profile) => (
        <Card key={profile.id} className="overflow-hidden p-0">
          <div className="h-52 w-full bg-slate-200">
            <img
              src={profile.image}
              alt={profile.name}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-lg font-semibold text-white">
                  {profile.name}, {profile.age}
                </h3>
                <p className="mt-1 text-sm text-slate-300">{profile.title}</p>
              </div>

              <Chip active>{profile.role}</Chip>
            </div>

            <p className="mt-3 text-sm leading-6 text-slate-300">
              {profile.bio}
            </p>
          </div>
        </Card>
      ))}
    </div>
  );
}

function LikesYouPage() {
  return (
    <AppLayout title="Likes You">
      <FeatureGate
        requiredPlan="gold"
        title="Voir qui t’a liké"
        description="Passe à Gold pour découvrir les profils qui t’ont déjà liké."
      >
        <LikesYouContent />
      </FeatureGate>
    </AppLayout>
  );
}

export default LikesYouPage;
