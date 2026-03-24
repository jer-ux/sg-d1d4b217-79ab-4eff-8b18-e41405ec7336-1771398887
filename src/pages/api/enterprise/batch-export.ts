/**
 * Batch Export API
 * Export multiple contract reports at once
 */

import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/integrations/supabase/client";
import { generateExecutiveSummary } from "@/lib/contracts/reportGenerator";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { contract_ids, template_id, branding, format = "pdf" } = req.body;

    if (!contract_ids || contract_ids.length === 0) {
      return res.status(400).json({ error: "No contracts specified" });
    }

    // Get all contracts
    const { data: contracts, error } = await supabase
      .from("contract_analysis_results")
      .select(`
        *,
        contract_uploads!inner(storage_path, file_name)
      `)
      .in("id", contract_ids);

    if (error) {
      throw error;
    }

    if (!contracts || contracts.length === 0) {
      return res.status(404).json({ error: "No contracts found" });
    }

    // Generate reports for each contract
    const reports = await Promise.all(
      contracts.map(async (contract) => {
        const fullAnalysisResult = {
          overallScore: contract.overall_score,
          riskLevel: contract.risk_level as 'Low' | 'Medium' | 'High' | 'Critical',
          provisions: contract.detailed_analysis?.provisions || [],
          redFlags: contract.detailed_analysis?.redFlags || [],
          criticalIssuesCount: contract.analysis_summary?.critical_issues?.length || 0,
          totalRedFlags: contract.red_flags_count || 0,
          estimatedSavings: contract.potential_savings || 0,
          processingTime: contract.detailed_analysis?.processingTime || 0,
          analyzedAt: new Date().toISOString(),
          aiModel: contract.detailed_analysis?.aiModel,
          confidence: contract.detailed_analysis?.confidence
        };

        const html = generateExecutiveSummary(
          contract.contract_name,
          contract.pbm_name,
          fullAnalysisResult,
          {
            financial: 75,
            legal: 80,
            operational: 70,
            compliance: 85,
            overall: contract.overall_score
          },
          contract.overall_score,
          contract.potential_savings,
          contract.annual_cost_estimate,
          {
            companyName: branding?.company_name || "SiriusB iQ",
            confidentialityLevel: "Confidential",
          }
        );

        return {
          contract_id: contract.id,
          contract_name: contract.contract_name,
          html,
        };
      })
    );

    // Log batch export
    await supabase.from("report_history").insert({
      template_id,
      contract_ids,
      generated_by: req.headers["user-id"] as string,
      organization_id: req.headers["organization-id"] as string,
      format,
      status: "completed",
      report_count: reports.length,
    });

    return res.status(200).json({
      success: true,
      count: reports.length,
      reports,
    });
  } catch (error) {
    console.error("Error in batch export:", error);
    return res.status(500).json({ error: "Failed to batch export" });
  }
}