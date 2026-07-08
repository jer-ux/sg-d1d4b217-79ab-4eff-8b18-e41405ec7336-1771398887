"""
KINCAID IQ™ DATA INTELLIGENCE CORE v0.1
Analytics Schemas
"""

from pydantic import BaseModel
from typing import Dict, Optional


class SummaryStats(BaseModel):
    """Summary statistics response"""
    mean: Dict[str, float]
    median: Dict[str, float]
    variance: Dict[str, float]


class TrendAnalysis(BaseModel):
    """Trend analysis response"""
    column: str
    trend: float
    direction: Optional[str] = None


class DashboardCard(BaseModel):
    """Dashboard card"""
    title: str
    value: any
    format: Optional[str] = None


class DashboardResponse(BaseModel):
    """Dashboard response"""
    cards: list[DashboardCard]