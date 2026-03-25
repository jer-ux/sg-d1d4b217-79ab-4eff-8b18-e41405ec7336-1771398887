import { supabase } from "@/integrations/supabase/client";

type Contract = any;
type ContractInsert = any;
type ContractVersion = any;
type Analysis = any;
type IssueFound = any;
type ProvisionScore = any;

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
  async uploadContract(data: ContractUploadData): Promise<{ contractId: string; versionId: string }> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Not authenticated");

    const fileName = `${data.organizationId}/${Date.now()}_${data.file.name}`;
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("contracts")
      .upload(fileName, data.file);

    if (uploadError) throw uploadError;

    const fileUrl = supabase.storage.from("contracts").getPublicUrl(fileName).data.publicUrl;

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

    const { data: contract, error: contractError } = await (supabase as any)
      .from("pbm_full_contracts")
      .insert(contractData)
      .select()
      .single();

    if (contractError) throw contractError;

    const { data: version, error: versionError } = await (supabase as any)
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

  async getContract(contractId: string) {
    const { data: contract, error: contractError } = await (supabase as any)
      .from("pbm_full_contracts")
      .select("*")
      .eq("id", contractId)
      .single();

    if (contractError) throw contractError;

    const { data: versions } = await (supabase as any)
      .from("pbm_full_contract_versions")
      .select("*")
      .eq("contract_id", contractId);

    if (versions && versions.length > 0) {
      const versionIds = versions.map((v: any) => v.id);
      const { data: analyses } = await (supabase as any)
        .from("pbm_full_analyses")
        .select("*")
        .in("contract_version_id", versionIds);

      return {
        ...(contract || {}),
        versions: versions.map((v: any) => ({
          ...v,
          analyses: analyses?.filter((a: any) => a.contract_version_id === v.id) || []
        }))
      };
    }

    return { ...(contract || {}), versions: [] };
  }

  async listContracts(organizationId: string) {
    const { data, error } = await (supabase as any)
      .from("pbm_full_contracts")
      .select("*")
      .eq("organization_id", organizationId)
      .order("created_at", { ascending: false });

    if (error) throw error;
    
    return data || [];
  }

  async getAnalysis(analysisId: string): Promise<any> {
    const { data: analysis, error: analysisError } = await (supabase as any)
      .from("pbm_full_analyses")
      .select("*")
      .eq("id", analysisId)
      .single();

    if (analysisError) throw analysisError;

    const { data: findings, error: findingsError } = await (supabase as any)
      .from("pbm_full_issue_findings")
      .select("*")
      .eq("analysis_id", analysisId);

    if (findingsError) throw findingsError;

    const { data: provisionScores, error: scoresError } = await (supabase as any)
      .from("pbm_full_provision_scores")
      .select("*")
      .eq("analysis_id", analysisId);

    if (scoresError) throw scoresError;

    return {
      analysis,
      issueFindings: findings || [],
      provisionScores: provisionScores || [],
    };
  }

  getRatingBand(score: number): string {
    if (score >= 90) return "Excellent";
    if (score >= 75) return "Good";
    if (score >= 60) return "Fair";
    if (score >= 45) return "Concern";
    return "Red Flag";
  }

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

  async createComparison(baseAnalysisId: string, revisedAnalysisId: string) {
    const baseResult = await this.getAnalysis(baseAnalysisId);
    const revisedResult = await this.getAnalysis(revisedAnalysisId);

    const scoreDelta = (revisedResult.analysis.overall_score || 0) - (baseResult.analysis.overall_score || 0);

    const { data, error } = await (supabase as any)
      .from("pbm_full_comparisons")
      .insert({
        base_analysis_id: baseAnalysisId,
        revised_analysis_id: revisedAnalysisId,
        score_delta: scoreDelta,
        summary: { text: `Score ${scoreDelta >= 0 ? "improved" : "declined"} by ${Math.abs(scoreDelta).toFixed(1)} points` },
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async getUpcomingRenewals(organizationId: string, daysAhead: number = 90) {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + daysAhead);

    const { data, error } = await (supabase as any)
      .from("pbm_full_contracts")
      .select("*")
      .eq("organization_id", organizationId)
      .lte("renewal_date", futureDate.toISOString())
      .gte("renewal_date", new Date().toISOString())
      .order("renewal_date", { ascending: true });

    if (error) throw error;
    return data || [];
  }

  async getDashboardStats(organizationId: string) {
    const { data: contracts } = await (supabase as any)
      .from("pbm_full_contracts")
      .select("id")
      .eq("organization_id", organizationId);

    return {
      totalContracts: contracts?.length || 0,
      avgScore: 0,
      totalAnalyses: 0,
      bandCounts: {},
    };
  }
}

export const pbmContractService = new PBMContractService();