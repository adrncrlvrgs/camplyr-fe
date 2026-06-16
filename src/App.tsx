import Home from "@/views/Home";
import LandingPage from "@/views/Landing";
import Login from "@/views/Login";

import { GoogleOAuthProvider } from "@react-oauth/google";
import "./App.css";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <AuthProvider>
        <Home />
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
