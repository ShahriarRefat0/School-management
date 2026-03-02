"use client";

import {
  createContext,
  useEffect,
  useState,
} from "react";
import { supabase } from "@/lib/supabase/client";
import { UserRole } from "@/types/roles";

type AuthContextType = {
  user: any;
  role: UserRole | null;
  loading: boolean;

  signIn: (
    email: string,
    password: string
  ) => Promise<{ error: any; role:UserRole | null }>;

  signOut: () => Promise<void>;

  resetPassword: (
    email: string
  ) => Promise<{ error: any }>;

  updatePassword: (
    password: string
  ) => Promise<{ error: any }>;

signUp: (
  email: string,
  password: string,
  role?: UserRole
) => Promise<{ data: any; error: any }>;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<any>(null);
  const [role, setRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(true);


  // SESSION CHECK

  useEffect(() => {
    const checkSession = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (session) {
          setUser(session.user);
          setRole(
            (session.user.user_metadata?.role as UserRole) ?? null
          );
        }
      } catch (err) {
        console.error("Session check error:", err);
      } finally {
        setLoading(false);
      }
    };

    checkSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setUser(session.user);
        setRole(
          (session.user.user_metadata?.role as UserRole) ?? null
        );
      } else {
        setUser(null);
        setRole(null);
      }
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  //signUP
const signUp = async (
  email: string,
  password: string,
  role?: UserRole
) => {
  const redirectUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/login`
      : "";

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: redirectUrl,
      data: {
        role: role ?? "pending_admin",
      },
    },
  });

  return { data, error };
};

  // ========================
  // SIGN IN
  // ========================
  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    const  role = (data?.user?.user_metadata?.role as UserRole) ?? null;

    return { error , role};
  };

  // ========================
  // SIGN OUT
  // ========================
  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setRole(null);
  };
  

  // ========================
  // FORGOT PASSWORD
  // ========================
const resetPassword = async (email: string) => {
  return await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/login/reset-password`,
  });
};

  // ========================
  // UPDATE PASSWORD
  // (used in reset-password page)
  // ========================
  const updatePassword = async (password: string) => {
    const { error } = await supabase.auth.updateUser({
      password,
    });

    return { error };
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        loading,
        signIn,
        signOut,
        resetPassword,
        updatePassword,
        signUp
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}