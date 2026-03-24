/**
 * Enterprise Header Component
 * Navigation and user controls for enterprise features
 */

import { useState } from "react";
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
import { Badge } from "@/components/ui/badge";
import {
  Building2,
  BarChart3,
  Users,
  Shield,
  Settings,
  FileText,
  DollarSign,
  Bell,
  User,
  LogOut,
  ChevronDown,
  Sparkles,
} from "lucide-react";

export function EnterpriseHeader() {
  const router = useRouter();
  const [notifications] = useState(3);

  const navigationItems = [
    {
      name: "Dashboard",
      href: "/enterprise/dashboard",
      icon: BarChart3,
    },
    {
      name: "Reporting",
      href: "/enterprise/reporting",
      icon: FileText,
      badge: "New",
    },
    {
      name: "Team",
      href: "/enterprise/team-management",
      icon: Users,
    },
    {
      name: "Security",
      href: "/enterprise/security-center",
      icon: Shield,
    },
    {
      name: "Billing",
      href: "/enterprise/usage-billing",
      icon: DollarSign,
    },
  ];

  const isActivePath = (path: string) => {
    return router.pathname === path;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white dark:bg-gray-950 dark:border-gray-800">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo and Brand */}
        <div className="flex items-center gap-8">
          <Link href="/enterprise/dashboard" className="flex items-center gap-2">
            <Building2 className="h-6 w-6 text-blue-600" />
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              SiriusB iQ
            </span>
            <Badge variant="secondary" className="ml-2">
              Enterprise
            </Badge>
          </Link>

          {/* Main Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = isActivePath(item.href);

              return (
                <Link key={item.name} href={item.href}>
                  <Button
                    variant={isActive ? "secondary" : "ghost"}
                    size="sm"
                    className="gap-2"
                  >
                    <Icon className="h-4 w-4" />
                    {item.name}
                    {item.badge && (
                      <Badge variant="default" className="ml-1 text-xs">
                        {item.badge}
                      </Badge>
                    )}
                  </Button>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-4">
          {/* AI Copilot Button */}
          <Button variant="outline" size="sm" className="gap-2">
            <Sparkles className="h-4 w-4 text-purple-600" />
            <span className="hidden sm:inline">AI Copilot</span>
          </Button>

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-5 w-5" />
                {notifications > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center"
                  >
                    {notifications}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="space-y-2 p-2">
                <div className="flex gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer">
                  <div className="h-2 w-2 mt-2 rounded-full bg-blue-600" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Report Generated</p>
                    <p className="text-xs text-gray-500">
                      Contract analysis report is ready for download
                    </p>
                    <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
                  </div>
                </div>
                <div className="flex gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer">
                  <div className="h-2 w-2 mt-2 rounded-full bg-green-600" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">New Team Member</p>
                    <p className="text-xs text-gray-500">
                      John Doe joined your organization
                    </p>
                    <p className="text-xs text-gray-400 mt-1">5 hours ago</p>
                  </div>
                </div>
                <div className="flex gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer">
                  <div className="h-2 w-2 mt-2 rounded-full bg-purple-600" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Usage Alert</p>
                    <p className="text-xs text-gray-500">
                      You've used 80% of your monthly quota
                    </p>
                    <p className="text-xs text-gray-400 mt-1">1 day ago</p>
                  </div>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="justify-center text-sm text-blue-600 cursor-pointer">
                View all notifications
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-2">
                <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white font-medium">
                  A
                </div>
                <ChevronDown className="h-4 w-4 hidden sm:block" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div>
                  <p className="font-medium">Admin User</p>
                  <p className="text-xs text-gray-500">admin@company.com</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="gap-2 cursor-pointer">
                <User className="h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem
                className="gap-2 cursor-pointer"
                onClick={() => router.push("/enterprise/settings")}
              >
                <Settings className="h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="gap-2 text-red-600 cursor-pointer">
                <LogOut className="h-4 w-4" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}