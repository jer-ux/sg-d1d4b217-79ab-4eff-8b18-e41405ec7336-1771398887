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

export interface UploadProgress {
  status: 'uploading' | 'processing' | 'complete' | 'error';
  progress: number;
  message: string;
}

class PBMContractService {
  async uploadContract(
    data: ContractUploadData,
    onProgress?: (progress: UploadProgress) => void
  ): Promise<{ contractId: string; versionId: string }> {
    try {
      // Check authentication first
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      
      if (authError || !user) {
        // If no auth, use demo mode - create local records
        console.warn("No authentication - using demo mode");
        return this.uploadContractDemo(data, onProgress);
      }

      // Step 1: Update progress - Starting upload
      onProgress?.({
        status: 'uploading',
        progress: 10,
        message: 'Preparing file upload...'
      });

      // Generate unique file path
      const timestamp = Date.now();
      const sanitizedFileName = data.file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
      const filePath = `${user.id}/${timestamp}_${sanitizedFileName}`;

      // Step 2: Upload to Supabase Storage
      onProgress?.({
        status: 'uploading',
        progress: 30,
        message: 'Uploading file to secure storage...'
      });

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('contracts')
        .upload(filePath, data.file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) {
        console.error("Storage upload error:", uploadError);
        throw new Error(`File upload failed: ${uploadError.message}`);
      }

      // Step 3: Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('contracts')
        .getPublicUrl(filePath);

      onProgress?.({
        status: 'processing',
        progress: 60,
        message: 'Creating contract record...'
      });

      // Step 4: Create contract record
      const contractData: ContractInsert = {
        organization_id: data.organizationId,
        employer_name: data.employerName,
        pbm_name: data.pbmName,
        contract_title: data.contractTitle,
        contract_type: data.contractType,
        effective_date: data.effectiveDate,
        renewal_date: data.renewalDate,
        status: 'uploaded',
        uploaded_file_url: publicUrl,
        created_by: user.id,
      };

      const { data: contract, error: contractError } = await (supabase as any)
        .from("pbm_full_contracts")
        .insert(contractData)
        .select()
        .single();

      if (contractError) {
        console.error("Contract insert error:", contractError);
        throw new Error(`Failed to create contract record: ${contractError.message}`);
      }

      onProgress?.({
        status: 'processing',
        progress: 80,
        message: 'Creating version record...'
      });

      // Step 5: Create version record
      const { data: version, error: versionError } = await (supabase as any)
        .from("pbm_full_contract_versions")
        .insert({
          contract_id: contract.id,
          version_name: data.versionName || "v1.0",
          file_url: publicUrl,
          created_by: user.id,
          notes: data.notes,
        })
        .select()
        .single();

      if (versionError) {
        console.error("Version insert error:", versionError);
        throw new Error(`Failed to create version record: ${versionError.message}`);
      }

      // Step 6: Create upload tracking record
      await (supabase as any)
        .from("contract_uploads")
        .insert({
          contract_id: contract.id,
          file_path: filePath,
          file_size: data.file.size,
          upload_status: 'completed',
          uploaded_by: user.id,
        });

      onProgress?.({
        status: 'complete',
        progress: 100,
        message: 'Upload complete!'
      });

      return { contractId: contract.id, versionId: version.id };

    } catch (error: any) {
      console.error("Upload error:", error);
      onProgress?.({
        status: 'error',
        progress: 0,
        message: error.message || 'Upload failed'
      });
      throw error;
    }
  }

  // Demo mode fallback for non-authenticated users
  private async uploadContractDemo(
    data: ContractUploadData,
    onProgress?: (progress: UploadProgress) => void
  ): Promise<{ contractId: string; versionId: string }> {
    // Simulate upload progress
    onProgress?.({
      status: 'uploading',
      progress: 30,
      message: 'Processing demo upload...'
    });

    await new Promise(resolve => setTimeout(resolve, 500));

    onProgress?.({
      status: 'processing',
      progress: 70,
      message: 'Creating demo contract...'
    });

    await new Promise(resolve => setTimeout(resolve, 500));

    // Generate demo IDs
    const demoContractId = `demo-contract-${Date.now()}`;
    const demoVersionId = `demo-version-${Date.now()}`;

    onProgress?.({
      status: 'complete',
      progress: 100,
      message: 'Demo contract created!'
    });

    return { contractId: demoContractId, versionId: demoVersionId };
  }

  async getContract(contractId: string) {
    const { data: contract, error: contractError } = await (supabase as any)
      .from("pbm_full_contracts")
      .select("*")
      .eq("id", contractId)
      .single();

    if (contractError) {
      console.error("Get contract error:", contractError);
      throw new Error(`Failed to get contract: ${contractError.message}`);
    }

    const { data: versions } = await (supabase as any)
      .from("pbm_full_contract_versions")
      .select("*")
      .eq("contract_id", contractId)
      .order("created_at", { ascending: false });

    if (versions && versions.length > 0) {
      const versionIds = versions.map((v: any) => v.id);
      const { data: analyses } = await (supabase as any)
        .from("pbm_full_analyses")
        .select("*")
        .in("contract_version_id", versionIds)
        .order("created_at", { ascending: false });

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

    if (error) {
      console.error("List contracts error:", error);
      throw new Error(`Failed to list contracts: ${error.message}`);
    }
    
    return data || [];
  }

  async getAnalysis(analysisId: string): Promise<any> {
    const { data: analysis, error: analysisError } = await (supabase as any)
      .from("pbm_full_analyses")
      .select("*")
      .eq("id", analysisId)
      .single();

    if (analysisError) {
      console.error("Get analysis error:", analysisError);
      throw new Error(`Failed to get analysis: ${analysisError.message}`);
    }

    const { data: findings, error: findingsError } = await (supabase as any)
      .from("pbm_full_issue_findings")
      .select("*")
      .eq("analysis_id", analysisId);

    if (findingsError) {
      console.error("Get findings error:", findingsError);
    }

    const { data: provisionScores, error: scoresError } = await (supabase as any)
      .from("pbm_full_provision_scores")
      .select("*")
      .eq("analysis_id", analysisId);

    if (scoresError) {
      console.error("Get scores error:", scoresError);
    }

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

    if (error) {
      console.error("Create comparison error:", error);
      throw new Error(`Failed to create comparison: ${error.message}`);
    }
    
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

    if (error) {
      console.error("Get renewals error:", error);
      throw new Error(`Failed to get renewals: ${error.message}`);
    }
    
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