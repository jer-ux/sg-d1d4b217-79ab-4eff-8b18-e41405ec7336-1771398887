/**
 * KINCAID HEALTH™ AIOS
 * Base Agent Architecture
 * 
 * Foundation class for all cognitive agents in the system.
 * Implements memory, evidence tracking, reasoning history, and collaboration protocols.
 */

export interface AgentCapability {
  name: string;
  description: string;
  inputs: string[];
  outputs: string[];
  confidence_scoring: boolean;
}

export interface AgentMemory {
  working: Map<string, any>;
  historical: any[];
  case_memory: Map<string, any>;
  domain_knowledge: Map<string, any>;
}

export interface Evidence {
  id: string;
  source: string;
  type: "claim" | "contract" | "benchmark" | "calculation" | "literature" | "regulation";
  data: any;
  timestamp: Date;
  confidence: number;
  provenance: string[];
}

export interface Recommendation {
  id: string;
  agent_id: string;
  title: string;
  summary: string;
  financial_impact: {
    min: number;
    expected: number;
    max: number;
    currency: string;
  };
  confidence: number;
  evidence: Evidence[];
  alternatives: string[];
  risks: string[];
  implementation_difficulty: "low" | "medium" | "high";
  time_to_value: string;
  created_at: Date;
}

export interface AgentDebatePosition {
  agent_id: string;
  stance: "support" | "oppose" | "neutral" | "conditional";
  reasoning: string;
  evidence: Evidence[];
  confidence: number;
  conditions?: string[];
}

export interface ConsensusResult {
  recommendation_id: string;
  consensus_percentage: number;
  confidence_percentage: number;
  supporting_agents: string[];
  opposing_agents: string[];
  neutral_agents: string[];
  final_recommendation: Recommendation;
  debate_summary: string;
  executive_summary: string;
}

export abstract class BaseAgent {
  protected id: string;
  protected name: string;
  protected role: string;
  protected capabilities: AgentCapability[];
  protected memory: AgentMemory;
  protected reasoning_history: any[];
  protected evidence_graph: Map<string, Evidence>;

  constructor(id: string, name: string, role: string) {
    this.id = id;
    this.name = name;
    this.role = role;
    this.capabilities = [];
    this.memory = {
      working: new Map(),
      historical: [],
      case_memory: new Map(),
      domain_knowledge: new Map(),
    };
    this.reasoning_history = [];
    this.evidence_graph = new Map();
  }

  /**
   * Core reasoning method - must be implemented by each agent
   */
  abstract analyze(context: any): Promise<Recommendation>;

  /**
   * Debate protocol - agent evaluates another agent's recommendation
   */
  abstract debate(recommendation: Recommendation): Promise<AgentDebatePosition>;

  /**
   * Validate evidence provided by another agent
   */
  protected validateEvidence(evidence: Evidence): { valid: boolean; confidence: number; issues: string[] } {
    const issues: string[] = [];
    let confidence = evidence.confidence;

    // Check evidence age
    const ageInDays = (Date.now() - evidence.timestamp.getTime()) / (1000 * 60 * 60 * 24);
    if (ageInDays > 365) {
      issues.push("Evidence is over 1 year old");
      confidence *= 0.9;
    }

    // Check provenance
    if (!evidence.provenance || evidence.provenance.length === 0) {
      issues.push("No provenance chain");
      confidence *= 0.8;
    }

    // Check source type
    const trustedSources = ["cms", "academic", "internal_calculation", "primary_data"];
    if (!trustedSources.some(ts => evidence.source.toLowerCase().includes(ts))) {
      issues.push("Source reliability uncertain");
      confidence *= 0.9;
    }

    return {
      valid: issues.length === 0 || confidence > 0.7,
      confidence,
      issues,
    };
  }

  /**
   * Add evidence to the agent's evidence graph
   */
  protected addEvidence(evidence: Evidence): void {
    this.evidence_graph.set(evidence.id, evidence);
  }

  /**
   * Record reasoning step for audit trail
   */
  protected recordReasoning(step: {
    action: string;
    inputs: any;
    outputs: any;
    confidence: number;
    timestamp: Date;
  }): void {
    this.reasoning_history.push(step);
  }

  /**
   * Store information in working memory
   */
  protected remember(key: string, value: any): void {
    this.memory.working.set(key, value);
  }

  /**
   * Retrieve from working memory
   */
  protected recall(key: string): any {
    return this.memory.working.get(key);
  }

  /**
   * Store case in case memory for future reference
   */
  protected storeCase(caseId: string, caseData: any): void {
    this.memory.case_memory.set(caseId, {
      ...caseData,
      stored_at: new Date(),
    });
  }

  /**
   * Find similar cases from memory
   */
  protected findSimilarCases(criteria: any): any[] {
    // Simplified similarity matching - in production, use vector similarity
    const similar: any[] = [];
    this.memory.case_memory.forEach((caseData, caseId) => {
      // Basic matching logic
      similar.push({ caseId, ...caseData, similarity: 0.8 });
    });
    return similar.slice(0, 5); // Top 5
  }

  /**
   * Get agent metadata
   */
  public getMetadata() {
    return {
      id: this.id,
      name: this.name,
      role: this.role,
      capabilities: this.capabilities,
      memory_size: {
        working: this.memory.working.size,
        historical: this.memory.historical.length,
        cases: this.memory.case_memory.size,
        evidence: this.evidence_graph.size,
      },
      reasoning_steps: this.reasoning_history.length,
    };
  }

  /**
   * Clear working memory (preserves historical and case memory)
   */
  public clearWorkingMemory(): void {
    this.memory.working.clear();
  }

  /**
   * Export audit trail
   */
  public exportAuditTrail() {
    return {
      agent: this.getMetadata(),
      reasoning_history: this.reasoning_history,
      evidence: Array.from(this.evidence_graph.values()),
      timestamp: new Date(),
    };
  }
}