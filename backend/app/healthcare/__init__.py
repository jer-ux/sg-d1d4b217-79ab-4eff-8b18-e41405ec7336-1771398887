"""
KINCAID HEALTH™ HEALTHCARE INTELLIGENCE SDK
Complete Actuarial & Analytics Platform
"""

from .healthcare_model import HealthcareTrendModel
from .claims_forecasting import ClaimsForecastingEngine
from .pharmacy_trend import PharmacyTrendEngine
from .glp1_economics import GLP1EconomicsEngine
from .specialty_drug import SpecialtyDrugEngine
from .utilization import UtilizationEngine
from .pmpm import PMPMEngine
from .completion_factors import CompletionFactorEngine
from .ibnr import IBNREngine
from .risk_adjustment import RiskAdjustmentEngine
from .population_health import PopulationHealthEngine
from .large_claims import LargeClaimantEngine
from .stop_loss_pricing import StopLossPricingEngine
from .stop_loss_optimization import StopLossOptimizationEngine
from .network_performance import NetworkPerformanceEngine
from .provider_contracts import ProviderContractEngine
from .pbm_intelligence import PBMIntelligenceEngine
from .formulary_analytics import FormularyAnalyticsEngine
from .rebate_economics import RebateEconomicsEngine
from .employer_benchmark import EmployerBenchmarkEngine
from .renewal_projection import RenewalProjectionEngine
from .plan_design import PlanDesignSimulator
from .contribution_optimizer import ContributionOptimizerEngine
from .trend_attribution import TrendAttributionEngine
from .cost_decomposition import CostDecompositionEngine
from .spread_detection import SpreadDetectionEngine
from .fiduciary_leakage import FiduciaryLeakageEngine
from .monte_carlo import MonteCarloEngine
from .bayesian_updating import BayesianUpdatingEngine
from .credibility import CredibilityEngine
from .executive_reporting import ExecutiveReporter
from .board_reporting import BoardReporter
from .ai_decision import AIDecisionEngine

__all__ = [
    # Core Model
    "HealthcareTrendModel",
    
    # Medical & Pharmacy (8)
    "ClaimsForecastingEngine",
    "PharmacyTrendEngine",
    "GLP1EconomicsEngine",
    "SpecialtyDrugEngine",
    
    # Utilization & Cost (4)
    "UtilizationEngine",
    "PMPMEngine",
    "CompletionFactorEngine",
    "IBNREngine",
    
    # Risk & Population (2)
    "RiskAdjustmentEngine",
    "PopulationHealthEngine",
    
    # Stop-Loss (3)
    "LargeClaimantEngine",
    "StopLossPricingEngine",
    "StopLossOptimizationEngine",
    
    # Network & Provider (2)
    "NetworkPerformanceEngine",
    "ProviderContractEngine",
    
    # PBM Intelligence (5)
    "PBMIntelligenceEngine",
    "FormularyAnalyticsEngine",
    "RebateEconomicsEngine",
    "SpreadDetectionEngine",
    "FiduciaryLeakageEngine",
    
    # Employer & Plan Design (4)
    "EmployerBenchmarkEngine",
    "RenewalProjectionEngine",
    "PlanDesignSimulator",
    "ContributionOptimizerEngine",
    
    # Advanced Analytics (6)
    "TrendAttributionEngine",
    "CostDecompositionEngine",
    "MonteCarloEngine",
    "BayesianUpdatingEngine",
    "CredibilityEngine",
    
    # Reporting & AI (3)
    "ExecutiveReporter",
    "BoardReporter",
    "AIDecisionEngine",
]