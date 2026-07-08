// KINCAID HEALTH™ SUPER ADMIN PORTAL
// Tenant management, company onboarding, role assignment

import { useEffect, useState } from "react";
import { SEO } from "@/components/SEO";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Building2,
  Users,
  Shield,
  Plus,
  Search,
  MoreVertical,
  CheckCircle2,
  XCircle,
  Clock,
  Settings,
  Database,
  Activity,
  AlertTriangle
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Tenant {
  tenant_id: string;
  organization_name: string;
  organization_type: "enterprise" | "broker" | "consultant" | "health_plan";
  status: "active" | "inactive" | "pending";
  created_at: string;
  user_count: number;
  data_volume_gb: number;
  plan_tier: "starter" | "professional" | "enterprise";
}

interface User {
  user_id: string;
  email: string;
  full_name: string;
  role: string;
  tenant_id: string;
  tenant_name: string;
  status: "active" | "inactive" | "pending";
  last_login: string;
}

const SYSTEM_ROLES = [
  { value: "super_admin", label: "Super Admin", description: "Full platform access" },
  { value: "enterprise_admin", label: "Enterprise Admin", description: "Manage organization" },
  { value: "actuary", label: "Actuary", description: "Run analyses" },
  { value: "benefits_analyst", label: "Benefits Analyst", description: "View analytics" },
  { value: "broker", label: "Broker", description: "Manage clients" },
  { value: "cfo", label: "CFO", description: "Financial insights" },
  { value: "chro", label: "CHRO", description: "HR metrics" },
  { value: "auditor", label: "Auditor", description: "Compliance review" },
  { value: "board_viewer", label: "Board Viewer", description: "Read-only reports" }
];

export default function AdminPortal() {
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);

  // New tenant form state
  const [newTenant, setNewTenant] = useState({
    organization_name: "",
    organization_type: "enterprise",
    plan_tier: "professional",
    admin_email: "",
    admin_name: ""
  });

  // New user form state
  const [newUser, setNewUser] = useState({
    email: "",
    full_name: "",
    role: "benefits_analyst",
    tenant_id: ""
  });

  useEffect(() => {
    checkAuthorization();
  }, []);

  const checkAuthorization = async () => {
    try {
      const res = await fetch("/api/auth/context");
      const context = await res.json();
      
      if (context.role !== "super_admin") {
        setIsAuthorized(false);
        return;
      }

      setIsAuthorized(true);
      await loadAdminData();
    } catch (error) {
      console.error("Authorization check failed:", error);
      setIsAuthorized(false);
    }
  };

  const loadAdminData = async () => {
    setLoading(true);
    try {
      const [tenantsRes, usersRes] = await Promise.all([
        fetch("/api/admin/tenants"),
        fetch("/api/admin/users")
      ]);

      const tenantsData = await tenantsRes.json();
      const usersData = await usersRes.json();

      setTenants(tenantsData);
      setUsers(usersData);
    } catch (error) {
      console.error("Failed to load admin data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTenant = async () => {
    try {
      const res = await fetch("/api/admin/tenants", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTenant)
      });

      if (res.ok) {
        await loadAdminData();
        setNewTenant({
          organization_name: "",
          organization_type: "enterprise",
          plan_tier: "professional",
          admin_email: "",
          admin_name: ""
        });
      }
    } catch (error) {
      console.error("Failed to create tenant:", error);
    }
  };

  const handleCreateUser = async () => {
    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser)
      });

      if (res.ok) {
        await loadAdminData();
        setNewUser({
          email: "",
          full_name: "",
          role: "benefits_analyst",
          tenant_id: ""
        });
      }
    } catch (error) {
      console.error("Failed to create user:", error);
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      active: "bg-green-100 text-green-800 border-green-300",
      inactive: "bg-gray-100 text-gray-800 border-gray-300",
      pending: "bg-yellow-100 text-yellow-800 border-yellow-300"
    };
    const icons = {
      active: <CheckCircle2 className="h-3 w-3" />,
      inactive: <XCircle className="h-3 w-3" />,
      pending: <Clock className="h-3 w-3" />
    };
    return (
      <Badge className={cn("flex items-center gap-1", variants[status as keyof typeof variants])}>
        {icons[status as keyof typeof icons]}
        {status.toUpperCase()}
      </Badge>
    );
  };

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-8 max-w-md text-center">
          <Shield className="h-12 w-12 text-destructive mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Access Denied</h2>
          <p className="text-muted-foreground mb-4">
            Only Super Admins can access this portal.
          </p>
          <Button onClick={() => window.location.href = "/"}>
            Return Home
          </Button>
        </Card>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Activity className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading admin portal...</p>
        </div>
      </div>
    );
  }

  const filteredTenants = tenants.filter(t =>
    t.organization_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredUsers = users.filter(u =>
    u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.full_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <SEO
        title="Super Admin Portal - Kincaid Health"
        description="Platform administration and tenant management"
      />

      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="border-b bg-card">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Shield className="h-6 w-6 text-primary" />
                <div>
                  <h1 className="text-2xl font-bold">Super Admin Portal</h1>
                  <p className="text-sm text-muted-foreground">
                    Platform administration and tenant management
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="outline" className="bg-red-50 text-red-700 border-red-300">
                  SUPER ADMIN
                </Badge>
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-6 py-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-2">
                <Building2 className="h-5 w-5 text-muted-foreground" />
              </div>
              <div className="text-3xl font-bold">{tenants.length}</div>
              <p className="text-sm text-muted-foreground">Active Tenants</p>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between mb-2">
                <Users className="h-5 w-5 text-muted-foreground" />
              </div>
              <div className="text-3xl font-bold">{users.length}</div>
              <p className="text-sm text-muted-foreground">Total Users</p>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between mb-2">
                <Database className="h-5 w-5 text-muted-foreground" />
              </div>
              <div className="text-3xl font-bold">
                {tenants.reduce((sum, t) => sum + t.data_volume_gb, 0).toFixed(1)} GB
              </div>
              <p className="text-sm text-muted-foreground">Data Volume</p>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between mb-2">
                <Activity className="h-5 w-5 text-muted-foreground" />
              </div>
              <div className="text-3xl font-bold">
                {tenants.filter(t => t.status === "active").length}
              </div>
              <p className="text-sm text-muted-foreground">Active Today</p>
            </Card>
          </div>

          {/* Main Content Tabs */}
          <Tabs defaultValue="tenants" className="space-y-6">
            <TabsList>
              <TabsTrigger value="tenants">
                <Building2 className="h-4 w-4 mr-2" />
                Tenants
              </TabsTrigger>
              <TabsTrigger value="users">
                <Users className="h-4 w-4 mr-2" />
                Users
              </TabsTrigger>
              <TabsTrigger value="monitoring">
                <Activity className="h-4 w-4 mr-2" />
                Monitoring
              </TabsTrigger>
            </TabsList>

            {/* Tenants Tab */}
            <TabsContent value="tenants" className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search organizations..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 w-[300px]"
                    />
                  </div>
                </div>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      New Tenant
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create New Tenant Organization</DialogTitle>
                      <DialogDescription>
                        Onboard a new company to the Kincaid Health platform
                      </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="org-name">Organization Name</Label>
                        <Input
                          id="org-name"
                          placeholder="Acme Corporation"
                          value={newTenant.organization_name}
                          onChange={(e) => setNewTenant({ ...newTenant, organization_name: e.target.value })}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="org-type">Organization Type</Label>
                        <Select
                          value={newTenant.organization_type}
                          onValueChange={(value) => setNewTenant({ ...newTenant, organization_type: value as any })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="enterprise">Enterprise</SelectItem>
                            <SelectItem value="broker">Broker</SelectItem>
                            <SelectItem value="consultant">Consultant</SelectItem>
                            <SelectItem value="health_plan">Health Plan</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="plan-tier">Plan Tier</Label>
                        <Select
                          value={newTenant.plan_tier}
                          onValueChange={(value) => setNewTenant({ ...newTenant, plan_tier: value as any })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="starter">Starter</SelectItem>
                            <SelectItem value="professional">Professional</SelectItem>
                            <SelectItem value="enterprise">Enterprise</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="admin-email">Admin Email</Label>
                        <Input
                          id="admin-email"
                          type="email"
                          placeholder="admin@acme.com"
                          value={newTenant.admin_email}
                          onChange={(e) => setNewTenant({ ...newTenant, admin_email: e.target.value })}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="admin-name">Admin Name</Label>
                        <Input
                          id="admin-name"
                          placeholder="John Smith"
                          value={newTenant.admin_name}
                          onChange={(e) => setNewTenant({ ...newTenant, admin_name: e.target.value })}
                        />
                      </div>
                    </div>

                    <DialogFooter>
                      <Button onClick={handleCreateTenant}>Create Tenant</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="grid gap-4">
                {filteredTenants.map((tenant) => (
                  <Card key={tenant.tenant_id} className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold">{tenant.organization_name}</h3>
                          {getStatusBadge(tenant.status)}
                          <Badge variant="outline">{tenant.plan_tier}</Badge>
                        </div>

                        <div className="grid grid-cols-4 gap-4 mt-4">
                          <div>
                            <p className="text-sm text-muted-foreground">Users</p>
                            <p className="text-lg font-semibold">{tenant.user_count}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Type</p>
                            <p className="text-lg font-semibold">{tenant.organization_type}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Data Volume</p>
                            <p className="text-lg font-semibold">{tenant.data_volume_gb.toFixed(1)} GB</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Created</p>
                            <p className="text-lg font-semibold">{tenant.created_at}</p>
                          </div>
                        </div>
                      </div>

                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Users Tab */}
            <TabsContent value="users" className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search users..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-[300px]"
                  />
                </div>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      New User
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create New User</DialogTitle>
                      <DialogDescription>
                        Add a user to an existing tenant organization
                      </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="user-tenant">Organization</Label>
                        <Select
                          value={newUser.tenant_id}
                          onValueChange={(value) => setNewUser({ ...newUser, tenant_id: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select organization" />
                          </SelectTrigger>
                          <SelectContent>
                            {tenants.map((t) => (
                              <SelectItem key={t.tenant_id} value={t.tenant_id}>
                                {t.organization_name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="user-email">Email</Label>
                        <Input
                          id="user-email"
                          type="email"
                          placeholder="user@company.com"
                          value={newUser.email}
                          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="user-name">Full Name</Label>
                        <Input
                          id="user-name"
                          placeholder="Jane Doe"
                          value={newUser.full_name}
                          onChange={(e) => setNewUser({ ...newUser, full_name: e.target.value })}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="user-role">Role</Label>
                        <Select
                          value={newUser.role}
                          onValueChange={(value) => setNewUser({ ...newUser, role: value })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {SYSTEM_ROLES.map((role) => (
                              <SelectItem key={role.value} value={role.value}>
                                <div>
                                  <div className="font-medium">{role.label}</div>
                                  <div className="text-xs text-muted-foreground">{role.description}</div>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <DialogFooter>
                      <Button onClick={handleCreateUser}>Create User</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="grid gap-4">
                {filteredUsers.map((user) => (
                  <Card key={user.user_id} className="p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold">{user.full_name}</h3>
                          {getStatusBadge(user.status)}
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">{user.email}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="outline">{user.role}</Badge>
                          <span className="text-sm text-muted-foreground">•</span>
                          <span className="text-sm text-muted-foreground">{user.tenant_name}</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">
                          Last login: {user.last_login}
                        </p>
                      </div>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Monitoring Tab */}
            <TabsContent value="monitoring">
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Platform Monitoring
                </h3>
                <p className="text-muted-foreground">
                  System health, performance metrics, and audit logs will appear here.
                </p>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}