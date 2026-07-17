import { useState } from "react";
//import { useGoogleLogin } from "@react-oauth/google";
import { loginUserGoogle } from "@/utils/api/auth.api";
//import type { TokenResponse } from "@react-oauth/google";
import type { CredentialResponse } from "@react-oauth/google";
import { User } from "@/utils/constant/types";

const useGoogleLoginHook = (loginAuthContext: (userData: User) => void = () => {}) => {
  const [error, setError] = useState<Error | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const userGoogleLog2 = async( response: CredentialResponse) => {
    //console.log(response.credential);
    try {
        setIsLoading(true);
        console.log(isLoading)
        const { userData } = await loginUserGoogle({
          credentials: response.credential
        }) as { userData : User};
        loginAuthContext(userData);
        console.log(isLoading)
        setUser(userData);
      } catch (err) {
        const errorObj = err instanceof Error ? err : new Error(String(err));
        setError(errorObj);
      }finally{
        setIsLoading(false);
      }
  }

  return { user, error, isLoading, userGoogleLog2 };
};

export { useGoogleLoginHook };