"""
Economic Engine - Core Service Implementation
"""

import numpy as np
from typing import List, Dict
from datetime import datetime
import uuid

from .models import (
    CostAnalysisRequest,
    CostAnalysisResponse,
    CostAllocation,
    ROIRequest,
    ROIResponse,
    ValueFlowRequest,
    ValueFlowResponse,
    ValueFlowNode,
)


class EconomicEngine:
    """
    Universal Economic Engine - Cost analysis, ROI calculation, value flow modeling.
    
    This engine provides domain-agnostic economic computation capabilities
    that can be composed by any vertical application (Healthcare, Finance, HR, etc.).
    """

    def __init__(self):
        self.engine_id = "economic-engine-v1"
        self.version = "1.0.0"

    def analyze_costs(self, request: CostAnalysisRequest) -> CostAnalysisResponse:
        """
        Perform cost analysis with allocation based on specified methodology.
        
        Args:
            request: Cost analysis request with components and methodology
            
        Returns:
            CostAnalysisResponse with allocations and insights
        """
        # Calculate total cost
        total_cost = sum(c.amount for c in request.costs)
        
        # Perform allocation based on methodology
        allocations = []
        
        if request.allocation_method == "direct":
            # Direct allocation - costs assigned as-is
            for cost in request.costs:
                allocation = CostAllocation(
                    component=cost.name,
                    allocated_amount=cost.amount,
                    allocation_percentage=(cost.amount / total_cost) * 100 if total_cost > 0 else 0,
                    driver_value=None,
                )
                
                # Calculate variance from benchmark if provided
                if request.benchmark_data and cost.name in request.benchmark_data:
                    benchmark = request.benchmark_data[cost.name]
                    allocation.variance_from_benchmark = ((cost.amount - benchmark) / benchmark) * 100
                
                allocations.append(allocation)
        
        elif request.allocation_method == "activity_based":
            # Activity-based costing - allocate based on drivers
            driver_totals = {}
            for cost in request.costs:
                if cost.driver:
                    driver_totals[cost.driver] = driver_totals.get(cost.driver, 0) + cost.amount
            
            for cost in request.costs:
                allocation = CostAllocation(
                    component=cost.name,
                    allocated_amount=cost.amount,
                    allocation_percentage=(cost.amount / total_cost) * 100 if total_cost > 0 else 0,
                    driver_value=driver_totals.get(cost.driver) if cost.driver else None,
                )
                
                if request.benchmark_data and cost.name in request.benchmark_data:
                    benchmark = request.benchmark_data[cost.name]
                    allocation.variance_from_benchmark = ((cost.amount - benchmark) / benchmark) * 100
                
                allocations.append(allocation)
        
        elif request.allocation_method == "proportional":
            # Proportional allocation based on relative weights
            weights = [c.confidence or 1.0 for c in request.costs]
            total_weight = sum(weights)
            
            for i, cost in enumerate(request.costs):
                weight_factor = weights[i] / total_weight if total_weight > 0 else 0
                allocated = total_cost * weight_factor
                
                allocation = CostAllocation(
                    component=cost.name,
                    allocated_amount=allocated,
                    allocation_percentage=(allocated / total_cost) * 100 if total_cost > 0 else 0,
                    driver_value=weight_factor,
                )
                
                if request.benchmark_data and cost.name in request.benchmark_data:
                    benchmark = request.benchmark_data[cost.name]
                    allocation.variance_from_benchmark = ((allocated - benchmark) / benchmark) * 100
                
                allocations.append(allocation)
        
        # Calculate overall confidence
        confidences = [c.confidence for c in request.costs if c.confidence is not None]
        confidence_score = np.mean(confidences) if confidences else 0.85
        
        # Generate insights
        insights = []
        
        # Find largest cost component
        if allocations:
            largest = max(allocations, key=lambda a: a.allocated_amount)
            insights.append(f"Largest cost component: {largest.component} ({largest.allocation_percentage:.1f}% of total)")
        
        # Identify significant benchmark variances
        large_variances = [a for a in allocations if a.variance_from_benchmark and abs(a.variance_from_benchmark) > 10]
        if large_variances:
            for var in large_variances:
                direction = "above" if var.variance_from_benchmark > 0 else "below"
                insights.append(f"{var.component} is {abs(var.variance_from_benchmark):.1f}% {direction} benchmark")
        
        # Generate evidence ID
        evidence_id = f"econ_{uuid.uuid4().hex[:12]}"
        
        return CostAnalysisResponse(
            total_cost=total_cost,
            allocations=allocations,
            methodology=f"{request.allocation_method.replace('_', ' ').title()} Cost Allocation",
            confidence_score=confidence_score,
            evidence_id=evidence_id,
            insights=insights,
        )

    def calculate_roi(self, request: ROIRequest) -> ROIResponse:
        """
        Calculate ROI metrics including NPV, IRR, and payback period.
        
        Args:
            request: ROI calculation request with investment and returns
            
        Returns:
            ROIResponse with NPV, IRR, payback, and risk-adjusted returns
        """
        # Calculate NPV
        cash_flows = [-request.investment] + request.returns
        discount_factors = [(1 / (1 + request.discount_rate) ** i) for i in range(len(cash_flows))]
        discounted_flows = [cf * df for cf, df in zip(cash_flows, discount_factors)]
        npv = sum(discounted_flows)
        
        # Calculate IRR using Newton's method approximation
        irr = self._calculate_irr(cash_flows)
        
        # Calculate payback period
        cumulative = 0
        payback = request.periods
        for i, ret in enumerate(request.returns):
            cumulative += ret
            if cumulative >= request.investment:
                # Linear interpolation for fractional period
                if i == 0:
                    payback = request.investment / ret if ret > 0 else request.periods
                else:
                    prev_cumulative = cumulative - ret
                    payback = i + (request.investment - prev_cumulative) / ret if ret > 0 else request.periods
                break
        
        # Calculate basic ROI
        total_returns = sum(request.returns)
        roi = ((total_returns - request.investment) / request.investment) * 100 if request.investment > 0 else 0
        
        # Risk-adjusted return
        risk_adjusted = None
        if request.risk_adjustment is not None:
            risk_adjusted = roi * (1 - request.risk_adjustment)
        
        evidence_id = f"roi_{uuid.uuid4().hex[:12]}"
        
        return ROIResponse(
            net_present_value=npv,
            internal_rate_of_return=irr,
            payback_period=payback,
            return_on_investment=roi,
            risk_adjusted_return=risk_adjusted,
            evidence_id=evidence_id,
        )

    def analyze_value_flows(self, request: ValueFlowRequest) -> ValueFlowResponse:
        """
        Analyze value flows between entities to identify creation, leakage, and bottlenecks.
        
        Args:
            request: Value flow analysis request
            
        Returns:
            ValueFlowResponse with nodes, creation/destruction metrics, and bottlenecks
        """
        # Build entity flow totals
        entity_inflows = {entity: 0.0 for entity in request.entities}
        entity_outflows = {entity: 0.0 for entity in request.entities}
        
        for flow in request.flows:
            if flow.from_entity in entity_outflows:
                entity_outflows[flow.from_entity] += flow.amount
            if flow.to_entity in entity_inflows:
                entity_inflows[flow.to_entity] += flow.amount
        
        # Create nodes
        nodes = []
        for entity in request.entities:
            inflows = entity_inflows[entity]
            outflows = entity_outflows[entity]
            net = inflows - outflows
            efficiency = (outflows / inflows) if inflows > 0 else 0.0
            
            nodes.append(ValueFlowNode(
                entity=entity,
                inflows=inflows,
                outflows=outflows,
                net_value=net,
                flow_efficiency=efficiency,
            ))
        
        # Calculate total value metrics
        total_created = sum(node.inflows for node in nodes if node.inflows > node.outflows)
        total_destroyed = sum(node.outflows - node.inflows for node in nodes if node.outflows > node.inflows)
        net_creation = total_created - total_destroyed
        
        # Identify bottlenecks (low efficiency nodes)
        bottlenecks = [node.entity for node in nodes if node.flow_efficiency < 0.5 and node.inflows > 0]
        
        # Identify leakage points (negative net value)
        leakage = [node.entity for node in nodes if node.net_value < -1000]  # Threshold for significance
        
        evidence_id = f"flow_{uuid.uuid4().hex[:12]}"
        
        return ValueFlowResponse(
            nodes=nodes,
            total_value_created=total_created,
            total_value_destroyed=total_destroyed,
            net_value_creation=net_creation,
            bottlenecks=bottlenecks,
            leakage_points=leakage,
            evidence_id=evidence_id,
        )

    def _calculate_irr(self, cash_flows: List[float], max_iterations: int = 100, tolerance: float = 1e-6) -> float:
        """
        Calculate Internal Rate of Return using Newton's method.
        
        Args:
            cash_flows: List of cash flows including initial investment (negative)
            max_iterations: Maximum iterations for convergence
            tolerance: Convergence tolerance
            
        Returns:
            IRR as a decimal (e.g., 0.15 for 15%)
        """
        # Initial guess
        irr = 0.1
        
        for _ in range(max_iterations):
            # Calculate NPV and derivative at current IRR
            npv = sum(cf / (1 + irr) ** i for i, cf in enumerate(cash_flows))
            d_npv = sum(-i * cf / (1 + irr) ** (i + 1) for i, cf in enumerate(cash_flows))
            
            # Check convergence
            if abs(npv) < tolerance:
                return irr
            
            # Newton's method update
            if d_npv == 0:
                return 0.0  # Avoid division by zero
            
            irr = irr - npv / d_npv
            
            # Ensure IRR stays in reasonable range
            irr = max(-0.99, min(irr, 10.0))
        
        return irr  # Return best estimate even if not fully converged