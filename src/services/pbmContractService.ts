import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type Contract = Database["public"]["Tables"]["pbm_full_contracts"]["Row"];
type ContractInsert = Database["public"]["Tables"]["pbm_full_contracts"]["Insert"];
type ContractVersion = Database["public"]["Tables"]["pbm_full_contract_versions"]["Row"];
type Analysis = Database["public"]["Tables"]["pbm_full_analyses"]["Row"];
type IssueFound = Database["public"]["Tables"]["pbm_full_issue_findings"]["Row"];
type ProvisionScore = Database["public"]["Tables"]["pbm_full_provision_scores"]["Row"];

export interface ContractUploadData {
  organizationId: string;
  employerName: string;
  pbmName: string;
  contractTitle: string;
  contractType: string;
  effectiveDate: string;
  renewalDate: string;
  file: File;
  versionName?: string;
  notes?: string;
}

export interface AnalysisResult {
  analysis: Analysis;
  issueFindings: IssueFound[];
  provisionScores: ProvisionScore[];
}

class PBMContractService {
  // Upload contract and create initial version
  async uploadContract(data: ContractUploadData): Promise<{ contractId: string; versionId: string }> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Not authenticated");

    // Upload file to Supabase Storage
    const fileName = `${data.organizationId}/${Date.now()}_${data.file.name}`;
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("contracts")
      .upload(fileName, data.file);

    if (uploadError) throw uploadError;

    const fileUrl = supabase.storage.from("contracts").getPublicUrl(fileName).data.publicUrl;

    // Create contract record
    const contractData: ContractInsert = {
      organization_id: data.organizationId,
      employer_name: data.employerName,
      pbm_name: data.pbmName,
      contract_title: data.contractTitle,
      contract_type: data.contractType,
      effective_date: data.effectiveDate,
      renewal_date: data.renewalDate,
      status: "uploaded",
      uploaded_file_url: fileUrl,
      created_by: user.id,
    };

    const { data: contract, error: contractError } = await supabase
      .from("pbm_full_contracts")
      .insert(contractData)
      .select()
      .single();

    if (contractError) throw contractError;

    // Create initial version
    const { data: version, error: versionError } = await supabase
      .from("pbm_full_contract_versions")
      .insert({
        contract_id: contract.id,
        version_name: data.versionName || "v1.0",
        file_url: fileUrl,
      })
      .select()
      .single();

    if (versionError) throw versionError;

    return { contractId: contract.id, versionId: version.id };
  }

  // Get contract with versions and analyses
  async getContract(contractId: string) {
    const { data, error } = await supabase
      .from("pbm_full_contracts")
      .select(`
        *,
        pbm_full_contract_versions (
          *,
          pbm_full_analyses (
            *,
            pbm_full_provision_scores (*),
            pbm_full_issue_findings (*)
          )
        )
      `)
      .eq("id", contractId)
      .single();

    if (error) throw error;
    return data;
  }

  // List contracts for organization
  async listContracts(organizationId: string) {
    const { data, error } = await supabase
      .from("pbm_full_contracts")
      .select(`
        *,
        pbm_full_contract_versions!inner (
          id,
          version_name,
          pbm_full_analyses (
            id,
            overall_score,
            rating_band,
            status
          )
        )
      `)
      .eq("organization_id", organizationId)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data || [];
  }

  // Get analysis with all findings
  async getAnalysis(analysisId: string): Promise<AnalysisResult> {
    const { data: analysis, error: analysisError } = await supabase
      .from("pbm_full_analyses")
      .select("*")
      .eq("id", analysisId)
      .single();

    if (analysisError) throw analysisError;

    const { data: findings, error: findingsError } = await supabase
      .from("pbm_full_issue_findings")
      .select(`
        *,
        pbm_issues!inner (
          code,
          title,
          description,
          model_language,
          talking_points,
          pbm_provisions!inner (
            code,
            name
          )
        )
      `)
      .eq("analysis_id", analysisId);

    if (findingsError) throw findingsError;

    const { data: provisionScores, error: scoresError } = await supabase
      .from("pbm_full_provision_scores")
      .select(`
        *,
        pbm_provisions!inner (
          code,
          name,
          description
        )
      `)
      .eq("analysis_id", analysisId)
      .order("pbm_provisions(display_order)");

    if (scoresError) throw scoresError;

    return {
      analysis,
      issueFindings: findings || [],
      provisionScores: provisionScores || [],
    };
  }

  // Calculate rating band from score
  getRatingBand(score: number): string {
    if (score >= 90) return "Excellent";
    if (score >= 75) return "Good";
    if (score >= 60) return "Fair";
    if (score >= 45) return "Concern";
    return "Red Flag";
  }

  // Get color for rating band
  getRatingColor(band: string): string {
    switch (band) {
      case "Excellent": return "text-green-600 bg-green-50 border-green-200";
      case "Good": return "text-blue-600 bg-blue-50 border-blue-200";
      case "Fair": return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "Concern": return "text-orange-600 bg-orange-50 border-orange-200";
      case "Red Flag": return "text-red-600 bg-red-50 border-red-200";
      default: return "text-gray-600 bg-gray-50 border-gray-200";
    }
  }

  // Create comparison between two analyses
  async createComparison(baseAnalysisId: string, revisedAnalysisId: string) {
    const baseResult = await this.getAnalysis(baseAnalysisId);
    const revisedResult = await this.getAnalysis(revisedAnalysisId);

    const scoreDelta = revisedResult.analysis.overall_score - baseResult.analysis.overall_score;

    const { data, error } = await supabase
      .from("pbm_full_comparisons")
      .insert({
        base_analysis_id: baseAnalysisId,
        revised_analysis_id: revisedAnalysisId,
        score_delta: scoreDelta,
        summary: `Score ${scoreDelta >= 0 ? "improved" : "declined"} by ${Math.abs(scoreDelta).toFixed(1)} points`,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Get upcoming renewals
  async getUpcomingRenewals(organizationId: string, daysAhead: number = 90) {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + daysAhead);

    const { data, error } = await supabase
      .from("pbm_full_contracts")
      .select("*")
      .eq("organization_id", organizationId)
      .lte("renewal_date", futureDate.toISOString())
      .gte("renewal_date", new Date().toISOString())
      .order("renewal_date", { ascending: true });

    if (error) throw error;
    return data || [];
  }

  // Dashboard analytics
  async getDashboardStats(organizationId: string) {
    const { data: contracts } = await supabase
      .from("pbm_full_contracts")
      .select(`
        *,
        pbm_full_contract_versions!inner (
          pbm_full_analyses (
            overall_score,
            rating_band
          )
        )
      `)
      .eq("organization_id", organizationId);

    const analyses = contracts?.flatMap(c => 
      c.pbm_full_contract_versions?.flatMap(v => v.pbm_full_analyses || []) || []
    ) || [];

    const totalContracts = contracts?.length || 0;
    const avgScore = analyses.length > 0
      ? analyses.reduce((sum, a) => sum + a.overall_score, 0) / analyses.length
      : 0;

    const bandCounts = analyses.reduce((acc, a) => {
      acc[a.rating_band] = (acc[a.rating_band] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      totalContracts,
      avgScore: Math.round(avgScore * 10) / 10,
      totalAnalyses: analyses.length,
      bandCounts,
    };
  }
}

export const pbmContractService = new PBMContractService();