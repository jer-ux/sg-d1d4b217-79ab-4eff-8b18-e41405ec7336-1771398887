/**
 * KINCAID HEALTH™
 * Intelligence Hub — Central Access Point for All Tools
 */

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import {
  Shield,
  Code,
  Upload,
  Database,
  Brain,
  LineChart,
  FileText,
  Activity,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { SEO } from "@/components/SEO";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { ProtectedToolsRoute } from "@/components/ProtectedToolsRoute";

const tools = [
  {
    name: "Evidence Spine",
    description: "Universal activity tracking and audit logs with advanced filtering by date, impact, confidence, and risk level",
    href: "/evidence-spine",
    icon: Shield,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    features: ["Search & Filter", "Audit Logs", "Provenance Chain", "Export Data"],
    status: "operational",
  },
  {
    name: "API Documentation",
    description: "Interactive documentation for all FastAPI endpoints with live examples and health monitoring",
    href: "/api-documentation",
    icon: Code,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
    features: ["Endpoint Catalog", "Request Examples", "Response Schemas", "Health Status"],
    status: "operational",
  },
  {
    name: "File Upload Zone",
    description: "Drag-and-drop data ingestion with quality validation and real-time processing status",
    href: "/databank-manager",
    icon: Upload,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
    features: ["CSV/Excel Upload", "Quality Scoring", "Progress Tracking", "Multi-file Support"],
    status: "operational",
  },
  {
    name: "Executive War Room",
    description: "Real-time intelligence feed for C-suite with KPI tracking and strategic decision support",
    href: "/executive-war-room",
    icon: Activity,
    color: "text-red-500",
    bgColor: "bg-red-500/10",
    features: ["Live KPI Feed", "Event Stream", "Strategic Analytics", "Board Reporting"],
    status: "operational",
  },
  {
    name: "Verified Savings Ledger",
    description: "Complete financial audit trail with evidence-backed savings validation and reconciliation",
    href: "/verified-savings-ledger",
    icon: Database,
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
    features: ["Receipt Tracking", "Evidence Chain", "Reconciliation", "Snowflake Export"],
    status: "operational",
  },
  {
    name: "Contract Intelligence",
    description: "AI-powered contract analysis with clause extraction and risk assessment",
    href: "/contract-intelligence",
    icon: FileText,
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
    features: ["Clause Extraction", "Risk Scoring", "Benchmark Analysis", "Copilot Chat"],
    status: "operational",
  },
  {
    name: "Actuarial Analytics",
    description: "Monte Carlo simulations, trend analysis, and predictive modeling for risk assessment",
    href: "/solutions/actuarial-benefits",
    icon: TrendingUp,
    color: "text-cyan-500",
    bgColor: "bg-cyan-500/10",
    features: ["Monte Carlo", "Trend Projection", "Risk Modeling", "Scenario Analysis"],
    status: "operational",
  },
  {
    name: "AI Agent Orchestra",
    description: "Multi-agent system with 9 specialized analysts for consensus-driven intelligence",
    href: "/agentic-workflow",
    icon: Brain,
    color: "text-pink-500",
    bgColor: "bg-pink-500/10",
    features: ["9 Specialist Agents", "Debate Protocol", "Consensus Building", "Evidence Synthesis"],
    status: "operational",
  },
];

const backendEndpoints = [
  { method: "POST", path: "/upload/", description: "Upload CSV/Excel files" },
  { method: "GET", path: "/upload/datasets", description: "List all datasets" },
  { method: "POST", path: "/analytics/summary", description: "Summary statistics" },
  { method: "POST", path: "/analytics/trend", description: "Trend analysis" },
  { method: "POST", path: "/api/v1/agents/orchestrate", description: "Multi-agent orchestration" },
  { method: "POST", path: "/api/v1/evidence", description: "Create evidence object" },
  { method: "GET", path: "/api/v1/evidence", description: "List evidence objects" },
  { method: "GET", path: "/api/v1/audit", description: "Query audit logs" },
];

export default function IntelligenceHub() {
  return (
    <ProtectedToolsRoute>
      <SEO
        title="Intelligence Hub - Kincaid Health"
        description="Central access to all intelligence tools and AI agents"
      />
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto p-6 space-y-12">
          {/* Header */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Sparkles className="w-10 h-10 text-primary" />
              <h1 className="text-5xl font-bold">Intelligence Hub</h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-3xl">
              Central access point for all Kincaid Health™ intelligence tools, AI agents, and analytics engines.
              Complete end-to-end workflow from data ingestion to executive reporting.
            </p>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                All Systems Operational
              </Badge>
              <Badge variant="outline">8 Tools Available</Badge>
              <Badge variant="outline">9 AI Agents Active</Badge>
            </div>
          </div>

          {/* Quick Start */}
          <Card className="p-6 bg-primary/5 border-primary/20">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <AlertCircle className="w-6 h-6 text-primary" />
                Quick Start
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h3 className="font-semibold">Backend (Python/FastAPI)</h3>
                  <pre className="bg-background rounded-lg p-3 text-sm font-mono">
{`cd backend
source venv/bin/activate
uvicorn app.main:app --reload

# Running at http://localhost:8000`}
                  </pre>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">Frontend (Next.js)</h3>
                  <pre className="bg-background rounded-lg p-3 text-sm font-mono">
{`npm run dev

# Running at http://localhost:3000`}
                  </pre>
                </div>
              </div>
              <div className="flex gap-2">
                <a href="http://localhost:8000/docs" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline">
                    Interactive API Docs
                  </Button>
                </a>
                <a href="/docs/ACCESSING-NEW-TOOLS.md" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline">
                    Access Guide
                  </Button>
                </a>
              </div>
            </div>
          </Card>

          {/* Tools Grid */}
          <div className="space-y-4">
            <h2 className="text-3xl font-bold">Intelligence Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tools.map((tool) => {
                const Icon = tool.icon;
                return (
                  <Link key={tool.name} href={tool.href}>
                    <Card className="p-6 hover:border-primary transition-all h-full cursor-pointer group">
                      <div className="space-y-4">
                        <div className="flex items-start justify-between">
                          <div className={`${tool.bgColor} p-3 rounded-lg`}>
                            <Icon className={`w-6 h-6 ${tool.color}`} />
                          </div>
                          <Badge variant="outline" className="gap-1">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                            {tool.status}
                          </Badge>
                        </div>
                        <div className="space-y-2">
                          <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                            {tool.name}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {tool.description}
                          </p>
                        </div>
                        <div className="space-y-2">
                          <p className="text-xs font-semibold text-muted-foreground">Features:</p>
                          <div className="flex flex-wrap gap-2">
                            {tool.features.map((feature) => (
                              <Badge key={feature} variant="secondary" className="text-xs">
                                {feature}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Backend API Endpoints */}
          <Card className="p-6">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Code className="w-6 h-6" />
                Backend API Endpoints
              </h2>
              <p className="text-muted-foreground">
                FastAPI server running at <code className="bg-muted px-2 py-1 rounded">http://localhost:8000</code>
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {backendEndpoints.map((endpoint, idx) => (
                  <div key={idx} className="flex items-center gap-3 bg-muted/50 rounded-lg p-3">
                    <Badge variant={endpoint.method === "GET" ? "default" : "secondary"}>
                      {endpoint.method}
                    </Badge>
                    <div className="flex-1">
                      <code className="text-sm font-mono">{endpoint.path}</code>
                      <p className="text-xs text-muted-foreground">{endpoint.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Workflow Diagram */}
          <Card className="p-6 bg-muted/30">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Complete Intelligence Workflow</h2>
              <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center">
                <div className="flex-1 space-y-2">
                  <div className="bg-green-500/10 p-4 rounded-lg">
                    <Upload className="w-8 h-8 mx-auto text-green-500" />
                    <p className="font-semibold mt-2">1. Upload Data</p>
                    <p className="text-xs text-muted-foreground">CSV/Excel ingestion</p>
                  </div>
                </div>
                <div className="text-2xl text-muted-foreground">→</div>
                <div className="flex-1 space-y-2">
                  <div className="bg-blue-500/10 p-4 rounded-lg">
                    <Brain className="w-8 h-8 mx-auto text-blue-500" />
                    <p className="font-semibold mt-2">2. AI Analysis</p>
                    <p className="text-xs text-muted-foreground">9 specialist agents</p>
                  </div>
                </div>
                <div className="text-2xl text-muted-foreground">→</div>
                <div className="flex-1 space-y-2">
                  <div className="bg-purple-500/10 p-4 rounded-lg">
                    <Shield className="w-8 h-8 mx-auto text-purple-500" />
                    <p className="font-semibold mt-2">3. Evidence Tracking</p>
                    <p className="text-xs text-muted-foreground">Complete provenance</p>
                  </div>
                </div>
                <div className="text-2xl text-muted-foreground">→</div>
                <div className="flex-1 space-y-2">
                  <div className="bg-red-500/10 p-4 rounded-lg">
                    <Activity className="w-8 h-8 mx-auto text-red-500" />
                    <p className="font-semibold mt-2">4. Executive Action</p>
                    <p className="text-xs text-muted-foreground">War room dashboard</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Documentation Links */}
          <Card className="p-6">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Documentation & Resources</h2>
              <div className="grid md:grid-cols-3 gap-4">
                <a href="/docs/ACCESSING-NEW-TOOLS.md" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="w-full justify-start gap-2">
                    <FileText className="w-4 h-4" />
                    Access Guide
                  </Button>
                </a>
                <a href="http://localhost:8000/docs" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="w-full justify-start gap-2">
                    <Code className="w-4 h-4" />
                    Interactive API Docs
                  </Button>
                </a>
                <Link href="/api-documentation">
                  <Button variant="outline" className="w-full justify-start gap-2">
                    <Database className="w-4 h-4" />
                    API Documentation
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </ProtectedToolsRoute>
  );
}