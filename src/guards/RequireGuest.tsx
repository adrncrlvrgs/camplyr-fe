import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export function RequireGuest() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Outlet />;
  }

  if (!user.isOnboarded) {
    return <Navigate to="/onboarding" replace />;
  }

//   return <Navigate to="/dashboard" replace />;
}