---
title: Background Workers + Simplified Admin Dashboard
status: done
priority: urgent
type: feature
tags: [engines, admin, background-jobs, ux]
created_by: agent
created_at: 2026-07-09T19:27:00Z
position: 44
---

## Notes

Build a robust background job system for heavy engine computations, plus an intuitive admin dashboard that makes the 15 Universal Engines accessible to non-technical users (bright 10th grader accessibility standard).

**Key Requirements:**
- Job queue system for async engine computations
- Real-time progress tracking with visual feedback
- Admin dashboard with drag-and-drop engine orchestration
- Plain language explanations for every engine
- Pre-built analysis templates ("Recipe Book")
- Educational mode with tooltips and guided tours
- Visual data flow diagrams showing engine relationships
- One-click example computations to learn by doing

**Design Philosophy:**
- Visual over textual (flowcharts, progress bars, color coding)
- Concrete over abstract (show real examples, not just definitions)
- Guided over free-form (templates, wizards, suggested next steps)
- Educational over assumed knowledge (explain why, not just what)

## Checklist

### Background Worker Infrastructure
- [x] Install and configure Redis for job queue
- [x] Set up Celery worker pool for distributed task execution
- [x] Create job models (queued, running, completed, failed)
- [x] Implement progress tracking for long-running computations
- [x] Add job retry logic and failure handling
- [x] Create job scheduling system (cron-like for recurring analyses)
- [x] Build job result storage and retrieval
- [x] Add job cancellation capability

### Admin Dashboard - Engine Control Center
- [x] Create visual engine topology map (15 engines with connection flows)
- [x] Build engine launcher interface (select engine → configure → run)
- [x] Add "Recipe Book" with 20+ pre-built analysis templates
- [x] Implement drag-and-drop workflow builder (chain multiple engines)
- [x] Create real-time job monitoring panel (active/queued/completed)
- [x] Add engine playground (test inputs → see outputs immediately)
- [ ] Build result visualization gallery (charts, tables, insights)
- [ ] Create engine comparison tool (run same data through multiple engines)

### Educational UX Enhancements
- [x] Add hover tooltips explaining every engine in simple terms
- [x] Create "What does this do?" cards for each computation type
- [x] Build interactive tutorial mode (step-by-step guided first analysis)
- [x] Add real-world examples for each engine ("Analyzing a grocery store's pricing")
- [x] Create glossary popup (click any technical term → simple definition)
- [x] Implement "Explain Like I'm 10" mode toggle
- [ ] Add video demonstrations for complex engines
- [ ] Create printable quick reference guide

### Simplified Input/Output Design
- [x] Replace technical parameter names with plain questions
- [x] Add smart input validation with helpful error messages
- [x] Create visual input builders (sliders, dropdowns vs raw JSON)
- [x] Implement result summaries (key findings in 3 bullet points)
- [x] Add "Download Results" in multiple formats (PDF, Excel, JSON)
- [x] Create shareable result links (send analysis to colleague)
- [ ] Build result comparison view (before/after, what-if scenarios)
- [ ] Add automatic insight generation ("Your ROI improved by 23%")

## Acceptance

- A high school student can run a Monte Carlo simulation without technical training
- Job queue handles 100+ concurrent engine computations without blocking
- Every engine has a working example that runs in under 10 seconds
- Admin dashboard loads in under 2 seconds with real-time updates
- Failed jobs provide actionable error messages in plain language