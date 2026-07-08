"""
KINCAID HEALTH™ SIMULATION ENGINE
Pre-built Scenario Library
"""

from .scenarios import Scenario, ScenarioLibrary


# Initialize library
library = ScenarioLibrary()


# Healthcare Scenarios
library.register(
    Scenario(
        name="baseline",
        description="Expected economic conditions",
        assumptions={
            "trend_mean": 0.08,
            "trend_sd": 0.015,
            "util_mean": 1.02,
            "util_sd": 0.02,
            "severity_mean": 1.04,
            "severity_sd": 0.03
        },
        tags=["standard", "forecast", "healthcare"]
    )
)

library.register(
    Scenario(
        name="high_inflation",
        description="Medical inflation shock",
        assumptions={
            "trend_mean": 0.13,
            "trend_sd": 0.03,
            "util_mean": 1.03,
            "util_sd": 0.02,
            "severity_mean": 1.08,
            "severity_sd": 0.04
        },
        tags=["stress", "healthcare"]
    )
)

library.register(
    Scenario(
        name="cost_containment",
        description="Aggressive employer interventions",
        assumptions={
            "trend_mean": 0.045,
            "trend_sd": 0.01,
            "util_mean": 0.98,
            "util_sd": 0.02,
            "severity_mean": 1.01,
            "severity_sd": 0.02
        },
        tags=["optimization", "healthcare"]
    )
)

library.register(
    Scenario(
        name="recession",
        description="Economic downturn - reduced utilization",
        assumptions={
            "trend_mean": 0.05,
            "trend_sd": 0.02,
            "util_mean": 0.95,
            "util_sd": 0.03,
            "severity_mean": 1.02,
            "severity_sd": 0.02
        },
        tags=["stress", "healthcare"]
    )
)

library.register(
    Scenario(
        name="pandemic",
        description="Healthcare system shock",
        assumptions={
            "trend_mean": 0.15,
            "trend_sd": 0.05,
            "util_mean": 1.10,
            "util_sd": 0.05,
            "severity_mean": 1.12,
            "severity_sd": 0.06
        },
        tags=["stress", "extreme", "healthcare"]
    )
)


# Stop Loss Scenarios
library.register(
    Scenario(
        name="stop_loss_baseline",
        description="Normal stop loss experience",
        assumptions={
            "attachment_point": 150000,
            "claim_frequency": 0.015,
            "severity_mean": 250000,
            "severity_sd": 100000,
            "member_count": 1000
        },
        tags=["standard", "stop_loss"]
    )
)

library.register(
    Scenario(
        name="stop_loss_high_shock",
        description="Multiple large claims",
        assumptions={
            "attachment_point": 150000,
            "claim_frequency": 0.025,
            "severity_mean": 350000,
            "severity_sd": 150000,
            "member_count": 1000
        },
        tags=["stress", "stop_loss"]
    )
)


# IBNR Scenarios
library.register(
    Scenario(
        name="ibnr_normal",
        description="Normal claims development",
        assumptions={
            "reported_claims": 10000000,
            "development_factor": 1.08,
            "development_sd": 0.02
        },
        tags=["standard", "ibnr"]
    )
)

library.register(
    Scenario(
        name="ibnr_adverse",
        description="Adverse development",
        assumptions={
            "reported_claims": 10000000,
            "development_factor": 1.15,
            "development_sd": 0.04
        },
        tags=["stress", "ibnr"]
    )
)


# Pension Scenarios
library.register(
    Scenario(
        name="pension_baseline",
        description="Expected pension returns",
        assumptions={
            "assets": 500000000,
            "liabilities": 520000000,
            "return_mean": 0.07,
            "return_sd": 0.12,
            "benefit_payments": 25000000,
            "contributions": 30000000
        },
        tags=["standard", "pension"]
    )
)

library.register(
    Scenario(
        name="pension_market_shock",
        description="Market downturn",
        assumptions={
            "assets": 500000000,
            "liabilities": 520000000,
            "return_mean": -0.10,
            "return_sd": 0.20,
            "benefit_payments": 25000000,
            "contributions": 30000000
        },
        tags=["stress", "pension"]
    )
)


# Workforce Cost Scenarios
library.register(
    Scenario(
        name="workforce_baseline",
        description="Normal workforce growth",
        assumptions={
            "headcount": 5000,
            "avg_salary": 75000,
            "salary_increase_mean": 0.03,
            "salary_increase_sd": 0.01,
            "benefit_rate": 0.30,
            "turnover_rate": 0.15,
            "hiring_cost_per_employee": 15000
        },
        tags=["standard", "workforce"]
    )
)

library.register(
    Scenario(
        name="workforce_wage_pressure",
        description="Tight labor market",
        assumptions={
            "headcount": 5000,
            "avg_salary": 75000,
            "salary_increase_mean": 0.06,
            "salary_increase_sd": 0.02,
            "benefit_rate": 0.32,
            "turnover_rate": 0.20,
            "hiring_cost_per_employee": 20000
        },
        tags=["stress", "workforce"]
    )
)