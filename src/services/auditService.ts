import { supabase } from "@/integrations/supabase/client";

export interface AuditLogEntry {
  id: string;
  organization_id?: string;
  user_id?: string;
  action?: string;
  resource_type?: string;
  resource_id?: string;
  metadata?: any;
  ip_address?: string;
  user_agent?: string;
  created_at?: string;
  error_message?: string;
}

export const auditService = {
  // Log audit event
  async logEvent(event: {
    action: string;
    resource_type?: string;
    resource_id?: string;
    metadata?: any;
  }): Promise<{ error: any }> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        return { error: { message: 'User not authenticated' } };
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('organization_id')
        .eq('id', user.id)
        .single();

      const { error } = await supabase
        .from('audit_logs')
        .insert({
          organization_id: profile?.organization_id,
          user_id: user.id,
          action: event.action,
          resource_type: event.resource_type || 'system',
          resource_id: event.resource_id,
          metadata: event.metadata,
        });

      return { error };
    } catch (error) {
      console.error('Failed to log audit event:', error);
      return { error };
    }
  },

  // Get audit logs
  async getAuditLogs(filters?: {
    organizationId?: string;
    userId?: string;
    action?: string;
    limit?: number;
  }): Promise<AuditLogEntry[]> {
    try {
      let query = supabase
        .from('audit_logs')
        .select(`*`)
        .order('created_at', { ascending: false });

      if (filters?.organizationId) {
        query = query.eq('organization_id', filters.organizationId);
      }
      if (filters?.userId) {
        query = query.eq('user_id', filters.userId);
      }
      if (filters?.action) {
        query = query.eq('action', filters.action);
      }

      query = query.limit(filters?.limit || 100);

      const { data } = await query;
      
      // Fix ip_address unknown type
      return (data || []).map(log => ({
        ...log,
        ip_address: typeof log.ip_address === 'string' ? log.ip_address : undefined
      })) as AuditLogEntry[];
    } catch (error) {
      console.error('Failed to get audit logs:', error);
      return [];
    }
  }
};