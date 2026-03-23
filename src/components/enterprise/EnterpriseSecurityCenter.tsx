import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { 
  Shield, 
  Lock, 
  Key, 
  AlertTriangle, 
  CheckCircle2,
  Bell,
  Eye,
  Database,
  Server
} from "lucide-react";

export function EnterpriseSecurityCenter() {
  const securityFeatures = [
    { name: 'Two-Factor Authentication', enabled: true, description: 'Require 2FA for all users' },
    { name: 'IP Whitelisting', enabled: true, description: 'Restrict access to approved IPs' },
    { name: 'Session Timeout', enabled: true, description: 'Auto-logout after 30 minutes' },
    { name: 'Data Encryption at Rest', enabled: true, description: 'AES-256 encryption' },
    { name: 'Audit Logging', enabled: true, description: 'Track all system activities' },
    { name: 'Anomaly Detection', enabled: false, description: 'AI-powered threat detection' },
  ];

  const securityMetrics = [
    { label: 'Password Strength', value: 95, status: 'excellent' },
    { label: 'Data Encryption', value: 100, status: 'excellent' },
    { label: 'Access Controls', value: 88, status: 'good' },
    { label: 'Vulnerability Scan', value: 92, status: 'excellent' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold">Security Center</h3>
          <p className="text-gray-500">Enterprise security configuration and monitoring</p>
        </div>
        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
          <CheckCircle2 className="h-3 w-3 mr-1" />
          All Systems Secure
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-600">Security Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">94%</div>
            <p className="text-xs text-gray-500 mt-1">Excellent</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-600">Active Sessions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">18</div>
            <p className="text-xs text-gray-500 mt-1">8 users online</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-600">Failed Login Attempts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">0</div>
            <p className="text-xs text-gray-500 mt-1">Last 24 hours</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-600">Data Backups</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">✓</div>
            <p className="text-xs text-gray-500 mt-1">Daily + Real-time</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Security Features</CardTitle>
          <CardDescription>Configure enterprise security settings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {securityFeatures.map((feature) => (
              <div key={feature.name} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <Shield className={`h-5 w-5 ${feature.enabled ? 'text-green-600' : 'text-gray-400'}`} />
                  <div>
                    <div className="font-medium">{feature.name}</div>
                    <div className="text-sm text-gray-500">{feature.description}</div>
                  </div>
                </div>
                <Switch checked={feature.enabled} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Security Metrics</CardTitle>
            <CardDescription>Real-time security health monitoring</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {securityMetrics.map((metric) => (
              <div key={metric.label}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">{metric.label}</span>
                  <span className="text-sm text-gray-600">{metric.value}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      metric.status === 'excellent' ? 'bg-green-600' : 'bg-yellow-500'
                    }`}
                    style={{ width: `${metric.value}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Access Control</CardTitle>
            <CardDescription>API keys and authentication</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Key className="h-5 w-5 text-blue-600" />
                <div>
                  <div className="font-medium">Production API Key</div>
                  <div className="text-xs text-gray-500">Created: Jan 15, 2026</div>
                </div>
              </div>
              <Badge variant="outline" className="bg-green-50 text-green-700">Active</Badge>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Lock className="h-5 w-5 text-purple-600" />
                <div>
                  <div className="font-medium">Webhook Secret</div>
                  <div className="text-xs text-gray-500">Rotated: Mar 1, 2026</div>
                </div>
              </div>
              <Badge variant="outline" className="bg-green-50 text-green-700">Active</Badge>
            </div>

            <Button className="w-full" variant="outline">
              <Key className="h-4 w-4 mr-2" />
              Generate New API Key
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Data Protection</CardTitle>
          <CardDescription>Encryption, backups, and data residency</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg">
              <Database className="h-8 w-8 text-blue-600 mb-2" />
              <div className="font-medium mb-1">Encryption at Rest</div>
              <div className="text-sm text-gray-500">AES-256 encryption for all data</div>
              <Badge variant="outline" className="mt-2 bg-green-50 text-green-700">Enabled</Badge>
            </div>

            <div className="p-4 border rounded-lg">
              <Server className="h-8 w-8 text-purple-600 mb-2" />
              <div className="font-medium mb-1">Encryption in Transit</div>
              <div className="text-sm text-gray-500">TLS 1.3 for all connections</div>
              <Badge variant="outline" className="mt-2 bg-green-50 text-green-700">Enabled</Badge>
            </div>

            <div className="p-4 border rounded-lg">
              <Eye className="h-8 w-8 text-orange-600 mb-2" />
              <div className="font-medium mb-1">Data Residency</div>
              <div className="text-sm text-gray-500">US East (Virginia)</div>
              <Badge variant="outline" className="mt-2">Configured</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}