"""
Celery Application Configuration
"""

from celery import Celery
from ..config import settings

# Initialize Celery app
celery_app = Celery(
    "kincaid_engines",
    broker=settings.REDIS_URL,
    backend=settings.REDIS_URL,
    include=["app.workers.tasks"]
)

# Configuration
celery_app.conf.update(
    task_serializer="json",
    accept_content=["json"],
    result_serializer="json",
    timezone="UTC",
    enable_utc=True,
    task_track_started=True,
    task_send_sent_event=True,
    worker_send_task_events=True,
    result_expires=3600,  # 1 hour
    task_acks_late=True,
    worker_prefetch_multiplier=1,
    task_routes={
        "app.workers.tasks.run_simulation_engine": {"queue": "heavy"},
        "app.workers.tasks.run_engine_chain": {"queue": "heavy"},
    },
)

# Task result backend settings
celery_app.conf.result_backend_transport_options = {
    "master_name": "mymaster",
    "visibility_timeout": 3600,
}

if __name__ == "__main__":
    celery_app.start()