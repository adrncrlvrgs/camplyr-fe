import { createContext, useContext, useState, useEffect, ReactNode } from "react";
// import {useNavigate} from 'react-router-dom'
import { User } from "@/utils/constant/types";
import { getUser, refresh } from "@/utils/api/auth";

type AuthContextValue = {
  user: User | null;
  // isOnboarded: boolean;
  isLoading: boolean;
  login: (userData: User | null) => void;
};

type AuthProviderProps = {
  children: ReactNode;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // const [isOnboarded, setIsOnboarded] = useState<boolean>(false);
  // const navigate = useNavigate();
  useEffect(() => {
    setIsLoading(false);
  },[])

 
  const login = (userData: User | null) => {
    setUser(userData);
    console.log(userData);
    // if (!user.isOnboarded){
    //     navigate("/onboarding")
    // }

  };

  const refreshAuth = async () => {

    try {
      const {userData} = await getUser() as ({userData: User});
      setUser(userData)
    }catch(error){
      try{
        refresh();
        const {userData} = await getUser() as ({userData: User});
        setUser(userData);
      }catch{
        setUser(null);
      }
      console.log("Refresh error:", error);
    }
  }

  useEffect(()=>{
    const initialAuth = async() =>{
      setIsLoading(true)
      try{
        await refreshAuth();
      }finally{
        setIsLoading(false);
      }
    }

    initialAuth();
  })

  return (
    <AuthContext.Provider value={{ user, isLoading, login }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
};

export { AuthProvider, AuthContext, useAuth };

