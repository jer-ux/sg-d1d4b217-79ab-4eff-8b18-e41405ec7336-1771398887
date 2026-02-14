export type Form5500Upload = {
  id: string;
  fileName: string;
  fileKey: string;
  year: string;
  size: number;
  uploadedAt: string;
  uploadedBy: string;
  checksum: string;
  status: "pending" | "processing" | "verified" | "error";
  errorMessage?: string;
  metadata?: {
    planName?: string;
    ein?: string;
    planNumber?: string;
    hasScheduleA?: boolean;
    hasScheduleC?: boolean;
    participantCount?: number;
    totalAssets?: number;
  };
};

export type BrokerCompensationAnalysis = {
  id: string;
  analysisDate: string;
  yearsCovered: string[];
  forms: Form5500Upload[];
  findings: {
    directCompensation: {
      year: string;
      amount: number;
      brokerName: string;
      source: string;
    }[];
    indirectCompensation: {
      year: string;
      amount: number;
      source: string;
      description: string;
    }[];
    totalCompensation: {
      year: string;
      amount: number;
    }[];
    trends: {
      percentageChange: number;
      inflationAdjusted: boolean;
      benchmarkComparison?: {
        industryAverage: number;
        percentile: number;
      };
    };
  };
  recommendations: {
    priority: "high" | "medium" | "low";
    category: string;
    finding: string;
    recommendation: string;
    potentialSavings?: number;
  }[];
  status: "draft" | "complete" | "reviewed";
};

// Mock data generator for demo
export function generateMockAnalysis(forms: Form5500Upload[]): BrokerCompensationAnalysis {
  const years = forms.map(f => f.year).sort();
  
  return {
    id: `analysis_${Date.now()}`,
    analysisDate: new Date().toISOString(),
    yearsCovered: years,
    forms,
    findings: {
      directCompensation: years.map(year => ({
        year,
        amount: 45000 + Math.random() * 15000,
        brokerName: "XYZ Benefits Group",
        source: "Schedule C - Line 4a",
      })),
      indirectCompensation: years.map(year => ({
        year,
        amount: 12000 + Math.random() * 8000,
        source: "Carrier Override Commissions",
        description: "Undisclosed contingent commissions from carriers",
      })),
      totalCompensation: years.map(year => ({
        year,
        amount: 57000 + Math.random() * 23000,
      })),
      trends: {
        percentageChange: 8.5,
        inflationAdjusted: true,
        benchmarkComparison: {
          industryAverage: 52000,
          percentile: 78,
        },
      },
    },
    recommendations: [
      {
        priority: "high",
        category: "Fee Transparency",
        finding: "Broker compensation increased 23% over 3 years while plan costs increased only 12%",
        recommendation: "Negotiate fixed-fee arrangement instead of percentage-based compensation",
        potentialSavings: 18000,
      },
      {
        priority: "high",
        category: "Undisclosed Compensation",
        finding: "Schedule C does not include carrier override commissions totaling $12-20K annually",
        recommendation: "Request full disclosure of all direct and indirect compensation sources",
        potentialSavings: 15000,
      },
      {
        priority: "medium",
        category: "Benchmarking",
        finding: "Broker compensation is in 78th percentile for companies of your size",
        recommendation: "Consider RFP process to establish competitive baseline",
        potentialSavings: 25000,
      },
    ],
    status: "complete",
  };
}

// Store functions
export async function storeForm5500(upload: Omit<Form5500Upload, "id" | "uploadedAt">): Promise<Form5500Upload> {
  // In production, this would store to database
  const stored: Form5500Upload = {
    ...upload,
    id: `form5500_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    uploadedAt: new Date().toISOString(),
  };
  
  return stored;
}

export async function listForm5500s(userId: string): Promise<Form5500Upload[]> {
  // In production, this would query database
  return [];
}

export async function createBrokerCompAnalysis(formIds: string[]): Promise<BrokerCompensationAnalysis> {
  // In production, this would trigger analysis pipeline
  // For demo, generate mock results
  const mockForms: Form5500Upload[] = formIds.map((id, i) => ({
    id,
    fileName: `Form_5500_${2023 - i}.pdf`,
    fileKey: `uploads/form5500/${id}`,
    year: (2023 - i).toString(),
    size: 1024 * 1024 * 2,
    uploadedAt: new Date().toISOString(),
    uploadedBy: "demo_user",
    checksum: "sha256:abc123...",
    status: "verified",
  }));

  return generateMockAnalysis(mockForms);
}