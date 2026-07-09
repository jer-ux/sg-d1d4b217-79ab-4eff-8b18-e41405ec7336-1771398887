"""
Economic Engine - Unit Tests
"""

import pytest
from .service import EconomicEngine
from .models import (
    CostComponent,
    CostAnalysisRequest,
    ROIRequest,
    ValueFlow,
    ValueFlowRequest,
)


@pytest.fixture
def engine():
    return EconomicEngine()


def test_cost_analysis_direct_allocation(engine):
    """Test direct cost allocation methodology."""
    request = CostAnalysisRequest(
        costs=[
            CostComponent(name="Labor", amount=100000, category="direct", confidence=0.95),
            CostComponent(name="Materials", amount=50000, category="direct", confidence=0.90),
            CostComponent(name="Overhead", amount=25000, category="indirect", confidence=0.80),
        ],
        allocation_method="direct",
        period="2026-Q1",
    )
    
    response = engine.analyze_costs(request)
    
    assert response.total_cost == 175000
    assert len(response.allocations) == 3
    assert response.allocations[0].component == "Labor"
    assert response.allocations[0].allocated_amount == 100000
    assert abs(response.allocations[0].allocation_percentage - 57.14) < 0.1
    assert response.confidence_score > 0.8
    assert response.evidence_id.startswith("econ_")


def test_cost_analysis_with_benchmarks(engine):
    """Test cost analysis with benchmark variance calculation."""
    request = CostAnalysisRequest(
        costs=[
            CostComponent(name="PBM Admin Fees", amount=120000, category="direct"),
            CostComponent(name="Claims Processing", amount=80000, category="direct"),
        ],
        allocation_method="direct",
        period="2026-Q1",
        benchmark_data={
            "PBM Admin Fees": 100000,  # 20% above benchmark
            "Claims Processing": 90000,  # 11.1% below benchmark
        }
    )
    
    response = engine.analyze_costs(request)
    
    assert response.allocations[0].variance_from_benchmark == pytest.approx(20.0, rel=0.01)
    assert response.allocations[1].variance_from_benchmark == pytest.approx(-11.11, rel=0.01)
    assert any("above benchmark" in insight for insight in response.insights)


def test_roi_calculation(engine):
    """Test ROI calculation with NPV, IRR, and payback period."""
    request = ROIRequest(
        investment=100000,
        returns=[30000, 40000, 50000, 60000],  # $180K total returns over 4 periods
        periods=4,
        discount_rate=0.10,
    )
    
    response = engine.calculate_roi(request)
    
    # NPV should be positive (profitable investment)
    assert response.net_present_value > 0
    
    # IRR should be higher than discount rate (10%)
    assert response.internal_rate_of_return > 0.10
    
    # Payback should occur before period 4
    assert response.payback_period < 4
    
    # ROI should be 80% ((180K - 100K) / 100K)
    assert response.return_on_investment == pytest.approx(80.0, rel=0.01)
    
    assert response.evidence_id.startswith("roi_")


def test_roi_with_risk_adjustment(engine):
    """Test risk-adjusted ROI calculation."""
    request = ROIRequest(
        investment=50000,
        returns=[20000, 25000, 30000],
        periods=3,
        discount_rate=0.08,
        risk_adjustment=0.15,  # 15% risk factor
    )
    
    response = engine.calculate_roi(request)
    
    # Risk-adjusted return should be 85% of base ROI
    base_roi = response.return_on_investment
    risk_adjusted = response.risk_adjusted_return
    
    assert risk_adjusted == pytest.approx(base_roi * 0.85, rel=0.01)


def test_value_flow_analysis(engine):
    """Test value flow analysis for identifying bottlenecks and leakage."""
    request = ValueFlowRequest(
        flows=[
            ValueFlow(from_entity="Employer", to_entity="PBM", amount=1000000, flow_type="revenue", period="2026-Q1"),
            ValueFlow(from_entity="PBM", to_entity="Pharmacy", amount=700000, flow_type="cost", period="2026-Q1"),
            ValueFlow(from_entity="PBM", to_entity="PBM_Profit", amount=300000, flow_type="revenue", period="2026-Q1"),
            ValueFlow(from_entity="Pharmacy", to_entity="Wholesaler", amount=500000, flow_type="cost", period="2026-Q1"),
            ValueFlow(from_entity="Pharmacy", to_entity="Pharmacy_Profit", amount=200000, flow_type="revenue", period="2026-Q1"),
        ],
        entities=["Employer", "PBM", "Pharmacy", "Wholesaler", "PBM_Profit", "Pharmacy_Profit"],
        analysis_type="network",
    )
    
    response = engine.analyze_value_flows(request)
    
    # Check node calculations
    pbm_node = next(n for n in response.nodes if n.entity == "PBM")
    assert pbm_node.inflows == 1000000
    assert pbm_node.outflows == 1000000  # 700K + 300K
    assert pbm_node.net_value == 0
    
    # Value creation and destruction
    assert response.total_value_created > 0
    assert response.net_value_creation >= 0
    
    assert response.evidence_id.startswith("flow_")


def test_irr_calculation_convergence(engine):
    """Test IRR calculation with various cash flow patterns."""
    # Standard investment with positive returns
    cash_flows_1 = [-1000, 300, 400, 500, 600]
    irr_1 = engine._calculate_irr(cash_flows_1)
    assert 0 < irr_1 < 1  # Should be a reasonable positive rate
    
    # Break-even investment
    cash_flows_2 = [-1000, 250, 250, 250, 250]
    irr_2 = engine._calculate_irr(cash_flows_2)
    assert 0 < irr_2 < 0.15  # Should be low but positive
    
    # Loss-making investment
    cash_flows_3 = [-1000, 100, 100, 100]
    irr_3 = engine._calculate_irr(cash_flows_3)
    assert irr_3 < 0  # Should be negative