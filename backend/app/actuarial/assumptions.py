"""
KINCAID HEALTH™ ACTUARIAL ENGINE
Assumptions Management
"""

from typing import Dict, Any, Optional
from datetime import datetime


class AssumptionsLibrary:
    """
    Library of standard actuarial assumptions
    """
    
    # Standard medical trend rates by category
    MEDICAL_TRENDS = {
        'professional': 0.065,
        'hospital_inpatient': 0.080,
        'hospital_outpatient': 0.075,
        'pharmacy': 0.095,
        'overall': 0.078
    }
    
    # Credibility thresholds (member months)
    CREDIBILITY_THRESHOLDS = {
        'full': 1082,
        'partial': 500,
        'minimal': 100
    }
    
    # Age-gender factors
    AGE_FACTORS = {
        '0-17': 0.25,
        '18-24': 0.45,
        '25-34': 0.60,
        '35-44': 0.85,
        '45-54': 1.20,
        '55-64': 1.75,
        '65+': 2.50
    }
    
    # Geographic adjustment factors
    GEOGRAPHIC_FACTORS = {
        'urban_high': 1.20,
        'urban_medium': 1.10,
        'suburban': 1.00,
        'rural': 0.90
    }
    
    @classmethod
    def get_default_assumptions(cls) -> Dict[str, Any]:
        """Get default actuarial assumptions"""
        return {
            'trend_rate': cls.MEDICAL_TRENDS['overall'],
            'credibility_threshold': cls.CREDIBILITY_THRESHOLDS['full'],
            'confidence_level': 0.95,
            'simulations': 10000,
            'forecast_periods': 12,
            'age_factors': cls.AGE_FACTORS,
            'geographic_factors': cls.GEOGRAPHIC_FACTORS
        }
    
    @classmethod
    def get_trend_rate(cls, category: str = 'overall') -> float:
        """Get trend rate for specific category"""
        return cls.MEDICAL_TRENDS.get(category, cls.MEDICAL_TRENDS['overall'])
    
    @classmethod
    def get_credibility_threshold(cls, level: str = 'full') -> int:
        """Get credibility threshold"""
        return cls.CREDIBILITY_THRESHOLDS.get(level, cls.CREDIBILITY_THRESHOLDS['full'])


class AssumptionValidator:
    """Validate actuarial assumptions"""
    
    @staticmethod
    def validate_trend_rate(rate: float) -> bool:
        """Validate trend rate is reasonable"""
        return 0.0 <= rate <= 0.25  # 0% to 25% annual
    
    @staticmethod
    def validate_credibility(member_months: int) -> Dict[str, Any]:
        """Validate credibility level"""
        lib = AssumptionsLibrary()
        
        if member_months >= lib.CREDIBILITY_THRESHOLDS['full']:
            return {'level': 'full', 'weight': 1.0}
        elif member_months >= lib.CREDIBILITY_THRESHOLDS['partial']:
            return {'level': 'partial', 'weight': 0.75}
        elif member_months >= lib.CREDIBILITY_THRESHOLDS['minimal']:
            return {'level': 'minimal', 'weight': 0.50}
        else:
            return {'level': 'insufficient', 'weight': 0.25}