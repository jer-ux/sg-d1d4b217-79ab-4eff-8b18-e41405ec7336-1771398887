---
title: Gate Landing Page Tools with Contact Info Capture
status: done
priority: urgent
type: feature
tags: [auth, gate, lead-gen]
created_by: agent
created_at: 2026-06-13T07:07:00Z
position: 1
---

## Notes:
Integrate a premium lead capture overlay/gate across all three active Fiduciary Lab Hub toolkits:
1. **LandingUploader**: Gate file upload & scan simulation.
2. **LandingBrokerLookup**: Gate directory searching & compensation ratings lookup.
3. **LandingActuarialReport**: Gate parameter adjustments & PDF download actions.

We will use a shared/reusable state or single elegant pattern to capture the user's name, company, business email, and head count, storing it locally (or mock submitting) so the tools seamlessly unlock once completed.

## Checklist:
- [x] Open and update `LandingUploader.tsx` to require contact submission before file drop
- [x] Open and update `LandingBrokerLookup.tsx` to require contact submission before directory search
- [x] Open and update `LandingActuarialReport.tsx` to require contact submission before interactive calculations
- [x] Implement a beautiful, unified glassmorphic lead capture form component or inline overlay
- [x] Run compile checks and confirm zero TypeScript warnings