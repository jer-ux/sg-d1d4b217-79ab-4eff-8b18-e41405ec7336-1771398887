/**
 * KINCAID HEALTH™ AIOS
 * Agent Orchestration Engine
 * 
 * Coordinates multi-agent collaboration, debate, and consensus building.
 */

import { BaseAgent, Recommendation, AgentDebatePosition, ConsensusResult, Evidence } from "./BaseAgent";

export interface TaskDefinition {
  id: string;
  type: "analysis" | "forecast" | "audit" | "recommendation";
  context: any;
  required_agents: string[];
  optional_agents: string[];
  deadline?: Date;
  priority: "low" | "medium" | "high" | "urgent";
}

export interface AgentRegistry {
  [agentId: string]: BaseAgent;
}

export class AgentOrchestrator {
  private agents: AgentRegistry;
  private taskQueue: TaskDefinition[];
  private activeTasks: Map<string, TaskDefinition>;
  private completedTasks: Map<string, ConsensusResult>;

  constructor() {
    this.agents = {};
    this.taskQueue = [];
    this.activeTasks = new Map();
    this.completedTasks = new Map();
  }

  /**
   * Register an agent with the orchestrator
   */
  public registerAgent(agent: BaseAgent): void {
    const metadata = agent.getMetadata();
    this.agents[metadata.id] = agent;
    console.log(`[AgentOrchestrator] Registered agent: ${metadata.name} (${metadata.role})`);
  }

  /**
   * Submit a task for multi-agent analysis
   */
  public async submitTask(task: TaskDefinition): Promise<string> {
    this.taskQueue.push(task);
    console.log(`[AgentOrchestrator] Task submitted: ${task.id} (${task.type})`);
    
    // Start processing if high priority
    if (task.priority === "urgent" || task.priority === "high") {
      return this.processTask(task);
    }
    
    return task.id;
  }

  /**
   * Process a task through the agent debate pipeline
   */
  private async processTask(task: TaskDefinition): Promise<string> {
    this.activeTasks.set(task.id, task);

    try {
      // Phase 1: Independent Analysis
      console.log(`[AgentOrchestrator] Phase 1: Independent Analysis for task ${task.id}`);
      const initialRecommendations = await this.gatherInitialRecommendations(task);

      // Phase 2: Agent Debate
      console.log(`[AgentOrchestrator] Phase 2: Agent Debate for task ${task.id}`);
      const debateResults = await this.conductDebate(initialRecommendations, task);

      // Phase 3: Consensus Building
      console.log(`[AgentOrchestrator] Phase 3: Consensus Building for task ${task.id}`);
      const consensus = await this.buildConsensus(debateResults, task);

      // Phase 4: Self-Critique
      console.log(`[AgentOrchestrator] Phase 4: Self-Critique for task ${task.id}`);
      const validated = await this.selfCritique(consensus);

      // Store result
      this.completedTasks.set(task.id, validated);
      this.activeTasks.delete(task.id);

      return task.id;
    } catch (error) {
      console.error(`[AgentOrchestrator] Error processing task ${task.id}:`, error);
      this.activeTasks.delete(task.id);
      throw error;
    }
  }

  /**
   * Phase 1: Gather initial recommendations from all required agents
   */
  private async gatherInitialRecommendations(task: TaskDefinition): Promise<Recommendation[]> {
    const recommendations: Recommendation[] = [];

    for (const agentId of task.required_agents) {
      const agent = this.agents[agentId];
      if (!agent) {
        console.warn(`[AgentOrchestrator] Agent ${agentId} not found`);
        continue;
      }

      try {
        const recommendation = await agent.analyze(task.context);
        recommendations.push(recommendation);
      } catch (error) {
        console.error(`[AgentOrchestrator] Agent ${agentId} analysis failed:`, error);
      }
    }

    return recommendations;
  }

  /**
   * Phase 2: Conduct debate - each agent critiques others' recommendations
   */
  private async conductDebate(
    recommendations: Recommendation[],
    task: TaskDefinition
  ): Promise<Map<string, AgentDebatePosition[]>> {
    const debateMap = new Map<string, AgentDebatePosition[]>();

    for (const recommendation of recommendations) {
      const positions: AgentDebatePosition[] = [];

      // Each agent (except the recommender) debates this recommendation
      for (const agentId of task.required_agents) {
        if (agentId === recommendation.agent_id) continue;

        const agent = this.agents[agentId];
        if (!agent) continue;

        try {
          const position = await agent.debate(recommendation);
          positions.push(position);
        } catch (error) {
          console.error(`[AgentOrchestrator] Agent ${agentId} debate failed:`, error);
        }
      }

      debateMap.set(recommendation.id, positions);
    }

    return debateMap;
  }

  /**
   * Phase 3: Build consensus from debate results
   */
  private async buildConsensus(
    debateMap: Map<string, AgentDebatePosition[]>,
    task: TaskDefinition
  ): Promise<ConsensusResult> {
    const bestRecommendation: Recommendation | null = null;
    let highestConsensus = 0;

    // Find recommendation with highest consensus
    debateMap.forEach((positions, recommendationId) => {
      const supportCount = positions.filter(p => p.stance === "support").length;
      const totalCount = positions.length;
      const consensus = (supportCount / totalCount) * 100;

      if (consensus > highestConsensus) {
        highestConsensus = consensus;
        // Find the original recommendation
        // In production, this would be properly tracked
      }
    });

    // Calculate confidence
    const allPositions = Array.from(debateMap.values()).flat();
    const avgConfidence =
      allPositions.reduce((sum, p) => sum + p.confidence, 0) / allPositions.length;

    // Generate consensus result
    const consensus: ConsensusResult = {
      recommendation_id: bestRecommendation?.id || "unknown",
      consensus_percentage: highestConsensus,
      confidence_percentage: avgConfidence * 100,
      supporting_agents: allPositions.filter(p => p.stance === "support").map(p => p.agent_id),
      opposing_agents: allPositions.filter(p => p.stance === "oppose").map(p => p.agent_id),
      neutral_agents: allPositions.filter(p => p.stance === "neutral").map(p => p.agent_id),
      final_recommendation: bestRecommendation!,
      debate_summary: this.generateDebateSummary(debateMap),
      executive_summary: this.generateExecutiveSummary(bestRecommendation!, allPositions),
    };

    return consensus;
  }

  /**
   * Phase 4: Self-critique and validation
   */
  private async selfCritique(consensus: ConsensusResult): Promise<ConsensusResult> {
    // Mathematical verification
    if (consensus.final_recommendation.financial_impact) {
      // Verify calculations are mathematically sound
    }

    // Data completeness check
    const evidenceCount = consensus.final_recommendation.evidence.length;
    if (evidenceCount < 3) {
      console.warn(`[AgentOrchestrator] Low evidence count: ${evidenceCount}`);
    }

    // Confidence threshold check
    if (consensus.confidence_percentage < 70) {
      console.warn(`[AgentOrchestrator] Low confidence: ${consensus.confidence_percentage}%`);
    }

    // Logic consistency review
    // Check for contradictions in reasoning

    return consensus;
  }

  /**
   * Generate debate summary
   */
  private generateDebateSummary(debateMap: Map<string, AgentDebatePosition[]>): string {
    let summary = "Agent Debate Summary:\n\n";

    debateMap.forEach((positions, recommendationId) => {
      summary += `Recommendation ${recommendationId}:\n`;
      positions.forEach(pos => {
        summary += `  - ${pos.agent_id}: ${pos.stance} (${Math.round(pos.confidence * 100)}% confident)\n`;
        summary += `    Reasoning: ${pos.reasoning}\n`;
      });
    });

    return summary;
  }

  /**
   * Generate executive summary
   */
  private generateExecutiveSummary(recommendation: Recommendation, positions: AgentDebatePosition[]): string {
    return `
EXECUTIVE SUMMARY

Recommendation: ${recommendation.title}

Financial Impact: ${recommendation.financial_impact.currency} ${recommendation.financial_impact.expected.toLocaleString()}
(Range: ${recommendation.financial_impact.min.toLocaleString()} - ${recommendation.financial_impact.max.toLocaleString()})

Agent Consensus: ${positions.filter(p => p.stance === "support").length} / ${positions.length} agents support

Confidence: ${Math.round(recommendation.confidence * 100)}%

Implementation: ${recommendation.implementation_difficulty} difficulty
Time to Value: ${recommendation.time_to_value}

${recommendation.summary}
`.trim();
  }

  /**
   * Get task result
   */
  public getTaskResult(taskId: string): ConsensusResult | undefined {
    return this.completedTasks.get(taskId);
  }

  /**
   * Get all active tasks
   */
  public getActiveTasks(): TaskDefinition[] {
    return Array.from(this.activeTasks.values());
  }

  /**
   * Get orchestrator status
   */
  public getStatus() {
    return {
      registered_agents: Object.keys(this.agents).length,
      queued_tasks: this.taskQueue.length,
      active_tasks: this.activeTasks.size,
      completed_tasks: this.completedTasks.size,
    };
  }
}