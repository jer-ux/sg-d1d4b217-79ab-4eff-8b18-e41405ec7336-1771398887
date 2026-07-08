---
title: Login and Signup Pages with MFA
status: todo
priority: urgent
type: feature
tags: [ui, auth, mfa]
created_by: agent
created_at: 2026-07-08T08:26:44Z
position: 2
---

## Notes
Build login and signup pages with multi-factor authentication flows. Include email verification, MFA enrollment/verification, password reset, and loading states. Use industrial design system with Vegas-style graphics.

## Checklist
- [ ] Create /auth/login page with email/password form
- [ ] Create /auth/signup page with role selection (hidden, admin-only)
- [ ] Build MFA enrollment modal (QR code + backup codes)
- [ ] Build MFA verification input (6-digit code)
- [ ] Create password reset flow (/auth/reset-password)
- [ ] Add loading states and error handling
- [ ] Style with Vegas-grade visual effects

## Acceptance
- Users can log in and complete MFA challenge
- New users can sign up and enroll in MFA
- Password reset flow works end-to-end