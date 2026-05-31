import { useGoogleLoginHook } from "../hooks/useGoogleLogin";
import { GoogleLogin } from "@react-oauth/google";
import type { CredentialResponse } from "@react-oauth/google";

export default function GoogleLoginButton() {
  const { error, userGoogleLog2 } = useGoogleLoginHook(() => {
    // optional callback after successful login
  });

  return (
    <div className="space-y-2">
      {/* <button onClick={() => googleLogin()} className="w-full">
        Sign in with Google
      </button>
      {error ? <p className="text-sm text-destructive">{error.message}</p> : null} */}
      <GoogleLogin
        onSuccess={async (response: CredentialResponse) => {
          await userGoogleLog2(response);
        }}
        onError={() => console.error(error)}
        // onError={() => console.error("Login Failed")}
      />
      {error ? <p className="text-sm text-destructive">{error.message}</p> : null} 
    </div>
  );
}
