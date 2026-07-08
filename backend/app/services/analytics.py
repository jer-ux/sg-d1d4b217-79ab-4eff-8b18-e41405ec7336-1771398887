"""
KINCAID IQ™ DATA INTELLIGENCE CORE v0.1
Analytics Engine Service
"""

import pandas as pd
from typing import Dict


class AnalyticsEngine:
    """Core analytics and statistical service"""
    
    def summary(
        self,
        df: pd.DataFrame
    ) -> dict:
        """Generate summary statistics"""
        
        numeric = df.select_dtypes(include='number')
        
        return {
            "mean": numeric.mean().to_dict(),
            "median": numeric.median().to_dict(),
            "variance": numeric.var().to_dict(),
            "min": numeric.min().to_dict(),
            "max": numeric.max().to_dict()
        }
    
    def trend(
        self,
        df: pd.DataFrame,
        column: str
    ) -> dict:
        """Calculate trend for a column"""
        
        if column not in df.columns:
            raise ValueError(f"Column {column} not found")
        
        pct_change = df[column].pct_change().mean()
        
        direction = "increasing" if pct_change > 0 else "decreasing"
        
        return {
            "column": column,
            "trend": float(pct_change),
            "direction": direction
        }
    
    def correlation(
        self,
        df: pd.DataFrame
    ) -> dict:
        """Calculate correlation matrix"""
        
        numeric = df.select_dtypes(include='number')
        corr_matrix = numeric.corr()
        
        return corr_matrix.to_dict()