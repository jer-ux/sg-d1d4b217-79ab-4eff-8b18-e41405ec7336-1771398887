"""
KINCAID HEALTH™ ACTUARIAL ENGINE
Abstract Models & Concrete Implementations
"""

from abc import ABC, abstractmethod
from typing import Dict, Any, List, Optional
import pandas as pd
import numpy as np
from datetime import datetime

from .interfaces import (
    ClaimsData,
    ActuarialAssumptions,
    ActuarialResults,
    ModelResult,
    Assumption
)
from .assumptions import AssumptionLibrary
from .credibility import CredibilityEngine
from .trend import TrendEngine
from .forecast import ForecastEngine
from .simulation import SimulationEngine
from .benchmarks import BenchmarkEngine


class ActuarialModel(ABC):
    """
    Abstract base class for all actuarial models
    """
    
    def __init__(self, name: str, version: str = "1.0"):
        self.name = name
        self.version = version
        self.warnings: List[str] = []
        self.evidence: List[Dict[str, Any]] = []
    
    @abstractmethod
    def validate(self, data: ClaimsData) -> bool:
        """Validate input data"""
        pass
    
    @abstractmethod
    def prepare(self, data: ClaimsData) -> Dict[str, Any]:
        """Prepare data for calculation"""
        pass
    
    @abstractmethod
    def calculate(self, prepared_data: Dict[str, Any]) -> ModelResult:
        """Execute core calculation"""
        pass
    
    @abstractmethod
    def summarize(self, result: ModelResult) -> Dict[str, Any]:
        """Generate executive summary"""
        pass
    
    def run(self, data: ClaimsData) -> ModelResult:
        """
        Execute full model workflow
        """
        # Validate
        if not self.validate(data):
            return ModelResult(
                name=self.name,
                success=False,
                metrics={},
                assumptions={},
                warnings=self.warnings,
                confidence=0.0,
                evidence=self.evidence
            )
        
        # Prepare
        prepared = self.prepare(data)
        
        # Calculate
        result = self.calculate(prepared)
        
        return result


class TrendProjectionModel(ActuarialModel):
    """
    Medical cost trend projection with credibility weighting
    """
    
    def __init__(self):
        super().__init__(name="TrendProjection", version="2.0")
        self.trend_engine = TrendEngine()
        self.credibility_engine = CredibilityEngine()
        self.forecast_engine = ForecastEngine()
    
    def validate(self, data: ClaimsData) -> bool:
        """Validate claims data"""
        if data.member_months < 12:
            self.warnings.append("Less than 12 months of exposure - low credibility")
        
        if data.total_claims <= 0:
            self.warnings.append("Total claims must be positive")
            return False
        
        return True
    
    def prepare(self, data: ClaimsData) -> Dict[str, Any]:
        """Prepare data for trend analysis"""
        current_pmpm = data.pmpm()
        
        # Build assumptions
        assumptions = AssumptionLibrary.build_assumption_set(
            exposure_months=data.member_months,
            industry=data.industry
        )
        
        # Track evidence
        self.evidence.append({
            'type': 'input_data',
            'member_months': data.member_months,
            'total_claims': data.total_claims,
            'current_pmpm': current_pmpm
        })
        
        return {
            'current_pmpm': current_pmpm,
            'assumptions': assumptions,
            'data': data
        }
    
    def calculate(self, prepared_data: Dict[str, Any]) -> ModelResult:
        """Execute trend projection"""
        current_pmpm = prepared_data['current_pmpm']
        assumptions = prepared_data['assumptions']
        data = prepared_data['data']
        
        # Get medical trend assumption
        medical_trend = assumptions['medical_trend'].value
        credibility = assumptions['credibility_factor'].value
        
        # Project forward 12 months
        forecast = self.forecast_engine.project_pmpm(
            base_pmpm=current_pmpm,
            trend_rate=medical_trend,
            periods=12,
            member_count=data.member_count or (data.member_months // 12)
        )
        
        # Track evidence
        self.evidence.append({
            'type': 'projection',
            'base_pmpm': current_pmpm,
            'trend_rate': medical_trend,
            'credibility': credibility,
            'projected_pmpm': forecast['projected_pmpm']
        })
        
        return ModelResult(
            name=self.name,
            success=True,
            metrics={
                'current_pmpm': round(current_pmpm, 2),
                'projected_pmpm': round(forecast['projected_pmpm'], 2),
                'annual_trend': round(medical_trend, 4),
                'monthly_trend': round(medical_trend / 12, 4),
                'credibility_score': round(credibility, 4)
            },
            assumptions={
                'medical_trend': assumptions['medical_trend'].__dict__,
                'credibility': assumptions['credibility_factor'].__dict__
            },
            warnings=self.warnings,
            confidence=credibility,
            evidence=self.evidence
        )
    
    def summarize(self, result: ModelResult) -> Dict[str, Any]:
        """Generate CFO summary"""
        return {
            'model': self.name,
            'current_monthly_cost': result.metrics['current_pmpm'],
            'projected_monthly_cost': result.metrics['projected_pmpm'],
            'annual_increase_percent': round(result.metrics['annual_trend'] * 100, 2),
            'confidence_level': self._confidence_label(result.confidence),
            'warnings': result.warnings
        }
    
    def _confidence_label(self, score: float) -> str:
        if score >= 0.90:
            return 'Very High'
        elif score >= 0.75:
            return 'High'
        elif score >= 0.50:
            return 'Medium'
        else:
            return 'Low'


class StopLossOptimizationModel(ActuarialModel):
    """
    Stop-loss specific attachment point optimization
    """
    
    def __init__(self):
        super().__init__(name="StopLossOptimization", version="2.0")
        self.simulation_engine = SimulationEngine()
    
    def validate(self, data: ClaimsData) -> bool:
        if data.large_claims is None:
            self.warnings.append("Large claims data not provided")
            return False
        return True
    
    def prepare(self, data: ClaimsData) -> Dict[str, Any]:
        return {
            'total_claims': data.total_claims,
            'large_claims': data.large_claims,
            'member_months': data.member_months
        }
    
    def calculate(self, prepared_data: Dict[str, Any]) -> ModelResult:
        """Calculate optimal attachment point"""
        total_claims = prepared_data['total_claims']
        large_claims = prepared_data['large_claims']
        
        # Simulate different attachment points
        attachment_points = [50000, 75000, 100000, 125000, 150000, 200000, 250000]
        results = []
        
        for ap in attachment_points:
            # Estimate premium cost vs risk retained
            premium_estimate = large_claims * 1.25  # 25% load
            retained_risk = total_claims - large_claims
            
            results.append({
                'attachment_point': ap,
                'estimated_premium': premium_estimate,
                'retained_risk': retained_risk,
                'total_cost': premium_estimate + retained_risk
            })
        
        # Find optimal (lowest total cost)
        optimal = min(results, key=lambda x: x['total_cost'])
        
        self.evidence.append({
            'type': 'optimization',
            'scenarios': results,
            'optimal': optimal
        })
        
        return ModelResult(
            name=self.name,
            success=True,
            metrics={
                'optimal_attachment': optimal['attachment_point'],
                'estimated_premium': round(optimal['estimated_premium'], 2),
                'retained_risk': round(optimal['retained_risk'], 2)
            },
            assumptions={},
            warnings=self.warnings,
            confidence=0.80,
            evidence=self.evidence
        )
    
    def summarize(self, result: ModelResult) -> Dict[str, Any]:
        return {
            'model': self.name,
            'recommended_attachment': result.metrics['optimal_attachment'],
            'estimated_annual_premium': result.metrics['estimated_premium'],
            'retained_risk': result.metrics['retained_risk']
        }


class LossRatioModel(ActuarialModel):
    """
    Loss ratio calculation and projection
    """
    
    def __init__(self):
        super().__init__(name="LossRatio", version="2.0")
    
    def validate(self, data: ClaimsData) -> bool:
        return data.total_claims > 0
    
    def prepare(self, data: ClaimsData) -> Dict[str, Any]:
        return {'data': data}
    
    def calculate(self, prepared_data: Dict[str, Any]) -> ModelResult:
        data = prepared_data['data']
        
        # Estimate premium (claims / 0.85 typical target loss ratio)
        estimated_premium = data.total_claims / 0.85
        loss_ratio = data.total_claims / estimated_premium
        
        return ModelResult(
            name=self.name,
            success=True,
            metrics={
                'actual_claims': data.total_claims,
                'estimated_premium': round(estimated_premium, 2),
                'loss_ratio': round(loss_ratio, 4),
                'target_loss_ratio': 0.85
            },
            assumptions={
                'target_loss_ratio': Assumption(
                    name='target_loss_ratio',
                    value=0.85,
                    source='industry_standard',
                    effective_date=datetime.now().isoformat(),
                    notes='Industry standard for self-funded plans'
                ).__dict__
            },
            warnings=self.warnings,
            confidence=0.90,
            evidence=self.evidence
        )
    
    def summarize(self, result: ModelResult) -> Dict[str, Any]:
        return {
            'model': self.name,
            'loss_ratio': result.metrics['loss_ratio'],
            'status': 'favorable' if result.metrics['loss_ratio'] < 0.85 else 'unfavorable'
        }


class PremiumForecastModel(ActuarialModel):
    """
    Premium renewal forecast
    """
    
    def __init__(self):
        super().__init__(name="PremiumForecast", version="2.0")
        self.trend_engine = TrendEngine()
    
    def validate(self, data: ClaimsData) -> bool:
        return data.member_months >= 12
    
    def prepare(self, data: ClaimsData) -> Dict[str, Any]:
        assumptions = AssumptionLibrary.build_assumption_set(data.member_months)
        return {
            'data': data,
            'assumptions': assumptions
        }
    
    def calculate(self, prepared_data: Dict[str, Any]) -> ModelResult:
        data = prepared_data['data']
        assumptions = prepared_data['assumptions']
        
        current_pmpm = data.pmpm()
        trend = assumptions['medical_trend'].value
        
        # Project forward
        projected_pmpm = current_pmpm * (1 + trend)
        
        return ModelResult(
            name=self.name,
            success=True,
            metrics={
                'current_pmpm': round(current_pmpm, 2),
                'projected_pmpm': round(projected_pmpm, 2),
                'annual_increase': round((projected_pmpm - current_pmpm), 2)
            },
            assumptions={
                'medical_trend': assumptions['medical_trend'].__dict__
            },
            warnings=self.warnings,
            confidence=0.85,
            evidence=self.evidence
        )
    
    def summarize(self, result: ModelResult) -> Dict[str, Any]:
        return {
            'model': self.name,
            'renewal_pmpm': result.metrics['projected_pmpm'],
            'increase_amount': result.metrics['annual_increase']
        }