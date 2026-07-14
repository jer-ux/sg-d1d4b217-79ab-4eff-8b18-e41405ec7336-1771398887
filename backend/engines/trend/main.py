"""
FastAPI application for Medical Trend Forecast Engine
"""

from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from typing import Dict
import logging

from .models import TrendForecastRequest, TrendForecastResponse
from .medical_forecast_engine import MedicalTrendEngine

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Create FastAPI app
app = FastAPI(
    title="Medical Trend Forecast Engine",
    description="Actuarial engine for projecting future healthcare costs using historical claims data",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure appropriately for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize engine
engine = MedicalTrendEngine()


@app.get("/")
async def root() -> Dict[str, str]:
    """Health check endpoint"""
    return {
        "service": "Medical Trend Forecast Engine",
        "status": "operational",
        "version": "1.0.0",
    }


@app.get("/health")
async def health_check() -> Dict[str, str]:
    """Detailed health check"""
    return {
        "status": "healthy",
        "service": "medical-trend-forecast",
        "version": "1.0.0",
    }


@app.post(
    "/forecast",
    response_model=TrendForecastResponse,
    status_code=status.HTTP_200_OK,
    summary="Generate Medical Trend Forecast",
    description="""
    Generate actuarial forecast of future healthcare costs.
    
    **Methodology:**
    - Simple: Future Cost = Current Cost × (1+Trend)^Years
    - Actuarial: Trend = Medical Inflation + Utilization + Severity + Mix Shift - Savings
    
    **Required Inputs:**
    - Historical claims data (minimum 2 periods)
    - Forecast horizon (in months)
    - Calculation method
    
    **Returns:**
    - Period-by-period forecast
    - Trend component decomposition
    - Confidence intervals
    - Model fit statistics
    """,
)
async def create_forecast(request: TrendForecastRequest) -> TrendForecastResponse:
    """
    Generate medical trend forecast from historical claims data.
    
    Args:
        request: TrendForecastRequest with historical data and parameters
        
    Returns:
        TrendForecastResponse with forecast and trend components
        
    Raises:
        HTTPException: If validation or calculation fails
    """
    try:
        logger.info(f"Received forecast request: {request.forecast_periods} periods, method={request.method}")
        
        # Generate forecast
        response = engine.forecast(request)
        
        logger.info(f"Forecast complete: composite_trend={response.composite_trend:.3f}, r²={response.r_squared:.3f}")
        
        return response
        
    except ValueError as e:
        logger.error(f"Validation error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail=f"Validation error: {str(e)}",
        )
    except Exception as e:
        logger.error(f"Forecast calculation failed: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Forecast calculation failed: {str(e)}",
        )


@app.get("/methods")
async def get_methods() -> Dict[str, str]:
    """List available trend calculation methods"""
    return {
        "simple": "Simple year-over-year trend rate",
        "compound": "Compound annual growth rate (CAGR)",
        "exponential_smoothing": "Exponential smoothing forecast",
        "linear_regression": "Linear regression on historical data",
        "actuarial_decomposition": "Full actuarial component decomposition (recommended)",
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)