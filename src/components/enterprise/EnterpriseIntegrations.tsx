import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { 
  Slack, 
  Webhook, 
  Code, 
  Mail,
  Calendar,
  FileText,
  Database,
  Zap
} from "lucide-react";

export function EnterpriseIntegrations() {
  const integrations = [
    { 
      name: 'Slack', 
      icon: <Slack className="h-6 w-6" />, 
      description: 'Real-time notifications for contract analysis', 
      enabled: true,
      status: 'Connected',
      category: 'Communication'
    },
    { 
      name: 'Microsoft Teams', 
      icon: <Mail className="h-6 w-6" />, 
      description: 'Send alerts to Teams channels', 
      enabled: true,
      status: 'Connected',
      category: 'Communication'
    },
    { 
      name: 'Webhooks', 
      icon: <Webhook className="h-6 w-6" />, 
      description: 'Custom HTTP callbacks for events', 
      enabled: true,
      status: '3 Active',
      category: 'Developer'
    },
    { 
      name: 'REST API', 
      icon: <Code className="h-6 w-6" />, 
      description: 'Full API access for custom integrations', 
      enabled: true,
      status: 'Active',
      category: 'Developer'
    },
    { 
      name: 'Email Notifications', 
      icon: <Mail className="h-6 w-6" />, 
      description: 'Automated email alerts and reports', 
      enabled: true,
      status: 'Active',
      category: 'Communication'
    },
    { 
      name: 'Salesforce CRM', 
      icon: <Database className="h-6 w-6" />, 
      description: 'Sync contracts to Salesforce', 
      enabled: false,
      status: 'Available',
      category: 'CRM'
    },
    { 
      name: 'DocuSign', 
      icon: <FileText className="h-6 w-6" />, 
      description: 'Send contracts for e-signature', 
      enabled: false,
      status: 'Available',
      category: 'Documents'
    },
    { 
      name: 'SharePoint', 
      icon: <Database className="h-6 w-6" />, 
      description: 'Store contracts in SharePoint', 
      enabled: false,
      status: 'Available',
      category: 'Storage'
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold">Integrations</h3>
          <p className="text-gray-500">Connect with your enterprise tools</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Zap className="h-4 w-4 mr-2" />
          Browse Marketplace
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-600">Active Integrations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">5</div>
            <p className="text-xs text-gray-500 mt-1">Connected services</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-600">Webhook Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">1,247</div>
            <p className="text-xs text-gray-500 mt-1">Last 30 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-600">API Calls</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">24.5K</div>
            <p className="text-xs text-gray-500 mt-1">This month</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Available Integrations</CardTitle>
          <CardDescription>Connect your enterprise tools and workflows</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {integrations.map((integration) => (
              <div 
                key={integration.name} 
                className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-lg ${integration.enabled ? 'bg-blue-100' : 'bg-gray-100'}`}>
                    {integration.icon}
                  </div>
                  <div>
                    <div className="font-medium">{integration.name}</div>
                    <div className="text-sm text-gray-500">{integration.description}</div>
                    <Badge variant="outline" className="mt-1 text-xs">
                      {integration.category}
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Badge 
                    variant={integration.enabled ? 'default' : 'outline'}
                    className={integration.enabled ? 'bg-green-600' : ''}
                  >
                    {integration.status}
                  </Badge>
                  <Switch checked={integration.enabled} />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>API Configuration</CardTitle>
          <CardDescription>Manage API access and rate limits</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <div className="font-medium mb-2">Rate Limit</div>
              <div className="text-2xl font-bold">10,000</div>
              <div className="text-sm text-gray-500">requests per hour</div>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="font-medium mb-2">Usage This Month</div>
              <div className="text-2xl font-bold">24,547</div>
              <div className="text-sm text-gray-500">API calls</div>
            </div>
          </div>
          <Button variant="outline" className="w-full">
            <Code className="h-4 w-4 mr-2" />
            View API Documentation
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}