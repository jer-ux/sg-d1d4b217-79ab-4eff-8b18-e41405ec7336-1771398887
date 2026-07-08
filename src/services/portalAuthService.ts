import { supabase } from "@/integrations/supabase/client";
import type { User } from "@supabase/supabase-js";

export type PortalRole = 
  | "super_admin" 
  | "enterprise_admin" 
  | "actuary" 
  | "benefits_analyst" 
  | "broker" 
  | "cfo" 
  | "chro" 
  | "auditor" 
  | "board_viewer"
  | "admin"
  | "owner"
  | "internal_team"
  | "investor"
  | "partner";
export type PortalType = "tools" | "investor" | "admin";

interface PortalAccess {
  portal_type: PortalType;
  permissions: {
    read: boolean;
    write: boolean;
    export: boolean;
  };
  is_active: boolean;
}

interface UserProfile {
  id: string;
  email: string;
  full_name: string | null;
  role: PortalRole | null;
  mfa_enabled: boolean;
  organization_id: string | null;
}

export const portalAuthService = {
  async getCurrentUser(): Promise<{ user: User | null; profile: UserProfile | null }> {
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      return { user: null, profile: null };
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("id, email, full_name, role, mfa_enabled, organization_id")
      .eq("id", user.id)
      .single();

    return { user, profile };
  },

  async getUserPortalAccess(userId: string): Promise<PortalAccess[]> {
    const { data, error } = await supabase
      .from("portal_access")
      .select("portal_type, permissions, is_active")
      .eq("user_id", userId)
      .eq("is_active", true);

    if (error) {
      console.error("Error fetching portal access:", error);
      return [];
    }

    return data || [];
  },

  async canAccessPortal(userId: string, portalType: PortalType): Promise<boolean> {
    const { profile } = await this.getCurrentUser();
    
    if (!profile) return false;

    // Admins and owners have access to everything
    if (profile.role === "admin" || profile.role === "owner") {
      return true;
    }

    // Check specific portal access
    const access = await this.getUserPortalAccess(userId);
    const portalAccess = access.find(a => a.portal_type === portalType);

    if (portalAccess && portalAccess.is_active && portalAccess.permissions.read) {
      return true;
    }

    // Role-based defaults
    if (portalType === "tools" && profile.role === "internal_team") {
      return true;
    }

    if (portalType === "investor" && (profile.role === "investor" || profile.role === "partner")) {
      return true;
    }

    return false;
  },

  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    // Check if MFA is enabled
    const { profile } = await this.getCurrentUser();
    
    return {
      user: data.user,
      session: data.session,
      requiresMFA: profile?.mfa_enabled || false,
    };
  },

  async signUp(email: string, password: string, fullName: string, role: PortalRole = "investor") {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          role: role,
        },
      },
    });

    if (error) throw error;

    // Create profile entry
    if (data.user) {
      await supabase.from("profiles").upsert({
        id: data.user.id,
        email,
        full_name: fullName,
        role: role,
        mfa_enabled: false,
      });
    }

    return data;
  },

  async enrollMFA() {
    const { data, error } = await supabase.auth.mfa.enroll({
      factorType: "totp",
    });

    if (error) throw error;

    return {
      qrCode: data.totp.qr_code,
      secret: data.totp.secret,
      factorId: data.id,
    };
  },

  async verifyMFA(factorId: string, code: string) {
    const { data, error } = await supabase.auth.mfa.challenge({
      factorId,
    });

    if (error) throw error;

    const challengeId = data.id;

    const { data: verifyData, error: verifyError } = await supabase.auth.mfa.verify({
      factorId,
      challengeId,
      code,
    });

    if (verifyError) throw verifyError;

    // Update profile to mark MFA as enabled
    const { user } = await this.getCurrentUser();
    if (user) {
      await supabase
        .from("profiles")
        .update({ mfa_enabled: true })
        .eq("id", user.id);
    }

    return verifyData;
  },

  async challengeMFA(factorId: string) {
    const { data, error } = await supabase.auth.mfa.challenge({
      factorId,
    });

    if (error) throw error;
    return data;
  },

  async verifyMFAChallenge(factorId: string, challengeId: string, code: string) {
    const { data, error } = await supabase.auth.mfa.verify({
      factorId,
      challengeId,
      code,
    });

    if (error) throw error;
    return data;
  },

  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  async resetPassword(email: string) {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    });

    if (error) throw error;
  },

  async updatePassword(newPassword: string) {
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) throw error;
  },

  async grantPortalAccess(
    userId: string,
    portalType: PortalType,
    permissions: Partial<PortalAccess["permissions"]> = {}
  ) {
    const { user: currentUser } = await this.getCurrentUser();
    
    if (!currentUser) {
      throw new Error("Not authenticated");
    }

    const { data, error } = await supabase.from("portal_access").insert({
      user_id: userId,
      portal_type: portalType,
      permissions: {
        read: permissions.read ?? true,
        write: permissions.write ?? false,
        export: permissions.export ?? false,
      },
      granted_by: currentUser.id,
      is_active: true,
    }).select().single();

    if (error) throw error;
    return data;
  },

  async revokePortalAccess(userId: string, portalType: PortalType) {
    const { error } = await supabase
      .from("portal_access")
      .update({ is_active: false })
      .eq("user_id", userId)
      .eq("portal_type", portalType);

    if (error) throw error;
  },
};