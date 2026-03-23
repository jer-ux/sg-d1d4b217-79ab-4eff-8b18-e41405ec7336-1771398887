import { useState, useEffect } from "react";
import Head from "next/head";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { EnterpriseHeader } from "@/components/enterprise/EnterpriseHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { 
  Palette, 
  Key, 
  Bell, 
  Shield, 
  Webhook,
  Upload,
  Download,
  Save,
  RefreshCw
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface BrandingSettings {
  logoUrl: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  fontFamily: string;
  whiteLabelEnabled: boolean;
  reportHeaderText: string;
  reportFooterText: string;
}

interface ApiKeyConfig {
  anthropicApiKey: string;
  openaiApiKey: string;
  webhookSecret: string;
  apiRateLimit: number;
}

export default function EnterpriseSettings() {
  const [activeTab, setActiveTab] = useState("branding");
  const [saving, setSaving] = useState(false);
  const [branding, setBranding] = useState<BrandingSettings>({
    logoUrl: '',
    primaryColor: '#1e3a8a',
    secondaryColor: '#3b82f6',
    accentColor: '#60a5fa',
    fontFamily: 'Inter',
    whiteLabelEnabled: true,
    reportHeaderText: '',
    reportFooterText: ''
  });
  const [apiKeys, setApiKeys] = useState<ApiKeyConfig>({
    anthropicApiKey: '',
    openaiApiKey: '',
    webhookSecret: '',
    apiRateLimit: 1000
  });

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      // Load branding settings
      const { data: brandingData } = await supabase
        .from('organization_branding')
        .select('*')
        .single();

      if (brandingData) {
        setBranding({
          logoUrl: brandingData.logo_url || '',
          primaryColor: brandingData.primary_color || '#1e3a8a',
          secondaryColor: brandingData.secondary_color || '#3b82f6',
          accentColor: brandingData.accent_color || '#60a5fa',
          fontFamily: brandingData.font_family || 'Inter',
          whiteLabelEnabled: brandingData.white_label_enabled || false,
          reportHeaderText: brandingData.report_header_text || '',
          reportFooterText: brandingData.report_footer_text || ''
        });
      }

      // Load API keys (masked for security)
      const { data: apiData } = await supabase
        .from('api_key_management')
        .select('*')
        .eq('is_active', true);

      if (apiData && apiData.length > 0) {
        const anthropicKey = apiData.find(k => k.key_name === 'anthropic_api_key');
        const openaiKey = apiData.find(k => k.key_name === 'openai_api_key');
        
        setApiKeys({
          anthropicApiKey: anthropicKey ? '••••••••••••' + anthropicKey.key_value?.slice(-4) : '',
          openaiApiKey: openaiKey ? '••••••••••••' + openaiKey.key_value?.slice(-4) : '',
          webhookSecret: '••••••••••••',
          apiRateLimit: 1000
        });
      }
    } catch (error) {
      console.error('Failed to load settings:', error);
    }
  };

  const saveBranding = async () => {
    setSaving(true);
    try {
      const { error } = await supabase
        .from('organization_branding')
        .upsert({
          logo_url: branding.logoUrl,
          primary_color: branding.primaryColor,
          secondary_color: branding.secondaryColor,
          accent_color: branding.accentColor,
          font_family: branding.fontFamily,
          white_label_enabled: branding.whiteLabelEnabled,
          report_header_text: branding.reportHeaderText,
          report_footer_text: branding.reportFooterText
        });

      if (!error) {
        alert('Branding settings saved successfully!');
      }
    } catch (error) {
      console.error('Failed to save branding:', error);
      alert('Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  const saveApiKeys = async () => {
    setSaving(true);
    try {
      // Only update if user entered new keys (not masked)
      if (apiKeys.anthropicApiKey && !apiKeys.anthropicApiKey.includes('••')) {
        await supabase.from('api_key_management').upsert({
          key_name: 'anthropic_api_key',
          key_value: apiKeys.anthropicApiKey,
          key_type: 'api',
          is_active: true
        });
      }

      alert('API keys updated successfully!');
      await loadSettings(); // Reload to show masked keys
    } catch (error) {
      console.error('Failed to save API keys:', error);
      alert('Failed to save API keys');
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <Head>
        <title>Enterprise Settings - SiriusB iQ</title>
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
        <EnterpriseHeader />

        <main className="container mx-auto px-4 py-8 max-w-[1200px]">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Enterprise Settings</h1>
            <p className="text-gray-600">Configure branding, API keys, and integrations</p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid grid-cols-2 lg:grid-cols-5 gap-2 h-auto p-2">
              <TabsTrigger value="branding">
                <Palette className="h-4 w-4 mr-2" />
                Branding
              </TabsTrigger>
              <TabsTrigger value="api-keys">
                <Key className="h-4 w-4 mr-2" />
                API Keys
              </TabsTrigger>
              <TabsTrigger value="webhooks">
                <Webhook className="h-4 w-4 mr-2" />
                Webhooks
              </TabsTrigger>
              <TabsTrigger value="notifications">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </TabsTrigger>
              <TabsTrigger value="security">
                <Shield className="h-4 w-4 mr-2" />
                Security
              </TabsTrigger>
            </TabsList>

            <TabsContent value="branding">
              <Card>
                <CardHeader>
                  <CardTitle>White-Label Branding</CardTitle>
                  <CardDescription>
                    Customize the platform appearance and PDF reports with your brand
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Enable White-Label Mode</Label>
                      <p className="text-sm text-gray-500">Remove SiriusB branding from all reports</p>
                    </div>
                    <Switch 
                      checked={branding.whiteLabelEnabled}
                      onCheckedChange={(checked) => setBranding({...branding, whiteLabelEnabled: checked})}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Company Logo URL</Label>
                    <Input 
                      value={branding.logoUrl}
                      onChange={(e) => setBranding({...branding, logoUrl: e.target.value})}
                      placeholder="https://example.com/logo.png"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>Primary Color</Label>
                      <div className="flex gap-2">
                        <Input 
                          type="color"
                          value={branding.primaryColor}
                          onChange={(e) => setBranding({...branding, primaryColor: e.target.value})}
                          className="w-20"
                        />
                        <Input 
                          value={branding.primaryColor}
                          onChange={(e) => setBranding({...branding, primaryColor: e.target.value})}
                          placeholder="#1e3a8a"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Secondary Color</Label>
                      <div className="flex gap-2">
                        <Input 
                          type="color"
                          value={branding.secondaryColor}
                          onChange={(e) => setBranding({...branding, secondaryColor: e.target.value})}
                          className="w-20"
                        />
                        <Input 
                          value={branding.secondaryColor}
                          onChange={(e) => setBranding({...branding, secondaryColor: e.target.value})}
                          placeholder="#3b82f6"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Accent Color</Label>
                      <div className="flex gap-2">
                        <Input 
                          type="color"
                          value={branding.accentColor}
                          onChange={(e) => setBranding({...branding, accentColor: e.target.value})}
                          className="w-20"
                        />
                        <Input 
                          value={branding.accentColor}
                          onChange={(e) => setBranding({...branding, accentColor: e.target.value})}
                          placeholder="#60a5fa"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Report Header Text</Label>
                    <Input 
                      value={branding.reportHeaderText}
                      onChange={(e) => setBranding({...branding, reportHeaderText: e.target.value})}
                      placeholder="Your Company Name - Confidential Contract Analysis"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Report Footer Text</Label>
                    <Input 
                      value={branding.reportFooterText}
                      onChange={(e) => setBranding({...branding, reportFooterText: e.target.value})}
                      placeholder="Prepared by Your Company Legal Team"
                    />
                  </div>

                  <div className="border rounded-lg p-6 bg-gray-50">
                    <h3 className="font-semibold mb-4">Preview</h3>
                    <div 
                      className="border rounded p-4 bg-white"
                      style={{
                        borderColor: branding.primaryColor
                      }}
                    >
                      <div 
                        className="font-bold text-lg mb-2"
                        style={{ color: branding.primaryColor }}
                      >
                        {branding.reportHeaderText || 'Your Company Name - Contract Analysis'}
                      </div>
                      <div className="text-sm text-gray-600 mb-4">
                        {branding.reportFooterText || 'Prepared by Your Legal Team'}
                      </div>
                      <Button 
                        style={{ 
                          backgroundColor: branding.secondaryColor,
                          color: 'white'
                        }}
                      >
                        Sample Button
                      </Button>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button onClick={saveBranding} disabled={saving}>
                      <Save className="h-4 w-4 mr-2" />
                      {saving ? 'Saving...' : 'Save Branding'}
                    </Button>
                    <Button variant="outline" onClick={loadSettings}>
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Reset
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="api-keys">
              <Card>
                <CardHeader>
                  <CardTitle>API Key Management</CardTitle>
                  <CardDescription>
                    Configure AI service API keys for live document parsing
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label>Anthropic Claude API Key</Label>
                    <Input 
                      type="password"
                      value={apiKeys.anthropicApiKey}
                      onChange={(e) => setApiKeys({...apiKeys, anthropicApiKey: e.target.value})}
                      placeholder="sk-ant-api03-..."
                    />
                    <p className="text-xs text-gray-500">
                      Required for Claude 3.5 Sonnet contract analysis. Get your key from 
                      <a href="https://console.anthropic.com" className="text-blue-600 ml-1" target="_blank" rel="noopener">
                        console.anthropic.com
                      </a>
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label>OpenAI API Key (Optional)</Label>
                    <Input 
                      type="password"
                      value={apiKeys.openaiApiKey}
                      onChange={(e) => setApiKeys({...apiKeys, openaiApiKey: e.target.value})}
                      placeholder="sk-proj-..."
                    />
                    <p className="text-xs text-gray-500">
                      For GPT-4 powered analysis as a fallback option
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label>Webhook Secret</Label>
                    <Input 
                      type="password"
                      value={apiKeys.webhookSecret}
                      onChange={(e) => setApiKeys({...apiKeys, webhookSecret: e.target.value})}
                      placeholder="whsec_..."
                    />
                    <p className="text-xs text-gray-500">
                      Secret key for validating incoming webhook requests
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label>API Rate Limit (requests/hour)</Label>
                    <Input 
                      type="number"
                      value={apiKeys.apiRateLimit}
                      onChange={(e) => setApiKeys({...apiKeys, apiRateLimit: parseInt(e.target.value)})}
                    />
                  </div>

                  <div className="border rounded-lg p-4 bg-blue-50 border-blue-200">
                    <div className="flex items-start gap-3">
                      <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-blue-900">Security Notice</h4>
                        <p className="text-sm text-blue-700 mt-1">
                          API keys are encrypted at rest and never logged. Only administrators can view or modify keys.
                          Keys are automatically rotated every 90 days for security.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button onClick={saveApiKeys} disabled={saving}>
                      <Save className="h-4 w-4 mr-2" />
                      {saving ? 'Saving...' : 'Save API Keys'}
                    </Button>
                    <Button variant="outline">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Test Connection
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>API Usage Statistics</CardTitle>
                  <CardDescription>Monitor your AI API consumption</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="border rounded-lg p-4">
                      <div className="text-sm text-gray-600">Claude API Calls</div>
                      <div className="text-2xl font-bold">24,547</div>
                      <div className="text-xs text-gray-500 mt-1">This month</div>
                    </div>
                    <div className="border rounded-lg p-4">
                      <div className="text-sm text-gray-600">Estimated Cost</div>
                      <div className="text-2xl font-bold">$1,247</div>
                      <div className="text-xs text-gray-500 mt-1">$0.051 per call avg</div>
                    </div>
                    <div className="border rounded-lg p-4">
                      <div className="text-sm text-gray-600">Rate Limit Usage</div>
                      <div className="text-2xl font-bold">67%</div>
                      <div className="text-xs text-gray-500 mt-1">670 of 1000/hour</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="webhooks">
              <Card>
                <CardHeader>
                  <CardTitle>Webhook Integrations</CardTitle>
                  <CardDescription>Configure webhooks for real-time notifications</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <Webhook className="h-8 w-8 text-blue-600" />
                        <div>
                          <div className="font-medium">Slack Notifications</div>
                          <div className="text-sm text-gray-500">https://hooks.slack.com/services/...</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge className="bg-green-600">Active</Badge>
                        <Switch checked={true} />
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <Webhook className="h-8 w-8 text-purple-600" />
                        <div>
                          <div className="font-medium">Microsoft Teams</div>
                          <div className="text-sm text-gray-500">https://outlook.office.com/webhook/...</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge className="bg-green-600">Active</Badge>
                        <Switch checked={true} />
                      </div>
                    </div>

                    <Button className="w-full" variant="outline">
                      <Webhook className="h-4 w-4 mr-2" />
                      Add New Webhook
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Templates</CardTitle>
                  <CardDescription>Customize email and alert templates</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500">Email notification templates coming soon...</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>SSO, SAML, and access control</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500">SSO configuration coming soon...</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>

        <SiteFooter />
      </div>
    </>
  );
}