"""
Job Management API Routes
"""

from fastapi import APIRouter, HTTPException
from typing import Dict, Any, List, Optional
from pydantic import BaseModel
from celery.result import AsyncResult
from ...workers.celery_app import celery_app
from ...workers.tasks import (
    run_economic_engine,
    run_statistical_engine,
    run_simulation_engine,
    run_engine_chain,
)

router = APIRouter(prefix="/jobs", tags=["jobs"])


class JobSubmit(BaseModel):
    engine: str
    engine_type: str
    payload: Dict[str, Any]


class WorkflowSubmit(BaseModel):
    name: str
    description: Optional[str] = None
    steps: List[Dict[str, Any]]


class JobStatus(BaseModel):
    job_id: str
    state: str
    progress: Optional[Dict[str, Any]] = None
    result: Optional[Dict[str, Any]] = None
    error: Optional[str] = None


@router.post("/submit")
async def submit_job(job: JobSubmit) -> Dict[str, str]:
    """Submit a new engine computation job to the queue"""
    try:
        if job.engine == "economic":
            task = run_economic_engine.apply_async(args=[job.engine_type, job.payload])
        elif job.engine == "statistical":
            task = run_statistical_engine.apply_async(args=[job.engine_type, job.payload])
        elif job.engine == "simulation":
            task = run_simulation_engine.apply_async(args=[job.engine_type, job.payload])
        else:
            raise HTTPException(status_code=400, detail=f"Unknown engine: {job.engine}")
        
        return {
            "job_id": task.id,
            "status": "queued",
            "message": f"Job submitted to {job.engine} engine"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to submit job: {str(e)}")


@router.post("/submit-workflow")
async def submit_workflow(workflow: WorkflowSubmit) -> Dict[str, str]:
    """Submit a multi-step engine workflow"""
    try:
        task = run_engine_chain.apply_async(args=[workflow.steps])
        
        return {
            "job_id": task.id,
            "workflow_name": workflow.name,
            "status": "queued",
            "steps_count": len(workflow.steps)
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to submit workflow: {str(e)}")


@router.get("/status/{job_id}")
async def get_job_status(job_id: str) -> JobStatus:
    """Get current status and result of a job"""
    try:
        result = AsyncResult(job_id, app=celery_app)
        
        response = JobStatus(
            job_id=job_id,
            state=result.state,
        )
        
        if result.state == "PENDING":
            response.progress = {"message": "Job is queued"}
        elif result.state == "PROCESSING":
            response.progress = result.info
        elif result.state == "SUCCESS":
            response.result = result.result
        elif result.state == "FAILURE":
            response.error = str(result.info)
        
        return response
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to get job status: {str(e)}")


@router.post("/cancel/{job_id}")
async def cancel_job(job_id: str) -> Dict[str, str]:
    """Cancel a running or queued job"""
    try:
        result = AsyncResult(job_id, app=celery_app)
        result.revoke(terminate=True)
        
        return {
            "job_id": job_id,
            "status": "cancelled",
            "message": "Job cancellation requested"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to cancel job: {str(e)}")


@router.get("/list")
async def list_jobs(limit: int = 50) -> List[Dict[str, Any]]:
    """List recent jobs with their status"""
    try:
        # Get active tasks
        inspect = celery_app.control.inspect()
        
        active = inspect.active() or {}
        scheduled = inspect.scheduled() or {}
        reserved = inspect.reserved() or {}
        
        jobs = []
        
        # Combine all tasks
        for worker, tasks in active.items():
            for task in tasks:
                jobs.append({
                    "job_id": task["id"],
                    "name": task["name"],
                    "state": "PROCESSING",
                    "worker": worker,
                })
        
        for worker, tasks in reserved.items():
            for task in tasks:
                jobs.append({
                    "job_id": task["id"],
                    "name": task["name"],
                    "state": "QUEUED",
                    "worker": worker,
                })
        
        return jobs[:limit]
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to list jobs: {str(e)}")