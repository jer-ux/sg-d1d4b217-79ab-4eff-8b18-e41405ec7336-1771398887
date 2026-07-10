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

/**
 * Enterprise Report Products (Fortune 100 Scale)
 * Priced from $50K to $1.2M
 */

export interface EnterpriseReport {
  id: string;
  name: string;
  price: number;
  category: "comprehensive" | "transformation" | "strategic" | "governance";
  description: string;
  scope: string;
  deliverables: string[];
  engagementDuration: string;
  teamComposition: string[];
  requiredData: string[];
  idealFor: string[];
  outcomes: string[];
}

export const ENTERPRISE_REPORTS: EnterpriseReport[] = [
  {
    id: "enterprise-total-cost-care",
    name: "Enterprise Total Cost of Care Analysis",
    price: 50000,
    category: "comprehensive",
    description: "Multi-year actuarial and financial analysis across all health benefit programs including medical, pharmacy, dental, vision, disability, and wellness.",
    scope: "National employer with 5,000+ employees across multiple plans and geographies",
    deliverables: [
      "3-year claims trend analysis by program",
      "Total cost of care per member decomposition",
      "Network performance benchmarking (all 50 states)",
      "PBM and specialty pharmacy forensic audit",
      "Stop-loss optimization modeling",
      "Vendor performance scorecard (all contractors)",
      "10-year cost projection under 5 scenarios",
      "Board-ready executive presentation"
    ],
    engagementDuration: "8-10 weeks",
    teamComposition: [
      "Lead Actuary (FSA/ASA)",
      "Senior Healthcare Economist",
      "Data Science Team (3 analysts)",
      "Compliance Specialist",
      "Project Manager"
    ],
    requiredData: [
      "36 months of claims data (medical, Rx, ancillary)",
      "Employee census with demographics",
      "All vendor contracts and fee schedules",
      "Financial statements related to benefits",
      "Historical Form 5500 filings"
    ],
    idealFor: [
      "Multi-site employers with 5,000-15,000 lives",
      "Companies preparing for major restructuring",
      "PE-backed firms optimizing EBITDA",
      "Self-insured plans evaluating TPA performance"
    ],
    outcomes: [
      "Identified $8.2M in annual savings opportunities",
      "Quantified $3.1M in vendor contract leakage",
      "Recommended plan design changes saving $5.4M",
      "Optimized stop-loss reducing premium 22%"
    ]
  },

  {
    id: "fortune-100-fiduciary-transformation",
    name: "Fortune 100 Fiduciary Transformation Program",
    price: 180000,
    category: "transformation",
    description: "Comprehensive ERISA fiduciary governance overhaul including policy design, committee training, vendor oversight framework, and litigation risk mitigation.",
    scope: "Fortune 500 employer with $100M+ annual benefits spend managing multiple health and welfare plans",
    deliverables: [
      "Fiduciary governance assessment (current state)",
      "ERISA compliance gap analysis",
      "Fiduciary committee charter and operating procedures",
      "Vendor oversight policy and RFP framework",
      "Fee benchmarking study (market rate analysis)",
      "Litigation risk assessment with mitigation plan",
      "DOL audit preparedness program",
      "12-month implementation roadmap",
      "Quarterly compliance monitoring dashboard"
    ],
    engagementDuration: "12-16 weeks implementation + 12 months support",
    teamComposition: [
      "ERISA Attorney (Partner-level)",
      "Senior Fiduciary Consultant",
      "Compliance Auditor",
      "Benefits Governance Specialist",
      "Change Management Lead"
    ],
    requiredData: [
      "Plan documents for all health and welfare plans",
      "5 years of committee meeting minutes",
      "All vendor contracts and fee disclosures",
      "Form 5500 filings (5 years)",
      "Any litigation or DOL correspondence history"
    ],
    idealFor: [
      "Fortune 500 companies with fiduciary exposure",
      "Organizations facing litigation threats",
      "Companies post-merger integration",
      "Boards demanding governance maturity"
    ],
    outcomes: [
      "Reduced litigation risk score from 78 to 12",
      "Established defensible fiduciary framework",
      "Recovered $2.4M in unreasonable fees",
      "Passed DOL audit with zero findings"
    ]
  },

  {
    id: "multi-year-actuarial-strategy",
    name: "Multi-Year Actuarial Strategy and Forecasting",
    price: 85000,
    category: "strategic",
    description: "5-year actuarial projection modeling claims trends, population health dynamics, regulatory impacts, and plan design optimization strategies.",
    scope: "Large employer (15,000-50,000 lives) with complex plan designs and multi-state operations",
    deliverables: [
      "5-year claims trend forecast by service category",
      "Population health trajectory modeling",
      "Specialty drug impact analysis (GLP-1, oncology, gene therapy)",
      "Regulatory scenario analysis (ACA, state mandates)",
      "Plan design optimization modeling (20+ scenarios)",
      "Contribution strategy recommendations",
      "M&A integration impact analysis",
      "Annual refresh process documentation"
    ],
    engagementDuration: "10-12 weeks",
    teamComposition: [
      "Chief Actuary (FSA)",
      "Healthcare Economist",
      "Data Scientist (predictive modeling)",
      "Population Health Specialist"
    ],
    requiredData: [
      "5 years of claims experience",
      "Employee census with turnover data",
      "Current and proposed plan designs",
      "Strategic workforce planning documents",
      "M&A pipeline (if applicable)"
    ],
    idealFor: [
      "CFOs building 5-year financial models",
      "HR leaders planning benefit strategy",
      "PE firms evaluating portfolio companies",
      "Companies anticipating major workforce changes"
    ],
    outcomes: [
      "Projected 5-year trend 2.8% below market",
      "Identified $12M cumulative savings opportunity",
      "Modeled GLP-1 adoption saving $4.6M vs. unmanaged",
      "Built defensible 5-year budget model"
    ]
  },

  {
    id: "contract-forensics-recovery",
    name: "Enterprise Contract Forensics and Recovery Program",
    price: 120000,
    category: "governance",
    description: "Multi-vendor forensic audit across TPA, PBM, carrier, and specialty networks with legal-grade recovery documentation and demand letters.",
    scope: "Large self-insured employer with multiple vendors and $50M+ annual claims spend",
    deliverables: [
      "TPA contract compliance audit (3 years)",
      "PBM spread and rebate forensic analysis",
      "Carrier network discount validation",
      "Specialty pharmacy contract audit",
      "Administrative fee reconciliation",
      "Guarantee performance verification",
      "Legal-grade recovery documentation",
      "Demand letters for all material findings",
      "Vendor negotiation support (6 months)"
    ],
    engagementDuration: "14-18 weeks",
    teamComposition: [
      "Forensic Auditor (CPA/CFE)",
      "Healthcare Contract Attorney",
      "Claims Analytics Team (4 analysts)",
      "Negotiation Strategist",
      "Project Manager"
    ],
    requiredData: [
      "36 months of all vendor invoices",
      "All vendor contracts with amendments",
      "Claims data from all sources",
      "Performance guarantee reports",
      "Administrative fee schedules and actuals"
    ],
    idealFor: [
      "Self-insured employers suspecting vendor issues",
      "Companies preparing for vendor RFPs",
      "PE firms conducting operational due diligence",
      "Boards investigating EBITDA erosion"
    ],
    outcomes: [
      "Recovered $4.8M in contract violations",
      "Identified $18.3M in 3-year leakage",
      "Secured $2.1M in guarantee settlements",
      "Renegotiated contracts saving $6.2M annually"
    ]
  },

  {
    id: "population-health-intelligence",
    name: "Population Health Intelligence and Risk Stratification",
    price: 95000,
    category: "strategic",
    description: "Advanced analytics identifying high-risk populations, chronic disease prevalence, and targeted intervention opportunities with ROI modeling.",
    scope: "Large employer (20,000+ lives) seeking to optimize population health investments",
    deliverables: [
      "Population health segmentation (12 risk tiers)",
      "Chronic condition prevalence and cost analysis",
      "High-risk member identification and stratification",
      "Care gap analysis with closure opportunities",
      "Intervention program ROI modeling",
      "Pharmacy adherence optimization plan",
      "Predictive modeling for future high-cost claimants",
      "Targeted communication strategy",
      "12-month intervention roadmap"
    ],
    engagementDuration: "10-12 weeks",
    teamComposition: [
      "Population Health Actuary",
      "Clinical Data Scientist",
      "Behavioral Health Specialist",
      "Pharmacy Analytics Expert",
      "Care Management Consultant"
    ],
    requiredData: [
      "36 months of medical and pharmacy claims",
      "Lab results and biometric screening data",
      "Utilization management reports",
      "Current wellness program participation",
      "Employee Health Risk Assessments"
    ],
    idealFor: [
      "Large employers with aging populations",
      "Self-insured plans with high chronic disease burden",
      "Companies investing in population health programs",
      "HR teams seeking measurable wellness ROI"
    ],
    outcomes: [
      "Identified 847 members driving 34% of costs",
      "Targeted interventions projected to save $7.4M",
      "Pharmacy adherence program ROI of 4.2:1",
      "Reduced ER utilization by 18% in high-risk cohort"
    ]
  },

  {
    id: "ma-integration-benefits-audit",
    name: "M&A Integration Benefits Due Diligence",
    price: 145000,
    category: "strategic",
    description: "Pre-acquisition benefits audit and post-merger integration planning covering all health and welfare programs, liabilities, and harmonization strategies.",
    scope: "Acquiring company evaluating target with 10,000+ employees and complex benefit structures",
    deliverables: [
      "Target benefits program assessment",
      "Hidden liability identification (IBNR, retiree benefits)",
      "Contract obligation analysis (all vendors)",
      "Plan design comparison and harmonization options",
      "Integration cost modeling (5 scenarios)",
      "Synergy opportunity quantification",
      "Vendor consolidation strategy",
      "Employee communication plan",
      "18-month integration roadmap",
      "Risk-adjusted valuation impact analysis"
    ],
    engagementDuration: "6-8 weeks due diligence + 12 weeks integration planning",
    teamComposition: [
      "M&A Benefits Specialist (20+ years experience)",
      "Actuary (FSA/MAAA)",
      "ERISA Attorney",
      "Integration Project Manager",
      "Change Management Consultant"
    ],
    requiredData: [
      "Target's 5 years of claims experience",
      "All benefit plan documents",
      "Vendor contracts and fee schedules",
      "Form 5500 filings (5 years)",
      "Retiree benefit obligations",
      "Employee census and demographics"
    ],
    idealFor: [
      "PE firms evaluating acquisitions",
      "Strategic buyers in due diligence",
      "CFOs assessing deal structures",
      "Corporate development teams"
    ],
    outcomes: [
      "Identified $14.2M in hidden liabilities",
      "Negotiated $8.5M reduction in purchase price",
      "Harmonization plan saved $11.3M over 3 years",
      "Avoided $6.8M in integration mistakes"
    ]
  },

  {
    id: "regulatory-compliance-transformation",
    name: "Regulatory Compliance Transformation Program",
    price: 110000,
    category: "governance",
    description: "Enterprise-wide compliance assessment across ACA, ERISA, HIPAA, COBRA, and state mandates with remediation plan and ongoing monitoring framework.",
    scope: "National employer with 30+ states of operation and multiple plan designs",
    deliverables: [
      "Multi-jurisdictional compliance audit (federal + state)",
      "ACA reporting and penalty risk assessment",
      "HIPAA security and privacy audit",
      "COBRA administration review",
      "State mandate compliance matrix (all 50 states)",
      "Form 5500 filing accuracy review (5 years)",
      "Vendor compliance verification",
      "Remediation action plan with timeline",
      "Compliance monitoring dashboard",
      "Ongoing regulatory update service (12 months)"
    ],
    engagementDuration: "12-14 weeks",
    teamComposition: [
      "Employee Benefits Attorney (Partner-level)",
      "Compliance Specialist (ACA, ERISA, HIPAA)",
      "Benefits Administration Auditor",
      "Regulatory Affairs Consultant",
      "Implementation Manager"
    ],
    requiredData: [
      "Plan documents for all health and welfare plans",
      "ACA reporting files (5 years)",
      "COBRA administration records",
      "HIPAA policies and procedures",
      "Form 5500 filings (5 years)",
      "All vendor BAAs and compliance certifications"
    ],
    idealFor: [
      "Companies facing DOL or IRS audits",
      "Organizations with compliance gaps",
      "Multi-state employers with complex mandates",
      "Boards concerned about regulatory risk"
    ],
    outcomes: [
      "Resolved $890K in ACA penalty exposure",
      "Corrected 23 material compliance violations",
      "Established defensible compliance framework",
      "Avoided $2.4M in potential regulatory fines"
    ]
  },

  {
    id: "enterprise-pharmacy-optimization",
    name: "Enterprise Pharmacy Optimization and Rebate Maximization",
    price: 135000,
    category: "strategic",
    description: "Comprehensive pharmacy program analysis including PBM audit, formulary optimization, rebate maximization, and specialty drug strategies.",
    scope: "Large employer with $30M+ annual pharmacy spend",
    deliverables: [
      "3-year PBM contract forensic audit",
      "Rebate reconciliation and recovery analysis",
      "Formulary optimization recommendations",
      "Specialty drug cost containment strategies",
      "Biosimilar adoption opportunity analysis",
      "Manufacturer copay program optimization",
      "Alternative pharmacy network evaluation",
      "Cost-plus pricing feasibility study",
      "PBM RFP specifications",
      "Implementation roadmap with ROI projections"
    ],
    engagementDuration: "14-16 weeks",
    teamComposition: [
      "PBM Forensic Auditor",
      "Clinical Pharmacist (PharmD)",
      "Pharmacy Benefits Consultant",
      "Rebate Analytics Specialist",
      "Contract Negotiation Expert"
    ],
    requiredData: [
      "36 months of pharmacy claims (with NDC codes)",
      "PBM contract and all amendments",
      "Rebate reports and reconciliations",
      "Formulary documents",
      "Specialty pharmacy contract",
      "Manufacturer assistance program records"
    ],
    idealFor: [
      "Large employers with complex pharmacy programs",
      "Self-insured plans evaluating PBM relationships",
      "CFOs targeting pharmacy cost reduction",
      "Benefits teams preparing for PBM RFPs"
    ],
    outcomes: [
      "Recovered $6.7M in unpaid rebates",
      "Identified $14.3M in annual pharmacy savings",
      "Specialty drug strategies saved $8.9M",
      "Biosimilar adoption projected to save $3.2M annually"
    ]
  },

  {
    id: "board-level-benefits-governance",
    name: "Board-Level Benefits Governance and Risk Management",
    price: 160000,
    category: "governance",
    description: "Executive-level benefits governance framework including board education, fiduciary risk mitigation, vendor oversight protocols, and strategic planning support.",
    scope: "Fortune 500 company with board-level benefits oversight committee",
    deliverables: [
      "Board-level benefits governance assessment",
      "Fiduciary duty training for directors",
      "Risk dashboard and KPI framework",
      "Vendor oversight policy and procedures",
      "Strategic benefits planning framework",
      "Executive compensation benefits review",
      "Retiree benefit liability analysis",
      "Crisis management protocols",
      "Quarterly board reporting package",
      "Annual governance review process"
    ],
    engagementDuration: "10-12 weeks setup + 12 months ongoing support",
    teamComposition: [
      "Board Governance Consultant",
      "ERISA Attorney (30+ years experience)",
      "Chief Benefits Officer (former Fortune 100)",
      "Risk Management Specialist",
      "Executive Advisor"
    ],
    requiredData: [
      "Board committee charters and meeting minutes",
      "Enterprise risk register",
      "All benefits-related contracts",
      "Executive compensation agreements",
      "Retiree benefit obligations",
      "Historical litigation and regulatory matters"
    ],
    idealFor: [
      "Fortune 500 boards seeking governance maturity",
      "Public companies with shareholder activism",
      "Organizations with significant retiree liabilities",
      "Boards facing benefits-related litigation"
    ],
    outcomes: [
      "Established board-approved governance framework",
      "Reduced board-level fiduciary risk by 67%",
      "Implemented quarterly risk monitoring dashboard",
      "Enhanced board meeting efficiency by 40%"
    ]
  },

  {
    id: "data-analytics-infrastructure",
    name: "Enterprise Health Data Analytics Infrastructure",
    price: 225000,
    category: "transformation",
    description: "Build enterprise-grade health data warehouse with AI/ML analytics platform, real-time dashboards, and predictive modeling capabilities.",
    scope: "Large employer (50,000+ lives) establishing self-service analytics capability",
    deliverables: [
      "Health data warehouse design and implementation",
      "Multi-source data integration (claims, HR, wellness)",
      "AI/ML predictive modeling framework",
      "Real-time executive dashboards (Tableau/Power BI)",
      "Self-service analytics portal for HR team",
      "Automated reporting and alerting system",
      "Data governance and security framework",
      "HIPAA compliance validation",
      "Training program for internal analytics team",
      "12-month platform optimization support"
    ],
    engagementDuration: "16-20 weeks implementation + 12 months support",
    teamComposition: [
      "Healthcare Data Architect",
      "Data Engineer (3 FTEs)",
      "Machine Learning Specialist",
      "Analytics Platform Developer",
      "Data Governance Consultant",
      "Training Specialist"
    ],
    requiredData: [
      "Historical claims data (all sources)",
      "HRIS data feeds",
      "Wellness platform data",
      "Biometric screening results",
      "Current reporting requirements",
      "IT infrastructure documentation"
    ],
    idealFor: [
      "Fortune 500 companies building internal capabilities",
      "Self-insured plans seeking data independence",
      "HR organizations demanding real-time insights",
      "Companies preparing for value-based care"
    ],
    outcomes: [
      "Built proprietary analytics platform",
      "Reduced vendor reporting costs by $480K annually",
      "Enabled real-time decision-making capability",
      "Improved forecast accuracy from 78% to 94%"
    ]
  },

  {
    id: "value-based-care-readiness",
    name: "Value-Based Care Readiness and Strategy",
    price: 175000,
    category: "transformation",
    description: "Prepare organization for value-based care models including ACO partnerships, bundled payments, and direct contracting strategies.",
    scope: "Large self-insured employer (25,000+ lives) exploring value-based arrangements",
    deliverables: [
      "Value-based care readiness assessment",
      "ACO partnership evaluation framework",
      "Bundled payment opportunity analysis",
      "Direct contracting feasibility study",
      "Quality metric baseline and target setting",
      "Provider network performance analysis",
      "Financial risk modeling (shared savings/risk)",
      "Legal and regulatory compliance review",
      "Implementation roadmap (3-year horizon)",
      "Vendor RFP specifications"
    ],
    engagementDuration: "14-16 weeks",
    teamComposition: [
      "Value-Based Care Strategist",
      "Healthcare Economist",
      "Provider Network Specialist",
      "Quality Metrics Analyst",
      "Healthcare Attorney"
    ],
    requiredData: [
      "36 months of medical claims with quality data",
      "Provider network contracts and performance",
      "Current quality metrics and outcomes",
      "Employee health risk assessment data",
      "Geographic distribution of employees"
    ],
    idealFor: [
      "Large employers seeking cost containment innovation",
      "Self-insured plans with concentrated geographies",
      "HR organizations demanding value-based outcomes",
      "Companies with progressive benefit strategies"
    ],
    outcomes: [
      "Identified 3 viable ACO partnerships",
      "Bundled payment strategy projected to save $9.8M",
      "Established quality metrics dashboard",
      "Negotiated shared savings arrangement worth $4.2M"
    ]
  },

  {
    id: "fortune-100-total-rewards",
    name: "Fortune 100 Total Rewards Optimization",
    price: 1200000,
    category: "transformation",
    description: "Comprehensive total rewards transformation including health benefits, retirement, equity compensation, and non-cash rewards with global workforce considerations.",
    scope: "Fortune 100 company with 100,000+ employees across multiple countries",
    deliverables: [
      "Global total rewards assessment (all geographies)",
      "Competitive market analysis (peer benchmarking)",
      "Health benefits optimization (US and international)",
      "Retirement program analysis and recommendations",
      "Equity compensation strategy review",
      "Non-cash rewards and recognition programs",
      "Total rewards cost modeling (10+ scenarios)",
      "Tax optimization strategies",
      "Employee value proposition redesign",
      "Communication strategy and change management",
      "Global implementation roadmap (3-year horizon)",
      "Ongoing strategic advisory (24 months)"
    ],
    engagementDuration: "26-30 weeks + 24 months strategic advisory",
    teamComposition: [
      "Total Rewards Practice Leader (25+ years)",
      "Global Benefits Consultant (3 FTEs)",
      "Retirement Plan Actuary (FSA/EA)",
      "Executive Compensation Specialist",
      "Global Mobility Expert",
      "Tax Strategist (CPA)",
      "Organizational Psychologist",
      "Change Management Team (4 FTEs)",
      "Project Management Office (3 FTEs)"
    ],
    requiredData: [
      "5 years of all benefits and compensation data",
      "Global employee census and demographics",
      "All benefits and compensation plan documents",
      "Peer company benchmarking data",
      "Employee satisfaction and retention metrics",
      "Total rewards spend by geography",
      "Strategic workforce planning documents",
      "M&A pipeline and integration plans"
    ],
    idealFor: [
      "Fortune 100 companies seeking competitive advantage",
      "Global employers with complex rewards structures",
      "Organizations facing talent attraction challenges",
      "Boards demanding total rewards transformation"
    ],
    outcomes: [
      "Redesigned total rewards saving $180M over 3 years",
      "Improved employee engagement scores by 23%",
      "Enhanced talent attraction and retention metrics",
      "Achieved top-quartile competitive positioning",
      "Optimized tax efficiency worth $42M annually"
    ]
  }
];

/**
 * Get enterprise reports by category
 */
export function getEnterpriseReportsByCategory(category: EnterpriseReport["category"]): EnterpriseReport[] {
  return ENTERPRISE_REPORTS.filter(r => r.category === category);
}

/**
 * Get enterprise reports by price range
 */
export function getEnterpriseReportsByPriceRange(min: number, max: number): EnterpriseReport[] {
  return ENTERPRISE_REPORTS.filter(r => r.price >= min && r.price <= max);
}

/**
 * Get all reports (individual + enterprise)
 */
export function getAllReports() {
  return {
    individual: INDIVIDUAL_REPORTS,
    enterprise: ENTERPRISE_REPORTS,
    total: INDIVIDUAL_REPORTS.length + ENTERPRISE_REPORTS.length
  };
}

/**
 * Enterprise report pricing statistics
 */
export const ENTERPRISE_PRICING_STATS = {
  minPrice: Math.min(...ENTERPRISE_REPORTS.map(r => r.price)),
  maxPrice: Math.max(...ENTERPRISE_REPORTS.map(r => r.price)),
  avgPrice: Math.round(ENTERPRISE_REPORTS.reduce((sum, r) => sum + r.price, 0) / ENTERPRISE_REPORTS.length),
  totalReports: ENTERPRISE_REPORTS.length
};