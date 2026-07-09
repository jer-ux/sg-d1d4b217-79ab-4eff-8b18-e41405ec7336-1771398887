"""
Background Worker System for KINCAID AIOS
Celery-based distributed task queue for heavy engine computations
"""

from .celery_app import celery_app
from .tasks import (
    run_economic_engine,
    run_statistical_engine,
    run_simulation_engine,
    run_engine_chain,
)

__all__ = [
    "celery_app",
    "run_economic_engine",
    "run_statistical_engine",
    "run_simulation_engine",
    "run_engine_chain",
]