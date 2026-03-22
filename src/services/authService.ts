import { supabase } from "@/integrations/supabase/client";
import type { User, Session } from "@supabase/supabase-js";

export interface AuthUser {
  id: string;
  email: string;
  user_metadata?: any;
  created_at?: string;
  role?: string;
  organization_id?: string;
  mfa_enabled?: boolean;
}

export interface AuthError {
  message: string;
  code?: string;
}

export interface EnterpriseSession extends Session {
  organization_id?: string;
  role?: string;
  permissions?: string[];
}

// Dynamic URL Helper
const getURL = () => {
  let url = process?.env?.NEXT_PUBLIC_VERCEL_URL ?? 
           process?.env?.NEXT_PUBLIC_SITE_URL ?? 
           'http://localhost:3000'
  
  if (!url) {
    url = 'http://localhost:3000';
  }
  
  url = url.startsWith('http') ? url : `https://${url}`
  url = url.endsWith('/') ? url : `${url}/`
  
  return url
}

export const authService = {
  // ==========================================
  // CORE AUTHENTICATION
  // ==========================================

  // Get current user with enterprise profile
  async getCurrentUser(): Promise<AuthUser | null> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    // Fetch enterprise profile data
    const { data: profile } = await supabase
      .from('profiles')
      .select('role, organization_id, mfa_enabled')
      .eq('id', user.id)
      .single();

    return {
      id: user.id,
      email: user.email || "",
      user_metadata: user.user_metadata,
      created_at: user.created_at,
      role: profile?.role,
      organization_id: profile?.organization_id,
      mfa_enabled: profile?.mfa_enabled
    };
  },

  // Get current session with RBAC data
  async getCurrentSession(): Promise<EnterpriseSession | null> {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return null;

    // Fetch user permissions
    const { data: profile } = await supabase
      .from('profiles')
      .select('role, organization_id')
      .eq('id', session.user.id)
      .single();

    const { data: permissions } = await supabase
      .from('role_permissions')
      .select('permission')
      .eq('role', profile?.role || 'user');

    return {
      ...session,
      organization_id: profile?.organization_id,
      role: profile?.role,
      permissions: permissions?.map(p => p.permission) || []
    };
  },

  // Sign up with email and password
  async signUp(email: string, password: string, metadata?: { 
    full_name?: string;
    organization_name?: string;
    phone?: string;
  }): Promise<{ user: AuthUser | null; error: AuthError | null }> {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${getURL()}auth/confirm-email`,
          data: metadata
        }
      });

      if (error) {
        return { user: null, error: { message: error.message, code: error.status?.toString() } };
      }

      const authUser = data.user ? {
        id: data.user.id,
        email: data.user.email || "",
        user_metadata: data.user.user_metadata,
        created_at: data.user.created_at
      } : null;

      return { user: authUser, error: null };
    } catch (error) {
      return { 
        user: null, 
        error: { message: "An unexpected error occurred during sign up" } 
      };
    }
  },

  // Sign in with email and password
  async signIn(email: string, password: string): Promise<{ user: AuthUser | null; error: AuthError | null; requiresMFA?: boolean }> {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return { user: null, error: { message: error.message, code: error.status?.toString() } };
      }

      // Check if MFA is required
      const { data: profile } = await supabase
        .from('profiles')
        .select('mfa_enabled, role, organization_id')
        .eq('id', data.user.id)
        .single();

      // Log session activity
      await this.logSessionActivity(data.user.id, 'login', 'success');

      const authUser: AuthUser = {
        id: data.user.id,
        email: data.user.email || "",
        user_metadata: data.user.user_metadata,
        created_at: data.user.created_at,
        role: profile?.role,
        organization_id: profile?.organization_id,
        mfa_enabled: profile?.mfa_enabled
      };

      return { 
        user: authUser, 
        error: null,
        requiresMFA: profile?.mfa_enabled 
      };
    } catch (error) {
      return { 
        user: null, 
        error: { message: "An unexpected error occurred during sign in" } 
      };
    }
  },

  // Sign out
  async signOut(): Promise<{ error: AuthError | null }> {
    try {
      const user = await this.getCurrentUser();
      
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        return { error: { message: error.message } };
      }

      // Log session activity
      if (user) {
        await this.logSessionActivity(user.id, 'logout', 'success');
      }

      return { error: null };
    } catch (error) {
      return { 
        error: { message: "An unexpected error occurred during sign out" } 
      };
    }
  },

  // ==========================================
  // ENTERPRISE SSO
  // ==========================================

  // Sign in with SSO (Google, Microsoft, etc.)
  async signInWithSSO(provider: 'google' | 'azure' | 'okta'): Promise<{ error: AuthError | null }> {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: provider === 'azure' ? 'azure' : provider === 'okta' ? 'keycloak' : 'google',
        options: {
          redirectTo: `${getURL()}auth/callback`,
          scopes: provider === 'azure' ? 'email profile openid' : undefined
        }
      });

      if (error) {
        return { error: { message: error.message } };
      }

      return { error: null };
    } catch (error) {
      return { 
        error: { message: "An unexpected error occurred during SSO sign in" } 
      };
    }
  },

  // ==========================================
  // MULTI-FACTOR AUTHENTICATION
  // ==========================================

  // Enroll MFA
  async enrollMFA(): Promise<{ secret?: string; qrCode?: string; error: AuthError | null }> {
    try {
      const { data, error } = await supabase.auth.mfa.enroll({
        factorType: 'totp'
      });

      if (error) {
        return { error: { message: error.message } };
      }

      return { 
        secret: data?.totp?.secret,
        qrCode: data?.totp?.qr_code,
        error: null 
      };
    } catch (error) {
      return { 
        error: { message: "An unexpected error occurred during MFA enrollment" } 
      };
    }
  },

  // Verify MFA code
  async verifyMFA(code: string, factorId: string): Promise<{ error: AuthError | null }> {
    try {
      const { error } = await supabase.auth.mfa.challenge({ factorId });
      
      if (error) {
        return { error: { message: error.message } };
      }

      const { error: verifyError } = await supabase.auth.mfa.verify({
        factorId,
        challengeId: factorId,
        code
      });

      if (verifyError) {
        await this.logSessionActivity('', 'mfa_verify', 'failed');
        return { error: { message: verifyError.message } };
      }

      await this.logSessionActivity('', 'mfa_verify', 'success');
      return { error: null };
    } catch (error) {
      return { 
        error: { message: "An unexpected error occurred during MFA verification" } 
      };
    }
  },

  // Unenroll MFA
  async unenrollMFA(factorId: string): Promise<{ error: AuthError | null }> {
    try {
      const { error } = await supabase.auth.mfa.unenroll({ factorId });

      if (error) {
        return { error: { message: error.message } };
      }

      return { error: null };
    } catch (error) {
      return { 
        error: { message: "An unexpected error occurred during MFA unenrollment" } 
      };
    }
  },

  // ==========================================
  // PASSWORD MANAGEMENT
  // ==========================================

  // Reset password
  async resetPassword(email: string): Promise<{ error: AuthError | null }> {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${getURL()}auth/reset-password`,
      });

      if (error) {
        return { error: { message: error.message } };
      }

      await this.logSessionActivity('', 'password_reset_request', 'success');
      return { error: null };
    } catch (error) {
      return { 
        error: { message: "An unexpected error occurred during password reset" } 
      };
    }
  },

  // Update password
  async updatePassword(newPassword: string): Promise<{ error: AuthError | null }> {
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (error) {
        return { error: { message: error.message } };
      }

      await this.logSessionActivity('', 'password_update', 'success');
      return { error: null };
    } catch (error) {
      return { 
        error: { message: "An unexpected error occurred during password update" } 
      };
    }
  },

  // ==========================================
  // EMAIL CONFIRMATION
  // ==========================================

  // Confirm email (REQUIRED)
  async confirmEmail(token: string, type: 'signup' | 'recovery' | 'email_change' = 'signup'): Promise<{ user: AuthUser | null; error: AuthError | null }> {
    try {
      const { data, error } = await supabase.auth.verifyOtp({
        token_hash: token,
        type: type
      });

      if (error) {
        return { user: null, error: { message: error.message, code: error.status?.toString() } };
      }

      const authUser = data.user ? {
        id: data.user.id,
        email: data.user.email || "",
        user_metadata: data.user.user_metadata,
        created_at: data.user.created_at
      } : null;

      return { user: authUser, error: null };
    } catch (error) {
      return { 
        user: null, 
        error: { message: "An unexpected error occurred during email confirmation" } 
      };
    }
  },

  // ==========================================
  // RBAC & PERMISSIONS
  // ==========================================

  // Check if user has permission
  async hasPermission(permission: string): Promise<boolean> {
    const session = await this.getCurrentSession();
    return session?.permissions?.includes(permission) || false;
  },

  // Check if user has role
  async hasRole(role: string): Promise<boolean> {
    const user = await this.getCurrentUser();
    return user?.role === role;
  },

  // Get user permissions
  async getUserPermissions(): Promise<string[]> {
    const session = await this.getCurrentSession();
    return session?.permissions || [];
  },

  // ==========================================
  // SESSION MANAGEMENT
  // ==========================================

  // Log session activity
  async logSessionActivity(userId: string, activity: string, status: 'success' | 'failed', metadata?: any): Promise<void> {
    try {
      const currentUser = userId || (await this.getCurrentUser())?.id;
      if (!currentUser) return;

      await supabase.from('session_logs').insert({
        user_id: currentUser,
        activity,
        status,
        ip_address: metadata?.ip,
        user_agent: metadata?.userAgent,
        metadata
      });
    } catch (error) {
      console.error('Failed to log session activity:', error);
    }
  },

  // Get active sessions
  async getActiveSessions(userId?: string): Promise<any[]> {
    const currentUser = userId || (await this.getCurrentUser())?.id;
    if (!currentUser) return [];

    const { data } = await supabase
      .from('session_logs')
      .select('*')
      .eq('user_id', currentUser)
      .eq('activity', 'login')
      .eq('status', 'success')
      .order('created_at', { ascending: false })
      .limit(10);

    return data || [];
  },

  // Revoke all sessions except current
  async revokeOtherSessions(): Promise<{ error: AuthError | null }> {
    try {
      // This would require backend implementation
      // For now, just sign out and sign back in
      const currentSession = await this.getCurrentSession();
      
      await supabase.auth.signOut({ scope: 'others' });
      
      return { error: null };
    } catch (error) {
      return { 
        error: { message: "An unexpected error occurred while revoking sessions" } 
      };
    }
  },

  // ==========================================
  // ORGANIZATION MANAGEMENT
  // ==========================================

  // Switch organization (multi-tenancy)
  async switchOrganization(organizationId: string): Promise<{ error: AuthError | null }> {
    try {
      const user = await this.getCurrentUser();
      if (!user) {
        return { error: { message: "User not authenticated" } };
      }

      // Verify user belongs to organization
      const { data: membership } = await supabase
        .from('organization_members')
        .select('role')
        .eq('user_id', user.id)
        .eq('organization_id', organizationId)
        .single();

      if (!membership) {
        return { error: { message: "User is not a member of this organization" } };
      }

      // Update user's active organization
      const { error } = await supabase
        .from('profiles')
        .update({ organization_id: organizationId })
        .eq('id', user.id);

      if (error) {
        return { error: { message: error.message } };
      }

      await this.logSessionActivity(user.id, 'organization_switch', 'success', { organizationId });
      return { error: null };
    } catch (error) {
      return { 
        error: { message: "An unexpected error occurred while switching organizations" } 
      };
    }
  },

  // Get user organizations
  async getUserOrganizations(): Promise<any[]> {
    const user = await this.getCurrentUser();
    if (!user) return [];

    const { data } = await supabase
      .from('organization_members')
      .select(`
        organization_id,
        role,
        organizations (
          id,
          name,
          slug,
          logo_url,
          plan_tier,
          status
        )
      `)
      .eq('user_id', user.id)
      .eq('status', 'active');

    return data || [];
  },

  // ==========================================
  // AUDIT & COMPLIANCE
  // ==========================================

  // Get audit trail
  async getAuditTrail(filters?: { 
    startDate?: string; 
    endDate?: string; 
    activity?: string 
  }): Promise<any[]> {
    const user = await this.getCurrentUser();
    if (!user) return [];

    let query = supabase
      .from('session_logs')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(100);

    if (filters?.startDate) {
      query = query.gte('created_at', filters.startDate);
    }
    if (filters?.endDate) {
      query = query.lte('created_at', filters.endDate);
    }
    if (filters?.activity) {
      query = query.eq('activity', filters.activity);
    }

    const { data } = await query;
    return data || [];
  },

  // ==========================================
  // EVENT LISTENERS
  // ==========================================

  // Listen to auth state changes
  onAuthStateChange(callback: (event: string, session: Session | null) => void) {
    return supabase.auth.onAuthStateChange(callback);
  }
};