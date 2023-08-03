import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Session } from "@supabase/supabase-js";
import { supabase } from "@/supabase/init";

interface AuthContextType {
  session: Session | null;
}

interface AuthContextProps {
  children: ReactNode;
}

const AuthContext = createContext({} as AuthContextType);

export const AuthProvider = ({ children }: AuthContextProps) => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN") {
        setSession(session);
      }
    });
    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        session,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
