"""
KINCAID HEALTH™ AIOS
AI Agents API Endpoints
"""

from fastapi import APIRouter, HTTPException, BackgroundTasks
from pydantic import BaseModel
from typing import Dict, Any, Optional, List
from datetime import datetime
import structlog

from app.agents.orchestrator import agent_orchestrator

logger = structlog.get_logger()
router = APIRouter()

class AgentTaskRequest(BaseModel):
    task_type: str  # "analysis", "forecast", "audit", "recommendation"
    context: Dict[str, Any]
    required_agents: List[str]
    priority: str = "medium"  # "low", "medium", "high", "urgent"

class AgentTaskResponse(BaseModel):
    task_id: str
    status: str
    message: str

class TaskStatusResponse(BaseModel):
    task_id: str
    status: str  # "queued", "processing", "complete", "error"
    progress: Optional[float]
    created_at: datetime
    completed_at: Optional[datetime]

class TaskResultResponse(BaseModel):
    task_id: str
    status: str
    consensus_percentage: float
    confidence_percentage: float
    recommendation: Dict[str, Any]
    debate_summary: str
    executive_summary: str
    evidence: List[Dict[str, Any]]

@router.post("/task", response_model=AgentTaskResponse)
async def submit_agent_task(
    request: AgentTaskRequest,
    background_tasks: BackgroundTasks
):
    """
    Submit a task for multi-agent analysis.
    
    The task will be processed through:
    1. Independent analysis by required agents
    2. Multi-agent debate
    3. Consensus building
    4. Self-critique validation
    """
    try:
        task_id = await agent_orchestrator.submit_task(
            task_type=request.task_type,
            context=request.context,
            required_agents=request.required_agents,
            priority=request.priority
        )
        
        logger.info("agent_task_submitted", task_id=task_id, agents=request.required_agents)
        
        return AgentTaskResponse(
            task_id=task_id,
            status="queued",
            message=f"Task submitted successfully. {len(request.required_agents)} agents will collaborate."
        )
    except Exception as e:
        logger.error("agent_task_submission_failed", error=str(e))
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/task/{task_id}/status", response_model=TaskStatusResponse)
async def get_task_status(task_id: str):
    """Get the current status of an agent task"""
    try:
        status = await agent_orchestrator.get_task_status(task_id)
        
        if not status:
            raise HTTPException(status_code=404, detail="Task not found")
        
        return TaskStatusResponse(**status)
    except HTTPException:
        raise
    except Exception as e:
        logger.error("get_task_status_failed", task_id=task_id, error=str(e))
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/task/{task_id}/result", response_model=TaskResultResponse)
async def get_task_result(task_id: str):
    """Get the final result of a completed agent task"""
    try:
        result = await agent_orchestrator.get_task_result(task_id)
        
        if not result:
            raise HTTPException(status_code=404, detail="Task not found or not complete")
        
        return TaskResultResponse(**result)
    except HTTPException:
        raise
    except Exception as e:
        logger.error("get_task_result_failed", task_id=task_id, error=str(e))
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/available")
async def get_available_agents():
    """Get list of available agents and their capabilities"""
    try:
        agents = await agent_orchestrator.get_available_agents()
        return {
            "agents": agents,
            "count": len(agents)
        }
    except Exception as e:
        logger.error("get_available_agents_failed", error=str(e))
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/status")
async def get_orchestrator_status():
    """Get orchestrator status and metrics"""
    try:
        status = await agent_orchestrator.get_status()
        return status
    except Exception as e:
        logger.error("get_orchestrator_status_failed", error=str(e))
        raise HTTPException(status_code=500, detail=str(e))