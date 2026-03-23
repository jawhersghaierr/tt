import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "@/app/store/auth.store";

export function ProtectedRoute() {
  const { isAuthenticated, onboardingCompleted } = useAuthStore();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (!onboardingCompleted && location.pathname !== "/onboarding") {
    return <Navigate to="/onboarding" replace />;
  }

  return <Outlet />;
}

export function PublicRoute() {
  const { isAuthenticated, onboardingCompleted } = useAuthStore();

  if (isAuthenticated && !onboardingCompleted) {
    return <Navigate to="/onboarding" replace />;
  }

  if (isAuthenticated && onboardingCompleted) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
