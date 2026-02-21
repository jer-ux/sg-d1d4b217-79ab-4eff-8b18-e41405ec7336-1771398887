import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import dynamic from "next/dynamic";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { InteractiveStageCard } from "@/components/agentic/InteractiveStageCard";
import {
  ArrowRight,
  CheckCircle2,
  Database,
  Shield,
  Users,
  FileCheck,
  AlertTriangle,
  TrendingUp,
  Lock,
  Brain,
  Target,
  BarChart3,
  Eye,
  RefreshCw,
  Settings,
  Network,
  Sparkles,
  Zap,
  Crown,
  X,
  ChevronRight,
  DollarSign,
  Clock,
  Activity,
  FileText,
  Search,
  GitBranch,
  Bell,
  TrendingDown,
  PieChart,
  LineChart,
} from "lucide-react";

// Dynamically import 3D components (client-side only)
const Hero3DScene = dynamic(
  () => import("@/components/agentic/Hero3D").then((mod) => mod.Hero3DScene),
  { ssr: false }
);

const WorkflowPipeline3D = dynamic(
  () => import("@/components/agentic/WorkflowPipeline3D").then((mod) => mod.WorkflowPipeline3D),
  { ssr: false }
);

const workflowStages = [
  {
    phase: "01",
    title: "Data Ingestion & Validation",
    description: "Multi-source data aggregation with automated quality controls",
    icon: Database,
    processes: [
      "Real-time ERP integration (SAP, Oracle, NetSuite)",
      "Financial system synchronization",
      "Third-party data validation",
      "Blockchain-verified timestamps",
      "Automated reconciliation checks",
    ],
    metrics: [
      { label: "Data Sources", value: "150+" },
      { label: "Validation Rules", value: "2,500+" },
      { label: "Processing Speed", value: "<30s" },
    ],
    detailedContent: {
      overview: "Our Data Ingestion & Validation engine connects to 150+ enterprise data sources, processing millions of transactions daily with sub-30-second latency. Built on a distributed architecture with redundant validation layers, it ensures 99.99% data accuracy while maintaining complete audit trails for regulatory compliance.",
      keyCapabilities: [
        {
          title: "Universal Data Connectivity",
          description: "Pre-built connectors for major ERP systems (SAP, Oracle, NetSuite, Microsoft Dynamics), financial platforms (QuickBooks, Xero, Sage), and cloud databases (Snowflake, Databricks). Custom API adapters deployed in 48 hours.",
          icon: Network,
          highlights: ["150+ Native Integrations", "Real-time Streaming", "Zero Data Loss Guarantee"]
        },
        {
          title: "Multi-Layer Validation Framework",
          description: "2,500+ business rules engine validates data completeness, format consistency, logical relationships, and cross-system reconciliation. Machine learning detects anomalies and data quality issues before they propagate downstream.",
          icon: Shield,
          highlights: ["99.99% Accuracy Rate", "Real-time Alerts", "Self-Healing Data Pipeline"]
        },
        {
          title: "Blockchain-Anchored Timestamps",
          description: "Every transaction receives a cryptographic timestamp anchored to public blockchain (Ethereum/Polygon), creating immutable proof of data lineage. Meets SOX 404 evidence requirements with tamper-proof audit trails.",
          icon: Lock,
          highlights: ["Immutable Records", "Cryptographic Proof", "Regulatory Compliance"]
        },
        {
          title: "Intelligent Data Mapping",
          description: "AI-powered schema mapping automatically aligns disparate data structures from multiple sources. Learns from corrections to improve mapping accuracy over time, reducing manual intervention by 94%.",
          icon: GitBranch,
          highlights: ["Auto-Schema Detection", "ML-Based Mapping", "94% Automation Rate"]
        }
      ],
      technicalSpecs: [
        "Distributed Kafka architecture processing 50K events/second",
        "Multi-region deployment with active-active failover (99.99% uptime SLA)",
        "AES-256 encryption for data in transit and at rest",
        "GDPR, SOX, HIPAA compliant data handling protocols",
        "Real-time data quality dashboards with drill-down to transaction level",
        "Automated reconciliation with discrepancy reporting and resolution workflows"
      ],
      businessImpact: [
        "Eliminate 87% of manual data entry errors that lead to financial restatements",
        "Reduce month-end close time from 15 days to 3 days with real-time data availability",
        "Prevent $2M-$8M in penalties from SOX non-compliance and audit findings",
        "Enable real-time financial reporting for executive decision-making"
      ],
      roi: {
        timeToValue: "4-6 weeks",
        avgSavings: "$3.2M annually",
        productivityGain: "87% reduction in data prep time"
      }
    }
  },
  {
    phase: "02",
    title: "Intelligent Classification",
    description: "AI-powered transaction categorization and risk assessment",
    icon: Brain,
    processes: [
      "ML-based pattern recognition",
      "Natural language processing for unstructured data",
      "Anomaly detection algorithms",
      "Contextual relationship mapping",
      "Predictive risk scoring (0-100 scale)",
    ],
    metrics: [
      { label: "Accuracy Rate", value: "99.7%" },
      { label: "False Positives", value: "<0.1%" },
      { label: "Auto-Classification", value: "94%" },
    ],
    detailedContent: {
      overview: "Our Intelligent Classification system uses advanced machine learning and natural language processing to automatically categorize transactions, identify patterns, and assess risk with 99.7% accuracy. Processing over 5 million transactions monthly, it learns continuously from corrections to improve classification precision.",
      keyCapabilities: [
        {
          title: "Deep Learning Classification",
          description: "Neural networks trained on 500M+ historical transactions classify expenses, revenue, and journal entries across GL accounts, cost centers, and projects. Handles complex multi-dimensional categorization with confidence scoring.",
          icon: Brain,
          highlights: ["99.7% Accuracy", "Multi-Dimensional", "Confidence Scoring"]
        },
        {
          title: "Natural Language Understanding",
          description: "Advanced NLP extracts meaning from vendor names, invoice descriptions, and memo fields. Understands context, synonyms, and business terminology to route transactions accurately even with inconsistent naming.",
          icon: FileText,
          highlights: ["Context-Aware", "Handles Variations", "Business Terminology"]
        },
        {
          title: "Anomaly Detection Engine",
          description: "Unsupervised learning algorithms identify unusual patterns, duplicate payments, missing approvals, and policy violations. Flags 0.1% false positives while catching 99% of actual issues before they become problems.",
          icon: AlertTriangle,
          highlights: ["99% Detection Rate", "<0.1% False Alarms", "Real-time Alerts"]
        },
        {
          title: "Predictive Risk Scoring",
          description: "Every transaction receives a 0-100 risk score based on vendor history, transaction patterns, approval chains, and external risk factors. High-risk items automatically escalate to compliance team for review.",
          icon: Target,
          highlights: ["0-100 Risk Scale", "Auto-Escalation", "Fraud Prevention"]
        }
      ],
      technicalSpecs: [
        "BERT-based transformer models for semantic understanding",
        "Gradient boosting machines (XGBoost) for multi-class classification",
        "Isolation forests and autoencoders for anomaly detection",
        "Active learning pipeline incorporating human feedback for continuous improvement",
        "Model versioning and A/B testing framework for controlled deployments",
        "Explainable AI (SHAP values) showing why each classification was made"
      ],
      businessImpact: [
        "Eliminate 94% of manual transaction categorization (240 hours/month saved)",
        "Catch fraudulent transactions 6-8 weeks earlier than manual review cycles",
        "Reduce audit sampling requirements by 60% with proven high-accuracy controls",
        "Enable granular spend analytics and cost optimization initiatives"
      ],
      roi: {
        timeToValue: "2-4 weeks",
        avgSavings: "$2.8M annually",
        productivityGain: "94% automation rate"
      }
    }
  },
  {
    phase: "03",
    title: "Policy Engine Execution",
    description: "Rules-based governance with dynamic policy adaptation",
    icon: Settings,
    processes: [
      "Multi-tier approval routing",
      "Regulatory compliance mapping (SOX, GAAP, IFRS)",
      "Custom business rule enforcement",
      "Threshold-based escalation protocols",
      "Audit trail generation per action",
    ],
    metrics: [
      { label: "Active Policies", value: "500+" },
      { label: "Compliance Rate", value: "100%" },
      { label: "Response Time", value: "<5s" },
    ],
    detailedContent: {
      overview: "The Policy Engine orchestrates 500+ business rules and compliance controls across your entire financial workflow. Processing decisions in under 5 seconds, it enforces separation of duties, approval hierarchies, spending limits, and regulatory requirements with 100% consistency—eliminating the variability and errors inherent in manual processes.",
      keyCapabilities: [
        {
          title: "Dynamic Approval Routing",
          description: "Intelligent workflow engine routes transactions based on amount, department, vendor, account type, and business context. Automatically escalates to backup approvers when primary reviewers are unavailable, ensuring no bottlenecks.",
          icon: GitBranch,
          highlights: ["Smart Routing", "Backup Chains", "Zero Bottlenecks"]
        },
        {
          title: "Regulatory Compliance Framework",
          description: "Pre-configured rule sets for SOX 404, GAAP, IFRS, and industry-specific regulations. Automatically flags transactions requiring additional controls, documentation, or review based on materiality thresholds and audit requirements.",
          icon: Shield,
          highlights: ["SOX/GAAP/IFRS Ready", "Auto-Flagging", "Audit-Proof"]
        },
        {
          title: "Custom Business Rules Engine",
          description: "No-code rule builder allows finance teams to define complex policies without IT involvement. Supports conditional logic, date ranges, organizational hierarchies, and multi-factor decision trees. Changes deploy instantly across all transactions.",
          icon: Settings,
          highlights: ["No-Code Builder", "Complex Logic", "Instant Deployment"]
        },
        {
          title: "Separation of Duties Enforcement",
          description: "Automatically prevents the same user from initiating and approving transactions, creating and paying vendors, or posting and reconciling accounts. Maintains compliance with internal controls and audit requirements without manual oversight.",
          icon: Users,
          highlights: ["SOD Compliance", "Automatic Prevention", "Zero Override"]
        }
      ],
      technicalSpecs: [
        "Rules engine processing 10K+ decisions per second with <5ms latency",
        "Version-controlled policy repository with rollback capability",
        "A/B testing framework for evaluating policy changes before full deployment",
        "Conflict detection preventing contradictory rules from being deployed",
        "Real-time policy effectiveness dashboards showing approval rates, bottlenecks, and exceptions",
        "Integration with HR systems for automatic org chart and delegation updates"
      ],
      businessImpact: [
        "Achieve 100% SOX compliance with automated control testing and evidence collection",
        "Eliminate $1.2M-$4.5M in audit findings from control deficiencies and policy violations",
        "Reduce approval cycle time by 73% with intelligent routing and escalation",
        "Enable real-time policy changes without code deployments or system downtime"
      ],
      roi: {
        timeToValue: "3-5 weeks",
        avgSavings: "$4.1M annually",
        productivityGain: "73% faster approvals"
      }
    }
  },
  {
    phase: "04",
    title: "Evidence Collection & Verification",
    description: "Automated documentation with cryptographic proof",
    icon: FileCheck,
    processes: [
      "Multi-party digital signature capture",
      "Document OCR and metadata extraction",
      "Cross-reference validation",
      "Immutable evidence storage (blockchain-anchored)",
      "Real-time audit log maintenance",
    ],
    metrics: [
      { label: "Documents Processed", value: "1M+/mo" },
      { label: "Verification Time", value: "<10s" },
      { label: "Tamper Detection", value: "100%" },
    ],
    detailedContent: {
      overview: "Our Evidence Collection & Verification system automatically gathers, validates, and stores supporting documentation for every financial transaction. Processing 1M+ documents monthly with OCR, digital signatures, and blockchain anchoring, it creates audit-ready evidence packages that meet Big 4 and regulatory standards.",
      keyCapabilities: [
        {
          title: "Intelligent Document Capture",
          description: "Advanced OCR with 99.8% accuracy extracts data from invoices, contracts, receipts, and supporting documents. AI recognizes document types, extracts key fields (vendor, amount, date, PO number), and validates against transaction data automatically.",
          icon: FileCheck,
          highlights: ["99.8% OCR Accuracy", "Auto-Extraction", "Type Recognition"]
        },
        {
          title: "Multi-Party Digital Signatures",
          description: "Cryptographic signatures from all approvers, reviewers, and stakeholders embedded in the document metadata. Meets electronic signature regulations (ESIGN Act, eIDAS) with non-repudiation guarantees and timestamp verification.",
          icon: Lock,
          highlights: ["Legally Binding", "Non-Repudiation", "Timestamp Proof"]
        },
        {
          title: "Cross-Reference Validation",
          description: "Automatically validates supporting documents against purchase orders, contracts, receiving reports, and payment records. Flags mismatches in amounts, dates, or terms before payment processing, preventing errors and fraud.",
          icon: Search,
          highlights: ["Auto-Validation", "Mismatch Detection", "Fraud Prevention"]
        },
        {
          title: "Blockchain-Anchored Storage",
          description: "Every evidence package receives a cryptographic hash anchored to public blockchain (Ethereum/Polygon). Provides immutable proof that documents haven't been altered since capture, meeting SOX and audit requirements for evidence integrity.",
          icon: Shield,
          highlights: ["Immutable Records", "Tamper-Proof", "Audit-Ready"]
        }
      ],
      technicalSpecs: [
        "Tesseract + custom-trained models for specialized financial document OCR",
        "S3-compatible storage with immutable buckets and versioning",
        "SHA-256 cryptographic hashing with Merkle tree aggregation",
        "Ethereum/Polygon blockchain anchoring for timestamp verification",
        "AES-256 encryption with key rotation and access logging",
        "Automated retention policies complying with 7-year record-keeping requirements"
      ],
      businessImpact: [
        "Reduce audit preparation time by 85% with pre-organized evidence packages",
        "Eliminate $800K-$2.4M in audit fees from incomplete or missing documentation",
        "Prevent fraudulent document alterations with cryptographic verification",
        "Enable instant retrieval of any transaction's complete evidence trail (< 3 seconds)"
      ],
      roi: {
        timeToValue: "3-4 weeks",
        avgSavings: "$2.6M annually",
        productivityGain: "85% faster audit prep"
      }
    }
  },
  {
    phase: "05",
    title: "Continuous Monitoring & Alerts",
    description: "24/7 surveillance with intelligent exception management",
    icon: Eye,
    processes: [
      "Real-time KPI tracking across 200+ metrics",
      "Behavioral analytics for fraud detection",
      "Automated stakeholder notifications",
      "Escalation matrix execution",
      "Predictive issue forecasting",
    ],
    metrics: [
      { label: "Monitored Transactions", value: "5M+/day" },
      { label: "Alert Accuracy", value: "98.5%" },
      { label: "Mean Time to Alert", value: "45s" },
    ],
    detailedContent: {
      overview: "Our Continuous Monitoring platform provides 24/7 surveillance across 5M+ daily transactions, tracking 200+ KPIs and sending intelligent alerts within 45 seconds of anomaly detection. With 98.5% alert accuracy and predictive forecasting, it catches issues before they become material problems.",
      keyCapabilities: [
        {
          title: "Real-Time KPI Dashboard",
          description: "Executive dashboard tracking 200+ financial metrics including DSO, DPO, cash position, burn rate, variance to budget, and operational KPIs. Customizable views by role (CFO, Controller, AP Manager) with drill-down to transaction detail.",
          icon: BarChart3,
          highlights: ["200+ Metrics", "Role-Based Views", "Real-Time Updates"]
        },
        {
          title: "Behavioral Analytics Engine",
          description: "Machine learning profiles normal behavior patterns for vendors, employees, and transaction types. Detects deviations indicating fraud, policy violations, or operational issues. Reduces false positives by 94% compared to rule-based systems.",
          icon: Activity,
          highlights: ["ML-Based Detection", "94% Fewer False Alarms", "Pattern Learning"]
        },
        {
          title: "Intelligent Alert Routing",
          description: "Context-aware notification system sends alerts to the right person at the right time via email, SMS, Slack, or Teams. Escalates automatically if not acknowledged within SLA timeframes. Suppresses duplicate alerts to prevent notification fatigue.",
          icon: Bell,
          highlights: ["Multi-Channel Alerts", "Auto-Escalation", "Smart Suppression"]
        },
        {
          title: "Predictive Issue Forecasting",
          description: "Time-series analysis and predictive models forecast potential issues 2-4 weeks in advance. Alerts to upcoming cash flow constraints, budget overruns, vendor concentration risks, and compliance deadline misses with actionable recommendations.",
          icon: TrendingUp,
          highlights: ["2-4 Week Forecast", "Proactive Alerts", "Actionable Insights"]
        }
      ],
      technicalSpecs: [
        "Time-series database (InfluxDB) storing 10B+ data points with <100ms query latency",
        "Streaming analytics processing 50K events/second with 45-second alert latency",
        "Anomaly detection using isolation forests, LSTM networks, and statistical process control",
        "Multi-channel notification system with delivery tracking and escalation management",
        "Customizable SLA definitions with automatic escalation workflows",
        "Mobile app for iOS/Android with push notifications and quick-action capabilities"
      ],
      businessImpact: [
        "Detect fraudulent transactions 6-8 weeks earlier, preventing average losses of $340K per incident",
        "Reduce fire-drill responses by 78% with proactive issue identification",
        "Improve cash flow management with predictive alerts on upcoming shortfalls",
        "Enable data-driven decision making with real-time visibility into business performance"
      ],
      roi: {
        timeToValue: "2-3 weeks",
        avgSavings: "$3.7M annually",
        productivityGain: "78% fewer urgent issues"
      }
    }
  },
  {
    phase: "06",
    title: "Reporting & Analytics",
    description: "Executive-grade insights with drill-down capability",
    icon: BarChart3,
    processes: [
      "Automated variance analysis",
      "Trend identification and forecasting",
      "Benchmark comparisons (industry/peer)",
      "Custom dashboard generation",
      "Regulatory filing preparation",
    ],
    metrics: [
      { label: "Report Types", value: "75+" },
      { label: "Refresh Frequency", value: "Real-time" },
      { label: "Export Formats", value: "12" },
    ],
    detailedContent: {
      overview: "Our Reporting & Analytics platform delivers executive-grade insights with 75+ pre-built reports, real-time data refresh, and unlimited drill-down capability. From board presentations to regulatory filings, it provides the analytical depth and visual clarity executives need to make confident decisions.",
      keyCapabilities: [
        {
          title: "Executive Dashboard Suite",
          description: "Pre-built dashboards for C-suite, board of directors, and department heads featuring KPIs, trends, variance analysis, and actionable insights. One-click drill-down from summary to transaction detail. Mobile-optimized for on-the-go access.",
          icon: PieChart,
          highlights: ["75+ Pre-Built Reports", "Unlimited Drill-Down", "Mobile Optimized"]
        },
        {
          title: "Automated Variance Analysis",
          description: "AI-powered variance commentary explains why actuals differ from budget/forecast. Identifies key drivers (volume, price, mix) and flags areas requiring management attention. Saves 40+ hours monthly in manual variance analysis and commentary writing.",
          icon: TrendingDown,
          highlights: ["AI Commentary", "Driver Analysis", "40+ Hours Saved"]
        },
        {
          title: "Predictive Analytics & Forecasting",
          description: "Time-series forecasting models predict cash flow, revenue, expenses, and key metrics 1-12 months ahead. Scenario analysis shows impact of different assumptions. Machine learning continuously improves forecast accuracy based on actual results.",
          icon: LineChart,
          highlights: ["1-12 Month Forecast", "Scenario Analysis", "Self-Improving"]
        },
        {
          title: "Regulatory Filing Automation",
          description: "One-click generation of 10-Q, 10-K, SOX 404 reports, and other regulatory filings. Pre-mapped to XBRL taxonomies. Maintains supporting evidence packages for audit trail. Reduces filing prep time from weeks to hours.",
          icon: FileText,
          highlights: ["One-Click Filing", "XBRL Ready", "Audit Trail Included"]
        }
      ],
      technicalSpecs: [
        "Columnar database (Clickhouse) enabling sub-second queries on billions of transactions",
        "In-memory OLAP cubes for instant aggregation and slicing/dicing",
        "Prophet + ARIMA time-series models for forecasting with confidence intervals",
        "Natural language generation (GPT-based) for automated commentary",
        "12 export formats: PDF, Excel, PowerPoint, Tableau, Power BI, CSV, JSON, XML, XBRL, etc.",
        "Scheduled report distribution with personalized data filters per recipient"
      ],
      businessImpact: [
        "Reduce board deck preparation from 3 days to 3 hours with automated reporting",
        "Improve forecast accuracy by 35% with machine learning models vs. spreadsheets",
        "Accelerate SEC filing preparation by 85%, reducing external audit dependency",
        "Enable self-service analytics for business units, reducing finance team reporting burden by 60%"
      ],
      roi: {
        timeToValue: "2-4 weeks",
        avgSavings: "$2.9M annually",
        productivityGain: "60% reduction in reporting work"
      }
    }
  },
];

const complianceFrameworks = [
  { name: "SOX 404", coverage: "100%", controls: 250 },
  { name: "GAAP", coverage: "100%", controls: 180 },
  { name: "IFRS", coverage: "100%", controls: 165 },
  { name: "COSO", coverage: "100%", controls: 95 },
  { name: "COBIT", coverage: "100%", controls: 120 },
  { name: "ISO 27001", coverage: "100%", controls: 114 },
];

const integrationPartners = [
  { name: "SAP", category: "ERP", status: "Certified" },
  { name: "Oracle Financials", category: "ERP", status: "Certified" },
  { name: "NetSuite", category: "ERP", status: "Certified" },
  { name: "Workday", category: "HCM", status: "Certified" },
  { name: "Snowflake", category: "Data Warehouse", status: "Certified" },
  { name: "Databricks", category: "Analytics", status: "Certified" },
  { name: "ServiceNow", category: "ITSM", status: "Certified" },
  { name: "Salesforce", category: "CRM", status: "Certified" },
];

const securityFeatures = [
  {
    title: "End-to-End Encryption",
    description: "AES-256 encryption for data at rest and in transit",
    icon: Lock,
  },
  {
    title: "Role-Based Access Control",
    description: "Granular permissions with separation of duties enforcement",
    icon: Users,
  },
  {
    title: "Audit Trail Immutability",
    description: "Blockchain-anchored logs with tamper detection",
    icon: Shield,
  },
  {
    title: "Multi-Factor Authentication",
    description: "Biometric and token-based authentication options",
    icon: CheckCircle2,
  },
  {
    title: "Real-Time Threat Detection",
    description: "AI-powered anomaly detection and automated response",
    icon: AlertTriangle,
  },
  {
    title: "Disaster Recovery",
    description: "99.99% uptime SLA with automated failover",
    icon: RefreshCw,
  },
];

const caseStudies = [
  {
    company: "Fortune 500 Healthcare Provider",
    challenge: "Manual reconciliation of 500K+ monthly transactions across 12 subsidiaries",
    solution: "Deployed Kincaid iQ Agentic Workflow with real-time ERP integration",
    results: [
      "98% reduction in manual reconciliation time",
      "$12M annual cost savings",
      "100% SOX compliance with automated controls",
      "Real-time financial close (down from 15 days to 3 days)",
    ],
    industry: "Healthcare",
  },
  {
    company: "Global Manufacturing Conglomerate",
    challenge: "Contract leakage and vendor non-compliance across 2,000+ suppliers",
    solution: "Implemented AI-powered contract monitoring and automated evidence collection",
    results: [
      "$45M recovered in contract penalties and rebates",
      "87% reduction in vendor disputes",
      "Real-time visibility into 15,000+ active contracts",
      "Automated compliance verification across 50+ countries",
    ],
    industry: "Manufacturing",
  },
  {
    company: "Private Equity Portfolio (18 Companies)",
    challenge: "Inconsistent financial reporting and lack of standardized controls",
    solution: "Deployed enterprise-wide agentic workflow platform with custom policy engine",
    results: [
      "Unified financial reporting across all portfolio companies",
      "60% faster due diligence for new acquisitions",
      "$23M identified in operational arbitrage opportunities",
      "Automated EBITDA adjustments with full audit trail",
    ],
    industry: "Financial Services",
  },
];

export default function AgenticWorkflowPage() {
  const [mounted, setMounted] = useState(false);
  const [selectedStage, setSelectedStage] = useState<number | null>(null);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <SEO
        title="Kincaid iQ Agentic Workflow | Enterprise Financial Automation"
        description="Big 4-grade financial workflow automation with AI-powered controls, real-time compliance, and blockchain-verified audit trails."
      />
      <div className="min-h-screen bg-black text-white overflow-hidden">
        {/* Animated Background Elements */}
        <div className="fixed inset-0 pointer-events-none">
          {/* Animated Spotlights */}
          <motion.div
            className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="absolute top-1/3 right-1/4 w-96 h-96 bg-yellow-500/20 rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{ duration: 10, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{ duration: 12, repeat: Infinity }}
          />

          {/* Floating Particles */}
          {mounted && Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-amber-400/40 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}

          {/* Neon Grid Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(251,191,36,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(251,191,36,0.03)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />
        </div>

        {/* Hero Section with 3D Background */}
        <section className="relative min-h-[85vh] flex items-center justify-center pt-20 pb-12 px-6 overflow-hidden">
          {/* 3D Animated Background */}
          {mounted && (
            <motion.div style={{ opacity, scale }} className="absolute inset-0">
              <Hero3DScene />
            </motion.div>
          )}

          {/* Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-amber-900/20 via-yellow-900/20 to-orange-900/20 pointer-events-none" />

          <div className="relative z-10 max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-center"
            >
              {/* Premium Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500/20 via-yellow-500/20 to-orange-500/20 border border-amber-500/30 rounded-full mb-6 backdrop-blur-xl"
              >
                <Crown className="w-5 h-5 text-amber-400" />
                <span className="text-sm text-amber-300 font-semibold tracking-wide">
                  ENTERPRISE-GRADE FINANCIAL AUTOMATION
                </span>
                <Zap className="w-5 h-5 text-yellow-400" />
              </motion.div>

              {/* Main Title with Gradient Animation */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.6 }}
                className="text-5xl md:text-7xl font-black mb-6 leading-tight"
              >
                <span className="bg-gradient-to-r from-white via-amber-200 to-yellow-300 bg-clip-text text-transparent animate-gradient">
                  Kincaid iQ
                </span>
                <br />
                <span className="bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-400 bg-clip-text text-transparent">
                  Agentic Workflow
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.8 }}
                className="text-lg md:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8"
              >
                Autonomous financial operations with{" "}
                <span className="text-amber-400 font-semibold">AI-powered controls</span>,{" "}
                <span className="text-yellow-400 font-semibold">real-time compliance verification</span>, and{" "}
                <span className="text-orange-400 font-semibold">blockchain-verified audit trails</span>.
                <br />
                Trusted by Fortune 500 CFOs and Big 4 auditors.
              </motion.p>

              {/* CTA Buttons with Premium Effects */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1 }}
                className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href="/request-demo"
                    className="group px-8 py-4 bg-gradient-to-r from-amber-600 via-yellow-600 to-orange-600 text-black font-bold rounded-full hover:shadow-2xl hover:shadow-amber-500/50 transition-all duration-300 flex items-center justify-center gap-3 relative overflow-hidden"
                  >
                    <span className="relative z-10">Request Enterprise Demo</span>
                    <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href="/company"
                    className="px-8 py-4 bg-white/10 backdrop-blur-xl border-2 border-amber-500/30 text-white font-bold rounded-full hover:bg-amber-500/10 hover:border-amber-400/50 transition-all duration-300 flex items-center justify-center gap-3"
                  >
                    Contact Sales
                  </Link>
                </motion.div>
              </motion.div>

              {/* Key Metrics Bar with Glassmorphism */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.2 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-4"
              >
                {[
                  { label: "Transactions/Month", value: "150M+", icon: Database },
                  { label: "Compliance Rate", value: "100%", icon: Shield },
                  { label: "Avg. Time Savings", value: "85%", icon: TrendingUp },
                  { label: "ROI (12 months)", value: "420%", icon: Target },
                ].map((metric, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 1.4 + index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="relative group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative bg-white/5 backdrop-blur-xl border border-amber-500/10 rounded-2xl p-5 text-center">
                      <metric.icon className="w-6 h-6 mx-auto mb-2 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]" />
                      <div className="text-3xl font-black bg-gradient-to-br from-amber-400 to-orange-400 bg-clip-text text-transparent mb-1">
                        {metric.value}
                      </div>
                      <div className="text-xs text-gray-400 font-medium">{metric.label}</div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* 3D Workflow Pipeline Visualization */}
        <section className="py-12 px-6 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-amber-950/20 to-black" />
          <div className="relative z-10 max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-8"
            >
              <h2 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-white via-amber-200 to-yellow-300 bg-clip-text text-transparent">
                Six-Stage Autonomous Workflow
              </h2>
              <p className="text-lg text-gray-400 max-w-3xl mx-auto">
                End-to-end financial process automation with built-in controls, real-time validation, and
                comprehensive audit trails at every step. Click any stage to explore in detail.
              </p>
            </motion.div>

            {/* 3D Pipeline Visualization */}
            {mounted && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="mb-8"
              >
                <WorkflowPipeline3D />
              </motion.div>
            )}
          </div>
        </section>

        {/* Interactive Workflow Stages - Now Clickable */}
        <section className="py-8 px-6 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-yellow-950/10 to-black" />
          <div className="relative z-10 max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {workflowStages.map((stage, index) => {
                const Icon = stage.icon;
                return (
                  <motion.button
                    key={index}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    onClick={() => setSelectedStage(index)}
                    className="relative group text-left cursor-pointer"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative bg-white/5 backdrop-blur-xl border border-amber-500/10 rounded-2xl p-6 h-full hover:border-amber-500/50 transition-all">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="text-3xl font-black text-amber-400/30">{stage.phase}</div>
                          <Icon className="w-8 h-8 text-amber-400 group-hover:scale-110 transition-transform" />
                        </div>
                        <ChevronRight className="w-6 h-6 text-gray-600 group-hover:text-amber-400 transition-colors" />
                      </div>
                      <h3 className="text-xl font-bold mb-3 text-white">{stage.title}</h3>
                      <p className="text-gray-400 text-sm mb-4">{stage.description}</p>
                      <div className="grid grid-cols-3 gap-2">
                        {stage.metrics.map((metric, idx) => (
                          <div key={idx} className="text-center">
                            <div className="text-lg font-bold text-amber-400">{metric.value}</div>
                            <div className="text-xs text-gray-500">{metric.label}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Detailed Stage Modal */}
        <AnimatePresence>
          {selectedStage !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
              onClick={() => setSelectedStage(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-gradient-to-br from-gray-900 to-black rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-y-auto border border-amber-500/30 my-8"
              >
                {(() => {
                  const stage = workflowStages[selectedStage];
                  const Icon = stage.icon;
                  return (
                    <div>
                      {/* Sticky Header */}
                      <div className="sticky top-0 bg-gradient-to-br from-gray-900 to-black border-b border-amber-500/30 p-6 flex items-start justify-between backdrop-blur-xl z-10">
                        <div className="flex items-center gap-4">
                          <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/30">
                            <Icon className="w-10 h-10 text-amber-400" />
                          </div>
                          <div>
                            <div className="text-sm text-amber-400 font-bold mb-1">STAGE {stage.phase}</div>
                            <h2 className="text-3xl font-black text-white">{stage.title}</h2>
                            <div className="flex gap-3 mt-2">
                              {stage.metrics.map((metric, idx) => (
                                <span key={idx} className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-400 text-xs font-semibold">
                                  {metric.label}: {metric.value}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => setSelectedStage(null)}
                          className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
                        >
                          <X className="w-6 h-6 text-gray-400 hover:text-white" />
                        </button>
                      </div>

                      {/* Content */}
                      <div className="p-8 space-y-8">
                        {/* Overview */}
                        <div>
                          <h3 className="text-2xl font-bold mb-4 text-amber-400">Overview</h3>
                          <p className="text-gray-300 leading-relaxed text-lg">{stage.detailedContent.overview}</p>
                        </div>

                        {/* Key Capabilities Grid */}
                        <div>
                          <h3 className="text-2xl font-bold mb-6 text-amber-400">Key Capabilities</h3>
                          <div className="grid md:grid-cols-2 gap-6">
                            {stage.detailedContent.keyCapabilities.map((capability, idx) => {
                              const CapIcon = capability.icon;
                              return (
                                <motion.div
                                  key={idx}
                                  initial={{ opacity: 0, y: 20 }}
                                  whileInView={{ opacity: 1, y: 0 }}
                                  viewport={{ once: true }}
                                  transition={{ delay: idx * 0.1 }}
                                  className="p-6 rounded-2xl bg-gradient-to-br from-amber-500/5 to-orange-500/5 border border-amber-500/20"
                                >
                                  <CapIcon className="w-10 h-10 text-amber-400 mb-4" />
                                  <h4 className="text-xl font-bold mb-3 text-white">{capability.title}</h4>
                                  <p className="text-gray-400 mb-4">{capability.description}</p>
                                  <div className="flex flex-wrap gap-2">
                                    {capability.highlights.map((highlight, hidx) => (
                                      <span key={hidx} className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs">
                                        {highlight}
                                      </span>
                                    ))}
                                  </div>
                                </motion.div>
                              );
                            })}
                          </div>
                        </div>

                        {/* Technical Specifications */}
                        <div>
                          <h3 className="text-2xl font-bold mb-4 text-amber-400">Technical Specifications</h3>
                          <div className="p-6 rounded-2xl bg-gray-800/30 border border-gray-700">
                            <ul className="space-y-3">
                              {stage.detailedContent.technicalSpecs.map((spec, idx) => (
                                <li key={idx} className="flex items-start gap-3">
                                  <div className="w-2 h-2 rounded-full bg-amber-400 mt-2 flex-shrink-0" />
                                  <span className="text-gray-300">{spec}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {/* Business Impact */}
                        <div>
                          <h3 className="text-2xl font-bold mb-4 text-amber-400">Business Impact</h3>
                          <div className="grid md:grid-cols-2 gap-4">
                            {stage.detailedContent.businessImpact.map((impact, idx) => (
                              <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="p-5 rounded-xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30"
                              >
                                <div className="flex items-start gap-3">
                                  <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                                  <p className="text-gray-300">{impact}</p>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </div>

                        {/* ROI Metrics */}
                        <div>
                          <h3 className="text-2xl font-bold mb-4 text-amber-400">ROI & Time to Value</h3>
                          <div className="grid md:grid-cols-3 gap-6">
                            <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30 text-center">
                              <Clock className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                              <div className="text-3xl font-black text-blue-400 mb-1">{stage.detailedContent.roi.timeToValue}</div>
                              <div className="text-sm text-gray-400">Time to Value</div>
                            </div>
                            <div className="p-6 rounded-2xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30 text-center">
                              <DollarSign className="w-8 h-8 text-green-400 mx-auto mb-3" />
                              <div className="text-3xl font-black text-green-400 mb-1">{stage.detailedContent.roi.avgSavings}</div>
                              <div className="text-sm text-gray-400">Average Savings</div>
                            </div>
                            <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/30 text-center">
                              <TrendingUp className="w-8 h-8 text-amber-400 mx-auto mb-3" />
                              <div className="text-3xl font-black text-amber-400 mb-1">{stage.detailedContent.roi.productivityGain}</div>
                              <div className="text-sm text-gray-400">Productivity Gain</div>
                            </div>
                          </div>
                        </div>

                        {/* CTA Section with Multiple Options */}
                        <div className="pt-8 border-t border-amber-500/30">
                          <div className="text-center">
                            <h3 className="text-3xl font-black mb-3 bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                              Ready to See {stage.title} in Action?
                            </h3>
                            <p className="text-gray-400 mb-8 text-lg">
                              Schedule a personalized demo to see how this capability transforms your financial operations
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Link
                                  href="/request-demo"
                                  className="group px-10 py-4 bg-gradient-to-r from-amber-600 via-yellow-600 to-orange-600 text-black text-lg font-bold rounded-full hover:shadow-2xl hover:shadow-amber-500/50 transition-all duration-300 flex items-center justify-center gap-3 relative overflow-hidden"
                                  onClick={() => setSelectedStage(null)}
                                >
                                  <span className="relative z-10">Get Free Analysis</span>
                                  <ArrowRight className="w-6 h-6 relative z-10 group-hover:translate-x-2 transition-transform" />
                                  <div className="absolute inset-0 bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </Link>
                              </motion.div>
                              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Link
                                  href="/request-demo"
                                  className="px-10 py-4 bg-white/10 backdrop-blur-xl border-2 border-amber-500/30 text-white text-lg font-bold rounded-full hover:bg-amber-500/10 hover:border-amber-400/50 transition-all duration-300 flex items-center justify-center gap-3"
                                  onClick={() => setSelectedStage(null)}
                                >
                                  <DollarSign className="w-6 h-6" />
                                  Calculate Savings
                                </Link>
                              </motion.div>
                            </div>
                            <p className="text-gray-500 text-sm mt-4">
                              Typical ROI: {stage.detailedContent.roi.avgSavings} • Implementation: {stage.detailedContent.roi.timeToValue}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Compliance Frameworks */}
        <section className="py-12 px-6 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-amber-950/10 to-black" />
          <div className="relative z-10 max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-8"
            >
              <h2 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-white via-amber-200 to-yellow-300 bg-clip-text text-transparent">
                Regulatory Compliance Coverage
              </h2>
              <p className="text-lg text-gray-400 max-w-3xl mx-auto">
                Built-in controls and automated testing for major financial reporting frameworks. Audit-ready
                documentation generated automatically.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {complianceFrameworks.map((framework, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative bg-white/5 backdrop-blur-xl border border-amber-500/10 rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-white">{framework.name}</h3>
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <Shield className="w-7 h-7 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]" />
                      </motion.div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400 text-sm">Coverage</span>
                        <span className="text-xl font-bold text-amber-400">{framework.coverage}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400 text-sm">Automated Controls</span>
                        <span className="text-xl font-bold text-yellow-400">{framework.controls}</span>
                      </div>
                      <motion.div
                        className="h-2 bg-gray-800 rounded-full overflow-hidden"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                      >
                        <div className="h-full bg-gradient-to-r from-amber-500 to-orange-500 w-full" />
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Integration Partners */}
        <section className="py-12 px-6 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-yellow-950/10 to-black" />
          <div className="relative z-10 max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-8"
            >
              <h2 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-white via-amber-200 to-yellow-300 bg-clip-text text-transparent">
                Enterprise Integration Ecosystem
              </h2>
              <p className="text-lg text-gray-400 max-w-3xl mx-auto">
                Pre-built connectors for leading enterprise systems. API-first architecture enables custom
                integrations in days, not months.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {integrationPartners.map((partner, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  whileHover={{ y: -10, scale: 1.05 }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative bg-white/5 backdrop-blur-xl border border-amber-500/10 rounded-2xl p-5 text-center">
                    <motion.div
                      whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      <Network className="w-10 h-10 mx-auto mb-3 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]" />
                    </motion.div>
                    <h3 className="text-base font-bold mb-1 text-white">{partner.name}</h3>
                    <div className="text-xs text-gray-400 mb-2">{partner.category}</div>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-500/20 border border-amber-500/30 rounded-full text-xs text-amber-400 font-semibold">
                      <CheckCircle2 className="w-3 h-3" />
                      {partner.status}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Security Features */}
        <section className="py-12 px-6 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-amber-950/10 to-black" />
          <div className="relative z-10 max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-8"
            >
              <h2 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-white via-amber-200 to-yellow-300 bg-clip-text text-transparent">
                Enterprise Security & Governance
              </h2>
              <p className="text-lg text-gray-400 max-w-3xl mx-auto">
                Bank-grade security with comprehensive audit trails. SOC 2 Type II certified with ongoing
                third-party penetration testing.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {securityFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative bg-white/5 backdrop-blur-xl border border-amber-500/10 rounded-2xl p-6">
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <feature.icon className="w-10 h-10 text-amber-400 mb-4 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]" />
                    </motion.div>
                    <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
                    <p className="text-gray-400 text-sm">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Case Studies */}
        <section className="py-12 px-6 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-yellow-950/10 to-black" />
          <div className="relative z-10 max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-8"
            >
              <h2 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-white via-amber-200 to-yellow-300 bg-clip-text text-transparent">
                Enterprise Deployments
              </h2>
              <p className="text-lg text-gray-400 max-w-3xl mx-auto">
                Real results from Fortune 500 companies and private equity firms who trust Kincaid iQ for
                mission-critical financial operations.
              </p>
            </motion.div>

            <div className="space-y-6">
              {caseStudies.map((study, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  whileHover={{ scale: 1.02 }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative bg-white/5 backdrop-blur-xl border border-amber-500/10 rounded-3xl p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="inline-block px-4 py-2 bg-amber-500/20 border border-amber-500/30 rounded-full text-sm text-amber-400 font-semibold mb-2">
                          {study.industry}
                        </div>
                        <h3 className="text-xl font-black text-white mb-1">{study.company}</h3>
                      </div>
                      <motion.div
                        whileHover={{ scale: 1.2, rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <Target className="w-7 h-7 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]" />
                      </motion.div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">
                          Challenge
                        </h4>
                        <p className="text-gray-300 mb-4 text-sm">{study.challenge}</p>
                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">
                          Solution
                        </h4>
                        <p className="text-gray-300 text-sm">{study.solution}</p>
                      </div>

                      <div>
                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">
                          Results
                        </h4>
                        <ul className="space-y-2">
                          {study.results.map((result, idx) => (
                            <motion.li
                              key={idx}
                              initial={{ opacity: 0, x: 20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.5, delay: idx * 0.1 }}
                              className="flex items-start gap-2"
                            >
                              <CheckCircle2 className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-300 text-sm">{result}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Premium CTA Section */}
        <section className="py-16 px-6 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-amber-950/20 to-black" />
          <div className="relative z-10 max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-amber-600/30 via-yellow-600/30 to-orange-600/30 rounded-3xl blur-3xl" />
              <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-amber-500/20 rounded-3xl p-10">
                <h2 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-white via-amber-200 to-yellow-300 bg-clip-text text-transparent">
                  Ready to Transform Your Financial Operations?
                </h2>
                <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                  Schedule a technical deep-dive with our solutions architects. <br />
                  See the platform in action with your own data.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      href="/request-demo"
                      className="group px-10 py-4 bg-gradient-to-r from-amber-600 via-yellow-600 to-orange-600 text-black text-lg font-bold rounded-full hover:shadow-2xl hover:shadow-amber-500/50 transition-all duration-300 flex items-center justify-center gap-3 relative overflow-hidden"
                    >
                      <span className="relative z-10">Request Enterprise Demo</span>
                      <ArrowRight className="w-6 h-6 relative z-10 group-hover:translate-x-2 transition-transform" />
                      <div className="absolute inset-0 bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </Link>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      href="/company"
                      className="px-10 py-4 bg-white/10 backdrop-blur-xl border-2 border-amber-500/30 text-white text-lg font-bold rounded-full hover:bg-amber-500/10 hover:border-amber-400/50 transition-all duration-300 flex items-center justify-center gap-3"
                    >
                      Contact Sales
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>

      <style jsx>{`
        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </>
  );
}