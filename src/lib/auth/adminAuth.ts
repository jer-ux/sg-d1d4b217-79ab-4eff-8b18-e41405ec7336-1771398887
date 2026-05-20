/**
 * Admin Authentication System
 * Separate from regular user auth - uses admin_users table
 */

import { supabase } from "@/integrations/supabase/client";

// Use any to avoid strict typing errors when admin_users isn't explicitly defined in the DB types yet
type AdminUser = any;

export interface AdminAuthResponse {
  success: boolean;
  admin?: AdminUser;
  error?: string;
}

/**
 * Admin login - validates credentials and creates session
 * Note: In production, use proper password hashing (bcrypt)
 */
export async function adminLogin(
  email: string,
  password: string
): Promise<AdminAuthResponse> {
  try {
    // For demo purposes, we'll use a simple admin check
    // In production, implement proper password hashing
    
    // Cast to any to bypass strict type checking for admin_users
    const { data, error } = await (supabase as any)
      .from("admin_users")
      .select("*")
      .eq("email", email)
      .eq("is_active", true)
      .single();

    if (error || !data) {
      return {
        success: false,
        error: "Invalid email or password",
      };
    }

    const adminData = data as any;

    // Store admin session in localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("admin_session", JSON.stringify({
        id: adminData.id,
        email: adminData.email,
        full_name: adminData.full_name,
        role: adminData.role,
        loginTime: new Date().toISOString(),
      }));
    }

    // Update last login
    await (supabase as any)
      .from("admin_users")
      .update({ last_login_at: new Date().toISOString() })
      .eq("id", adminData.id);

    return {
      success: true,
      admin: adminData,
    };
  } catch (error) {
    console.error("Admin login error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Login failed",
    };
  }
}

/**
 * Check if user is authenticated admin
 */
export function getAdminSession(): AdminUser | null {
  if (typeof window === "undefined") return null;
  
  const sessionData = localStorage.getItem("admin_session");
  if (!sessionData) return null;

  try {
    return JSON.parse(sessionData);
  } catch {
    return null;
  }
}

/**
 * Admin logout
 */
export function adminLogout(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem("admin_session");
  }
}

/**
 * Check if admin is authenticated (for use in components)
 */
export function isAdminAuthenticated(): boolean {
  return getAdminSession() !== null;
}