import { createBrowserRouter } from "react-router-dom";
import { RequireGuest, RequireAuth, RequireOnboard } from "@/guards";
// import { RequireGuest, RequireAuth, RequireOnboard, RequireRoles } from "@/guards";
import Login from "@/views/Login";
import Onboard from "@/views/Onboard";
import Home from "@/views/Home";

export const router = createBrowserRouter([
  {
    element: <RequireGuest />,
    children: [{ path: "/login", element: <Login /> }],
  },
  {
    element: <RequireAuth />,
    children: [
      { path: "/onboarding", element: <Onboard /> },
      {
        element: <RequireOnboard />,
        children: [
            { path: "/home", element: <Home /> }
        ],
      },
    ],
  },
]);
