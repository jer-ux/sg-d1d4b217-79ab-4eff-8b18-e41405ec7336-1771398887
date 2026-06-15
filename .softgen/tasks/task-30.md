---
title: Broker Compensation Auditor and Simplified Uploads
status: in_progress
priority: urgent
type: feature
tags: [broker, compensation, auditing, tools]
created_by: agent
created_at: 2026-06-15T08:10:00Z
position: 30
---

## Notes:
1. Strip the complex preview scan overlays from the Uploads Library page (`all-uploads.tsx`) to present a clean, elite direct-download vault.
2. Create an elite 5-Year Broker Compensation Forensic Auditor page (`src/pages/broker-compensation.tsx`) allowing plan sponsors to estimate hidden and direct broker commissions, volume overrides, and PBM kickbacks from 2022 to 2026.

## Checklist:
- [ ] Refactor `src/pages/all-uploads.tsx` to remove mock previews/scan overlays, presenting clean cards with fast direct download pathways.
- [ ] Create a high-fidelity interactive broker compensation calculator at `src/pages/broker-compensation.tsx`.
- [ ] Implement live 5-year interactive timeline (2022-2026) showcasing direct vs. indirect (hidden) compensation estimates based on company size.
- [ ] Add a formal copyable CAA (Consolidated Appropriations Act) Broker Disclosure request letter generator.
- [ ] Verify compilation is successful and error-free.