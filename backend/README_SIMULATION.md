# KINCAID HEALTH™ Actuarial Simulation Engine

## Quick Start

```python
from app.actuarial.simulation import SimulationEngine, HealthcareTrendModel

# Create engine
engine = SimulationEngine()

# Register model
model = HealthcareTrendModel()
engine.register("healthcare", model.simulate)

# Run simulation
result = engine.run(
    "healthcare",
    iterations=10000,
    base_cost=100_000_000,
    trend_mean=0.08,
    trend_sd=0.015,
    util_mean=1.02,
    util_sd=0.02,
    severity_mean=1.04,
    severity_sd=0.03
)

# View results
print(result.summary)
```

## Available Models

### Healthcare Models
- **HealthcareTrendModel** - Medical cost trend projection
- **PremiumRenewalModel** - Premium renewal forecasting
- **AggregateLossModel** - Total claims simulation
- **LargeClaimShockModel** - Catastrophic claim scenarios

### Actuarial Models
- **StopLossModel** - Stop-loss insurance analysis
- **IBNRModel** - Incurred But Not Reported reserves
- **PricingModel** - Insurance pricing simulation

### Enterprise Models
- **PensionFundingModel** - Pension funded status projection
- **WorkforceCostModel** - Total workforce cost forecasting

## Result Structure

```python
SimulationResult(
    values=np.ndarray,        # All simulated values
    summary={                 # Statistical summary
        'mean': float,
        'median': float,
        'minimum': float,
        'maximum': float,
        'std_dev': float,
        'p5': float,          # 5th percentile
        'p25': float,         # 25th percentile
        'p75': float,         # 75th percentile
        'p95': float          # 95th percentile
    },
    assumptions=dict          # Input parameters
)
```

## Statistical Analysis

```python
from app.actuarial.simulation import (
    SummaryStatistics,
    ConfidenceInterval,
    RiskMetrics
)

# Summary statistics
stats = SummaryStatistics.summarize(result.values)

# Confidence intervals
ci_95 = ConfidenceInterval.calculate(result.values, alpha=0.95)

# Risk metrics
var_95 = RiskMetrics.var(result.values, confidence=0.95)
tvar_95 = RiskMetrics.tvar(result.values, confidence=0.95)
```

## Complete Example

```python
from app.actuarial.simulation import SimulationEngine
from app.actuarial.simulation.models import (
    HealthcareTrendModel,
    StopLossModel,
    IBNRModel,
    PensionFundingModel,
    PricingModel,
    WorkforceCostModel
)

# Initialize engine
engine = SimulationEngine()

# Register all models
engine.register("healthcare", HealthcareTrendModel().simulate)
engine.register("stop_loss", StopLossModel().simulate)
engine.register("ibnr", IBNRModel().simulate)
engine.register("pension", PensionFundingModel().simulate)
engine.register("pricing", PricingModel().simulate)
engine.register("workforce", WorkforceCostModel().simulate)

# Run any model
result = engine.run(
    "healthcare",
    iterations=10000,
    # ... model-specific parameters
)
```

## Run Examples

```bash
cd backend
python examples/simulation_usage.py
```

This will run all 7 models with example parameters and display formatted results.

## Model Parameters

### HealthcareTrendModel
- `base_cost`: Current annual cost
- `trend_mean`: Expected medical trend rate
- `trend_sd`: Volatility of trend
- `util_mean`: Utilization change factor
- `util_sd`: Volatility of utilization
- `severity_mean`: Severity increase factor
- `severity_sd`: Volatility of severity

### StopLossModel
- `base_claims`: Total claims
- `attachment_point`: Stop-loss threshold
- `frequency_mean`: Expected large claims
- `frequency_sd`: Frequency volatility
- `severity_mean`: Average large claim size
- `severity_sd`: Severity volatility

### IBNRModel
- `paid_claims`: Currently paid claims
- `report_lag_mean`: Average reporting lag (months)
- `report_lag_sd`: Lag volatility
- `development_factor_mean`: Expected development
- `development_factor_sd`: Development volatility

### PensionFundingModel
- `current_assets`: Plan assets
- `current_liabilities`: Plan liabilities
- `expected_return`: Expected return rate
- `return_volatility`: Return volatility
- `benefit_payments`: Annual benefit payments
- `contributions`: Annual contributions
- `discount_rate_change`: Change in discount rate

### PricingModel
- `expected_claims`: Expected claim cost
- `claims_volatility`: Claims volatility
- `expense_ratio`: Operating expense ratio
- `target_margin`: Target profit margin
- `risk_charge`: Risk load factor
- `market_competition`: Competitive pressure (0-1)

### WorkforceCostModel
- `current_headcount`: Employee count
- `average_salary`: Average annual salary
- `salary_increase_mean`: Expected salary increase
- `salary_increase_sd`: Salary increase volatility
- `turnover_rate`: Annual turnover rate
- `benefit_cost_ratio`: Benefits as % of salary
- `hiring_cost_per_employee`: Cost per hire

## Output Example

```
HEALTHCARE COST PROJECTION
============================================================
Mean:              $114,600,000
Median:            $114,500,000
Minimum:           $98,200,000
Maximum:           $138,700,000
Std Dev:           $5,100,000
5th Percentile:    $106,300,000
95th Percentile:   $123,800,000
============================================================

95% Confidence Interval: $106,300,000 - $123,800,000
Value at Risk (95%):     $123,800,000
Tail VaR (95%):          $128,500,000
```