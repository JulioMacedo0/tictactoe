import { supabase } from "@/supabase/init";
import { User } from "@supabase/supabase-js";
import {
  useRootNavigation,
  useRootNavigationState,
  useRouter,
  useSegments,
} from "expo-router";
import React, { useContext, createContext, useEffect, useState } from "react";

// Define the AuthContextValue interface
interface SignInResponse {
  data: User | undefined;
  error: Error | undefined;
}

interface SignOutResponse {
  error: any | undefined;
  data: {} | undefined;
}

interface AuthContextValue {
  login: (email: string, password: string) => Promise<SignInResponse>;
  createAcount: (
    email: string,
    password: string,
    username: string
  ) => Promise<SignInResponse>;
  logout: () => Promise<SignOutResponse>;
  user: User | undefined | null;
  authInitialized: boolean;
  loading: boolean;
}

// Define the Provider component
interface ProviderProps {
  children: React.ReactNode;
}

// Create the AuthContext
const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function Provider(props: ProviderProps) {
  const [user, setAuth] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [authInitialized, setAuthInitialized] = useState<boolean>(false);
  const router = useRouter();

  // This hook will protect the route access based on user authentication.
  const useProtectedRoute = (user: User | null) => {
    const segments = useSegments();
    const router = useRouter();

    // checking that navigation is all good;
    const navigationState = useRootNavigationState();

    useEffect(() => {
      if (!navigationState?.key || !authInitialized) return;

      const inAuthGroup = segments[0] === "(auth)";
      console.log(segments);
      if (
        // If the user is not signed in and the initial segment is not anything in the auth group.
        !user &&
        !inAuthGroup
      ) {
        // Redirect to the sign-in page.
        router.replace("/login");
      } else if (user && inAuthGroup) {
        // Redirect away from the sign-in page.
        router.replace("/(tabs)/home");
      }
    }, [user, segments, authInitialized, navigationState?.key]);
  };

  useEffect(() => {
    if (authInitialized) return;
    supabase.auth.onAuthStateChange((event, session) => {
      setAuthInitialized(true);
      setAuth(session?.user || null);
      session?.user?.email && router.replace("/(tabs)/home");
    });
  }, []);

  /**
   *
   * @returns
   */
  const logout = async (): Promise<SignOutResponse> => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      return { error: undefined, data: true };
    } catch (error) {
      return { error, data: undefined };
    } finally {
      setAuth(null);
    }
  };
  /**
   *
   * @param email
   * @param password
   * @returns
   */
  const login = async (
    email: string,
    password: string
  ): Promise<SignInResponse> => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;

      setAuth(data.user);
      setLoading(false);
      return { data: data?.user, error: undefined };
    } catch (error) {
      console.log("login error", error);
      setAuth(null);
      setLoading(false);
      alert(error);
      return { error: error as Error, data: undefined };
    }
  };

  /**
   *
   * @param email
   * @param password
   * @param username
   * @returns
   */
  const createAcount = async (
    email: string,
    password: string,
    username: string
  ): Promise<SignInResponse> => {
    setLoading(true);
    try {
      let { error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;

      const { data, error: updateErr } = await supabase.auth.updateUser({
        data: { username, userPicture: "" },
      });
      if (updateErr) throw updateErr;

      setAuth(data.user);
      setLoading(false);
      return { data: data?.user as User, error: undefined };
    } catch (error) {
      console.log("login error", error);
      setAuth(null);
      setLoading(false);
      return { error: error as Error, data: undefined };
    }
  };

  useProtectedRoute(user);

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        createAcount,
        user,
        authInitialized,
        loading,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

// Define the useAuth hook
export const useAuth = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("useAuth must be used within an AuthContextProvider");
  }

  return authContext;
};
