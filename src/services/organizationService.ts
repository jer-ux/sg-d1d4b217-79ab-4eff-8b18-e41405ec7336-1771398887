import { supabase } from "@/integrations/supabase/client";

// Export standard interface instead of Database row type to avoid deep instantiation
export interface Organization {
  id: string;
  name: string;
  slug: string;
  domain?: string;
  is_active?: boolean;
  metadata?: any;
  created_at?: string;
}

export const organizationService = {
  // Create organization
  async createOrganization(data: {
    name: string;
    slug: string;
    domain?: string;
    logo_url?: string;
    settings?: any;
  }): Promise<{ organization: any | null; error: any }> {
    try {
      const metadata = {
        logo_url: data.logo_url,
        ...data.settings
      };

      const { data: org, error } = await supabase
        .from('organizations')
        .insert({
          name: data.name,
          slug: data.slug,
          domain: data.domain,
          metadata,
          plan_tier: 'enterprise',
          is_active: true
        })
        .select()
        .single();

      if (error) {
        return { organization: null, error };
      }

      // Add creator as admin
      const { data: { user } } = await supabase.auth.getUser();
      if (user && org) {
        await this.addMember(org.id, user.id, 'admin');
      }

      return { organization: org, error: null };
    } catch (error) {
      return { organization: null, error };
    }
  },

  // Get organization by ID
  async getOrganization(id: string): Promise<any | null> {
    const { data } = await supabase
      .from('organizations')
      .select('*')
      .eq('id', id)
      .single();

    return data;
  },

  // Update organization
  async updateOrganization(id: string, updates: any): Promise<{ error: any }> {
    const { error } = await supabase
      .from('organizations')
      .update(updates)
      .eq('id', id);

    return { error };
  },

  // Add member
  async addMember(organizationId: string, userId: string, role: 'admin' | 'member' | 'viewer'): Promise<{ error: any }> {
    const { error } = await supabase
      .from('organization_members')
      .insert({
        organization_id: organizationId,
        user_id: userId,
        role
      } as any);

    return { error };
  },

  // Remove member
  async removeMember(organizationId: string, userId: string): Promise<{ error: any }> {
    const { error } = await supabase
      .from('organization_members')
      .delete()
      .eq('organization_id', organizationId)
      .eq('user_id', userId);

    return { error };
  },

  // Get members
  async getMembers(organizationId: string): Promise<any[]> {
    const { data } = await supabase
      .from('organization_members')
      .select(`
        *,
        profiles (
          id,
          email,
          full_name,
          avatar_url
        )
      `)
      .eq('organization_id', organizationId);

    return data || [];
  },

  // Create API Key
  async createAPIKey(organizationId: string, name: string, permissions: string[]): Promise<{ apiKey: string | null; error: any }> {
    const apiKey = `sk_${organizationId.substring(0, 8)}_${Math.random().toString(36).substring(2, 15)}`;
    const { data: { user } } = await supabase.auth.getUser();

    const { error } = await supabase
      .from('api_keys')
      .insert({
        organization_id: organizationId,
        name,
        key_hash: apiKey,
        key_prefix: apiKey.substring(0, 10),
        scopes: permissions,
        is_active: true,
        created_by: user?.id || ''
      });

    if (error) return { apiKey: null, error };
    return { apiKey, error: null };
  },

  // Get API Keys
  async getAPIKeys(organizationId: string): Promise<any[]> {
    const { data } = await supabase
      .from('api_keys')
      .select('*')
      .eq('organization_id', organizationId)
      .order('created_at', { ascending: false });

    return data || [];
  },

  // Update Settings
  async updateSettings(organizationId: string, settings: any): Promise<{ error: any }> {
    const org = await this.getOrganization(organizationId);
    const metadata = { ...(org?.metadata || {}), ...settings };
    
    const { error } = await supabase
      .from('organizations')
      .update({ metadata })
      .eq('id', organizationId);

    return { error };
  },

  // Get Settings
  async getSettings(organizationId: string): Promise<any> {
    const { data } = await supabase
      .from('organizations')
      .select('metadata')
      .eq('id', organizationId)
      .single();

    return data?.metadata || {};
  }
};