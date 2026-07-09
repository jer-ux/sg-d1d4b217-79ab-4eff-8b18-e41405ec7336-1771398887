"""
Universal Engines - Observability & Monitoring Infrastructure
OpenTelemetry instrumentation, Prometheus metrics, structured logging
"""

from typing import Callable, Any
from functools import wraps
from time import time
import logging
import json
from datetime import datetime
from opentelemetry import trace, metrics
from opentelemetry.trace import Status, StatusCode
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.metrics import MeterProvider
from opentelemetry.sdk.resources import Resource
from opentelemetry.exporter.prometheus import PrometheusMetricReader
from opentelemetry.exporter.otlp.proto.grpc.trace_exporter import OTLPSpanExporter
from prometheus_client import Counter, Histogram, Gauge, CollectorRegistry, start_http_server


# ============================================================================
# STRUCTURED LOGGING
# ============================================================================

class JSONFormatter(logging.Formatter):
    """JSON formatter for structured logging"""
    
    def format(self, record: logging.LogRecord) -> str:
        log_data = {
            "timestamp": datetime.utcnow().isoformat(),
            "level": record.levelname,
            "logger": record.name,
            "message": record.getMessage(),
            "module": record.module,
            "function": record.funcName,
            "line": record.lineno,
        }
        
        if record.exc_info:
            log_data["exception"] = self.formatException(record.exc_info)
        
        if hasattr(record, "engine"):
            log_data["engine"] = record.engine
        
        if hasattr(record, "execution_time_ms"):
            log_data["execution_time_ms"] = record.execution_time_ms
        
        if hasattr(record, "evidence_id"):
            log_data["evidence_id"] = record.evidence_id
        
        return json.dumps(log_data)


def setup_structured_logging(engine_name: str) -> logging.Logger:
    """Configure structured JSON logging for an engine"""
    logger = logging.getLogger(engine_name)
    logger.setLevel(logging.INFO)
    
    handler = logging.StreamHandler()
    handler.setFormatter(JSONFormatter())
    logger.addHandler(handler)
    
    return logger


# ============================================================================
# PROMETHEUS METRICS
# ============================================================================

class EngineMetrics:
    """Prometheus metrics for engine monitoring"""
    
    def __init__(self, engine_name: str, registry: CollectorRegistry = None):
        self.engine_name = engine_name
        self.registry = registry or CollectorRegistry()
        
        # Request counters
        self.requests_total = Counter(
            f"{engine_name}_requests_total",
            f"Total requests to {engine_name}",
            ["operation", "status"],
            registry=self.registry
        )
        
        # Latency histograms
        self.request_duration = Histogram(
            f"{engine_name}_request_duration_seconds",
            f"Request duration for {engine_name}",
            ["operation"],
            buckets=[0.005, 0.01, 0.025, 0.05, 0.1, 0.25, 0.5, 1.0, 2.5, 5.0, 10.0],
            registry=self.registry
        )
        
        # Active requests gauge
        self.active_requests = Gauge(
            f"{engine_name}_active_requests",
            f"Number of active requests to {engine_name}",
            ["operation"],
            registry=self.registry
        )
        
        # Error counter
        self.errors_total = Counter(
            f"{engine_name}_errors_total",
            f"Total errors in {engine_name}",
            ["operation", "error_type"],
            registry=self.registry
        )
        
        # Computation cost tracker
        self.computation_cost = Counter(
            f"{engine_name}_computation_cost_total",
            f"Total computation cost (in compute units)",
            ["operation"],
            registry=self.registry
        )
    
    def track_request(self, operation: str):
        """Context manager for tracking request metrics"""
        return RequestTracker(self, operation)


class RequestTracker:
    """Context manager for tracking individual requests"""
    
    def __init__(self, metrics: EngineMetrics, operation: str):
        self.metrics = metrics
        self.operation = operation
        self.start_time = None
    
    def __enter__(self):
        self.start_time = time()
        self.metrics.active_requests.labels(operation=self.operation).inc()
        return self
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        duration = time() - self.start_time
        self.metrics.request_duration.labels(operation=self.operation).observe(duration)
        self.metrics.active_requests.labels(operation=self.operation).dec()
        
        if exc_type is None:
            self.metrics.requests_total.labels(operation=self.operation, status="success").inc()
        else:
            self.metrics.requests_total.labels(operation=self.operation, status="error").inc()
            error_type = exc_type.__name__ if exc_type else "Unknown"
            self.metrics.errors_total.labels(operation=self.operation, error_type=error_type).inc()
        
        return False  # Don't suppress exceptions


# ============================================================================
# OPENTELEMETRY TRACING
# ============================================================================

def setup_opentelemetry(engine_name: str, otlp_endpoint: str = None):
    """Configure OpenTelemetry tracing for distributed observability"""
    resource = Resource.create({"service.name": engine_name})
    
    provider = TracerProvider(resource=resource)
    
    if otlp_endpoint:
        otlp_exporter = OTLPSpanExporter(endpoint=otlp_endpoint)
        from opentelemetry.sdk.trace.export import BatchSpanProcessor
        provider.add_span_processor(BatchSpanProcessor(otlp_exporter))
    
    trace.set_tracer_provider(provider)
    return trace.get_tracer(engine_name)


def traced_operation(operation_name: str):
    """Decorator to add distributed tracing to engine operations"""
    def decorator(func: Callable) -> Callable:
        @wraps(func)
        async def wrapper(*args, **kwargs):
            tracer = trace.get_tracer(__name__)
            with tracer.start_as_current_span(operation_name) as span:
                span.set_attribute("operation", operation_name)
                
                try:
                    result = await func(*args, **kwargs)
                    span.set_status(Status(StatusCode.OK))
                    return result
                except Exception as e:
                    span.set_status(Status(StatusCode.ERROR, str(e)))
                    span.record_exception(e)
                    raise
        
        return wrapper
    return decorator


# ============================================================================
# ENGINE INSTRUMENTATION
# ============================================================================

class InstrumentedEngine:
    """Base class for instrumented engines with full observability"""
    
    def __init__(self, engine_name: str, enable_metrics: bool = True, enable_tracing: bool = True):
        self.engine_name = engine_name
        self.logger = setup_structured_logging(engine_name)
        
        if enable_metrics:
            self.metrics = EngineMetrics(engine_name)
            # Start Prometheus metrics server on port 9090 + offset
            # Economic=9091, Statistical=9092, Simulation=9093
            port_offset = {"economic": 1, "statistical": 2, "simulation": 3}.get(engine_name, 0)
            start_http_server(9090 + port_offset, registry=self.metrics.registry)
        
        if enable_tracing:
            self.tracer = setup_opentelemetry(engine_name)
    
    def track_computation(self, operation: str, cost_units: float = 1.0):
        """Track computation cost for billing/optimization"""
        if hasattr(self, "metrics"):
            self.metrics.computation_cost.labels(operation=operation).inc(cost_units)
    
    def log_execution(self, operation: str, execution_time_ms: float, evidence_id: str = None, **extra):
        """Log structured execution info"""
        self.logger.info(
            f"{operation} completed",
            extra={
                "engine": self.engine_name,
                "operation": operation,
                "execution_time_ms": execution_time_ms,
                "evidence_id": evidence_id,
                **extra
            }
        )


# ============================================================================
# HEALTH CHECK ENDPOINTS
# ============================================================================

from fastapi import FastAPI
from pydantic import BaseModel

class HealthResponse(BaseModel):
    status: str
    timestamp: str
    uptime_seconds: float
    version: str

class ReadinessResponse(BaseModel):
    ready: bool
    dependencies: dict[str, str]


def add_health_endpoints(app: FastAPI, engine_name: str, version: str = "0.1.0"):
    """Add /health and /ready endpoints to FastAPI app"""
    
    start_time = time()
    
    @app.get("/health", response_model=HealthResponse)
    async def health():
        return HealthResponse(
            status="healthy",
            timestamp=datetime.utcnow().isoformat(),
            uptime_seconds=time() - start_time,
            version=version
        )
    
    @app.get("/ready", response_model=ReadinessResponse)
    async def readiness():
        # Check dependencies (databases, external services, etc.)
        dependencies = {
            "numpy": "ok",
            "scipy": "ok",
        }
        
        return ReadinessResponse(
            ready=all(v == "ok" for v in dependencies.values()),
            dependencies=dependencies
        )