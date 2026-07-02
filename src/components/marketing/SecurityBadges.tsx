"use client";

import { Shield, Lock, Server, CheckCircle2, ExternalLink, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface SecurityBadgesProps {
  variant?: "full" | "compact";
  showTrustCenter?: boolean;
}

export function SecurityBadges({ variant = "full", showTrustCenter = true }: SecurityBadgesProps) {
  const certifications = [
    {
      name: "SOC 2 Type II",
      status: "in_progress",
      icon: Shield,
      description: "Independent security audit",
      eta: "Q3 2026"
    },
    {
      name: "HIPAA Compliant",
      status: "certified",
      icon: Lock,
      description: "Protected health information security",
      eta: null
    },
    {
      name: "256-bit AES Encryption",
      status: "active",
      icon: Lock,
      description: "Bank-level data encryption",
      eta: null
    },
    {
      name: "99.9% Uptime SLA",
      status: "active",
      icon: Server,
      description: "Enterprise-grade reliability",
      eta: null
    }
  ];

  const complianceFrameworks = [
    "ERISA Fiduciary Standards",
    "SSAE 18 Audit Controls",
    "GDPR Data Privacy",
    "ISO 27001 (Planned)"
  ];

  if (variant === "compact") {
    return (
      <div className="flex items-center gap-4 flex-wrap">
        {certifications.map((cert, idx) => {
          const Icon = cert.icon;
          return (
            <div key={idx} className="flex items-center gap-2 text-sm">
              <Icon className="w-4 h-4 text-blue-400" />
              <span className="text-slate-300">{cert.name}</span>
              {cert.status === "in_progress" && (
                <Badge variant="outline" className="text-xs">In Progress</Badge>
              )}
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="w-full py-12 bg-slate-900/50 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-white mb-2">Enterprise Security & Compliance</h3>
          <p className="text-slate-400">
            Fiduciary-grade infrastructure built for regulated industries
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {certifications.map((cert, idx) => {
            const Icon = cert.icon;
            return (
              <Card key={idx} className="bg-slate-900 border-slate-800 p-6 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-950/50 border border-blue-800/50 mb-4">
                  <Icon className="w-6 h-6 text-blue-400" />
                </div>
                <h4 className="font-semibold text-white mb-1">{cert.name}</h4>
                <p className="text-sm text-slate-400 mb-2">{cert.description}</p>
                {cert.status === "certified" && (
                  <Badge className="bg-emerald-950/50 text-emerald-400 border-emerald-800/50">
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                    Certified
                  </Badge>
                )}
                {cert.status === "in_progress" && (
                  <Badge variant="outline" className="border-blue-800/50 text-blue-400">
                    <Clock className="w-3 h-3 mr-1" />
                    {cert.eta}
                  </Badge>
                )}
                {cert.status === "active" && (
                  <Badge className="bg-blue-950/50 text-blue-400 border-blue-800/50">
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                    Active
                  </Badge>
                )}
              </Card>
            );
          })}
        </div>

        <Card className="bg-slate-950/50 border-slate-800 p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h4 className="font-semibold text-white mb-2">Additional Compliance Frameworks</h4>
              <div className="flex flex-wrap gap-2">
                {complianceFrameworks.map((framework, idx) => (
                  <Badge key={idx} variant="outline" className="border-slate-700 text-slate-300">
                    {framework}
                  </Badge>
                ))}
              </div>
            </div>
            {showTrustCenter && (
              <a
                href="/security-governance"
                className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium whitespace-nowrap"
              >
                Visit Trust Center
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </Card>

        <div className="text-center mt-6 text-sm text-slate-500">
          <p>
            All customer data encrypted at rest and in transit. Infrastructure hosted on AWS with SOC 2 certified data centers.
          </p>
        </div>
      </div>
    </div>
  );
}