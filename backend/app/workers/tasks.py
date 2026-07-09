"""
Celery Tasks for Engine Computations
"""

import httpx
from typing import Dict, Any, List
from celery import Task, chain
from .celery_app import celery_app
from ..config import settings
import logging

logger = logging.getLogger(__name__)


class EngineTask(Task):
    """Base task with retry logic and error handling"""
    autoretry_for = (httpx.HTTPError, ConnectionError)
    retry_kwargs = {"max_retries": 3}
    retry_backoff = True


@celery_app.task(bind=True, base=EngineTask, name="run_economic_engine")
def run_economic_engine(self, engine_type: str, payload: Dict[str, Any]) -> Dict[str, Any]:
    """
    Execute Economic Engine computation asynchronously
    
    Args:
        engine_type: "cost_attribution" | "roi" | "value_flow"
        payload: Engine-specific input data
    
    Returns:
        Engine computation result with job metadata
    """
    try:
        # Update task state to track progress
        self.update_state(state="PROCESSING", meta={"step": "Calling Economic Engine"})
        
        url = f"{settings.ENGINE_GATEWAY_URL}/economic/{engine_type}"
        
        with httpx.Client(timeout=300.0) as client:
            response = client.post(url, json=payload)
            response.raise_for_status()
            result = response.json()
        
        # Add job metadata
        result["job_id"] = self.request.id
        result["engine"] = "economic"
        result["engine_type"] = engine_type
        result["status"] = "completed"
        
        return result
        
    except Exception as e:
        logger.error(f"Economic engine task failed: {str(e)}")
        self.update_state(state="FAILURE", meta={"error": str(e)})
        raise


@celery_app.task(bind=True, base=EngineTask, name="run_statistical_engine")
def run_statistical_engine(self, engine_type: str, payload: Dict[str, Any]) -> Dict[str, Any]:
    """
    Execute Statistical Engine computation asynchronously
    
    Args:
        engine_type: "distribution" | "regression" | "credibility" | "hypothesis_test"
        payload: Engine-specific input data
    
    Returns:
        Engine computation result with job metadata
    """
    try:
        self.update_state(state="PROCESSING", meta={"step": "Calling Statistical Engine"})
        
        url = f"{settings.ENGINE_GATEWAY_URL}/statistical/{engine_type}"
        
        with httpx.Client(timeout=300.0) as client:
            response = client.post(url, json=payload)
            response.raise_for_status()
            result = response.json()
        
        result["job_id"] = self.request.id
        result["engine"] = "statistical"
        result["engine_type"] = engine_type
        result["status"] = "completed"
        
        return result
        
    except Exception as e:
        logger.error(f"Statistical engine task failed: {str(e)}")
        self.update_state(state="FAILURE", meta={"error": str(e)})
        raise


@celery_app.task(bind=True, base=EngineTask, name="run_simulation_engine")
def run_simulation_engine(self, engine_type: str, payload: Dict[str, Any]) -> Dict[str, Any]:
    """
    Execute Simulation Engine computation asynchronously
    Heavy computation - queued to 'heavy' queue
    
    Args:
        engine_type: "monte_carlo" | "correlation" | "var" | "scenario"
        payload: Engine-specific input data
    
    Returns:
        Engine computation result with job metadata
    """
    try:
        self.update_state(state="PROCESSING", meta={"step": "Running Monte Carlo Simulation"})
        
        url = f"{settings.ENGINE_GATEWAY_URL}/simulation/{engine_type}"
        
        # Longer timeout for heavy simulations
        with httpx.Client(timeout=600.0) as client:
            response = client.post(url, json=payload)
            response.raise_for_status()
            result = response.json()
        
        result["job_id"] = self.request.id
        result["engine"] = "simulation"
        result["engine_type"] = engine_type
        result["status"] = "completed"
        
        return result
        
    except Exception as e:
        logger.error(f"Simulation engine task failed: {str(e)}")
        self.update_state(state="FAILURE", meta={"error": str(e)})
        raise


@celery_app.task(bind=True, name="run_engine_chain")
def run_engine_chain(self, workflow: List[Dict[str, Any]]) -> Dict[str, Any]:
    """
    Execute a chain of engine computations (output of one feeds into next)
    
    Args:
        workflow: List of engine steps, each with:
            - engine: "economic" | "statistical" | "simulation"
            - engine_type: specific computation type
            - payload: input data (can reference previous step outputs)
    
    Returns:
        Final result plus all intermediate results
    """
    try:
        self.update_state(state="PROCESSING", meta={"step": "Starting workflow chain"})
        
        results = []
        context = {}  # Store outputs for downstream steps
        
        for i, step in enumerate(workflow):
            self.update_state(
                state="PROCESSING",
                meta={"step": f"Executing step {i+1}/{len(workflow)}: {step['engine_type']}"}
            )
            
            # Resolve payload references to previous results
            payload = step["payload"]
            if "$context" in str(payload):
                # Simple variable substitution
                import json
                payload_str = json.dumps(payload)
                for key, value in context.items():
                    payload_str = payload_str.replace(f"$context.{key}", str(value))
                payload = json.loads(payload_str)
            
            # Execute appropriate engine
            if step["engine"] == "economic":
                result = run_economic_engine.apply_async(
                    args=[step["engine_type"], payload]
                ).get()
            elif step["engine"] == "statistical":
                result = run_statistical_engine.apply_async(
                    args=[step["engine_type"], payload]
                ).get()
            elif step["engine"] == "simulation":
                result = run_simulation_engine.apply_async(
                    args=[step["engine_type"], payload]
                ).get()
            
            results.append(result)
            
            # Store output in context for next steps
            context[f"step_{i}"] = result
        
        return {
            "job_id": self.request.id,
            "workflow": workflow,
            "results": results,
            "final_result": results[-1] if results else None,
            "status": "completed",
        }
        
    except Exception as e:
        logger.error(f"Engine chain task failed: {str(e)}")
        self.update_state(state="FAILURE", meta={"error": str(e)})
        raise