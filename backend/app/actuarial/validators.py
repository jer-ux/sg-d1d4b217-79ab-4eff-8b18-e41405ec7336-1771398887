"""
KINCAID HEALTH™ ACTUARIAL ENGINE
Data Validation Engine
"""

from typing import Dict, Any, List
import pandas as pd

from app.actuarial.interfaces import ClaimsData


class DataValidator:
    """
    Validate claims data quality
    
    Checks:
    - Data completeness
    - Outlier detection
    - Consistency checks
    - Required fields
    """
    
    REQUIRED_FIELDS = ['paid_amount', 'member_id']
    OPTIONAL_FIELDS = ['service_date', 'diagnosis_codes', 'procedure_codes']
    
    def validate(self, data: ClaimsData) -> Dict[str, Any]:
        """
        Comprehensive data validation
        """
        errors = []
        warnings = []
        quality_score = 100.0
        
        df = pd.DataFrame(data.claims)
        
        # 1. Check for empty data
        if df.empty:
            errors.append("No claims data provided")
            return {
                'is_valid': False,
                'errors': errors,
                'warnings': warnings,
                'quality_score': 0.0
            }
        
        # 2. Check required fields
        for field in self.REQUIRED_FIELDS:
            if field not in df.columns:
                errors.append(f"Missing required field: {field}")
                quality_score -= 30
        
        # 3. Check for null values in critical fields
        if 'paid_amount' in df.columns:
            null_pct = (df['paid_amount'].isnull().sum() / len(df)) * 100
            if null_pct > 0:
                warnings.append(f"{null_pct:.1f}% of claims have null paid_amount")
                quality_score -= null_pct * 0.5
        
        # 4. Check for outliers
        if 'paid_amount' in df.columns:
            q99 = df['paid_amount'].quantile(0.99)
            outliers = df[df['paid_amount'] > q99 * 3]
            if len(outliers) > 0:
                warnings.append(f"Found {len(outliers)} extreme outliers")
        
        # 5. Check member months credibility
        if data.member_months < 1000:
            warnings.append("Low credibility: member months < 1000")
            quality_score -= 10
        
        # 6. Check data recency
        if 'service_date' in df.columns:
            try:
                df['service_date'] = pd.to_datetime(df['service_date'])
                max_date = df['service_date'].max()
                if pd.Timestamp.now() - max_date > pd.Timedelta(days=180):
                    warnings.append("Data may be stale (>6 months old)")
                    quality_score -= 5
            except:
                warnings.append("Could not parse service_date")
        
        quality_score = max(0.0, min(100.0, quality_score))
        
        return {
            'is_valid': len(errors) == 0,
            'errors': errors,
            'warnings': warnings,
            'quality_score': round(quality_score, 2),
            'record_count': len(df),
            'fields_present': list(df.columns)
        }