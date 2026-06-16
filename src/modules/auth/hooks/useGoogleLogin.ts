import { useState } from "react";
//import { useGoogleLogin } from "@react-oauth/google";
import { loginUserGoogle } from "@/utils/api/auth";
//import type { TokenResponse } from "@react-oauth/google";
import type { CredentialResponse } from "@react-oauth/google";

const useGoogleLoginHook = (loginAuthContext: (userData: object) => void = () => {}) => {
  const [error, setError] = useState<Error | null>(null);
  const [user, setUser] = useState<unknown | null>(null);

  const userGoogleLog2 = async( response: CredentialResponse) => {
    //console.log(response.credential);
    try {
        const { userData } = await loginUserGoogle({
          credentials: response.credential
        }) as { userData : object};
        loginAuthContext(userData);
        setUser(userData);
      } catch (err) {
        const errorObj = err instanceof Error ? err : new Error(String(err));
        setError(errorObj);
      }
  }

  return { user, error,  userGoogleLog2 };
};

export { useGoogleLoginHook };