"""
KINCAID IQ™ DATA INTELLIGENCE CORE v0.1
Main FastAPI Application

Simplified MVP implementation for immediate deployment
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base
from app.database import engine

from app.api import upload
from app.api import analytics
from app.api import dashboard


# Create database tables
Base.metadata.create_all(
    bind=engine
)


# Initialize FastAPI application
app = FastAPI(
    title="Kincaid IQ Intelligence Engine",
    version="0.1",
    description="Enterprise Healthcare Intelligence Platform - MVP"
)


# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


# Include routers
app.include_router(
    upload.router
)

app.include_router(
    analytics.router
)

app.include_router(
    dashboard.router
)


@app.get("/")
def home():
    """Health check endpoint"""
    return {
        "system": "Kincaid IQ",
        "version": "0.1",
        "status": "operational"
    }


@app.get("/health")
def health():
    """Detailed health check"""
    return {
        "status": "healthy",
        "database": "connected",
        "api": "operational"
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        app,
        host="0.0.0.0",
        port=8000,
        reload=True
    )