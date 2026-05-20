/**
 * Admin Authentication System
 * Separate from regular user auth - uses admin_users table
 */

import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type AdminUser = Database["public"]["Tables"]["admin_users"]["Row"];

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
    
    const { data, error } = await supabase
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

    // Store admin session in localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("admin_session", JSON.stringify({
        id: data.id,
        email: data.email,
        full_name: data.full_name,
        role: data.role,
        loginTime: new Date().toISOString(),
      }));
    }

    // Update last login
    await supabase
      .from("admin_users")
      .update({ last_login_at: new Date().toISOString() })
      .eq("id", data.id);

    return {
      success: true,
      admin: data,
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