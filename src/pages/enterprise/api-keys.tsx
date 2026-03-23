import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { EnterpriseHeader } from "@/components/enterprise/EnterpriseHeader";
import { authService } from "@/services/authService";
import { organizationService } from "@/services/organizationService";
import { SEO } from "@/components/SEO";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Plus, Key, Copy, AlertCircle, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function APIKeysPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [orgId, setOrgId] = useState<string | null>(null);
  const [keys, setKeys] = useState<any[]>([]);
  const [newKeyName, setNewKeyName] = useState("");
  const [generatedKey, setGeneratedKey] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const user = await authService.getCurrentUser();
    if (!user) {
      router.push("/auth/signin?redirect=/enterprise/api-keys");
      return;
    }

    if (user.organization_id) {
      setOrgId(user.organization_id);
      const data = await organizationService.getAPIKeys(user.organization_id);
      setKeys(data);
    }
    setLoading(false);
  };

  const handleCreateKey = async () => {
    if (!orgId || !newKeyName) return;
    
    setLoading(true);
    const { apiKey, error } = await organizationService.createAPIKey(orgId, newKeyName, ["read", "write"]);
    
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else if (apiKey) {
      setGeneratedKey(apiKey);
      setNewKeyName("");
      // Reload keys
      const data = await organizationService.getAPIKeys(orgId);
      setKeys(data);
      toast({ title: "Success", description: "API Key generated successfully." });
    }
    setLoading(false);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: "Copied!", description: "API key copied to clipboard." });
  };

  if (loading && keys.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <>
      <SEO title="API Keys - Enterprise | SiriusB iQ" />
      <div className="min-h-screen bg-background">
        <EnterpriseHeader />
        <main className="container py-8 max-w-5xl">
          <div className="space-y-2 mb-8">
            <h1 className="text-3xl font-bold tracking-tight">API Keys</h1>
            <p className="text-muted-foreground">
              Manage your organization's API keys for automated integrations and agents.
            </p>
          </div>

          {generatedKey && (
            <Card className="mb-8 border-green-500 bg-green-50/50 dark:bg-green-950/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-600 dark:text-green-400">
                  <AlertCircle className="h-5 w-5" />
                  Save your new API key
                </CardTitle>
                <CardDescription>
                  Please copy this key and store it somewhere safe. For security reasons, you will not be able to see it again.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 mt-2">
                  <code className="flex-1 bg-background p-3 rounded border font-mono text-sm break-all">
                    {generatedKey}
                  </code>
                  <Button onClick={() => copyToClipboard(generatedKey)} variant="secondary">
                    <Copy className="h-4 w-4 mr-2" /> Copy
                  </Button>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" onClick={() => setGeneratedKey(null)} className="w-full">
                  I have saved my key safely
                </Button>
              </CardFooter>
            </Card>
          )}

          <div className="grid gap-8 md:grid-cols-3">
            <Card className="md:col-span-1 h-fit">
              <CardHeader>
                <CardTitle>Create New Key</CardTitle>
                <CardDescription>Generate a new API token for your applications.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Key Name</Label>
                  <Input 
                    id="name" 
                    placeholder="e.g. Production Backend" 
                    value={newKeyName}
                    onChange={(e) => setNewKeyName(e.target.value)}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full" 
                  onClick={handleCreateKey}
                  disabled={!newKeyName || loading}
                >
                  <Plus className="h-4 w-4 mr-2" /> Generate Key
                </Button>
              </CardFooter>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Active Keys</CardTitle>
                <CardDescription>You have {keys.length} active API keys.</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Prefix</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {keys.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center py-6 text-muted-foreground">
                          No API keys generated yet.
                        </TableCell>
                      </TableRow>
                    ) : (
                      keys.map((key) => (
                        <TableRow key={key.id}>
                          <TableCell className="font-medium flex items-center gap-2">
                            <Key className="h-4 w-4 text-muted-foreground" />
                            {key.name}
                          </TableCell>
                          <TableCell>
                            <code className="bg-muted px-2 py-1 rounded text-xs">
                              {key.key_prefix}...
                            </code>
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {new Date(key.created_at).toLocaleDateString()}
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive hover:bg-destructive/10">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </>
  );
}