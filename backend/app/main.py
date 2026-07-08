"""
KINCAID HEALTH™ AIOS
FastAPI Application Entry Point
"""

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import time
import structlog

from app.api.v1 import actuarial, pbm, reports, simulation, agents, executive
from app.config import settings

# Configure structured logging
logger = structlog.get_logger()

# Create FastAPI app
app = FastAPI(
    title="Kincaid Health™ AIOS",
    description="Enterprise Actuarial Intelligence Operating System",
    version="1.0.0",
    docs_url="/api/docs",
    redoc_url="/api/redoc",
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request logging middleware
@app.middleware("http")
async def log_requests(request: Request, call_next):
    start_time = time.time()
    
    response = await call_next(request)
    
    process_time = time.time() - start_time
    logger.info(
        "request_completed",
        method=request.method,
        path=request.url.path,
        status_code=response.status_code,
        process_time=f"{process_time:.3f}s"
    )
    
    return response

# Include API routers
app.include_router(actuarial.router, prefix="/api/v1/actuarial", tags=["Actuarial"])
app.include_router(pbm.router, prefix="/api/v1/pbm", tags=["PBM Intelligence"])
app.include_router(reports.router, prefix="/api/v1/reports", tags=["Reports"])
app.include_router(simulation.router, prefix="/api/v1/simulation", tags=["Simulation"])
app.include_router(agents.router, prefix="/api/v1/agents", tags=["AI Agents"])
app.include_router(executive.router, prefix="/api/v1/executive", tags=["Executive"])

@app.get("/")
async def root():
    return {
        "name": "Kincaid Health™ AIOS",
        "version": "1.0.0",
        "description": "Enterprise Actuarial Intelligence Operating System",
        "status": "operational",
        "endpoints": {
            "docs": "/api/docs",
            "actuarial": "/api/v1/actuarial",
            "pbm": "/api/v1/pbm",
            "simulation": "/api/v1/simulation",
            "agents": "/api/v1/agents",
            "reports": "/api/v1/reports",
            "executive": "/api/v1/executive",
        }
    }

@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "timestamp": time.time(),
        "version": "1.0.0"
    }

@app.get("/api/v1/status")
async def system_status():
    """Get system status and metrics"""
    return {
        "status": "operational",
        "services": {
            "api": "online",
            "database": "online",
            "cache": "online",
            "agents": "online",
        },
        "version": "1.0.0"
    }

# Global exception handler
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    logger.error(
        "unhandled_exception",
        path=request.url.path,
        method=request.method,
        error=str(exc),
        exc_info=True
    )
    
    return JSONResponse(
        status_code=500,
        content={
            "error": "Internal server error",
            "detail": str(exc) if settings.DEBUG else "An error occurred"
        }
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)