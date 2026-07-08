"""
KINCAID IQ™ DATA INTELLIGENCE CORE v0.1
Data Ingestion Service
"""

import pandas as pd
from typing import BinaryIO


class DataIngestion:
    """Data ingestion and profiling service"""
    
    def load_csv(
        self,
        file: BinaryIO
    ) -> pd.DataFrame:
        """Load CSV file into DataFrame"""
        df = pd.read_csv(file)
        return df
    
    def load_excel(
        self,
        file: BinaryIO
    ) -> pd.DataFrame:
        """Load Excel file into DataFrame"""
        df = pd.read_excel(file)
        return df
    
    def profile(
        self,
        df: pd.DataFrame
    ) -> dict:
        """Profile dataset and return metadata"""
        return {
            "rows": len(df),
            "columns": list(df.columns),
            "missing": df.isnull().sum().to_dict(),
            "dtypes": df.dtypes.astype(str).to_dict()
        }