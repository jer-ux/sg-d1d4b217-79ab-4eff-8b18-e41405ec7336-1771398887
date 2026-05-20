
<![CDATA[
---
title: Stack Modernization & Code Quality Improvements
status: in_progress
priority: high
type: chore
tags: [refactor, performance, code-quality]
created_by: agent
created_at: 2026-05-20T00:30:25Z
position: 7
---

## Notes

Modernize the existing Next.js stack and improve code organization without changing core technology choices. Focus on:

1. **File size reduction** — Split 50+ files exceeding 300 lines
2. **Code organization** — Separate concerns (data/UI/business logic)
3. **Type safety** — Remove `any` types, add proper interfaces
4. **Performance** — Optimize large components, reduce bundle size
5. **Developer experience** — Better dev server performance

Keep Next.js 15.5 Page Router (SEO + API routes critical for this project).

## Checklist

- [ ] Enable Turbopack for faster dev builds (Next.js 15 feature)
- [ ] Split `src/pages/solutions/rx-defense.tsx` (2951 lines) into modules
- [ ] Split `src/pages/verified-savings-ledger.tsx` (1169 lines) into sections
- [ ] Split `src/pages/agentic-workflow.tsx` (1300 lines) into workflow steps
- [ ] Split `src/pages/actuarial-benefits.tsx` (1415 lines) into benefit sections
- [ ] Split `src/pages/ebitda-governance.tsx` (1114 lines) into governance modules
- [ ] Split `src/components/home/BadgeDetailSystem.tsx` (915 lines) into badge components
- [ ] Split `src/lib/warroom/mock.ts` (928 lines) into domain-specific mocks
- [ ] Refactor `src/lib/warroom/detail.ts` (793 lines) — extract utilities
- [ ] Add strict TypeScript config for better type safety
- [ ] Create shared component library for repeated UI patterns
- [ ] Document code organization standards in README

## Acceptance

- No files exceed 350 lines
- All `any` types replaced with proper interfaces
- Dev server starts <3 seconds with Turbopack
- Type errors eliminated from strict mode
</![CDATA[
