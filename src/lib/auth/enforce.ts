import { NextRequest } from "next/server";

export type Role = "operator" | "approver" | "admin" | "viewer";

export type EnforceResult =
  | { ok: true; user: { sub: string; email: string; role: Role } }
  | { ok: false; error: string; status: number };

/**
 * Enforce role-based access control.
 * 
 * In production, replace this with:
 * - JWT verification (Auth0, Clerk, Supabase Auth, etc.)
 * - Session validation (NextAuth, Iron Session, etc.)
 * - API key validation for service accounts
 * 
 * For demo/development, we check:
 * - Authorization: Bearer <token> header
 * - x-kiq-user-id and x-kiq-user-role headers
 */
export async function enforce(
  requiredRole: Role | Role[],
  req?: Request | NextRequest
): Promise<EnforceResult> {
  // Development mode: check headers for demo purposes
  if (process.env.NODE_ENV === "development" || process.env.KIQ_AUTH_MODE === "dev") {
    const userId = req?.headers.get("x-kiq-user-id") || process.env.KIQ_DEFAULT_USER_ID || "dev-user";
    const userEmail = req?.headers.get("x-kiq-user-email") || process.env.KIQ_DEFAULT_USER_EMAIL || "dev@kiq.local";
    const userRole = (req?.headers.get("x-kiq-user-role") || process.env.KIQ_DEFAULT_USER_ROLE || "admin") as Role;

    // Check if user has required role
    const required = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
    if (!hasRole(userRole, required)) {
      return {
        ok: false,
        error: `Insufficient permissions. Required: ${required.join(" or ")}`,
        status: 403,
      };
    }

    return {
      ok: true,
      user: { sub: userId, email: userEmail, role: userRole },
    };
  }

  // Production mode: verify JWT or session
  const authHeader = req?.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return {
      ok: false,
      error: "Missing or invalid authorization header",
      status: 401,
    };
  }

  const token = authHeader.substring(7);

  try {
    // TODO: Replace with your auth provider's JWT verification
    // Examples:
    // - Auth0: await auth0.verifyToken(token)
    // - Clerk: await clerkClient.verifyToken(token)
    // - Supabase: await supabase.auth.getUser(token)
    // - Custom JWT: await jwt.verify(token, secret)

    // Placeholder: decode token without verification (INSECURE - replace in production!)
    const payload = JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());

    const user = {
      sub: payload.sub || "unknown",
      email: payload.email || "unknown@example.com",
      role: (payload.role || "viewer") as Role,
    };

    const required = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
    if (!hasRole(user.role, required)) {
      return {
        ok: false,
        error: `Insufficient permissions. Required: ${required.join(" or ")}`,
        status: 403,
      };
    }

    return { ok: true, user };
  } catch (err) {
    return {
      ok: false,
      error: "Invalid or expired token",
      status: 401,
    };
  }
}

/**
 * Role hierarchy check
 */
function hasRole(userRole: Role, requiredRoles: Role[]): boolean {
  const hierarchy: Record<Role, number> = {
    viewer: 1,
    operator: 2,
    approver: 3,
    admin: 4,
  };

  const userLevel = hierarchy[userRole] || 0;
  const requiredLevels = requiredRoles.map((r) => hierarchy[r] || 999);
  const minRequired = Math.min(...requiredLevels);

  return userLevel >= minRequired;
}

/**
 * Extract user info from request without enforcement (for optional auth)
 */
export async function getUser(req?: Request | NextRequest) {
  const result = await enforce("viewer", req);
  return result.ok ? result.user : null;
}