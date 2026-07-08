"""
KINCAID HEALTH™ BROKER/CONSULTANT API
Client portfolio management
"""

from fastapi import APIRouter, Depends, HTTPException
from typing import List
from datetime import datetime

from app.middleware.rbac import require_role
from app.middleware.tenant_isolation import require_tenant
from app.services.database import get_db

router = APIRouter(prefix="/broker", tags=["Broker Portal"])


@router.get("/clients")
@require_role("broker", "consultant")
@require_tenant
async def get_clients(db = Depends(get_db)):
    """
    Get clients for logged-in broker (automatically filtered by tenant_id)
    """
    # Data is automatically scoped to broker's tenant via middleware
    clients = [
        {
            "client_id": "client-001",
            "client_name": "Tech Startup Inc",
            "employees": 250,
            "pmpm": 485.50,
            "trend": 0.073,
            "savings_opportunity": 125000,
            "last_analysis": "2026-07-01",
            "health_score": "good"
        },
        {
            "client_id": "client-002",
            "client_name": "Manufacturing Co",
            "employees": 850,
            "pmpm": 520.25,
            "trend": 0.092,
            "savings_opportunity": 380000,
            "last_analysis": "2026-06-28",
            "health_score": "fair"
        },
        {
            "client_id": "client-003",
            "client_name": "Retail Services LLC",
            "employees": 450,
            "pmpm": 445.75,
            "trend": 0.058,
            "savings_opportunity": 95000,
            "last_analysis": "2026-07-05",
            "health_score": "excellent"
        }
    ]
    
    return clients


@router.get("/analytics/summary")
@require_role("broker", "consultant")
@require_tenant
async def get_analytics_summary(db = Depends(get_db)):
    """
    Get portfolio analytics summary (tenant-scoped)
    """
    return {
        "total_lives": 1550,
        "total_claims": 12450,
        "avg_pmpm": 483.83,
        "avg_trend": 0.074,
        "high_cost_claimants": 23,
        "pharmacy_spend": 8500000,
        "medical_spend": 14200000,
        "savings_identified": 600000
    }


@router.get("/clients/{client_id}/details")
@require_role("broker", "consultant", "actuary")
@require_tenant
async def get_client_details(client_id: str, db = Depends(get_db)):
    """
    Get detailed analytics for specific client
    """
    # Tenant isolation ensures broker can only see their own clients
    return {
        "client_id": client_id,
        "client_name": "Tech Startup Inc",
        "employees": 250,
        "demographics": {
            "avg_age": 34.5,
            "male_pct": 0.52,
            "dependents": 1.3
        },
        "utilization": {
            "er_visits_per_1000": 125,
            "inpatient_admits_per_1000": 45,
            "pharmacy_fills_pmpm": 2.8
        },
        "financials": {
            "pmpm": 485.50,
            "trend": 0.073,
            "large_claim_count": 3,
            "stop_loss_reimbursement": 125000
        }
    }