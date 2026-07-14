# Rx Trend Forecast Engine

Production actuarial engine for pharmacy benefit trend forecasting.

## Features

- **Composite Trend Calculation**: Brand inflation + Generic deflation + Specialty mix + Utilization + GLP-1 impact - Rebates - Biosimilar savings
- **Multi-Year Projections**: Compound growth forecasting
- **Category Breakdown**: Separate projections for brand, generic, and specialty drugs
- **REST API**: FastAPI endpoints with OpenAPI documentation

## Architecture

```
rx_trend/
├── engine.py         # Main orchestrator
├── models.py         # Pydantic data models
├── assumptions.py    # Trend calculation logic
├── forecast.py       # Projection algorithms
├── tests/            # Unit tests
└── main.py          # FastAPI application
```

## Installation

```bash
cd backend/engines/rx_trend
pip install -r requirements.txt
```

## Usage

### Python API

```python
from rx_trend import RxTrendEngine

engine = RxTrendEngine()

assumptions = {
    "brand_inflation": 0.08,
    "generic_deflation": -0.03,
    "specialty_mix_shift": 0.04,
    "utilization_trend": 0.02,
    "glp1_impact": 0.015,
    "rebate_rate": 0.03,
    "biosimilar_savings": 0.01
}

results = engine.run(
    current_cost=5000000,
    members=1000,
    years=5,
    assumptions=assumptions
)

for r in results:
    print(f"Year {r.year}: ${r.projected_cost:,.0f} @ ${r.projected_pmpm:.2f} PMPM")
```

### REST API

Start the service:

```bash
uvicorn main:app --host 0.0.0.0 --port 8002
```

Generate forecast:

```bash
curl -X POST http://localhost:8002/forecast \
  -H "Content-Type: application/json" \
  -d '{
    "current_cost": 5000000,
    "members": 1000,
    "years": 5,
    "assumptions": {
      "brand_inflation": 0.08,
      "generic_deflation": -0.03,
      "specialty_mix_shift": 0.04,
      "utilization_trend": 0.02,
      "glp1_impact": 0.015,
      "rebate_rate": 0.03,
      "biosimilar_savings": 0.01
    }
  }'
```

API documentation: http://localhost:8002/docs

## Testing

```bash
pytest tests/ -v --cov=.
```

## Docker Deployment

```bash
docker build -t rx-trend-engine .
docker run -p 8002:8002 rx-trend-engine
```

## Trend Components

| Component | Description | Typical Range |
|-----------|-------------|---------------|
| Brand Inflation | Brand drug price increases | 6-10% |
| Generic Deflation | Generic price decreases | -3% to -5% |
| Specialty Mix | Shift to specialty drugs | 2-6% |
| Utilization | Script volume growth | 1-3% |
| GLP-1 Impact | New GLP-1 drug adoption | 1-2% |
| Rebates | Manufacturer rebates | 2-4% |
| Biosimilar Savings | Biosimilar adoption | 0.5-2% |

## License

Proprietary - Kincaid IQ / SiriusB iQ

## Support

For questions: engineering@siriusb.ai