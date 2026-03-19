import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getSecurityHeaders } from './lib/security/security-headers';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const isDevelopment = process.env.NODE_ENV === 'development';
  const securityConfig = getSecurityHeaders(isDevelopment);

  // Apply Content-Security-Policy (except in dev for iframe preview compatibility if needed)
  if (process.env.NODE_ENV === 'production' || !isDevelopment) {
    response.headers.set('Content-Security-Policy', securityConfig.contentSecurityPolicy);
    response.headers.set('X-Frame-Options', securityConfig.xFrameOptions);
  }

  // Apply other NIST-compliant security headers
  response.headers.set('Strict-Transport-Security', securityConfig.strictTransportSecurity);
  response.headers.set('X-Content-Type-Options', securityConfig.xContentTypeOptions);
  response.headers.set('Referrer-Policy', securityConfig.referrerPolicy);
  response.headers.set('Permissions-Policy', securityConfig.permissionsPolicy);
  response.headers.set('X-DNS-Prefetch-Control', 'on');

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};