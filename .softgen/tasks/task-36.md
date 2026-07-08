---
title: Authentication Infrastructure with MFA
status: in_progress
priority: urgent
type: feature
tags: [auth, security, mfa, supabase]
created_by: agent
created_at: 2026-07-08T08:26:44Z
position: 1
---

## Notes
Set up Supabase Auth with multi-factor authentication (email/password + authenticator app). Enable role-based access control for internal team vs investors/partners. Configure session management and protected routes.

## Checklist
- [ ] Enable MFA in Supabase Auth config
- [ ] Create users table with role field (internal_team, investor, partner)
- [ ] Create RLS policies for role-based data access
- [ ] Build auth service with login/signup/MFA enrollment functions
- [ ] Create protected route middleware for role checking
- [ ] Set up session management with JWT tokens

## Acceptance
- Users can sign up with email/password and enroll in MFA
- Only users with correct roles can access their respective dashboards
- Sessions persist securely and auto-refresh