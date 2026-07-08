---
title: Enterprise Monorepo Architecture Restructure
status: in_progress
priority: urgent
type: feature
tags: [architecture, monorepo, restructure, module-0]
created_by: agent
created_at: 2026-07-08T09:00:00Z
position: 42
---

## Notes
Restructuring to Fortune 100-grade enterprise monorepo architecture with clear microservices separation.

**New Structure:**
```
kincaid-aios/
├── apps/
│   ├── web/              # Next.js frontend (from src/)
│   └── api/              # FastAPI backend orchestration
├── services/
│   ├── actuarial-engine/    # Actuarial intelligence microservice
│   ├── pbm-engine/          # PBM forensics microservice
│   ├── risk-engine/         # Predictive risk microservice
│   ├── reporting-engine/    # Report generation microservice
│   └── ai-agents/           # LangGraph agent orchestration
├── data/
│   ├── ingestion/           # Data ingestion pipelines
│   ├── validation/          # Data quality validation
│   └── pipelines/           # ETL pipelines
├── database/
│   ├── migrations/          # Supabase migrations (from supabase/)
│   └── schemas/             # Schema definitions
├── infrastructure/
│   ├── docker/              # Docker configs
│   ├── terraform/           # Infrastructure as code
│   └── kubernetes/          # K8s manifests
├── security/
│   ├── authentication/      # Auth services
│   └── audit/               # Audit logging
└── docs/
    └── architecture/        # Architecture docs (from docs/)
```

**Migration Plan:**
1. Create new directory structure
2. Move Next.js frontend to apps/web/
3. Move Python backend to apps/api/
4. Extract intelligence engines to services/
5. Move Supabase migrations to database/migrations/
6. Organize infrastructure files
7. Update all import paths
8. Update build configs

## Checklist
- [ ] Create new monorepo directory structure
- [ ] Migrate frontend (src/ → apps/web/)
- [ ] Migrate backend core (backend/ → apps/api/)
- [ ] Extract actuarial engine to services/actuarial-engine/
- [ ] Extract PBM engine to services/pbm-engine/
- [ ] Extract risk engine to services/risk-engine/
- [ ] Extract reporting engine to services/reporting-engine/
- [ ] Extract AI agents to services/ai-agents/
- [ ] Create data ingestion service structure
- [ ] Move database migrations (supabase/ → database/)
- [ ] Organize infrastructure files
- [ ] Create security service structure
- [ ] Update package.json and dependencies
- [ ] Update import paths across all files
- [ ] Update Docker and Kubernetes configs
- [ ] Create monorepo root package.json with workspaces
- [ ] Update deployment scripts

## Acceptance
- New directory structure exists with all 7 top-level folders
- Frontend runs from apps/web/ on localhost:3000
- Backend API runs from apps/api/ on localhost:8000
- All services have independent package.json and can run standalone
- Monorepo workspaces configured for shared dependencies
- All imports resolve correctly
- Build and deployment work end-to-end