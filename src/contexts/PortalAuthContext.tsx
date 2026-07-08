import React, { createContext, useContext, useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { portalAuthService, type PortalRole, type PortalType } from "@/services/portalAuthService";
import { supabase } from "@/integrations/supabase/client";

interface UserProfile {
  id: string;
  email: string;
  full_name: string | null;
  role: PortalRole | null;
  mfa_enabled: boolean;
  organization_id: string | null;
}

interface PortalAuthContextType {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  canAccessPortal: (portalType: PortalType) => Promise<boolean>;
  signIn: (email: string, password: string) => Promise<any>;
  signUp: (email: string, password: string, fullName: string, role?: PortalRole) => Promise<any>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const PortalAuthContext = createContext<PortalAuthContextType | undefined>(undefined);

export function PortalAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const loadUser = async () => {
    try {
      const { user: currentUser, profile: currentProfile } = await portalAuthService.getCurrentUser();
      setUser(currentUser);
      setProfile(currentProfile);
    } catch (error) {
      console.error("Error loading user:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
        await loadUser();
      } else if (event === "SIGNED_OUT") {
        setUser(null);
        setProfile(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const canAccessPortal = async (portalType: PortalType) => {
    if (!user) return false;
    return portalAuthService.canAccessPortal(user.id, portalType);
  };

  const value: PortalAuthContextType = {
    user,
    profile,
    loading,
    canAccessPortal,
    signIn: portalAuthService.signIn,
    signUp: portalAuthService.signUp,
    signOut: portalAuthService.signOut,
    resetPassword: portalAuthService.resetPassword,
    refreshProfile: loadUser,
  };

  return (
    <PortalAuthContext.Provider value={value}>
      {children}
    </PortalAuthContext.Provider>
  );
}

export function usePortalAuth() {
  const context = useContext(PortalAuthContext);
  if (context === undefined) {
    throw new Error("usePortalAuth must be used within a PortalAuthProvider");
  }
  return context;
}