---
title: Create Kincaid IQ Analysis Engine
status: in_progress
priority: urgent
type: feature
tags: [kincaid-iq, analytics, backend]
created_by: agent
created_at: 2026-04-18T02:40:25Z
position: 1
---

## Notes
Build the core fiduciary-grade Rx claims analysis engine that processes pharmacy claims and outputs DRAP analysis, spread detection, rebate reconstruction, and contract compliance scoring. This is the foundational analytical capability for the entire Kincaid IQ platform.

## Checklist
- [ ] Create rxAnalysis.ts with DRAP calculation engine
- [ ] Implement spread pricing detection algorithms
- [ ] Build rebate reconstruction logic using class-level inference
- [ ] Create contract compliance scoring system
- [ ] Add NADAC benchmarking functions
- [ ] Implement leakage driver identification (NDC, pharmacy, temporal)
- [ ] Create executive report generator with fiduciary perspective