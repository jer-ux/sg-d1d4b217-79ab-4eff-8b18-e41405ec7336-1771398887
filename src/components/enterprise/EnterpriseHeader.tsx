import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Building2, ChevronDown, Shield, Settings, LogOut, Users, Key, Bell, Activity } from "lucide-react";
import { authService, type AuthUser } from "@/services/authService";
import { organizationService } from "@/services/organizationService";
import CommandPalette from "@/components/CommandPalette";

export function EnterpriseHeader() {
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [organizations, setOrganizations] = useState<any[]>([]);
  const [currentOrg, setCurrentOrg] = useState<any>(null);
  const [notifications, setNotifications] = useState(0);

  useEffect(() => {
    loadUserData();
    const { data: { subscription } } = authService.onAuthStateChange(() => {
      loadUserData();
    });
    return () => subscription.unsubscribe();
  }, []);

  const loadUserData = async () => {
    const currentUser = await authService.getCurrentUser();
    setUser(currentUser);
    
    if (currentUser) {
      const orgs = await authService.getUserOrganizations();
      setOrganizations(orgs);
      const active = orgs.find((o: any) => o.organization_id === currentUser.organization_id);
      setCurrentOrg(active);
    }
  };

  const handleSwitchOrg = async (orgId: string) => {
    await authService.switchOrganization(orgId);
    router.reload();
  };

  const handleSignOut = async () => {
    await authService.signOut();
    router.push("/");
  };

  const getRoleBadgeColor = (role?: string) => {
    switch (role) {
      case "owner": return "bg-purple-500";
      case "admin": return "bg-blue-500";
      case "member": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo & Brand */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">SiriusB iQ</span>
            <Badge variant="secondary" className="text-xs">Enterprise</Badge>
          </Link>

          {/* Organization Switcher */}
          {currentOrg && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Building2 className="h-4 w-4" />
                  <span className="hidden sm:inline">{currentOrg.organizations?.name || "Organization"}</span>
                  <ChevronDown className="h-4 w-4 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-64">
                <DropdownMenuLabel>Organizations</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {organizations.map((org: any) => (
                  <DropdownMenuItem
                    key={org.organization_id}
                    onClick={() => handleSwitchOrg(org.organization_id)}
                    className="flex items-center justify-between"
                  >
                    <span>{org.organizations?.name}</span>
                    {org.organization_id === currentOrg?.organization_id && (
                      <Badge variant="secondary" className="text-xs">Active</Badge>
                    )}
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push("/enterprise/organizations/new")}>
                  <Building2 className="h-4 w-4 mr-2" />
                  Create Organization
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        {/* Navigation & Actions */}
        <div className="flex items-center gap-4">
          <CommandPalette />
          
          {/* Quick Actions */}
          <div className="hidden md:flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => router.push("/enterprise/audit-logs")}>
              <Activity className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              {notifications > 0 && (
                <span className="absolute top-1 right-1 h-4 w-4 rounded-full bg-red-500 text-[10px] font-bold text-white flex items-center justify-center">
                  {notifications}
                </span>
              )}
            </Button>
          </div>

          {/* User Menu */}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.user_metadata?.avatar_url} />
                    <AvatarFallback>{user.email?.charAt(0).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div className="hidden md:flex flex-col items-start">
                    <span className="text-sm font-medium">{user.email}</span>
                    <Badge className={`text-xs ${getRoleBadgeColor(user.role)}`}>
                      {user.role || "viewer"}
                    </Badge>
                  </div>
                  <ChevronDown className="h-4 w-4 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push("/enterprise/profile")}>
                  <Users className="h-4 w-4 mr-2" />
                  Profile Settings
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/enterprise/api-keys")}>
                  <Key className="h-4 w-4 mr-2" />
                  API Keys
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/enterprise/settings")}>
                  <Settings className="h-4 w-4 mr-2" />
                  Organization Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="ghost" onClick={() => router.push("/auth/signin")}>
                Sign In
              </Button>
              <Button onClick={() => router.push("/auth/signup")}>
                Get Started
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}