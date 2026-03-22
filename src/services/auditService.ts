import { supabase } from "@/integrations/supabase/client";

export interface AuditLogEntry {
  id: string;
  organization_id: string;
  user_id: string;
  action: string;
  resource_type: string;
  resource_id?: string;
  metadata?: any;
  ip_address?: string;
  user_agent?: string;
  created_at: string;
}

export const auditService = {
  // ==========================================
  // AUDIT LOGGING
  // ==========================================

  // Log audit event
  async logEvent(event: {
    action: string;
    resource_type: string;
    resource_id?: string;
    metadata?: any;
    severity?: 'info' | 'warning' | 'critical';
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
          resource_type: event.resource_type,
          resource_id: event.resource_id,
          metadata: event.metadata,
          severity: event.severity || 'info'
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
    resourceType?: string;
    startDate?: string;
    endDate?: string;
    severity?: string;
    limit?: number;
  }): Promise<AuditLogEntry[]> {
    try {
      let query = supabase
        .from('audit_logs')
        .select(`
          *,
          profiles (
            email,
            full_name
          )
        `)
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
      if (filters?.resourceType) {
        query = query.eq('resource_type', filters.resourceType);
      }
      if (filters?.severity) {
        query = query.eq('severity', filters.severity);
      }
      if (filters?.startDate) {
        query = query.gte('created_at', filters.startDate);
      }
      if (filters?.endDate) {
        query = query.lte('created_at', filters.endDate);
      }

      query = query.limit(filters?.limit || 100);

      const { data } = await query;
      return data || [];
    } catch (error) {
      console.error('Failed to get audit logs:', error);
      return [];
    }
  },

  // Export audit logs (compliance requirement)
  async exportAuditLogs(filters?: {
    startDate?: string;
    endDate?: string;
    format?: 'csv' | 'json';
  }): Promise<{ data: any; error: any }> {
    try {
      const logs = await this.getAuditLogs({
        startDate: filters?.startDate,
        endDate: filters?.endDate,
        limit: 10000
      });

      if (filters?.format === 'csv') {
        // Convert to CSV
        const headers = ['timestamp', 'user', 'action', 'resource_type', 'resource_id', 'severity'];
        const csvRows = [headers.join(',')];
        
        logs.forEach(log => {
          const row = [
            log.created_at,
            (log as any).profiles?.email || log.user_id,
            log.action,
            log.resource_type,
            log.resource_id || '',
            (log as any).severity || 'info'
          ];
          csvRows.push(row.join(','));
        });

        return { data: csvRows.join('\n'), error: null };
      }

      return { data: logs, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  // ==========================================
  // COMPLIANCE REPORTING
  // ==========================================

  // Generate compliance report
  async generateComplianceReport(period: {
    startDate: string;
    endDate: string;
  }): Promise<any> {
    const logs = await this.getAuditLogs({
      startDate: period.startDate,
      endDate: period.endDate,
      limit: 100000
    });

    // Aggregate statistics
    const stats = {
      total_events: logs.length,
      by_action: {} as Record<string, number>,
      by_severity: {} as Record<string, number>,
      by_user: {} as Record<string, number>,
      critical_events: logs.filter(l => (l as any).severity === 'critical').length,
      warning_events: logs.filter(l => (l as any).severity === 'warning').length
    };

    logs.forEach(log => {
      stats.by_action[log.action] = (stats.by_action[log.action] || 0) + 1;
      stats.by_severity[(log as any).severity || 'info'] = (stats.by_severity[(log as any).severity || 'info'] || 0) + 1;
      stats.by_user[log.user_id] = (stats.by_user[log.user_id] || 0) + 1;
    });

    return {
      period,
      statistics: stats,
      critical_events: logs.filter(l => (l as any).severity === 'critical'),
      generated_at: new Date().toISOString()
    };
  },

  // ==========================================
  // DATA RETENTION
  // ==========================================

  // Archive old audit logs (compliance requirement)
  async archiveOldLogs(olderThanDays: number = 365): Promise<{ archived: number; error: any }> {
    try {
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - olderThanDays);

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        return { archived: 0, error: { message: 'User not authenticated' } };
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('organization_id')
        .eq('id', user.id)
        .single();

      // In a real implementation, this would move logs to cold storage
      // For now, we'll just mark them as archived
      const { data, error } = await supabase
        .from('audit_logs')
        .update({ archived: true })
        .eq('organization_id', profile?.organization_id)
        .lt('created_at', cutoffDate.toISOString())
        .select('id');

      return { archived: data?.length || 0, error };
    } catch (error) {
      return { archived: 0, error };
    }
  }
};