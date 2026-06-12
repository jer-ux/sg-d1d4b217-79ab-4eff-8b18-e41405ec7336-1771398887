---
title: Upgrade PE Operator War Room Aesthetics
status: in_progress
priority: urgent
type: feature
tags: [pe-operator, styling, alignment]
created_by: agent
created_at: 2026-06-12T20:16:00Z
position: 13
---

## Notes:
Upgrade the PE Operator Command Center (`PEOperatorWarRoom.tsx`) to match the premium, high-fidelity "dark-neon" deep-space aesthetic of the CHRO and Board war rooms. Include a live scrolling ticker, responsive sparklines, glowing interactive tiles, and a high-performance 7-level drill-down slide-out drawer.

## Checklist:
- [ ] Inspect existing metrics and data points in `PEOperatorWarRoom.tsx`
- [ ] Create `PEOperatorDrillDownDrawer.tsx` to manage level-1 to level-7 trace verification for PE/EBITDA/Portfolio metrics
- [ ] Integrate a live scrolling ticker with real-time portfolio company and deal metrics
- [ ] Upgrade the top-level KPI cards with animated border glows, responsive sparkline charts, and trend icons
- [ ] Replace inline static panels with a clean sliding drill-down drawer integration
- [ ] Verify TypeScript types and execute error checks to validate the build