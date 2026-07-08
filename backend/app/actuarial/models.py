"""
KINCAID HEALTH™ ACTUARIAL ENGINE
Abstract Models & Concrete Implementations
"""

from abc import ABC, abstractmethod
from typing import Dict, List, Any, Optional
import numpy as np
import pandas as pd
from datetime import datetime

from app.actuarial.interfaces import ClaimsData, ActuarialAssumptions, ActuarialResults


class ActuarialModel(ABC):
    """
    Abstract base class for all actuarial models
    
    All models follow the same lifecycle:
    1. validate() - Check data quality and completeness
    2. prepare() - Transform and prepare data
    3. calculate() - Execute core calculations
    4. summarize() - Format results
    """
    
    def __init__(self, name: str, version: str = "1.0.0"):
        self.name = name
        self.version = version
        self.data: Optional[ClaimsData] = None
        self.assumptions: Optional[ActuarialAssumptions] = None
        self.results: Optional[ActuarialResults] = None
        self.warnings: List[str] = []
    
    @abstractmethod
    def validate(self, data: ClaimsData) -> bool:
        """Validate input data"""
        pass
    
    @abstractmethod
    def prepare(self, data: ClaimsData, assumptions: ActuarialAssumptions) -> pd.DataFrame:
        """Prepare data for calculation"""
        pass
    
    @abstractmethod
    def calculate(self) -> Dict[str, Any]:
        """Execute core actuarial calculations"""
        pass
    
    @abstractmethod
    def summarize(self) -> ActuarialResults:
        """Summarize results into standard format"""
        pass
    
    def execute(self, data: ClaimsData, assumptions: ActuarialAssumptions) -> ActuarialResults:
        """Full execution pipeline"""
        if not self.validate(data):
            raise ValueError(f"Data validation failed for {self.name}")
        
        self.data = data
        self.assumptions = assumptions
        
        # Prepare data
        prepared = self.prepare(data, assumptions)
        
        # Calculate
        calc_results = self.calculate()
        
        # Summarize
        results = self.summarize()
        results.warnings = self.warnings
        
        return results


class TrendProjectionModel(ActuarialModel):
    """
    Medical/Pharmacy trend projection model
    Uses historical claims to project future cost trends
    """
    
    def __init__(self):
        super().__init__(name="TrendProjection", version="1.0.0")
        self.df: Optional[pd.DataFrame] = None
    
    def validate(self, data: ClaimsData) -> bool:
        if not data.claims:
            self.warnings.append("No claims data provided")
            return False
        
        if data.member_months < 1000:
            self.warnings.append("Low credibility: member months < 1000")
        
        return True
    
    def prepare(self, data: ClaimsData, assumptions: ActuarialAssumptions) -> pd.DataFrame:
        # Convert claims to DataFrame
        df = pd.DataFrame(data.claims)
        
        # Calculate PMPM
        if 'paid_amount' in df.columns:
            total_paid = df['paid_amount'].sum()
            pmpm = total_paid / data.member_months
        else:
            pmpm = 0
            self.warnings.append("No paid_amount column found")
        
        self.df = df
        return df
    
    def calculate(self) -> Dict[str, Any]:
        # Calculate historical trend
        # Simplified: use assumption trend rate
        historical_trend = self.assumptions.trend_rate
        
        # Project forward
        periods = self.assumptions.forecast_periods
        base_pmpm = self.df['paid_amount'].sum() / self.data.member_months
        
        projections = []
        for i in range(periods):
            projected_pmpm = base_pmpm * ((1 + historical_trend) ** (i + 1))
            projections.append({
                'period': i + 1,
                'pmpm': projected_pmpm,
                'total': projected_pmpm * self.data.member_months
            })
        
        return {
            'historical_trend': historical_trend,
            'projected_trend': historical_trend,
            'base_pmpm': base_pmpm,
            'projections': projections
        }
    
    def summarize(self) -> ActuarialResults:
        calc = self.calculate()
        
        return ActuarialResults(
            model_name=self.name,
            execution_timestamp=datetime.utcnow(),
            expected_claims=calc['projections'][-1]['total'],
            expected_pmpm=calc['projections'][-1]['pmpm'],
            credibility_weight=min(1.0, self.data.member_months / self.assumptions.credibility_threshold),
            historical_trend=calc['historical_trend'],
            projected_trend=calc['projected_trend'],
            forecast_periods=calc['projections'],
            forecast_total=sum(p['total'] for p in calc['projections']),
            percentile_50=calc['projections'][-1]['total'],
            percentile_75=calc['projections'][-1]['total'] * 1.15,
            percentile_90=calc['projections'][-1]['total'] * 1.25,
            percentile_95=calc['projections'][-1]['total'] * 1.35,
            percentile_99=calc['projections'][-1]['total'] * 1.50,
            ci_lower=calc['projections'][-1]['total'] * 0.85,
            ci_upper=calc['projections'][-1]['total'] * 1.35,
            assumptions=self.assumptions.dict(),
            data_quality_score=0.85,
            warnings=self.warnings
        )


class StopLossOptimizationModel(ActuarialModel):
    """
    Stop-loss optimization model
    Analyzes specific vs aggregate stop-loss scenarios
    """
    
    def __init__(self):
        super().__init__(name="StopLossOptimization", version="1.0.0")
        self.df: Optional[pd.DataFrame] = None
    
    def validate(self, data: ClaimsData) -> bool:
        if not data.claims:
            return False
        return True
    
    def prepare(self, data: ClaimsData, assumptions: ActuarialAssumptions) -> pd.DataFrame:
        df = pd.DataFrame(data.claims)
        self.df = df
        return df
    
    def calculate(self) -> Dict[str, Any]:
        # Calculate loss scenarios at different deductibles
        deductibles = [50000, 75000, 100000, 150000, 200000, 250000]
        
        scenarios = []
        for ded in deductibles:
            # Claims above deductible
            if 'paid_amount' in self.df.columns:
                excess_claims = self.df[self.df['paid_amount'] > ded]['paid_amount'].sum()
                retained = self.df['paid_amount'].sum() - excess_claims
            else:
                excess_claims = 0
                retained = 0
            
            scenarios.append({
                'deductible': ded,
                'excess_claims': excess_claims,
                'retained_claims': retained,
                'estimated_premium': excess_claims * 1.25,  # Simplified loading
            })
        
        return {'scenarios': scenarios}
    
    def summarize(self) -> ActuarialResults:
        calc = self.calculate()
        
        return ActuarialResults(
            model_name=self.name,
            execution_timestamp=datetime.utcnow(),
            expected_claims=self.df['paid_amount'].sum() if 'paid_amount' in self.df.columns else 0,
            expected_pmpm=0,
            credibility_weight=1.0,
            historical_trend=0.08,
            projected_trend=0.08,
            forecast_periods=calc['scenarios'],
            forecast_total=0,
            percentile_50=0,
            percentile_75=0,
            percentile_90=0,
            percentile_95=0,
            percentile_99=0,
            ci_lower=0,
            ci_upper=0,
            assumptions=self.assumptions.dict(),
            data_quality_score=0.90,
            warnings=self.warnings
        )


class LossRatioModel(ActuarialModel):
    """Loss ratio analysis and monitoring"""
    
    def __init__(self):
        super().__init__(name="LossRatio", version="1.0.0")
    
    def validate(self, data: ClaimsData) -> bool:
        return bool(data.claims)
    
    def prepare(self, data: ClaimsData, assumptions: ActuarialAssumptions) -> pd.DataFrame:
        return pd.DataFrame(data.claims)
    
    def calculate(self) -> Dict[str, Any]:
        # Simplified loss ratio calculation
        return {
            'loss_ratio': 0.85,
            'target_ratio': 0.80,
            'variance': 0.05
        }
    
    def summarize(self) -> ActuarialResults:
        return ActuarialResults(
            model_name=self.name,
            execution_timestamp=datetime.utcnow(),
            expected_claims=0,
            expected_pmpm=0,
            credibility_weight=1.0,
            historical_trend=0.08,
            projected_trend=0.08,
            forecast_periods=[],
            forecast_total=0,
            percentile_50=0,
            percentile_75=0,
            percentile_90=0,
            percentile_95=0,
            percentile_99=0,
            ci_lower=0,
            ci_upper=0,
            assumptions=self.assumptions.dict(),
            data_quality_score=0.85,
            warnings=self.warnings
        )


class PremiumForecastModel(ActuarialModel):
    """Premium forecasting model"""
    
    def __init__(self):
        super().__init__(name="PremiumForecast", version="1.0.0")
    
    def validate(self, data: ClaimsData) -> bool:
        return bool(data.claims)
    
    def prepare(self, data: ClaimsData, assumptions: ActuarialAssumptions) -> pd.DataFrame:
        return pd.DataFrame(data.claims)
    
    def calculate(self) -> Dict[str, Any]:
        return {'forecast': []}
    
    def summarize(self) -> ActuarialResults:
        return ActuarialResults(
            model_name=self.name,
            execution_timestamp=datetime.utcnow(),
            expected_claims=0,
            expected_pmpm=0,
            credibility_weight=1.0,
            historical_trend=0.08,
            projected_trend=0.08,
            forecast_periods=[],
            forecast_total=0,
            percentile_50=0,
            percentile_75=0,
            percentile_90=0,
            percentile_95=0,
            percentile_99=0,
            ci_lower=0,
            ci_upper=0,
            assumptions=self.assumptions.dict(),
            data_quality_score=0.85,
            warnings=self.warnings
        )