import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
export function RequireNotOnboarded() {
  const { user} = useAuth();

  if (user?.isOnboarded) {
    return <Navigate to="/home" replace />;
  }

  return <Outlet />;
}