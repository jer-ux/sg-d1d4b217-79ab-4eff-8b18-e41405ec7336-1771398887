/**
 * Enterprise Authentication Middleware
 * Role-based access control and enterprise features
 */

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { supabase } from "@/integrations/supabase/client";

export interface EnterpriseUser {
  id: string;
  email: string;
  role: "admin" | "user" | "viewer" | "analyst" | "executive";
  organization_id: string;
  permissions: string[];
  subscription_tier: "free" | "professional" | "enterprise" | "ultimate";
}

export interface EnterpriseSession {
  user: EnterpriseUser;
  organization: {
    id: string;
    name: string;
    tier: string;
    features: string[];
  };
}

/**
 * Check if user has required permission
 */
export function hasPermission(user: EnterpriseUser, permission: string): boolean {
  // Admins have all permissions
  if (user.role === "admin") return true;

  // Check if user has specific permission
  return user.permissions.includes(permission);
}

/**
 * Check if user has required role
 */
export function hasRole(user: EnterpriseUser, roles: string[]): boolean {
  return roles.includes(user.role);
}

/**
 * Check if organization has feature access
 */
export function hasFeatureAccess(tier: string, feature: string): boolean {
  const tierFeatures: Record<string, string[]> = {
    free: ["basic_analysis", "single_upload"],
    professional: [
      "basic_analysis",
      "batch_upload",
      "pdf_reports",
      "email_reports",
      "api_access",
    ],
    enterprise: [
      "basic_analysis",
      "batch_upload",
      "pdf_reports",
      "email_reports",
      "api_access",
      "custom_branding",
      "advanced_analytics",
      "team_collaboration",
      "audit_logs",
      "sso",
    ],
    ultimate: [
      "basic_analysis",
      "batch_upload",
      "pdf_reports",
      "email_reports",
      "api_access",
      "custom_branding",
      "advanced_analytics",
      "team_collaboration",
      "audit_logs",
      "sso",
      "white_label",
      "dedicated_support",
      "custom_models",
      "data_retention",
    ],
  };

  const features = tierFeatures[tier] || [];
  return features.includes(feature);
}

/**
 * Verify enterprise session
 */
export async function verifyEnterpriseSession(
  request: NextRequest
): Promise<EnterpriseSession | null> {
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      return null;
    }

    // Get user profile with organization details
    const { data: profile } = await supabase
      .from("profiles")
      .select(
        `
        *,
        organizations!inner(
          id,
          name,
          subscription_tier,
          features
        )
      `
      )
      .eq("id", session.user.id)
      .single();

    if (!profile) {
      return null;
    }

    return {
      user: {
        id: profile.id,
        email: profile.email || "",
        role: (profile as any).role || "user",
        organization_id: (profile as any).organization_id,
        permissions: (profile as any).permissions || [],
        subscription_tier: (profile as any).organizations.subscription_tier,
      },
      organization: {
        id: (profile as any).organizations.id,
        name: (profile as any).organizations.name,
        tier: (profile as any).organizations.subscription_tier,
        features: (profile as any).organizations.features || [],
      },
    };
  } catch (error) {
    console.error("Enterprise session verification error:", error);
    return null;
  }
}

/**
 * Rate limiting for API endpoints
 */
export class RateLimiter {
  private requests: Map<string, number[]> = new Map();

  constructor(
    private maxRequests: number = 100,
    private windowMs: number = 60000
  ) {}

  isRateLimited(identifier: string): boolean {
    const now = Date.now();
    const userRequests = this.requests.get(identifier) || [];

    // Remove old requests outside the time window
    const recentRequests = userRequests.filter(
      (timestamp) => now - timestamp < this.windowMs
    );

    if (recentRequests.length >= this.maxRequests) {
      return true;
    }

    // Add current request
    recentRequests.push(now);
    this.requests.set(identifier, recentRequests);

    return false;
  }

  getRemainingRequests(identifier: string): number {
    const now = Date.now();
    const userRequests = this.requests.get(identifier) || [];
    const recentRequests = userRequests.filter(
      (timestamp) => now - timestamp < this.windowMs
    );

    return Math.max(0, this.maxRequests - recentRequests.length);
  }
}

/**
 * Audit logging for enterprise actions
 */
export interface AuditLog {
  user_id: string;
  action: string;
  resource_type: string;
  resource_id?: string;
  metadata?: Record<string, any>;
  ip_address?: string;
  user_agent?: string;
  timestamp: string;
}

export async function logAuditEvent(
  supabase: any,
  log: AuditLog
): Promise<void> {
  try {
    await supabase.from("audit_logs").insert({
      ...log,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Failed to log audit event:", error);
  }
}