import { RouterProvider } from "react-router-dom";
//import Home from "@/views/Home";
// import LandingPage from "@/views/Landing";
// import Login from "@/views/Login";
// import Onboard from "@/views/Onboard"

import { GoogleOAuthProvider } from "@react-oauth/google";
import "./App.css";
import { AuthProvider } from "./context/AuthContext";
import router from "./config";

function App() {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <AuthProvider>
        {/* <Login /> */}
        <RouterProvider router={router}/>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
