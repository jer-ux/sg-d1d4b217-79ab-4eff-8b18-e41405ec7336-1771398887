/**
 * Security Audit Logging System
 * NIST Control: AU-2, AU-3, AU-12 (Audit and Accountability)
 */

export type AuditEventType = 
  | 'auth.login'
  | 'auth.logout'
  | 'auth.failed_login'
  | 'auth.password_reset'
  | 'data.access'
  | 'data.create'
  | 'data.update'
  | 'data.delete'
  | 'security.anomaly'
  | 'security.incident'
  | 'system.config_change'
  | 'system.error';

export type AuditSeverity = 'low' | 'medium' | 'high' | 'critical';

export type AuditEvent = {
  id: string;
  timestamp: Date;
  type: AuditEventType;
  severity: AuditSeverity;
  userId?: string;
  userEmail?: string;
  ipAddress?: string;
  userAgent?: string;
  resource?: string;
  action?: string;
  outcome: 'success' | 'failure';
  details?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
};

/**
 * In-memory audit log (for demonstration)
 * In production, this should be persisted to a secure database
 */
const auditLog: AuditEvent[] = [];

/**
 * Log an audit event
 * NIST AU-2: Audit Events
 */
export function logAuditEvent(event: Omit<AuditEvent, 'id' | 'timestamp'>): AuditEvent {
  const auditEvent: AuditEvent = {
    ...event,
    id: crypto.randomUUID(),
    timestamp: new Date()
  };

  auditLog.push(auditEvent);

  // In production, persist to database
  if (typeof window === 'undefined') {
    console.log('[AUDIT]', {
      type: auditEvent.type,
      severity: auditEvent.severity,
      user: auditEvent.userEmail || auditEvent.userId,
      outcome: auditEvent.outcome
    });
  }

  // Alert on critical events
  if (auditEvent.severity === 'critical') {
    alertSecurityTeam(auditEvent);
  }

  return auditEvent;
}

/**
 * Get audit events with filters
 * NIST AU-6: Audit Review
 */
export function getAuditEvents(filters?: {
  type?: AuditEventType;
  severity?: AuditSeverity;
  userId?: string;
  startDate?: Date;
  endDate?: Date;
  outcome?: 'success' | 'failure';
}): AuditEvent[] {
  let filtered = [...auditLog];

  if (filters?.type) {
    filtered = filtered.filter(e => e.type === filters.type);
  }
  if (filters?.severity) {
    filtered = filtered.filter(e => e.severity === filters.severity);
  }
  if (filters?.userId) {
    filtered = filtered.filter(e => e.userId === filters.userId);
  }
  if (filters?.outcome) {
    filtered = filtered.filter(e => e.outcome === filters.outcome);
  }
  if (filters?.startDate) {
    filtered = filtered.filter(e => e.timestamp >= filters.startDate!);
  }
  if (filters?.endDate) {
    filtered = filtered.filter(e => e.timestamp <= filters.endDate!);
  }

  return filtered.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
}

/**
 * Get audit statistics
 * NIST AU-6: Audit Review and Analysis
 */
export function getAuditStatistics(timeframe: 'hour' | 'day' | 'week' | 'month' = 'day') {
  const now = new Date();
  const cutoff = new Date();
  
  switch (timeframe) {
    case 'hour':
      cutoff.setHours(cutoff.getHours() - 1);
      break;
    case 'day':
      cutoff.setDate(cutoff.getDate() - 1);
      break;
    case 'week':
      cutoff.setDate(cutoff.getDate() - 7);
      break;
    case 'month':
      cutoff.setMonth(cutoff.getMonth() - 1);
      break;
  }

  const recentEvents = auditLog.filter(e => e.timestamp >= cutoff);

  return {
    total: recentEvents.length,
    byType: recentEvents.reduce((acc, e) => {
      acc[e.type] = (acc[e.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>),
    bySeverity: recentEvents.reduce((acc, e) => {
      acc[e.severity] = (acc[e.severity] || 0) + 1;
      return acc;
    }, {} as Record<string, number>),
    failures: recentEvents.filter(e => e.outcome === 'failure').length,
    criticalEvents: recentEvents.filter(e => e.severity === 'critical').length
  };
}

/**
 * Alert security team for critical events
 * NIST IR-4: Incident Handling
 */
function alertSecurityTeam(event: AuditEvent): void {
  // In production, integrate with alerting system (email, Slack, PagerDuty, etc.)
  console.error('[SECURITY ALERT]', {
    type: event.type,
    severity: event.severity,
    timestamp: event.timestamp,
    user: event.userEmail || event.userId,
    details: event.details
  });
}

/**
 * Helper functions for common audit events
 */
export const auditHelpers = {
  logLogin: (userId: string, email: string, success: boolean, ipAddress?: string) =>
    logAuditEvent({
      type: success ? 'auth.login' : 'auth.failed_login',
      severity: success ? 'low' : 'medium',
      userId,
      userEmail: email,
      ipAddress,
      outcome: success ? 'success' : 'failure'
    }),

  logDataAccess: (userId: string, resource: string, ipAddress?: string) =>
    logAuditEvent({
      type: 'data.access',
      severity: 'low',
      userId,
      resource,
      ipAddress,
      outcome: 'success'
    }),

  logSecurityIncident: (description: string, userId?: string, details?: Record<string, unknown>) =>
    logAuditEvent({
      type: 'security.incident',
      severity: 'critical',
      userId,
      outcome: 'failure',
      details: { description, ...details }
    })
};