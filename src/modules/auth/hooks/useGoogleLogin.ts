import { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { loginUser } from "@/utils/api/auth";

// export const useGoogleLoginHook = () => {
//   const [user, setUser] = useState(null);

//   const googleLogin = useGoogleLogin({
//     onSuccess: async (response) => {
//       try {
//         const userData = await loginUser({
//           email: response.profileObj.email,
//           name: response.profileObj.name,
//           imageUrl: response.profileObj.imageUrl,
//         });
//         setUser(userData);
//       } catch (error) {
//         console.error("Error logging in with Google:", error);
//       }
//     },
//   });

//   return { user, googleLogin };
// };


const useGoogleLogin = (loginAuth) =>{
    const [error, setError] = useState(null);

    const googleLogin = useGoogleLogin({
        onSuccess: async (response) => {
            try {
                const {token, userData} = await loginUser({});
                loginAuth(response.credential);
            } catch (error) {
                
            }
        }
    });

    return {googleLogin}
};