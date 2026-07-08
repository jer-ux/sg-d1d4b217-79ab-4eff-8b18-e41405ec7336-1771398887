# KINCAID HEALTH™ AIOS
## VOLUME III — PYTHON BACKEND ARCHITECTURE

**Enterprise Healthcare Intelligence Platform - Backend Infrastructure**

Stanford Computer Science • MIT AI Laboratory • Carnegie Mellon Software Engineering • Chicago Booth School of Business

---

## TECHNOLOGY STACK

### Core Backend
- **Python 3.11+** — Language
- **FastAPI** — Web framework
- **Pydantic** — Data validation
- **SQLAlchemy** — ORM
- **Alembic** — Database migrations

### AI & ML Layer
- **LangGraph** — Multi-agent orchestration
- **LangChain** — LLM tooling
- **OpenAI API** — GPT-4, GPT-4 Turbo
- **Anthropic Claude API** — Claude 3 Opus, Sonnet
- **Google Gemini API** — Gemini Pro

### Scientific Computing
- **NumPy** — Numerical computing
- **Pandas** — Data manipulation
- **SciPy** — Scientific algorithms
- **Scikit-learn** — Machine learning
- **PyMC** — Bayesian modeling
- **Statsmodels** — Statistical modeling

### Actuarial & Financial
- **Lifelines** — Survival analysis
- **Arch** — Time series modeling
- **QuantLib** — Quantitative finance

### Data Layer
- **PostgreSQL** (via Supabase) — Primary database
- **pgvector** — Vector embeddings
- **Redis** — Caching & sessions
- **Apache Arrow** — In-memory analytics

### Infrastructure
- **Docker** — Containerization
- **Kubernetes** — Orchestration
- **Terraform** — Infrastructure as code
- **Prometheus** — Monitoring
- **Grafana** — Visualization

---

## ARCHITECTURE OVERVIEW

```
┌─────────────────────────────────────────────────────────┐
│                   Next.js Frontend                      │
│                    (TypeScript)                         │
│  - Executive dashboards                                 │
│  - War rooms                                            │
│  - Report viewers                                       │
│  - ECharts visualizations                               │
└────────────────────────┬────────────────────────────────┘
                         │ REST API / GraphQL
┌────────────────────────▼────────────────────────────────┐
│                  FastAPI Backend                        │
│                     (Python)                            │
│                                                          │
│  ┌──────────────────────────────────────────────────┐  │
│  │         LangGraph Agent Orchestrator             │  │
│  │  - Chief Actuary Agent                           │  │
│  │  - CFO Agent                                     │  │
│  │  - Healthcare Economist Agent                    │  │
│  │  - PBM Investigator Agent                        │  │
│  │  - ERISA Counsel Agent                           │  │
│  │  - ML Scientist Agent                            │  │
│  │  - Risk Officer Agent                            │  │
│  │  - Clinical Intelligence Agent                   │  │
│  │  - Contract Intelligence Agent                   │  │
│  │  - Board Strategy Agent                          │  │
│  └──────────────────────────────────────────────────┘  │
│                                                          │
│  ┌──────────────────────────────────────────────────┐  │
│  │          Intelligence Engines                    │  │
│  │  - Actuarial Intelligence Engine                 │  │
│  │  - PBM Intelligence Engine                       │  │
│  │  - Predictive Risk Engine                        │  │
│  │  - Monte Carlo Simulation Cluster                │  │
│  │  - Financial Reconstruction Engine               │  │
│  │  - Healthcare Economics Engine                   │  │
│  │  - Contract Intelligence Engine                  │  │
│  └──────────────────────────────────────────────────┘  │
│                                                          │
│  ┌──────────────────────────────────────────────────┐  │
│  │          Scientific Computing Layer              │  │
│  │  - NumPy/Pandas data processing                  │  │
│  │  - Scikit-learn ML pipelines                     │  │
│  │  - PyMC Bayesian models                          │  │
│  │  - Statistical analysis                          │  │
│  └──────────────────────────────────────────────────┘  │
└────────────────────────┬────────────────────────────────┘
                         │
┌────────────────────────▼────────────────────────────────┐
│                    Data Layer                           │
│  - PostgreSQL (Supabase) — Primary database             │
│  - pgvector — Semantic search                           │
│  - Redis — Caching, sessions, task queue               │
└─────────────────────────────────────────────────────────┘
```

---

## PROJECT STRUCTURE

```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py                    # FastAPI app entry
│   ├── config.py                  # Configuration
│   ├── dependencies.py            # DI container
│   │
│   ├── api/
│   │   ├── __init__.py
│   │   ├── v1/
│   │   │   ├── __init__.py
│   │   │   ├── actuarial.py      # Actuarial endpoints
│   │   │   ├── pbm.py             # PBM intelligence endpoints
│   │   │   ├── reports.py         # Report generation
│   │   │   ├── simulation.py      # Monte Carlo
│   │   │   ├── agents.py          # AI agent endpoints
│   │   │   └── executive.py       # Executive intelligence
│   │
│   ├── agents/
│   │   ├── __init__.py
│   │   ├── base.py                # Base agent class
│   │   ├── orchestrator.py        # LangGraph orchestrator
│   │   ├── chief_actuary.py       # Chief Actuary Agent
│   │   ├── cfo.py                 # CFO Agent
│   │   ├── healthcare_economist.py
│   │   ├── pbm_investigator.py
│   │   ├── erisa_counsel.py
│   │   ├── ml_scientist.py
│   │   ├── risk_officer.py
│   │   ├── clinical_intelligence.py
│   │   ├── contract_intelligence.py
│   │   └── board_strategy.py
│   │
│   ├── engines/
│   │   ├── __init__.py
│   │   ├── actuarial/
│   │   │   ├── __init__.py
│   │   │   ├── trend.py           # Trend forecasting
│   │   │   ├── credibility.py     # Credibility weighting
│   │   │   ├── reserves.py        # Reserve calculations
│   │   │   ├── stop_loss.py       # Stop-loss optimization
│   │   │   └── pricing.py         # Premium pricing
│   │   │
│   │   ├── pbm/
│   │   │   ├── __init__.py
│   │   │   ├── spread_detection.py
│   │   │   ├── rebate_reconstruction.py
│   │   │   ├── contract_scoring.py
│   │   │   └── forensics.py
│   │   │
│   │   ├── monte_carlo/
│   │   │   ├── __init__.py
│   │   │   ├── simulation.py      # Core simulation engine
│   │   │   ├── distributions.py   # Probability distributions
│   │   │   └── scenarios.py       # Scenario generation
│   │   │
│   │   ├── ml/
│   │   │   ├── __init__.py
│   │   │   ├── risk_models.py     # Risk prediction models
│   │   │   ├── feature_engineering.py
│   │   │   ├── training.py
│   │   │   └── inference.py
│   │   │
│   │   └── financial/
│   │       ├── __init__.py
│   │       ├── reconstruction.py  # Financial reconstruction
│   │       ├── forecasting.py     # Financial forecasting
│   │       └── optimization.py    # Portfolio optimization
│   │
│   ├── models/
│   │   ├── __init__.py
│   │   ├── database.py            # SQLAlchemy models
│   │   ├── schemas.py             # Pydantic schemas
│   │   └── types.py               # Type definitions
│   │
│   ├── services/
│   │   ├── __init__.py
│   │   ├── cache.py               # Redis caching
│   │   ├── database.py            # Database service
│   │   ├── vector.py              # pgvector service
│   │   └── queue.py               # Task queue
│   │
│   └── utils/
│       ├── __init__.py
│       ├── logging.py
│       ├── security.py
│       └── helpers.py
│
├── tests/
│   ├── __init__.py
│   ├── unit/
│   ├── integration/
│   └── e2e/
│
├── alembic/                       # Database migrations
├── scripts/                       # Utility scripts
├── requirements.txt
├── Dockerfile
└── docker-compose.yml
```

---

## API DESIGN

### Authentication
- **JWT tokens** from Supabase Auth
- All endpoints require valid JWT
- Role-based access control (RBAC)

### Endpoint Structure
```
/api/v1/actuarial/
  POST /trend-forecast
  POST /reserve-calculation
  POST /stop-loss-optimization
  POST /credibility-analysis

/api/v1/pbm/
  POST /spread-detection
  POST /rebate-reconstruction
  POST /contract-analysis
  POST /forensic-audit

/api/v1/simulation/
  POST /monte-carlo
  POST /scenario-planning
  GET  /simulation/{id}/results

/api/v1/agents/
  POST /task
  GET  /task/{id}/status
  GET  /task/{id}/result
  POST /debate

/api/v1/reports/
  POST /generate
  GET  /report/{id}
  GET  /report/{id}/download

/api/v1/executive/
  GET  /dashboard
  GET  /kpis
  POST /board-report
```

### Request/Response Format
```python
# Request
class ActuarialAnalysisRequest(BaseModel):
    analysis_type: str  # "trend", "reserve", "stop_loss"
    data: Dict[str, Any]
    parameters: Dict[str, Any]
    confidence_level: float = 0.95

# Response
class ActuarialAnalysisResponse(BaseModel):
    id: str
    status: str  # "pending", "processing", "complete", "error"
    result: Optional[Dict[str, Any]]
    confidence: float
    evidence: List[Evidence]
    recommendations: List[Recommendation]
    created_at: datetime
    completed_at: Optional[datetime]
```

---

## LANGGRAPH AGENT ORCHESTRATION

### Agent Graph Structure
```python
from langgraph.graph import StateGraph, END

# Define agent workflow
workflow = StateGraph()

# Add nodes (agents)
workflow.add_node("chief_actuary", chief_actuary_agent)
workflow.add_node("cfo", cfo_agent)
workflow.add_node("pbm_investigator", pbm_investigator_agent)
workflow.add_node("erisa_counsel", erisa_counsel_agent)
workflow.add_node("ml_scientist", ml_scientist_agent)
workflow.add_node("risk_officer", risk_officer_agent)
workflow.add_node("board_advisor", board_advisor_agent)

# Add edges (workflow)
workflow.add_edge("chief_actuary", "cfo")
workflow.add_edge("cfo", "pbm_investigator")
workflow.add_edge("pbm_investigator", "erisa_counsel")
workflow.add_edge("erisa_counsel", "ml_scientist")
workflow.add_edge("ml_scientist", "risk_officer")
workflow.add_edge("risk_officer", "board_advisor")
workflow.add_edge("board_advisor", END)

# Set entry point
workflow.set_entry_point("chief_actuary")

# Compile graph
app = workflow.compile()
```

### Agent State
```python
class AgentState(TypedDict):
    task_id: str
    context: Dict[str, Any]
    recommendations: List[Dict[str, Any]]
    debate_positions: List[Dict[str, Any]]
    consensus: Optional[Dict[str, Any]]
    evidence_graph: Dict[str, Any]
    confidence: float
    status: str
```

---

## INTELLIGENCE ENGINES

### Actuarial Intelligence Engine
```python
class ActuarialEngine:
    def __init__(self):
        self.trend_calculator = TrendCalculator()
        self.credibility_engine = CredibilityEngine()
        self.reserve_calculator = ReserveCalculator()
        self.stop_loss_optimizer = StopLossOptimizer()
    
    async def forecast_trend(
        self,
        claims: pd.DataFrame,
        enrollment: pd.DataFrame,
        parameters: TrendParameters
    ) -> TrendForecast:
        """
        Forecast medical cost trend with credibility weighting.
        
        Uses:
        - Historical claim experience
        - Credibility weighting (Limited Fluctuation Method)
        - Large claim normalization
        - Seasonal adjustment
        - Bayesian updating
        """
        pass
    
    async def optimize_stop_loss(
        self,
        claims_distribution: np.ndarray,
        premium_quotes: List[Quote],
        parameters: StopLossParameters
    ) -> StopLossRecommendation:
        """
        Optimize stop-loss deductibles using Monte Carlo simulation.
        
        Runs 10,000+ scenarios to find optimal:
        - Individual Stop-Loss (ISL) deductible
        - Aggregate Stop-Loss (ASL) corridor
        - Expected reimbursement
        - Value-at-Risk (VaR)
        """
        pass
```

### Monte Carlo Simulation Cluster
```python
class MonteCarloEngine:
    def __init__(self, n_simulations: int = 10000):
        self.n_simulations = n_simulations
        self.executor = ThreadPoolExecutor(max_workers=cpu_count())
    
    async def run_simulation(
        self,
        model: SimulationModel,
        parameters: SimulationParameters
    ) -> SimulationResults:
        """
        Run parallelized Monte Carlo simulation.
        
        Features:
        - Parallel execution across CPU cores
        - Custom probability distributions
        - Correlation modeling
        - Convergence testing
        - Confidence intervals
        """
        pass
```

### PBM Intelligence Engine
```python
class PBMEngine:
    async def detect_spread(
        self,
        claims: pd.DataFrame,
        pricing_benchmark: pd.DataFrame
    ) -> SpreadAnalysis:
        """
        Detect spread pricing patterns.
        
        Identifies:
        - Ingredient cost spread
        - Dispensing fee spread
        - AWP-based spread
        - MAC-based spread
        - Pharmacy-specific patterns
        - NDC-specific patterns
        """
        pass
    
    async def reconstruct_rebates(
        self,
        claims: pd.DataFrame,
        contract: Contract
    ) -> RebateReconstruction:
        """
        Reconstruct manufacturer rebates.
        
        Uses:
        - Observable rebate patterns
        - Therapeutic class inference
        - Formulary tier mapping
        - Contract clause analysis
        """
        pass
```

---

## CACHING STRATEGY

### Redis Cache Layers
```python
# Level 1: Hot data (TTL: 5 minutes)
- Dashboard KPIs
- Active simulation results
- Recent agent recommendations

# Level 2: Warm data (TTL: 1 hour)
- Trend forecasts
- Risk scores
- Contract analyses

# Level 3: Cold data (TTL: 24 hours)
- Historical reports
- Benchmark data
- Reference tables
```

### Cache Invalidation
- **Time-based**: Automatic TTL expiration
- **Event-based**: New data triggers invalidation
- **Manual**: Admin cache flush

---

## PERFORMANCE REQUIREMENTS

### Response Time Targets
- Simple queries: < 100ms
- Actuarial calculations: < 2s
- Monte Carlo simulations: < 30s
- Full agent debate: < 2min
- Complex report generation: < 5min

### Throughput Targets
- 1,000 requests/second (peak)
- 100 concurrent agent workflows
- 1,000 concurrent simulations

### Scalability
- Horizontal scaling via Kubernetes
- Database read replicas
- Redis cluster
- Async task queue (Celery/RQ)

---

## SECURITY

### Authentication & Authorization
- JWT tokens from Supabase Auth
- Role-based access control (RBAC)
- API key authentication for integrations
- Rate limiting per client

### Data Security
- Encryption at rest (PostgreSQL)
- Encryption in transit (TLS 1.3)
- PHI/PII data masking in logs
- HIPAA compliance
- SOC 2 Type II compliance

### AI Security
- Prompt injection prevention
- Output validation
- Hallucination detection
- Citation verification
- Audit logging

---

## MONITORING & OBSERVABILITY

### Metrics (Prometheus)
- Request latency (p50, p95, p99)
- Error rates
- Cache hit rates
- Agent task completion time
- Simulation throughput

### Logging (Structured JSON)
- Request/response logs
- Agent decision logs
- Calculation audit trails
- Error traces

### Alerting
- API downtime
- High error rates
- Slow queries
- Failed agent tasks
- Cache misses

---

## DEPLOYMENT

### Docker Containers
```dockerfile
FROM python:3.11-slim

WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application
COPY app/ app/

# Expose port
EXPOSE 8000

# Run FastAPI
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

### Kubernetes Deployment
- **Pods**: 3 replicas minimum
- **HPA**: Auto-scale 3-20 pods based on CPU/memory
- **Services**: LoadBalancer for external access
- **ConfigMaps**: Environment configuration
- **Secrets**: API keys, database credentials

### CI/CD Pipeline
1. **Build**: Docker image
2. **Test**: Unit, integration, e2e
3. **Security**: Vulnerability scanning
4. **Deploy**: Rolling update to Kubernetes
5. **Verify**: Health checks, smoke tests

---

## NEXT STEPS

1. **Phase 1**: Set up FastAPI backend structure
2. **Phase 2**: Implement first agent (Chief Actuary)
3. **Phase 3**: Build actuarial intelligence engines
4. **Phase 4**: Implement LangGraph orchestration
5. **Phase 5**: Add remaining agents
6. **Phase 6**: Production hardening & deployment

---

**STATUS**: Architecture defined. Ready for implementation.