// Simple session-based authentication for Tools access
const TOOLS_SESSION_KEY = "kincaid_tools_session";
const TOOLS_PASSWORD = process.env.NEXT_PUBLIC_TOOLS_PASSWORD || "KincaidHealth2026!";

export interface ToolsAuthSession {
  authenticated: boolean;
  loginTime: number;
  email?: string;
}

export function authenticateTools(password: string, email?: string): boolean {
  if (password === TOOLS_PASSWORD) {
    const session: ToolsAuthSession = {
      authenticated: true,
      loginTime: Date.now(),
      email: email || "guest@kincaid.health",
    };
    
    if (typeof window !== "undefined") {
      sessionStorage.setItem(TOOLS_SESSION_KEY, JSON.stringify(session));
    }
    
    return true;
  }
  
  return false;
}

export function getToolsSession(): ToolsAuthSession | null {
  if (typeof window === "undefined") {
    return null;
  }
  
  const sessionData = sessionStorage.getItem(TOOLS_SESSION_KEY);
  
  if (!sessionData) {
    return null;
  }
  
  try {
    const session: ToolsAuthSession = JSON.parse(sessionData);
    
    // Session expires after 8 hours
    const EIGHT_HOURS = 8 * 60 * 60 * 1000;
    const isExpired = Date.now() - session.loginTime > EIGHT_HOURS;
    
    if (isExpired) {
      toolsLogout();
      return null;
    }
    
    return session;
  } catch {
    return null;
  }
}

export function isToolsAuthenticated(): boolean {
  const session = getToolsSession();
  return session?.authenticated === true;
}

export function toolsLogout(): void {
  if (typeof window !== "undefined") {
    sessionStorage.removeItem(TOOLS_SESSION_KEY);
  }
}

export function requireToolsAuth(router: any): boolean {
  if (!isToolsAuthenticated()) {
    router.push("/tools/login");
    return false;
  }
  return true;
}