"""
KINCAID HEALTH™ ACTUARIAL ENGINE
Correlation Engine Usage Examples
"""

from app.actuarial.simulation.correlation import CorrelationEngine, CorrelatedVariable
from app.actuarial.simulation.correlated_models import (
    CorrelatedHealthcareTrendModel,
    CorrelatedMarketRiskModel,
    CorrelatedOperationalRiskModel
)
from app.actuarial.simulation import SummaryStatistics
import numpy as np


def basic_correlation_example():
    """Basic correlation engine usage"""
    print("\n" + "="*60)
    print("BASIC CORRELATION ENGINE")
    print("="*60)
    
    engine = CorrelationEngine()
    
    # Add variables
    engine.add_variable(CorrelatedVariable("trend", 0.08, 0.015))
    engine.add_variable(CorrelatedVariable("utilization", 1.02, 0.02))
    engine.add_variable(CorrelatedVariable("severity", 1.04, 0.03))
    
    # Set correlation matrix
    engine.set_correlation_matrix([
        [1.0, 0.65, 0.42],
        [0.65, 1.0, 0.31],
        [0.42, 0.31, 1.0]
    ])
    
    # Generate samples
    samples = engine.generate(10000)
    
    print(f"\nGenerated {len(samples):,} correlated samples")
    print(f"\nFirst 3 samples:")
    print(f"{'Trend':<15} {'Utilization':<15} {'Severity':<15}")
    print("-" * 45)
    for i in range(3):
        print(f"{samples[i, 0]:<15.4f} {samples[i, 1]:<15.4f} {samples[i, 2]:<15.4f}")
    
    # Verify correlations
    actual_corr = np.corrcoef(samples.T)
    print(f"\nActual correlation matrix:")
    print(actual_corr)


def healthcare_correlated_model():
    """Healthcare trend with correlated drivers"""
    print("\n" + "="*60)
    print("CORRELATED HEALTHCARE COST MODEL")
    print("="*60)
    
    model = CorrelatedHealthcareTrendModel()
    
    base_cost = 100_000_000
    results = model.simulate(base_cost, samples=10000)
    
    summary = SummaryStatistics.summarize(results)
    
    print(f"\nBase Cost:        ${base_cost:,.0f}")
    print(f"\nProjected Costs (with correlation):")
    print(f"Mean:             ${summary['mean']:,.0f}")
    print(f"Median:           ${summary['median']:,.0f}")
    print(f"Std Dev:          ${summary['std']:,.0f}")
    print(f"5th Percentile:   ${summary['p5']:,.0f}")
    print(f"95th Percentile:  ${summary['p95']:,.0f}")


def market_risk_model():
    """Investment portfolio with correlated returns"""
    print("\n" + "="*60)
    print("CORRELATED MARKET RISK MODEL")
    print("="*60)
    
    model = CorrelatedMarketRiskModel()
    
    portfolio_value = 50_000_000
    results = model.simulate(
        equity_allocation=0.60,
        bond_allocation=0.30,
        real_estate_allocation=0.10,
        portfolio_value=portfolio_value,
        samples=10000
    )
    
    summary = SummaryStatistics.summarize(results)
    
    print(f"\nStarting Portfolio: ${portfolio_value:,.0f}")
    print(f"Allocation: 60% Equity, 30% Bonds, 10% Real Estate")
    print(f"\nEnding Portfolio Values (with correlation):")
    print(f"Mean:             ${summary['mean']:,.0f}")
    print(f"Median:           ${summary['median']:,.0f}")
    print(f"5th Percentile:   ${summary['p5']:,.0f}")
    print(f"95th Percentile:  ${summary['p95']:,.0f}")


def operational_cost_model():
    """Operational costs with correlated drivers"""
    print("\n" + "="*60)
    print("CORRELATED OPERATIONAL COST MODEL")
    print("="*60)
    
    model = CorrelatedOperationalRiskModel()
    
    base_labor = 20_000_000
    base_materials = 15_000_000
    base_overhead = 8_000_000
    
    results = model.simulate(
        base_labor_cost=base_labor,
        base_materials_cost=base_materials,
        base_overhead_cost=base_overhead,
        samples=10000
    )
    
    summary = SummaryStatistics.summarize(results)
    
    print(f"\nBase Costs:")
    print(f"Labor:            ${base_labor:,.0f}")
    print(f"Materials:        ${base_materials:,.0f}")
    print(f"Overhead:         ${base_overhead:,.0f}")
    print(f"Total:            ${base_labor + base_materials + base_overhead:,.0f}")
    print(f"\nProjected Total Costs (with correlation):")
    print(f"Mean:             ${summary['mean']:,.0f}")
    print(f"Median:           ${summary['median']:,.0f}")
    print(f"95th Percentile:  ${summary['p95']:,.0f}")


def main():
    """Run all correlation examples"""
    basic_correlation_example()
    healthcare_correlated_model()
    market_risk_model()
    operational_cost_model()
    
    print("\n" + "="*60)
    print("CORRELATION EXAMPLES COMPLETE")
    print("="*60 + "\n")


if __name__ == "__main__":
    main()