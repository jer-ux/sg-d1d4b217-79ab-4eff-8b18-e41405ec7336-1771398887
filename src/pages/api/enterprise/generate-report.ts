/**
 * Enterprise Report Generation API
 * Generates reports with enterprise features
 */

import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/integrations/supabase/client";
import { generateExecutiveSummary, generatePDFReport } from "@/lib/contracts/reportGenerator";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const {
      template_id,
      contract_ids,
      date_range,
      filters,
      branding,
      confidentiality_level,
    } = req.body;

    // Get contract analysis data
    let query = supabase
      .from("contract_analysis_results")
      .select(`
        *,
        contract_uploads!inner(storage_path, file_name)
      `);

    if (contract_ids && contract_ids.length > 0) {
      query = query.in("id", contract_ids);
    }

    if (date_range) {
      query = query
        .gte("created_at", date_range.start)
        .lte("created_at", date_range.end);
    }

    const { data: contracts, error } = await query;

    if (error) {
      throw error;
    }

    if (!contracts || contracts.length === 0) {
      return res.status(404).json({ error: "No contracts found" });
    }

    // For single contract, generate detailed report
    if (contracts.length === 1) {
      const contract = contracts[0] as any;
      const detailedAnalysis = contract.detailed_analysis;
      const analysisSummary = contract.analysis_summary;

      const fullAnalysisResult = {
        overallScore: contract.overall_score,
        riskLevel: contract.risk_level as 'Low' | 'Medium' | 'High' | 'Critical',
        provisions: detailedAnalysis?.provisions || [],
        redFlags: detailedAnalysis?.redFlags || [],
        criticalIssuesCount: analysisSummary?.critical_issues?.length || 0,
        totalRedFlags: contract.red_flags_count || 0,
        estimatedSavings: contract.potential_savings || 0,
        processingTime: detailedAnalysis?.processingTime || 0,
        analyzedAt: new Date().toISOString(),
        aiModel: detailedAnalysis?.aiModel,
        confidence: detailedAnalysis?.confidence
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
          confidentialityLevel: confidentiality_level || "Confidential",
          companyLogo: branding?.logo_url,
        }
      );

      // Store report in history
      const { data: reportRecord, error: insertError } = await supabase
        .from("report_history")
        .insert({
          template_id,
          contract_ids: [contract.id],
          generated_by: req.headers["user-id"] as string,
          organization_id: req.headers["organization-id"] as string,
          format: "pdf",
          status: "completed",
        })
        .select()
        .single();

      if (insertError) {
        console.error("Error storing report:", insertError);
      }

      return res.status(200).json({
        report_id: reportRecord?.id,
        html,
        contract_name: contract.contract_name,
      });
    }

    // For multiple contracts, generate summary report
    const summaryData = {
      totalContracts: contracts.length,
      averageScore: contracts.reduce((sum, c) => sum + c.overall_score, 0) / contracts.length,
      totalSavings: contracts.reduce((sum, c) => sum + c.potential_savings, 0),
      riskDistribution: {
        critical: contracts.filter(c => c.risk_level === "Critical").length,
        high: contracts.filter(c => c.risk_level === "High").length,
        medium: contracts.filter(c => c.risk_level === "Medium").length,
        low: contracts.filter(c => c.risk_level === "Low").length,
      },
      contracts: contracts.map(c => ({
        name: c.contract_name,
        pbm: c.pbm_name,
        score: c.overall_score,
        savings: c.potential_savings,
        risk: c.risk_level,
      })),
    };

    return res.status(200).json({
      summary: summaryData,
      contracts: contracts.length,
    });
  } catch (error) {
    console.error("Error generating report:", error);
    return res.status(500).json({ error: "Failed to generate report" });
  }
}