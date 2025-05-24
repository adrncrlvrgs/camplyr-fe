import Home from "@/views/Home";
import LandingPage from "@/views/Landing";
import Login from "@/views/Login";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./App.css";

function App() {

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <Login />
    </GoogleOAuthProvider>
  );
}

export default App;
