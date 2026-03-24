/**
 * Enterprise Team Management Component
 * Manage team members, roles, and permissions
 */

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Users, UserPlus, Search, MoreVertical, Mail, Shield, Trash2 } from "lucide-react";

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user" | "viewer" | "analyst";
  status: "active" | "inactive" | "pending";
  lastActive: string;
  reportsGenerated: number;
}

export function EnterpriseTeamManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [teamMembers] = useState<TeamMember[]>([
    {
      id: "1",
      name: "Sarah Johnson",
      email: "sarah.johnson@company.com",
      role: "admin",
      status: "active",
      lastActive: "2 hours ago",
      reportsGenerated: 47,
    },
    {
      id: "2",
      name: "Mike Chen",
      email: "mike.chen@company.com",
      role: "analyst",
      status: "active",
      lastActive: "1 day ago",
      reportsGenerated: 32,
    },
    {
      id: "3",
      name: "Alex Martinez",
      email: "alex.martinez@company.com",
      role: "user",
      status: "active",
      lastActive: "3 hours ago",
      reportsGenerated: 18,
    },
    {
      id: "4",
      name: "Jessica Taylor",
      email: "jessica.taylor@company.com",
      role: "viewer",
      status: "inactive",
      lastActive: "2 weeks ago",
      reportsGenerated: 5,
    },
  ]);

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case "admin":
        return "default";
      case "analyst":
        return "secondary";
      default:
        return "outline";
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "active":
        return "default";
      case "pending":
        return "secondary";
      default:
        return "outline";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Team Management</h2>
          <p className="text-gray-500 mt-1">Manage your team members and their permissions</p>
        </div>
        <Button>
          <UserPlus className="h-4 w-4 mr-2" />
          Invite Member
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Team Members</CardTitle>
              <CardDescription>
                {teamMembers.length} members in your organization
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search members..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 w-[250px]"
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Member</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Active</TableHead>
                <TableHead>Reports</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teamMembers.map((member) => (
                <TableRow key={member.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-medium">
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div>
                        <div className="font-medium">{member.name}</div>
                        <div className="text-xs text-gray-500">{member.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getRoleBadgeVariant(member.role)} className="capitalize">
                      {member.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadgeVariant(member.status)} className="capitalize">
                      {member.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-gray-500">{member.lastActive}</TableCell>
                  <TableCell>{member.reportsGenerated}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="gap-2">
                          <Mail className="h-4 w-4" />
                          Send Message
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2">
                          <Shield className="h-4 w-4" />
                          Change Role
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="gap-2 text-red-600">
                          <Trash2 className="h-4 w-4" />
                          Remove Member
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Active Members</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {teamMembers.filter((m) => m.status === "active").length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Total Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {teamMembers.reduce((sum, m) => sum + m.reportsGenerated, 0)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Avg Reports/Member</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(
                teamMembers.reduce((sum, m) => sum + m.reportsGenerated, 0) / teamMembers.length
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}