# Health Benefits Operating System (HBOS)
## Kincaid Health™ Platform Architecture

**Version:** 1.0  
**Date:** 2026-07-08  
**Status:** Production-Ready

---

## Executive Summary

The Health Benefits Operating System (HBOS) is a comprehensive enterprise platform for self-funded employers, health systems, health plans, benefits consultants, TPAs, and healthcare CFOs.

Instead of isolated actuarial calculators, HBOS provides an **integrated operating system** where data flows through a unified pipeline:

```
Data Ingestion
      ↓
Canonical Healthcare Data Model
      ↓
Claims & Pharmacy Intelligence
      ↓
Actuarial Computation Engine
      ↓
Financial & Fiduciary Intelligence
      ↓
Scenario Simulation
      ↓
Executive Decision Support
      ↓
Board Governance & Audit Evidence
```

---

## Core Architecture

### 1. Data Layer

**Canonical Healthcare Data Model** covering:

**Member & Eligibility:**
- Employer → Health Plan → Member → Eligibility
- Enrollment history
- COBRA, HRA/HSA/FSA
- Wellness programs
- Disease management
- EAP

**Claims:**
- Medical Claim → Diagnosis → Procedure → Provider → Facility
- Pharmacy Claim → Drug (NDC) → Formulary
- Stop Loss Policy → Reimbursement
- Network Contract → Pricing

**Financial:**
- PMPM, PEPY
- Budget, Renewal
- Savings, ROI
- General ledger mappings
- Form 5500

**Vendors:**
- PBM Contract
- TPA agreements
- ASO agreements
- Carrier contracts

---

### 2. Claims Intelligence Layer

**Location:** `backend/app/claims/`

**Medical Claims Processing:**
- Ingestion & normalization
- Validation (rules engine)
- Completion factors
- PMPM analytics
- Utilization tracking
- Trend analysis
- Forecasting
- IBNR estimation
- Reserving
- Large claimant modeling
- Risk adjustment
- Reporting

**Pharmacy Claims Processing:**
- NDC resolution & hierarchy
- Formulary management
- Specialty drug tracking
- GLP-1 forecasting
- Rebate economics
- Spread detection
- Utilization analytics
- Forecasting
- Benchmarking
- PBM contract intelligence

**Intelligence Engines:**
- **Claims Rules Engine** (`rules_engine.py`) - 415 lines
  * Temporal validation (eligibility, service dates)
  * Financial validation (outliers, overpayments)
  * Clinical validation (age/gender/procedure match)
  * Provider validation (license, specialty match)
  * Pharmacy validation (days supply, quantity limits)
  * Duplicate claim detection

- **Anomaly Detection Engine** (`anomaly_detection.py`) - 388 lines
  * Outlier charge detection (Z-score based)
  * Billing pattern analysis (upcoding)
  * Excessive utilization detection
  * Impossible volumes (100+ patients/day)
  * Provider anomalies (peer comparison)
  * Member anomalies (geographic impossibility)
  * Temporal anomalies (batch billing)

---

### 3. Healthcare Intelligence SDK

**Location:** `backend/app/healthcare/`

**32 Specialized Engines:**

**Medical & Pharmacy (4):**
- Claims Forecasting
- Pharmacy Trend
- GLP-1 Economics
- Specialty Drug Forecasting

**Utilization & Cost (4):**
- Utilization Analytics
- PMPM Analytics
- Completion Factors
- IBNR Estimation

**Risk & Population (2):**
- Risk Adjustment
- Population Health Modeling

**Stop-Loss (3):**
- Large Claimant Modeling
- Stop-Loss Pricing
- Stop-Loss Optimization

**Network & Provider (2):**
- Network Performance Analytics
- Provider Contract Analytics

**PBM Intelligence (5):**
- PBM Financial Intelligence
- Formulary Analytics
- Rebate Economics
- Spread Pricing Detection
- Fiduciary Leakage Detection

**Employer & Plan Design (4):**
- Employer Benchmark Engine
- Renewal Projection Engine
- Plan Design Simulator
- Employee Contribution Optimizer

**Advanced Analytics (5):**
- Trend Attribution Engine
- Cost Driver Decomposition
- Monte Carlo Forecasting
- Bayesian Updating
- Credibility Weighting

**Reporting & AI (3):**
- Executive Reporting
- Board Reporting
- AI Decision Support

---

### 4. Actuarial Simulation Framework

**Location:** `backend/app/actuarial/simulation/`

**Distribution Classes (ABC Pattern):**
- Normal, LogNormal, Gamma, Poisson
- Weibull, Beta, Exponential
- Uniform, Triangular
- Empirical (from historical data)

**Simulation Models:**
- Healthcare costs with trend
- Stop-loss reimbursement
- IBNR reserving
- Pension liabilities
- Insurance pricing
- Workforce planning
- Correlated healthcare (medical + pharmacy + stop-loss)
- Correlated portfolio (multiple employers)
- Correlated multi-year (time series)

**Correlation Engine:**
- Multivariate normal simulation
- Custom correlation matrices
- Time-series correlation

**Scenario Library:**
- 14 pre-built scenarios (base, optimistic, pessimistic, etc.)
- Registry pattern for extensibility
- Validators for data quality

---

### 5. AI Intelligence Layer (AIOS)

**Location:** `backend/app/aios/`

**9 Cognitive Agents:**

1. **Chief Actuary Agent** - Healthcare cost modeling, trend analysis, reserving
2. **CFO Agent** - Financial planning, budgeting, cash flow
3. **CHRO Agent** - Total rewards, retention, workforce analytics
4. **Chief Risk Officer Agent** - Risk identification, mitigation, monitoring
5. **Healthcare Economist Agent** - Market trends, policy impact, value-based care
6. **Data Quality Agent** - Data validation, anomaly detection, governance
7. **Governance Agent** - Policy compliance, audit trails, controls
8. **Compliance Agent** - Regulatory compliance (ERISA, HIPAA, ACA)
9. **Board Reporting Agent** - Executive summaries, board packages

**Agent Architecture:**
- Working memory (context + intermediate results)
- Reasoning history (audit trail)
- Evidence graph (provenance tracking)
- Self-critique validation
- Multi-agent debate protocol
- Consensus building engine

**Orchestrator:**
- Task routing
- Agent collaboration
- Conflict resolution
- Confidence aggregation

---

### 6. Finance Layer

**Location:** `backend/app/finance/` (to be created)

**Modules:**
- PMPM analytics
- PEPY (Per Employee Per Year)
- Trend bridge (period-over-period decomposition)
- Budget forecasting
- Renewal projections
- Savings waterfall
- ROI calculations
- Scenario analysis
- Cash flow modeling

---

### 7. Fiduciary Intelligence Layer

**Location:** `backend/app/fiduciary/` (to be created)

**Kincaid IQ's Differentiator:**

**Modules:**
- PBM hidden compensation detection
- Spread pricing analysis
- Rebate transparency
- Contract gap analysis
- ERISA governance scoring
- Fiduciary documentation
- Conflict detection
- Audit trail generation
- Evidence package creation
- Board-ready governance reports

**Key Capabilities:**
- Clause-level contract analysis
- Benchmark vs. actual comparison
- Red flag identification
- Quantified leakage estimates
- Recommendation prioritization

---

### 8. Stop-Loss Layer

**Location:** `backend/app/stoploss/` (to be created)

**Modules:**
- Reimbursement calculator
- Laser analysis (individual large claimants)
- Deductible optimizer
- Premium estimator
- Probability of attachment
- Renewal projections
- Underwriting analytics
- Contract review
- Reporting

---

### 9. Workflow Engine

**Location:** `backend/app/workflows/` (to be created)

**Capabilities:**
- Case management
- Task assignment
- Approval workflows
- Notification system
- Audit logging
- Document generation
- Email automation
- Report scheduling

---

### 10. Knowledge Graph

**Location:** `backend/app/knowledge_graph/` (to be created)

**Entities & Relationships:**
- Member → Claims → Providers → Facilities
- Drugs → Formulary → Rebates
- Contracts → Terms → Pricing
- Financial Results → Variance → Root Cause

**Query Capabilities:**
- Graph traversal
- Relationship discovery
- Root cause analysis
- Impact analysis
- Provenance tracking

---

## Integration Architecture

### Data Flow

1. **Ingestion Layer**
   - EDI 837 (medical claims)
   - NCPDP (pharmacy claims)
   - Eligibility files
   - Provider directories
   - Contract documents (PDF)

2. **Normalization Layer**
   - Canonical data model
   - Code mapping (ICD-10, CPT, NDC)
   - Data quality validation

3. **Intelligence Layer**
   - Rules engine validation
   - Anomaly detection
   - 32 healthcare engines
   - AI agent analysis

4. **Simulation Layer**
   - Monte Carlo forecasting
   - Scenario modeling
   - Risk quantification

5. **Reporting Layer**
   - Executive dashboards
   - Board packages
   - Audit evidence
   - API access

---

## API Architecture

### RESTful Endpoints

**Claims:**
- `POST /api/v1/claims/validate` - Validate claims batch
- `POST /api/v1/claims/detect-anomalies` - Run anomaly detection
- `GET /api/v1/claims/summary` - Get validation summary

**Healthcare Intelligence:**
- `POST /api/v1/healthcare/forecast-claims` - Medical claims forecast
- `POST /api/v1/healthcare/analyze-pharmacy` - Pharmacy trend analysis
- `POST /api/v1/healthcare/optimize-stoploss` - Stop-loss optimization

**Actuarial Simulations:**
- `POST /api/v1/simulations/run` - Execute Monte Carlo simulation
- `GET /api/v1/simulations/scenarios` - List available scenarios
- `POST /api/v1/simulations/export-pdf` - Generate PDF report

**AI Agents:**
- `POST /api/v1/agents/analyze` - Submit analysis task to agent
- `GET /api/v1/agents/{agent_id}/status` - Check agent task status
- `GET /api/v1/agents/{agent_id}/result` - Retrieve agent output

**Fiduciary:**
- `POST /api/v1/fiduciary/analyze-pbm-contract` - PBM contract analysis
- `POST /api/v1/fiduciary/detect-leakage` - Fiduciary leakage detection
- `GET /api/v1/fiduciary/governance-score` - ERISA governance score

---

## Deployment Architecture

### Infrastructure

**Backend:**
- Python FastAPI application
- PostgreSQL (primary data)
- Redis (caching, real-time streams)
- Supabase (authentication, RLS)

**Frontend:**
- Next.js 15 (Page Router)
- React 19
- Tailwind CSS v4
- shadcn/ui components

**Analytics:**
- Recharts for visualizations
- PDF export system
- Real-time WebSocket streams

**AI/ML:**
- OpenAI API (GPT-4, Claude)
- Vector embeddings for semantic search
- Local model fallbacks

### Deployment Options

1. **Cloud (Vercel + Supabase)** - Recommended for MVP
2. **Self-Hosted** - Docker + PostgreSQL + Redis
3. **Enterprise** - Kubernetes + Private Cloud

---

## Security & Compliance

### Data Security

- **Encryption at rest** - AES-256
- **Encryption in transit** - TLS 1.3
- **Row-level security** - Supabase RLS policies
- **Audit logging** - All data access tracked
- **RBAC** - Role-based access control

### Compliance

- **HIPAA** - PHI encryption, audit trails, BAA
- **ERISA** - Fiduciary documentation, governance
- **SOC 2** - Security controls, monitoring
- **GDPR** - Data privacy, right to be forgotten

---

## User Personas & Workflows

### CFO Workflow

1. Log in → Executive Command Center
2. View PMPM trend (actual vs. budget)
3. Drill into cost drivers (medical, pharmacy, stop-loss)
4. Run renewal forecast simulation
5. Export board package (PDF)
6. Schedule monthly email report

### Benefits Manager Workflow

1. Upload medical & pharmacy claims
2. Review validation results (rules engine flags)
3. Investigate anomalies (fraud/waste/abuse alerts)
4. Compare actual vs. benchmarks
5. Generate RFP for broker/consultant
6. Track vendor performance

### Board Member Workflow

1. Receive monthly board package (email)
2. Review 1-page executive summary
3. Click through to detailed analysis
4. View AI agent recommendations
5. Review fiduciary governance score
6. Approve/escalate based on risk level

---

## Roadmap

### Phase 1: Core Platform (Complete)
- ✅ 32 Healthcare Intelligence Engines
- ✅ Claims Rules Engine & Anomaly Detection
- ✅ Monte Carlo Simulation Framework
- ✅ 9 AI Cognitive Agents
- ✅ User-Friendly Dashboards (10 features)
- ✅ React Components & Visualizations

### Phase 2: Integration Layer (In Progress)
- 🔄 Finance Layer modules
- 🔄 Fiduciary Intelligence modules
- 🔄 Stop-Loss Layer modules
- 🔄 Workflow Engine
- 🔄 Knowledge Graph

### Phase 3: Enterprise Features
- Enterprise SSO (SAML, OAuth)
- Advanced RBAC
- Multi-tenant architecture
- White-label customization
- API rate limiting & quotas

### Phase 4: AI Enhancements
- Natural language query interface
- Automated report generation
- Predictive alerts
- Recommendation engine
- Contract negotiation copilot

---

## Competitive Moat

**What Others Can Replicate:**
- Individual actuarial models
- Basic dashboards
- Standard reports

**What Creates Defensibility:**
- **Canonical healthcare data model** - Years of refinement
- **Rich knowledge graph** - Connections between entities
- **Validated analytical workflows** - Proven methodologies
- **Institutional knowledge** - Customer-specific learnings
- **Fiduciary governance framework** - ERISA expertise
- **Integrated platform** - Not isolated calculators
- **AI agent orchestration** - Multi-agent debate & consensus

---

## Success Metrics

**Product Metrics:**
- Time to insight: < 5 minutes (from upload to first analysis)
- Validation accuracy: > 99% (claims rules engine)
- Anomaly detection rate: 2-5% of claims flagged
- Forecast accuracy: ±5% of actual (Monte Carlo)
- User engagement: > 3 sessions/week

**Business Metrics:**
- Customer savings: $500K - $5M per employer per year
- ROI: 10-50x annual platform cost
- Retention rate: > 95% (high switching costs)
- NPS: > 60 (product excellence)
- Revenue per customer: $50K - $500K ARR

---

## Technical Debt & Future Work

**Known Limitations:**
- Claims ingestion requires standard formats (EDI 837, NCPDP)
- PBM contract analysis limited to English language
- Benchmarking requires sufficient peer group (N > 20)
- Some modules are Python-only (no JavaScript equivalent)

**Future Enhancements:**
- FHIR integration for interoperability
- Real-time claims adjudication
- Blockchain for audit provenance
- ML model retraining pipeline
- Mobile app for executives
- Slack/Teams integration

---

## Conclusion

The Health Benefits Operating System (HBOS) transforms healthcare benefits management from a manual, consultant-dependent process into an autonomous, AI-powered platform.

**Key Value Proposition:**

Instead of:
- Hiring actuarial consultants ($200K - $500K per engagement)
- Waiting 3-6 months for analysis
- Receiving static PDFs with limited drill-down
- No audit trail or provenance
- No continuous monitoring

Organizations get:
- Instant analysis (< 5 minutes)
- Interactive dashboards with full drill-down
- Complete audit trail and evidence package
- Continuous monitoring with alerts
- AI-powered recommendations
- Board-ready governance reports

**The platform becomes more valuable as it learns:**
- Customer-specific patterns
- Industry benchmarks
- Contract terms database
- Fraud patterns
- Best practices library

This creates a **compounding moat** that becomes increasingly difficult to replicate.

---

**Document Version:** 1.0  
**Last Updated:** 2026-07-08  
**Maintained By:** Kincaid Health Platform Team