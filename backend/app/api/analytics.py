"""
KINCAID IQ™ DATA INTELLIGENCE CORE v0.1
Analytics API Endpoints
"""

from fastapi import APIRouter
from fastapi import UploadFile
from fastapi import Depends

import pandas as pd
from sqlalchemy.orm import Session

from app.database import get_db
from app.services.analytics import AnalyticsEngine
from app.models.metric import Metric


router = APIRouter(
    prefix="/analytics",
    tags=["analytics"]
)


@router.post("/summary")
async def summary(
    file: UploadFile,
    db: Session = Depends(get_db)
):
    """
    Generate summary statistics
    
    Returns mean, median, variance for numeric columns
    """
    
    df = pd.read_csv(file.file)
    
    engine = AnalyticsEngine()
    result = engine.summary(df)
    
    return result


@router.post("/trend")
async def trend(
    file: UploadFile,
    column: str
):
    """
    Calculate trend for a specific column
    """
    
    df = pd.read_csv(file.file)
    
    engine = AnalyticsEngine()
    result = engine.trend(df, column)
    
    return result


@router.post("/correlation")
async def correlation(
    file: UploadFile
):
    """
    Calculate correlation matrix
    """
    
    df = pd.read_csv(file.file)
    
    engine = AnalyticsEngine()
    result = engine.correlation(df)
    
    return result