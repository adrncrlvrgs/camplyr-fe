import { useGoogleLoginHook } from "../hooks/useGoogleLogin";
import { GoogleLogin } from "@react-oauth/google";
import type { CredentialResponse } from "@react-oauth/google";
import { useAuth } from "@/context/AuthContext";

export default function GoogleLoginButton() {
  const { login } = useAuth();
  const { error, userGoogleLog2 } = useGoogleLoginHook(login);

  return (
    <div className="space-y-2">
      <GoogleLogin
        onSuccess={async (response: CredentialResponse) => {
          await userGoogleLog2(response);
        }}
        onError={() => console.error(error)}
      />
      {error ? <p className="text-sm text-destructive">{error.message}</p> : null} 
    </div>
  );
}
