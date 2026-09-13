import { createBrowserRouter } from "react-router-dom";
import { RequireGuest, RequireAuth, RequireOnboard, RequireNotOnboarded } from "@/guards";
import Login from "@/views/Login";
import Onboard from "@/views/Onboard";
import Home from "@/views/Home";
import Jobs from "@/views/Jobs"
export const router = createBrowserRouter([
  {
    element: <RequireGuest />,
    children: [{ path: "/login", element: <Login /> }],
  },
  {
    element: <RequireAuth />,
    children: [
       {
        element: <RequireNotOnboarded />,
        children: [{ path: "/onboarding", element: <Onboard /> }],
      },
      {
        element: <RequireOnboard />,
        children: [
            { path: "/home", element: <Home /> },
            { path: "/jobs", element: <Jobs /> }
        ],
      },
    ],
  },
]);
