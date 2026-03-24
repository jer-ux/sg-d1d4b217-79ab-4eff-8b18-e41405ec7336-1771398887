/**
 * Enterprise Integrations Component
 * Manage third-party integrations
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Settings,
  Link as LinkIcon,
  CheckCircle,
  XCircle,
} from "lucide-react";

interface Integration {
  id: string;
  name: string;
  description: string;
  category: string;
  status: "connected" | "disconnected";
  logo: string;
}

export function EnterpriseIntegrations() {
  const integrations: Integration[] = [
    {
      id: "1",
      name: "Slack",
      description: "Send contract analysis notifications to Slack channels",
      category: "Communication",
      status: "connected",
      logo: "📢",
    },
    {
      id: "2",
      name: "Microsoft Teams",
      description: "Collaborate on contracts with your team in Teams",
      category: "Communication",
      status: "disconnected",
      logo: "👥",
    },
    {
      id: "3",
      name: "Salesforce",
      description: "Sync contract data with Salesforce CRM",
      category: "CRM",
      status: "connected",
      logo: "☁️",
    },
    {
      id: "4",
      name: "Google Drive",
      description: "Store contract documents in Google Drive",
      category: "Storage",
      status: "disconnected",
      logo: "📁",
    },
    {
      id: "5",
      name: "Snowflake",
      description: "Export analysis data to Snowflake data warehouse",
      category: "Data",
      status: "connected",
      logo: "❄️",
    },
    {
      id: "6",
      name: "Databricks",
      description: "Integrate with Databricks for advanced analytics",
      category: "Data",
      status: "disconnected",
      logo: "🧱",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Integrations</h2>
        <p className="text-gray-500 mt-1">
          Connect your favorite tools and services
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {integrations.map((integration) => (
          <Card key={integration.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-4xl">{integration.logo}</div>
                  <div>
                    <CardTitle>{integration.name}</CardTitle>
                    <CardDescription>{integration.description}</CardDescription>
                  </div>
                </div>
                <Badge variant="outline">{integration.category}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {integration.status === "connected" ? (
                    <>
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="text-sm font-medium text-green-600">Connected</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="h-5 w-5 text-gray-400" />
                      <span className="text-sm font-medium text-gray-500">Not Connected</span>
                    </>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {integration.status === "connected" ? (
                    <>
                      <Button variant="ghost" size="sm">
                        <Settings className="h-4 w-4" />
                      </Button>
                      <Switch checked />
                    </>
                  ) : (
                    <Button variant="outline" size="sm">
                      <LinkIcon className="h-4 w-4 mr-2" />
                      Connect
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}