"""
Simulation Engine - FastAPI Microservice
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from datetime import datetime

from .service import SimulationEngine
from .models import (
    MonteCarloRequest,
    MonteCarloResponse,
    VaRRequest,
    VaRResponse,
    ScenarioRequest,
    ScenarioResponse,
)

app = FastAPI(
    title="AIOS Simulation Engine",
    description="Universal Monte Carlo simulation and risk modeling engine",
    version="1.0.0",
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize engine
engine = SimulationEngine()


@app.get("/health")
async def health_check():
    """Health check endpoint."""
    return {
        "status": "healthy",
        "engine": "simulation",
        "version": engine.version,
        "timestamp": datetime.utcnow().isoformat(),
    }


@app.get("/ready")
async def readiness_check():
    """Readiness check endpoint."""
    return {
        "status": "ready",
        "engine": "simulation",
        "version": engine.version,
    }


@app.post("/simulate/monte-carlo", response_model=MonteCarloResponse)
async def run_monte_carlo(request: MonteCarloRequest):
    """
    Run Monte Carlo simulation with optional correlation structure.
    
    Supports normal, lognormal, uniform, triangular, and gamma distributions.
    Handles multivariate correlation via Cholesky decomposition.
    """
    try:
        return engine.run_monte_carlo(request)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Monte Carlo simulation failed: {str(e)}")


@app.post("/calculate/var", response_model=VaRResponse)
async def calculate_var(request: VaRRequest):
    """
    Calculate Value at Risk (VaR) and Conditional Value at Risk (CVaR).
    
    Supports historical, parametric, and Monte Carlo methods.
    """
    try:
        return engine.calculate_var(request)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"VaR calculation failed: {str(e)}")


@app.post("/analyze/scenarios", response_model=ScenarioResponse)
async def run_scenario_analysis(request: ScenarioRequest):
    """
    Run scenario analysis and stress testing.
    
    Evaluates output under multiple stress scenarios and identifies best/worst cases.
    """
    try:
        return engine.run_scenario_analysis(request)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Scenario analysis failed: {str(e)}")


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8003)