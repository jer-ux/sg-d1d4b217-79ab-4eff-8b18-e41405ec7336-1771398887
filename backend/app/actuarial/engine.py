"""
KINCAID HEALTH™ ACTUARIAL ENGINE
Main Orchestration Engine
"""

from typing import Dict, List, Any, Optional
from datetime import datetime
import pandas as pd

from app.actuarial.interfaces import ClaimsData, ActuarialAssumptions, ActuarialResults
from app.actuarial.models import ActuarialModel
from app.actuarial.registry import ModelRegistry
from app.actuarial.validators import DataValidator
from app.actuarial.credibility import CredibilityEngine
from app.actuarial.trend import TrendEngine
from app.actuarial.forecast import ForecastEngine
from app.actuarial.simulation import SimulationEngine


class ActuarialEngine:
    """
    Central orchestration engine for actuarial analysis
    
    Workflow:
    1. Validate data quality
    2. Calculate credibility
    3. Analyze trends
    4. Generate forecasts
    5. Run simulations
    6. Produce CFO-ready results
    """
    
    def __init__(self):
        self.registry = ModelRegistry()
        self.validator = DataValidator()
        self.credibility_engine = CredibilityEngine()
        self.trend_engine = TrendEngine()
        self.forecast_engine = ForecastEngine()
        self.simulation_engine = SimulationEngine()
        
        self.execution_log: List[Dict[str, Any]] = []
    
    def execute_model(
        self,
        model_name: str,
        data: ClaimsData,
        assumptions: Optional[ActuarialAssumptions] = None
    ) -> ActuarialResults:
        """
        Execute a single actuarial model
        """
        # Get model from registry
        model = self.registry.get_model(model_name)
        
        # Use default assumptions if none provided
        if assumptions is None:
            assumptions = ActuarialAssumptions()
        
        # Validate data
        validation_results = self.validator.validate(data)
        if not validation_results['is_valid']:
            raise ValueError(f"Data validation failed: {validation_results['errors']}")
        
        # Execute model
        results = model.execute(data, assumptions)
        
        # Log execution
        self.execution_log.append({
            'timestamp': datetime.utcnow(),
            'model': model_name,
            'member_months': data.member_months,
            'data_quality': validation_results['quality_score']
        })
        
        return results
    
    def full_actuarial_analysis(
        self,
        data: ClaimsData,
        assumptions: Optional[ActuarialAssumptions] = None
    ) -> Dict[str, Any]:
        """
        Execute complete actuarial workflow
        """
        if assumptions is None:
            assumptions = ActuarialAssumptions()
        
        # 1. Validate
        validation = self.validator.validate(data)
        
        # 2. Calculate credibility
        credibility = self.credibility_engine.calculate_credibility(
            member_months=data.member_months,
            claims_count=len(data.claims)
        )
        
        # 3. Analyze trend
        trend_results = self.trend_engine.analyze_trend(data)
        
        # 4. Generate forecast
        forecast_results = self.forecast_engine.generate_forecast(
            data=data,
            trend_rate=trend_results['trend_rate'],
            periods=assumptions.forecast_periods
        )
        
        # 5. Run simulation
        simulation_results = self.simulation_engine.monte_carlo_simulation(
            data=data,
            assumptions=assumptions
        )
        
        # 6. Compile results
        return {
            'validation': validation,
            'credibility': credibility,
            'trend': trend_results,
            'forecast': forecast_results,
            'simulation': simulation_results,
            'summary': {
                'expected_pmpm': forecast_results['expected_pmpm'],
                'confidence_95': simulation_results['percentile_95'],
                'risk_adjustment': credibility['credibility_weight'],
                'data_quality_score': validation['quality_score']
            }
        }
    
    def benchmark_analysis(
        self,
        data: ClaimsData,
        benchmark_source: str = "nhwa"
    ) -> Dict[str, Any]:
        """
        Compare plan results to industry benchmarks
        """
        from app.actuarial.benchmarks import BenchmarkEngine
        
        benchmark_engine = BenchmarkEngine()
        return benchmark_engine.compare_to_benchmark(data, benchmark_source)
    
    def get_execution_history(self) -> List[Dict[str, Any]]:
        """Get execution log"""
        return self.execution_log