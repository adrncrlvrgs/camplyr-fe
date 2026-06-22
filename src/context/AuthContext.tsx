import { createContext, useContext, useState, useEffect, ReactNode } from "react";
// import {useNavigate} from 'react-router-dom'
import { User } from "@/utils/constant/types";

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


// type AuthContextValue = {
//   user: unknown | null;
//   login: (userData: object) => void;
// };

// type AuthProviderProps = {
//   children: React.ReactNode;
// };

// const AuthContext = createContext<AuthContextValue | null>(null);

// const AuthProvider = ({ children }: AuthProviderProps) => {
//   const [user, setUser] = useState<unknown | null>(null);

//   const login = (userData: object) => {
//     setUser(userData);
//   };

//   return (
//     <AuthContext.Provider value={{ user, login }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };