import type { ContractAnalysisResult, ProvisionAnalysis, RedFlag } from "./types";

/**
 * Analyze uploaded contract and generate intelligence report
 * This simulates AI analysis - in production, this would call OpenAI/Claude
 */
export async function analyzeContract(
  fileName: string,
  fileSize: number,
  fileContent?: ArrayBuffer
): Promise<ContractAnalysisResult> {
  
  // Simulate processing time
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Generate realistic analysis based on file characteristics
  const provisions = generateProvisionAnalysis(fileName);
  const redFlags = generateRedFlags(provisions);
  const overallScore = calculateOverallScore(provisions);
  const riskLevel = determineRiskLevel(overallScore, redFlags.length);
  const estimatedSavings = calculateEstimatedSavings(provisions, redFlags);

  return {
    overallScore,
    riskLevel,
    provisions,
    redFlags,
    criticalIssuesCount: redFlags.filter(f => f.severity === 'Critical').length,
    totalRedFlags: redFlags.length,
    estimatedSavings,
    processingTime: 2.3,
    analyzedAt: new Date().toISOString()
  };
}

function generateProvisionAnalysis(fileName: string): ProvisionAnalysis[] {
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

  // Assign risk levels based on scores
  provisions.forEach(p => {
    if (p.score >= 85) p.riskLevel = "Low";
    else if (p.score >= 70) p.riskLevel = "Medium";
    else if (p.score >= 55) p.riskLevel = "High";
    else p.riskLevel = "Critical";
  });

  return provisions;
}

function generateRedFlags(provisions: ProvisionAnalysis[]): RedFlag[] {
  const redFlags: RedFlag[] = [];

  provisions.forEach(provision => {
    if (provision.score < 70) {
      const severity = provision.score < 55 ? 'Critical' : provision.score < 65 ? 'High' : 'Medium';
      
      redFlags.push({
        title: `${provision.name} - Unfavorable Terms`,
        description: `Score: ${provision.score}/100. ${provision.description}. Current terms may result in significant cost overruns or operational constraints.`,
        severity,
        provision: provision.name,
        estimatedImpact: provision.estimatedImpact,
        recommendation: provision.recommendation
      });
    }
  });

  return redFlags;
}

function calculateOverallScore(provisions: ProvisionAnalysis[]): number {
  const totalScore = provisions.reduce((sum, p) => sum + p.score, 0);
  return Math.round(totalScore / provisions.length);
}

function determineRiskLevel(score: number, redFlagCount: number): 'Low' | 'Medium' | 'High' | 'Critical' {
  if (score >= 85 && redFlagCount <= 2) return 'Low';
  if (score >= 70 && redFlagCount <= 4) return 'Medium';
  if (score >= 55 || redFlagCount <= 7) return 'High';
  return 'Critical';
}

function calculateEstimatedSavings(provisions: ProvisionAnalysis[], redFlags: RedFlag[]): number {
  // Sum up potential savings from red flag provisions
  const totalImpact = redFlags.reduce((sum, flag) => sum + flag.estimatedImpact, 0);
  
  // Conservative estimate: 60% of identified impact is recoverable through renegotiation
  return Math.round(totalImpact * 0.6);
}