/**
 * Demo User Management
 * Creates and manages demo/test user sessions
 */

import { supabase } from "@/integrations/supabase/client";

export const DEMO_USER = {
  email: "demo@kincaidhealth.ai",
  password: "Demo2024!Secure",
  id: "00000000-0000-0000-0000-000000000001", // Fixed UUID for demo
  org_id: "11111111-1111-1111-1111-111111111111" // Demo org
};

/**
 * Sign in as demo user (creates account if doesn't exist)
 */
export async function signInAsDemo() {
  try {
    console.log("🎭 Attempting demo sign-in...");

    // Try to sign in first
    const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
      email: DEMO_USER.email,
      password: DEMO_USER.password,
    });

    if (signInData?.user) {
      console.log("✅ Demo user signed in successfully");
      return { success: true, user: signInData.user };
    }

    // If sign-in failed, try to create account
    if (signInError?.message?.includes("Invalid login credentials")) {
      console.log("📝 Creating demo user account...");
      
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email: DEMO_USER.email,
        password: DEMO_USER.password,
        options: {
          data: {
            full_name: "Demo User",
            role: "demo"
          }
        }
      });

      if (signUpError) {
        console.error("❌ Demo user creation failed:", signUpError);
        return { success: false, error: signUpError.message };
      }

      if (signUpData?.user) {
        console.log("✅ Demo user created and signed in");
        return { success: true, user: signUpData.user };
      }
    }

    return { success: false, error: signInError?.message || "Unknown error" };

  } catch (error: any) {
    console.error("❌ Demo sign-in error:", error);
    return { success: false, error: error.message };
  }
}

/**
 * Check if current user is demo user
 */
export async function isDemoUser(): Promise<boolean> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    return user?.email === DEMO_USER.email;
  } catch {
    return false;
  }
}

/**
 * Get demo mode status from environment
 */
export function isDemoModeEnabled(): boolean {
  return process.env.NEXT_PUBLIC_DEMO_MODE === "true";
}