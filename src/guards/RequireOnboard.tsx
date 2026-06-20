import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export function RequireOnboard () {
    const {user} = useAuth();
    if (!user || !user.isOnboarded){
        return <Navigate to = "/onboarding" replace />
    }
    return <Outlet/>
}