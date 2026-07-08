"""
KINCAID HEALTH™ ACTUARIAL ENGINE
Complete Simulation Usage Examples
"""

from app.actuarial.simulation import (
    SimulationEngine,
    HealthcareTrendModel,
    StopLossModel,
    IBNRModel,
    PensionFundingModel,
    PricingModel,
    WorkforceCostModel,
    SummaryStatistics,
    ConfidenceInterval,
    RiskMetrics,
    default_scenarios
)


def healthcare_example():
    """Healthcare trend simulation using scenario library"""
    print("\n" + "="*60)
    print("HEALTHCARE TREND SIMULATION")
    print("="*60)
    
    engine = SimulationEngine()
    model = HealthcareTrendModel()
    engine.register("healthcare", model.simulate)
    
    # Run baseline scenario
    scenario = default_scenarios.get("baseline")
    print(f"\nScenario: {scenario.name}")
    print(f"Description: {scenario.description}")
    
    result = engine.run(
        "healthcare",
        iterations=10000,
        base_cost=100_000_000,
        **scenario.assumptions
    )
    
    print(f"\nMean Cost:        ${result.summary['mean']:,.0f}")
    print(f"Median:           ${result.summary['median']:,.0f}")
    print(f"Minimum:          ${result.summary['minimum']:,.0f}")
    print(f"Maximum:          ${result.summary['maximum']:,.0f}")
    print(f"Std Dev:          ${result.summary['std_dev']:,.0f}")
    print(f"5th Percentile:   ${result.summary['p5']:,.0f}")
    print(f"95th Percentile:  ${result.summary['p95']:,.0f}")
    
    # Calculate risk metrics
    var_95 = RiskMetrics.var(result.values, confidence=0.95)
    tvar_95 = RiskMetrics.tvar(result.values, confidence=0.95)
    
    print(f"\nValue at Risk (95%):  ${var_95:,.0f}")
    print(f"Tail VaR (95%):       ${tvar_95:,.0f}")


def scenario_comparison():
    """Compare multiple scenarios"""
    print("\n" + "="*60)
    print("SCENARIO COMPARISON")
    print("="*60)
    
    engine = SimulationEngine()
    model = HealthcareTrendModel()
    engine.register("healthcare", model.simulate)
    
    scenarios_to_run = ["baseline", "high_inflation", "cost_containment"]
    
    print(f"\n{'Scenario':<20} {'Mean Cost':<20} {'95th %ile':<20}")
    print("-" * 60)
    
    for scenario_name in scenarios_to_run:
        scenario = default_scenarios.get(scenario_name)
        result = engine.run(
            "healthcare",
            iterations=10000,
            base_cost=100_000_000,
            **scenario.assumptions
        )
        print(f"{scenario_name:<20} ${result.summary['mean']:>18,.0f} ${result.summary['p95']:>18,.0f}")


def stop_loss_example():
    """Stop loss simulation"""
    print("\n" + "="*60)
    print("STOP LOSS SIMULATION")
    print("="*60)
    
    engine = SimulationEngine()
    engine.register("stop_loss", StopLossModel().simulate)
    
    scenario = default_scenarios.get("stop_loss_baseline")
    result = engine.run("stop_loss", iterations=10000, **scenario.assumptions)
    
    print(f"\nMean Claims Above Attachment:  ${result.summary['mean']:,.0f}")
    print(f"Median:                        ${result.summary['median']:,.0f}")
    print(f"95th Percentile:               ${result.summary['p95']:,.0f}")


def ibnr_example():
    """IBNR reserve simulation"""
    print("\n" + "="*60)
    print("IBNR RESERVE SIMULATION")
    print("="*60)
    
    engine = SimulationEngine()
    engine.register("ibnr", IBNRModel().simulate)
    
    scenario = default_scenarios.get("ibnr_normal")
    result = engine.run("ibnr", iterations=10000, **scenario.assumptions)
    
    print(f"\nMean Total Reserve:  ${result.summary['mean']:,.0f}")
    print(f"Median:              ${result.summary['median']:,.0f}")
    print(f"95th Percentile:     ${result.summary['p95']:,.0f}")


def pension_example():
    """Pension funding simulation"""
    print("\n" + "="*60)
    print("PENSION FUNDING SIMULATION")
    print("="*60)
    
    engine = SimulationEngine()
    engine.register("pension", PensionFundingModel().simulate)
    
    scenario = default_scenarios.get("pension_baseline")
    result = engine.run("pension", iterations=10000, **scenario.assumptions)
    
    print(f"\nMean Funded Status:  {result.summary['mean']:.1%}")
    print(f"Median:              {result.summary['median']:.1%}")
    print(f"5th Percentile:      {result.summary['p5']:.1%}")
    print(f"95th Percentile:     {result.summary['p95']:.1%}")


def workforce_example():
    """Workforce cost simulation"""
    print("\n" + "="*60)
    print("WORKFORCE COST SIMULATION")
    print("="*60)
    
    engine = SimulationEngine()
    engine.register("workforce", WorkforceCostModel().simulate)
    
    scenario = default_scenarios.get("workforce_baseline")
    result = engine.run("workforce", iterations=10000, **scenario.assumptions)
    
    print(f"\nMean Total Cost:  ${result.summary['mean']:,.0f}")
    print(f"Median:           ${result.summary['median']:,.0f}")
    print(f"95th Percentile:  ${result.summary['p95']:,.0f}")


def list_all_scenarios():
    """List all available scenarios"""
    print("\n" + "="*60)
    print("AVAILABLE SCENARIOS")
    print("="*60)
    
    for scenario in default_scenarios.all():
        print(f"\n{scenario.name}")
        print(f"  Description: {scenario.description}")
        print(f"  Tags: {', '.join(scenario.tags)}")


def main():
    """Run all examples"""
    list_all_scenarios()
    healthcare_example()
    scenario_comparison()
    stop_loss_example()
    ibnr_example()
    pension_example()
    workforce_example()
    
    print("\n" + "="*60)
    print("SIMULATION COMPLETE")
    print("="*60 + "\n")


if __name__ == "__main__":
    main()