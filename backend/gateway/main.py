"""
AIOS Engine API Gateway
Unified interface for all computation engines with routing, auth, and load balancing.
"""

from fastapi import FastAPI, HTTPException, Depends, Header
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from typing import Optional, Dict, Any
import httpx
import os
from datetime import datetime
import hashlib
import hmac

app = FastAPI(
    title="AIOS Engine Gateway",
    description="Universal API gateway for all computational engines",
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

# Engine service discovery
ENGINE_ENDPOINTS = {
    "economic": os.getenv("ECONOMIC_ENGINE_URL", "http://localhost:8001"),
    "statistical": os.getenv("STATISTICAL_ENGINE_URL", "http://localhost:8002"),
    "simulation": os.getenv("SIMULATION_ENGINE_URL", "http://localhost:8003"),
}

# API Key validation (simple implementation)
API_KEYS = {
    "dev_key_001": {"name": "Development", "tier": "unlimited"},
    "prod_key_001": {"name": "Production", "tier": "standard"},
}


async def verify_api_key(x_api_key: Optional[str] = Header(None)):
    """Verify API key from request header."""
    if not x_api_key:
        raise HTTPException(status_code=401, detail="API key required")
    
    if x_api_key not in API_KEYS:
        raise HTTPException(status_code=403, detail="Invalid API key")
    
    return API_KEYS[x_api_key]


@app.get("/health")
async def health_check():
    """Health check for gateway."""
    return {
        "status": "healthy",
        "service": "engine-gateway",
        "timestamp": datetime.utcnow().isoformat(),
        "engines": list(ENGINE_ENDPOINTS.keys()),
    }


@app.get("/engines/status")
async def engines_status(api_key: Dict = Depends(verify_api_key)):
    """Check health status of all engines."""
    status = {}
    
    async with httpx.AsyncClient(timeout=5.0) as client:
        for engine_name, endpoint in ENGINE_ENDPOINTS.items():
            try:
                response = await client.get(f"{endpoint}/health")
                status[engine_name] = {
                    "status": "healthy" if response.status_code == 200 else "unhealthy",
                    "endpoint": endpoint,
                    "data": response.json() if response.status_code == 200 else None,
                }
            except Exception as e:
                status[engine_name] = {
                    "status": "unreachable",
                    "endpoint": endpoint,
                    "error": str(e),
                }
    
    return {
        "gateway_status": "operational",
        "engines": status,
        "timestamp": datetime.utcnow().isoformat(),
    }


@app.post("/engines/{engine_name}/execute")
async def execute_engine(
    engine_name: str,
    request_data: Dict[str, Any],
    api_key: Dict = Depends(verify_api_key),
):
    """
    Execute computation on specified engine.
    Routes request to appropriate engine microservice.
    """
    if engine_name not in ENGINE_ENDPOINTS:
        raise HTTPException(
            status_code=404,
            detail=f"Engine '{engine_name}' not found. Available: {list(ENGINE_ENDPOINTS.keys())}"
        )
    
    endpoint = ENGINE_ENDPOINTS[engine_name]
    operation = request_data.get("operation")
    payload = request_data.get("payload", {})
    
    if not operation:
        raise HTTPException(status_code=400, detail="'operation' field required in request")
    
    # Route to appropriate engine endpoint
    engine_routes = {
        "economic": {
            "attribute_cost": "/calculate/cost-attribution",
            "calculate_roi": "/calculate/roi",
            "analyze_value_flow": "/analyze/value-flow",
        },
        "statistical": {
            "fit_distribution": "/fit/distribution",
            "run_regression": "/analyze/regression",
            "calculate_credibility": "/calculate/credibility",
            "test_hypothesis": "/test/hypothesis",
        },
        "simulation": {
            "monte_carlo": "/simulate/monte-carlo",
            "calculate_var": "/calculate/var",
            "analyze_scenarios": "/analyze/scenarios",
        },
    }
    
    if engine_name not in engine_routes or operation not in engine_routes[engine_name]:
        raise HTTPException(
            status_code=400,
            detail=f"Operation '{operation}' not supported for engine '{engine_name}'"
        )
    
    target_path = engine_routes[engine_name][operation]
    target_url = f"{endpoint}{target_path}"
    
    try:
        async with httpx.AsyncClient(timeout=30.0) as client:
            response = await client.post(target_url, json=payload)
            
            if response.status_code != 200:
                raise HTTPException(
                    status_code=response.status_code,
                    detail=f"Engine execution failed: {response.text}"
                )
            
            return {
                "success": True,
                "engine": engine_name,
                "operation": operation,
                "result": response.json(),
                "execution_time_ms": response.elapsed.total_seconds() * 1000,
                "timestamp": datetime.utcnow().isoformat(),
            }
    
    except httpx.TimeoutException:
        raise HTTPException(status_code=504, detail="Engine request timeout")
    except httpx.RequestError as e:
        raise HTTPException(status_code=503, detail=f"Engine unreachable: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Execution error: {str(e)}")


@app.get("/")
async def root():
    """Gateway root endpoint."""
    return {
        "service": "AIOS Engine Gateway",
        "version": "1.0.0",
        "documentation": "/docs",
        "engines": list(ENGINE_ENDPOINTS.keys()),
        "status": "operational",
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)