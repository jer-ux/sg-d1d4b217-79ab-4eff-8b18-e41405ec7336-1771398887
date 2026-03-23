import { useState, useEffect } from "react";
import Head from "next/head";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { EnterpriseHeader } from "@/components/enterprise/EnterpriseHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Key, Copy, Eye, EyeOff, Plus, Trash2, RefreshCw } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface ApiKey {
  id: string;
  key_name: string;
  key_value: string;
  key_type: string;
  is_active: boolean;
  last_used_at: string | null;
  created_at: string;
}

export default function ApiKeysPage() {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [showKey, setShowKey] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadApiKeys();
  }, []);

  const loadApiKeys = async () => {
    try {
      const { data, error } = await supabase
        .from('api_key_management')
        .select('*')
        .order('created_at', { ascending: false });

      if (data) {
        setApiKeys(data);
      }
    } catch (error) {
      console.error('Failed to load API keys:', error);
    } finally {
      setLoading(false);
    }
  };

  const maskKey = (key: string) => {
    if (key.length < 8) return key;
    return '••••••••••••' + key.slice(-4);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  const generateNewKey = async () => {
    const keyName = prompt('Enter a name for this API key:');
    if (!keyName) return;

    const newKey = 'sk_live_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

    try {
      const { error } = await supabase
        .from('api_key_management')
        .insert({
          key_name: keyName,
          key_value: newKey,
          key_type: 'api',
          is_active: true
        });

      if (!error) {
        alert('New API key generated! Make sure to copy it now - you won\'t be able to see it again.');
        await loadApiKeys();
      }
    } catch (error) {
      console.error('Failed to generate key:', error);
    }
  };

  const revokeKey = async (keyId: string) => {
    if (!confirm('Are you sure you want to revoke this API key? This action cannot be undone.')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('api_key_management')
        .update({ is_active: false })
        .eq('id', keyId);

      if (!error) {
        await loadApiKeys();
      }
    } catch (error) {
      console.error('Failed to revoke key:', error);
    }
  };

  return (
    <>
      <Head>
        <title>API Key Management - SiriusB iQ</title>
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
        <EnterpriseHeader />

        <main className="container mx-auto px-4 py-8 max-w-[1200px]">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">API Key Management</h1>
              <p className="text-gray-600">Manage API keys for programmatic access</p>
            </div>
            <Button onClick={generateNewKey}>
              <Plus className="h-4 w-4 mr-2" />
              Generate New Key
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-gray-600">Active Keys</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{apiKeys.filter(k => k.is_active).length}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-gray-600">Total API Calls</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">24,547</div>
                <p className="text-xs text-gray-500 mt-1">This month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-gray-600">Rate Limit</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">1,000/hr</div>
                <p className="text-xs text-gray-500 mt-1">Current limit</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Your API Keys</CardTitle>
              <CardDescription>
                Use these keys to access the Contract Intelligence API programmatically
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-8">Loading API keys...</div>
              ) : apiKeys.length === 0 ? (
                <div className="text-center py-8">
                  <Key className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-500">No API keys yet</p>
                  <Button className="mt-4" onClick={generateNewKey}>
                    <Plus className="h-4 w-4 mr-2" />
                    Generate Your First Key
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {apiKeys.map((key) => (
                    <div key={key.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="font-medium">{key.key_name}</div>
                        <div className="flex items-center gap-2 mt-1">
                          <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                            {showKey[key.id] ? key.key_value : maskKey(key.key_value)}
                          </code>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => setShowKey({...showKey, [key.id]: !showKey[key.id]})}
                          >
                            {showKey[key.id] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => copyToClipboard(key.key_value)}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="text-xs text-gray-500 mt-2">
                          Created: {new Date(key.created_at).toLocaleDateString()}
                          {key.last_used_at && ` • Last used: ${new Date(key.last_used_at).toLocaleDateString()}`}
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge variant={key.is_active ? 'default' : 'outline'} className={key.is_active ? 'bg-green-600' : ''}>
                          {key.is_active ? 'Active' : 'Revoked'}
                        </Badge>
                        {key.is_active && (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => revokeKey(key.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>API Documentation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Authentication</h3>
                <p className="text-sm text-gray-600 mb-2">
                  Include your API key in the request header:
                </p>
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
{`Authorization: Bearer YOUR_API_KEY
Content-Type: application/json`}
                </pre>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Upload Contract</h3>
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
{`POST /api/contracts/upload
{
  "file": "base64_encoded_pdf",
  "filename": "contract.pdf",
  "contract_type": "Commercial"
}`}
                </pre>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Get Analysis Results</h3>
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
{`GET /api/contracts/analysis/:id

Response:
{
  "overall_score": 85,
  "risk_level": "Low",
  "potential_savings": 1250000,
  "provisions": [...],
  "red_flags": [...]
}`}
                </pre>
              </div>
            </CardContent>
          </Card>
        </main>

        <SiteFooter />
      </div>
    </>
  );
}