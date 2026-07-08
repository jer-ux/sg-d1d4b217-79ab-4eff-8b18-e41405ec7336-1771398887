"""
KINCAID HEALTH™ ACTUARIAL ENGINE
Data Interfaces & Contracts
"""

from typing import Dict, List, Optional, Any
from dataclasses import dataclass
from datetime import datetime


@dataclass
class Assumption:
    """
    Single actuarial assumption with provenance tracking
    """
    name: str
    value: float
    source: str  # 'data', 'industry', 'manual', 'model'
    effective_date: str
    confidence: Optional[float] = None
    notes: Optional[str] = None


@dataclass
class ModelResult:
    """
    Standard result structure for all actuarial models
    """
    name: str
    success: bool
    metrics: Dict[str, Any]
    assumptions: Dict[str, Any]
    warnings: List[str]
    confidence: float
    evidence: List[Dict[str, Any]]
    execution_time_ms: Optional[float] = None
    data_quality_score: Optional[float] = None


@dataclass
class ClaimsData:
    """
    Standardized claims data input
    """
    member_months: int
    total_claims: float
    claim_count: int
    large_claims: Optional[float] = None
    pharmacy_claims: Optional[float] = None
    inpatient_claims: Optional[float] = None
    outpatient_claims: Optional[float] = None
    member_count: Optional[int] = None
    industry: Optional[str] = None
    region: Optional[str] = None
    effective_date: Optional[str] = None
    
    def pmpm(self) -> float:
        """Calculate Per Member Per Month"""
        if self.member_months == 0:
            return 0.0
        return self.total_claims / self.member_months
    
    def pppy(self) -> float:
        """Calculate Per Person Per Year"""
        return self.pmpm() * 12
    
    def frequency(self) -> float:
        """Calculate claim frequency"""
        if self.member_months == 0:
            return 0.0
        return self.claim_count / self.member_months
    
    def severity(self) -> float:
        """Calculate average claim severity"""
        if self.claim_count == 0:
            return 0.0
        return self.total_claims / self.claim_count


@dataclass
class ActuarialAssumptions:
    """
    Collection of actuarial assumptions for a model run
    """
    medical_trend: float
    pharmacy_trend: float
    enrollment_change: float
    inflation_rate: float
    credibility_weight: float
    benchmark_source: str
    effective_date: str
    plan_type: Optional[str] = None
    industry_segment: Optional[str] = None
    
    def dict(self) -> Dict[str, Any]:
        """Convert to dictionary"""
        return {
            'medical_trend': self.medical_trend,
            'pharmacy_trend': self.pharmacy_trend,
            'enrollment_change': self.enrollment_change,
            'inflation_rate': self.inflation_rate,
            'credibility_weight': self.credibility_weight,
            'benchmark_source': self.benchmark_source,
            'effective_date': self.effective_date,
            'plan_type': self.plan_type,
            'industry_segment': self.industry_segment
        }


@dataclass
class ActuarialResults:
    """
    Standardized output for actuarial analyses
    """
    model_name: str
    execution_timestamp: str
    
    # Core metrics
    current_pmpm: float
    projected_pmpm: float
    trend_rate: float
    credibility_score: float
    
    # Financial projections
    forecast_periods: List[Dict[str, Any]]
    cumulative_total: float
    
    # Risk metrics
    risk_percentiles: Dict[str, float]
    volatility: float
    worst_case: float
    best_case: float
    
    # Benchmarking
    benchmark_comparison: Dict[str, Any]
    
    # Metadata
    assumptions: Dict[str, Any]
    data_quality_score: float
    warnings: List[str]
    evidence_chain: List[Dict[str, Any]]
    
    def cfo_summary(self) -> Dict[str, Any]:
        """Generate CFO executive summary"""
        return {
            'current_spend_pmpm': round(self.current_pmpm, 2),
            'projected_spend_pmpm': round(self.projected_pmpm, 2),
            'annual_increase_pct': round(self.trend_rate * 100, 2),
            'confidence_level': self._confidence_label(),
            'risk_range': {
                'best_case': round(self.best_case, 2),
                'most_likely': round(self.projected_pmpm, 2),
                'worst_case': round(self.worst_case, 2)
            },
            'benchmark_vs_industry': self.benchmark_comparison,
            'data_quality': self._quality_label(),
            'key_warnings': self.warnings[:3],
            'total_projected_annual': round(self.cumulative_total, 2)
        }
    
    def actuary_detail(self) -> Dict[str, Any]:
        """Generate actuary technical detail"""
        return {
            'model': self.model_name,
            'timestamp': self.execution_timestamp,
            'metrics': {
                'current_pmpm': self.current_pmpm,
                'projected_pmpm': self.projected_pmpm,
                'trend_rate': self.trend_rate,
                'credibility': self.credibility_score
            },
            'forecast': self.forecast_periods,
            'risk_analysis': {
                'percentiles': self.risk_percentiles,
                'volatility': self.volatility,
                'scenarios': {
                    'worst': self.worst_case,
                    'best': self.best_case
                }
            },
            'benchmarks': self.benchmark_comparison,
            'assumptions': self.assumptions,
            'quality': {
                'score': self.data_quality_score,
                'warnings': self.warnings
            },
            'evidence': self.evidence_chain
        }
    
    def _confidence_label(self) -> str:
        """Convert credibility score to label"""
        if self.credibility_score >= 0.90:
            return 'Very High'
        elif self.credibility_score >= 0.75:
            return 'High'
        elif self.credibility_score >= 0.50:
            return 'Medium'
        elif self.credibility_score >= 0.25:
            return 'Low'
        else:
            return 'Very Low'
    
    def _quality_label(self) -> str:
        """Convert quality score to label"""
        if self.data_quality_score >= 90:
            return 'Excellent'
        elif self.data_quality_score >= 75:
            return 'Good'
        elif self.data_quality_score >= 60:
            return 'Fair'
        else:
            return 'Poor'


@dataclass
class BenchmarkData:
    """
    Industry benchmark data point
    """
    source: str
    metric_name: str
    benchmark_value: float
    variance_pct: float
    percentile_rank: float
    interpretation: str
    effective_date: Optional[str] = None