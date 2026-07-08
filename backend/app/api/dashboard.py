"""
KINCAID IQ™ DATA INTELLIGENCE CORE v0.1
Dashboard API Endpoints
"""

from fastapi import APIRouter
from fastapi import UploadFile
from fastapi import Depends

import pandas as pd
from sqlalchemy.orm import Session

from app.database import get_db
from app.services.ingestion import DataIngestion
from app.services.validation import DataValidator
from app.services.dashboard import DashboardBuilder


router = APIRouter(
    prefix="/dashboard",
    tags=["dashboard"]
)


@router.post("/generate")
async def generate_dashboard(
    file: UploadFile
):
    """
    Generate dashboard from uploaded file
    
    Workflow:
    1. Load file
    2. Profile dataset
    3. Validate quality
    4. Build dashboard cards
    """
    
    # Load file
    engine = DataIngestion()
    df = pd.read_csv(file.file)
    
    # Profile
    profile = engine.profile(df)
    
    # Validate
    validator = DataValidator()
    validation = validator.validate(df)
    
    # Combine analytics
    analytics = {**profile, **validation}
    
    # Build dashboard
    builder = DashboardBuilder()
    dashboard = builder.create_dashboard(analytics)
    
    return dashboard


@router.get("/cfo")
async def cfo_dashboard():
    """
    Get CFO dashboard with financial metrics
    """
    
    # Mock financial data
    financial_data = {
        "total_spend": 8400000,
        "pmpm": 650,
        "trend": 0.085
    }
    
    builder = DashboardBuilder()
    dashboard = builder.create_cfo_dashboard(financial_data)
    
    return dashboard