"""
KINCAID HEALTH™ SIMULATION ENGINE
Model Factory for Easy Model Creation
"""

from .models import (
    HealthcareTrendModel,
    PremiumRenewalModel,
    AggregateLossModel,
    LargeClaimShockModel
)
from .extended_models import (
    StopLossModel,
    IBNRModel,
    PensionFundingModel,
    PricingModel,
    WorkforceCostModel
)
from .correlated_models import (
    CorrelatedHealthcareTrendModel,
    CorrelatedMarketRiskModel,
    CorrelatedOperationalRiskModel
)
from .registry import ModelRegistry


class ModelFactory:
    """Factory for creating simulation models"""
    
    @staticmethod
    def create_registry() -> ModelRegistry:
        """Create and populate model registry"""
        registry = ModelRegistry()
        
        # Healthcare models
        registry.register(
            "healthcare",
            HealthcareTrendModel().simulate,
            "healthcare",
            "Project healthcare cost trends",
            ["base_cost", "trend_mean", "trend_sd", "util_mean", "util_sd", "severity_mean", "severity_sd"],
            example_values={"base_cost": 100000000, "trend_mean": 0.08, "trend_sd": 0.015}
        )
        
        registry.register(
            "stop_loss",
            StopLossModel().simulate,
            "healthcare",
            "Analyze stop-loss insurance costs",
            ["attachment_point", "aggregate_claims", "shock_probability", "shock_multiplier"],
            example_values={"attachment_point": 150000, "aggregate_claims": 15000000}
        )
        
        registry.register(
            "ibnr",
            IBNRModel().simulate,
            "reserves",
            "Calculate Incurred But Not Reported reserves",
            ["reported_claims", "development_factor_mean", "development_factor_sd"],
            example_values={"reported_claims": 10000000, "development_factor_mean": 1.15}
        )
        
        # Financial models
        registry.register(
            "pension",
            PensionFundingModel().simulate,
            "finance",
            "Simulate pension funded status",
            ["assets", "liabilities", "return_mean", "return_sd", "discount_rate", "liability_growth"],
            example_values={"assets": 500000000, "liabilities": 550000000}
        )
        
        registry.register(
            "pricing",
            PricingModel().simulate,
            "insurance",
            "Calculate insurance premium pricing",
            ["expected_claims", "fixed_expense", "var_expense_rate", "target_margin", "utilization_factor"],
            example_values={"expected_claims": 12000000, "target_margin": 0.15}
        )
        
        # Workforce models
        registry.register(
            "workforce",
            WorkforceCostModel().simulate,
            "hr",
            "Project total workforce costs",
            ["base_employees", "base_salary_cost", "turnover_rate", "hiring_cost_per_employee"],
            example_values={"base_employees": 5000, "base_salary_cost": 250000000}
        )
        
        # Correlated models
        registry.register(
            "correlated_healthcare",
            CorrelatedHealthcareTrendModel().simulate,
            "healthcare",
            "Healthcare trends with correlations",
            ["base_cost"],
            ["trend_utilization_corr", "trend_severity_corr", "utilization_severity_corr"],
            example_values={"base_cost": 100000000}
        )
        
        return registry


# Global registry instance
default_registry = ModelFactory.create_registry()