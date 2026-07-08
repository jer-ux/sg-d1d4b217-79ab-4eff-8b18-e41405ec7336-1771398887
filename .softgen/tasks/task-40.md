---
title: User Management and Admin Controls
status: todo
priority: medium
type: feature
tags: [admin, users, management]
created_by: agent
created_at: 2026-07-08T08:26:44Z
position: 5
---

## Notes
Build admin controls for managing users, inviting new users, changing roles, and viewing audit logs. Accessible only to internal_team with admin privileges.

## Checklist
- [ ] Create /portal/admin/users page (super admin only)
- [ ] Build user list table with search and filters
- [ ] Add invite user modal with role selection
- [ ] Create role change functionality
- [ ] Add user deactivation/reactivation controls
- [ ] Build audit log viewer showing auth events
- [ ] Style with secure command center aesthetics

## Acceptance
- Admins can invite new users with specific roles
- Admins can change user roles and deactivate accounts
- All actions are logged in audit trail