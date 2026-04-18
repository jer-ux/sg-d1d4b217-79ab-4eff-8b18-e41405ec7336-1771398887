---
title: Implement NADAC Benchmarking & Mock Data
status: todo
priority: medium
type: feature
tags: [kincaid-iq, data, benchmarking]
created_by: agent
created_at: 2026-04-18T02:40:25Z
position: 4
---

## Notes
Create NADAC pricing database (mock) and benchmarking logic. Include realistic pharmacy claims mock data for demo mode. Must enable immediate showcase of analysis capabilities without requiring real claims files.

## Checklist
- [ ] Create nadacBenchmark.ts with drug pricing database (top 200 drugs)
- [ ] Build mock Rx claims dataset with realistic spread patterns
- [ ] Add contract terms mock data (guarantees, pricing structures)
- [ ] Create benchmark matching logic (NDC to NADAC lookup)
- [ ] Implement spread calculation utilities
- [ ] Add mock PBM contract structures for compliance testing