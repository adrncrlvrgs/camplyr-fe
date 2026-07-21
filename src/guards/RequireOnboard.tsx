import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export function RequireOnboard() {
  const { user, isLoading } = useAuth();
  console.log(user?.isOnboarded);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  if (!user || !user.isOnboarded) {
    return <Navigate to="/onboarding" replace />;
  }
  return <Outlet />;
}
