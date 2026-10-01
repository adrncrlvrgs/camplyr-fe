import { createBrowserRouter } from "react-router-dom";
import {
  RequireGuest,
  RequireAuth,
  RequireOnboard,
  RequireNotOnboarded,
  RequireRoles,
} from "@/guards";
import Login from "@/views/Login";
import Onboard from "@/views/Onboard";
import Home from "@/views/Home";
import Jobs from "@/views/Jobs";
import Job from "@/views/Job";
import CreateJob from "@/views/Jobs/CreateJob";
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
          { path: "/job/:jobId", element: <Job /> },
          { path: "/jobs", element: <Jobs /> },
          {
            element: <RequireRoles roles={["RECRUITER"]} />,
            children: [{ path: "/jobs/new", element: <CreateJob /> }],
          },
        ],
      },
    ],
  },
]);
