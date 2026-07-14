"""
FastAPI application for Rx Trend Forecast Engine
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from .engine import RxTrendEngine
from .models import ForecastRequest, ForecastResponse

app = FastAPI(
    title="Rx Trend Forecast Engine",
    description="Pharmacy benefit trend forecasting microservice",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

engine = RxTrendEngine()


@app.post("/forecast", response_model=ForecastResponse)
async def generate_forecast(request: ForecastRequest):
    """
    Generate Rx trend forecast.
    
    Returns multi-year pharmacy cost projections.
    """
    try:
        assumptions_dict = {
            "brand_inflation": request.assumptions.brand_inflation,
            "generic_deflation": request.assumptions.generic_deflation,
            "specialty_mix_shift": request.assumptions.specialty_mix_shift,
            "utilization_trend": request.assumptions.utilization_trend,
            "glp1_impact": request.assumptions.glp1_impact,
            "rebate_rate": request.assumptions.rebate_rate,
            "biosimilar_savings": request.assumptions.biosimilar_savings
        }
        
        results = engine.run(
            request.current_cost,
            request.members,
            request.years,
            assumptions_dict
        )
        
        trend_components = engine.get_trend_components(assumptions_dict)
        
        total_projection = results[-1].projected_cost
        total_increase = total_projection - request.current_cost
        
        return ForecastResponse(
            results=results,
            summary={
                "current_cost": request.current_cost,
                "final_year_projection": total_projection,
                "total_increase": total_increase,
                "total_increase_pct": (total_increase / request.current_cost) * 100,
                "composite_trend": trend_components["composite_trend"],
                "trend_components": trend_components
            }
        )
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "engine": "Rx Trend Forecast"}


@app.get("/version")
async def version():
    """Get engine version"""
    return {"engine": "Rx Trend Forecast Engine", "version": "1.0.0"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8002)