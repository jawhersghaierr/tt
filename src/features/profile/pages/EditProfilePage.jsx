import { useMemo, useState } from "react";
import AppLayout from "@/layouts/AppLayout";
import Input from "@/components/ui/Input/Input";
import Button from "@/components/ui/Button/Button";
import Chip from "@/components/ui/Chip/Chip";
import FormAlert from "@/components/common/FormAlert/FormAlert";
import ProfileSection from "@/features/profile/components/ProfileSection";
import ProfileRoleSelector from "@/features/profile/components/ProfileRoleSelector";
import ProfileMediaPicker from "@/features/profile/components/ProfileMediaPicker";
import { useProfileForm } from "@/features/profile/hooks/useProfileForm";
import ProfileCompletionCard from "@/features/profile/components/ProfileCompletionCard";
import ProfileSectionStatus from "@/features/profile/components/ProfileSectionStatus";
import { getProfileProgress } from "@/features/profile/services/profile.progress";
import { getProfileProgressDetails } from "@/features/profile/services/profile.progress-details";

function EditProfilePage() {
  const [activeSection, setActiveSection] = useState("media");
  const [skillInput, setSkillInput] = useState("");
  const [locationInput, setLocationInput] = useState("");

  const { profile, setField, errors, successMessage, save, setProfile } =
    useProfileForm();

  const isCandidate = profile.role === "candidate";
  const isRecruiter = profile.role === "recruiter";
  const isHybrid = profile.role === "hybrid";

  const progress = getProfileProgress(profile);
  const progressDetails = getProfileProgressDetails(profile);

  const sectionTabs = useMemo(
    () => [
      { key: "media", label: "Média" },
      { key: "identity", label: "Identité" },
      { key: "professional", label: "Infos pro" },
      { key: "preferences", label: "Préférences" },
    ],
    [],
  );

  const handleGoToSection = (sectionKey) => {
    setActiveSection(sectionKey);
  };

  const handleChange = (field) => (event) => {
    setField(field, event.target.value);
  };

  const handleRoleChange = (role) => {
    setField("role", role);
  };

  const handleFileChange = (field) => (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setField(field, previewUrl);
  };

  const handleAddSkill = () => {
    const value = skillInput.trim();

    if (!value || profile.skills.includes(value)) {
      setSkillInput("");
      return;
    }

    setProfile((prev) => ({
      ...prev,
      skills: [...prev.skills, value],
    }));
    setSkillInput("");
  };

  const handleRemoveSkill = (skillToRemove) => {
    setProfile((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToRemove),
    }));
  };

  const handleAddPreferredLocation = () => {
    const value = locationInput.trim();

    if (!value || profile.preferredLocations.includes(value)) {
      setLocationInput("");
      return;
    }

    setProfile((prev) => ({
      ...prev,
      preferredLocations: [...prev.preferredLocations, value],
    }));
    setLocationInput("");
  };

  const handleRemovePreferredLocation = (locationToRemove) => {
    setProfile((prev) => ({
      ...prev,
      preferredLocations: prev.preferredLocations.filter(
        (location) => location !== locationToRemove,
      ),
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    save();
  };

  return (
    <AppLayout title="Edit Profile">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {sectionTabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveSection(tab.key)}
              className="bg-transparent"
            >
              <Chip active={activeSection === tab.key}>{tab.label}</Chip>
            </button>
          ))}
        </div>

        <ProfileCompletionCard
          progress={progress}
          onGoToSection={handleGoToSection}
        />

        <FormAlert type="success" message={successMessage} />

        {activeSection === "media" ? (
          <ProfileSection
            title="Média"
            description="Ajoute une photo principale et, si tu veux, une courte vidéo de présentation."
          >
            <ProfileMediaPicker
              avatar={profile.avatar}
              introVideo={profile.introVideo}
              onAvatarChange={handleFileChange("avatar")}
              onVideoChange={handleFileChange("introVideo")}
              error={errors.media}
            />

            <div className="mt-4">
              <ProfileSectionStatus
                title="Checklist média"
                items={progressDetails.media}
              />
            </div>
          </ProfileSection>
        ) : null}

        {activeSection === "identity" ? (
          <ProfileSection
            title="Identité"
            description="Les informations essentielles visibles sur ton profil."
          >
            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Type de profil
                </label>
                <ProfileRoleSelector
                  value={profile.role}
                  onChange={handleRoleChange}
                />
              </div>

              <div className="space-y-3">
                <Input
                  label="Nom complet"
                  value={profile.fullName}
                  onChange={handleChange("fullName")}
                  placeholder="Jawhar Sghaier"
                  error={errors.fullName}
                />

                <Input
                  label="Âge"
                  type="number"
                  value={profile.age}
                  onChange={handleChange("age")}
                  placeholder="28"
                />

                <Input
                  label="Headline"
                  value={profile.headline}
                  onChange={handleChange("headline")}
                  placeholder="Frontend React Developer"
                  error={errors.headline}
                />

                <Input
                  label="Localisation"
                  value={profile.location}
                  onChange={handleChange("location")}
                  placeholder="Paris"
                  error={errors.location}
                />

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Bio
                  </label>
                  <textarea
                    value={profile.bio}
                    onChange={handleChange("bio")}
                    placeholder="Présente-toi en quelques lignes..."
                    className={`min-h-[120px] w-full rounded-2xl border bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-400 ${
                      errors.bio
                        ? "border-red-500 focus:border-red-500"
                        : "border-slate-300 focus:border-slate-900"
                    }`}
                  />
                  {errors.bio ? (
                    <p className="mt-2 text-xs text-red-500">{errors.bio}</p>
                  ) : null}
                </div>
              </div>

              <div className="mt-4">
                <ProfileSectionStatus
                  title="Checklist identité"
                  items={progressDetails.identity}
                />
              </div>
            </div>
          </ProfileSection>
        ) : null}

        {activeSection === "professional" ? (
          <ProfileSection
            title="Informations professionnelles"
            description="Adapte ton profil selon que tu es candidat, recruteur ou hybride."
          >
            <div className="space-y-3">
              <Input
                label="Expérience"
                value={profile.experience}
                onChange={handleChange("experience")}
                placeholder="4 ans"
                error={errors.experience}
              />

              {isCandidate || isHybrid ? (
                <>
                  <Input
                    label="Poste actuel"
                    value={profile.currentPosition}
                    onChange={handleChange("currentPosition")}
                    placeholder="Frontend Developer"
                  />

                  <Input
                    label="Poste recherché"
                    value={profile.lookingFor}
                    onChange={handleChange("lookingFor")}
                    placeholder="Senior React Developer"
                    error={errors.lookingFor}
                  />

                  <Input
                    label="Salaire attendu"
                    value={profile.salaryExpectation}
                    onChange={handleChange("salaryExpectation")}
                    placeholder="55k - 65k"
                  />
                </>
              ) : null}

              {isRecruiter || isHybrid ? (
                <>
                  <Input
                    label="Entreprise"
                    value={profile.company}
                    onChange={handleChange("company")}
                    placeholder="Nom de l’entreprise"
                    error={errors.company}
                  />

                  <Input
                    label="Budget / fourchette"
                    value={profile.budgetRange}
                    onChange={handleChange("budgetRange")}
                    placeholder="40k - 70k"
                  />
                </>
              ) : null}

              <Input
                label="Disponibilité"
                value={profile.availability}
                onChange={handleChange("availability")}
                placeholder="Immédiate / 1 mois / 3 mois"
              />

              <Input
                label="Mode de travail"
                value={profile.workMode}
                onChange={handleChange("workMode")}
                placeholder="remote / hybrid / onsite"
                error={errors.workMode}
              />

              <Input
                label="Type de contrat"
                value={profile.contractType}
                onChange={handleChange("contractType")}
                placeholder="CDI / Freelance / Stage"
                error={errors.contractType}
              />

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Compétences
                </label>

                <div className="flex gap-2">
                  <input
                    value={skillInput}
                    onChange={(event) => setSkillInput(event.target.value)}
                    placeholder="Ajouter une compétence"
                    className="h-12 flex-1 rounded-2xl border border-slate-300 px-4 text-sm outline-none focus:border-slate-900"
                  />
                  <Button type="button" onClick={handleAddSkill}>
                    Ajouter
                  </Button>
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  {profile.skills.map((skill) => (
                    <button
                      key={skill}
                      type="button"
                      onClick={() => handleRemoveSkill(skill)}
                      className="bg-transparent"
                    >
                      <Chip active>{skill} ×</Chip>
                    </button>
                  ))}
                </div>
              </div>

              <Input
                label="Portfolio"
                value={profile.portfolioUrl}
                onChange={handleChange("portfolioUrl")}
                placeholder="https://mon-portfolio.com"
                error={errors.portfolioUrl}
              />

              <Input
                label="LinkedIn"
                value={profile.linkedinUrl}
                onChange={handleChange("linkedinUrl")}
                placeholder="https://linkedin.com/in/..."
                error={errors.linkedinUrl}
              />

              <div className="mt-4">
                <ProfileSectionStatus
                  title="Checklist infos pro"
                  items={progressDetails.professional}
                />
              </div>
            </div>
          </ProfileSection>
        ) : null}

        {activeSection === "preferences" ? (
          <ProfileSection
            title="Préférences"
            description="Définis ce que tu recherches pour améliorer le matching."
          >
            <div className="space-y-3">
              <Input
                label="Profils recherchés"
                value={profile.preferredRoles.join(", ")}
                onChange={(event) =>
                  setField(
                    "preferredRoles",
                    event.target.value
                      .split(",")
                      .map((item) => item.trim())
                      .filter(Boolean),
                  )
                }
                placeholder="Candidate, Recruiter, Product Designer"
              />

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Localisations préférées
                </label>

                <div className="flex gap-2">
                  <input
                    value={locationInput}
                    onChange={(event) => setLocationInput(event.target.value)}
                    placeholder="Ajouter une localisation"
                    className="h-12 flex-1 rounded-2xl border border-slate-300 px-4 text-sm outline-none focus:border-slate-900"
                  />
                  <Button type="button" onClick={handleAddPreferredLocation}>
                    Ajouter
                  </Button>
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  {profile.preferredLocations.map((location) => (
                    <button
                      key={location}
                      type="button"
                      onClick={() => handleRemovePreferredLocation(location)}
                      className="bg-transparent"
                    >
                      <Chip>{location} ×</Chip>
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-4">
                <ProfileSectionStatus
                  title="Checklist préférences"
                  items={progressDetails.preferences}
                />
              </div>
            </div>
          </ProfileSection>
        ) : null}

        <Button type="submit" fullWidth size="lg">
          Sauvegarder le profil
        </Button>
      </form>
    </AppLayout>
  );
}

export default EditProfilePage;
