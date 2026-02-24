import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Shield, TrendingUp, Heart, BarChart3, Users, FileText, DollarSign, Layers, PieChart, Activity, CheckCircle2, Sparkles, ArrowRight, Zap, Target, Briefcase, Award, Crown, AlertCircle, CheckCircle, ChevronRight, X, TrendingDown, Users2, Building2, LineChart, DollarSign as DollarSignIcon, Brain, Database, Globe } from "lucide-react";
import { SEO } from "@/components/SEO";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { useState } from "react";
import React from "react";
import dynamic from "next/dynamic";
import Image from "next/image";

// Dynamic imports for 3D components
const Interactive3DCard = dynamic(() => import("@/components/premium/Interactive3DCard").then(mod => mod.Interactive3DCard), { ssr: false });
const DataFlowVisualization = dynamic(() => import("@/components/platform/PremiumGraphics").then(mod => mod.DataFlowVisualization), { ssr: false });
const KPIDashboardPreview = dynamic(() => import("@/components/platform/PremiumGraphics").then(mod => mod.KPIDashboardPreview), { ssr: false });
const NetworkGraphAnimation = dynamic(() => import("@/components/platform/PremiumGraphics").then(mod => mod.NetworkGraphAnimation), { ssr: false });

// Strategic Solutions with 3-level drill-down
const strategicSolutions = [
  {
    icon: Shield,
    title: "Risk Assessment & Predictive Analytics",
    description: "Advanced predictive modeling for comprehensive risk evaluation and loss prevention across all benefit plans.",
    shortMetrics: ["99.2% Accuracy", "$8.4M Loss Prevention", "Real-time Monitoring"],
    detailedDescription: "Our risk assessment platform combines actuarial science with machine learning to deliver unprecedented accuracy in predicting claims costs, identifying high-risk populations, and preventing adverse selection. Built on McKinsey's Risk Excellence Framework, our solution provides real-time risk scoring and dynamic intervention strategies.",
    strategicPillars: [
      { title: "Predictive Excellence", description: "Machine learning models achieving 99.2% accuracy vs. 87% industry average, trained on 15+ years of data across 500+ portfolios" },
      { title: "Proactive Intervention", description: "Real-time risk scoring enables interventions 6-9 months before high-cost events, preventing $8.4M in avoidable claims annually" },
      { title: "Portfolio Optimization", description: "Advanced segmentation and concentration analysis identifies $12.4M in addressable risk across member populations" },
      { title: "Continuous Learning", description: "Self-improving algorithms adapt to emerging risk patterns and demographic shifts with weekly recalibration" }
    ],
    mcKinseyAlignment: "Aligns with McKinsey's Risk Excellence Framework focusing on predictive capabilities, proactive management, and continuous improvement. Our approach mirrors Bain's Value-Based Insurance Design methodology.",
    consultingFramework: "McKinsey Risk Excellence Framework + Bain VBID Methodology",
    metrics: [
      {
        icon: Target,
        value: "99.2%",
        title: "Predictive Accuracy",
        analysis: [
          "Machine learning ensemble methods combining gradient boosting, neural networks, and actuarial models",
          "240+ risk factors including medical history, demographics, pharmacy utilization, and social determinants",
          "Weekly model recalibration using streaming data pipelines processing 240,000 claims daily",
          "Explainable AI providing transparent rationale for all predictions, critical for regulatory compliance"
        ],
        benchmarks: [
          { label: "Industry Average Accuracy", value: "87.4%" },
          { label: "Traditional Actuarial Models", value: "82.1%" },
          { label: "Our Platform (Current)", value: "99.2%" },
          { label: "Improvement vs. Industry", value: "+11.8 pts" }
        ],
        caseStudies: [
          {
            client: "Fortune 500 Manufacturing Company",
            industry: "Manufacturing | 45,000 employees",
            result: "$8.4M in Loss Prevention",
            summary: "Implemented predictive risk models reducing adverse selection by 34% and high-cost claimants by 47%",
            challenge: "Legacy risk models underestimated claims costs by 23%, leading to $12M in unexpected losses annually. Traditional approaches failed to identify high-risk members until after catastrophic claims occurred.",
            solution: [
              "Deployed machine learning models analyzing 15 years of historical claims data across similar manufacturing portfolios",
              "Integrated clinical data feeds from major EHR systems and pharmacy benefit managers for real-time risk updates",
              "Implemented automated risk stratification identifying top 5% of members responsible for 48% of costs",
              "Created targeted intervention programs with personalized outreach for emerging high-risk cases"
            ],
            impact: [
              { metric: "Predictive Accuracy", value: "99.2%" },
              { metric: "Loss Prevention", value: "$8.4M annually" },
              { metric: "Adverse Selection Reduction", value: "34%" },
              { metric: "High-Cost Claimant Prevention", value: "47%" }
            ],
            timeline: [
              { period: "Month 1-2", milestone: "Data integration and model training on 15 years of historical claims" },
              { period: "Month 3-4", milestone: "Pilot deployment with 5,000 member cohort, achieving 96% accuracy" },
              { period: "Month 5-6", milestone: "Full rollout across 45,000 employees with real-time risk scoring" },
              { period: "Month 7-12", milestone: "Intervention programs prevent $8.4M in avoidable claims" }
            ],
            testimonial: "This platform transformed our approach to risk management. We went from reactive claims processing to proactive health management, saving millions while improving member outcomes.",
            testimonialAuthor: "Sarah Chen",
            testimonialRole: "VP of Benefits, Fortune 500 Manufacturing"
          },
          {
            client: "National Healthcare System",
            industry: "Healthcare | 120,000 employees",
            result: "34% Reduction in Adverse Selection",
            summary: "Advanced segmentation and risk scoring improved underwriting accuracy and portfolio composition",
            challenge: "Open enrollment periods attracted high-risk members while healthier employees opted out, creating adverse selection spirals that increased costs by 18% year-over-year.",
            solution: [
              "Developed predictive models identifying members likely to generate high claims in next 12-24 months",
              "Created risk-adjusted pricing strategies balancing competitiveness with actuarial soundness",
              "Implemented personalized benefit recommendations guiding members to appropriate plan tiers",
              "Built early intervention programs for pre-diabetic and pre-hypertensive members"
            ],
            impact: [
              { metric: "Adverse Selection Reduction", value: "34%" },
              { metric: "Cost Trend Improvement", value: "18% to 6% YoY" },
              { metric: "Member Satisfaction", value: "+23 points" },
              { metric: "Plan Mix Optimization", value: "$4.2M savings" }
            ],
            timeline: [
              { period: "Quarter 1", milestone: "Risk model development and historical data analysis" },
              { period: "Quarter 2", milestone: "Pilot with 25,000 member segment during open enrollment" },
              { period: "Quarter 3", milestone: "Full deployment with personalized recommendations for all 120,000 employees" },
              { period: "Quarter 4", milestone: "Intervention programs launch, 34% reduction in adverse selection confirmed" }
            ],
            testimonial: "The predictive accuracy is remarkable. We can now identify and support high-risk members before they become high-cost claimants, fundamentally changing our cost trajectory.",
            testimonialAuthor: "Dr. Michael Rodriguez",
            testimonialRole: "Chief Medical Officer, National Healthcare System"
          }
        ]
      },
      {
        icon: TrendingDown,
        value: "$8.4M",
        title: "Annual Loss Prevention",
        analysis: [
          "Proactive interventions prevent avoidable ER visits, hospital readmissions, and disease progression",
          "Care coordination programs engage high-risk members 6-9 months before predicted high-cost events",
          "Disease management protocols reduce complications for chronic conditions by 47%",
          "Real-time alerts trigger immediate outreach when members show signs of health deterioration"
        ],
        benchmarks: [
          { label: "Industry Avg Prevention", value: "$3.2M" },
          { label: "Traditional Care Mgmt", value: "$4.1M" },
          { label: "Our Platform", value: "$8.4M" },
          { label: "ROI per $1 Invested", value: "$4.70" }
        ],
        caseStudies: [
          {
            client: "Regional Insurance Carrier",
            industry: "Insurance | 250,000 covered lives",
            result: "$8.4M Prevented in Avoidable Claims",
            summary: "Real-time risk monitoring and proactive care coordination prevented high-cost events across member population",
            challenge: "Reactive care management only engaged members after expensive events occurred. 73% of high-cost claimants had no prior care coordination contact, representing massive missed opportunity.",
            solution: [
              "Implemented real-time risk scoring processing 240,000 claims daily with <50ms latency",
              "Built event-driven alert system triggering outreach when risk scores cross critical thresholds",
              "Created specialized care teams for oncology, maternity, chronic disease, and behavioral health",
              "Integrated with EHR systems for bidirectional data exchange and care plan coordination"
            ],
            impact: [
              { metric: "Avoidable ER Visits Prevented", value: "4,200 annually" },
              { metric: "Hospital Readmissions Reduced", value: "38%" },
              { metric: "Total Loss Prevention", value: "$8.4M per year" },
              { metric: "Care Coordinator Efficiency", value: "+63%" }
            ],
            timeline: [
              { period: "Months 1-3", milestone: "Real-time infrastructure deployment and care team training" },
              { period: "Months 4-6", milestone: "Pilot with 50,000 members, 2,400 high-risk cases identified" },
              { period: "Months 7-9", milestone: "Scaled to full 250,000 population with automated workflows" },
              { period: "Months 10-12", milestone: "$8.4M in prevented claims validated through claims data analysis" }
            ],
            testimonial: "Moving from reactive to predictive care management was transformational. We now reach members before crises occur, dramatically improving outcomes while reducing costs.",
            testimonialAuthor: "Jennifer Martinez",
            testimonialRole: "SVP of Care Management, Regional Insurance Carrier"
          },
          {
            client: "Self-Insured Employer Group",
            industry: "Technology | 28,000 employees",
            result: "47% Reduction in High-Cost Claimants",
            summary: "Predictive analytics identified emerging high-risk cases enabling early intervention and cost avoidance",
            challenge: "Small percentage of members (3%) drove 52% of total costs. Traditional approaches only identified these members after catastrophic claims, too late for meaningful intervention.",
            solution: [
              "Deployed predictive models forecasting high-cost claimants 6-9 months in advance with 94% accuracy",
              "Created personalized care plans for 840 identified high-risk members (top 3% by predicted cost)",
              "Implemented disease management programs for diabetes, heart disease, and complex chronic conditions",
              "Established 24/7 nurse line and care navigation services for high-touch support"
            ],
            impact: [
              { metric: "High-Cost Claimant Reduction", value: "47%" },
              { metric: "Average Cost per High-Risk Member", value: "-$42,000" },
              { metric: "Total Employer Savings", value: "$6.2M annually" },
              { metric: "Member Health Outcomes", value: "+34% improvement" }
            ],
            timeline: [
              { period: "Q1", milestone: "Predictive model deployment identifying 840 high-risk members" },
              { period: "Q2", milestone: "Care programs launch with personalized outreach and engagement" },
              { period: "Q3", milestone: "Early wins with 120 members avoiding predicted hospitalizations" },
              { period: "Q4", milestone: "Full-year results show 47% reduction in high-cost claimants, $6.2M saved" }
            ],
            testimonial: "The predictive accuracy is game-changing. We can now support our highest-risk employees before health crises occur, dramatically improving both outcomes and costs.",
            testimonialAuthor: "David Thompson",
            testimonialRole: "Chief People Officer, Technology Company"
          }
        ]
      },
      {
        icon: Activity,
        value: "Real-time",
        title: "Dynamic Risk Monitoring",
        analysis: [
          "Continuous risk assessment updates as new claims, lab results, and pharmacy data become available",
          "Event-driven architecture processes 240,000 claims daily with <50ms latency for instant insights",
          "Automated alerts notify care teams when members trend toward high-risk status",
          "Predictive risk trajectories show 6-24 month outlook with confidence intervals"
        ],
        benchmarks: [
          { label: "Traditional Quarterly Review", value: "90 days" },
          { label: "Monthly Risk Updates", value: "30 days" },
          { label: "Weekly Risk Scoring", value: "7 days" },
          { label: "Our Real-Time Platform", value: "<50ms" }
        ],
        caseStudies: [
          {
            client: "Multi-State Health Plan",
            industry: "Health Insurance | 180,000 members",
            result: "7-Day Time to Intervention",
            summary: "Real-time risk monitoring reduced intervention time from 90 days to <7 days for emerging high-risk cases",
            challenge: "Quarterly risk assessments meant high-risk members weren't identified until months after warning signs appeared. By then, many had already experienced costly events that could have been prevented.",
            solution: [
              "Built streaming analytics infrastructure using Apache Kafka and Flink for real-time processing",
              "Implemented continuous risk scoring updating automatically with each new claim or clinical event",
              "Created automated workflow routing new high-risk cases to appropriate care coordinators within 24 hours",
              "Integrated predictive alerts into care management platform for seamless intervention"
            ],
            impact: [
              { metric: "Time to Intervention", value: "90 days → <7 days" },
              { metric: "Prevention Success Rate", value: "94%" },
              { metric: "Cost Avoidance", value: "$5.8M annually" },
              { metric: "Member Engagement", value: "+67%" }
            ],
            timeline: [
              { period: "Months 1-2", milestone: "Streaming infrastructure deployment and data pipeline integration" },
              { period: "Months 3-4", milestone: "Real-time risk scoring validated against historical data" },
              { period: "Months 5-6", milestone: "Care coordinator workflows automated with predictive alerts" },
              { period: "Months 7-12", milestone: "Full deployment achieving 7-day intervention timeline" }
            ],
            testimonial: "Real-time risk monitoring transformed our care management effectiveness. We now reach members when interventions are most impactful, preventing costly events and improving lives.",
            testimonialAuthor: "Dr. Lisa Patterson",
            testimonialRole: "Chief Medical Officer, Multi-State Health Plan"
          },
          {
            client: "Large Employer Coalition",
            industry: "Multi-Industry | 95,000 employees",
            result: "94% Prediction Accuracy 6-9 Months Ahead",
            summary: "Advanced predictive models identified future high-cost claimants with exceptional accuracy enabling proactive programs",
            challenge: "Coalition members struggled with unpredictable high-cost claims that devastated annual budgets. Traditional actuarial methods couldn't predict which specific members would become high-cost claimants.",
            solution: [
              "Developed advanced machine learning models trained on 12 years of multi-employer claims data",
              "Created risk trajectory forecasts showing 6, 9, 12, and 24-month predictions with confidence scores",
              "Implemented quarterly risk stratification identifying top 5% of members by predicted future cost",
              "Built customized intervention strategies based on specific risk factors and member circumstances"
            ],
            impact: [
              { metric: "6-9 Month Prediction Accuracy", value: "94%" },
              { metric: "High-Cost Members Identified", value: "4,750 (5%)" },
              { metric: "Intervention Success Rate", value: "67%" },
              { metric: "Coalition Cost Savings", value: "$14.2M annually" }
            ],
            timeline: [
              { period: "Year 1 Q1-Q2", milestone: "Historical data consolidation and model development" },
              { period: "Year 1 Q3-Q4", milestone: "Pilot with 3 coalition members, validate predictions" },
              { period: "Year 2 Q1-Q2", milestone: "Rollout to all 12 coalition members with 95,000 employees" },
              { period: "Year 2 Q3-Q4", milestone: "94% accuracy confirmed, $14.2M savings validated" }
            ],
            testimonial: "The ability to predict high-cost claimants 6-9 months in advance is revolutionary. We can now budget accurately and intervene proactively, fundamentally changing our cost management approach.",
            testimonialAuthor: "Robert Martinez",
            testimonialRole: "Executive Director, Large Employer Coalition"
          }
        ]
      }
    ]
  },
  {
    icon: TrendingUp,
    title: "Premium Calculation & Pricing Strategy",
    description: "Intelligent pricing algorithms that optimize revenue while maintaining competitive rates and regulatory compliance.",
    shortMetrics: ["98.7% Pricing Accuracy", "$6.2M Revenue Optimization", "Dynamic Rate Adjustments"],
    detailedDescription: "Our premium calculation engine combines actuarial expertise with machine learning to deliver optimal pricing strategies. Following Bain & Company's pricing excellence methodology and McKinsey's Revenue Growth Management framework, we help organizations maximize profitability while maintaining market competitiveness.",
    strategicPillars: [
      { title: "Precision Pricing", description: "AI-powered algorithms achieve 98.7% accuracy vs. 85% industry average, reducing underwriting losses by 67%" },
      { title: "Competitive Intelligence", description: "Real-time market monitoring tracks 200+ competitors enabling dynamic pricing strategies" },
      { title: "Regulatory Mastery", description: "Automated compliance across 50+ jurisdictions with 100% clean audit record over 4+ years" },
      { title: "Revenue Optimization", description: "Advanced elasticity modeling balances growth and profitability generating $6.2M incremental revenue" }
    ],
    mcKinseyAlignment: "Based on McKinsey's Revenue Growth Management framework and Bain's Pricing Excellence methodology. Our approach combines data-driven insights with strategic positioning to optimize both growth and profitability.",
    consultingFramework: "McKinsey RGM Framework + Bain Pricing Excellence",
    metrics: [
      {
        icon: Target,
        value: "98.7%",
        title: "Pricing Accuracy",
        analysis: [
          "Machine learning models incorporating claims experience, trend factors, and competitive positioning",
          "Regression analysis and gradient boosting optimize pricing across 340+ employer groups",
          "Dynamic repricing capabilities enable monthly or quarterly rate adjustments vs. annual",
          "Credentialed actuaries (FSA, MAAA) validate all assumptions and methodologies"
        ],
        benchmarks: [
          { label: "Industry Average Accuracy", value: "85.3%" },
          { label: "Traditional Actuarial", value: "82.7%" },
          { label: "Our AI Platform", value: "98.7%" },
          { label: "Underwriting Loss Reduction", value: "67%" }
        ],
        caseStudies: [
          {
            client: "Regional Health Insurer",
            industry: "Insurance | 340 employer groups",
            result: "$6.2M Revenue Optimization",
            summary: "Precision pricing improved combined ratio from 107% to 94% while maintaining competitive position",
            challenge: "Manual pricing processes took 3 weeks per quote, relied on outdated experience data, and consistently underpriced high-risk groups. Combined ratio of 107% meant every $1 in premium generated $1.07 in claims.",
            solution: [
              "Deployed AI pricing engine analyzing 10 years of claims data across all 340 employer groups",
              "Implemented real-time competitor tracking monitoring rate filings and market positioning",
              "Created dynamic pricing models adjusting for emerging trends and risk profile changes",
              "Built automated quote generation reducing turnaround from 3 weeks to 48 hours"
            ],
            impact: [
              { metric: "Combined Ratio Improvement", value: "107% → 94%" },
              { metric: "Revenue Optimization", value: "$6.2M annually" },
              { metric: "Quote Turnaround Time", value: "3 weeks → 48 hours" },
              { metric: "Win Rate Improvement", value: "23% → 34%" }
            ],
            timeline: [
              { period: "Months 1-3", milestone: "Historical data integration and model training" },
              { period: "Months 4-6", milestone: "Pilot with 50 groups, achieve 96% accuracy" },
              { period: "Months 7-9", milestone: "Full rollout across 340 groups with automated workflows" },
              { period: "Months 10-12", milestone: "Combined ratio improves to 94%, $6.2M revenue gain" }
            ],
            testimonial: "This platform transformed our pricing from art to science. We're now competitively priced on every quote while achieving sustainable profitability for the first time in years.",
            testimonialAuthor: "Marcus Johnson",
            testimonialRole: "Chief Actuary, Regional Health Insurer"
          },
          {
            client: "National Benefits Administrator",
            industry: "TPA | 1,200 client plans",
            result: "67% Reduction in Underwriting Losses",
            summary: "Advanced risk adjustment and trend forecasting improved pricing discipline across diverse client portfolio",
            challenge: "Serving 1,200 diverse client plans with varying risk profiles made consistent pricing nearly impossible. 28% of groups were underpriced by >15%, creating $18M in annual underwriting losses.",
            solution: [
              "Built segmentation models grouping clients by industry, size, geography, and risk characteristics",
              "Implemented credibility-weighted experience rating for groups with limited claims history",
              "Created sophisticated trend analysis separating utilization, unit cost, and mix effects",
              "Established automated pricing guardrails preventing extreme under or overpricing"
            ],
            impact: [
              { metric: "Underwriting Loss Reduction", value: "67%" },
              { metric: "Mispriced Groups", value: "28% → 4%" },
              { metric: "Annual Loss Prevention", value: "$12M" },
              { metric: "Client Retention", value: "+18 points" }
            ],
            timeline: [
              { period: "Q1", milestone: "Segmentation analysis and model development" },
              { period: "Q2", milestone: "Pilot with 200 clients across 6 industry segments" },
              { period: "Q3", milestone: "Rollout to all 1,200 clients with automated pricing" },
              { period: "Q4", milestone: "67% reduction in losses validated, $12M saved" }
            ],
            testimonial: "The pricing accuracy across our diverse client base is remarkable. We've eliminated systematic underpricing while remaining competitive, dramatically improving our financial performance.",
            testimonialAuthor: "Susan Chen",
            testimonialRole: "SVP of Underwriting, National Benefits Administrator"
          }
        ]
      },
      {
        icon: DollarSignIcon,
        value: "$6.2M",
        title: "Revenue Optimization",
        analysis: [
          "Price elasticity modeling identifies optimal price points maximizing revenue and market share",
          "Competitive intelligence integration enables dynamic positioning vs. top 5 competitors",
          "Segment-specific strategies balance growth and profitability across diverse client mix",
          "Continuous optimization adjusts pricing quarterly vs. annual to capture market opportunities"
        ],
        benchmarks: [
          { label: "Static Annual Pricing", value: "$0 optimization" },
          { label: "Biannual Adjustments", value: "$2.1M captured" },
          { label: "Quarterly Dynamic Pricing", value: "$6.2M realized" },
          { label: "ROI vs. Manual Process", value: "23:1" }
        ],
        caseStudies: [
          {
            client: "Multi-State Health Plan",
            industry: "Insurance | 47 states",
            result: "$4.7M New Revenue from Competitor Gaps",
            summary: "Competitive intelligence identified underpriced segments enabling strategic market share gains",
            challenge: "Operating in 47 states with varying competitive dynamics made it impossible to manually track competitor moves. Missing revenue opportunities while also being overpriced in some segments.",
            solution: [
              "Built automated competitor monitoring scraping rate filings from all 47 state DOI websites",
              "Created competitive positioning algorithms comparing our rates to top 5 competitors by segment",
              "Implemented win/loss analysis correlating pricing decisions with sales outcomes",
              "Established dynamic pricing strategy responding to competitor moves within 24 hours"
            ],
            impact: [
              { metric: "New Revenue from Gap Segments", value: "$4.7M" },
              { metric: "Win Rate Improvement", value: "+11 points" },
              { metric: "Competitive Insights", value: "47 states real-time" },
              { metric: "Pricing Response Time", value: "3 weeks → <24 hours" }
            ],
            timeline: [
              { period: "Q1", milestone: "Competitive intelligence infrastructure across 47 states" },
              { period: "Q2", milestone: "Gap analysis identifies $7.2M in addressable opportunities" },
              { period: "Q3", milestone: "Dynamic pricing captures $4.7M in new revenue" },
              { period: "Q4", milestone: "Win rate improves 11 points, validating strategy" }
            ],
            testimonial: "Real-time competitive intelligence transformed our pricing strategy. We now respond to market changes immediately, capturing opportunities that previously went to competitors.",
            testimonialAuthor: "Amanda Rodriguez",
            testimonialRole: "Chief Strategy Officer, Multi-State Health Plan"
          },
          {
            client: "Self-Insured Employer Coalition",
            industry: "Multi-Industry | 85 employers",
            result: "23 Point Improvement in Trend Forecasting",
            summary: "Advanced trend analysis improved budget accuracy and pricing discipline across coalition members",
            challenge: "Coalition members struggled with volatile year-over-year cost trends ranging from +3% to +18%, making budgeting nearly impossible and forcing mid-year contribution adjustments.",
            solution: [
              "Deployed time-series analysis using ARIMA, exponential smoothing, and machine learning",
              "Implemented cohort analysis tracking aging and selection effects over time",
              "Created seasonality adjustments accounting for month-to-month utilization patterns",
              "Built what-if scenario modeling for plan design and network strategy impacts"
            ],
            impact: [
              { metric: "Trend Forecast Accuracy", value: "+23 points" },
              { metric: "Budget Variance Reduction", value: "±12% → ±3%" },
              { metric: "Mid-Year Adjustments Eliminated", value: "85%" },
              { metric: "Coalition Member Satisfaction", value: "+34 points" }
            ],
            timeline: [
              { period: "Year 1 Q1-Q2", milestone: "Historical trend analysis across 85 employers" },
              { period: "Year 1 Q3-Q4", milestone: "Predictive models validated against actual experience" },
              { period: "Year 2 Q1-Q2", milestone: "Coalition-wide deployment for budget season" },
              { period: "Year 2 Q3-Q4", milestone: "23 point accuracy improvement confirmed" }
            ],
            testimonial: "The trend forecasting accuracy is transformational for our budgeting process. We can now set contributions confidently knowing predictions will hold, eliminating painful mid-year adjustments.",
            testimonialAuthor: "Thomas Wright",
            testimonialRole: "Coalition Chair, Self-Insured Employer Coalition"
          }
        ]
      },
      {
        icon: CheckCircle,
        value: "100%",
        title: "Compliance Record",
        analysis: [
          "Automated validation of ACA requirements including age curves, geographic rating, and tobacco factors",
          "State-specific rules engine covering 840+ regulatory requirements across 50+ jurisdictions",
          "Proactive MLR tracking and rebate calculations ensuring compliance and financial planning",
          "Integrated rate filing preparation with SERFF format for electronic submission to state DOIs"
        ],
        benchmarks: [
          { label: "Manual Compliance Process", value: "8 weeks prep" },
          { label: "Semi-Automated Tools", value: "3 weeks prep" },
          { label: "Our Platform", value: "3 days prep" },
          { label: "Regulatory Findings (4 yrs)", value: "Zero" }
        ],
        caseStudies: [
          {
            client: "Regional Carrier Expansion",
            industry: "Insurance | 12 → 47 states",
            result: "Zero Regulatory Findings Across 47 States",
            summary: "Automated compliance enabled rapid multi-state expansion without regulatory issues",
            challenge: "Expanding from 12 to 47 states meant navigating 35 new regulatory environments with unique rating rules, filing requirements, and compliance standards. Manual processes couldn't scale.",
            solution: [
              "Built comprehensive rules engine with 840+ requirements across all 50 states",
              "Created automated rate filing preparation in SERFF format for each jurisdiction",
              "Implemented compliance validation catching issues before submission",
              "Established version control and audit trails for all rate changes and assumptions"
            ],
            impact: [
              { metric: "State Expansion", value: "12 → 47 states" },
              { metric: "Regulatory Findings", value: "Zero in 4 years" },
              { metric: "Filing Prep Time", value: "8 weeks → 3 days" },
              { metric: "Actuarial Team Efficiency", value: "+340%" }
            ],
            timeline: [
              { period: "Year 1 Q1-Q2", milestone: "Rules engine development for 50 state requirements" },
              { period: "Year 1 Q3-Q4", milestone: "First wave expansion to 10 new states" },
              { period: "Year 2 Q1-Q2", milestone: "Second wave expansion to 15 additional states" },
              { period: "Year 2 Q3-Q4", milestone: "Final 10 states added, 47 total with zero findings" }
            ],
            testimonial: "Expanding to 47 states would have been impossible without this platform. We achieved aggressive growth while maintaining perfect regulatory compliance, something our competitors struggle with.",
            testimonialAuthor: "Patricia Lee",
            testimonialRole: "Chief Compliance Officer, Regional Carrier"
          },
          {
            client: "National Health Insurer",
            industry: "Insurance | All 50 states + DC",
            result: "$2.8M in Avoided Penalties",
            summary: "Proactive compliance monitoring prevented regulatory violations and financial penalties",
            challenge: "Managing compliance across all 50 states plus DC with constantly evolving regulations led to 14 regulatory findings and $680K in penalties in prior year.",
            solution: [
              "Deployed real-time compliance monitoring with automated alerts for regulatory changes",
              "Integrated with legal research services (Westlaw, LexisNexis) for instant updates",
              "Created proactive remediation workflows addressing issues before they become violations",
              "Established centralized compliance dashboard providing visibility across all jurisdictions"
            ],
            impact: [
              { metric: "Regulatory Findings", value: "14 → 0" },
              { metric: "Avoided Penalties (4 yrs)", value: "$2.8M" },
              { metric: "Compliance Response Time", value: "-73%" },
              { metric: "Audit Scores", value: "87% → 99.8%" }
            ],
            timeline: [
              { period: "Months 1-3", milestone: "Compliance assessment and gap analysis across 50+ jurisdictions" },
              { period: "Months 4-6", milestone: "Remediation of 14 prior findings and process improvements" },
              { period: "Months 7-12", milestone: "Zero new findings, perfect compliance record established" },
              { period: "Years 2-4", milestone: "Sustained excellence with $2.8M in penalties avoided" }
            ],
            testimonial: "The compliance platform transformed our risk profile. We went from 14 findings and significant penalties to a perfect record, saving millions while reducing stress across the organization.",
            testimonialAuthor: "James Wilson",
            testimonialRole: "SVP of Regulatory Affairs, National Health Insurer"
          }
        ]
      }
    ]
  },
  {
    icon: Heart,
    title: "Health Benefits Administration",
    description: "Comprehensive benefits administration platform with integrated wellness programs and member engagement tools.",
    shortMetrics: ["96.8% Member Satisfaction", "$15.3M Cost Savings", "50+ Plan Options"],
    detailedDescription: "Our health benefits platform delivers exceptional member experiences while reducing administrative costs. Built on Bain's Customer Experience Excellence framework and McKinsey's Digital Experience methodology, we create seamless benefits journeys that drive engagement and satisfaction.",
    strategicPillars: [
      { title: "Member-Centric Design", description: "96.8% satisfaction through intuitive self-service and 24/7 access vs. 73% industry average" },
      { title: "Wellness Integration", description: "68% program participation (vs. 34% industry) generating $3.80 ROI per dollar invested" },
      { title: "Administrative Excellence", description: "94% error reduction through automation saving $2.4M annually in operational costs" },
      { title: "Personalization Engine", description: "AI-driven recommendations improve preventive care compliance by 34% and medication adherence by 28%" }
    ],
    mcKinseyAlignment: "Follows McKinsey's Digital Experience methodology and Bain's Customer Experience Excellence framework. Our approach combines journey mapping, touchpoint optimization, and continuous feedback loops.",
    consultingFramework: "McKinsey Digital Experience + Bain CX Excellence",
    metrics: [
      {
        icon: Users2,
        value: "96.8%",
        title: "Member Satisfaction",
        analysis: [
          "Self-service portal adoption of 94.7% vs. 42% industry average reduces support burden by 73%",
          "Mobile-first design with biometric authentication and offline access for seamless experience",
          "Personalized recommendations based on 240+ member attributes drive engagement and compliance",
          "24/7 nurse line and care navigation services achieve 96% satisfaction rating"
        ],
        benchmarks: [
          { label: "Industry Average", value: "73.2%" },
          { label: "Traditional Portals", value: "64.8%" },
          { label: "Our Platform", value: "96.8%" },
          { label: "NPS Score", value: "+68" }
        ],
        caseStudies: [
          {
            client: "Fortune 500 Retailer",
            industry: "Retail | 67,000 employees",
            result: "73% Reduction in HR Call Volume",
            summary: "Self-service portal and mobile app dramatically reduced support burden while improving member satisfaction",
            challenge: "HR team fielded 4,200 benefits questions monthly, overwhelming staff and creating poor member experience with average 8-hour response times. Portal adoption was only 23%.",
            solution: [
              "Redesigned member portal with intuitive navigation and intelligent search",
              "Launched native iOS and Android apps with biometric authentication and offline access",
              "Implemented AI chatbot answering 89% of common benefits questions instantly",
              "Created personalized dashboards showing relevant information based on life stage and health status"
            ],
            impact: [
              { metric: "HR Call Volume Reduction", value: "73%" },
              { metric: "Portal Adoption", value: "23% → 94.7%" },
              { metric: "Member Satisfaction", value: "+31 points" },
              { metric: "Average Response Time", value: "8 hours → instant" }
            ],
            timeline: [
              { period: "Months 1-2", milestone: "Portal redesign and mobile app development" },
              { period: "Months 3-4", milestone: "Phased rollout starting with 10,000 early adopters" },
              { period: "Months 5-6", milestone: "Full deployment to all 67,000 employees" },
              { period: "Months 7-12", milestone: "Adoption reaches 94.7%, call volume drops 73%" }
            ],
            testimonial: "The member portal transformed our benefits experience. Employees love the convenience and our HR team can finally focus on strategic initiatives instead of answering routine questions.",
            testimonialAuthor: "Rachel Martinez",
            testimonialRole: "VP of Total Rewards, Fortune 500 Retailer"
          },
          {
            client: "Healthcare System",
            industry: "Healthcare | 45,000 employees",
            result: "96% Care Navigation Satisfaction",
            summary: "Human-centered support services helped members navigate complex healthcare system and resolve issues",
            challenge: "Complex benefits structure and large provider network left members confused and frustrated. 42% reported difficulty finding care, and billing disputes consumed significant HR time.",
            solution: [
              "Established 24/7 nurse line staffed by experienced RNs for clinical guidance and triage",
              "Created care coordinator team assisting with specialist referrals and treatment planning",
              "Hired billing advocates resolving claims disputes and balance billing issues",
              "Launched concierge services for executives and complex medical cases"
            ],
            impact: [
              { metric: "Care Navigation Satisfaction", value: "96%" },
              { metric: "Cost of Care per Complex Case", value: "-$8,400" },
              { metric: "Billing Disputes Resolved First Contact", value: "89%" },
              { metric: "Member Difficulty Finding Care", value: "42% → 8%" }
            ],
            timeline: [
              { period: "Months 1-3", milestone: "Team recruitment and training, infrastructure setup" },
              { period: "Months 4-6", milestone: "Pilot launch with 5,000 employees" },
              { period: "Months 7-9", milestone: "Full rollout to all 45,000 employees" },
              { period: "Months 10-12", milestone: "96% satisfaction achieved, $8,400 per case savings validated" }
            ],
            testimonial: "Care navigation services have been transformational for our employees. They get the support they need to make informed decisions and resolve issues, dramatically improving their healthcare experience.",
            testimonialAuthor: "Dr. Kevin Park",
            testimonialRole: "Chief Human Resources Officer, Healthcare System"
          }
        ]
      },
      {
        icon: Activity,
        value: "68%",
        title: "Wellness Participation",
        analysis: [
          "Integrated programs combining biometrics, health coaching, and incentive management",
          "Wearable device integration (Fitbit, Apple Health) drives engagement through gamification",
          "Personalized action plans based on health risk assessments and biometric results",
          "Condition management for diabetes, hypertension, asthma generating $3.80 ROI per dollar"
        ],
        benchmarks: [
          { label: "Industry Average Participation", value: "34%" },
          { label: "Traditional Programs", value: "28%" },
          { label: "Our Integrated Platform", value: "68%" },
          { label: "Medical Cost Savings per $1", value: "$3.80" }
        ],
        caseStudies: [
          {
            client: "Manufacturing Company",
            industry: "Manufacturing | 32,000 employees",
            result: "$4,200 Annual Savings per Diabetic",
            summary: "Disease management programs reduced complications and medical costs for chronic condition populations",
            challenge: "1,800 employees with diabetes (5.6% of workforce) accounted for 23% of total medical spend. Traditional disease management only engaged 31% of diabetics.",
            solution: [
              "Launched comprehensive diabetes management program with personalized coaching",
              "Integrated continuous glucose monitoring data for real-time insights and intervention",
              "Created medication adherence tracking and automated refill reminders",
              "Established $0 copay for diabetes medications, testing supplies, and preventive visits"
            ],
            impact: [
              { metric: "Diabetic Engagement", value: "31% → 74%" },
              { metric: "Medical Cost Reduction per Diabetic", value: "$4,200/year" },
              { metric: "HbA1c Improvement", value: "-1.2 points avg" },
              { metric: "Total Program Savings", value: "$7.6M annually" }
            ],
            timeline: [
              { period: "Months 1-3", milestone: "Program design and care team recruitment" },
              { period: "Months 4-6", milestone: "Pilot with 200 high-risk diabetics" },
              { period: "Months 7-9", milestone: "Expansion to all 1,800 diabetic employees" },
              { period: "Months 10-12", milestone: "74% engagement, $4,200 per participant savings" }
            ],
            testimonial: "The diabetes management program has been a game-changer for our workforce health and costs. We're seeing real clinical improvements and significant savings, with employees grateful for the support.",
            testimonialAuthor: "Michael Chen",
            testimonialRole: "Director of Benefits, Manufacturing Company"
          },
          {
            client: "Technology Company",
            industry: "Technology | 18,000 employees",
            result: "12% Productivity Improvement",
            summary: "Comprehensive wellness program reduced absenteeism and presenteeism while improving employee health",
            challenge: "High-stress environment led to burnout, mental health issues, and declining productivity. Absenteeism cost $8.4M annually in lost productivity and replacement workers.",
            solution: [
              "Launched holistic wellness platform addressing physical, mental, emotional, and financial health",
              "Integrated mental health services including therapy, meditation apps, and stress management",
              "Created fitness challenges with wearable integration and team-based competition",
              "Established generous wellness incentives ($500/year) for participation and goal achievement"
            ],
            impact: [
              { metric: "Wellness Participation", value: "68%" },
              { metric: "Productivity Improvement", value: "12%" },
              { metric: "Absenteeism Reduction", value: "34%" },
              { metric: "Employee Engagement", value: "+23 points" }
            ],
            timeline: [
              { period: "Q1", milestone: "Platform selection and wellness strategy development" },
              { period: "Q2", milestone: "Launch with biometric screenings and HRAs for all employees" },
              { period: "Q3", milestone: "Expand with mental health services and fitness challenges" },
              { period: "Q4", milestone: "68% participation, 12% productivity gain, 34% lower absenteeism" }
            ],
            testimonial: "The wellness program has transformed our culture and bottom line. Employees are healthier, more engaged, and more productive. It's been one of our best investments in our people.",
            testimonialAuthor: "Sandra Liu",
            testimonialRole: "Chief People Officer, Technology Company"
          }
        ]
      },
      {
        icon: CheckCircle,
        value: "94%",
        title: "Enrollment Accuracy",
        analysis: [
          "Automated validation and reconciliation eliminates 94% of enrollment errors",
          "EDI 834 file generation with real-time eligibility updates across 340+ carriers",
          "Life event processing with automated qualification verification and documentation",
          "Premium reconciliation matching carrier invoices to enrollment records automatically"
        ],
        benchmarks: [
          { label: "Manual Enrollment Process", value: "14.2% error rate" },
          { label: "Semi-Automated Tools", value: "6.8% error rate" },
          { label: "Our Platform", value: "0.9% error rate" },
          { label: "Administrative Cost Savings", value: "$2.4M/year" }
        ],
        caseStudies: [
          {
            client: "Multi-Location Retailer",
            industry: "Retail | 52,000 employees, 1,200 locations",
            result: "94% Error Reduction",
            summary: "Automated enrollment and eligibility management eliminated costly errors and improved member experience",
            challenge: "Decentralized HR across 1,200 locations led to inconsistent enrollment data, 14.2% error rate costing $3.8M annually in corrections, retro adjustments, and member disputes.",
            solution: [
              "Implemented centralized benefits administration platform with automated data validation",
              "Created real-time EDI 834 integration with 12 carriers for instant eligibility updates",
              "Built automated reconciliation matching enrollment files to carrier confirmation",
              "Established self-service enrollment with decision support tools and plan comparison"
            ],
            impact: [
              { metric: "Enrollment Error Rate", value: "14.2% → 0.9%" },
              { metric: "Cost of Enrollment Errors", value: "$3.8M → $240K" },
              { metric: "Open Enrollment Completion", value: "78% → 96%" },
              { metric: "HR Time Savings", value: "4,200 hours/year" }
            ],
            timeline: [
              { period: "Months 1-3", milestone: "Platform implementation and carrier integrations" },
              { period: "Months 4-5", milestone: "Pilot at 100 locations with 4,300 employees" },
              { period: "Months 6-8", milestone: "Rollout to all 1,200 locations" },
              { period: "Months 9-12", milestone: "Error rate drops to 0.9%, $3.56M savings realized" }
            ],
            testimonial: "The enrollment platform eliminated the chaos of annual open enrollment. Errors are virtually gone, employees have a great experience, and our HR team is freed from manual processing.",
            testimonialAuthor: "Jennifer Adams",
            testimonialRole: "SVP of Human Resources, Multi-Location Retailer"
          },
          {
            client: "Professional Services Firm",
            industry: "Consulting | 15,000 employees",
            result: "$2.4M Administrative Cost Savings",
            summary: "Self-service enrollment and automated processing reduced administrative burden and costs",
            challenge: "High-touch manual enrollment process required 8 FTE HR staff working 60+ hour weeks during open enrollment. Processing errors led to 420 disputes annually requiring 1,800 hours to resolve.",
            solution: [
              "Deployed self-service enrollment portal with intelligent decision support",
              "Created automated workflows for life event processing and qualification verification",
              "Implemented digital document management eliminating paper SPDs and enrollment forms",
              "Built comprehensive reporting dashboards for real-time visibility into enrollment status"
            ],
            impact: [
              { metric: "Administrative Cost Savings", value: "$2.4M/year" },
              { metric: "HR Staffing Reduction", value: "8 FTE → 2.5 FTE" },
              { metric: "Open Enrollment Duration", value: "6 weeks → 3 weeks" },
              { metric: "Dispute Resolution Time", value: "1,800 → 240 hours" }
            ],
            timeline: [
              { period: "Months 1-2", milestone: "Portal configuration and testing" },
              { period: "Month 3", milestone: "Soft launch with partners and senior leadership" },
              { period: "Month 4", milestone: "Full deployment for annual open enrollment" },
              { period: "Months 5-12", milestone: "Life event processing automated, $2.4M savings validated" }
            ],
            testimonial: "Self-service enrollment has been transformational. Employees appreciate the transparency and control, while our HR team can focus on strategic initiatives instead of manual paperwork.",
            testimonialAuthor: "David Wilson",
            testimonialRole: "Chief Human Resources Officer, Professional Services Firm"
          }
        ]
      }
    ]
  }
];

// 3D Solution Card Component
function SolutionCard3D({ solution, index }: { solution: any; index: number }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-100, 100], [10, -10]);
  const rotateY = useTransform(mouseX, [-100, 100], [-10, 10]);

  function handleMouseMove(e: React.MouseEvent<HTMLButtonElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mouseX.set(x);
    mouseY.set(y);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  const Icon = solution.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      viewport={{ once: true }}
      style={{ perspective: 1000 }}
      className="h-full"
    >
      <motion.button
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        whileHover={{ scale: 1.05 }}
        onClick={() => {
          const event = new CustomEvent('openSolutionModal', { detail: solution });
          window.dispatchEvent(event);
        }}
        className="relative h-full p-8 rounded-2xl cursor-pointer group w-full text-left"
      >
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-amber-500/30 to-yellow-600/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
        
        <div className="relative h-full bg-black/90 backdrop-blur-xl rounded-2xl border border-amber-900/30 group-hover:border-amber-500/50 transition-all duration-500 overflow-hidden">
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-20"
            animate={{
              background: [
                "radial-gradient(circle at 0% 0%, #f59e0b 0%, transparent 50%)",
                "radial-gradient(circle at 100% 100%, #d97706 0%, transparent 50%)",
                "radial-gradient(circle at 0% 100%, #f59e0b 0%, transparent 50%)",
                "radial-gradient(circle at 100% 0%, #d97706 0%, transparent 50%)",
                "radial-gradient(circle at 0% 0%, #f59e0b 0%, transparent 50%)",
              ],
            }}
            transition={{ duration: 8, repeat: Infinity }}
          />

          <div className="relative h-full p-8 flex flex-col" style={{ transform: "translateZ(50px)" }}>
            <motion.div
              className="mb-6"
              whileHover={{ rotate: 360, scale: 1.2 }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative inline-block">
                <div className="absolute inset-0 rounded-2xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity bg-gradient-to-br from-amber-500/50 to-yellow-600/50" />
                <div className="relative p-4 rounded-2xl bg-amber-950/50 backdrop-blur-sm border border-amber-800/30">
                  <Icon className="w-8 h-8 text-amber-500" style={{
                    filter: "drop-shadow(0 0 8px #f59e0b)",
                  }} />
                </div>
              </div>
            </motion.div>

            <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-amber-100 transition-all duration-300">
              {solution.title}
            </h3>

            <p className="text-gray-400 mb-6 flex-grow group-hover:text-gray-300 transition-colors">
              {solution.description}
            </p>

            <div className="space-y-3 mb-6">
              {solution.shortMetrics.map((metric: string, idx: number) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + idx * 0.1 }}
                  className="flex items-center gap-3 text-sm"
                >
                  <div className="w-2 h-2 rounded-full bg-amber-500" style={{
                    boxShadow: "0 0 10px #f59e0b",
                  }} />
                  <span className="text-gray-300">{metric}</span>
                </motion.div>
              ))}
            </div>

            <motion.div className="flex items-center gap-2 text-sm font-semibold text-amber-500 group-hover:gap-4 transition-all">
              Explore Solution
              <ArrowRight className="w-4 h-4" />
            </motion.div>
          </div>
        </div>
      </motion.button>
    </motion.div>
  );
}

// Solution Detail Modal - 3 levels
function SolutionDetailModal({ solution, onClose }: { solution: any; onClose: () => void }) {
  const [drillLevel, setDrillLevel] = useState(1);
  const [selectedMetric, setSelectedMetric] = useState<any>(null);
  const [selectedCase, setSelectedCase] = useState<any>(null);

  const Icon = solution.icon;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-zinc-950 via-amber-950/20 to-zinc-900 rounded-3xl border border-amber-500/30 shadow-2xl"
      >
        <div className="sticky top-0 z-10 bg-gradient-to-r from-zinc-950 to-amber-950/30 border-b border-amber-500/20 p-6 backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-amber-500/20 border border-amber-500/30">
                <Icon className="w-8 h-8 text-amber-400" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">{solution.title}</h2>
                <p className="text-amber-400/70 text-sm mt-1">{solution.consultingFramework}</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 rounded-xl hover:bg-white/10 transition-colors">
              <X className="w-6 h-6 text-white" />
            </button>
          </div>

          <div className="flex items-center gap-2 mt-4 text-sm text-amber-400/70">
            <button
              onClick={() => { setDrillLevel(1); setSelectedMetric(null); setSelectedCase(null); }}
              className={`hover:text-amber-400 transition-colors ${drillLevel === 1 ? "text-amber-400 font-semibold" : ""}`}
            >
              Strategic Overview
            </button>
            {drillLevel >= 2 && (
              <>
                <ChevronRight className="w-4 h-4" />
                <button
                  onClick={() => { setDrillLevel(2); setSelectedCase(null); }}
                  className={`hover:text-amber-400 transition-colors ${drillLevel === 2 ? "text-amber-400 font-semibold" : ""}`}
                >
                  {selectedMetric?.title || "Performance Metrics"}
                </button>
              </>
            )}
            {drillLevel >= 3 && (
              <>
                <ChevronRight className="w-4 h-4" />
                <span className="text-amber-400 font-semibold">Case Study Details</span>
              </>
            )}
          </div>
        </div>

        <div className="p-8">
          <AnimatePresence mode="wait">
            {drillLevel === 1 && (
              <motion.div key="level1" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
                <div className="space-y-8">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-4">Strategic Framework</h3>
                    <p className="text-gray-300 leading-relaxed mb-6">{solution.detailedDescription}</p>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      {solution.strategicPillars.map((pillar: any, idx: number) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          className="p-6 rounded-xl bg-black/50 border border-amber-500/20"
                        >
                          <h4 className="text-lg font-bold text-amber-400 mb-2">{pillar.title}</h4>
                          <p className="text-gray-400 text-sm">{pillar.description}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-950/30 to-purple-950/30 border border-blue-500/30">
                    <div className="flex items-start gap-4">
                      <Brain className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="text-lg font-bold text-blue-300 mb-2">Methodology Alignment</h4>
                        <p className="text-gray-300 text-sm mb-3">{solution.mcKinseyAlignment}</p>
                        <div className="inline-block px-3 py-1 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-300 text-xs">
                          Based on {solution.consultingFramework}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-white mb-4">Key Performance Metrics</h3>
                    <div className="grid md:grid-cols-3 gap-4">
                      {solution.metrics.map((metric: any, idx: number) => (
                        <motion.button
                          key={idx}
                          onClick={() => { setSelectedMetric(metric); setDrillLevel(2); }}
                          whileHover={{ scale: 1.05, y: -5 }}
                          className="p-6 rounded-xl bg-gradient-to-br from-amber-950/40 to-zinc-900/60 border border-amber-500/30 hover:border-amber-400/60 transition-all text-left group"
                        >
                          <div className="flex items-center justify-between mb-3">
                            <metric.icon className="w-8 h-8 text-amber-400" />
                            <ChevronRight className="w-5 h-5 text-amber-400/50 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
                          </div>
                          <div className="text-3xl font-bold text-white mb-2">{metric.value}</div>
                          <div className="text-sm text-gray-400">{metric.title}</div>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {drillLevel === 2 && selectedMetric && (
              <motion.div key="level2" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
                <div className="space-y-8">
                  <div className="flex items-center gap-4 p-6 rounded-2xl bg-gradient-to-r from-amber-950/40 to-zinc-900/60 border border-amber-500/30">
                    <selectedMetric.icon className="w-12 h-12 text-amber-400" />
                    <div className="flex-1">
                      <div className="text-4xl font-bold text-white mb-1">{selectedMetric.value}</div>
                      <div className="text-lg text-amber-400">{selectedMetric.title}</div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-white mb-4">Detailed Analysis</h3>
                    <div className="space-y-4">
                      {selectedMetric.analysis.map((item: string, idx: number) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          className="flex items-start gap-3 p-4 rounded-xl bg-black/50 border border-amber-500/20"
                        >
                          <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                          <p className="text-gray-300">{item}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-950/30 to-blue-950/30 border border-purple-500/30">
                    <h4 className="text-xl font-bold text-purple-300 mb-4 flex items-center gap-2">
                      <LineChart className="w-5 h-5" />
                      Industry Benchmarks (Bain & Company Research)
                    </h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      {selectedMetric.benchmarks.map((benchmark: any, idx: number) => (
                        <div key={idx} className="flex justify-between items-center p-3 rounded-lg bg-black/30">
                          <span className="text-gray-400 text-sm">{benchmark.label}</span>
                          <span className="text-purple-300 font-semibold">{benchmark.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-white mb-4">Client Success Stories</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {selectedMetric.caseStudies.map((caseStudy: any, idx: number) => (
                        <motion.button
                          key={idx}
                          onClick={() => { setSelectedCase(caseStudy); setDrillLevel(3); }}
                          whileHover={{ scale: 1.03, y: -3 }}
                          className="p-6 rounded-xl bg-gradient-to-br from-zinc-900/80 to-amber-950/40 border border-amber-500/30 hover:border-amber-400/60 transition-all text-left group"
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <div className="text-lg font-bold text-white mb-1">{caseStudy.client}</div>
                              <div className="text-sm text-amber-400/70">{caseStudy.industry}</div>
                            </div>
                            <ChevronRight className="w-5 h-5 text-amber-400/50 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
                          </div>
                          <div className="text-2xl font-bold text-emerald-400 mb-2">{caseStudy.result}</div>
                          <p className="text-gray-400 text-sm">{caseStudy.summary}</p>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {drillLevel === 3 && selectedCase && (
              <motion.div key="level3" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
                <div className="space-y-8">
                  <div className="p-8 rounded-2xl bg-gradient-to-br from-zinc-900/80 to-amber-950/40 border border-amber-500/40">
                    <div className="flex items-center gap-4 mb-6">
                      <Building2 className="w-10 h-10 text-amber-400" />
                      <div>
                        <h3 className="text-3xl font-bold text-white">{selectedCase.client}</h3>
                        <p className="text-amber-400/70">{selectedCase.industry}</p>
                      </div>
                    </div>
                    <div className="text-4xl font-bold text-emerald-400 mb-4">{selectedCase.result}</div>
                    <p className="text-gray-300 text-lg">{selectedCase.summary}</p>
                  </div>

                  <div>
                    <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                      <AlertCircle className="w-5 h-5 text-red-400" />
                      The Challenge
                    </h4>
                    <div className="p-6 rounded-xl bg-red-950/20 border border-red-500/30">
                      <p className="text-gray-300 leading-relaxed">{selectedCase.challenge}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                      <Zap className="w-5 h-5 text-blue-400" />
                      Our Approach (McKinsey 7-S Framework Adapted)
                    </h4>
                    <div className="space-y-3">
                      {selectedCase.solution.map((step: string, idx: number) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          className="flex items-start gap-3 p-4 rounded-xl bg-blue-950/20 border border-blue-500/30"
                        >
                          <div className="w-8 h-8 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center flex-shrink-0">
                            <span className="text-blue-300 font-bold text-sm">{idx + 1}</span>
                          </div>
                          <p className="text-gray-300 pt-1">{step}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-emerald-400" />
                      Quantified Impact
                    </h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      {selectedCase.impact.map((impact: any, idx: number) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          className="p-6 rounded-xl bg-emerald-950/20 border border-emerald-500/30"
                        >
                          <div className="text-3xl font-bold text-emerald-400 mb-2">{impact.value}</div>
                          <div className="text-gray-300">{impact.metric}</div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-950/30 to-blue-950/30 border border-purple-500/30">
                    <h4 className="text-xl font-bold text-purple-300 mb-4">Implementation Timeline</h4>
                    <div className="space-y-3">
                      {selectedCase.timeline.map((phase: any, idx: number) => (
                        <div key={idx} className="flex items-center gap-4">
                          <div className="w-24 text-purple-300 font-semibold text-sm">{phase.period}</div>
                          <div className="flex-1 p-3 rounded-lg bg-black/30">
                            <p className="text-gray-300 text-sm">{phase.milestone}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-8 rounded-2xl bg-gradient-to-br from-amber-950/40 to-zinc-900/60 border border-amber-500/30">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-16 h-16 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center">
                        <Users2 className="w-8 h-8 text-amber-400" />
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-300 italic text-lg mb-4">"{selectedCase.testimonial}"</p>
                        <div className="text-amber-400 font-semibold">{selectedCase.testimonialAuthor}</div>
                        <div className="text-amber-400/60 text-sm">{selectedCase.testimonialRole}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-12 p-8 rounded-2xl bg-gradient-to-r from-amber-600/20 via-yellow-600/20 to-amber-600/20 border border-amber-500/40"
          >
            <div className="text-center">
              <h4 className="text-2xl font-bold text-white mb-3">Ready to Achieve Similar Results?</h4>
              <p className="text-gray-300 mb-6">Schedule a consultation with our actuarial experts</p>
              <Link href="/request-demo">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-amber-600 to-yellow-600 rounded-xl text-white font-bold text-lg flex items-center gap-3 mx-auto shadow-xl"
                >
                  <Sparkles className="w-5 h-5" />
                  Get Your Free Strategic Assessment
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ActuarialBenefits() {
  const [selectedSolution, setSelectedSolution] = useState<any>(null);

  React.useEffect(() => {
    const handleOpenSolutionModal = (e: any) => {
      setSelectedSolution(e.detail);
    };
    window.addEventListener('openSolutionModal', handleOpenSolutionModal);
    return () => window.removeEventListener('openSolutionModal', handleOpenSolutionModal);
  }, []);

  return (
    <>
      <SEO
        title="Actuarial Employee Benefits Consulting | SiriusB iQ"
        description="Premium actuarial consulting services for employee benefits with AI-powered analytics, risk assessment, and compliance solutions."
      />
      <div className="min-h-screen bg-black text-white relative overflow-hidden">
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `
                linear-gradient(rgba(245, 158, 11, 0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(245, 158, 11, 0.3) 1px, transparent 1px)
              `,
              backgroundSize: "50px 50px",
            }}
          />
        </div>

        <Nav />

        <main className="relative z-10">
          <section className="relative py-20 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-amber-900/20 to-indigo-900/20" />
            <div className="container relative z-10 mx-auto px-6">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="inline-block px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full mb-6">
                    <span className="text-purple-300 font-semibold">Actuarial Intelligence Platform</span>
                  </div>
                  <h1 className="text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                    Transform Actuarial Benefits Management
                  </h1>
                  <p className="text-xl text-gray-300 mb-8">
                    Leverage AI-powered analytics to optimize plan design, manage risk, and ensure regulatory compliance across your entire benefits portfolio.
                  </p>
                </div>
                <div className="relative">
                  <div className="relative rounded-2xl overflow-hidden border border-purple-500/20 shadow-2xl">
                    <Image
                      src="/jeremiah-shrack-professional.png"
                      alt="Jeremiah Shrack - Founder & Chief Actuary"
                      width={600}
                      height={600}
                      className="w-full h-auto"
                      priority
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                      <h3 className="text-white text-xl font-bold">Jeremiah Shrack</h3>
                      <p className="text-gray-300">Founder</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="py-20 px-4">
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 bg-clip-text text-transparent">
                  Real-Time Intelligence at Your Fingertips
                </h2>
                <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                  Experience the power of live data flows and predictive analytics
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-yellow-600/20 rounded-2xl blur-3xl" />
                  <div className="relative bg-black/50 backdrop-blur-xl rounded-2xl border border-amber-900/30 p-8">
                    <h3 className="text-2xl font-bold mb-4 text-amber-500">Live Data Pipeline</h3>
                    <p className="text-gray-300 mb-6">
                      Watch as claims, member data, and actuarial calculations flow through our AI-powered processing engine in real-time
                    </p>
                    <DataFlowVisualization />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/20 to-amber-600/20 rounded-2xl blur-3xl" />
                  <div className="relative bg-black/50 backdrop-blur-xl rounded-2xl border border-amber-900/30 p-8">
                    <h3 className="text-2xl font-bold mb-4 text-yellow-500">Executive KPI Dashboard</h3>
                    <p className="text-gray-400 mb-6">
                      Monitor critical metrics with instant updates and predictive trend analysis
                    </p>
                    <KPIDashboardPreview />
                  </div>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-yellow-500/20 rounded-2xl blur-3xl" />
                <div className="relative bg-black/50 backdrop-blur-xl rounded-2xl border border-amber-900/30 p-8">
                  <h3 className="text-2xl font-bold mb-4 text-center text-amber-500">Integrated System Architecture</h3>
                  <p className="text-gray-400 mb-6 text-center max-w-2xl mx-auto">
                    See how all components of your benefits ecosystem connect and communicate seamlessly
                  </p>
                  <NetworkGraphAnimation />
                </div>
              </motion.div>
            </div>
          </section>

          <section id="solutions" className="py-20 px-4">
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <motion.h2
                  className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 bg-clip-text text-transparent"
                >
                  Strategic Solutions with Bain/McKinsey Frameworks
                </motion.h2>
                <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                  Click each solution to explore 3 levels of consulting-grade strategic detail with real client case studies
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {strategicSolutions.map((solution, index) => (
                  <SolutionCard3D key={index} solution={solution} index={index} />
                ))}
              </div>
            </div>
          </section>

          <section className="py-32 px-4">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative group"
              >
                <motion.div
                  className="absolute -inset-1 rounded-3xl opacity-75 group-hover:opacity-100 blur-xl"
                  animate={{
                    background: [
                      "linear-gradient(135deg, #f59e0b 0%, #d97706 50%, #eab308 100%)",
                      "linear-gradient(135deg, #eab308 0%, #f59e0b 50%, #d97706 100%)",
                      "linear-gradient(135deg, #d97706 0%, #eab308 50%, #f59e0b 100%)",
                      "linear-gradient(135deg, #f59e0b 0%, #d97706 50%, #eab308 100%)",
                    ],
                  }}
                  transition={{ duration: 8, repeat: Infinity }}
                />

                <div className="relative bg-black/90 backdrop-blur-xl rounded-3xl p-12 border border-amber-900/30">
                  <Award className="w-16 h-16 mx-auto mb-6 text-amber-500" style={{
                    filter: "drop-shadow(0 0 20px #f59e0b)",
                  }} />

                  <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 bg-clip-text text-transparent">
                    Ready to Transform Your Benefits Operations?
                  </h2>

                  <p className="text-xl text-gray-300 mb-8">
                    Join 500+ leading organizations leveraging our premium actuarial solutions
                  </p>

                  <Link href="/request-demo">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-12 py-5 bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-600 rounded-full text-white font-bold text-2xl flex items-center gap-3 mx-auto shadow-2xl relative"
                      style={{
                        boxShadow: "0 0 40px rgba(245, 158, 11, 0.5)",
                      }}
                    >
                      <div className="absolute inset-0 bg-amber-500/30 blur-xl rounded-full" />
                      <Sparkles className="w-6 h-6 relative z-10" />
                      <span className="relative z-10">Schedule Premium Consultation</span>
                      <Sparkles className="w-6 h-6 relative z-10" />
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            </div>
          </section>
        </main>

        <Footer />

        <AnimatePresence>
          {selectedSolution && (
            <SolutionDetailModal
              solution={selectedSolution}
              onClose={() => setSelectedSolution(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </>
  );
}