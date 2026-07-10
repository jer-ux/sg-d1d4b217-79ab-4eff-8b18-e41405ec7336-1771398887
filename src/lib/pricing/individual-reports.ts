/**
 * Kincaid Health Individual Report Products
 * 12 standalone reports priced $2,000 - $3,000
 */

export interface IndividualReport {
  id: string;
  name: string;
  price: number;
  category: "pbm" | "actuarial" | "compliance" | "contract" | "risk";
  description: string;
  deliverables: string[];
  turnaroundDays: number;
  requiredData: string[];
  idealFor: string[];
  sampleInsights: string[];
}

export const INDIVIDUAL_REPORTS: IndividualReport[] = [
  {
    id: "pbm-spread-analysis",
    name: "PBM Spread Analysis Report",
    price: 2000,
    category: "pbm",
    description: "Forensic analysis of PBM spread pricing revealing hidden markups, rebate retention, and AWP inflation tactics across your formulary.",
    deliverables: [
      "Executive summary with total spread quantification",
      "Drug-by-drug spread analysis (top 200 medications)",
      "NADAC benchmark comparison",
      "Rebate pass-through verification",
      "AWP vs. acquisition cost delta report",
      "Actionable recommendations for contract renegotiation"
    ],
    turnaroundDays: 14,
    requiredData: [
      "12 months of pharmacy claims data",
      "Current PBM contract",
      "Formulary list"
    ],
    idealFor: [
      "CFOs preparing for PBM contract renewal",
      "HR leaders investigating pharmacy cost trends",
      "Brokers validating PBM performance",
      "Private equity conducting due diligence"
    ],
    sampleInsights: [
      "Identified $847K in annual spread overcharges",
      "Found 23% AWP inflation above NADAC benchmarks",
      "Discovered $312K in undisclosed rebate retention"
    ]
  },

  {
    id: "stop-loss-optimization",
    name: "Stop-Loss Optimization Report",
    price: 2200,
    category: "actuarial",
    description: "Actuarial analysis of your stop-loss attachment points, aggregating corridors, and carrier pricing to identify optimal self-insured strategy.",
    deliverables: [
      "Monte Carlo simulation of 10,000 claim scenarios",
      "Specific and aggregate attachment point recommendations",
      "Carrier premium vs. risk-retained analysis",
      "Break-even probability distributions",
      "5-year cost projection under multiple strategies",
      "RFP specifications for optimal coverage"
    ],
    turnaroundDays: 10,
    requiredData: [
      "24 months of large claims data",
      "Current stop-loss policy",
      "Employee census with age/gender",
      "Historical premium payments"
    ],
    idealFor: [
      "Self-insured employers reviewing renewals",
      "CFOs evaluating captive insurance strategies",
      "Risk managers optimizing retention levels",
      "TPAs advising self-funded clients"
    ],
    sampleInsights: [
      "Recommended $250K attachment saved $180K annually",
      "Identified 78% probability of favorable claims year",
      "Found $95K in over-insured aggregate coverage"
    ]
  },

  {
    id: "contract-leakage-audit",
    name: "Contract Leakage Audit",
    price: 2500,
    category: "contract",
    description: "Line-by-line forensic audit of vendor contract compliance identifying guarantee failures, pricing errors, and administrative fee overcharges.",
    deliverables: [
      "Guarantee performance scorecard",
      "Pricing accuracy audit (sample of 500 transactions)",
      "Administrative fee validation",
      "Network discount verification",
      "Contract term compliance matrix",
      "Recovery demand letter template"
    ],
    turnaroundDays: 21,
    requiredData: [
      "Vendor contracts (TPA, PBM, carrier)",
      "12 months of claims and invoices",
      "Performance guarantee metrics",
      "Administrative fee schedules"
    ],
    idealFor: [
      "Boards investigating EBITDA erosion",
      "HR leaders managing vendor accountability",
      "Legal teams pursuing contract disputes",
      "Consultants validating vendor performance"
    ],
    sampleInsights: [
      "Recovered $1.2M in guarantee failures",
      "Found 14% admin fee overcharges",
      "Identified $327K in uncredited rebates"
    ]
  },

  {
    id: "claims-trend-forecast",
    name: "Claims Trend Forecasting Report",
    price: 2100,
    category: "actuarial",
    description: "Actuarial trend analysis projecting medical and pharmacy costs 12-36 months forward using credibility-weighted models and population health adjustments.",
    deliverables: [
      "Medical trend projection by service category",
      "Pharmacy trend with specialty drug impact",
      "Utilization vs. unit cost decomposition",
      "Credibility analysis by claim type",
      "GLP-1 and specialty drug scenario modeling",
      "Budget planning recommendations"
    ],
    turnaroundDays: 12,
    requiredData: [
      "36 months of claims experience",
      "Employee census with demographics",
      "Current plan design",
      "Known population health changes"
    ],
    idealFor: [
      "CFOs setting annual benefits budgets",
      "Actuaries preparing rate filings",
      "HR teams negotiating carrier renewals",
      "PE operators modeling acquisition targets"
    ],
    sampleInsights: [
      "Projected 8.4% medical trend vs. 11% carrier estimate",
      "GLP-1 adoption to add 3.2% pharmacy trend",
      "Identified $450K budget cushion opportunity"
    ]
  },

  {
    id: "fiduciary-compliance-assessment",
    name: "Fiduciary Compliance Assessment",
    price: 2800,
    category: "compliance",
    description: "ERISA fiduciary compliance audit evaluating plan governance, vendor oversight, fee reasonableness, and litigation risk exposure.",
    deliverables: [
      "Fiduciary governance scorecard (0-100)",
      "ERISA compliance checklist with gap analysis",
      "Vendor oversight policy recommendations",
      "Fee reasonableness benchmarking",
      "Litigation risk heat map",
      "Remediation action plan"
    ],
    turnaroundDays: 18,
    requiredData: [
      "Plan documents (SPD, trust agreement)",
      "Vendor contracts and fee disclosures",
      "Committee meeting minutes (12 months)",
      "Form 5500 filings"
    ],
    idealFor: [
      "Board members evaluating fiduciary exposure",
      "HR leaders preparing for DOL audits",
      "Legal counsel assessing litigation risk",
      "Consultants advising plan sponsors"
    ],
    sampleInsights: [
      "Identified 7 material fiduciary gaps",
      "Found $280K in unreasonable indirect fees",
      "Recommended governance policy to reduce DOL risk"
    ]
  },

  {
    id: "specialty-drug-economics",
    name: "Specialty Drug Economics Report",
    price: 2400,
    category: "pbm",
    description: "Deep-dive analysis of specialty pharmacy economics including site-of-care costs, white bagging opportunities, and manufacturer assistance optimization.",
    deliverables: [
      "Specialty drug utilization by therapeutic class",
      "Site-of-care cost comparison (medical vs. pharmacy)",
      "White bagging/brown bagging savings analysis",
      "Manufacturer copay assistance impact",
      "Specialty pharmacy network analysis",
      "Clinical pathway optimization recommendations"
    ],
    turnaroundDays: 15,
    requiredData: [
      "12 months of medical and pharmacy claims",
      "Specialty pharmacy contract",
      "Buy-and-bill program details",
      "Current utilization management policies"
    ],
    idealFor: [
      "Employers with high specialty drug spend",
      "CFOs targeting pharmacy cost reduction",
      "Clinical teams optimizing care pathways",
      "Consultants designing specialty strategies"
    ],
    sampleInsights: [
      "White bagging could save $620K annually",
      "Found 32% site-of-care cost differential",
      "Identified $180K in unused copay cards"
    ]
  },

  {
    id: "network-performance-analysis",
    name: "Network Performance Analysis",
    price: 2300,
    category: "contract",
    description: "Provider network utilization and discount validation showing actual vs. contracted rates, out-of-network leakage, and narrow network opportunities.",
    deliverables: [
      "Network utilization heat map by geography",
      "Discount validation (contracted vs. actual)",
      "Out-of-network cost leakage analysis",
      "Center of Excellence usage patterns",
      "Narrow network feasibility study",
      "Reference-based pricing opportunities"
    ],
    turnaroundDays: 16,
    requiredData: [
      "18 months of medical claims with provider IDs",
      "Network contracts and fee schedules",
      "Employee zip code distribution",
      "Current network access standards"
    ],
    idealFor: [
      "HR teams evaluating network adequacy",
      "CFOs exploring narrow network strategies",
      "TPAs advising on network design",
      "Regional employers with concentrated workforces"
    ],
    sampleInsights: [
      "Found $340K in discount guarantee failures",
      "23% of spend at out-of-network premium rates",
      "Narrow network could reduce costs 18%"
    ]
  },

  {
    id: "plan-design-optimization",
    name: "Plan Design Optimization Report",
    price: 2600,
    category: "actuarial",
    description: "Comprehensive plan design modeling showing cost and utilization impacts of deductible changes, HSA strategies, and benefit tier adjustments.",
    deliverables: [
      "Current plan design cost/utilization analysis",
      "5 alternative design scenarios with projections",
      "Employee premium contribution modeling",
      "HSA vs. traditional cost comparison",
      "Tax advantage quantification",
      "Implementation roadmap"
    ],
    turnaroundDays: 14,
    requiredData: [
      "24 months of claims by plan tier",
      "Employee census with salary bands",
      "Current contribution strategy",
      "Competitor plan design benchmarks (if available)"
    ],
    idealFor: [
      "HR leaders redesigning benefit offerings",
      "CFOs balancing cost and employee satisfaction",
      "Compensation teams optimizing total rewards",
      "Benefits consultants advising clients"
    ],
    sampleInsights: [
      "HSA strategy saves $520K in employer costs",
      "High deductible adoption could reach 68%",
      "Tax advantages worth $240K annually"
    ]
  },

  {
    id: "rebate-integrity-audit",
    name: "Rebate Integrity Audit",
    price: 2700,
    category: "pbm",
    description: "Forensic rebate audit verifying manufacturer rebate pass-through, formulary compliance, and PBM compensation arrangements per contract terms.",
    deliverables: [
      "Rebate reconciliation by therapeutic class",
      "Formulary compliance audit",
      "Administrative fee vs. rebate retention analysis",
      "Manufacturer contract verification sample",
      "Pass-through guarantee validation",
      "Recovery recommendations"
    ],
    turnaroundDays: 20,
    requiredData: [
      "PBM contract with rebate terms",
      "12 months of rebate reports",
      "Formulary drug list",
      "Pharmacy claims with NDC codes"
    ],
    idealFor: [
      "CFOs suspecting rebate underpayment",
      "Boards investigating PBM relationships",
      "Legal teams pursuing recovery actions",
      "Auditors validating financial statements"
    ],
    sampleInsights: [
      "Recovered $680K in unpaid rebates",
      "Found 19% formulary non-compliance",
      "Identified undisclosed admin fee carve-outs"
    ]
  },

  {
    id: "risk-adjustment-validation",
    name: "Risk Adjustment Validation",
    price: 2500,
    category: "actuarial",
    description: "Actuarial review of risk adjustment factors, HCC coding accuracy, and ACA risk corridor impacts for fully-insured and level-funded plans.",
    deliverables: [
      "HCC risk score validation",
      "Chronic condition prevalence analysis",
      "Coding accuracy assessment",
      "ACA risk adjustment reconciliation",
      "Expected vs. actual morbidity comparison",
      "Documentation improvement opportunities"
    ],
    turnaroundDays: 12,
    requiredData: [
      "12 months of diagnosis codes (ICD-10)",
      "Risk adjustment reports from carrier",
      "Employee health assessment data (if available)",
      "Historical risk scores"
    ],
    idealFor: [
      "Level-funded plan sponsors",
      "HR teams managing carrier reconciliations",
      "Population health managers",
      "Consultants advising on morbidity trends"
    ],
    sampleInsights: [
      "Identified $125K in risk score underpayment",
      "Found 12% coding documentation gaps",
      "Chronic condition prevalence 8% above norms"
    ]
  },

  {
    id: "form-5500-forensic-review",
    name: "Form 5500 Forensic Review",
    price: 3000,
    category: "compliance",
    description: "Expert forensic review of Form 5500 filings identifying disclosure gaps, participant fee reporting errors, and audit trigger risks.",
    deliverables: [
      "Line-by-line 5500 accuracy audit",
      "Participant fee disclosure validation",
      "Service provider fee reconciliation",
      "Audit trigger risk assessment",
      "Prior year filing comparison",
      "Corrective filing recommendations"
    ],
    turnaroundDays: 10,
    requiredData: [
      "Last 3 years of Form 5500 filings",
      "Audited financial statements (if required)",
      "All service provider agreements",
      "Fee disclosure documentation"
    ],
    idealFor: [
      "Plan sponsors preparing for DOL review",
      "Boards concerned about filing accuracy",
      "CFOs inheriting plan oversight",
      "Attorneys investigating fiduciary claims"
    ],
    sampleInsights: [
      "Found 6 material reporting errors",
      "Identified $95K in undisclosed indirect fees",
      "Recommended corrective filings to reduce risk"
    ]
  },

  {
    id: "broker-compensation-transparency",
    name: "Broker Compensation Transparency Report",
    price: 2900,
    category: "compliance",
    description: "Comprehensive disclosure audit of broker/consultant compensation including commissions, overrides, contingent fees, and undisclosed incentives.",
    deliverables: [
      "Total broker compensation summary",
      "Direct vs. indirect compensation breakdown",
      "Contingent commission and override disclosure",
      "Vendor rebate and incentive verification",
      "Fee reasonableness benchmarking",
      "Conflict of interest assessment"
    ],
    turnaroundDays: 15,
    requiredData: [
      "Broker agreement and fee schedules",
      "Carrier/vendor contracts",
      "Form 5500 Schedule C",
      "Broker performance reports (if available)"
    ],
    idealFor: [
      "Boards evaluating broker relationships",
      "CFOs conducting fee reasonableness reviews",
      "HR leaders investigating conflicts of interest",
      "Legal teams assessing ERISA compliance"
    ],
    sampleInsights: [
      "Found $180K in undisclosed contingent fees",
      "Broker total comp 3.2x disclosed amount",
      "Identified vendor rebate conflicts"
    ]
  }
];

/**
 * Get reports by category
 */
export function getReportsByCategory(category: IndividualReport["category"]): IndividualReport[] {
  return INDIVIDUAL_REPORTS.filter(r => r.category === category);
}

/**
 * Get reports by price range
 */
export function getReportsByPriceRange(min: number, max: number): IndividualReport[] {
  return INDIVIDUAL_REPORTS.filter(r => r.price >= min && r.price <= max);
}

/**
 * Get report by ID
 */
export function getReportById(id: string): IndividualReport | undefined {
  return INDIVIDUAL_REPORTS.find(r => r.id === id);
}

/**
 * Category metadata
 */
export const REPORT_CATEGORIES = {
  pbm: {
    label: "PBM & Pharmacy",
    description: "Pharmacy benefit manager forensics and drug cost intelligence",
    icon: "Pill"
  },
  actuarial: {
    label: "Actuarial & Risk",
    description: "Trend analysis, modeling, and risk optimization",
    icon: "TrendingUp"
  },
  compliance: {
    label: "Compliance & Governance",
    description: "ERISA fiduciary compliance and regulatory audits",
    icon: "Shield"
  },
  contract: {
    label: "Contract Intelligence",
    description: "Vendor contract audits and performance validation",
    icon: "FileSearch"
  },
  risk: {
    label: "Risk Management",
    description: "Stop-loss, network, and financial risk analysis",
    icon: "AlertTriangle"
  }
} as const;

/**
 * Pricing summary statistics
 */
export const REPORT_PRICING_STATS = {
  minPrice: Math.min(...INDIVIDUAL_REPORTS.map(r => r.price)),
  maxPrice: Math.max(...INDIVIDUAL_REPORTS.map(r => r.price)),
  avgPrice: Math.round(INDIVIDUAL_REPORTS.reduce((sum, r) => sum + r.price, 0) / INDIVIDUAL_REPORTS.length),
  medianPrice: 2450,
  totalReports: INDIVIDUAL_REPORTS.length
};