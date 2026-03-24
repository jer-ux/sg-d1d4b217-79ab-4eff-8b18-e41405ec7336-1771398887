import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Shield,
  Lock,
  Eye,
  EyeOff,
  Key,
  Smartphone,
  Bell,
  Download,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Globe,
  User,
  FileText
} from "lucide-react";

interface SecuritySetting {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
  category: "privacy" | "access" | "notifications";
  icon: any;
}

export function ExecutiveSecurityPanel() {
  const [settings, setSettings] = useState<SecuritySetting[]>([
    {
      id: "executive-only",
      label: "Executive-Only Access",
      description: "Restrict access to C-suite and board members only",
      enabled: true,
      category: "access",
      icon: Shield
    },
    {
      id: "watermark",
      label: "Document Watermarking",
      description: "Add watermarks to all downloaded reports",
      enabled: true,
      category: "privacy",
      icon: Eye
    },
    {
      id: "screenshot-block",
      label: "Screenshot Prevention",
      description: "Block screenshots and screen recordings",
      enabled: false,
      category: "privacy",
      icon: EyeOff
    },
    {
      id: "2fa",
      label: "Two-Factor Authentication",
      description: "Require 2FA for all executive logins",
      enabled: true,
      category: "access",
      icon: Smartphone
    },
    {
      id: "session-timeout",
      label: "Auto Session Timeout",
      description: "Automatically log out after 15 minutes of inactivity",
      enabled: true,
      category: "access",
      icon: Clock
    },
    {
      id: "audit-log",
      label: "Detailed Audit Logging",
      description: "Log all views, downloads, and actions",
      enabled: true,
      category: "privacy",
      icon: FileText
    },
    {
      id: "ip-restriction",
      label: "IP Address Restriction",
      description: "Limit access to approved IP addresses only",
      enabled: false,
      category: "access",
      icon: Globe
    },
    {
      id: "sensitive-alerts",
      label: "Sensitive Data Alerts",
      description: "Notify when sensitive information is accessed",
      enabled: true,
      category: "notifications",
      icon: Bell
    }
  ]);

  const toggleSetting = (id: string) => {
    setSettings(prev => prev.map(s => 
      s.id === id ? { ...s, enabled: !s.enabled } : s
    ));
  };

  const securityScore = Math.round(
    (settings.filter(s => s.enabled).length / settings.length) * 100
  );

  const recentActivity = [
    {
      id: "1",
      user: "Sarah Chen (CFO)",
      action: "Viewed Executive Dashboard",
      timestamp: "2 minutes ago",
      location: "New York, NY",
      device: "iPhone 15 Pro"
    },
    {
      id: "2",
      user: "Michael Roberts (CEO)",
      action: "Downloaded Board Report",
      timestamp: "15 minutes ago",
      location: "San Francisco, CA",
      device: "MacBook Pro"
    },
    {
      id: "3",
      user: "John Martinez (Legal)",
      action: "Accessed Contract Analysis",
      timestamp: "1 hour ago",
      location: "Chicago, IL",
      device: "iPad Pro"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Security Score */}
      <Card className="bg-gradient-to-br from-slate-900/50 to-slate-800/50 border-slate-700 backdrop-blur-sm">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Security Score</h2>
                <p className="text-sm text-slate-400">Executive protection level</p>
              </div>
            </div>

            <div className="text-right">
              <div className="text-4xl font-bold text-white mb-1">{securityScore}%</div>
              <Badge variant="outline" className="border-green-500/30 text-green-500">
                <CheckCircle2 className="w-3 h-3 mr-1" />
                Excellent
              </Badge>
            </div>
          </div>

          <div className="w-full bg-slate-700/30 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-green-500 to-emerald-600 h-full rounded-full transition-all"
              style={{ width: `${securityScore}%` }}
            />
          </div>
        </div>
      </Card>

      {/* Security Settings */}
      <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
        <div className="p-6">
          <h3 className="text-lg font-bold text-white mb-6">Security Settings</h3>

          <div className="space-y-4">
            {settings.map((setting) => (
              <div
                key={setting.id}
                className="flex items-start justify-between p-4 rounded-lg bg-slate-800/30 hover:bg-slate-800/50 transition-all"
              >
                <div className="flex items-start gap-4 flex-1">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    setting.enabled
                      ? "bg-gradient-to-br from-green-500/20 to-emerald-500/20"
                      : "bg-slate-700/50"
                  }`}>
                    <setting.icon className={`w-5 h-5 ${
                      setting.enabled ? "text-green-500" : "text-slate-500"
                    }`} />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-white">{setting.label}</h4>
                      <Badge
                        variant="outline"
                        className={`text-xs ${
                          setting.category === "privacy"
                            ? "border-purple-500/30 text-purple-500"
                            : setting.category === "access"
                            ? "border-blue-500/30 text-blue-500"
                            : "border-orange-500/30 text-orange-500"
                        }`}
                      >
                        {setting.category}
                      </Badge>
                    </div>
                    <p className="text-sm text-slate-400">{setting.description}</p>
                  </div>
                </div>

                <Switch
                  checked={setting.enabled}
                  onCheckedChange={() => toggleSetting(setting.id)}
                />
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Recent Activity */}
      <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-white">Recent Activity</h3>
            <Button variant="outline" size="sm" className="border-slate-700 text-slate-300">
              <Download className="w-4 h-4 mr-2" />
              Export Log
            </Button>
          </div>

          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="p-4 rounded-lg border border-slate-800 bg-slate-800/30 hover:bg-slate-800/50 transition-all"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-white">{activity.user}</p>
                      <p className="text-xs text-slate-500">{activity.timestamp}</p>
                    </div>
                  </div>

                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                </div>

                <div className="ml-10">
                  <p className="text-sm text-slate-300 mb-2">{activity.action}</p>
                  <div className="flex items-center gap-4 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Globe className="w-3 h-3" />
                      {activity.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Smartphone className="w-3 h-3" />
                      {activity.device}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Security Alerts */}
      <Card className="bg-gradient-to-br from-orange-950/30 to-red-950/30 border-orange-700/30 backdrop-blur-sm">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="w-6 h-6 text-orange-500" />
            <h3 className="text-lg font-bold text-white">Security Recommendations</h3>
          </div>

          <div className="space-y-3">
            <div className="p-4 bg-slate-900/50 rounded-lg border border-orange-700/30">
              <p className="text-sm text-orange-200 mb-2">
                <strong>Recommendation:</strong> Enable IP Address Restriction
              </p>
              <p className="text-xs text-orange-300/70">
                Further limit access by restricting to corporate IP addresses only.
              </p>
            </div>

            <div className="p-4 bg-slate-900/50 rounded-lg border border-orange-700/30">
              <p className="text-sm text-orange-200 mb-2">
                <strong>Recommendation:</strong> Enable Screenshot Prevention
              </p>
              <p className="text-xs text-orange-300/70">
                Prevent unauthorized capture of sensitive executive information.
              </p>
            </div>
          </div>

          <Button className="w-full mt-4 bg-orange-600 hover:bg-orange-700">
            <Shield className="w-4 h-4 mr-2" />
            Apply All Recommendations
          </Button>
        </div>
      </Card>
    </div>
  );
}