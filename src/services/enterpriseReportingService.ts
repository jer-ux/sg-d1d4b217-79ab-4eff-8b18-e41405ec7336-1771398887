/**
 * Enterprise Reporting Service
 * Backend service for enterprise reporting features
 */

import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type ReportSchedule = Database["public"]["Tables"]["report_schedules"]["Row"];
type ReportHistory = Database["public"]["Tables"]["report_history"]["Row"];

export interface ReportTemplate {
  id: string;
  name: string;
  description: string;
  sections: string[];
  format: "pdf" | "html" | "excel";
  is_custom: boolean;
  created_by?: string;
  organization_id?: string;
}

export interface ScheduledReport {
  id: string;
  name: string;
  template_id: string;
  frequency: "daily" | "weekly" | "monthly" | "quarterly";
  recipients: string[];
  filters?: Record<string, any>;
  next_run: string;
  last_run?: string;
  is_active: boolean;
}

export interface ReportGenerationOptions {
  template_id: string;
  contract_ids?: string[];
  date_range?: {
    start: string;
    end: string;
  };
  filters?: Record<string, any>;
  branding?: {
    company_name: string;
    logo_url?: string;
    colors?: Record<string, string>;
  };
  confidentiality_level?: "Public" | "Internal" | "Confidential" | "Highly Confidential";
}

/**
 * Enterprise Reporting Service
 */
export class EnterpriseReportingService {
  /**
   * Get all report templates for organization
   */
  static async getReportTemplates(organizationId: string): Promise<ReportTemplate[]> {
    const { data, error } = await supabase
      .from("report_templates")
      .select("*")
      .or(`organization_id.eq.${organizationId},is_custom.eq.false`)
      .order("name");

    if (error) {
      console.error("Error fetching report templates:", error);
      return [];
    }

    return data as ReportTemplate[];
  }

  /**
   * Create custom report template
   */
  static async createReportTemplate(
    template: Omit<ReportTemplate, "id">
  ): Promise<ReportTemplate | null> {
    const { data, error } = await supabase
      .from("report_templates")
      .insert(template)
      .select()
      .single();

    if (error) {
      console.error("Error creating report template:", error);
      return null;
    }

    return data as ReportTemplate;
  }

  /**
   * Get scheduled reports for organization
   */
  static async getScheduledReports(organizationId: string): Promise<ScheduledReport[]> {
    const { data, error } = await supabase
      .from("report_schedules")
      .select("*")
      .eq("organization_id", organizationId)
      .order("next_run");

    if (error) {
      console.error("Error fetching scheduled reports:", error);
      return [];
    }

    return data as ScheduledReport[];
  }

  /**
   * Create scheduled report
   */
  static async createScheduledReport(
    schedule: Omit<ScheduledReport, "id">
  ): Promise<ScheduledReport | null> {
    const { data, error } = await supabase
      .from("report_schedules")
      .insert(schedule)
      .select()
      .single();

    if (error) {
      console.error("Error creating scheduled report:", error);
      return null;
    }

    return data as ScheduledReport;
  }

  /**
   * Update scheduled report
   */
  static async updateScheduledReport(
    id: string,
    updates: Partial<ScheduledReport>
  ): Promise<boolean> {
    const { error } = await supabase
      .from("report_schedules")
      .update(updates)
      .eq("id", id);

    if (error) {
      console.error("Error updating scheduled report:", error);
      return false;
    }

    return true;
  }

  /**
   * Delete scheduled report
   */
  static async deleteScheduledReport(id: string): Promise<boolean> {
    const { error } = await supabase
      .from("report_schedules")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error deleting scheduled report:", error);
      return false;
    }

    return true;
  }

  /**
   * Generate report on-demand
   */
  static async generateReport(
    options: ReportGenerationOptions
  ): Promise<{ url: string; report_id: string } | null> {
    try {
      // Call backend API to generate report
      const response = await fetch("/api/enterprise/generate-report", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(options),
      });

      if (!response.ok) {
        throw new Error("Failed to generate report");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error generating report:", error);
      return null;
    }
  }

  /**
   * Batch export multiple reports
   */
  static async batchExport(
    contractIds: string[],
    options: Omit<ReportGenerationOptions, "contract_ids">
  ): Promise<{ url: string; count: number } | null> {
    try {
      const response = await fetch("/api/enterprise/batch-export", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...options,
          contract_ids: contractIds,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to batch export");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error in batch export:", error);
      return null;
    }
  }

  /**
   * Get report generation history
   */
  static async getReportHistory(
    organizationId: string,
    limit: number = 50
  ): Promise<ReportHistory[]> {
    const { data, error } = await supabase
      .from("report_history")
      .select("*")
      .eq("organization_id", organizationId)
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error) {
      console.error("Error fetching report history:", error);
      return [];
    }

    return data as ReportHistory[];
  }

  /**
   * Get reporting analytics
   */
  static async getReportingAnalytics(organizationId: string) {
    const { data, error } = await supabase
      .from("report_analytics")
      .select("*")
      .eq("organization_id", organizationId)
      .single();

    if (error) {
      console.error("Error fetching reporting analytics:", error);
      return null;
    }

    return data;
  }

  /**
   * Email report to recipients
   */
  static async emailReport(
    reportId: string,
    recipients: string[],
    message?: string
  ): Promise<boolean> {
    try {
      const response = await fetch("/api/enterprise/email-report", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          report_id: reportId,
          recipients,
          message,
        }),
      });

      return response.ok;
    } catch (error) {
      console.error("Error emailing report:", error);
      return false;
    }
  }
}