/**
 * Kincaid Health Platform Pricing Tiers
 * 12-tier structure from $2K to $2.9M annual contract value
 */

export interface KincaidHealthTier {
  id: string;
  name: string;
  annualPrice: number;
  monthlyPrice: number;
  description: string;
  targetSegment: string;
  employeeRange: string;
  includedStudies: string[];
  features: {
    pbmTransparency: boolean;
    rxDefenseIQ: boolean;
    nadacBenchmarking: boolean;
    claimsRecoveryIQ: boolean;
    actuarialModeling: boolean;
    ebitdaDefense: boolean;
    contractXRay: boolean;
    warRoomAccess: boolean;
    ledgerAccess: boolean;
    aiCopilot: boolean;
    customReporting: boolean;
    apiAccess: boolean;
    dedicatedSupport: boolean;
    onboarding: "self-service" | "guided" | "white-glove";
    seats: number;
    monthlyReports: number;
  };
  limits: {
    contractReviews: number;
    monthlyApiCalls: number;
    simulationsPerMonth: number;
    dataRetention: string;
    sla: string;
  };
}

export const KINCAID_HEALTH_TIERS: KincaidHealthTier[] = [
  {
    id: "essential",
    name: "Essential",
    annualPrice: 2000,
    monthlyPrice: 200,
    description: "Basic PBM transparency for small employers",
    targetSegment: "Small Employer",
    employeeRange: "50-100",
    includedStudies: [
      "Annual PBM Transparency Report",
      "NADAC Benchmarking Analysis"
    ],
    features: {
      pbmTransparency: true,
      rxDefenseIQ: false,
      nadacBenchmarking: true,
      claimsRecoveryIQ: false,
      actuarialModeling: false,
      ebitdaDefense: false,
      contractXRay: false,
      warRoomAccess: false,
      ledgerAccess: false,
      aiCopilot: false,
      customReporting: false,
      apiAccess: false,
      dedicatedSupport: false,
      onboarding: "self-service",
      seats: 2,
      monthlyReports: 1
    },
    limits: {
      contractReviews: 1,
      monthlyApiCalls: 1000,
      simulationsPerMonth: 5,
      dataRetention: "12 months",
      sla: "72 hours"
    }
  },
  {
    id: "professional",
    name: "Professional",
    annualPrice: 12000,
    monthlyPrice: 1200,
    description: "Comprehensive PBM analysis with recovery tools",
    targetSegment: "Mid-Market",
    employeeRange: "100-500",
    includedStudies: [
      "Quarterly PBM Transparency Reports",
      "NADAC Benchmarking Analysis",
      "Rx Claims Recovery Study",
      "Spread Pricing Analysis"
    ],
    features: {
      pbmTransparency: true,
      rxDefenseIQ: true,
      nadacBenchmarking: true,
      claimsRecoveryIQ: true,
      actuarialModeling: false,
      ebitdaDefense: false,
      contractXRay: false,
      warRoomAccess: false,
      ledgerAccess: true,
      aiCopilot: false,
      customReporting: false,
      apiAccess: false,
      dedicatedSupport: false,
      onboarding: "guided",
      seats: 5,
      monthlyReports: 4
    },
    limits: {
      contractReviews: 2,
      monthlyApiCalls: 5000,
      simulationsPerMonth: 20,
      dataRetention: "24 months",
      sla: "48 hours"
    }
  },
  {
    id: "advanced",
    name: "Advanced",
    annualPrice: 45000,
    monthlyPrice: 4500,
    description: "Full contract intelligence with predictive modeling",
    targetSegment: "Large Employer",
    employeeRange: "500-1,000",
    includedStudies: [
      "Monthly PBM Performance Reports",
      "Contract X-Ray Analysis",
      "NADAC + MAC Benchmarking",
      "Claims Recovery Opportunities",
      "Formulary Economics Study",
      "Rebate Transparency Analysis"
    ],
    features: {
      pbmTransparency: true,
      rxDefenseIQ: true,
      nadacBenchmarking: true,
      claimsRecoveryIQ: true,
      actuarialModeling: true,
      ebitdaDefense: false,
      contractXRay: true,
      warRoomAccess: true,
      ledgerAccess: true,
      aiCopilot: false,
      customReporting: true,
      apiAccess: false,
      dedicatedSupport: false,
      onboarding: "guided",
      seats: 10,
      monthlyReports: 12
    },
    limits: {
      contractReviews: 4,
      monthlyApiCalls: 25000,
      simulationsPerMonth: 50,
      dataRetention: "36 months",
      sla: "24 hours"
    }
  },
  {
    id: "enterprise",
    name: "Enterprise",
    annualPrice: 95000,
    monthlyPrice: 9500,
    description: "Enterprise-grade platform with AI copilot",
    targetSegment: "Enterprise",
    employeeRange: "1,000-2,500",
    includedStudies: [
      "Weekly Performance Dashboards",
      "Contract X-Ray Analysis",
      "NADAC + MAC + AWP Benchmarking",
      "Claims Recovery Opportunities",
      "Formulary Economics Study",
      "Rebate Transparency Analysis",
      "Network Performance Study",
      "Specialty Drug Analysis",
      "GLP-1 Impact Assessment"
    ],
    features: {
      pbmTransparency: true,
      rxDefenseIQ: true,
      nadacBenchmarking: true,
      claimsRecoveryIQ: true,
      actuarialModeling: true,
      ebitdaDefense: true,
      contractXRay: true,
      warRoomAccess: true,
      ledgerAccess: true,
      aiCopilot: true,
      customReporting: true,
      apiAccess: true,
      dedicatedSupport: true,
      onboarding: "white-glove",
      seats: 25,
      monthlyReports: 52
    },
    limits: {
      contractReviews: 8,
      monthlyApiCalls: 100000,
      simulationsPerMonth: 200,
      dataRetention: "60 months",
      sla: "4 hours"
    }
  },
  {
    id: "enterprise-plus",
    name: "Enterprise Plus",
    annualPrice: 180000,
    monthlyPrice: 18000,
    description: "Multi-site enterprise with advanced analytics",
    targetSegment: "Large Enterprise",
    employeeRange: "2,500-5,000",
    includedStudies: [
      "Real-time Performance Dashboards",
      "Multi-Contract Intelligence",
      "Comprehensive Benchmarking Suite",
      "Claims Recovery + Audit Defense",
      "Formulary Optimization Study",
      "Rebate Economics Analysis",
      "Network Performance + Steerage",
      "Specialty Drug Deep Dive",
      "GLP-1 Economic Impact",
      "Stop-Loss Optimization",
      "IBNR Modeling",
      "Risk Adjustment Analysis"
    ],
    features: {
      pbmTransparency: true,
      rxDefenseIQ: true,
      nadacBenchmarking: true,
      claimsRecoveryIQ: true,
      actuarialModeling: true,
      ebitdaDefense: true,
      contractXRay: true,
      warRoomAccess: true,
      ledgerAccess: true,
      aiCopilot: true,
      customReporting: true,
      apiAccess: true,
      dedicatedSupport: true,
      onboarding: "white-glove",
      seats: 50,
      monthlyReports: 104
    },
    limits: {
      contractReviews: 15,
      monthlyApiCalls: 250000,
      simulationsPerMonth: 500,
      dataRetention: "84 months",
      sla: "2 hours"
    }
  },
  {
    id: "strategic",
    name: "Strategic",
    annualPrice: 320000,
    monthlyPrice: 32000,
    description: "Strategic platform for complex organizations",
    targetSegment: "Complex Enterprise",
    employeeRange: "5,000-10,000",
    includedStudies: [
      "Executive Command Center Access",
      "Multi-Entity Contract Intelligence",
      "Full Benchmarking Suite",
      "Claims Recovery + Forensic Audit",
      "Formulary + Rebate Optimization",
      "Network Performance Analytics",
      "Specialty + GLP-1 Economics",
      "Stop-Loss + Captive Modeling",
      "IBNR + Risk Adjustment",
      "Plan Design Optimization",
      "Contribution Strategy Analysis",
      "Trend Attribution Study",
      "Cost Decomposition Analysis",
      "Fiduciary Leakage Detection"
    ],
    features: {
      pbmTransparency: true,
      rxDefenseIQ: true,
      nadacBenchmarking: true,
      claimsRecoveryIQ: true,
      actuarialModeling: true,
      ebitdaDefense: true,
      contractXRay: true,
      warRoomAccess: true,
      ledgerAccess: true,
      aiCopilot: true,
      customReporting: true,
      apiAccess: true,
      dedicatedSupport: true,
      onboarding: "white-glove",
      seats: 100,
      monthlyReports: 156
    },
    limits: {
      contractReviews: 25,
      monthlyApiCalls: 500000,
      simulationsPerMonth: 1000,
      dataRetention: "120 months",
      sla: "1 hour"
    }
  },
  {
    id: "institutional",
    name: "Institutional",
    annualPrice: 550000,
    monthlyPrice: 55000,
    description: "Full institutional platform with dedicated resources",
    targetSegment: "Large Institution",
    employeeRange: "10,000-25,000",
    includedStudies: [
      "24/7 Executive War Room",
      "Multi-State Contract Intelligence",
      "Competitive Benchmarking Suite",
      "Forensic Claims Audit + Recovery",
      "Advanced Formulary Optimization",
      "Rebate Economics + Maximization",
      "Network Performance + Steerage Strategy",
      "Specialty Drug Economics",
      "GLP-1 Impact + Mitigation",
      "Stop-Loss + Captive Analysis",
      "IBNR + Reserve Modeling",
      "Risk Adjustment Optimization",
      "Multi-Year Plan Design",
      "Contribution Strategy",
      "Trend Attribution + Forecasting",
      "Cost Decomposition + Root Cause",
      "Fiduciary Compliance + Defense",
      "Board Reporting Package"
    ],
    features: {
      pbmTransparency: true,
      rxDefenseIQ: true,
      nadacBenchmarking: true,
      claimsRecoveryIQ: true,
      actuarialModeling: true,
      ebitdaDefense: true,
      contractXRay: true,
      warRoomAccess: true,
      ledgerAccess: true,
      aiCopilot: true,
      customReporting: true,
      apiAccess: true,
      dedicatedSupport: true,
      onboarding: "white-glove",
      seats: 200,
      monthlyReports: 208
    },
    limits: {
      contractReviews: 50,
      monthlyApiCalls: 1000000,
      simulationsPerMonth: 2000,
      dataRetention: "Unlimited",
      sla: "30 minutes"
    }
  },
  {
    id: "fortune-500",
    name: "Fortune 500",
    annualPrice: 850000,
    monthlyPrice: 85000,
    description: "Fortune 500 platform with executive intelligence",
    targetSegment: "Fortune 500",
    employeeRange: "25,000-50,000",
    includedStudies: [
      "Real-time Executive Intelligence",
      "Global Contract Intelligence",
      "Industry-Leading Benchmarking",
      "Forensic Audit + Recovery Suite",
      "Strategic Formulary Design",
      "Rebate Maximization + Economics",
      "Network Optimization + Steerage",
      "Specialty Drug Strategy",
      "GLP-1 Economic Modeling",
      "Captive + Stop-Loss Strategy",
      "Advanced Reserve Modeling",
      "Predictive Risk Adjustment",
      "Multi-Year Strategic Planning",
      "Contribution Optimization",
      "Predictive Trend Analytics",
      "Root Cause Analysis Suite",
      "Fiduciary Defense Platform",
      "Board + C-Suite Reporting",
      "M&A Due Diligence Support",
      "Regulatory Compliance Monitoring"
    ],
    features: {
      pbmTransparency: true,
      rxDefenseIQ: true,
      nadacBenchmarking: true,
      claimsRecoveryIQ: true,
      actuarialModeling: true,
      ebitdaDefense: true,
      contractXRay: true,
      warRoomAccess: true,
      ledgerAccess: true,
      aiCopilot: true,
      customReporting: true,
      apiAccess: true,
      dedicatedSupport: true,
      onboarding: "white-glove",
      seats: 500,
      monthlyReports: 260
    },
    limits: {
      contractReviews: 100,
      monthlyApiCalls: 2500000,
      simulationsPerMonth: 5000,
      dataRetention: "Unlimited",
      sla: "15 minutes"
    }
  },
  {
    id: "enterprise-elite",
    name: "Enterprise Elite",
    annualPrice: 1250000,
    monthlyPrice: 125000,
    description: "Elite platform for complex global organizations",
    targetSegment: "Global Enterprise",
    employeeRange: "50,000-100,000",
    includedStudies: [
      "24/7 Global War Room",
      "Multi-National Contract Intelligence",
      "Competitive Intelligence Platform",
      "Forensic + Predictive Audit Suite",
      "AI-Driven Formulary Optimization",
      "Rebate + Spread Maximization",
      "Global Network Strategy",
      "Specialty + Gene Therapy Economics",
      "GLP-1 + Biosimilar Strategy",
      "Global Captive Strategy",
      "Predictive Reserve Modeling",
      "AI Risk Adjustment",
      "Strategic Planning Platform",
      "Total Cost Optimization",
      "Predictive Analytics Suite",
      "AI Root Cause Analysis",
      "Enterprise Fiduciary Defense",
      "Executive Intelligence Platform",
      "M&A Integration Support",
      "Regulatory + Compliance Suite",
      "Population Health Strategy",
      "Value-Based Care Analytics"
    ],
    features: {
      pbmTransparency: true,
      rxDefenseIQ: true,
      nadacBenchmarking: true,
      claimsRecoveryIQ: true,
      actuarialModeling: true,
      ebitdaDefense: true,
      contractXRay: true,
      warRoomAccess: true,
      ledgerAccess: true,
      aiCopilot: true,
      customReporting: true,
      apiAccess: true,
      dedicatedSupport: true,
      onboarding: "white-glove",
      seats: 1000,
      monthlyReports: 365
    },
    limits: {
      contractReviews: 200,
      monthlyApiCalls: 5000000,
      simulationsPerMonth: 10000,
      dataRetention: "Unlimited",
      sla: "10 minutes"
    }
  },
  {
    id: "enterprise-sovereign",
    name: "Enterprise Sovereign",
    annualPrice: 1750000,
    monthlyPrice: 175000,
    description: "Sovereign-grade platform with dedicated infrastructure",
    targetSegment: "Global Leader",
    employeeRange: "100,000-250,000",
    includedStudies: [
      "Sovereign Intelligence Platform",
      "Global Multi-Entity Contract Suite",
      "AI-Powered Competitive Intelligence",
      "Predictive Forensic Audit",
      "Machine Learning Formulary Optimization",
      "Automated Rebate Maximization",
      "AI Network Strategy",
      "Advanced Gene Therapy Economics",
      "Predictive Biosimilar Strategy",
      "Global Risk Transfer Strategy",
      "AI Reserve + IBNR Modeling",
      "Predictive Risk Adjustment",
      "Multi-Year Strategic Intelligence",
      "AI Total Cost Optimization",
      "Predictive + Prescriptive Analytics",
      "Automated Root Cause Intelligence",
      "AI Fiduciary Defense Platform",
      "Real-time Executive Intelligence",
      "M&A + Integration Intelligence",
      "AI Regulatory Compliance",
      "Population Health Intelligence",
      "Value-Based Care Platform",
      "Clinical Quality Analytics",
      "Member Engagement Intelligence"
    ],
    features: {
      pbmTransparency: true,
      rxDefenseIQ: true,
      nadacBenchmarking: true,
      claimsRecoveryIQ: true,
      actuarialModeling: true,
      ebitdaDefense: true,
      contractXRay: true,
      warRoomAccess: true,
      ledgerAccess: true,
      aiCopilot: true,
      customReporting: true,
      apiAccess: true,
      dedicatedSupport: true,
      onboarding: "white-glove",
      seats: 2000,
      monthlyReports: 520
    },
    limits: {
      contractReviews: 500,
      monthlyApiCalls: 10000000,
      simulationsPerMonth: 25000,
      dataRetention: "Unlimited",
      sla: "5 minutes"
    }
  },
  {
    id: "global-command",
    name: "Global Command",
    annualPrice: 2250000,
    monthlyPrice: 225000,
    description: "Global command center with AI orchestration",
    targetSegment: "Global Fortune 100",
    employeeRange: "250,000-500,000",
    includedStudies: [
      "AI-Orchestrated Global Command Center",
      "Autonomous Contract Intelligence",
      "Real-time Competitive Intelligence",
      "AI Forensic + Predictive Audit",
      "Autonomous Formulary Optimization",
      "AI Rebate + Spread Maximization",
      "Autonomous Network Optimization",
      "Predictive Specialty Economics",
      "AI Biosimilar + Gene Therapy Strategy",
      "Global Risk Transfer Intelligence",
      "AI Reserve Optimization",
      "Autonomous Risk Adjustment",
      "AI Strategic Planning",
      "Autonomous Cost Optimization",
      "Prescriptive Analytics Suite",
      "AI Root Cause + Remediation",
      "Autonomous Fiduciary Defense",
      "AI Executive Intelligence",
      "M&A Intelligence Platform",
      "AI Regulatory + Compliance",
      "Population Health AI",
      "Value-Based Care Intelligence",
      "Clinical Quality AI",
      "Member Engagement Platform",
      "Provider Performance Intelligence",
      "Fraud Detection + Prevention"
    ],
    features: {
      pbmTransparency: true,
      rxDefenseIQ: true,
      nadacBenchmarking: true,
      claimsRecoveryIQ: true,
      actuarialModeling: true,
      ebitdaDefense: true,
      contractXRay: true,
      warRoomAccess: true,
      ledgerAccess: true,
      aiCopilot: true,
      customReporting: true,
      apiAccess: true,
      dedicatedSupport: true,
      onboarding: "white-glove",
      seats: 5000,
      monthlyReports: 1040
    },
    limits: {
      contractReviews: 1000,
      monthlyApiCalls: 25000000,
      simulationsPerMonth: 50000,
      dataRetention: "Unlimited",
      sla: "Immediate"
    }
  },
  {
    id: "enterprise-apex",
    name: "Enterprise Apex",
    annualPrice: 2900000,
    monthlyPrice: 290000,
    description: "Ultimate sovereign platform with dedicated AI infrastructure",
    targetSegment: "Global Fortune 50",
    employeeRange: "500,000+",
    includedStudies: [
      "Sovereign AI Command Infrastructure",
      "Autonomous Global Contract Intelligence",
      "Real-time Market Intelligence",
      "AI Forensic + Predictive + Prescriptive Audit",
      "Autonomous Multi-Market Formulary",
      "AI Global Rebate Maximization",
      "Autonomous Network Intelligence",
      "AI Specialty + Rare Disease Economics",
      "Predictive Gene + Cell Therapy Strategy",
      "Global Risk Transfer Optimization",
      "AI Actuarial Intelligence",
      "Autonomous Risk Adjustment + HCC",
      "AI Multi-Year Strategic Planning",
      "Autonomous Total Cost Optimization",
      "AI Prescriptive Analytics Platform",
      "Autonomous Root Cause + Remediation",
      "AI Fiduciary Compliance Platform",
      "Real-time C-Suite Intelligence",
      "M&A + Divestiture Intelligence",
      "AI Regulatory + Legislative Monitoring",
      "Population Health AI Platform",
      "Value-Based Care Intelligence",
      "Clinical Quality + Outcomes AI",
      "Member Engagement + Retention",
      "Provider Performance + Contracting",
      "Fraud + Waste + Abuse AI",
      "Care Management Intelligence",
      "Digital Health Integration",
      "Social Determinants Analytics",
      "Precision Medicine Economics"
    ],
    features: {
      pbmTransparency: true,
      rxDefenseIQ: true,
      nadacBenchmarking: true,
      claimsRecoveryIQ: true,
      actuarialModeling: true,
      ebitdaDefense: true,
      contractXRay: true,
      warRoomAccess: true,
      ledgerAccess: true,
      aiCopilot: true,
      customReporting: true,
      apiAccess: true,
      dedicatedSupport: true,
      onboarding: "white-glove",
      seats: 10000,
      monthlyReports: 2080
    },
    limits: {
      contractReviews: 2500,
      monthlyApiCalls: 50000000,
      simulationsPerMonth: 100000,
      dataRetention: "Unlimited",
      sla: "Immediate"
    }
  }
];

export function getTierById(id: string): KincaidHealthTier | undefined {
  return KINCAID_HEALTH_TIERS.find(tier => tier.id === id);
}

export function getTierByPrice(annualPrice: number): KincaidHealthTier | undefined {
  return KINCAID_HEALTH_TIERS.find(tier => tier.annualPrice === annualPrice);
}

export function getRecommendedTier(employeeCount: number): KincaidHealthTier {
  if (employeeCount <= 100) return KINCAID_HEALTH_TIERS[0];
  if (employeeCount <= 500) return KINCAID_HEALTH_TIERS[1];
  if (employeeCount <= 1000) return KINCAID_HEALTH_TIERS[2];
  if (employeeCount <= 2500) return KINCAID_HEALTH_TIERS[3];
  if (employeeCount <= 5000) return KINCAID_HEALTH_TIERS[4];
  if (employeeCount <= 10000) return KINCAID_HEALTH_TIERS[5];
  if (employeeCount <= 25000) return KINCAID_HEALTH_TIERS[6];
  if (employeeCount <= 50000) return KINCAID_HEALTH_TIERS[7];
  if (employeeCount <= 100000) return KINCAID_HEALTH_TIERS[8];
  if (employeeCount <= 250000) return KINCAID_HEALTH_TIERS[9];
  if (employeeCount <= 500000) return KINCAID_HEALTH_TIERS[10];
  return KINCAID_HEALTH_TIERS[11];
}