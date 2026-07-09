"""
Statistical Engine - FastAPI Microservice
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from datetime import datetime

from .service import StatisticalEngine
from .models import (
    DistributionRequest,
    DistributionResponse,
    RegressionRequest,
    RegressionResponse,
    CredibilityRequest,
    CredibilityResponse,
    HypothesisTestRequest,
    HypothesisTestResponse,
)

app = FastAPI(
    title="AIOS Statistical Engine",
    description="Universal statistical computation and analysis engine",
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
engine = StatisticalEngine()


@app.get("/health")
async def health_check():
    """Health check endpoint."""
    return {
        "status": "healthy",
        "engine": "statistical",
        "version": engine.version,
        "timestamp": datetime.utcnow().isoformat(),
    }


@app.get("/ready")
async def readiness_check():
    """Readiness check endpoint."""
    return {
        "status": "ready",
        "engine": "statistical",
        "version": engine.version,
    }


@app.post("/fit/distribution", response_model=DistributionResponse)
async def fit_distribution(request: DistributionRequest):
    """
    Fit a distribution to data and calculate summary statistics.
    
    Supports normal, lognormal, gamma, weibull, and poisson distributions.
    """
    try:
        return engine.fit_distribution(request)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Distribution fitting failed: {str(e)}")


@app.post("/analyze/regression", response_model=RegressionResponse)
async def perform_regression(request: RegressionRequest):
    """
    Perform regression analysis (linear, logistic, or polynomial).
    """
    try:
        return engine.perform_regression(request)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Regression analysis failed: {str(e)}")


@app.post("/calculate/credibility", response_model=CredibilityResponse)
async def calculate_credibility(request: CredibilityRequest):
    """
    Calculate credibility weighting using Bühlmann credibility theory.
    """
    try:
        return engine.calculate_credibility(request)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Credibility calculation failed: {str(e)}")


@app.post("/test/hypothesis", response_model=HypothesisTestResponse)
async def test_hypothesis(request: HypothesisTestRequest):
    """
    Perform hypothesis testing (t-tests, z-tests, chi-square, ANOVA).
    """
    try:
        return engine.test_hypothesis(request)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Hypothesis test failed: {str(e)}")


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8002)