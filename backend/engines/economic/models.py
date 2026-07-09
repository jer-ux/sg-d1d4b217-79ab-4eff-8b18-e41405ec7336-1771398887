"""
Economic Engine - Data Models
"""

from typing import List, Dict, Optional, Literal
from datetime import datetime
from pydantic import BaseModel, Field, validator


class CostComponent(BaseModel):
    """A single cost component in an economic analysis."""
    name: str = Field(..., description="Cost component name")
    amount: float = Field(..., description="Cost amount in USD")
    category: str = Field(..., description="Cost category (direct, indirect, overhead)")
    driver: Optional[str] = Field(None, description="Cost driver or allocation basis")
    confidence: Optional[float] = Field(None, ge=0, le=1, description="Confidence in estimate")


class CostAnalysisRequest(BaseModel):
    """Request for economic cost analysis."""
    costs: List[CostComponent] = Field(..., description="List of cost components to analyze")
    allocation_method: Literal["direct", "activity_based", "proportional"] = Field(
        default="activity_based",
        description="Cost allocation methodology"
    )
    period: str = Field(..., description="Analysis period (e.g., '2026-Q1', '2026-annual')")
    benchmark_data: Optional[Dict[str, float]] = Field(None, description="External benchmark data")


class CostAllocation(BaseModel):
    """Result of cost allocation analysis."""
    component: str
    allocated_amount: float
    allocation_percentage: float
    driver_value: Optional[float] = None
    variance_from_benchmark: Optional[float] = None


class CostAnalysisResponse(BaseModel):
    """Response from economic cost analysis."""
    total_cost: float = Field(..., description="Total cost across all components")
    allocations: List[CostAllocation] = Field(..., description="Cost allocations by component")
    methodology: str = Field(..., description="Methodology used for analysis")
    confidence_score: float = Field(..., ge=0, le=1, description="Overall confidence in results")
    evidence_id: str = Field(..., description="Evidence record ID for audit trail")
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    insights: List[str] = Field(default=[], description="Key insights from analysis")


class ROIRequest(BaseModel):
    """Request for ROI calculation."""
    investment: float = Field(..., description="Initial investment amount in USD")
    returns: List[float] = Field(..., description="Expected returns by period")
    periods: int = Field(..., gt=0, description="Number of periods (months, quarters, years)")
    discount_rate: float = Field(default=0.1, ge=0, description="Discount rate for NPV calculation")
    risk_adjustment: Optional[float] = Field(None, ge=0, le=1, description="Risk adjustment factor")


class ROIResponse(BaseModel):
    """Response from ROI calculation."""
    net_present_value: float = Field(..., description="Net Present Value (NPV)")
    internal_rate_of_return: float = Field(..., description="Internal Rate of Return (IRR)")
    payback_period: float = Field(..., description="Payback period in periods")
    return_on_investment: float = Field(..., description="ROI percentage")
    risk_adjusted_return: Optional[float] = Field(None, description="Risk-adjusted return")
    evidence_id: str = Field(..., description="Evidence record ID")
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    methodology: str = Field(default="Discounted Cash Flow (DCF)")


class ValueFlow(BaseModel):
    """A value flow between entities."""
    from_entity: str
    to_entity: str
    amount: float
    flow_type: str = Field(..., description="Type of value flow (revenue, cost, transfer)")
    period: str


class ValueFlowRequest(BaseModel):
    """Request for value flow analysis."""
    flows: List[ValueFlow] = Field(..., description="Value flows to analyze")
    entities: List[str] = Field(..., description="Entities involved in value flows")
    analysis_type: Literal["network", "waterfall", "sankey"] = Field(
        default="network",
        description="Type of value flow analysis"
    )


class ValueFlowNode(BaseModel):
    """A node in the value flow network."""
    entity: str
    inflows: float
    outflows: float
    net_value: float
    flow_efficiency: float = Field(..., description="Ratio of outflows to inflows")


class ValueFlowResponse(BaseModel):
    """Response from value flow analysis."""
    nodes: List[ValueFlowNode] = Field(..., description="Value flow network nodes")
    total_value_created: float = Field(..., description="Total value created in network")
    total_value_destroyed: float = Field(..., description="Total value leaked or destroyed")
    net_value_creation: float = Field(..., description="Net value creation")
    bottlenecks: List[str] = Field(default=[], description="Value flow bottlenecks")
    leakage_points: List[str] = Field(default=[], description="Value leakage points")
    evidence_id: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    methodology: str = Field(default="Network Flow Analysis")