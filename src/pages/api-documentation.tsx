/**
 * KINCAID HEALTH™
 * API Documentation Dashboard
 * Interactive documentation for FastAPI backend
 */

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Code, 
  Database, 
  FileText, 
  Brain, 
  LineChart, 
  Shield,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { SEO } from "@/components/SEO";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { ProtectedToolsRoute } from "@/components/ProtectedToolsRoute";

const API_ENDPOINTS = {
  data: [
    {
      method: "POST",
      path: "/upload/",
      description: "Upload CSV/Excel file for ingestion",
      params: { file: "UploadFile" },
      returns: { dataset: "object", quality: "object" },
    },
    {
      method: "GET",
      path: "/upload/datasets",
      description: "List all uploaded datasets",
      returns: { datasets: "array" },
    },
  ],
  analytics: [
    {
      method: "POST",
      path: "/analytics/summary",
      description: "Generate summary statistics",
      params: { file: "UploadFile" },
      returns: { mean: "object", median: "object", variance: "object" },
    },
    {
      method: "POST",
      path: "/analytics/trend",
      description: "Calculate trend for column",
      params: { file: "UploadFile", column: "string" },
      returns: { column: "string", trend: "number" },
    },
    {
      method: "POST",
      path: "/analytics/correlation",
      description: "Calculate correlation matrix",
      returns: { correlation_matrix: "object" },
    },
  ],
  agents: [
    {
      method: "POST",
      path: "/api/v1/agents/orchestrate",
      description: "Multi-agent orchestration",
      params: { task: "string", agents: "array", context: "object" },
      returns: { consensus: "object", debate: "array", confidence: "number" },
    },
    {
      method: "GET",
      path: "/api/v1/agents/{name}",
      description: "Get agent capabilities",
      returns: { agent: "object", capabilities: "array" },
    },
  ],
  evidence: [
    {
      method: "POST",
      path: "/api/v1/evidence",
      description: "Create evidence object",
      params: { 
        object_type: "string", 
        title: "string", 
        confidence_score: "number",
        evidence_chain: "array" 
      },
      returns: { id: "string", created_at: "string" },
    },
    {
      method: "GET",
      path: "/api/v1/evidence",
      description: "List evidence objects",
      params: { 
        object_type: "string?", 
        confidence_min: "number?",
        limit: "number?" 
      },
      returns: { evidence: "array", total: "number" },
    },
    {
      method: "GET",
      path: "/api/v1/evidence/{id}",
      description: "Get evidence object",
      returns: { evidence: "object", chain: "array" },
    },
  ],
};

export default function ApiDocumentation() {
  const [activeTab, setActiveTab] = useState("data");
  const [apiStatus, setApiStatus] = useState<"checking" | "online" | "offline">("checking");

  return (
    <ProtectedToolsRoute>
      <SEO
        title="API Documentation - Kincaid Health"
        description="FastAPI endpoint reference and integration guides"
      />
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto p-6 space-y-8">
          {/* Header */}
          <div className="space-y-2">
            <h1 className="text-4xl font-bold">KINCAID HEALTH™ API</h1>
            <p className="text-xl text-muted-foreground">
              Enterprise Healthcare Intelligence Platform API Documentation
            </p>
            <div className="flex items-center gap-3 mt-4">
              <Badge variant="outline" className="gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                API v0.1
              </Badge>
              <Badge variant="outline" className="gap-2">
                <Database className="w-4 h-4" />
                FastAPI Backend
              </Badge>
              <a 
                href="http://localhost:8000/docs" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Button variant="outline">
                  Interactive Docs
                </Button>
              </a>
            </div>
          </div>

          {/* Base URL */}
          <Card className="p-6 bg-muted/50">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Base URL</p>
              <div className="flex items-center gap-2">
                <code className="px-3 py-2 bg-background rounded text-lg font-mono">
                  http://localhost:8000
                </code>
                <Badge variant={apiStatus === "online" ? "default" : "destructive"}>
                  {apiStatus === "checking" ? "Checking..." : apiStatus}
                </Badge>
              </div>
            </div>
          </Card>

          {/* Endpoints by Category */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="data" className="gap-2">
                <Database className="w-4 h-4" />
                Data Ingestion
              </TabsTrigger>
              <TabsTrigger value="analytics" className="gap-2">
                <LineChart className="w-4 h-4" />
                Analytics
              </TabsTrigger>
              <TabsTrigger value="agents" className="gap-2">
                <Brain className="w-4 h-4" />
                AI Agents
              </TabsTrigger>
              <TabsTrigger value="evidence" className="gap-2">
                <Shield className="w-4 h-4" />
                Evidence Spine
              </TabsTrigger>
            </TabsList>

            {Object.entries(API_ENDPOINTS).map(([category, endpoints]) => (
              <TabsContent key={category} value={category} className="space-y-4">
                {endpoints.map((endpoint, idx) => (
                  <Card key={idx} className="p-6">
                    <div className="space-y-4">
                      {/* Method & Path */}
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <Badge 
                            variant={endpoint.method === "GET" ? "default" : "secondary"}
                            className="font-mono"
                          >
                            {endpoint.method}
                          </Badge>
                          <code className="text-lg font-mono">{endpoint.path}</code>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-muted-foreground">{endpoint.description}</p>

                      {/* Parameters */}
                      {endpoint.params && (
                        <div className="space-y-2">
                          <p className="text-sm font-semibold">Parameters</p>
                          <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                            {Object.entries(endpoint.params).map(([key, type]) => (
                              <div key={key} className="flex items-center gap-2 font-mono text-sm">
                                <span className="text-primary">{key}</span>
                                <span className="text-muted-foreground">:</span>
                                <span className="text-muted-foreground">{String(type)}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Returns */}
                      <div className="space-y-2">
                        <p className="text-sm font-semibold">Returns</p>
                        <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                          {Object.entries(endpoint.returns).map(([key, type]) => (
                            <div key={key} className="flex items-center gap-2 font-mono text-sm">
                              <span className="text-primary">{key}</span>
                              <span className="text-muted-foreground">:</span>
                              <span className="text-muted-foreground">{String(type)}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Example */}
                      <details className="cursor-pointer">
                        <summary className="text-sm font-semibold mb-2">Example Request</summary>
                        <pre className="bg-muted/50 rounded-lg p-4 overflow-x-auto">
                          <code className="text-sm">
{`fetch('http://localhost:8000${endpoint.path}', {
  method: '${endpoint.method}',
  ${endpoint.params ? `body: JSON.stringify(${JSON.stringify(endpoint.params, null, 2)})` : ''}
})`}
                          </code>
                        </pre>
                      </details>
                    </div>
                  </Card>
                ))}
              </TabsContent>
            ))}
          </Tabs>

          {/* Evidence Spine Architecture */}
          <Card className="p-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Shield className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-bold">Evidence Spine</h2>
              </div>
              <p className="text-muted-foreground">
                Every action in the system creates an immutable evidence object with complete provenance:
              </p>
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div className="bg-muted/50 rounded-lg p-4">
                  <h3 className="font-semibold mb-2">Tracked Activities</h3>
                  <ul className="space-y-2 text-sm">
                    <li>• Data uploads → Evidence of data ingestion</li>
                    <li>• API calls → Evidence of system usage</li>
                    <li>• AI agent executions → Evidence of analytical decisions</li>
                    <li>• User actions → Evidence of human decisions</li>
                    <li>• System events → Evidence of infrastructure health</li>
                  </ul>
                </div>
                <div className="bg-muted/50 rounded-lg p-4">
                  <h3 className="font-semibold mb-2">Evidence Properties</h3>
                  <ul className="space-y-2 text-sm">
                    <li>• Confidence scoring (0.0 to 1.0)</li>
                    <li>• Financial impact quantification</li>
                    <li>• Risk assessment scoring</li>
                    <li>• Complete provenance chain</li>
                    <li>• Version history (immutable trail)</li>
                  </ul>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </ProtectedToolsRoute>
  );
}