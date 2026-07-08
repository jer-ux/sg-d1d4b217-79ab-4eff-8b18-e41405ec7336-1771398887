"""
KINCAID IQ™ INTELLIGENCE KERNEL
Main FastAPI Application

The central API gateway for the Enterprise Intelligence Operating System
"""

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from contextlib import asynccontextmanager
import logging
import time

from app.config import settings
from app.api.v1 import agents, analytics, datasets, dashboards, simulations
from app.models.database import engine, Base

# Configure logging
logging.basicConfig(
    level=getattr(logging, settings.LOG_LEVEL),
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan events"""
    # Startup
    logger.info("🚀 Starting Kincaid IQ Intelligence Kernel...")
    logger.info(f"Environment: {settings.ENVIRONMENT}")
    logger.info(f"Version: {settings.APP_VERSION}")
    
    # Initialize database
    try:
        Base.metadata.create_all(bind=engine)
        logger.info("✅ Database initialized")
    except Exception as e:
        logger.error(f"❌ Database initialization failed: {e}")
        raise
    
    # Initialize AI agents if enabled
    if settings.ENABLE_AI_AGENTS:
        logger.info("🤖 AI Agents enabled")
    
    # Initialize simulation engine if enabled
    if settings.ENABLE_SIMULATION_ENGINE:
        logger.info("🎲 Simulation Engine enabled")
    
    # Initialize knowledge graph if enabled
    if settings.ENABLE_KNOWLEDGE_GRAPH:
        logger.info("🕸️ Knowledge Graph enabled")
    
    yield
    
    # Shutdown
    logger.info("👋 Shutting down Kincaid IQ Intelligence Kernel...")


# Create FastAPI application
app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    description="Enterprise Healthcare Intelligence Operating System",
    docs_url="/api/docs",
    redoc_url="/api/redoc",
    openapi_url="/api/openapi.json",
    lifespan=lifespan
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Request timing middleware
@app.middleware("http")
async def add_process_time_header(request: Request, call_next):
    """Add processing time to response headers"""
    start_time = time.time()
    response = await call_next(request)
    process_time = time.time() - start_time
    response.headers["X-Process-Time"] = str(process_time)
    return response


# Health check endpoint
@app.get("/health")
async def health_check():
    """Health check endpoint for load balancers"""
    return {
        "status": "healthy",
        "version": settings.APP_VERSION,
        "environment": settings.ENVIRONMENT,
        "features": {
            "ai_agents": settings.ENABLE_AI_AGENTS,
            "simulation_engine": settings.ENABLE_SIMULATION_ENGINE,
            "knowledge_graph": settings.ENABLE_KNOWLEDGE_GRAPH,
        }
    }


# Root endpoint
@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "name": settings.APP_NAME,
        "version": settings.APP_VERSION,
        "description": "Enterprise Healthcare Intelligence Operating System",
        "docs": "/api/docs",
        "health": "/health"
    }


# Include routers
app.include_router(agents.router, prefix=f"{settings.API_V1_PREFIX}/agents", tags=["AI Agents"])
app.include_router(analytics.router, prefix=f"{settings.API_V1_PREFIX}/analytics", tags=["Analytics"])
app.include_router(datasets.router, prefix=f"{settings.API_V1_PREFIX}/datasets", tags=["Datasets"])
app.include_router(dashboards.router, prefix=f"{settings.API_V1_PREFIX}/dashboards", tags=["Dashboards"])
app.include_router(simulations.router, prefix=f"{settings.API_V1_PREFIX}/simulations", tags=["Simulations"])


# Global exception handler
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    """Handle all uncaught exceptions"""
    logger.error(f"Unhandled exception: {exc}", exc_info=True)
    return JSONResponse(
        status_code=500,
        content={
            "error": "internal_server_error",
            "message": "An unexpected error occurred",
            "detail": str(exc) if settings.DEBUG else None
        }
    )


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=settings.API_PORT,
        reload=settings.DEBUG,
        log_level=settings.LOG_LEVEL.lower()
    )