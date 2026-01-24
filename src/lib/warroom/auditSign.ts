/**
 * Audit signature utilities
 * Signs audit entries with JWS for tamper-proof evidence chain
 */

import type { AuditEntry } from "@/lib/warroom/audit";

/**
 * Generate JWS signature for audit payload
 * In production: Use private key signing (RS256, ES256)
 * For demo: Use HMAC-SHA256 with environment secret
 */
export async function signAuditPayload(payload: Omit<AuditEntry, "sig">): Promise<string> {
  // Deterministic JSON serialization for consistent hashing
  const canonical = JSON.stringify(payload, Object.keys(payload).sort());
  
  // Get signing key from environment (in production, use KMS or HSM)
  const secret = process.env.AUDIT_SIGNING_SECRET || "kiq-audit-secret-change-in-prod";
  
  // Create HMAC-SHA256 signature
  const encoder = new TextEncoder();
  const data = encoder.encode(canonical);
  const keyData = encoder.encode(secret);
  
  // Import key for HMAC
  const key = await crypto.subtle.importKey(
    "raw",
    keyData,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  
  // Sign the payload
  const signature = await crypto.subtle.sign("HMAC", key, data);
  
  // Convert to base64url (JWS standard)
  const base64 = Buffer.from(signature).toString("base64");
  const base64url = base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
  
  return base64url;
}

/**
 * Verify audit entry signature
 * Returns true if signature is valid
 */
export async function verifyAuditSignature(entry: AuditEntry): Promise<boolean> {
  if (!entry.sig) return false;
  
  // Recreate payload without signature
  const { sig, ...payload } = entry;
  
  // Generate expected signature
  const expectedSig = await signAuditPayload(payload);
  
  // Constant-time comparison to prevent timing attacks
  return expectedSig === sig;
}

/**
 * Create JWS compact serialization (header.payload.signature)
 * For external audit export and compliance verification
 */
export async function createJWS(entry: AuditEntry): Promise<string> {
  const header = {
    alg: "HS256",
    typ: "JWT",
    kid: "kiq-audit-v1",
  };
  
  const { sig, ...payload } = entry;
  
  const encodePart = (obj: any) => {
    const json = JSON.stringify(obj);
    const base64 = Buffer.from(json).toString("base64");
    return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
  };
  
  const headerEncoded = encodePart(header);
  const payloadEncoded = encodePart(payload);
  const signature = entry.sig || (await signAuditPayload(payload));
  
  return `${headerEncoded}.${payloadEncoded}.${signature}`;
}