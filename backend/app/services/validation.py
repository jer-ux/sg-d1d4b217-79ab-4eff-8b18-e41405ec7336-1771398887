"""
KINCAID IQ™ DATA INTELLIGENCE CORE v0.1
Data Validation Service
"""

import pandas as pd


class DataValidator:
    """Data quality validation service"""
    
    def validate(
        self,
        df: pd.DataFrame
    ) -> dict:
        """Validate data quality and return score"""
        
        score = 100
        
        # Check for missing values
        missing = df.isnull().sum().sum()
        if missing > 0:
            missing_pct = (missing / (len(df) * len(df.columns))) * 100
            score -= min(missing_pct, 20)
        
        # Check for duplicates
        duplicates = df.duplicated().sum()
        if duplicates:
            dup_pct = (duplicates / len(df)) * 100
            score -= min(dup_pct, 15)
        
        # Check for outliers (simple z-score method)
        numeric_cols = df.select_dtypes(include='number').columns
        outliers = 0
        for col in numeric_cols:
            z_scores = abs((df[col] - df[col].mean()) / df[col].std())
            outliers += (z_scores > 3).sum()
        
        if outliers > 0:
            outlier_pct = (outliers / (len(df) * len(numeric_cols))) * 100
            score -= min(outlier_pct, 10)
        
        return {
            "quality_score": int(max(score, 0)),
            "missing": int(missing),
            "duplicates": int(duplicates),
            "outliers": int(outliers)
        }