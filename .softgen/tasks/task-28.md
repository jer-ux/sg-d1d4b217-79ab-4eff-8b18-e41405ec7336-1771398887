---
title: Create Dedicated Uploads Showcase Page and Add Navigation Tab
status: in_progress
priority: urgent
type: feature
tags: [navigation, uploads, showcase, assets]
created_by: agent
created_at: 2026-06-14T14:02:00Z
position: 28
---

## Notes:
Create a dedicated uploads showcase page (`src/pages/all-uploads.tsx`) grouping all uploaded PDFs, briefs, carousels, and visual evidence, and add a persistent tab to all site navigation bars pointing to it.

## Checklist:
- [ ] Create `src/pages/all-uploads.tsx` listing every PDF and image upload with search, categorization, and preview lightbox support.
- [ ] Open and update all navigation files (`src/components/Nav.tsx`, `src/components/Navbar.tsx`, `src/components/siriusb/SiriusBNav.tsx`, `src/components/site/SiteHeader.tsx`).
- [ ] Add the "Uploads & Briefs" link to each header navigation menu.
- [ ] Run a project check to verify compilation is error-free.