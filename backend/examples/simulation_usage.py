"""
KINCAID HEALTH™ ACTUARIAL ENGINE
Complete Simulation Usage Examples
"""

from app.actuarial.simulation.engine import SimulationEngine
from app.actuarial.simulation.models import (
    HealthcareTrendModel,
    PremiumRenewalModel,
    AggregateLossModel,
    LargeClaimShockModel
)
from app.actuarial.simulation.extended_models import (
    StopLossModel,
    IBNRModel,
    PensionFundingModel,
    PricingModel,
    WorkforceCostModel
)
from app.actuarial.simulation.statistics import SummaryStatistics
from app.actuarial.simulation.confidence import ConfidenceInterval
from app.actuarial.simulation.var import RiskMetrics


def format_currency(value):
    """Format value as currency"""
    return f"${value:,.0f}"


def format_summary(summary, title="Simulation Results"):
    """Format summary statistics nicely"""
    print(f"\n{title}")
    print("=" * 60)
    print(f"Mean:              {format_currency(summary['mean'])}")
    print(f"Median:            {format_currency(summary['median'])}")
    print(f"Minimum:           {format_currency(summary['minimum'])}")
    print(f"Maximum:           {format_currency(summary['maximum'])}")
    print(f"Std Dev:           {format_currency(summary['std_dev'])}")
    print(f"5th Percentile:    {format_currency(summary['p5'])}")
    print(f"25th Percentile:   {format_currency(summary['p25'])}")
    print(f"75th Percentile:   {format_currency(summary['p75'])}")
    print(f"95th Percentile:   {format_currency(summary['p95'])}")
    print("=" * 60)


def main():
    """Run complete simulation examples"""
    
    # Initialize engine
    engine = SimulationEngine()
    
    # Register all models
    engine.register("healthcare", HealthcareTrendModel().simulate)
    engine.register("premium", PremiumRenewalModel().simulate)
    engine.register("aggregate", AggregateLossModel().simulate)
    engine.register("shock", LargeClaimShockModel().simulate)
    engine.register("stop_loss", StopLossModel().simulate)
    engine.register("ibnr", IBNRModel().simulate)
    engine.register("pension", PensionFundingModel().simulate)
    engine.register("pricing", PricingModel().simulate)
    engine.register("workforce", WorkforceCostModel().simulate)
    
    print("\n" + "="*60)
    print("KINCAID HEALTH™ ACTUARIAL SIMULATION ENGINE")
    print("="*60)
    
    # Example 1: Healthcare Cost Projection
    print("\n[1] HEALTHCARE COST PROJECTION")
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
    format_summary(result.summary, "Healthcare Cost Projection")
    
    # Calculate confidence intervals
    ci_95 = ConfidenceInterval.calculate(result.values, alpha=0.95)
    print(f"\n95% Confidence Interval: {format_currency(ci_95['lower'])} - {format_currency(ci_95['upper'])}")
    
    # Calculate VaR
    var_95 = RiskMetrics.var(result.values, confidence=0.95)
    tvar_95 = RiskMetrics.tvar(result.values, confidence=0.95)
    print(f"Value at Risk (95%):     {format_currency(var_95)}")
    print(f"Tail VaR (95%):          {format_currency(tvar_95)}")
    
    # Example 2: Premium Renewal
    print("\n[2] PREMIUM RENEWAL FORECAST")
    result = engine.run(
        "premium",
        iterations=10000,
        current_premium=150_000_000,
        loss_ratio=0.82,
        trend_rate=0.07,
        utilization_change=0.02,
        mix_shift=-0.01
    )
    format_summary(result.summary, "Premium Renewal Forecast")
    
    # Example 3: Stop-Loss Analysis
    print("\n[3] STOP-LOSS SIMULATION")
    result = engine.run(
        "stop_loss",
        iterations=10000,
        base_claims=50_000_000,
        attachment_point=150_000,
        frequency_mean=85,
        frequency_sd=12,
        severity_mean=225_000,
        severity_sd=75_000
    )
    format_summary(result.summary, "Stop-Loss Expected Cost")
    
    # Example 4: IBNR Reserve
    print("\n[4] IBNR RESERVE ESTIMATION")
    result = engine.run(
        "ibnr",
        iterations=10000,
        paid_claims=35_000_000,
        report_lag_mean=3.5,
        report_lag_sd=1.2,
        development_factor_mean=1.15,
        development_factor_sd=0.08
    )
    format_summary(result.summary, "IBNR Reserve Estimate")
    
    # Example 5: Pension Funding
    print("\n[5] PENSION FUNDED STATUS")
    result = engine.run(
        "pension",
        iterations=10000,
        current_assets=500_000_000,
        current_liabilities=550_000_000,
        expected_return=0.07,
        return_volatility=0.12,
        benefit_payments=25_000_000,
        contributions=30_000_000,
        discount_rate_change=-0.005
    )
    
    # Format as percentage
    print(f"\nPension Funded Status Simulation")
    print("=" * 60)
    print(f"Mean Funded Ratio:     {result.summary['mean']:.2%}")
    print(f"Median Funded Ratio:   {result.summary['median']:.2%}")
    print(f"5th Percentile:        {result.summary['p5']:.2%}")
    print(f"95th Percentile:       {result.summary['p95']:.2%}")
    print("=" * 60)
    
    # Example 6: Insurance Pricing
    print("\n[6] INSURANCE PRICING")
    result = engine.run(
        "pricing",
        iterations=10000,
        expected_claims=12_000_000,
        claims_volatility=0.15,
        expense_ratio=0.18,
        target_margin=0.05,
        risk_charge=0.02,
        market_competition=0.6
    )
    format_summary(result.summary, "Insurance Premium Pricing")
    
    # Example 7: Workforce Cost
    print("\n[7] WORKFORCE COST PROJECTION")
    result = engine.run(
        "workforce",
        iterations=10000,
        current_headcount=2500,
        average_salary=75_000,
        salary_increase_mean=0.035,
        salary_increase_sd=0.01,
        turnover_rate=0.15,
        benefit_cost_ratio=0.28,
        hiring_cost_per_employee=15_000
    )
    format_summary(result.summary, "Total Workforce Cost")
    
    print("\n" + "="*60)
    print("SIMULATION COMPLETE")
    print("="*60 + "\n")


if __name__ == "__main__":
    main()