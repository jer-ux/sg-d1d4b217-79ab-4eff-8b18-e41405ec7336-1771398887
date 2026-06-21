import React, { useState, useMemo } from "react";
import { SEO } from "@/components/SEO";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import Link from "next/link";
import { 
  Calculator, 
  Search, 
  FileText, 
  TrendingUp, 
  ShieldCheck, 
  ArrowRight, 
  Copy, 
  Check, 
  AlertTriangle, 
  Users, 
  FileSpreadsheet,
  Download,
  Lock,
  Mail,
  Building,
  Phone,
  UserCheck
} from "lucide-react";

// Mock database of major national and regional brokerage firms with typical override profiles
const BROKER_FIRMS = [
  { name: "Mercer (Marsh McLennan)", marketShare: "National Alpha", baseOverridePercent: 22, score: "High Penalty", flag: "PBM Override Agreements Active" },
  { name: "Aon plc", marketShare: "National Alpha", baseOverridePercent: 24, score: "High Penalty", flag: "PE-Firm & Coalition Spreads" },
  { name: "Willis Towers Watson (WTW)", marketShare: "National Alpha", baseOverridePercent: 20, score: "High Penalty", flag: "Indirect Coalition Commissions" },
  { name: "Gallagher (Arthur J. Gallagher)", marketShare: "Mid-Market Aggregator", baseOverridePercent: 18, score: "Moderate-High Penalty", flag: "GGB Coalition Incentives" },
  { name: "USI Insurance Services", marketShare: "Private Equity Backed", baseOverridePercent: 28, score: "Extreme Penalty", flag: "PE-Partner Soft Dollar Overrides" },
  { name: "Hub International", marketShare: "Private Equity Backed", baseOverridePercent: 26, score: "Extreme Penalty", flag: "Carrier Bonus Threshold Overrides" },
  { name: "Lockton Companies", marketShare: "Independent Large", baseOverridePercent: 12, score: "Moderate Penalty", flag: "Direct Bonus Overrides Only" },
  { name: "Alliant Insurance Services", marketShare: "Private Equity Backed", baseOverridePercent: 25, score: "Extreme Penalty", flag: "Direct PE-Debt Leveraged Quotas" },
  { name: "NFP Corp.", marketShare: "PE / Aggregator", baseOverridePercent: 22, score: "High Penalty", flag: "Multi-Tier Carrier Incentives" },
];

export default function BrokerCompensationPage() {
  const [lives, setLives] = useState<number>(350);
  const [brokerType, setBrokerType] = useState<string>("pe-backed"); // pe-backed, national, regional
  const [annualPremium, setAnnualPremium] = useState<number>(3500000);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedFirm, setSelectedFirm] = useState<typeof BROKER_FIRMS[0] | null>(null);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [employerName, setEmployerName] = useState<string>("Acme Enterprises");
  const [currentYearIndex, setCurrentYearIndex] = useState<number>(4); // Default to 2026

  // Lead capture state for gated export
  const [isExportModalOpen, setIsExportModalOpen] = useState<boolean>(false);
  const [isSubmittingLead, setIsSubmittingLead] = useState<boolean>(false);
  const [isExported, setIsExported] = useState<boolean>(false);
  const [leadForm, setLeadForm] = useState({
    name: "",
    email: "",
    company: "",
    phone: ""
  });

  // Validation states for real-time feedback
  const livesValidation = useMemo(() => {
    if (lives >= 500 && lives <= 2000) {
      return { status: "optimal", message: "Optimal range for forensic accuracy", color: "text-emerald-400", icon: Check };
    } else if (lives > 2000 && lives <= 5000) {
      return { status: "good", message: "Large group - high override exposure", color: "text-amber-400", icon: AlertTriangle };
    } else {
      return { status: "edge", message: "Small group - limited override data", color: "text-slate-400", icon: AlertTriangle };
    }
  }, [lives]);

  const premiumValidation = useMemo(() => {
    const perEmployeeCost = annualPremium / lives;
    if (perEmployeeCost >= 8000 && perEmployeeCost <= 15000) {
      return { status: "optimal", message: `$${Math.round(perEmployeeCost).toLocaleString()}/employee - Industry standard`, color: "text-emerald-400", icon: Check };
    } else if (perEmployeeCost > 15000) {
      return { status: "high", message: `$${Math.round(perEmployeeCost).toLocaleString()}/employee - Above market (investigate)`, color: "text-amber-400", icon: AlertTriangle };
    } else {
      return { status: "low", message: `$${Math.round(perEmployeeCost).toLocaleString()}/employee - Below typical range`, color: "text-slate-400", icon: AlertTriangle };
    }
  }, [annualPremium, lives]);

  const employerNameValidation = useMemo(() => {
    if (employerName.trim().length >= 3) {
      return { status: "valid", message: "Ready for legal document generation", color: "text-emerald-400", icon: Check };
    }
    return { status: "incomplete", message: "Enter company name for CAA letter", color: "text-slate-400", icon: AlertTriangle };
  }, [employerName]);

  // Overall validation summary
  const overallValidation = useMemo(() => {
    const checks = [
      employerNameValidation.status === "valid",
      livesValidation.status === "optimal" || livesValidation.status === "good",
      premiumValidation.status === "optimal" || premiumValidation.status === "high"
    ];
    const passedCount = checks.filter(Boolean).length;
    const percentage = Math.round((passedCount / checks.length) * 100);
    
    let readinessStatus = "Incomplete";
    let readinessColor = "text-slate-400";
    let readinessIcon = AlertTriangle;
    
    if (percentage === 100) {
      readinessStatus = "Ready for Audit";
      readinessColor = "text-emerald-400";
      readinessIcon = Check;
    } else if (percentage >= 66) {
      readinessStatus = "Nearly Complete";
      readinessColor = "text-amber-400";
      readinessIcon = AlertTriangle;
    }
    
    return {
      percentage,
      passedCount,
      totalChecks: checks.length,
      status: readinessStatus,
      color: readinessColor,
      icon: readinessIcon
    };
  }, [employerNameValidation, livesValidation, premiumValidation]);

  // Calculation parameters based on inputs over 5 years
  const auditData = useMemo(() => {
    const multiplierMap: Record<string, number> = {
      "pe-backed": 1.45,
      "national": 1.25,
      "regional": 1.05
    };
    const mult = multiplierMap[brokerType] || 1.1;

    const years = [2022, 2023, 2024, 2025, 2026];
    
    return years.map((year, index) => {
      const inflationFactor = 1 + (index * 0.08); // Healthcare costs inflation 8% YoY
      const activeLives = Math.round(lives * (1 + (index * 0.02))); // 2% organic growth YoY
      const activePremium = Math.round(annualPremium * inflationFactor);

      // Direct Compensation: standard disclosed commission or PEPM fees
      const directComms = Math.round((activeLives * 420) * (1 + (index * 0.03))); 
      
      // Indirect Compensation: carrier override contracts, volume bonuses, PE incentives
      const indirectComms = Math.round((activePremium * 0.048 * mult) * (1 + (index * 0.02)));

      // Hidden PBM Spreads / Soft-dollar perks steered from PBM coalition partners
      const pbmSpreads = Math.round((activeLives * 240 * mult) * (1 + (index * 0.04)));

      const totalComp = directComms + indirectComms + pbmSpreads;

      return {
        year,
        lives: activeLives,
        premium: activePremium,
        direct: directComms,
        indirect: indirectComms,
        pbmSpreads: pbmSpreads,
        total: totalComp
      };
    });
  }, [lives, brokerType, annualPremium]);

  // Aggregate totals
  const fiveYearTotal = useMemo(() => {
    return auditData.reduce((sum, item) => sum + item.total, 0);
  }, [auditData]);

  const fiveYearDirect = useMemo(() => {
    return auditData.reduce((sum, item) => sum + item.direct, 0);
  }, [auditData]);

  const fiveYearIndirect = useMemo(() => {
    return auditData.reduce((sum, item) => sum + item.indirect + item.pbmSpreads, 0);
  }, [auditData]);

  // Filter firms
  const filteredFirms = useMemo(() => {
    if (!searchQuery) return [];
    return BROKER_FIRMS.filter(firm => 
      firm.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  // CSV Exporter
  const handleExportCSV = () => {
    // Generate CSV content from state
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "5-Year Fiduciary Broker Compensation Forensic Ledger\n";
    csvContent += `Employer,${leadForm.company || employerName}\n`;
    csvContent += `Fiduciary Auditor,${leadForm.name}\n`;
    csvContent += `Contact Email,${leadForm.email}\n`;
    csvContent += `Contact Phone,${leadForm.phone}\n`;
    csvContent += `Broker Alignment Type,${brokerType.toUpperCase()}\n\n`;
    csvContent += "Year,Lives,Premium / Plan Spend,Direct Disclosed,Indirect Overrides,Hidden PBM Spreads,Total Compensation\n";

    auditData.forEach(item => {
      csvContent += `${item.year},${item.lives},${item.premium},${item.direct},${item.indirect},${item.pbmSpreads},${item.total}\n`;
    });

    csvContent += `\nTOTALS,,,$${fiveYearDirect},,$${fiveYearIndirect},$${fiveYearTotal}\n`;

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${(leadForm.company || "fiduciary").toLowerCase().replace(/\s+/g, "_")}_broker_audit_ledger.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadForm.name || !leadForm.email || !leadForm.company) return;

    setIsSubmittingLead(true);
    // Simulate API save
    setTimeout(() => {
      setIsSubmittingLead(false);
      setIsExported(true);
      setIsExportModalOpen(false);
      // Immediately download the generated file
      handleExportCSV();
    }, 1500);
  };

  // CAA Request Letter Template
  const letterTemplate = `Date: June 15, 2026

To: [Broker/Consultant Representative Name]
Brokerage House: ${selectedFirm ? selectedFirm.name : "[Brokerage Firm Name]"}

RE: Formal Tri-Annual Request for Comprehensive Broker/Consultant Compensation Disclosure
Pursuant to Section 202 of the Consolidated Appropriations Act (CAA) of 2021

Dear Broker Team,

As the Plan Sponsor and Fiduciary of the ${employerName} Health & Welfare Plan, we are writing to formally request a complete, itemized, and certified disclosure of all direct and indirect compensation received, or expected to be received, in connection with services provided to our Plan over the last five (5) plan years (Plan Years 2022, 2023, 2024, 2025, and 2026).

Under Section 202 of the CAA (amending ERISA Section 408(b)(2)(B)), covered service providers (brokers and consultants expecting more than $1,000 in direct or indirect compensation) are required by federal law to disclose all direct and indirect compensation to plan fiduciaries. Failure to provide this disclosure constitutes a prohibited transaction under ERISA, threatening our plan's qualified status and exposing our fiduciaries to personal liability.

Please provide a detailed report within fifteen (15) business days containing:
1. All direct fees or commissions paid by the Plan or directly from employer premiums.
2. All indirect compensation received from insurance carriers, PBMs, stop-loss underwriters, or technology partners (including, but not limited to, override commissions, persistency bonuses, contingency bonuses, and volume tier payouts).
3. Any soft-dollar compensation, consulting agreements, or affiliate payouts received from any vendor steered to or currently serving our health plan.

Please direct this certified response to the undersigned plan fiduciary.

Sincerely,

Plan Sponsor Fiduciary
For the ${employerName} Health & Welfare Plan`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(letterTemplate);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <>
      <SEO 
        title="5-Year Broker Compensation Forensic Auditor | SiriusB iQ" 
        description="Fiduciaries can calculate direct, indirect, and hidden broker override commissions over the last 5 years to verify CAA disclosure compliance." 
      />
      <Nav />

      <main className="min-h-screen bg-[#07070F] text-white pt-24 pb-20 relative overflow-hidden font-sans">
        {/* Background Neon Accents */}
        <div className="absolute top-1/4 left-0 w-[400px] h-[400px] bg-indigo-900/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-[#8C1515]/5 rounded-full blur-[150px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#8C1515]/10 border border-[#8C1515]/30 text-[#FF5D5D] text-xs font-semibold mb-4 tracking-wider uppercase">
              <ShieldCheck className="w-3.5 h-3.5" /> Fiduciary Forensic Audit System
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
              5-Year Broker Compensation Auditor
            </h1>
            <p className="text-lg text-slate-400">
              Calculate, trace, and audit the hidden revenue, carrier overrides, and volume bonuses your broker received behind your plan's back from 2022 to 2026.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
            
            {/* Left Column: Interactive Inputs */}
            <div className="lg:col-span-4 space-y-8">
              <Card className="bg-[#0D0D19]/80 border-slate-800/80 backdrop-blur-xl text-white relative overflow-hidden ring-2 ring-[#8C1515]/30 shadow-lg shadow-[#8C1515]/20">
                {/* START HERE Badge - Pulsing Animation */}
                <div className="absolute -top-2 -right-2 z-10">
                  <div className="relative">
                    <div className="absolute inset-0 bg-[#8C1515] rounded-full blur-md opacity-60 animate-pulse" />
                    <div className="relative px-3 py-1 rounded-full bg-[#8C1515] border border-[#FF5D5D] text-white text-[10px] font-extrabold tracking-wider uppercase shadow-lg flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                      START HERE
                    </div>
                  </div>
                </div>

                <CardHeader className="border-b border-slate-800/60 pb-5">
                  <CardTitle className="text-lg font-bold flex items-center gap-2">
                    <Calculator className="w-5 h-5 text-indigo-400" /> Plan Parameters
                  </CardTitle>
                  <CardDescription className="text-slate-400 text-xs">
                    <span className="font-semibold text-[#FF8585]">Step 1:</span> Input your general plan specifications to estimate standard broker margins and hidden override commissions.
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6 space-y-6">
                  {/* Employer Name */}
                  <div className="space-y-2">
                    <Label htmlFor="emp-name" className="text-xs text-slate-300">Employer Name (for legal draft)</Label>
                    <div className="relative">
                      <Input 
                        id="emp-name" 
                        value={employerName}
                        onChange={(e) => setEmployerName(e.target.value)}
                        className="bg-[#05050A]/80 border-slate-800 text-white rounded-lg focus:ring-indigo-500 pr-8" 
                      />
                      <div className="absolute right-2.5 top-2.5">
                        {React.createElement(employerNameValidation.icon, {
                          className: `w-4 h-4 ${employerNameValidation.color}`
                        })}
                      </div>
                    </div>
                    <div className={`flex items-center gap-1.5 text-[10px] ${employerNameValidation.color}`}>
                      <div className="w-1 h-1 rounded-full bg-current" />
                      {employerNameValidation.message}
                    </div>
                  </div>

                  {/* Eligible Lives */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-300">Covered Employees (Lives)</span>
                      <div className="flex items-center gap-2">
                        <span className="text-indigo-400 font-mono font-bold">{lives.toLocaleString()} lives</span>
                        {React.createElement(livesValidation.icon, {
                          className: `w-3.5 h-3.5 ${livesValidation.color}`
                        })}
                      </div>
                    </div>
                    <Slider 
                      min={50} 
                      max={5000} 
                      step={25} 
                      value={[lives]} 
                      onValueChange={(val) => setLives(val[0])}
                      className="py-1 cursor-pointer"
                    />
                    <div className={`flex items-center gap-1.5 text-[10px] ${livesValidation.color}`}>
                      <div className="w-1 h-1 rounded-full bg-current" />
                      {livesValidation.message}
                    </div>
                  </div>

                  {/* Annual Premium / Spend */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-300">Annual Premium/Spend</span>
                      <div className="flex items-center gap-2">
                        <span className="text-emerald-400 font-mono font-bold">${annualPremium.toLocaleString()}</span>
                        {React.createElement(premiumValidation.icon, {
                          className: `w-3.5 h-3.5 ${premiumValidation.color}`
                        })}
                      </div>
                    </div>
                    <Slider 
                      min={500000} 
                      max={50000000} 
                      step={250000} 
                      value={[annualPremium]} 
                      onValueChange={(val) => setAnnualPremium(val[0])}
                      className="py-1 cursor-pointer"
                    />
                    <div className={`flex items-center gap-1.5 text-[10px] ${premiumValidation.color}`}>
                      <div className="w-1 h-1 rounded-full bg-current" />
                      {premiumValidation.message}
                    </div>
                  </div>

                  {/* Broker Business Profile */}
                  <div className="space-y-2">
                    <Label className="text-xs text-slate-300">Broker Business Alignment</Label>
                    <div className="grid grid-cols-1 gap-2.5">
                      <button
                        onClick={() => setBrokerType("pe-backed")}
                        className={`flex flex-col items-start p-3 rounded-lg border text-left transition-all ${
                          brokerType === "pe-backed" 
                            ? "bg-[#8C1515]/10 border-[#8C1515] text-white" 
                            : "bg-[#05050A]/40 border-slate-800 text-slate-400 hover:border-slate-700"
                        }`}
                      >
                        <span className="text-xs font-bold text-white flex items-center gap-1.5">
                          Private Equity Owned <span className="px-1.5 py-0.5 rounded text-[9px] bg-[#8C1515]/20 text-[#FF5D5D] font-mono">Quotas Active</span>
                        </span>
                        <span className="text-[10px] mt-1 text-slate-400 leading-normal">
                          Leveraged debt demands aggressive Carrier override & hidden coalition bonus steering.
                        </span>
                      </button>

                      <button
                        onClick={() => setBrokerType("national")}
                        className={`flex flex-col items-start p-3 rounded-lg border text-left transition-all ${
                          brokerType === "national" 
                            ? "bg-indigo-950/20 border-indigo-500 text-white" 
                            : "bg-[#05050A]/40 border-slate-800 text-slate-400 hover:border-slate-700"
                        }`}
                      >
                        <span className="text-xs font-bold text-white">National Elite Consolidator</span>
                        <span className="text-[10px] mt-1 text-slate-400 leading-normal">
                          Extensive institutional PBM and carrier override commission frameworks.
                        </span>
                      </button>

                      <button
                        onClick={() => setBrokerType("regional")}
                        className={`flex flex-col items-start p-3 rounded-lg border text-left transition-all ${
                          brokerType === "regional" 
                            ? "bg-emerald-950/20 border-emerald-500 text-white" 
                            : "bg-[#05050A]/40 border-slate-800 text-slate-400 hover:border-slate-700"
                        }`}
                      >
                        <span className="text-xs font-bold text-white">Regional / Independent</span>
                        <span className="text-[10px] mt-1 text-slate-400 leading-normal">
                          Standard disclosed consulting agreements. Minor base overrides.
                        </span>
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* SUMMARY FEEDBACK CARD */}
              <Card className="bg-gradient-to-br from-indigo-950/30 via-[#0D0D19]/90 to-[#0D0D19]/90 border-indigo-900/40 text-white shadow-xl">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base font-bold flex items-center gap-2">
                      {React.createElement(overallValidation.icon, {
                        className: `w-4 h-4 ${overallValidation.color}`
                      })}
                      Audit Readiness
                    </CardTitle>
                    <div className={`text-2xl font-extrabold font-mono ${overallValidation.color}`}>
                      {overallValidation.percentage}%
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="mt-3 h-2 bg-slate-900/50 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-500 ${
                        overallValidation.percentage === 100 
                          ? "bg-gradient-to-r from-emerald-500 to-emerald-400"
                          : overallValidation.percentage >= 66
                          ? "bg-gradient-to-r from-amber-500 to-amber-400"
                          : "bg-gradient-to-r from-slate-600 to-slate-500"
                      }`}
                      style={{ width: `${overallValidation.percentage}%` }}
                    />
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0 space-y-3">
                  {/* Status Checklist */}
                  <div className="space-y-2 pb-3 border-b border-slate-800/60">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        {React.createElement(employerNameValidation.icon, {
                          className: `w-3.5 h-3.5 ${employerNameValidation.color}`
                        })}
                        <span className="text-slate-300">Employer Name</span>
                      </div>
                      <span className={`font-mono text-[10px] ${employerNameValidation.color}`}>
                        {employerNameValidation.status === "valid" ? "Ready" : "Required"}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        {React.createElement(livesValidation.icon, {
                          className: `w-3.5 h-3.5 ${livesValidation.color}`
                        })}
                        <span className="text-slate-300">Covered Lives</span>
                      </div>
                      <span className={`font-mono text-[10px] ${livesValidation.color}`}>
                        {livesValidation.status === "optimal" ? "Optimal" : 
                         livesValidation.status === "good" ? "Good" : "Edge"}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        {React.createElement(premiumValidation.icon, {
                          className: `w-3.5 h-3.5 ${premiumValidation.color}`
                        })}
                        <span className="text-slate-300">Annual Premium</span>
                      </div>
                      <span className={`font-mono text-[10px] ${premiumValidation.color}`}>
                        {premiumValidation.status === "optimal" ? "Standard" :
                         premiumValidation.status === "high" ? "High" : "Low"}
                      </span>
                    </div>
                  </div>
                  
                  {/* Overall Status Message */}
                  <div className={`p-3 rounded-lg ${
                    overallValidation.percentage === 100
                      ? "bg-emerald-950/30 border border-emerald-900/40"
                      : overallValidation.percentage >= 66
                      ? "bg-amber-950/30 border border-amber-900/40"
                      : "bg-slate-900/30 border border-slate-800/40"
                  }`}>
                    <div className="flex items-start gap-2">
                      {React.createElement(overallValidation.icon, {
                        className: `w-4 h-4 ${overallValidation.color} shrink-0 mt-0.5`
                      })}
                      <div className="text-[11px] leading-relaxed">
                        {overallValidation.percentage === 100 ? (
                          <span className="text-emerald-300">
                            <span className="font-bold">All parameters validated.</span> Ready to generate 5-year audit ledger and CAA disclosure request letter.
                          </span>
                        ) : overallValidation.percentage >= 66 ? (
                          <span className="text-amber-300">
                            <span className="font-bold">Nearly complete.</span> Adjust remaining parameters for optimal forensic accuracy.
                          </span>
                        ) : (
                          <span className="text-slate-400">
                            <span className="font-bold">Setup required.</span> Complete all plan parameters above to enable audit calculations.
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Legal Flag Card */}
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-amber-400">ERISA Fiduciary Liability Warning</h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed mt-1">
                    Fiduciaries are personally liable for plan assets. Allowing unmonitored indirect broker commissions is a Class-I breach under ERISA Section 408(b)(2).
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Calculations & Auditing */}
            <div className="lg:col-span-8 space-y-8">
              
              {/* Key Aggregate Totals */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-5 rounded-xl bg-[#0D0D19]/80 border border-slate-800/80 flex flex-col justify-between">
                  <div className="text-xs text-slate-400 flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-indigo-400" /> Total Direct Disclosed
                  </div>
                  <div className="mt-2 text-2xl font-extrabold text-white font-mono">
                    ${fiveYearDirect.toLocaleString()}
                  </div>
                  <div className="text-[10px] text-slate-500 mt-1 leading-normal">
                    Standard PEPM/commission stated in service agreements.
                  </div>
                </div>

                <div className="p-5 rounded-xl bg-[#0D0D19]/80 border border-slate-800/80 flex flex-col justify-between">
                  <div className="text-xs text-slate-400 flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5 text-red-400" /> Estimated Hidden Overrides
                  </div>
                  <div className="mt-2 text-2xl font-extrabold text-red-400 font-mono">
                    ${fiveYearIndirect.toLocaleString()}
                  </div>
                  <div className="text-[10px] text-slate-500 mt-1 leading-normal">
                    Indirect overrides, persistency pools, and coalition spreads.
                  </div>
                </div>

                <div className="p-5 rounded-xl bg-gradient-to-br from-[#8C1515]/20 to-[#4a0a0a]/10 border border-[#8C1515]/40 flex flex-col justify-between">
                  <div className="text-xs text-slate-300 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#FF5D5D]" /> 5-Year Aggregate Comp
                  </div>
                  <div className="mt-2 text-2xl font-extrabold text-[#FF8585] font-mono">
                    ${fiveYearTotal.toLocaleString()}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1 leading-normal">
                    Cumulative direct & indirect compensation steered.
                  </div>
                </div>
              </div>

              {/* 5-Year Year-by-Year Auditor Table */}
              <Card className="bg-[#0D0D19]/80 border-slate-800/80 text-white">
                <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800/60">
                  <div>
                    <CardTitle className="text-lg font-bold flex items-center gap-2">
                      <FileSpreadsheet className="w-5 h-5 text-emerald-400" /> 5-Year Ledger Projection (2022 - 2026)
                    </CardTitle>
                    <CardDescription className="text-slate-400 text-xs">
                      Yearly trace of direct disclosed consulting fees vs indirect carrier bonus programs.
                    </CardDescription>
                  </div>

                  {/* High-Fidelity Gated Export Action */}
                  <div className="shrink-0">
                    {isExported ? (
                      <Button
                        onClick={handleExportCSV}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-lg"
                      >
                        <Download className="w-3.5 h-3.5" /> Re-Download Audit (.CSV)
                      </Button>
                    ) : (
                      <Button
                        onClick={() => setIsExportModalOpen(true)}
                        className="bg-[#8C1515] hover:bg-[#a61c1c] text-white flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-lg border border-[#8C1515]/40"
                      >
                        <Lock className="w-3.5 h-3.5" /> Export Audit Ledger
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="border-b border-slate-800 text-slate-400 uppercase font-bold tracking-wider">
                          <th className="py-3 px-4">Year</th>
                          <th className="py-3 px-4">Lives</th>
                          <th className="py-3 px-4 text-right">Direct Disclosed</th>
                          <th className="py-3 px-4 text-right">Indirect Overrides</th>
                          <th className="py-3 px-4 text-right">Hidden Spreads</th>
                          <th className="py-3 px-4 text-right text-indigo-300">Total Yearly</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/40 font-mono">
                        {auditData.map((item, idx) => (
                          <tr 
                            key={item.year} 
                            onClick={() => setCurrentYearIndex(idx)}
                            className={`cursor-pointer transition-all ${
                              currentYearIndex === idx 
                                ? "bg-indigo-950/20 border-l-2 border-indigo-500" 
                                : "hover:bg-slate-900/30"
                            }`}
                          >
                            <td className="py-3.5 px-4 font-bold text-white">{item.year}</td>
                            <td className="py-3.5 px-4 text-slate-300">{item.lives.toLocaleString()}</td>
                            <td className="py-3.5 px-4 text-right text-emerald-400">${item.direct.toLocaleString()}</td>
                            <td className="py-3.5 px-4 text-right text-amber-400">${item.indirect.toLocaleString()}</td>
                            <td className="py-3.5 px-4 text-right text-red-400">${item.pbmSpreads.toLocaleString()}</td>
                            <td className="py-3.5 px-4 text-right text-indigo-300 font-extrabold">${item.total.toLocaleString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Highlight Detail Panel */}
                  <div className="mt-5 p-4 rounded-lg bg-[#05050A]/60 border border-slate-800/80 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <h4 className="text-xs font-bold text-white flex items-center gap-1">
                        Year Audit Spotlight: <span className="text-indigo-400 font-mono text-sm">{auditData[currentYearIndex].year}</span>
                      </h4>
                      <p className="text-[11px] text-slate-400 mt-1 max-w-xl">
                        At {auditData[currentYearIndex].lives.toLocaleString()} lives, standard disclosed broker fees are expected at <span className="text-emerald-400 font-bold font-mono">${auditData[currentYearIndex].direct.toLocaleString()}</span>, while hidden back-end revenue from carriers and prescription contracts represents another <span className="text-[#FF5D5D] font-bold font-mono">${(auditData[currentYearIndex].indirect + auditData[currentYearIndex].pbmSpreads).toLocaleString()}</span> in indirect steering.
                      </p>
                    </div>
                    <Button 
                      onClick={() => {
                        const element = document.getElementById("caa-letter-section");
                        element?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg px-4 text-xs shrink-0 flex items-center gap-1"
                    >
                      Request Disclosure <ArrowRight className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

            </div>

          </div>

          {/* Broker Directory Search & National Override Directory */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
            
            {/* National Directory Search */}
            <div className="lg:col-span-5 space-y-6">
              <Card className="bg-[#0D0D19]/80 border-slate-800/80 text-white">
                <CardHeader>
                  <CardTitle className="text-lg font-bold flex items-center gap-2">
                    <Search className="w-5 h-5 text-indigo-400" /> Broker Override database
                  </CardTitle>
                  <CardDescription className="text-slate-400 text-xs">
                    Search major consulting conglomerates to see typical indirect override contracts.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                    <Input
                      placeholder="Type a broker name (e.g., Mercer, USI, Aon)..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9 bg-[#05050A]/80 border-slate-800 text-white placeholder-slate-500 rounded-lg"
                    />
                  </div>

                  {filteredFirms.length > 0 ? (
                    <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
                      {filteredFirms.map((firm) => (
                        <button
                          key={firm.name}
                          onClick={() => {
                            setSelectedFirm(firm);
                            if (firm.baseOverridePercent > 20) {
                              setBrokerType("pe-backed");
                            } else if (firm.baseOverridePercent > 15) {
                              setBrokerType("national");
                            } else {
                              setBrokerType("regional");
                            }
                          }}
                          className={`w-full flex items-center justify-between p-3 rounded-lg border text-left transition-all ${
                            selectedFirm?.name === firm.name 
                              ? "bg-indigo-950/20 border-indigo-500" 
                              : "bg-[#05050A]/40 border-slate-800/60 hover:border-slate-700"
                          }`}
                        >
                          <div>
                            <div className="text-xs font-bold text-white">{firm.name}</div>
                            <div className="text-[10px] text-slate-400 mt-1 flex items-center gap-1.5">
                              <span className="px-1.5 py-0.5 rounded bg-indigo-950/50 text-indigo-300 font-mono text-[8px]">{firm.marketShare}</span>
                              <span className="text-[#FF5D5D]">{firm.flag}</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-xs font-bold font-mono text-amber-400">+{firm.baseOverridePercent}%</div>
                            <div className="text-[9px] text-slate-500 mt-0.5">Est. Override</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  ) : searchQuery ? (
                    <div className="p-4 text-center text-xs text-slate-500">
                      No firm found matching your query. Storing override values for standard estimation.
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="text-[11px] text-slate-400 font-semibold mb-2">Preloaded Corporate Multipliers:</div>
                      {BROKER_FIRMS.slice(0, 4).map((firm) => (
                        <button
                          key={firm.name}
                          onClick={() => {
                            setSelectedFirm(firm);
                            if (firm.baseOverridePercent > 20) {
                              setBrokerType("pe-backed");
                            } else if (firm.baseOverridePercent > 15) {
                              setBrokerType("national");
                            } else {
                              setBrokerType("regional");
                            }
                          }}
                          className={`w-full flex items-center justify-between p-3 rounded-lg bg-[#05050A]/20 border border-slate-850 hover:border-slate-700 text-left transition-all ${
                            selectedFirm?.name === firm.name ? "border-indigo-500 bg-indigo-950/10" : ""
                          }`}
                        >
                          <div>
                            <div className="text-xs font-bold text-white">{firm.name}</div>
                            <div className="text-[9px] text-slate-500 mt-0.5">{firm.flag}</div>
                          </div>
                          <div className="text-xs font-mono font-bold text-indigo-400">+{firm.baseOverridePercent}%</div>
                        </button>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* CAA Compliance Document Generator */}
            <div id="caa-letter-section" className="lg:col-span-7 space-y-6">
              <Card className="bg-[#0D0D19]/80 border-slate-800/80 text-white">
                <CardHeader className="flex flex-row items-center justify-between border-b border-slate-800/60 pb-5">
                  <div>
                    <CardTitle className="text-lg font-bold flex items-center gap-2">
                      <FileText className="w-5 h-5 text-indigo-400" /> CAA Disclosure Request Draft
                    </CardTitle>
                    <CardDescription className="text-slate-400 text-xs">
                      Copy or download a compliant legal request under ERISA Section 408(b)(2).
                    </CardDescription>
                  </div>
                  <Button
                    onClick={copyToClipboard}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-1 text-xs px-3 py-1.5"
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" /> Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" /> Copy Draft
                      </>
                    )}
                  </Button>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="p-4 rounded-lg bg-[#05050A]/80 border border-slate-850 max-h-[310px] overflow-y-auto text-[11px] leading-relaxed text-slate-300 font-mono whitespace-pre-wrap">
                    {letterTemplate}
                  </div>
                  <div className="mt-4 p-3 rounded-lg bg-indigo-950/20 border border-indigo-900/30 flex items-center gap-3">
                    <ShieldCheck className="w-4 h-4 text-indigo-400 shrink-0" />
                    <p className="text-[10px] text-slate-400 leading-normal">
                      Section 202 mandates that service providers must disclose direct/indirect broker commissions prior to contracts being executed or renewed. Send this certified document to initiate formal disclosures.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

          </div>

          {/* Action Call for Deep Forensic Analysis */}
          <div className="p-8 sm:p-10 rounded-2xl bg-gradient-to-br from-[#8C1515]/25 via-indigo-950/20 to-black border border-[#8C1515]/40 text-center max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Suspect Secret Spreads or Carrier Kickbacks?
            </h2>
            <p className="text-sm text-slate-300 max-w-2xl mx-auto mb-6 leading-relaxed">
              Most broker override commissions are never fully disclosed on standard Schedule A forms. Work directly with SiriusB iQ Data Sciences to perform an algorithmic Fiduciary Audit on every invoice and claim.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild className="bg-[#8C1515] hover:bg-[#a61c1c] text-white rounded-lg px-6 py-2.5 font-bold">
                <Link href="/contact">Book Forensic Audit</Link>
              </Button>
              <Button asChild variant="outline" className="border-slate-800 text-white hover:bg-slate-900 rounded-lg px-6">
                <Link href="/all-uploads">Access Forensic Library</Link>
              </Button>
            </div>
          </div>

        </div>
      </main>

      {/* LEAD CAPTURE EXPORT DIALOG / MODAL OVERLAY */}
      {isExportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md transition-opacity">
          <div className="relative w-full max-w-md p-6 sm:p-8 rounded-2xl bg-[#0D0D19] border border-slate-800 text-white shadow-2xl">
            {/* Header */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#8C1515]/10 border border-[#8C1515]/30 text-[#FF5D5D] mb-4">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-white">Unlock Fiduciary Export</h3>
              <p className="text-xs text-slate-400 mt-2">
                Enter your professional credentials to generate and download the certified 5-Year Broker Compensation Audit.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleLeadSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="fiduciary-name" className="text-xs text-slate-300 flex items-center gap-1">
                  <UserCheck className="w-3.5 h-3.5 text-indigo-400" /> Fiduciary Name
                </Label>
                <Input
                  id="fiduciary-name"
                  type="text"
                  required
                  placeholder="e.g., Sarah Jenkins, CFO"
                  value={leadForm.name}
                  onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                  className="bg-[#05050A]/80 border-slate-800 text-white text-xs rounded-lg"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="fiduciary-email" className="text-xs text-slate-300 flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-indigo-400" /> Corporate Email
                </Label>
                <Input
                  id="fiduciary-email"
                  type="email"
                  required
                  placeholder="e.g., sjenkins@company.com"
                  value={leadForm.email}
                  onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
                  className="bg-[#05050A]/80 border-slate-800 text-white text-xs rounded-lg"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="fiduciary-company" className="text-xs text-slate-300 flex items-center gap-1">
                  <Building className="w-3.5 h-3.5 text-indigo-400" /> Company / Employer Name
                </Label>
                <Input
                  id="fiduciary-company"
                  type="text"
                  required
                  placeholder="e.g., Acme Corp"
                  value={leadForm.company}
                  onChange={(e) => setLeadForm({ ...leadForm, company: e.target.value })}
                  className="bg-[#05050A]/80 border-slate-800 text-white text-xs rounded-lg"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="fiduciary-phone" className="text-xs text-slate-300 flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-indigo-400" /> Direct Phone Number
                </Label>
                <Input
                  id="fiduciary-phone"
                  type="tel"
                  placeholder="e.g., (555) 019-2834"
                  value={leadForm.phone}
                  onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })}
                  className="bg-[#05050A]/80 border-slate-800 text-white text-xs rounded-lg"
                />
              </div>

              <div className="pt-2 flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsExportModalOpen(false)}
                  className="w-1/3 border-slate-800 text-slate-400 hover:bg-slate-900 rounded-lg text-xs"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmittingLead}
                  className="w-2/3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-800/50 text-white font-bold rounded-lg text-xs flex items-center justify-center gap-1.5"
                >
                  {isSubmittingLead ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Auditing Ledger...
                    </>
                  ) : (
                    <>
                      <Download className="w-3.5 h-3.5" /> Generate & Download
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}