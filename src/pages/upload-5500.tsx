import Head from "next/head";
import React, { useState, useCallback } from "react";
import { SEO } from "@/components/SEO";
import Footer from "@/components/Footer";
import { 
  Upload, 
  FileText, 
  CheckCircle2, 
  AlertTriangle,
  XCircle,
  Download,
  ExternalLink,
  Info,
  Shield,
  Sparkles,
  FileCheck,
  Database,
  Calculator,
  Users,
  DollarSign,
  TrendingUp,
  Building2,
  Calendar,
  ArrowRight,
  Zap
} from "lucide-react";
import { useRouter } from "next/router";
import Link from "next/link";

type Upload5500File = {
  id: string;
  fileName: string;
  year: string;
  size: number;
  uploadedAt: string;
  status: "pending" | "processing" | "verified" | "error";
  checksum?: string;
  errorMessage?: string;
};

type QuickStartData = {
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  annualSpend: string;
  employeeCount: string;
  industry: string;
  planType: string[];
  painPoints: string[];
  hasForm5500: "yes" | "no" | "not-sure";
};

const INDUSTRIES = [
  "Technology",
  "Healthcare",
  "Manufacturing",
  "Financial Services",
  "Retail",
  "Professional Services",
  "Education",
  "Construction",
  "Other"
];

const PLAN_TYPES = [
  "Medical",
  "Dental",
  "Vision",
  "Life & AD&D",
  "Disability",
  "401(k)",
  "Other"
];

const PAIN_POINTS = [
  "Rising healthcare costs",
  "Broker compensation unclear",
  "Poor cost transparency",
  "Lack of benchmarking data",
  "Difficult vendor management",
  "Complex plan administration",
  "Employee satisfaction issues",
  "Regulatory compliance concerns"
];

export default function Upload5500Page() {
  const router = useRouter();
  const [mode, setMode] = useState<"quick-start" | "upload">("quick-start");
  const [files, setFiles] = useState<Upload5500File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState<QuickStartData>({
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    annualSpend: "",
    employeeCount: "",
    industry: "",
    planType: [],
    painPoints: [],
    hasForm5500: "not-sure"
  });

  const handleInputChange = (field: keyof QuickStartData, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleArrayField = (field: "planType" | "painPoints", value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(v => v !== value)
        : [...prev[field], value]
    }));
  };

  const handleQuickStartSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    setSubmitting(false);
    setSubmitted(true);

    // In production, this would send to your backend
    console.log("Quick Start Submission:", formData);
  };

  const isQuickStartValid = 
    formData.companyName && 
    formData.contactName && 
    formData.email && 
    formData.annualSpend && 
    formData.employeeCount;

  const estimatedSavings = formData.annualSpend 
    ? (parseInt(formData.annualSpend.replace(/,/g, "")) * 0.15).toLocaleString()
    : "0";

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const validateFile = (file: File): { valid: boolean; error?: string } => {
    if (file.type !== "application/pdf") {
      return { valid: false, error: "Only PDF files are accepted" };
    }
    if (file.size > 50 * 1024 * 1024) {
      return { valid: false, error: "File size must be less than 50MB" };
    }
    return { valid: true };
  };

  const uploadFile = async (file: File) => {
    const validation = validateFile(file);
    if (!validation.valid) {
      return {
        id: Math.random().toString(36).substr(2, 9),
        fileName: file.name,
        year: "Unknown",
        size: file.size,
        uploadedAt: new Date().toISOString(),
        status: "error" as const,
        errorMessage: validation.error,
      };
    }

    const yearMatch = file.name.match(/20\d{2}/);
    const year = yearMatch ? yearMatch[0] : "Unknown";

    try {
      const presignRes = await fetch("/api/uploads/presign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fileName: file.name,
          contentType: file.type,
          category: "form-5500",
        }),
      });

      if (!presignRes.ok) {
        throw new Error("Failed to get upload URL");
      }

      const { uploadUrl, fileKey } = await presignRes.json();

      const uploadRes = await fetch(uploadUrl, {
        method: "PUT",
        headers: { "Content-Type": file.type },
        body: file,
      });

      if (!uploadRes.ok) {
        throw new Error("Failed to upload file");
      }

      const arrayBuffer = await file.arrayBuffer();
      const hashBuffer = await crypto.subtle.digest("SHA-256", arrayBuffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const checksum = hashArray.map(b => b.toString(16).padStart(2, "0")).join("");

      return {
        id: fileKey,
        fileName: file.name,
        year,
        size: file.size,
        uploadedAt: new Date().toISOString(),
        status: "verified" as const,
        checksum: `sha256:${checksum.substring(0, 16)}...`,
      };
    } catch (error) {
      return {
        id: Math.random().toString(36).substr(2, 9),
        fileName: file.name,
        year,
        size: file.size,
        uploadedAt: new Date().toISOString(),
        status: "error" as const,
        errorMessage: error instanceof Error ? error.message : "Upload failed",
      };
    }
  };

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    if (droppedFiles.length === 0) return;

    setUploading(true);
    const uploadedFiles = await Promise.all(droppedFiles.map(uploadFile));
    setFiles(prev => [...uploadedFiles, ...prev]);
    setUploading(false);
  }, []);

  const handleFileInput = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const selectedFiles = Array.from(e.target.files);
    setUploading(true);
    const uploadedFiles = await Promise.all(selectedFiles.map(uploadFile));
    setFiles(prev => [...uploadedFiles, ...prev]);
    setUploading(false);
  }, []);

  if (submitted) {
    return (
      <>
        <SEO
          title="Thank You | Broker Compensation Analysis"
          description="We'll be in touch soon with your personalized benefits analysis"
        />
        <div className="relative min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black text-white overflow-hidden flex items-center justify-center">
          {/* Background Effects */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-900/20 via-transparent to-transparent" />
            <div 
              className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-emerald-500/30 rounded-full blur-[120px]"
              style={{ animation: "float 8s ease-in-out infinite" }}
            />
          </div>

          <div className="relative z-10 max-w-2xl mx-auto px-4 text-center">
            <div className="mb-8 inline-flex h-24 w-24 items-center justify-center rounded-full bg-emerald-500/20 animate-pulse">
              <CheckCircle2 className="h-12 w-12 text-emerald-400 drop-shadow-[0_0_20px_rgba(16,185,129,0.8)]" />
            </div>

            <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-r from-white via-emerald-200 to-emerald-400 bg-clip-text text-transparent mb-4">
              Thank You!
            </h1>
            
            <p className="text-xl text-emerald-200/70 mb-8">
              We've received your information and will be in touch within 24 hours with a personalized benefits analysis.
            </p>

            <div className="rounded-3xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 via-black/40 to-black/40 backdrop-blur-xl p-8 mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">What Happens Next?</h2>
              <div className="space-y-4 text-left">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20 flex-shrink-0">
                    <Calculator className="h-5 w-5 text-emerald-400" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">Initial Analysis</div>
                    <div className="text-sm text-emerald-200/70">We'll analyze your current spend and identify optimization opportunities</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20 flex-shrink-0">
                    <TrendingUp className="h-5 w-5 text-emerald-400" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">Custom Report</div>
                    <div className="text-sm text-emerald-200/70">Receive a detailed report with potential savings (typically 10-20% of annual spend)</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20 flex-shrink-0">
                    <Users className="h-5 w-5 text-emerald-400" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">Strategy Session</div>
                    <div className="text-sm text-emerald-200/70">Schedule a call to discuss findings and implementation roadmap</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4 justify-center">
              <button
                onClick={() => router.push("/")}
                className="inline-flex items-center gap-2 rounded-2xl border border-emerald-500/30 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 backdrop-blur-xl px-6 py-3 text-sm font-semibold hover:from-emerald-500/30 hover:to-cyan-500/30 transition-all duration-500"
              >
                Return to Home
              </button>
              <button
                onClick={() => router.push("/evidence-receipts")}
                className="inline-flex items-center gap-2 rounded-2xl border border-emerald-500/30 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 backdrop-blur-xl px-6 py-3 text-sm font-semibold hover:from-emerald-500/30 hover:to-cyan-500/30 transition-all duration-500"
              >
                View Evidence Library
                <ExternalLink className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes float {
            0%, 100% { transform: translateY(0) translateX(0); }
            25% { transform: translateY(-20px) translateX(10px); }
            50% { transform: translateY(-10px) translateX(-10px); }
            75% { transform: translateY(-30px) translateX(5px); }
          }
        `}</style>
      </>
    );
  }

  return (
    <>
      <SEO
        title="Start Your Benefits Analysis | SiriusB iQ"
        description="Quick start with basic information or upload Form 5500s for comprehensive broker compensation analysis"
      />
      <div className="relative min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black text-white overflow-hidden">
        {/* Premium Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent" />
          <div 
            className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-500/30 rounded-full blur-[120px]"
            style={{ animation: "float 8s ease-in-out infinite" }}
          />
          <div 
            className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-cyan-500/25 rounded-full blur-[100px]"
            style={{ animation: "float 10s ease-in-out infinite", animationDelay: "2s" }}
          />
          <div 
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgb(59 130 246 / 0.1) 1px, transparent 1px),
                linear-gradient(to bottom, rgb(59 130 246 / 0.1) 1px, transparent 1px)
              `,
              backgroundSize: "60px 60px",
              maskImage: "radial-gradient(ellipse at center, black 30%, transparent 70%)",
            }}
          />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8 backdrop-blur-xl bg-gradient-to-br from-blue-500/10 via-black/40 to-black/40 rounded-3xl border border-blue-500/20 p-8 shadow-2xl shadow-blue-500/10">
            <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-r from-white via-blue-200 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(59,130,246,0.3)] mb-3">
              Start Your Benefits Analysis
            </h1>
            <p className="text-lg text-blue-200/70 max-w-3xl">
              Get insights into broker compensation, plan performance, and potential savings. Choose the path that works best for you.
            </p>
          </div>

          {/* Mode Switcher */}
          <div className="mb-8 flex gap-4">
            <button
              onClick={() => setMode("quick-start")}
              className={`flex-1 rounded-2xl border p-6 transition-all duration-300 ${
                mode === "quick-start"
                  ? "border-blue-500/50 bg-gradient-to-br from-blue-500/20 to-cyan-500/10 shadow-lg shadow-blue-500/20"
                  : "border-blue-500/20 bg-blue-500/5 hover:border-blue-500/30"
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/20 flex-shrink-0">
                  <Zap className="h-6 w-6 text-blue-400" />
                </div>
                <div className="text-left">
                  <div className="text-xl font-bold text-white mb-1">Quick Start</div>
                  <div className="text-sm text-blue-200/70">Share basic information and get started immediately</div>
                  <div className="mt-2 text-xs text-blue-300/50">⏱️ Takes 2-3 minutes</div>
                </div>
              </div>
            </button>

            <button
              onClick={() => setMode("upload")}
              className={`flex-1 rounded-2xl border p-6 transition-all duration-300 ${
                mode === "upload"
                  ? "border-blue-500/50 bg-gradient-to-br from-blue-500/20 to-cyan-500/10 shadow-lg shadow-blue-500/20"
                  : "border-blue-500/20 bg-blue-500/5 hover:border-blue-500/30"
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/20 flex-shrink-0">
                  <FileCheck className="h-6 w-6 text-blue-400" />
                </div>
                <div className="text-left">
                  <div className="text-xl font-bold text-white mb-1">Upload Form 5500</div>
                  <div className="text-sm text-blue-200/70">For comprehensive analysis with detailed broker compensation data</div>
                  <div className="mt-2 text-xs text-blue-300/50">📄 Optional but provides deeper insights</div>
                </div>
              </div>
            </button>
          </div>

          {/* Quick Start Form */}
          {mode === "quick-start" && (
            <form onSubmit={handleQuickStartSubmit} className="space-y-6">
              {/* Contact Information */}
              <div className="rounded-3xl border border-blue-500/20 bg-gradient-to-br from-blue-500/10 via-black/40 to-black/40 backdrop-blur-xl p-8 shadow-2xl">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <Users className="h-6 w-6 text-blue-400" />
                  Contact Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-blue-200 mb-2">Company Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.companyName}
                      onChange={(e) => handleInputChange("companyName", e.target.value)}
                      className="w-full rounded-xl border border-blue-500/30 bg-blue-500/10 px-4 py-3 text-white placeholder-blue-300/30 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/50"
                      placeholder="Acme Corporation"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-blue-200 mb-2">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.contactName}
                      onChange={(e) => handleInputChange("contactName", e.target.value)}
                      className="w-full rounded-xl border border-blue-500/30 bg-blue-500/10 px-4 py-3 text-white placeholder-blue-300/30 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/50"
                      placeholder="John Smith"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-blue-200 mb-2">Email *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="w-full rounded-xl border border-blue-500/30 bg-blue-500/10 px-4 py-3 text-white placeholder-blue-300/30 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/50"
                      placeholder="john@acme.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-blue-200 mb-2">Phone</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      className="w-full rounded-xl border border-blue-500/30 bg-blue-500/10 px-4 py-3 text-white placeholder-blue-300/30 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/50"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                </div>
              </div>

              {/* Key Metrics */}
              <div className="rounded-3xl border border-blue-500/20 bg-gradient-to-br from-blue-500/10 via-black/40 to-black/40 backdrop-blur-xl p-8 shadow-2xl">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <DollarSign className="h-6 w-6 text-blue-400" />
                  Key Metrics
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-blue-200 mb-2">Annual Benefits Spend *</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-300/50">$</span>
                      <input
                        type="text"
                        required
                        value={formData.annualSpend}
                        onChange={(e) => {
                          const value = e.target.value.replace(/[^0-9]/g, "");
                          handleInputChange("annualSpend", value ? parseInt(value).toLocaleString() : "");
                        }}
                        className="w-full rounded-xl border border-blue-500/30 bg-blue-500/10 pl-8 pr-4 py-3 text-white placeholder-blue-300/30 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/50"
                        placeholder="1,500,000"
                      />
                    </div>
                    <div className="mt-2 text-xs text-blue-300/50">Include medical, dental, vision, life, etc.</div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-blue-200 mb-2">Number of Employees *</label>
                    <input
                      type="text"
                      required
                      value={formData.employeeCount}
                      onChange={(e) => {
                        const value = e.target.value.replace(/[^0-9]/g, "");
                        handleInputChange("employeeCount", value ? parseInt(value).toLocaleString() : "");
                      }}
                      className="w-full rounded-xl border border-blue-500/30 bg-blue-500/10 px-4 py-3 text-white placeholder-blue-300/30 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/50"
                      placeholder="250"
                    />
                    <div className="mt-2 text-xs text-blue-300/50">Full-time equivalents covered by benefits</div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-blue-200 mb-2">Industry</label>
                    <select
                      value={formData.industry}
                      onChange={(e) => handleInputChange("industry", e.target.value)}
                      className="w-full rounded-xl border border-blue-500/30 bg-blue-500/10 px-4 py-3 text-white focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/50"
                    >
                      <option value="">Select industry</option>
                      {INDUSTRIES.map(ind => (
                        <option key={ind} value={ind} className="bg-slate-900">{ind}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-blue-200 mb-2">Do you have Form 5500?</label>
                    <select
                      value={formData.hasForm5500}
                      onChange={(e) => handleInputChange("hasForm5500", e.target.value)}
                      className="w-full rounded-xl border border-blue-500/30 bg-blue-500/10 px-4 py-3 text-white focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/50"
                    >
                      <option value="not-sure" className="bg-slate-900">Not sure</option>
                      <option value="yes" className="bg-slate-900">Yes, I have it</option>
                      <option value="no" className="bg-slate-900">No, I don't</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Plan Types */}
              <div className="rounded-3xl border border-blue-500/20 bg-gradient-to-br from-blue-500/10 via-black/40 to-black/40 backdrop-blur-xl p-8 shadow-2xl">
                <h3 className="text-2xl font-bold text-white mb-4">What types of plans do you offer?</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {PLAN_TYPES.map(type => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => toggleArrayField("planType", type)}
                      className={`rounded-xl border p-4 text-sm font-semibold transition-all duration-300 ${
                        formData.planType.includes(type)
                          ? "border-blue-500 bg-blue-500/20 text-blue-200"
                          : "border-blue-500/20 bg-blue-500/5 text-blue-300/70 hover:border-blue-500/30"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Pain Points */}
              <div className="rounded-3xl border border-blue-500/20 bg-gradient-to-br from-blue-500/10 via-black/40 to-black/40 backdrop-blur-xl p-8 shadow-2xl">
                <h3 className="text-2xl font-bold text-white mb-4">What challenges are you facing?</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {PAIN_POINTS.map(point => (
                    <button
                      key={point}
                      type="button"
                      onClick={() => toggleArrayField("painPoints", point)}
                      className={`rounded-xl border p-4 text-left text-sm transition-all duration-300 ${
                        formData.painPoints.includes(point)
                          ? "border-amber-500 bg-amber-500/20 text-amber-200"
                          : "border-blue-500/20 bg-blue-500/5 text-blue-300/70 hover:border-blue-500/30"
                      }`}
                    >
                      {point}
                    </button>
                  ))}
                </div>
              </div>

              {/* Estimated Savings */}
              {formData.annualSpend && (
                <div className="rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 via-black/40 to-black/40 backdrop-blur-xl p-8 shadow-2xl shadow-emerald-500/10">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/20">
                      <TrendingUp className="h-6 w-6 text-emerald-400" />
                    </div>
                    <div>
                      <div className="text-sm text-emerald-300/70">Estimated Annual Savings Potential</div>
                      <div className="text-3xl font-bold text-emerald-400">${estimatedSavings}</div>
                    </div>
                  </div>
                  <p className="text-sm text-emerald-200/70">
                    Based on your annual spend, typical clients save 10-20% through broker compensation optimization, plan design improvements, and vendor negotiations.
                  </p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!isQuickStartValid || submitting}
                className="w-full rounded-2xl border border-blue-500/30 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 backdrop-blur-xl px-8 py-4 text-lg font-semibold hover:from-blue-500/30 hover:to-cyan-500/30 transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-blue-500/50 flex items-center justify-center gap-3 group"
              >
                {submitting ? (
                  <>
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/20 border-t-white" />
                    Submitting...
                  </>
                ) : (
                  <>
                    Get My Personalized Analysis
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>

              <div className="text-center text-xs text-blue-300/50">
                By submitting, you agree to receive a personalized analysis and follow-up from our team
              </div>
            </form>
          )}

          {/* Upload Form 5500 Section */}
          {mode === "upload" && (
            <div className="space-y-6">
              {/* Instructions Toggle */}
              <button
                onClick={() => setShowInstructions(!showInstructions)}
                className="flex w-full items-center justify-between rounded-2xl border border-blue-500/20 bg-blue-500/5 p-4 hover:border-blue-500/30 transition-all duration-300"
              >
                <div className="flex items-center gap-3">
                  <Info className="h-5 w-5 text-blue-400" />
                  <span className="font-semibold text-white">How to obtain Form 5500</span>
                </div>
                <span className="text-blue-300/70">{showInstructions ? "Hide" : "Show"}</span>
              </button>

              {showInstructions && (
                <div className="rounded-3xl border border-blue-500/20 bg-gradient-to-br from-blue-500/10 via-black/40 to-black/40 backdrop-blur-xl p-8 shadow-2xl">
                  <div className="space-y-6">
                    <div className="rounded-2xl border border-blue-500/20 bg-blue-500/5 p-6">
                      <div className="flex items-start gap-4">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/20 text-sm font-bold text-blue-300 flex-shrink-0">1</div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-white mb-2">From Your Benefits Broker or TPA</h3>
                          <p className="text-sm text-blue-200/70 mb-3">Request PDF copies for the last 3 years from your benefits broker or Third Party Administrator.</p>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-2xl border border-blue-500/20 bg-blue-500/5 p-6">
                      <div className="flex items-start gap-4">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/20 text-sm font-bold text-blue-300 flex-shrink-0">2</div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-white mb-2">Download from DOL EFAST2</h3>
                          <p className="text-sm text-blue-200/70 mb-3">All filings are public record at the Department of Labor's EFAST2 system.</p>
                          <a
                            href="https://www.efast.dol.gov/5500Search/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-xl border border-blue-500/30 bg-blue-500/20 px-4 py-2 text-sm font-semibold hover:bg-blue-500/30 transition-all duration-300"
                          >
                            <ExternalLink className="h-4 w-4" />
                            Open EFAST2 Portal
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Upload Area */}
              <div
                className={`relative rounded-3xl border-2 border-dashed transition-all duration-300 ${
                  dragActive
                    ? "border-blue-500 bg-blue-500/20 scale-[1.02]"
                    : "border-blue-500/30 bg-gradient-to-br from-blue-500/10 via-black/40 to-black/40"
                } backdrop-blur-xl p-12 text-center shadow-2xl`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  id="file-upload"
                  multiple
                  accept="application/pdf"
                  onChange={handleFileInput}
                  className="hidden"
                />

                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-blue-500/20">
                  <Upload className="h-10 w-10 text-blue-400" />
                </div>

                <h3 className="mb-2 text-2xl font-bold text-white">
                  {uploading ? "Uploading files..." : "Drop Form 5500 PDFs here"}
                </h3>
                <p className="mb-6 text-blue-200/70">or click to browse your files</p>

                <label
                  htmlFor="file-upload"
                  className="inline-flex cursor-pointer items-center gap-2 rounded-2xl border border-blue-500/30 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 backdrop-blur-xl px-6 py-3 text-sm font-semibold hover:from-blue-500/30 hover:to-cyan-500/30 transition-all duration-500"
                >
                  <FileText className="h-5 w-5" />
                  Select Files
                </label>

                <div className="mt-6 text-xs text-blue-300/50">
                  PDF format only • Max 50MB per file
                </div>
              </div>

              {/* Uploaded Files List */}
              {files.length > 0 && (
                <div className="rounded-3xl border border-blue-500/20 bg-gradient-to-br from-blue-500/10 via-black/40 to-black/40 backdrop-blur-xl p-8 shadow-2xl">
                  <h3 className="mb-6 text-2xl font-semibold text-white">Uploaded Files</h3>
                  <div className="space-y-3">
                    {files.map((file) => (
                      <div
                        key={file.id}
                        className="flex items-center gap-4 rounded-2xl border border-blue-500/20 bg-blue-500/5 p-4 hover:border-blue-500/30 transition-all duration-300"
                      >
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/20 flex-shrink-0">
                          {file.status === "verified" ? (
                            <CheckCircle2 className="h-6 w-6 text-emerald-400" />
                          ) : file.status === "error" ? (
                            <XCircle className="h-6 w-6 text-red-400" />
                          ) : (
                            <FileText className="h-6 w-6 text-blue-400" />
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-white truncate">{file.fileName}</div>
                          <div className="flex items-center gap-3 text-sm text-blue-200/60">
                            <span>{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                            <span>•</span>
                            <span>{new Date(file.uploadedAt).toLocaleString()}</span>
                          </div>
                          {file.errorMessage && (
                            <div className="text-xs text-red-300 mt-1">⚠️ {file.errorMessage}</div>
                          )}
                        </div>

                        {file.status === "verified" && (
                          <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-300 border border-emerald-500/30">
                            Verified
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  <button
                    onClick={() => router.push("/evidence-receipts")}
                    className="mt-6 w-full flex items-center justify-center gap-2 rounded-2xl border border-emerald-500/30 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 backdrop-blur-xl px-6 py-3 text-sm font-semibold hover:from-emerald-500/30 hover:to-cyan-500/30 transition-all duration-500"
                  >
                    View in Evidence Library
                    <ExternalLink className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        <Footer />
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          25% { transform: translateY(-20px) translateX(10px); }
          50% { transform: translateY(-10px) translateX(-10px); }
          75% { transform: translateY(-30px) translateX(5px); }
        }
      `}</style>
    </>
  );
}