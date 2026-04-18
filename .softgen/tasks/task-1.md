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
- [x] Create rxAnalysis.ts with DRAP calculation engine
- [x] Implement spread pricing detection algorithms
- [x] Build rebate reconstruction logic using class-level inference
- [x] Create contract compliance scoring system
- [x] Add NADAC benchmarking functions
- [x] Implement leakage driver identification (NDC, pharmacy, temporal)
- [x] Create executive report generator with fiduciary perspective