import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { EnterpriseHeader } from "@/components/enterprise/EnterpriseHeader";
import { EnterpriseDashboard } from "@/components/enterprise/EnterpriseDashboard";
import { authService } from "@/services/authService";
import { SEO } from "@/components/SEO";

export default function EnterpriseDashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const user = await authService.getCurrentUser();
    if (!user) {
      router.push("/auth/signin?redirect=/enterprise/dashboard");
      return;
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <>
      <SEO
        title="Enterprise Dashboard - SiriusB iQ"
        description="Manage your enterprise organization, monitor usage, and access advanced analytics"
      />
      <div className="min-h-screen bg-background">
        <EnterpriseHeader />
        <main className="container py-8">
          <div className="space-y-2 mb-8">
            <h1 className="text-3xl font-bold tracking-tight">Enterprise Dashboard</h1>
            <p className="text-muted-foreground">
              Monitor your organization's activity, usage, and compliance status
            </p>
          </div>
          <EnterpriseDashboard />
        </main>
      </div>
    </>
  );
}