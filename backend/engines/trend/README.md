# Medical Trend Forecast Engine

Production-quality actuarial engine for projecting future healthcare costs using historical claims data.

## Overview

The Medical Trend Forecast Engine implements multiple methodologies for forecasting medical claims trends:

- **Simple Trend**: `Future Cost = Current Cost × (1+Trend)^Years`
- **Actuarial Decomposition**: `Trend = Medical Inflation + Utilization + Severity + Mix Shift - Savings`
- Compound growth rate (CAGR)
- Exponential smoothing
- Linear regression

## Features

- ✅ Multiple forecast methodologies
- ✅ Automatic trend component decomposition
- ✅ Seasonal adjustments
- ✅ Confidence intervals
- ✅ Data quality validation
- ✅ Model fit statistics (R², MAE)
- ✅ RESTful API with OpenAPI documentation
- ✅ Comprehensive unit tests

## Installation

```bash
cd backend/engines/trend
pip install -r requirements.txt
```

## Quick Start

### Run the Service

```bash
# Development
uvicorn main:app --reload --port 8001

# Production
uvicorn main:app --host 0.0.0.0 --port 8001 --workers 4
```

### API Documentation

Once running, visit:
- Swagger UI: http://localhost:8001/docs
- ReDoc: http://localhost:8001/redoc

## Usage

### Python Client

```python
from datetime import date
from models import (
    TrendForecastRequest,
    HistoricalClaims,
    ClaimsPeriod,
    TrendMethod,
)
from medical_forecast_engine import MedicalTrendEngine

# Create engine
engine = MedicalTrendEngine()

# Prepare historical data
historical_claims = HistoricalClaims(
    periods=[
        ClaimsPeriod(
            period_start=date(2024, 1, 1),
            period_end=date(2024, 12, 31),
            total_claims=12_500_000,
            member_months=50_000,
        ),
        ClaimsPeriod(
            period_start=date(2025, 1, 1),
            period_end=date(2025, 12, 31),
            total_claims=13_125_000,
            member_months=52_000,
        ),
    ]
)

# Create forecast request
request = TrendForecastRequest(
    historical_claims=historical_claims,
    forecast_periods=12,
    method=TrendMethod.ACTUARIAL_DECOMPOSITION,
    confidence_interval=0.95,
)

# Generate forecast
response = engine.forecast(request)

# Access results
print(f"Composite Trend: {response.composite_trend:.1%}")
print(f"Medical Inflation: {response.trend_components.medical_inflation:.1%}")
print(f"Baseline PMPM: ${response.baseline_pmpm:.2f}")

for period in response.forecast:
    print(f"Period {period.period}: ${period.projected_pmpm:.2f} PMPM")
```

### REST API

```bash
# POST /forecast
curl -X POST "http://localhost:8001/forecast" \
  -H "Content-Type: application/json" \
  -d '{
    "historical_claims": {
      "periods": [
        {
          "period_start": "2024-01-01",
          "period_end": "2024-12-31",
          "total_claims": 12500000,
          "member_months": 50000
        },
        {
          "period_start": "2025-01-01",
          "period_end": "2025-12-31",
          "total_claims": 13125000,
          "member_months": 52000
        }
      ]
    },
    "forecast_periods": 12,
    "method": "actuarial_decomposition",
    "confidence_interval": 0.95
  }'
```

## Methodologies

### 1. Simple Trend

Basic year-over-year growth rate:

```
Trend = (Final PMPM / Initial PMPM)^(1/years) - 1
```

Use when: You need a quick, directional estimate.

### 2. Compound (CAGR)

Compound annual growth rate with exponential fitting:

```
CAGR = exp(slope) - 1  (from log-linear regression)
```

Use when: You have consistent historical growth patterns.

### 3. Actuarial Decomposition (Recommended)

Decomposes trend into components:

```
Trend = Medical_Inflation + Utilization_Change + Severity_Change + Mix_Shift - Savings_Programs
```

Where:
- **Medical Inflation**: CPI-Medical (typically 4-5%)
- **Utilization**: Change in services per member
- **Severity**: Change in cost per service
- **Mix Shift**: Population or benefit design changes
- **Savings**: Impact of care management programs

Use when: You need to understand drivers of cost changes.

### 4. Exponential Smoothing

Time series smoothing with exponential weights:

```
Smoothed[t] = α × Actual[t] + (1-α) × Smoothed[t-1]
```

Use when: You want to dampen volatility in historical data.

### 5. Linear Regression

Ordinary least squares trend line:

```
PMPM = β₀ + β₁ × Time
```

Use when: You expect linear growth patterns.

## Seasonal Adjustments

The engine can apply monthly seasonal factors:

| Month | Factor | Note |
|-------|--------|------|
| January | 1.12 | Highest (deductible reset) |
| June | 0.95 | Lowest (summer) |
| December | 1.04 | Holiday season |

## Data Quality Validations

The engine automatically checks for:

1. **Large Period Changes**: Warns if PMPM changes >30% period-over-period
2. **Low Credibility**: Warns if member months <1,200 (small population)
3. **Chronological Order**: Enforces periods in time sequence

## Model Fit Statistics

The engine calculates:

- **R² (R-squared)**: Goodness of fit (0-1, higher is better)
- **MAE (Mean Absolute Error)**: Average prediction error in dollars

Interpretation:
- R² > 0.90: Excellent fit
- R² 0.75-0.90: Good fit
- R² < 0.75: Consider investigating data quality

## Testing

```bash
# Run all tests
pytest test_medical_forecast.py -v

# Run with coverage
pytest test_medical_forecast.py --cov=. --cov-report=html

# Run specific test
pytest test_medical_forecast.py::TestMedicalTrendEngine::test_actuarial_decomposition
```

## Deployment

### Docker

```bash
# Build image
docker build -t medical-trend-engine:latest .

# Run container
docker run -p 8001:8001 medical-trend-engine:latest
```

### Docker Compose

```bash
docker-compose up -d
```

## API Reference

### POST /forecast

Generate medical trend forecast.

**Request Body:**
```json
{
  "historical_claims": {
    "periods": [
      {
        "period_start": "2024-01-01",
        "period_end": "2024-12-31",
        "total_claims": 12500000,
        "member_months": 50000
      }
    ]
  },
  "forecast_periods": 12,
  "method": "actuarial_decomposition",
  "confidence_interval": 0.95,
  "apply_seasonality": true
}
```

**Response:**
```json
{
  "forecast": [...],
  "trend_components": {
    "medical_inflation": 0.045,
    "utilization_change": 0.01,
    "severity_change": 0.015,
    "mix_shift": 0.005,
    "savings_programs": 0.015
  },
  "composite_trend": 0.06,
  "baseline_pmpm": 252.40,
  "r_squared": 0.92,
  "warnings": []
}
```

### GET /methods

List available trend calculation methods.

### GET /health

Health check endpoint.

## Performance

- **Latency**: <100ms for 24-month forecasts
- **Throughput**: >1000 requests/second
- **Memory**: ~50MB per worker

## Best Practices

1. **Minimum Data**: Provide at least 2 years of historical data
2. **Credibility**: Ensure >1,200 member months per period
3. **Outliers**: Investigate periods with >30% PMPM changes
4. **Method Selection**: Use `actuarial_decomposition` for most accurate results
5. **Confidence Intervals**: Use 95% for financial reporting, 80% for internal planning

## Integration with Other Engines

This engine serves as the foundation for:

- Rx Trend Forecasting (pharmacy-specific trends)
- Renewal Pricing (rate development)
- Stop-Loss Modeling (large claim analysis)
- Budget Forecasting (financial planning)

## License

Proprietary - Kincaid IQ / SiriusB iQ

## Support

For questions or issues, contact: engineering@siriusb.ai