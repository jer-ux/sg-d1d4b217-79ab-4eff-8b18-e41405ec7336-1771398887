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
  // Generate Quick Look report
  async generateQuickLook(analysisId: string): Promise<QuickLookReport> {
    const result = await pbmContractService.getAnalysis(analysisId);
    
    const { data: version } = await supabase
      .from("pbm_full_contract_versions")
      .select(`
        *,
        pbm_full_contracts!inner (
          contract_title,
          pbm_name,
          employer_name
        )
      `)
      .eq("id", result.analysis.contract_version_id)
      .single();

    if (!version) throw new Error("Contract version not found");

    const contract = version.pbm_full_contracts as any;

    const provisionsSummary = result.provisionScores.map(ps => {
      const provision = ps.pbm_provisions as any;
      return {
        provision: provision.name,
        status: ps.score >= 75 ? "Good" as const : ps.score >= 60 ? "Concern" as const : "Red Flag" as const,
        score: ps.score,
      };
    });

    const recommendation = result.analysis.overall_score >= 75
      ? "✅ This contract demonstrates strong employer protections. Recommended for approval."
      : result.analysis.overall_score >= 60
      ? "⚠️ Contract has adequate baseline protections but warrants detailed review of identified gaps."
      : "🚨 Critical gaps identified. Detailed analysis and negotiation strongly recommended before signing.";

    return {
      contractTitle: contract.contract_title,
      pbmName: contract.pbm_name,
      employerName: contract.employer_name,
      overallScore: result.analysis.overall_score,
      ratingBand: result.analysis.rating_band,
      provisionsSummary,
      executiveSummary: result.analysis.executive_summary,
      recommendation,
    };
  }

  // Generate Scorecard report
  async generateScorecard(analysisId: string): Promise<ScorecardReport> {
    const result = await pbmContractService.getAnalysis(analysisId);
    
    const { data: version } = await supabase
      .from("pbm_full_contract_versions")
      .select(`
        pbm_full_contracts!inner (
          contract_title
        )
      `)
      .eq("id", result.analysis.contract_version_id)
      .single();

    const contract = version?.pbm_full_contracts as any;

    const provisionBreakdown = result.provisionScores.map(ps => ({
      provision: (ps.pbm_provisions as any).name,
      score: ps.score,
      band: ps.rating_band,
    }));

    const criticalFindings = result.issueFindings
      .filter(f => f.score < 2)
      .slice(0, 5)
      .map(f => {
        const issue = f.pbm_issues as any;
        return `${issue.title}: ${f.evidence_text}`;
      });

    return {
      contractTitle: contract?.contract_title || "Unknown Contract",
      overallScore: result.analysis.overall_score,
      ratingBand: result.analysis.rating_band,
      provisionBreakdown,
      keyFindings: criticalFindings,
      summary: result.analysis.executive_summary,
    };
  }

  // Generate Negotiation Guide report
  async generateNegotiationGuide(analysisId: string): Promise<NegotiationGuideReport> {
    const result = await pbmContractService.getAnalysis(analysisId);
    
    const { data: version } = await supabase
      .from("pbm_full_contract_versions")
      .select(`
        pbm_full_contracts!inner (
          contract_title
        )
      `)
      .eq("id", result.analysis.contract_version_id)
      .single();

    const contract = version?.pbm_full_contracts as any;

    const criticalGaps = result.issueFindings
      .filter(f => f.score < 2 && f.recommendation_priority === "high")
      .map(f => {
        const issue = f.pbm_issues as any;
        const provision = issue.pbm_provisions as any;
        return {
          issue: issue.title,
          provision: provision.name,
          currentLanguage: f.clause_excerpt || "No explicit language found",
          modelLanguage: f.model_language || "Model language not available",
          talkingPoints: f.talking_points ? JSON.parse(f.talking_points) : [],
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

    const strategy = result.analysis.overall_score < 60
      ? "Approach negotiations with urgency. Current terms create unacceptable risk. Prioritize the critical gaps identified and be prepared to walk away if core protections cannot be secured."
      : result.analysis.overall_score < 75
      ? "Target specific improvements in weak provisions. Use market benchmarks and model language to negotiate stronger terms. Most gaps are addressable with focused discussion."
      : "Contract is strong overall. Focus negotiations on optimization and any remaining minor gaps. Leverage strong provisions as proof of your sophistication.";

    return {
      contractTitle: contract?.contract_title || "Unknown Contract",
      overallScore: result.analysis.overall_score,
      criticalGaps,
      beforeSigningChecklist: checklist,
      negotiationStrategy: strategy,
    };
  }

  // Generate Comparison Report
  async generateComparison(baseAnalysisId: string, revisedAnalysisId: string) {
    const baseResult = await pbmContractService.getAnalysis(baseAnalysisId);
    const revisedResult = await pbmContractService.getAnalysis(revisedAnalysisId);

    const scoreDelta = revisedResult.analysis.overall_score - baseResult.analysis.overall_score;

    const provisionChanges = baseResult.provisionScores.map((basePs, idx) => {
      const revisedPs = revisedResult.provisionScores[idx];
      const provision = basePs.pbm_provisions as any;
      return {
        provision: provision.name,
        baseScore: basePs.score,
        revisedScore: revisedPs.score,
        delta: revisedPs.score - basePs.score,
        status: revisedPs.score > basePs.score ? "improved" : revisedPs.score < basePs.score ? "declined" : "unchanged",
      };
    });

    const improvements = provisionChanges.filter(c => c.delta > 0);
    const regressions = provisionChanges.filter(c => c.delta < 0);
    const unresolvedGaps = revisedResult.issueFindings.filter(f => f.score < 2);

    return {
      scoreDelta,
      baseScore: baseResult.analysis.overall_score,
      revisedScore: revisedResult.analysis.overall_score,
      baseBand: baseResult.analysis.rating_band,
      revisedBand: revisedResult.analysis.rating_band,
      provisionChanges,
      improvements,
      regressions,
      unresolvedGaps: unresolvedGaps.length,
    };
  }
}

export const pbmReportService = new PBMReportService();