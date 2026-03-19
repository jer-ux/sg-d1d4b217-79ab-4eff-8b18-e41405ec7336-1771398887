/**
 * NIST-Compliant Security Headers Configuration
 * Implements NIST 800-53 security controls
 */

export type SecurityHeadersConfig = {
  contentSecurityPolicy: string;
  strictTransportSecurity: string;
  xFrameOptions: string;
  xContentTypeOptions: string;
  referrerPolicy: string;
  permissionsPolicy: string;
};

/**
 * Generate Content Security Policy header
 * NIST Control: SC-7 (Boundary Protection)
 */
export function generateCSP(isDevelopment: boolean = false): string {
  const directives = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net https://unpkg.com https://www.googletagmanager.com https://www.google-analytics.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com data:",
    "img-src 'self' data: blob: https: http:",
    "connect-src 'self' https://*.supabase.co wss://*.supabase.co https://api.stripe.com https://www.google-analytics.com",
    "frame-src 'self' https://js.stripe.com https://hooks.stripe.com",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'self'",
    "upgrade-insecure-requests"
  ];

  // In development, allow iframe embedding for preview
  if (isDevelopment) {
    const index = directives.findIndex(d => d.startsWith('frame-ancestors'));
    if (index !== -1) {
      directives[index] = "frame-ancestors 'self' http://localhost:* https://*.vercel.app";
    }
  }

  return directives.join('; ');
}

/**
 * Get NIST-compliant security headers
 * Implements multiple NIST 800-53 controls
 */
export function getSecurityHeaders(isDevelopment: boolean = false): SecurityHeadersConfig {
  return {
    // Content Security Policy - NIST SC-7
    contentSecurityPolicy: generateCSP(isDevelopment),
    
    // HTTP Strict Transport Security - NIST SC-8
    strictTransportSecurity: 'max-age=31536000; includeSubDomains; preload',
    
    // X-Frame-Options - NIST SC-7
    xFrameOptions: isDevelopment ? 'SAMEORIGIN' : 'DENY',
    
    // X-Content-Type-Options - NIST SC-18
    xContentTypeOptions: 'nosniff',
    
    // Referrer Policy - NIST AC-4
    referrerPolicy: 'strict-origin-when-cross-origin',
    
    // Permissions Policy - NIST AC-6
    permissionsPolicy: [
      'camera=()',
      'microphone=()',
      'geolocation=()',
      'payment=(self)',
      'usb=()',
      'magnetometer=()',
      'gyroscope=()',
      'accelerometer=()'
    ].join(', ')
  };
}

/**
 * Convert headers config to Next.js headers array
 */
export function toNextHeaders(config: SecurityHeadersConfig) {
  return [
    {
      key: 'Content-Security-Policy',
      value: config.contentSecurityPolicy
    },
    {
      key: 'Strict-Transport-Security',
      value: config.strictTransportSecurity
    },
    {
      key: 'X-Frame-Options',
      value: config.xFrameOptions
    },
    {
      key: 'X-Content-Type-Options',
      value: config.xContentTypeOptions
    },
    {
      key: 'Referrer-Policy',
      value: config.referrerPolicy
    },
    {
      key: 'Permissions-Policy',
      value: config.permissionsPolicy
    },
    {
      key: 'X-DNS-Prefetch-Control',
      value: 'on'
    }
  ];
}