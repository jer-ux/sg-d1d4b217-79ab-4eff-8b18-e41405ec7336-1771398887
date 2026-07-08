"""
KINCAID HEALTH™ AIOS
LangGraph Agent Orchestrator

Multi-agent collaboration using LangGraph
"""

from typing import Dict, Any, List, Optional, TypedDict
from datetime import datetime
import uuid
import structlog
from langgraph.graph import StateGraph, END

from app.agents.chief_actuary import ChiefActuaryAgent
from app.agents.base import BaseAgent, AgentRecommendation, AgentDebatePosition, ConsensusResult

logger = structlog.get_logger()

class AgentState(TypedDict):
    """State passed between agents in the graph"""
    task_id: str
    task_type: str
    context: Dict[str, Any]
    recommendations: List[AgentRecommendation]
    debate_positions: List[AgentDebatePosition]
    consensus: Optional[ConsensusResult]
    evidence_graph: Dict[str, Any]
    confidence: float
    status: str
    created_at: datetime
    updated_at: datetime

class AgentOrchestrator:
    """
    Orchestrates multi-agent collaboration using LangGraph.
    
    Workflow:
    1. Independent Analysis → Each agent analyzes independently
    2. Debate → Agents critique each other's recommendations
    3. Consensus → Build consensus from debate
    4. Validation → Self-critique and quality checks
    """
    
    def __init__(self):
        self.agents: Dict[str, BaseAgent] = {}
        self.tasks: Dict[str, AgentState] = {}
        self.graph = None
        
        # Initialize agents
        self._initialize_agents()
        
        # Build LangGraph workflow
        self._build_workflow()
        
        logger.info("agent_orchestrator_initialized", agent_count=len(self.agents))
    
    def _initialize_agents(self):
        """Initialize all available agents"""
        # Register Chief Actuary Agent
        self.agents["chief_actuary"] = ChiefActuaryAgent()
        
        # TODO: Register remaining agents
        # self.agents["cfo"] = CFOAgent()
        # self.agents["pbm_investigator"] = PBMInvestigatorAgent()
        # self.agents["erisa_counsel"] = ERISACounselAgent()
        # self.agents["ml_scientist"] = MLScientistAgent()
        # self.agents["risk_officer"] = RiskOfficerAgent()
        # self.agents["clinical_intelligence"] = ClinicalIntelligenceAgent()
        # self.agents["contract_intelligence"] = ContractIntelligenceAgent()
        # self.agents["board_strategy"] = BoardStrategyAgent()
    
    def _build_workflow(self):
        """Build the LangGraph workflow"""
        workflow = StateGraph(AgentState)
        
        # Add nodes (processing stages)
        workflow.add_node("analyze", self._analyze_phase)
        workflow.add_node("debate", self._debate_phase)
        workflow.add_node("consensus", self._consensus_phase)
        workflow.add_node("validate", self._validate_phase)
        
        # Add edges (workflow flow)
        workflow.add_edge("analyze", "debate")
        workflow.add_edge("debate", "consensus")
        workflow.add_edge("consensus", "validate")
        workflow.add_edge("validate", END)
        
        # Set entry point
        workflow.set_entry_point("analyze")
        
        # Compile
        self.graph = workflow.compile()
        
        logger.info("langgraph_workflow_built")
    
    async def _analyze_phase(self, state: AgentState) -> AgentState:
        """Phase 1: Independent agent analysis"""
        logger.info("phase_1_analyze_start", task_id=state["task_id"])
        
        recommendations = []
        
        # Get required agents for this task
        # For now, use all available agents
        for agent_id, agent in self.agents.items():
            try:
                recommendation = await agent.analyze(state["context"])
                recommendations.append(recommendation)
                logger.info("agent_analysis_complete", agent_id=agent_id)
            except Exception as e:
                logger.error("agent_analysis_failed", agent_id=agent_id, error=str(e))
        
        state["recommendations"] = recommendations
        state["status"] = "analyzed"
        state["updated_at"] = datetime.now()
        
        return state
    
    async def _debate_phase(self, state: AgentState) -> AgentState:
        """Phase 2: Multi-agent debate"""
        logger.info("phase_2_debate_start", task_id=state["task_id"])
        
        debate_positions = []
        
        # Each agent debates each recommendation (except their own)
        for recommendation in state["recommendations"]:
            for agent_id, agent in self.agents.items():
                if agent_id == recommendation.agent_id:
                    continue
                
                try:
                    position = await agent.debate(recommendation)
                    debate_positions.append(position)
                    logger.info("agent_debate_complete", agent_id=agent_id, recommendation_id=recommendation.id)
                except Exception as e:
                    logger.error("agent_debate_failed", agent_id=agent_id, error=str(e))
        
        state["debate_positions"] = debate_positions
        state["status"] = "debated"
        state["updated_at"] = datetime.now()
        
        return state
    
    async def _consensus_phase(self, state: AgentState) -> AgentState:
        """Phase 3: Build consensus"""
        logger.info("phase_3_consensus_start", task_id=state["task_id"])
        
        # Simple consensus algorithm: highest support wins
        # In production, use more sophisticated consensus mechanisms
        
        # Find recommendation with highest support
        best_recommendation = None
        highest_support = 0
        
        for recommendation in state["recommendations"]:
            # Count support for this recommendation
            support_count = sum(
                1 for pos in state["debate_positions"]
                if pos.recommendation_id == recommendation.id and pos.stance == "support"
            )
            
            if support_count > highest_support:
                highest_support = support_count
                best_recommendation = recommendation
        
        # Calculate consensus percentage
        total_positions = len(state["debate_positions"])
        consensus_percentage = (highest_support / total_positions * 100) if total_positions > 0 else 0
        
        # Build consensus result
        consensus = ConsensusResult(
            recommendation_id=best_recommendation.id if best_recommendation else "unknown",
            consensus_percentage=consensus_percentage,
            confidence_percentage=best_recommendation.confidence * 100 if best_recommendation else 0,
            supporting_agents=[pos.agent_id for pos in state["debate_positions"] if pos.stance == "support"],
            opposing_agents=[pos.agent_id for pos in state["debate_positions"] if pos.stance == "oppose"],
            neutral_agents=[pos.agent_id for pos in state["debate_positions"] if pos.stance == "neutral"],
            final_recommendation=best_recommendation,
            debate_summary=self._generate_debate_summary(state["debate_positions"]),
            executive_summary=self._generate_executive_summary(best_recommendation) if best_recommendation else ""
        )
        
        state["consensus"] = consensus
        state["status"] = "consensus"
        state["updated_at"] = datetime.now()
        
        return state
    
    async def _validate_phase(self, state: AgentState) -> AgentState:
        """Phase 4: Validation and quality checks"""
        logger.info("phase_4_validate_start", task_id=state["task_id"])
        
        consensus = state["consensus"]
        
        # Quality checks
        warnings = []
        
        if consensus.confidence_percentage < 70:
            warnings.append("Low confidence level")
        
        if consensus.consensus_percentage < 60:
            warnings.append("Low consensus among agents")
        
        if len(consensus.final_recommendation.evidence) < 3:
            warnings.append("Insufficient evidence")
        
        if warnings:
            logger.warning("validation_warnings", task_id=state["task_id"], warnings=warnings)
        
        state["status"] = "complete"
        state["updated_at"] = datetime.now()
        
        return state
    
    def _generate_debate_summary(self, positions: List[AgentDebatePosition]) -> str:
        """Generate summary of debate positions"""
        summary = "Agent Debate Summary:\n\n"
        
        for pos in positions:
            summary += f"- {pos.agent_id}: {pos.stance} ({pos.confidence*100:.0f}% confident)\n"
            summary += f"  {pos.reasoning}\n\n"
        
        return summary
    
    def _generate_executive_summary(self, recommendation: AgentRecommendation) -> str:
        """Generate executive summary"""
        return f"""
{recommendation.title}

Financial Impact: {recommendation.financial_impact["currency"]} {recommendation.financial_impact["expected"]:,.0f}
(Range: {recommendation.financial_impact["min"]:,.0f} - {recommendation.financial_impact["max"]:,.0f})

Confidence: {recommendation.confidence*100:.0f}%

{recommendation.summary}
""".strip()
    
    async def submit_task(
        self,
        task_type: str,
        context: Dict[str, Any],
        required_agents: List[str],
        priority: str = "medium"
    ) -> str:
        """Submit a new task for agent processing"""
        task_id = str(uuid.uuid4())
        
        # Create initial state
        state: AgentState = {
            "task_id": task_id,
            "task_type": task_type,
            "context": context,
            "recommendations": [],
            "debate_positions": [],
            "consensus": None,
            "evidence_graph": {},
            "confidence": 0.0,
            "status": "queued",
            "created_at": datetime.now(),
            "updated_at": datetime.now()
        }
        
        # Store task
        self.tasks[task_id] = state
        
        # Process through workflow (async in production with queue)
        try:
            result_state = await self.graph.ainvoke(state)
            self.tasks[task_id] = result_state
        except Exception as e:
            logger.error("task_processing_failed", task_id=task_id, error=str(e))
            state["status"] = "error"
            self.tasks[task_id] = state
        
        return task_id
    
    async def get_task_status(self, task_id: str) -> Optional[Dict[str, Any]]:
        """Get task status"""
        if task_id not in self.tasks:
            return None
        
        state = self.tasks[task_id]
        return {
            "task_id": task_id,
            "status": state["status"],
            "progress": self._calculate_progress(state["status"]),
            "created_at": state["created_at"],
            "completed_at": state["updated_at"] if state["status"] == "complete" else None
        }
    
    async def get_task_result(self, task_id: str) -> Optional[Dict[str, Any]]:
        """Get task result"""
        if task_id not in self.tasks:
            return None
        
        state = self.tasks[task_id]
        
        if state["status"] != "complete":
            return None
        
        consensus = state["consensus"]
        
        return {
            "task_id": task_id,
            "status": state["status"],
            "consensus_percentage": consensus.consensus_percentage,
            "confidence_percentage": consensus.confidence_percentage,
            "recommendation": consensus.final_recommendation.__dict__,
            "debate_summary": consensus.debate_summary,
            "executive_summary": consensus.executive_summary,
            "evidence": [e.__dict__ for e in consensus.final_recommendation.evidence]
        }
    
    async def get_available_agents(self) -> List[Dict[str, Any]]:
        """Get list of available agents"""
        return [
            {
                "id": agent_id,
                "metadata": agent.get_metadata()
            }
            for agent_id, agent in self.agents.items()
        ]
    
    async def get_status(self) -> Dict[str, Any]:
        """Get orchestrator status"""
        return {
            "registered_agents": len(self.agents),
            "total_tasks": len(self.tasks),
            "active_tasks": sum(1 for t in self.tasks.values() if t["status"] not in ["complete", "error"]),
            "completed_tasks": sum(1 for t in self.tasks.values() if t["status"] == "complete"),
            "failed_tasks": sum(1 for t in self.tasks.values() if t["status"] == "error")
        }
    
    def _calculate_progress(self, status: str) -> float:
        """Calculate task progress percentage"""
        progress_map = {
            "queued": 0.0,
            "analyzed": 0.25,
            "debated": 0.50,
            "consensus": 0.75,
            "complete": 1.0,
            "error": 0.0
        }
        return progress_map.get(status, 0.0)

# Global orchestrator instance
agent_orchestrator = AgentOrchestrator()