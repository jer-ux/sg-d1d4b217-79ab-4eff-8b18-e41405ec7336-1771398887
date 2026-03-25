import { supabase } from "@/integrations/supabase/client";

type Analysis = any;
type IssueFound = any;
type ProvisionScore = any;

interface MockAnalysisResult {
  overallScore: number;
  ratingBand: string;
  executiveSummary: string;
  issueFindings: IssueFound[];
  provisionScores: ProvisionScore[];
}

class PBMAnalysisService {
  async generateMockAnalysis(contractVersionId: string): Promise<string> {
    const { data: provisions } = await (supabase as any)
      .from("pbm_provisions")
      .select("*")
      .eq("version_set", "v1")
      .order("display_order");

    const { data: issues } = await (supabase as any)
      .from("pbm_issues")
      .select("*")
      .eq("active_version", "v1");

    if (!provisions || !issues) throw new Error("Standards not loaded");

    const issueFindings: IssueFound[] = issues.map((issue: any) => {
      const score = Math.floor(Math.random() * 5);
      return {
        analysis_id: "", 
        issue_id: issue.id,
        score,
        finding_status: score >= 3 ? "pass" : score >= 2 ? "review" : "fail",
        clause_excerpt: this.generateMockExcerpt(issue.title),
        evidence_text: this.generateMockEvidence(issue.title, score),
        rationale: this.generateMockRationale(issue.title, score),
        confidence: score >= 3 ? "high" : score >= 1 ? "medium" : "low",
        recommendation_priority: score < 2 ? "high" : score < 3 ? "medium" : "low",
        model_language: issue.model_language,
        talking_points: issue.talking_points,
      };
    });

    const provisionScores: ProvisionScore[] = provisions.map((provision: any) => {
      const provisionIssues = issues.filter((i: any) => i.provision_id === provision.id);
      const provisionFindings = issueFindings.filter((f: any) => 
        provisionIssues.some((pi: any) => pi.id === f.issue_id)
      );

      const avgScore = provisionFindings.length > 0
        ? provisionFindings.reduce((sum: number, f: any) => sum + f.score, 0) / provisionFindings.length
        : 0;

      const normalizedScore = (avgScore / 4) * 100;

      return {
        analysis_id: "", 
        provision_id: provision.id,
        score: Math.round(normalizedScore * 10) / 10,
        rating_band: this.getRatingBand(normalizedScore),
        summary: this.generateProvisionSummary(provision.name, normalizedScore),
      };
    });

    const weightedSum = provisionScores.reduce(
      (sum: number, ps: any) => {
        const provision = provisions.find((p: any) => p.id === ps.provision_id);
        return sum + ps.score * (provision?.weight || 1);
      },
      0
    );

    const totalWeight = provisions.reduce((sum: number, p: any) => sum + p.weight, 0);
    const overallScore = Math.round((weightedSum / totalWeight) * 10) / 10;
    const ratingBand = this.getRatingBand(overallScore);

    const { data: analysis, error: analysisError } = await (supabase as any)
      .from("pbm_full_analyses")
      .insert({
        contract_version_id: contractVersionId,
        overall_score: overallScore,
        rating_band: ratingBand,
        executive_summary: this.generateExecutiveSummary(overallScore, ratingBand, provisionScores),
        status: "completed",
        analyzed_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (analysisError) throw analysisError;

    const findingsWithAnalysisId = issueFindings.map((f: any) => ({
      ...f,
      analysis_id: analysis.id,
    }));

    const { error: findingsError } = await (supabase as any)
      .from("pbm_full_issue_findings")
      .insert(findingsWithAnalysisId);

    if (findingsError) throw findingsError;

    const scoresWithAnalysisId = provisionScores.map((s: any) => ({
      ...s,
      analysis_id: analysis.id,
    }));

    const { error: scoresError } = await (supabase as any)
      .from("pbm_full_provision_scores")
      .insert(scoresWithAnalysisId);

    if (scoresError) throw scoresError;

    const { data: version } = await (supabase as any)
      .from("pbm_full_contract_versions")
      .select("contract_id")
      .eq("id", contractVersionId)
      .single();

    if (version) {
      await (supabase as any)
        .from("pbm_full_contracts")
        .update({ status: "analyzed" })
        .eq("id", version.contract_id);
    }

    return analysis.id;
  }

  private getRatingBand(score: number): string {
    if (score >= 90) return "Excellent";
    if (score >= 75) return "Good";
    if (score >= 60) return "Fair";
    if (score >= 45) return "Concern";
    return "Red Flag";
  }

  private generateMockExcerpt(issueTitle: string): string {
    const excerpts = [
      "Section 4.2: PBM shall provide detailed quarterly reports...",
      "Article 7.1: Maximum allowable cost (MAC) pricing shall be based on...",
      "Clause 9.3: Plan Sponsor reserves the right to audit all claims...",
      "Section 12.4: Rebate pass-through shall be calculated as...",
      "Article 5.6: Prior authorization criteria shall be clearly disclosed...",
    ];
    return excerpts[Math.floor(Math.random() * excerpts.length)];
  }

  private generateMockEvidence(issueTitle: string, score: number): string {
    if (score >= 3) {
      return `Strong explicit language found addressing ${issueTitle.toLowerCase()}. Contract includes clear definitions, specific requirements, and enforcement mechanisms.`;
    } else if (score >= 2) {
      return `Partial language found for ${issueTitle.toLowerCase()}. Some protections exist but lack specificity or have limiting qualifications.`;
    } else if (score >= 1) {
      return `Weak or ambiguous language regarding ${issueTitle.toLowerCase()}. Contract references concept but lacks enforceable terms.`;
    } else {
      return `No protective language found for ${issueTitle.toLowerCase()}. Critical gap that exposes employer to risk.`;
    }
  }

  private generateMockRationale(issueTitle: string, score: number): string {
    if (score >= 3) {
      return `This provision demonstrates industry-leading transparency and accountability. The explicit language provides strong contractual protection.`;
    } else if (score >= 2) {
      return `While some protections exist, the language could be strengthened to provide more comprehensive coverage and enforceability.`;
    } else if (score >= 1) {
      return `The current language is insufficient to provide meaningful protection. Recommend adding specific requirements and audit rights.`;
    } else {
      return `Critical gap. The absence of this protection creates significant financial and operational risk. Immediate negotiation required.`;
    }
  }

  private generateProvisionSummary(provisionName: string, score: number): string {
    const band = this.getRatingBand(score);
    return `${provisionName}: ${band} (${score.toFixed(1)}/100). ${
      score >= 75 
        ? "Strong protections in place." 
        : score >= 60 
        ? "Adequate but could be strengthened." 
        : "Significant gaps requiring attention."
    }`;
  }

  private generateExecutiveSummary(
    overallScore: number,
    ratingBand: string,
    provisionScores: ProvisionScore[]
  ): string {
    const weakProvisions = provisionScores.filter((ps: any) => ps.score < 60);
    
    return `Overall Contract Assessment: ${ratingBand} (${overallScore}/100)

This PBM contract ${
      overallScore >= 75 
        ? "demonstrates strong employer protections across most key provisions" 
        : overallScore >= 60 
        ? "provides adequate baseline protections but has notable gaps" 
        : "contains significant gaps in critical areas requiring immediate attention"
    }.

${
      weakProvisions.length > 0 
        ? `Key Concerns: ${weakProvisions.length} provision${weakProvisions.length > 1 ? "s" : ""} scored below acceptable thresholds, including areas related to transparency, audit rights, and financial protections.`
        : "All key provisions meet or exceed industry standards."
}

Recommendation: ${
      overallScore >= 75 
        ? "Proceed with contract execution. Monitor compliance during implementation." 
        : overallScore >= 60 
        ? "Negotiate improvements in identified weak areas before signing." 
        : "Require substantial contract amendments before proceeding. Current terms create unacceptable risk."
}`;
  }

  async approveAnalysis(analysisId: string, userId: string) {
    const { data, error } = await (supabase as any)
      .from("pbm_full_analyses")
      .update({
        status: "approved",
        approved_at: new Date().toISOString(),
        approved_by: userId,
      })
      .eq("id", analysisId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async updateIssueFinding(
    findingId: string,
    updates: {
      score?: number;
      reviewerOverride?: boolean;
      reviewerNotes?: string;
    }
  ) {
    const { data, error } = await (supabase as any)
      .from("pbm_full_issue_findings")
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq("id", findingId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }
}

export const pbmAnalysisService = new PBMAnalysisService();