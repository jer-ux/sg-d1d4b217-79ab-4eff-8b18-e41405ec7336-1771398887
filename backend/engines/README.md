# KINCAID AIOS - Universal Computation Engines

## Architecture Overview

The Universal Engines are production-grade microservices that provide fundamental computational capabilities for the KINCAID AIOS platform. Each engine is:

- **Self-contained**: Runs independently as a FastAPI microservice
- **Instrumented**: Full OpenTelemetry tracing, Prometheus metrics, structured logging
- **Horizontally scalable**: Kubernetes-ready with health checks and graceful shutdown
- **Type-safe**: Pydantic models for all requests/responses
- **Observable**: Real-time metrics, distributed tracing, alerting

## Current Engines (Phase 1)

### 1. Economic Engine (Port 8001, Metrics 9091)
Cost attribution, ROI calculation, NPV/IRR analysis, value flow modeling

**Capabilities:**
- `POST /cost-attribution` - Multi-dimensional cost allocation
- `POST /roi-calculation` - Return on investment with discount rates
- `POST /value-flow` - Network flow analysis and optimization

### 2. Statistical Engine (Port 8002, Metrics 9092)
Distribution fitting, regression analysis, credibility weighting, hypothesis testing

**Capabilities:**
- `POST /distribution-fit` - Fit data to 10+ distribution families
- `POST /regression` - Linear/polynomial regression with diagnostics
- `POST /credibility-weight` - Actuarial credibility calculations
- `POST /hypothesis-test` - T-tests, chi-square, ANOVA

### 3. Simulation Engine (Port 8003, Metrics 9093)
Monte Carlo simulation, correlation modeling, VaR/CVaR, scenario analysis

**Capabilities:**
- `POST /monte-carlo` - Run multi-variable Monte Carlo simulations
- `POST /correlation-model` - Build and validate correlation matrices
- `POST /var-calculation` - Value at Risk and Conditional VaR
- `POST /scenario-analysis` - Stress testing and sensitivity analysis

## Quick Start

### Local Development

```bash
# Start all engines
cd backend/engines
docker-compose up -d

# Check engine status
curl http://localhost:8000/status

# Run a computation
curl -X POST http://localhost:8000/economic/cost-attribution \
  -H "Content-Type: application/json" \
  -d '{
    "total_cost": 1000000,
    "dimensions": [
      {"name": "department", "value": "operations", "weight": 0.6},
      {"name": "department", "value": "sales", "weight": 0.4}
    ],
    "evidence_id": "test-123"
  }'
```

### Production Deployment

```bash
# Deploy to Kubernetes
kubectl apply -f k8s/

# Set up Prometheus
kubectl apply -f prometheus.yml

# Configure Grafana dashboards
# Import grafana-dashboards/*.json
```

## Observability

### Metrics (Prometheus)
- **Requests/sec**: `rate(${engine}_requests_total[5m])`
- **Latency (p95)**: `histogram_quantile(0.95, rate(${engine}_request_duration_seconds_bucket[5m]))`
- **Error rate**: `rate(${engine}_errors_total[5m])`
- **Active requests**: `${engine}_active_requests`
- **Computation cost**: `rate(${engine}_computation_cost_total[5m])`

Metrics exposed on ports 9091-9093 at `/metrics` endpoint.

### Tracing (OpenTelemetry)
Distributed traces sent to OTLP endpoint (Jaeger/Tempo). View full request flow:
```
Gateway → Engine → Internal Operations → Response
```

### Logging (Structured JSON)
All logs output in JSON format to stdout:
```json
{
  "timestamp": "2026-07-09T19:00:00Z",
  "level": "INFO",
  "engine": "economic",
  "operation": "cost_attribution",
  "execution_time_ms": 42.3,
  "evidence_id": "evt-123"
}
```

### Health Checks
- `GET /health` - Liveness probe (uptime, version)
- `GET /ready` - Readiness probe (dependency checks)

## Performance SLAs

- **Availability**: 99.9% uptime (43.2 min downtime/month max)
- **Latency**: p95 < 100ms for all operations
- **Throughput**: 1000+ requests/sec per engine
- **Error rate**: < 0.1% of requests

## Architecture Decisions

### Why Microservices?
- **Independent scaling**: Scale compute-heavy engines separately
- **Language flexibility**: Future engines can use optimal languages (Rust, Go)
- **Fault isolation**: One engine failure doesn't cascade
- **Technology evolution**: Upgrade/replace engines without full rewrite

### Why FastAPI?
- Type-safe with Pydantic
- Auto-generated OpenAPI docs
- High performance (async/await)
- Easy testing and instrumentation

### Why Gateway Pattern?
- Single API surface for all engines
- Centralized auth, rate limiting, caching
- Intelligent routing and load balancing
- Unified monitoring and logging

## Roadmap (Next 12 Engines)

**Phase 5**: Scale to all 15 engines
- Optimize Engine (linear programming, constraint solving)
- Knowledge Engine (NER, semantic search, knowledge graphs)
- Reasoning Engine (logical inference, multi-agent debate)
- Evidence Engine (provenance tracking, audit trails)
- Governance Engine (policy enforcement, compliance scoring)
- AI Engine (LLM orchestration, model selection)
- Forecast Engine (ARIMA, Prophet, LSTM)
- Scenario Engine (stress testing, sensitivity analysis)
- Decision Engine (MCDA, trade-off analysis)
- Learning Engine (model training, AutoML)
- Workflow Engine (DAG orchestration, state machines)
- Visualization Engine (chart generation, dashboard composition)

**Phase 6**: Production hardening
- Multi-region deployment
- Auto-scaling based on load
- Circuit breakers and retry logic
- Result caching layer (Redis)
- Cost optimization and billing

## SDK Usage

### TypeScript (Frontend)
```typescript
import { useEconomicEngine } from "@/hooks/useEngines";

function MyComponent() {
  const { attributeCost } = useEconomicEngine();
  
  const handleCompute = async () => {
    const result = await attributeCost.execute({
      total_cost: 1000000,
      dimensions: [
        { name: "dept", value: "sales", weight: 0.4 }
      ],
      evidence_id: "evt-123"
    });
    
    console.log(result.attributions);
  };
  
  return (
    <button onClick={handleCompute} disabled={attributeCost.loading}>
      {attributeCost.loading ? "Computing..." : "Run Analysis"}
    </button>
  );
}
```

### Python (Backend)
```python
from kincaid_engines_sdk import EngineClient

client = EngineClient(base_url="http://gateway:8000")

result = await client.economic.attribute_cost(
    total_cost=1000000,
    dimensions=[
        {"name": "dept", "value": "sales", "weight": 0.4}
    ],
    evidence_id="evt-123"
)

print(result.attributions)
```

## Testing

```bash
# Unit tests
cd backend/engines/economic
pytest test_service.py -v

# Integration tests
cd backend/engines
pytest tests/integration/ -v

# Load testing
locust -f tests/load/locustfile.py --host=http://localhost:8000
```

## Contributing

All engines follow the same pattern:
1. Define Pydantic models in `models.py`
2. Implement core logic in `service.py`
3. Expose FastAPI endpoints in `main.py`
4. Add unit tests in `test_service.py`
5. Instrument with observability.py
6. Create Dockerfile and add to docker-compose.yml

See any existing engine for reference implementation.