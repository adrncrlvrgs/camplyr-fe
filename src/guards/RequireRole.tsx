import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { UserRole } from "@/utils/constant/types";

export function RequireRoles ({ roles }: { roles: UserRole[] }) {
    const {user} = useAuth();
    if (!user || !roles.includes(user.role)){
        return <Navigate to = "/unauthorized" replace />
    }
    return <Outlet />
}