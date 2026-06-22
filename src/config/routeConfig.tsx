import { createBrowserRouter } from "react-router-dom";
import { RequireGuest, RequireAuth} from "@/guards";
// import { RequireGuest, RequireAuth, RequireOnboard, RequireRoles } from "@/guards";
import Login from "@/views/Login";
import Onboard from "@/views/Onboard"

export const router  = createBrowserRouter([
    {
        element: <RequireGuest/>,
        children: [
            {path: "/login", element: <Login/> }
        ]
    },
    {
        element: <RequireAuth/>,
        children : [
            {path: "/onboarding", element: <Onboard/>}
        ]
    }
]);