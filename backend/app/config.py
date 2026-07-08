"""
KINCAID IQ™ INTELLIGENCE KERNEL
Configuration Management

Centralized configuration for all services
"""

import os
from typing import Optional
from pydantic_settings import BaseSettings
from functools import lru_cache


class Settings(BaseSettings):
    """Application settings with environment variable support"""
    
    # Application
    APP_NAME: str = "Kincaid IQ Intelligence Kernel"
    APP_VERSION: str = "0.1.0"
    ENVIRONMENT: str = os.getenv("ENVIRONMENT", "development")
    DEBUG: bool = os.getenv("DEBUG", "True").lower() == "true"
    
    # API
    API_V1_PREFIX: str = "/api/v1"
    API_PORT: int = int(os.getenv("API_PORT", "8000"))
    
    # Database
    DATABASE_URL: str = os.getenv(
        "DATABASE_URL",
        "postgresql://postgres:postgres@localhost:5432/kincaid_intelligence"
    )
    DATABASE_POOL_SIZE: int = 20
    DATABASE_MAX_OVERFLOW: int = 10
    
    # Redis Cache
    REDIS_URL: str = os.getenv("REDIS_URL", "redis://localhost:6379/0")
    CACHE_TTL: int = 3600  # 1 hour default
    
    # Security
    SECRET_KEY: str = os.getenv("SECRET_KEY", "dev-secret-key-change-in-production")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    # CORS
    CORS_ORIGINS: list = [
        "http://localhost:3000",
        "http://localhost:3001",
        "https://kincaid-iq.com",
    ]
    
    # AI Models
    OPENAI_API_KEY: Optional[str] = os.getenv("OPENAI_API_KEY")
    ANTHROPIC_API_KEY: Optional[str] = os.getenv("ANTHROPIC_API_KEY")
    GOOGLE_API_KEY: Optional[str] = os.getenv("GOOGLE_API_KEY")
    
    # Vector Database
    PINECONE_API_KEY: Optional[str] = os.getenv("PINECONE_API_KEY")
    PINECONE_ENVIRONMENT: Optional[str] = os.getenv("PINECONE_ENVIRONMENT")
    
    # Neo4j Knowledge Graph
    NEO4J_URI: str = os.getenv("NEO4J_URI", "bolt://localhost:7687")
    NEO4J_USER: str = os.getenv("NEO4J_USER", "neo4j")
    NEO4J_PASSWORD: str = os.getenv("NEO4J_PASSWORD", "password")
    
    # ClickHouse Analytics
    CLICKHOUSE_HOST: str = os.getenv("CLICKHOUSE_HOST", "localhost")
    CLICKHOUSE_PORT: int = int(os.getenv("CLICKHOUSE_PORT", "9000"))
    CLICKHOUSE_DB: str = os.getenv("CLICKHOUSE_DB", "kincaid_analytics")
    
    # Storage
    STORAGE_BACKEND: str = os.getenv("STORAGE_BACKEND", "local")  # local, s3, gcs
    S3_BUCKET: Optional[str] = os.getenv("S3_BUCKET")
    S3_REGION: Optional[str] = os.getenv("S3_REGION")
    
    # Event Bus
    KAFKA_BOOTSTRAP_SERVERS: str = os.getenv("KAFKA_BOOTSTRAP_SERVERS", "localhost:9092")
    
    # Monitoring
    SENTRY_DSN: Optional[str] = os.getenv("SENTRY_DSN")
    LOG_LEVEL: str = os.getenv("LOG_LEVEL", "INFO")
    
    # Feature Flags
    ENABLE_AI_AGENTS: bool = os.getenv("ENABLE_AI_AGENTS", "true").lower() == "true"
    ENABLE_SIMULATION_ENGINE: bool = os.getenv("ENABLE_SIMULATION_ENGINE", "true").lower() == "true"
    ENABLE_KNOWLEDGE_GRAPH: bool = os.getenv("ENABLE_KNOWLEDGE_GRAPH", "false").lower() == "true"
    
    class Config:
        env_file = ".env"
        case_sensitive = True


@lru_cache()
def get_settings() -> Settings:
    """Get cached settings instance"""
    return Settings()


# Global settings instance
settings = get_settings()