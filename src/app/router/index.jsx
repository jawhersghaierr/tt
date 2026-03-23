import { Route, Routes } from "react-router-dom";
import { ProtectedRoute, PublicRoute } from "@/app/router/guards";
import DiscoverPage from "@/features/discover/pages/DiscoverPage";
import LoginPage from "@/features/auth/pages/LoginPage";
import OnboardingPage from "@/features/onboarding/pages/OnboardingPage";
import MatchesPage from "@/pages/MatchesPage";
import MessagesPage from "@/pages/MessagesPage";
import ProfilePage from "@/pages/ProfilePage";
import NotFoundPage from "@/pages/NotFoundPage";
import EditProfilePage from "@/features/profile/pages/EditProfilePage";
import SubscriptionPage from "@/features/subscription/pages/SubscriptionPage";
import LikesYouPage from "@/features/subscription/pages/LikesYouPage";
import FirstMessagePage from "@/features/subscription/pages/FirstMessagePage";
import HistoryPage from "@/features/discover/pages/HistoryPage";
import ConversationPage from "@/features/messages/pages/ConversationPage";
export default function AppRouter() {
  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<LoginPage />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<DiscoverPage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route path="/matches" element={<MatchesPage />} />
        <Route path="/messages" element={<MessagesPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/profile/edit" element={<EditProfilePage />} />
        <Route path="/subscription" element={<SubscriptionPage />} />
        <Route path="/likes-you" element={<LikesYouPage />} />
        <Route path="/first-message" element={<FirstMessagePage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/messages/:matchId" element={<ConversationPage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
