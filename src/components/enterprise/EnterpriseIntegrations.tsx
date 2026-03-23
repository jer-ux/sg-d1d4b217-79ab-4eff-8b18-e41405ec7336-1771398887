import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Database,
  Cloud,
  Workflow,
  Zap,
  CheckCircle2,
  Settings,
  ExternalLink,
  Key,
  RefreshCw
} from "lucide-react";

interface Integration {
  id: string;
  name: string;
  description: string;
  icon: any;
  status: "connected" | "available" | "coming_soon";
  category: string;
  lastSync?: string;
}

export function EnterpriseIntegrations() {
  const [integrations] = useState<Integration[]>([
    {
      id: "snowflake",
      name: "Snowflake",
      description: "Cloud data warehouse for analytics and data science",
      icon: Database,
      status: "connected",
      category: "Data Warehouse",
      lastSync: "2 minutes ago"
    },
    {
      id: "databricks",
      name: "Databricks",
      description: "Unified analytics platform for big data and AI",
      icon: Zap,
      status: "connected",
      category: "Data Lakehouse",
      lastSync: "5 minutes ago"
    },
    {
      id: "servicenow",
      name: "ServiceNow",
      description: "IT service management and workflow automation",
      icon: Workflow,
      status: "available",
      category: "ITSM"
    },
    {
      id: "salesforce",
      name: "Salesforce",
      description: "Customer relationship management platform",
      icon: Cloud,
      status: "available",
      category: "CRM"
    },
    {
      id: "workday",
      name: "Workday",
      description: "Enterprise resource planning and HCM",
      icon: Database,
      status: "coming_soon",
      category: "ERP"
    },
    {
      id: "sap",
      name: "SAP S/4HANA",
      description: "Enterprise resource planning system",
      icon: Database,
      status: "coming_soon",
      category: "ERP"
    }
  ]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "connected":
        return <Badge className="bg-green-500 text-white gap-1"><CheckCircle2 className="h-3 w-3" />Connected</Badge>;
      case "available":
        return <Badge variant="secondary">Available</Badge>;
      case "coming_soon":
        return <Badge variant="outline">Coming Soon</Badge>;
      default:
        return null;
    }
  };

  const categories = ["All", "Data Warehouse", "Data Lakehouse", "ITSM", "CRM", "ERP"];
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredIntegrations = selectedCategory === "All" 
    ? integrations 
    : integrations.filter(i => i.category === selectedCategory);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Enterprise Integrations</h2>
          <p className="text-muted-foreground">Connect your enterprise systems and data sources</p>
        </div>
        <Button className="gap-2">
          <Key className="h-4 w-4" />
          API Documentation
        </Button>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 flex-wrap">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            onClick={() => setSelectedCategory(category)}
            size="sm"
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Integrations Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredIntegrations.map((integration) => {
          const Icon = integration.icon;
          return (
            <Card key={integration.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{integration.name}</CardTitle>
                      <Badge variant="secondary" className="mt-1 text-xs">
                        {integration.category}
                      </Badge>
                    </div>
                  </div>
                  {getStatusBadge(integration.status)}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <CardDescription>{integration.description}</CardDescription>
                
                {integration.status === "connected" && integration.lastSync && (
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <RefreshCw className="h-3 w-3" />
                    Last synced {integration.lastSync}
                  </div>
                )}

                <div className="flex gap-2">
                  {integration.status === "connected" ? (
                    <>
                      <Button variant="outline" size="sm" className="flex-1 gap-2">
                        <Settings className="h-3 w-3" />
                        Configure
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1 gap-2">
                        <ExternalLink className="h-3 w-3" />
                        View Logs
                      </Button>
                    </>
                  ) : integration.status === "available" ? (
                    <Button className="w-full" size="sm">
                      Connect
                    </Button>
                  ) : (
                    <Button className="w-full" size="sm" disabled>
                      Coming Soon
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Custom Integration Section */}
      <Card>
        <CardHeader>
          <CardTitle>Custom Integration</CardTitle>
          <CardDescription>
            Need a custom integration? Our enterprise team can help you connect any system.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Integration Name</Label>
              <Input placeholder="e.g., Custom ERP System" />
            </div>
            <div className="space-y-2">
              <Label>System Type</Label>
              <Input placeholder="e.g., ERP, CRM, Data Warehouse" />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Description</Label>
            <Input placeholder="Brief description of your integration requirements" />
          </div>
          <Button>
            Request Custom Integration
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}