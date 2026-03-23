import type { ContractAnalysisResult, ProvisionAnalysis, RedFlag } from "./types";
import OpenAI from "openai";

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
  dangerouslyAllowBrowser: false // Server-side only
});

/**
 * Analyze contract using OpenAI GPT-4
 * This is the REAL AI analysis (not mock)
 */
export async function analyzeContractWithAI(
  contractText: string,
  fileName: string
): Promise<ContractAnalysisResult> {
  
  const startTime = Date.now();

  try {
    // If no API key, fall back to mock analysis
    if (!process.env.OPENAI_API_KEY) {
      console.warn("⚠️ No OpenAI API key found, using mock analysis");
      return analyzeMockContract(fileName, 0);
    }

    console.log("🤖 Starting AI analysis with OpenAI GPT-4...");

    // Prepare analysis prompt
    const prompt = buildAnalysisPrompt(contractText, fileName);

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        {
          role: "system",
          content: "You are an expert PBM contract analyst with 20+ years experience identifying hidden costs, unfavorable terms, and savings opportunities in pharmacy benefit management contracts."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.3, // Lower temperature for more consistent analysis
      max_tokens: 4000,
      response_format: { type: "json_object" }
    });

    const responseText = completion.choices[0].message.content || "{}";
    const analysis = JSON.parse(responseText);

    // Transform AI response to our format
    const result: ContractAnalysisResult = {
      overallScore: analysis.overall_score || 70,
      riskLevel: analysis.risk_level || "Medium",
      provisions: transformProvisionsFromAI(analysis.provisions || []),
      redFlags: transformRedFlagsFromAI(analysis.red_flags || []),
      criticalIssuesCount: analysis.critical_issues_count || 0,
      totalRedFlags: analysis.total_red_flags || 0,
      estimatedSavings: analysis.estimated_savings || 500000,
      processingTime: (Date.now() - startTime) / 1000,
      analyzedAt: new Date().toISOString(),
      aiModel: "gpt-4-turbo-preview",
      confidence: analysis.confidence || 0.85
    };

    console.log("✅ AI analysis complete!");
    return result;

  } catch (error) {
    console.error("❌ AI analysis failed:", error);
    
    // Fall back to mock analysis on error
    console.log("📊 Falling back to mock analysis...");
    return analyzeMockContract(fileName, 0);
  }
}

/**
 * Build comprehensive analysis prompt for OpenAI
 */
function buildAnalysisPrompt(contractText: string, fileName: string): string {
  return `
Analyze this PBM (Pharmacy Benefit Management) contract and provide a comprehensive risk assessment.

CONTRACT FILE: ${fileName}
CONTRACT TEXT:
${contractText.substring(0, 20000)} ${contractText.length > 20000 ? "...(truncated)" : ""}

Please analyze the following 10 critical provisions and return a JSON object with this exact structure:

{
  "overall_score": <number 0-100>,
  "risk_level": "<Critical|High|Medium|Low>",
  "confidence": <number 0-1>,
  "estimated_savings": <number in dollars>,
  "critical_issues_count": <number>,
  "total_red_flags": <number>,
  "provisions": [
    {
      "name": "Pricing Transparency",
      "description": "Brief description of findings",
      "score": <number 0-100>,
      "riskLevel": "<Critical|High|Medium|Low>",
      "estimatedImpact": <number in dollars>,
      "recommendation": "Specific actionable recommendation"
    },
    // Repeat for: Rebate Pass-Through, Audit Rights, MAC Pricing, 
    // Specialty Drug Management, Termination Clauses, Performance Guarantees,
    // Data Access Rights, Network Adequacy, Dispute Resolution
  ],
  "red_flags": [
    {
      "title": "Brief title",
      "description": "Detailed description of the issue",
      "severity": "<Critical|High|Medium>",
      "provision": "Provision name",
      "estimatedImpact": <number in dollars>,
      "recommendation": "How to fix it"
    }
  ]
}

Focus on:
1. Hidden costs and markup opportunities
2. Unfavorable rebate retention terms
3. Lack of pricing transparency
4. Restrictive audit rights
5. Specialty drug carveout limitations
6. Excessive administrative fees
7. Unclear MAC pricing methodologies
8. Mandatory specialty pharmacy networks
9. Termination penalties and lock-in periods
10. Data ownership and access restrictions

Provide specific dollar estimates for potential savings based on industry benchmarks.
`.trim();
}

/**
 * Transform AI provisions response to our format
 */
function transformProvisionsFromAI(aiProvisions: any[]): ProvisionAnalysis[] {
  return aiProvisions.map(p => ({
    name: p.name || "Unknown Provision",
    description: p.description || "",
    score: p.score || 70,
    riskLevel: p.riskLevel || "Medium",
    estimatedImpact: p.estimatedImpact || 0,
    recommendation: p.recommendation || ""
  }));
}

/**
 * Transform AI red flags response to our format
 */
function transformRedFlagsFromAI(aiRedFlags: any[]): RedFlag[] {
  return aiRedFlags.map(f => ({
    title: f.title || "Unfavorable Term",
    description: f.description || "",
    severity: f.severity || "Medium",
    provision: f.provision || "",
    estimatedImpact: f.estimatedImpact || 0,
    recommendation: f.recommendation || ""
  }));
}

/**
 * Mock analysis fallback (when AI unavailable)
 * Uses deterministic pseudo-random generation based on filename
 */
export function analyzeMockContract(
  fileName: string,
  fileSize: number
): ContractAnalysisResult {
  
  const seed = fileName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const random = (min: number, max: number) => {
    const x = Math.sin(seed) * 10000;
    return Math.floor((x - Math.floor(x)) * (max - min + 1)) + min;
  };

  const provisions: ProvisionAnalysis[] = [
    {
      name: "Pricing Transparency",
      description: "Visibility into ingredient costs, dispensing fees, and markup percentages",
      score: random(60, 95),
      riskLevel: "Medium",
      estimatedImpact: random(500000, 1200000),
      recommendation: "Request detailed cost breakdowns and quarterly pricing audits"
    },
    {
      name: "Rebate Pass-Through",
      description: "Terms defining how manufacturer rebates are shared with plan sponsor",
      score: random(55, 90),
      riskLevel: "High",
      estimatedImpact: random(800000, 2000000),
      recommendation: "Negotiate 100% pass-through with transparent reporting"
    },
    {
      name: "Audit Rights",
      description: "Access to claims data, pricing files, and financial records",
      score: random(50, 85),
      riskLevel: "High",
      estimatedImpact: random(300000, 800000),
      recommendation: "Secure unrestricted audit rights with third-party verification"
    },
    {
      name: "MAC Pricing",
      description: "Maximum allowable cost lists and update frequency guarantees",
      score: random(55, 88),
      riskLevel: "Medium",
      estimatedImpact: random(600000, 1500000),
      recommendation: "Require monthly MAC list updates and competitive benchmarking"
    },
    {
      name: "Specialty Drug Management",
      description: "Specialty pharmacy networks and cost-plus pricing models",
      score: random(50, 82),
      riskLevel: "Critical",
      estimatedImpact: random(1000000, 3000000),
      recommendation: "Implement cost-plus pricing with network choice provisions"
    },
    {
      name: "Termination Clauses",
      description: "Exit terms, penalties, and lock-in periods",
      score: random(60, 92),
      riskLevel: "Medium",
      estimatedImpact: random(400000, 900000),
      recommendation: "Negotiate for-cause termination with 90-day notice"
    },
    {
      name: "Performance Guarantees",
      description: "Contractual commitments on turnaround times and accuracy rates",
      score: random(65, 95),
      riskLevel: "Low",
      estimatedImpact: random(150000, 400000),
      recommendation: "Add financial penalties for missed performance metrics"
    },
    {
      name: "Data Access Rights",
      description: "Ownership and access to all claims and utilization data",
      score: random(55, 87),
      riskLevel: "Medium",
      estimatedImpact: random(250000, 600000),
      recommendation: "Ensure full data ownership with real-time API access"
    },
    {
      name: "Network Adequacy",
      description: "Pharmacy access with defined fill rate and distance standards",
      score: random(70, 95),
      riskLevel: "Low",
      estimatedImpact: random(100000, 350000),
      recommendation: "Maintain 98% fill rate within 5-mile radius"
    },
    {
      name: "Dispute Resolution",
      description: "Arbitration processes with balanced terms and reasonable timelines",
      score: random(65, 90),
      riskLevel: "Low",
      estimatedImpact: random(80000, 250000),
      recommendation: "Include mediation step before binding arbitration"
    }
  ];

  provisions.forEach(p => {
    if (p.score >= 85) p.riskLevel = "Low";
    else if (p.score >= 70) p.riskLevel = "Medium";
    else if (p.score >= 55) p.riskLevel = "High";
    else p.riskLevel = "Critical";
  });

  const redFlags: RedFlag[] = [];
  provisions.forEach(provision => {
    if (provision.score < 70) {
      const severity = provision.score < 55 ? 'Critical' : provision.score < 65 ? 'High' : 'Medium';
      redFlags.push({
        title: `${provision.name} - Unfavorable Terms`,
        description: `Score: ${provision.score}/100. ${provision.description}. Current terms may result in significant cost overruns.`,
        severity,
        provision: provision.name,
        estimatedImpact: provision.estimatedImpact,
        recommendation: provision.recommendation
      });
    }
  });

  const overallScore = Math.round(provisions.reduce((sum, p) => sum + p.score, 0) / provisions.length);
  const riskLevel = overallScore >= 85 ? 'Low' : overallScore >= 70 ? 'Medium' : overallScore >= 55 ? 'High' : 'Critical';
  const estimatedSavings = Math.round(redFlags.reduce((sum, f) => sum + f.estimatedImpact, 0) * 0.6);

  return {
    overallScore,
    riskLevel,
    provisions,
    redFlags,
    criticalIssuesCount: redFlags.filter(f => f.severity === 'Critical').length,
    totalRedFlags: redFlags.length,
    estimatedSavings,
    processingTime: 2.3,
    analyzedAt: new Date().toISOString(),
    aiModel: "mock-analysis",
    confidence: 0.75
  };
}