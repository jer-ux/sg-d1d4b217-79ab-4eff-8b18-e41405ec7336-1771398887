import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { UserPlus, Mail, Shield, Users } from "lucide-react";

export function EnterpriseTeamManagement() {
  const teamMembers = [
    { name: 'John Smith', email: 'john@democorp.com', role: 'Admin', dept: 'Legal', status: 'active' },
    { name: 'Sarah Johnson', email: 'sarah@democorp.com', role: 'Analyst', dept: 'Procurement', status: 'active' },
    { name: 'Michael Chen', email: 'michael@democorp.com', role: 'Viewer', dept: 'Finance', status: 'active' },
    { name: 'Emily Davis', email: 'emily@democorp.com', role: 'Analyst', dept: 'Risk Management', status: 'invited' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold">Team Members</h3>
          <p className="text-gray-500">Manage user access and permissions</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <UserPlus className="h-4 w-4 mr-2" />
          Invite Member
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Active Users</CardTitle>
          <CardDescription>24 active users across 4 departments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {teamMembers.map((member) => (
              <div key={member.email} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{member.name}</div>
                    <div className="text-sm text-gray-500 flex items-center gap-2">
                      <Mail className="h-3 w-3" />
                      {member.email}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Badge variant="outline">{member.dept}</Badge>
                  <Badge variant={member.role === 'Admin' ? 'default' : 'secondary'}>
                    <Shield className="h-3 w-3 mr-1" />
                    {member.role}
                  </Badge>
                  <Badge 
                    variant={member.status === 'active' ? 'default' : 'outline'}
                    className={member.status === 'active' ? 'bg-green-600' : ''}
                  >
                    {member.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Admin Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">3</div>
            <p className="text-xs text-gray-500 mt-1">Full system access</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Analysts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">15</div>
            <p className="text-xs text-gray-500 mt-1">Can analyze and report</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Viewers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">6</div>
            <p className="text-xs text-gray-500 mt-1">Read-only access</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}