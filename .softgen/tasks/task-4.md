---
title: Implement NADAC Benchmarking & Mock Data
status: done
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
- [x] Create nadacBenchmark.ts with drug pricing database (top 200 drugs)
- [x] Build mock Rx claims dataset with realistic spread patterns
- [x] Add contract terms mock data (guarantees, pricing structures)
- [x] Create benchmark matching logic (NDC to NADAC lookup)
- [x] Implement spread calculation utilities
- [x] Add mock PBM contract structures for compliance testing