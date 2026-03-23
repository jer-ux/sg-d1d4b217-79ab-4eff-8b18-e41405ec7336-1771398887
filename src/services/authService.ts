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

const getURL = () => {
  let url = process?.env?.NEXT_PUBLIC_VERCEL_URL ?? process?.env?.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
  url = url.startsWith('http') ? url : `https://${url}`
  url = url.endsWith('/') ? url : `${url}/`
  return url
}

export const authService = {
  // Get current user
  async getCurrentUser(): Promise<AuthUser | null> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const { data: profile } = await supabase
      .from('profiles')
      .select('role, organization_id, mfa_enabled')
      .eq('id', user.id)
      .maybeSingle();

    return {
      id: user.id,
      email: user.email || "",
      user_metadata: user.user_metadata,
      created_at: user.created_at,
      role: profile?.role || 'viewer',
      organization_id: profile?.organization_id || undefined,
      mfa_enabled: profile?.mfa_enabled || false
    };
  },

  // Get session
  async getCurrentSession(): Promise<EnterpriseSession | null> {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return null;

    const { data: profile } = await supabase
      .from('profiles')
      .select('role, organization_id')
      .eq('id', session.user.id)
      .maybeSingle();

    // Derive permissions from role
    const role = profile?.role || 'viewer';
    const permissions = role === 'admin' || role === 'owner' ? ['all'] : ['read'];

    return {
      ...session,
      organization_id: profile?.organization_id || undefined,
      role: role,
      permissions
    };
  },

  // Log activity to audit_logs
  async logSessionActivity(userId: string, activity: string, status: string, metadata?: any): Promise<void> {
    try {
      const currentUser = userId || (await this.getCurrentUser())?.id;
      if (!currentUser) return;

      await supabase.from('audit_logs').insert({
        user_id: currentUser,
        action: activity,
        resource_type: 'session',
        metadata: { status, ...metadata }
      });
    } catch (error) {
      console.error('Failed to log activity:', error);
    }
  },

  async signUp(email: string, password: string, metadata?: any): Promise<{ user: AuthUser | null; error: AuthError | null }> {
    const { data, error } = await supabase.auth.signUp({
      email, password, options: { emailRedirectTo: `${getURL()}auth/callback`, data: metadata }
    });
    if (error) return { user: null, error: { message: error.message } };
    return { user: data.user ? { id: data.user.id, email: data.user.email || "" } : null, error: null };
  },

  async signIn(email: string, password: string): Promise<{ user: AuthUser | null; error: AuthError | null; requiresMFA?: boolean }> {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return { user: null, error: { message: error.message } };
    
    const { data: profile } = await supabase.from('profiles').select('mfa_enabled, role, organization_id').eq('id', data.user.id).maybeSingle();
    await this.logSessionActivity(data.user.id, 'login', 'success');
    
    return { 
      user: { id: data.user.id, email: data.user.email || "", role: profile?.role || 'viewer', organization_id: profile?.organization_id || undefined }, 
      error: null, requiresMFA: profile?.mfa_enabled || false 
    };
  },

  async signOut(): Promise<{ error: AuthError | null }> {
    const user = await this.getCurrentUser();
    const { error } = await supabase.auth.signOut();
    if (user && !error) await this.logSessionActivity(user.id, 'logout', 'success');
    return { error: error ? { message: error.message } : null };
  },

  async switchOrganization(organizationId: string): Promise<{ error: AuthError | null }> {
    const user = await this.getCurrentUser();
    if (!user) return { error: { message: "Not authenticated" } };

    const { data: membership } = await supabase
      .from('organization_members')
      .select('role')
      .eq('user_id', user.id)
      .eq('organization_id', organizationId)
      .maybeSingle();

    if (!membership) return { error: { message: "Not a member" } };

    const { error } = await supabase.from('profiles').update({ organization_id: organizationId }).eq('id', user.id);
    if (!error) await this.logSessionActivity(user.id, 'organization_switch', 'success', { organizationId });
    return { error: error ? { message: error.message } : null };
  },

  async getUserOrganizations(): Promise<any[]> {
    const user = await this.getCurrentUser();
    if (!user) return [];

    const { data } = await supabase
      .from('organization_members')
      .select(`organization_id, role, organizations ( id, name, slug, plan_tier )`)
      .eq('user_id', user.id);

    return data || [];
  },

  onAuthStateChange(callback: (event: string, session: Session | null) => void) {
    return supabase.auth.onAuthStateChange(callback);
  }
};