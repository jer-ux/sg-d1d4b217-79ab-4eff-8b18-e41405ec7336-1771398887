"""
Economic Engine - FastAPI Microservice
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from datetime import datetime

from .service import EconomicEngine
from .models import (
    CostAnalysisRequest,
    CostAnalysisResponse,
    ROIRequest,
    ROIResponse,
    ValueFlowRequest,
    ValueFlowResponse,
)

app = FastAPI(
    title="AIOS Economic Engine",
    description="Universal economic computation and modeling engine",
    version="1.0.0",
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure appropriately for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize engine
engine = EconomicEngine()


@app.get("/health")
async def health_check():
    """Health check endpoint."""
    return {
        "status": "healthy",
        "engine": "economic",
        "version": engine.version,
        "timestamp": datetime.utcnow().isoformat(),
    }


@app.get("/ready")
async def readiness_check():
    """Readiness check endpoint."""
    return {
        "status": "ready",
        "engine": "economic",
        "version": engine.version,
    }


@app.post("/analyze/costs", response_model=CostAnalysisResponse)
async def analyze_costs(request: CostAnalysisRequest):
    """
    Analyze costs with allocation based on specified methodology.
    
    Supports direct, activity-based, and proportional allocation methods.
    """
    try:
        return engine.analyze_costs(request)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Cost analysis failed: {str(e)}")


@app.post("/calculate/roi", response_model=ROIResponse)
async def calculate_roi(request: ROIRequest):
    """
    Calculate ROI metrics including NPV, IRR, payback period, and risk-adjusted returns.
    """
    try:
        return engine.calculate_roi(request)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"ROI calculation failed: {str(e)}")


@app.post("/analyze/value-flows", response_model=ValueFlowResponse)
async def analyze_value_flows(request: ValueFlowRequest):
    """
    Analyze value flows between entities to identify creation, leakage, and bottlenecks.
    """
    try:
        return engine.analyze_value_flows(request)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Value flow analysis failed: {str(e)}")


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8001)