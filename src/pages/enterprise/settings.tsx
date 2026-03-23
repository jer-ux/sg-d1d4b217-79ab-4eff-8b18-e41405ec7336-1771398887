import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { EnterpriseHeader } from "@/components/enterprise/EnterpriseHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Settings,
  Building2,
  Shield,
  Bell,
  CreditCard,
  Database,
  Zap,
  Globe,
  Lock,
  Users,
  FileText
} from "lucide-react";
import { authService } from "@/services/authService";
import { organizationService } from "@/services/organizationService";
import { useToast } from "@/hooks/use-toast";
import { SEO } from "@/components/SEO";

export default function EnterpriseSettings() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [organization, setOrganization] = useState<any>(null);
  const [settings, setSettings] = useState({
    name: "",
    domain: "",
    ssoEnabled: false,
    mfaRequired: false,
    dataRetentionDays: 90,
    auditLogsEnabled: true,
    apiRateLimit: 1000,
    webhooksEnabled: false
  });

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const user = await authService.getCurrentUser();
    if (!user || user.role !== "owner" && user.role !== "admin") {
      router.push("/enterprise/dashboard");
      return;
    }

    if (user.organization_id) {
      const org = await organizationService.getOrganization(user.organization_id);
      setOrganization(org);
      
      if (org) {
        setSettings({
          name: org.name || "",
          domain: org.domain || "",
          ssoEnabled: org.metadata?.sso_enabled || false,
          mfaRequired: org.metadata?.mfa_required || false,
          dataRetentionDays: org.metadata?.data_retention_days || 90,
          auditLogsEnabled: org.metadata?.audit_logs_enabled ?? true,
          apiRateLimit: org.metadata?.api_rate_limit || 1000,
          webhooksEnabled: org.metadata?.webhooks_enabled || false
        });
      }
    }
    setLoading(false);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (!organization) return;

      await organizationService.updateOrganization(organization.id, {
        name: settings.name,
        domain: settings.domain,
        metadata: {
          sso_enabled: settings.ssoEnabled,
          mfa_required: settings.mfaRequired,
          data_retention_days: settings.dataRetentionDays,
          audit_logs_enabled: settings.auditLogsEnabled,
          api_rate_limit: settings.apiRateLimit,
          webhooks_enabled: settings.webhooksEnabled
        }
      });

      toast({
        title: "Settings saved",
        description: "Organization settings have been updated successfully"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save settings",
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <>
      <SEO 
        title="Enterprise Settings - SiriusB iQ"
        description="Configure your enterprise organization settings"
      />
      <div className="min-h-screen bg-background">
        <EnterpriseHeader />
        <main className="container py-8">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold">Enterprise Settings</h1>
                <p className="text-muted-foreground">
                  Manage your organization configuration and preferences
                </p>
              </div>
              <Button onClick={handleSave} disabled={saving}>
                {saving ? "Saving..." : "Save Changes"}
              </Button>
            </div>

            <Tabs defaultValue="general" className="space-y-6">
              <TabsList className="grid w-full grid-cols-6">
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
                <TabsTrigger value="integrations">Integrations</TabsTrigger>
                <TabsTrigger value="billing">Billing</TabsTrigger>
                <TabsTrigger value="compliance">Compliance</TabsTrigger>
                <TabsTrigger value="advanced">Advanced</TabsTrigger>
              </TabsList>

              {/* General Settings */}
              <TabsContent value="general" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Building2 className="h-5 w-5" />
                      Organization Details
                    </CardTitle>
                    <CardDescription>
                      Basic information about your organization
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="org-name">Organization Name</Label>
                      <Input
                        id="org-name"
                        value={settings.name}
                        onChange={(e) => setSettings({ ...settings, name: e.target.value })}
                        placeholder="Acme Corporation"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="org-domain">Domain</Label>
                      <Input
                        id="org-domain"
                        value={settings.domain}
                        onChange={(e) => setSettings({ ...settings, domain: e.target.value })}
                        placeholder="acme.com"
                      />
                      <p className="text-sm text-muted-foreground">
                        Users with this email domain can request to join automatically
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bell className="h-5 w-5" />
                      Notification Preferences
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Email Notifications</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive email updates for important events
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Security Alerts</Label>
                        <p className="text-sm text-muted-foreground">
                          Get notified of security incidents
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Security Settings */}
              <TabsContent value="security" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5" />
                      Authentication & Access
                    </CardTitle>
                    <CardDescription>
                      Configure authentication methods and security policies
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Single Sign-On (SSO)</Label>
                        <p className="text-sm text-muted-foreground">
                          Enable SAML 2.0 or OAuth SSO integration
                        </p>
                      </div>
                      <Switch
                        checked={settings.ssoEnabled}
                        onCheckedChange={(checked) => setSettings({ ...settings, ssoEnabled: checked })}
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Require Multi-Factor Authentication</Label>
                        <p className="text-sm text-muted-foreground">
                          All users must enable MFA
                        </p>
                      </div>
                      <Switch
                        checked={settings.mfaRequired}
                        onCheckedChange={(checked) => setSettings({ ...settings, mfaRequired: checked })}
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Session Timeout</Label>
                        <p className="text-sm text-muted-foreground">
                          Automatically log out inactive users
                        </p>
                      </div>
                      <Badge variant="secondary">30 minutes</Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Lock className="h-5 w-5" />
                      Data Protection
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Data Retention Period</Label>
                      <Input
                        type="number"
                        value={settings.dataRetentionDays}
                        onChange={(e) => setSettings({ ...settings, dataRetentionDays: parseInt(e.target.value) })}
                      />
                      <p className="text-sm text-muted-foreground">
                        Days to retain audit logs and user data
                      </p>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Audit Logging</Label>
                        <p className="text-sm text-muted-foreground">
                          Track all user and system actions
                        </p>
                      </div>
                      <Switch
                        checked={settings.auditLogsEnabled}
                        onCheckedChange={(checked) => setSettings({ ...settings, auditLogsEnabled: checked })}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Integrations */}
              <TabsContent value="integrations" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="h-5 w-5" />
                      API Configuration
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Rate Limit (requests per minute)</Label>
                      <Input
                        type="number"
                        value={settings.apiRateLimit}
                        onChange={(e) => setSettings({ ...settings, apiRateLimit: parseInt(e.target.value) })}
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Webhooks</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive real-time event notifications
                        </p>
                      </div>
                      <Switch
                        checked={settings.webhooksEnabled}
                        onCheckedChange={(checked) => setSettings({ ...settings, webhooksEnabled: checked })}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Globe className="h-5 w-5" />
                      Third-Party Integrations
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Database className="h-8 w-8 text-blue-500" />
                        <div>
                          <p className="font-medium">Snowflake</p>
                          <p className="text-sm text-muted-foreground">Data warehouse integration</p>
                        </div>
                      </div>
                      <Button variant="outline">Configure</Button>
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Zap className="h-8 w-8 text-orange-500" />
                        <div>
                          <p className="font-medium">Databricks</p>
                          <p className="text-sm text-muted-foreground">Data lakehouse platform</p>
                        </div>
                      </div>
                      <Button variant="outline">Configure</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Billing */}
              <TabsContent value="billing" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="h-5 w-5" />
                      Subscription & Usage
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg border-2 border-purple-500/20">
                      <div>
                        <p className="text-lg font-bold">Enterprise Plan</p>
                        <p className="text-sm text-muted-foreground">Unlimited users & API calls</p>
                      </div>
                      <Badge className="bg-purple-500 text-white">Active</Badge>
                    </div>
                    <Separator />
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <p className="text-2xl font-bold">1,847</p>
                        <p className="text-sm text-muted-foreground">Active Users</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold">4.8M</p>
                        <p className="text-sm text-muted-foreground">API Calls</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold">67.5GB</p>
                        <p className="text-sm text-muted-foreground">Storage</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Compliance */}
              <TabsContent value="compliance" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Certifications & Standards
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-green-500" />
                        <span className="font-medium">SOC 2 Type II</span>
                      </div>
                      <Badge className="bg-green-500 text-white">Certified</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-green-500" />
                        <span className="font-medium">HIPAA Compliance</span>
                      </div>
                      <Badge className="bg-green-500 text-white">Active</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-yellow-500" />
                        <span className="font-medium">ISO 27001</span>
                      </div>
                      <Badge className="bg-yellow-500 text-white">Pending</Badge>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Advanced */}
              <TabsContent value="advanced" className="space-y-4">
                <Card className="border-red-500/20">
                  <CardHeader>
                    <CardTitle className="text-red-500">Danger Zone</CardTitle>
                    <CardDescription>
                      Irreversible and destructive actions
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-4 border border-red-500/20 rounded-lg">
                      <div>
                        <p className="font-medium">Transfer Ownership</p>
                        <p className="text-sm text-muted-foreground">
                          Transfer organization to another user
                        </p>
                      </div>
                      <Button variant="outline" className="text-red-500 border-red-500">
                        Transfer
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-4 border border-red-500/20 rounded-lg">
                      <div>
                        <p className="font-medium">Delete Organization</p>
                        <p className="text-sm text-muted-foreground">
                          Permanently delete all data
                        </p>
                      </div>
                      <Button variant="outline" className="text-red-500 border-red-500">
                        Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </>
  );
}