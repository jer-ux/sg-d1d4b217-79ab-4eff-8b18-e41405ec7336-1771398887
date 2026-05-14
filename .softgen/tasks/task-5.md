---
title: Performance & UX Improvements
status: todo
priority: high
type: feature
tags: [performance, ux]
created_by: agent
created_at: 2026-05-14T13:35:37Z
position: 5
---

## Notes
Implement core performance and UX improvements for the homepage:
- Replace standard img tags with Next.js Image component for automatic optimization
- Add skeleton loading states for ExecutiveWarRoom and CHROWarRoom components
- Ensure smooth user experience during data loading

## Checklist
- [ ] Replace hero img with Next.js Image component
- [ ] Add loading skeleton for ExecutiveWarRoom component
- [ ] Add loading skeleton for CHROWarRoom component
- [ ] Test image optimization and lazy loading

## Acceptance
- Hero image uses Next.js Image with proper optimization
- Dashboard sections show skeleton loaders while content loads
- No layout shift when images/content loads