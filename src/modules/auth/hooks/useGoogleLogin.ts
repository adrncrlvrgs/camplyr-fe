import { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { loginUserGoogle } from "@/utils/api/auth";
//import type { TokenResponse } from "@react-oauth/google";
import type { CredentialResponse } from "@react-oauth/google";

const useGoogleLoginHook = (loginAuthContext: () => void = () => {}) => {
  const [error, setError] = useState<Error | null>(null);
  const [user, setUser] = useState<unknown | null>(null);

  const googleLogin = useGoogleLogin({
    flow: "implicit",
    onSuccess: async (response) => {
        console.log(response.access_token)
      try {
        const { userData } = await loginUserGoogle({
          accessToken: response.access_token,
        });
        loginAuthContext();
        setUser(userData);
      } catch (err) {
        const errorObj = err instanceof Error ? err : new Error(String(err));
        setError(errorObj);
      }
    },
    // onError: (err) => {
    //   const errorObj = err instanceof Error ? err : new Error("Google login failed");
    //   setError(errorObj);
    //   console.error(err);
    // },
  });

  const userGoogleLog2 = async( response: CredentialResponse) => {
    console.log(response.credential);
    try {
        const { userData } = await loginUserGoogle({
          accessToken: response.credential
        });
        loginAuthContext();
        setUser(userData);
      } catch (err) {
        const errorObj = err instanceof Error ? err : new Error(String(err));
        setError(errorObj);
      }
  }

  return { user, error, googleLogin, userGoogleLog2 };
};

export { useGoogleLoginHook };