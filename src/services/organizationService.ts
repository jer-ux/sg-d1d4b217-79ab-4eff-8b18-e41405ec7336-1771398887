import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type Organization = Database['public']['Tables']['organizations']['Row'];
type OrganizationInsert = Database['public']['Tables']['organizations']['Insert'];
type OrganizationMember = Database['public']['Tables']['organization_members']['Row'];

export interface OrganizationWithMembers extends Organization {
  member_count?: number;
  members?: OrganizationMember[];
}

export const organizationService = {
  // ==========================================
  // ORGANIZATION CRUD
  // ==========================================

  // Create organization
  async createOrganization(data: {
    name: string;
    slug: string;
    domain?: string;
    logo_url?: string;
    settings?: any;
  }): Promise<{ organization: Organization | null; error: any }> {
    try {
      const { data: org, error } = await supabase
        .from('organizations')
        .insert({
          name: data.name,
          slug: data.slug,
          domain: data.domain,
          logo_url: data.logo_url,
          settings: data.settings || {},
          plan_tier: 'enterprise',
          status: 'active'
        })
        .select()
        .single();

      if (error) {
        console.error('Create organization error:', error);
        return { organization: null, error };
      }

      // Add creator as admin
      const { data: { user } } = await supabase.auth.getUser();
      if (user && org) {
        await this.addMember(org.id, user.id, 'admin');
      }

      return { organization: org, error: null };
    } catch (error) {
      console.error('Unexpected error:', error);
      return { organization: null, error };
    }
  },

  // Get organization by ID
  async getOrganization(id: string): Promise<Organization | null> {
    const { data } = await supabase
      .from('organizations')
      .select('*')
      .eq('id', id)
      .single();

    return data;
  },

  // Get organization by slug
  async getOrganizationBySlug(slug: string): Promise<Organization | null> {
    const { data } = await supabase
      .from('organizations')
      .select('*')
      .eq('slug', slug)
      .single();

    return data;
  },

  // Update organization
  async updateOrganization(id: string, updates: Partial<Organization>): Promise<{ error: any }> {
    const { error } = await supabase
      .from('organizations')
      .update(updates)
      .eq('id', id);

    return { error };
  },

  // Delete organization (soft delete)
  async deleteOrganization(id: string): Promise<{ error: any }> {
    const { error } = await supabase
      .from('organizations')
      .update({ status: 'inactive', deleted_at: new Date().toISOString() })
      .eq('id', id);

    return { error };
  },

  // ==========================================
  // MEMBER MANAGEMENT
  // ==========================================

  // Add member to organization
  async addMember(organizationId: string, userId: string, role: 'admin' | 'member' | 'viewer'): Promise<{ error: any }> {
    const { error } = await supabase
      .from('organization_members')
      .insert({
        organization_id: organizationId,
        user_id: userId,
        role,
        status: 'active'
      });

    return { error };
  },

  // Remove member from organization
  async removeMember(organizationId: string, userId: string): Promise<{ error: any }> {
    const { error } = await supabase
      .from('organization_members')
      .delete()
      .eq('organization_id', organizationId)
      .eq('user_id', userId);

    return { error };
  },

  // Update member role
  async updateMemberRole(organizationId: string, userId: string, role: 'admin' | 'member' | 'viewer'): Promise<{ error: any }> {
    const { error } = await supabase
      .from('organization_members')
      .update({ role })
      .eq('organization_id', organizationId)
      .eq('user_id', userId);

    return { error };
  },

  // Get organization members
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
      .eq('organization_id', organizationId)
      .eq('status', 'active')
      .order('created_at', { ascending: true });

    return data || [];
  },

  // ==========================================
  // INVITATIONS
  // ==========================================

  // Invite user to organization
  async inviteUser(organizationId: string, email: string, role: 'admin' | 'member' | 'viewer'): Promise<{ error: any }> {
    const { error } = await supabase
      .from('organization_invitations')
      .insert({
        organization_id: organizationId,
        email,
        role,
        status: 'pending',
        expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // 7 days
      });

    return { error };
  },

  // Accept invitation
  async acceptInvitation(invitationId: string): Promise<{ error: any }> {
    const { data: invitation } = await supabase
      .from('organization_invitations')
      .select('*')
      .eq('id', invitationId)
      .eq('status', 'pending')
      .single();

    if (!invitation) {
      return { error: { message: 'Invitation not found or expired' } };
    }

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return { error: { message: 'User not authenticated' } };
    }

    // Add user to organization
    const { error: memberError } = await this.addMember(
      invitation.organization_id,
      user.id,
      invitation.role
    );

    if (memberError) {
      return { error: memberError };
    }

    // Update invitation status
    const { error } = await supabase
      .from('organization_invitations')
      .update({ status: 'accepted' })
      .eq('id', invitationId);

    return { error };
  },

  // Get pending invitations
  async getPendingInvitations(organizationId: string): Promise<any[]> {
    const { data } = await supabase
      .from('organization_invitations')
      .select('*')
      .eq('organization_id', organizationId)
      .eq('status', 'pending')
      .order('created_at', { ascending: false });

    return data || [];
  },

  // ==========================================
  // API KEYS
  // ==========================================

  // Create API key
  async createAPIKey(organizationId: string, name: string, permissions: string[]): Promise<{ apiKey: string | null; error: any }> {
    const apiKey = `sk_${organizationId.substring(0, 8)}_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;

    const { error } = await supabase
      .from('api_keys')
      .insert({
        organization_id: organizationId,
        name,
        key_hash: apiKey, // In production, hash this
        permissions,
        status: 'active'
      });

    if (error) {
      return { apiKey: null, error };
    }

    return { apiKey, error: null };
  },

  // Revoke API key
  async revokeAPIKey(keyId: string): Promise<{ error: any }> {
    const { error } = await supabase
      .from('api_keys')
      .update({ status: 'revoked' })
      .eq('id', keyId);

    return { error };
  },

  // Get organization API keys
  async getAPIKeys(organizationId: string): Promise<any[]> {
    const { data } = await supabase
      .from('api_keys')
      .select('id, name, permissions, status, created_at, last_used_at')
      .eq('organization_id', organizationId)
      .order('created_at', { ascending: false });

    return data || [];
  },

  // ==========================================
  // USAGE & BILLING
  // ==========================================

  // Track usage
  async trackUsage(organizationId: string, metric: string, value: number, metadata?: any): Promise<{ error: any }> {
    const { error } = await supabase
      .from('usage_tracking')
      .insert({
        organization_id: organizationId,
        metric,
        value,
        metadata,
        timestamp: new Date().toISOString()
      });

    return { error };
  },

  // Get usage statistics
  async getUsageStats(organizationId: string, startDate: string, endDate: string): Promise<any[]> {
    const { data } = await supabase
      .from('usage_tracking')
      .select('*')
      .eq('organization_id', organizationId)
      .gte('timestamp', startDate)
      .lte('timestamp', endDate)
      .order('timestamp', { ascending: true });

    return data || [];
  },

  // Get current billing cycle usage
  async getCurrentUsage(organizationId: string): Promise<any> {
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const { data } = await supabase
      .from('usage_tracking')
      .select('metric, value')
      .eq('organization_id', organizationId)
      .gte('timestamp', startOfMonth.toISOString());

    // Aggregate by metric
    const usage: Record<string, number> = {};
    data?.forEach(item => {
      usage[item.metric] = (usage[item.metric] || 0) + item.value;
    });

    return usage;
  },

  // ==========================================
  // SETTINGS & PREFERENCES
  // ==========================================

  // Update organization settings
  async updateSettings(organizationId: string, settings: any): Promise<{ error: any }> {
    const { error } = await supabase
      .from('organizations')
      .update({ settings })
      .eq('id', organizationId);

    return { error };
  },

  // Get organization settings
  async getSettings(organizationId: string): Promise<any> {
    const { data } = await supabase
      .from('organizations')
      .select('settings')
      .eq('id', organizationId)
      .single();

    return data?.settings || {};
  }
};