import { supabase } from "@/integrations/supabase/client";
import { pbmContractService } from "./pbmContractService";

interface QuickLookReport {
  contractTitle: string;
  pbmName: string;
  employerName: string;
  overallScore: number;
  ratingBand: string;
  provisionsSummary: {
    provision: string;
    status: "Good" | "Concern" | "Red Flag";
    score: number;
  }[];
  executiveSummary: string;
  recommendation: string;
}

interface ScorecardReport {
  contractTitle: string;
  overallScore: number;
  ratingBand: string;
  provisionBreakdown: {
    provision: string;
    score: number;
    band: string;
  }[];
  keyFindings: string[];
  summary: string;
}

interface NegotiationGuideReport {
  contractTitle: string;
  overallScore: number;
  criticalGaps: {
    issue: string;
    provision: string;
    currentLanguage: string;
    modelLanguage: string;
    talkingPoints: string[];
  }[];
  beforeSigningChecklist: string[];
  negotiationStrategy: string;
}

class PBMReportService {
  async generateQuickLook(analysisId: string): Promise<QuickLookReport> {
    const result = await pbmContractService.getAnalysis(analysisId);
    
    const { data: version } = await supabase
      .from("pbm_full_contract_versions" as any)
      .select("contract_id")
      .eq("id", result.analysis.contract_version_id)
      .single();

    if (!version) throw new Error("Contract version not found");

    const { data: contract } = await supabase
      .from("pbm_full_contracts" as any)
      .select("contract_title, pbm_name, employer_name")
      .eq("id", version.contract_id)
      .single();

    const provisionsSummary = result.provisionScores.map((ps: any) => {
      return {
        provision: "Provision", 
        status: ps.score >= 75 ? "Good" as const : ps.score >= 60 ? "Concern" as const : "Red Flag" as const,
        score: ps.score,
      };
    });

    const overallScore = result.analysis.overall_score || 0;
    const recommendation = overallScore >= 75
      ? "✅ This contract demonstrates strong employer protections. Recommended for approval."
      : overallScore >= 60
      ? "⚠️ Contract has adequate baseline protections but warrants detailed review of identified gaps."
      : "🚨 Critical gaps identified. Detailed analysis and negotiation strongly recommended before signing.";

    return {
      contractTitle: contract?.contract_title || "Unknown",
      pbmName: contract?.pbm_name || "Unknown",
      employerName: contract?.employer_name || "Unknown",
      overallScore: overallScore,
      ratingBand: result.analysis.rating_band || "Unknown",
      provisionsSummary,
      executiveSummary: result.analysis.executive_summary || "",
      recommendation,
    };
  }

  async generateScorecard(analysisId: string): Promise<ScorecardReport> {
    const result = await pbmContractService.getAnalysis(analysisId);
    
    const { data: version } = await supabase
      .from("pbm_full_contract_versions" as any)
      .select("contract_id")
      .eq("id", result.analysis.contract_version_id)
      .single();

    let contractTitle = "Unknown Contract";
    if (version) {
      const { data: contract } = await supabase
        .from("pbm_full_contracts" as any)
        .select("contract_title")
        .eq("id", version.contract_id)
        .single();
      
      if (contract) contractTitle = contract.contract_title;
    }

    const provisionBreakdown = result.provisionScores.map((ps: any) => ({
      provision: "Provision", 
      score: ps.score,
      band: ps.rating_band || "Unknown",
    }));

    const criticalFindings = result.issueFindings
      .filter((f: any) => f.score < 2)
      .slice(0, 5)
      .map((f: any) => `Issue: ${f.evidence_text || ''}`);

    return {
      contractTitle,
      overallScore: result.analysis.overall_score || 0,
      ratingBand: result.analysis.rating_band || "Unknown",
      provisionBreakdown,
      keyFindings: criticalFindings,
      summary: result.analysis.executive_summary || "",
    };
  }

  async generateNegotiationGuide(analysisId: string): Promise<NegotiationGuideReport> {
    const result = await pbmContractService.getAnalysis(analysisId);
    
    const { data: version } = await supabase
      .from("pbm_full_contract_versions" as any)
      .select("contract_id")
      .eq("id", result.analysis.contract_version_id)
      .single();

    let contractTitle = "Unknown Contract";
    if (version) {
      const { data: contract } = await supabase
        .from("pbm_full_contracts" as any)
        .select("contract_title")
        .eq("id", version.contract_id)
        .single();
      
      if (contract) contractTitle = contract.contract_title;
    }

    const criticalGaps = result.issueFindings
      .filter((f: any) => f.score < 2 && f.recommendation_priority === "high")
      .map((f: any) => {
        let talkingPoints = [];
        try {
          if (f.talking_points) talkingPoints = JSON.parse(f.talking_points);
        } catch (e) {}

        return {
          issue: "Issue Title", 
          provision: "Provision Name", 
          currentLanguage: f.clause_excerpt || "No explicit language found",
          modelLanguage: f.model_language || "Model language not available",
          talkingPoints,
        };
      });

    const checklist = [
      "Verify all pricing terms are explicit and auditable",
      "Confirm rebate pass-through percentages and timing",
      "Review audit rights and frequency provisions",
      "Validate MAC pricing methodology and update frequency",
      "Check prior authorization criteria transparency",
      "Confirm clinical oversight and P&T committee composition",
      "Review termination and transition assistance terms",
      "Validate data ownership and portability provisions",
    ];

    const overallScore = result.analysis.overall_score || 0;
    const strategy = overallScore < 60
      ? "Approach negotiations with urgency. Current terms create unacceptable risk. Prioritize the critical gaps identified and be prepared to walk away if core protections cannot be secured."
      : overallScore < 75
      ? "Target specific improvements in weak provisions. Use market benchmarks and model language to negotiate stronger terms. Most gaps are addressable with focused discussion."
      : "Contract is strong overall. Focus negotiations on optimization and any remaining minor gaps. Leverage strong provisions as proof of your sophistication.";

    return {
      contractTitle,
      overallScore,
      criticalGaps,
      beforeSigningChecklist: checklist,
      negotiationStrategy: strategy,
    };
  }

  async generateComparison(baseAnalysisId: string, revisedAnalysisId: string) {
    const baseResult = await pbmContractService.getAnalysis(baseAnalysisId);
    const revisedResult = await pbmContractService.getAnalysis(revisedAnalysisId);

    const baseOverallScore = baseResult.analysis.overall_score || 0;
    const revisedOverallScore = revisedResult.analysis.overall_score || 0;
    const scoreDelta = revisedOverallScore - baseOverallScore;

    const provisionChanges = baseResult.provisionScores.map((basePs: any, idx: number) => {
      const revisedPs = revisedResult.provisionScores[idx] || basePs;
      return {
        provision: "Provision Name", 
        baseScore: basePs.score,
        revisedScore: revisedPs.score,
        delta: revisedPs.score - basePs.score,
        status: revisedPs.score > basePs.score ? "improved" : revisedPs.score < basePs.score ? "declined" : "unchanged",
      };
    });

    const improvements = provisionChanges.filter((c: any) => c.delta > 0);
    const regressions = provisionChanges.filter((c: any) => c.delta < 0);
    const unresolvedGaps = revisedResult.issueFindings.filter((f: any) => f.score < 2);

    return {
      scoreDelta,
      baseScore: baseOverallScore,
      revisedScore: revisedOverallScore,
      baseBand: baseResult.analysis.rating_band || "Unknown",
      revisedBand: revisedResult.analysis.rating_band || "Unknown",
      provisionChanges,
      improvements,
      regressions,
      unresolvedGaps: unresolvedGaps.length,
    };
  }
}

export const pbmReportService = new PBMReportService();