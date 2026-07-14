import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown, Search, Users, Building2, AlertTriangle, Calculator, FileText, TrendingUp, Briefcase, BarChart3, Shield, LineChart, DollarSign, Heart, FolderOpen, Activity, Sparkles, Code, Database, Pill } from "lucide-react";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import { KincaidIQLogo } from "@/components/KincaidIQLogo";

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const [companyDropdownOpen, setCompanyDropdownOpen] = useState(false);
  const [focusAreasDropdownOpen, setFocusAreasDropdownOpen] = useState(false);
  const [kincaidIqDropdownOpen, setKincaidIqDropdownOpen] = useState(false);
  const [kincaidHealthDropdownOpen, setKincaidHealthDropdownOpen] = useState(false);
  const [auditsDropdownOpen, setAuditsDropdownOpen] = useState(false);
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);

  const healthCloseTimer = useRef<NodeJS.Timeout | null>(null);
  const productsCloseTimer = useRef<NodeJS.Timeout | null>(null);

  const handleHealthMouseEnter = () => {
    if (healthCloseTimer.current) {
      clearTimeout(healthCloseTimer.current);
      healthCloseTimer.current = null;
    }
    setKincaidHealthDropdownOpen(true);
    setCompanyDropdownOpen(false);
    setFocusAreasDropdownOpen(false);
    setAuditsDropdownOpen(false);
    setProductsDropdownOpen(false);
    setToolsDropdownOpen(false);
  };

  const handleHealthMouseLeave = () => {
    healthCloseTimer.current = setTimeout(() => {
      setKincaidHealthDropdownOpen(false);
    }, 300);
  };

  const handleProductsMouseEnter = () => {
    if (productsCloseTimer.current) {
      clearTimeout(productsCloseTimer.current);
      productsCloseTimer.current = null;
    }
    setProductsDropdownOpen(true);
    setCompanyDropdownOpen(false);
    setFocusAreasDropdownOpen(false);
    setAuditsDropdownOpen(false);
    setKincaidHealthDropdownOpen(false);
    setToolsDropdownOpen(false);
  };

  const handleProductsMouseLeave = () => {
    productsCloseTimer.current = setTimeout(() => {
      setProductsDropdownOpen(false);
    }, 300);
  };

  return (
    <nav className="fixed top-0 z-[200] w-full border-b border-slate-200/20 bg-white/95 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 px-6">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <KincaidIQLogo className="h-12" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-1">
            {/* Company Menu */}
            <div className="relative">
              <button
                onClick={() => {
                  setCompanyDropdownOpen(!companyDropdownOpen);
                  setKincaidIqDropdownOpen(false);
                  setFocusAreasDropdownOpen(false);
                  setAuditsDropdownOpen(false);
                  setProductsDropdownOpen(false);
                  setToolsDropdownOpen(false);
                }}
                className="flex items-center gap-2 px-4 py-2 text-black hover:text-black/80 transition-colors rounded-lg hover:bg-slate-50 font-medium">
                Company
                <ChevronDown className={`w-3 h-3 transition-transform ${companyDropdownOpen ? "rotate-180" : ""}`} />
              </button>
              {companyDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-gray-900/95 backdrop-blur-xl rounded-xl border border-gray-700/50 shadow-xl overflow-hidden z-[210]">
                  <div className="p-2">
                    <Link
                      href="/board-of-directors"
                      onClick={() => setCompanyDropdownOpen(false)}
                      className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-amber-500/10 rounded-lg transition-colors duration-150">
                      <div className="font-medium">Board of Directors</div>
                      <div className="text-xs text-gray-400">Leadership team</div>
                    </Link>
                    <Link
                      href="/investor"
                      onClick={() => setCompanyDropdownOpen(false)}
                      className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-amber-500/10 rounded-lg transition-colors duration-150">
                      <div className="font-medium">Investor Groups</div>
                      <div className="text-xs text-gray-400">Investment overview</div>
                    </Link>
                    <Link
                      href="/ma-vc-pe"
                      onClick={() => setCompanyDropdownOpen(false)}
                      className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-amber-500/10 rounded-lg transition-colors duration-150">
                      <div className="font-medium">M&A / VC / PE</div>
                      <div className="text-xs text-gray-400">Deal intelligence</div>
                    </Link>
                    <Link
                      href="/family-offices"
                      onClick={() => setCompanyDropdownOpen(false)}
                      className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-amber-500/10 rounded-lg transition-colors duration-150">
                      <div className="font-medium">Family Offices</div>
                      <div className="text-xs text-gray-400">Private wealth management</div>
                    </Link>
                    <Link
                      href="/capital-markets"
                      onClick={() => setCompanyDropdownOpen(false)}
                      className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-amber-500/10 rounded-lg transition-colors duration-150">
                      <div className="font-medium">Capital Markets</div>
                      <div className="text-xs text-gray-400">Market solutions</div>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Intelligence Series - Dropdown */}
            <div 
              className="relative group"
              onMouseEnter={handleHealthMouseEnter}
              onMouseLeave={handleHealthMouseLeave}
            >
              <button
                className="flex items-center gap-2 px-4 py-2 text-black hover:text-black/80 transition-colors rounded-lg hover:bg-slate-50 font-medium"
              >
                Intelligence Series
                <ChevronDown className={`w-3 h-3 transition-transform ${kincaidHealthDropdownOpen ? "rotate-180" : ""}`} />
              </button>
              {kincaidHealthDropdownOpen && (
                <div
                  onMouseEnter={handleHealthMouseEnter}
                  onMouseLeave={handleHealthMouseLeave}
                  className="absolute top-full left-0 mt-1 w-72 bg-gray-900/95 backdrop-blur-xl rounded-xl border border-gray-700/50 shadow-xl overflow-hidden z-[210]">
                  <div className="p-2">
                    <Link
                      href="/kincaid-iq-intelligence-series"
                      onClick={() => setKincaidHealthDropdownOpen(false)}
                      className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-rose-500/10 rounded-lg transition-colors duration-150">
                      <div className="font-medium">Intelligence Products</div>
                      <div className="text-xs text-gray-400">Complete intelligence series</div>
                    </Link>
                    <Link
                      href="/solutions/actuarial-benefits"
                      onClick={() => setKincaidHealthDropdownOpen(false)}
                      className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-rose-500/10 rounded-lg transition-colors duration-150">
                      <div className="font-medium">Actuarial Benefits Intelligence</div>
                      <div className="text-xs text-gray-400">Stop-loss & captive modeling</div>
                    </Link>
                    <Link
                      href="/solutions/rx-defense"
                      onClick={() => setKincaidHealthDropdownOpen(false)}
                      className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-rose-500/10 rounded-lg transition-colors duration-150">
                      <div className="font-medium">PBM Contract Clarity 360*</div>
                      <div className="text-xs text-gray-400">PBM contract forensics</div>
                    </Link>
                    <Link
                      href="/solutions/nadac-benchmarking"
                      onClick={() => setKincaidHealthDropdownOpen(false)}
                      className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-rose-500/10 rounded-lg transition-colors duration-150">
                      <div className="font-medium">NADAC Benchmarking Intelligence</div>
                      <div className="text-xs text-gray-400">Pharmacy spread pricing detection</div>
                    </Link>
                    <Link
                      href="/solutions/claims-recovery-iq"
                      onClick={() => setKincaidHealthDropdownOpen(false)}
                      className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-rose-500/10 rounded-lg transition-colors duration-150">
                      <div className="font-medium">Claims Recovery Intelligence</div>
                      <div className="text-xs text-gray-400">Forensic recovery engine</div>
                    </Link>
                    <Link
                      href="/solutions/sales-iq"
                      onClick={() => setKincaidHealthDropdownOpen(false)}
                      className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-rose-500/10 rounded-lg transition-colors duration-150">
                      <div className="font-medium">Sales Intelligence</div>
                      <div className="text-xs text-gray-400">Pipeline & forecast modeling</div>
                    </Link>
                    <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent my-1" />
                    <Link
                      href="/expert-partners"
                      onClick={() => setKincaidHealthDropdownOpen(false)}
                      className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-rose-500/10 rounded-lg transition-colors duration-150">
                      <div className="font-medium">Expert Partners</div>
                      <div className="text-xs text-gray-400">Specialized intelligence providers</div>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Areas of Focus - Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setFocusAreasDropdownOpen(!focusAreasDropdownOpen);
                  setKincaidIqDropdownOpen(false);
                  setCompanyDropdownOpen(false);
                  setAuditsDropdownOpen(false);
                  setProductsDropdownOpen(false);
                  setToolsDropdownOpen(false);
                }}
                className="flex items-center gap-2 px-4 py-2 text-black hover:text-black/80 transition-colors rounded-lg hover:bg-slate-50 font-medium">
                Areas of Focus
                <ChevronDown className={`w-3 h-3 transition-transform ${focusAreasDropdownOpen ? "rotate-180" : ""}`} />
              </button>
              {focusAreasDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-72 bg-gray-900/95 backdrop-blur-xl rounded-xl border border-gray-700/50 shadow-xl overflow-hidden z-[210]">
                  <div className="p-2">
                    <Link
                      href="/personas/board-members"
                      onClick={() => setFocusAreasDropdownOpen(false)}
                      className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-purple-500/10 rounded-lg transition-colors duration-150">
                      <div className="font-medium flex items-center gap-2">
                        <Shield className="w-4 h-4 text-purple-400" />
                        For Board Members
                      </div>
                      <div className="text-xs text-gray-400">Strategic governance & value creation oversight</div>
                    </Link>

                    <Link
                      href="/personas/pe-operators"
                      onClick={() => setFocusAreasDropdownOpen(false)}
                      className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-emerald-500/10 rounded-lg transition-colors duration-150">
                      <div className="font-medium flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-emerald-400" />
                        For PE Operators
                      </div>
                      <div className="text-xs text-gray-400">EBITDA creation & portfolio optimization playbook</div>
                    </Link>

                    <Link
                      href="/capital-markets"
                      onClick={() => setFocusAreasDropdownOpen(false)}
                      className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-indigo-500/10 rounded-lg transition-colors duration-150">
                      <div className="font-medium flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-indigo-400" />
                        For Capital Markets
                      </div>
                      <div className="text-xs text-gray-400">PE/VC/M&A deal diligence & portfolio optimization</div>
                    </Link>

                    <Link
                      href="/personas/actuarial"
                      onClick={() => setFocusAreasDropdownOpen(false)}
                      className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-cyan-500/10 rounded-lg transition-colors duration-150">
                      <div className="font-medium flex items-center gap-2">
                        <BarChart3 className="w-4 h-4 text-cyan-400" />
                        For Actuaries
                      </div>
                      <div className="text-xs text-gray-400">Actuarial modeling & risk quantification tools</div>
                    </Link>

                    <Link
                      href="/personas/broker"
                      onClick={() => setFocusAreasDropdownOpen(false)}
                      className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-amber-500/10 rounded-lg transition-colors duration-150">
                      <div className="font-medium flex items-center gap-2">
                        <Users className="w-4 h-4 text-amber-400" />
                        For Brokers
                      </div>
                      <div className="text-xs text-gray-400">Client retention & value demonstration platform</div>
                    </Link>

                    <Link
                      href="/personas/cfo"
                      onClick={() => setFocusAreasDropdownOpen(false)}
                      className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-emerald-500/10 rounded-lg transition-colors duration-150">
                      <div className="font-medium flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-emerald-400" />
                        For CFOs
                      </div>
                      <div className="text-xs text-gray-400">EBITDA defense & financial governance</div>
                    </Link>

                    <Link
                      href="/personas/hr"
                      onClick={() => setFocusAreasDropdownOpen(false)}
                      className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-rose-500/10 rounded-lg transition-colors duration-150">
                      <div className="font-medium flex items-center gap-2">
                        <Heart className="w-4 h-4 text-rose-400" />
                        For HR Leaders
                      </div>
                      <div className="text-xs text-gray-400">Benefits strategy & employee value optimization</div>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Products Dropdown */}
            <div 
              className="relative group"
              onMouseEnter={handleProductsMouseEnter}
              onMouseLeave={handleProductsMouseLeave}
            >
              <button
                className="flex items-center gap-2 px-4 py-2 text-[#8C1515] hover:text-[#a61c1c] font-semibold transition-colors rounded-lg hover:bg-red-50/50">
                Products
                <ChevronDown className={`w-3 h-3 transition-transform ${productsDropdownOpen ? "rotate-180" : ""}`} />
              </button>
              {productsDropdownOpen && (
                <div
                  onMouseEnter={handleProductsMouseEnter}
                  onMouseLeave={handleProductsMouseLeave}
                  className="absolute top-full left-0 mt-1 w-80 bg-gray-900/95 backdrop-blur-xl rounded-xl border border-gray-700/50 shadow-xl overflow-hidden z-[210]">
                  <div className="p-2">
                    <Link
                      href="/#dashboard"
                      onClick={() => setProductsDropdownOpen(false)}
                      className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-purple-500/10 rounded-lg transition-colors duration-150 border-b border-gray-700/30">
                      <div className="font-medium flex items-center gap-2">
                        <BarChart3 className="w-4 h-4 text-purple-400" />
                        Kincaid Health™
                      </div>
                      <div className="text-xs text-gray-400 mt-1">Executive command center - CFO war room for fiduciary-grade intelligence</div>
                    </Link>
                    <Link
                      href="/solutions/claims-recovery-iq"
                      onClick={() => setProductsDropdownOpen(false)}
                      className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-emerald-500/10 rounded-lg transition-colors duration-150 border-b border-gray-700/30">
                      <div className="font-medium flex items-center gap-2">
                        <Shield className="w-4 h-4 text-emerald-400" />
                        Claims Recovery IQ™
                      </div>
                      <div className="text-xs text-gray-400 mt-1">Forensic recovery engine for self-funded plans - 1.22% of spend recovered</div>
                    </Link>
                    <Link
                      href="/broker-compensation"
                      onClick={() => setProductsDropdownOpen(false)}
                      className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-[#8C1515]/20 rounded-lg transition-colors duration-150 border-b border-gray-700/30">
                      <div className="font-medium flex items-center gap-2">
                        <Calculator className="w-4 h-4 text-amber-500" />
                        5-Year Broker Auditor
                      </div>
                      <div className="text-xs text-gray-400 mt-1">Audit commissions & secret plan kickbacks over 5 years</div>
                    </Link>
                    <Link
                      href="/solutions/sales-iq"
                      onClick={() => setProductsDropdownOpen(false)}
                      className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-blue-500/10 rounded-lg transition-colors duration-150 border-b border-gray-700/30">
                      <div className="font-medium flex items-center gap-2">
                        <Search className="w-4 h-4 text-blue-400" />
                        Sales IQ™
                      </div>
                      <div className="text-xs text-gray-400 mt-1">Sales intelligence platform for self-funded benefits market</div>
                    </Link>
                    <Link
                      href="/solutions/rx-defense"
                      onClick={() => setProductsDropdownOpen(false)}
                      className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-rose-500/10 rounded-lg transition-colors duration-150">
                      <div className="font-medium flex items-center gap-2">
                        <FileText className="w-4 h-4 text-rose-400" />
                        PBM Contract Clarity™
                      </div>
                      <div className="text-xs text-gray-400 mt-1">PBM contract analyzer with 0-100 fiduciary scoring & redline generator</div>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Tools Dropdown - NEW */}
            <div className="relative">
              <button
                onClick={() => {
                  setToolsDropdownOpen(!toolsDropdownOpen);
                  setCompanyDropdownOpen(false);
                  setKincaidIqDropdownOpen(false);
                  setFocusAreasDropdownOpen(false);
                  setAuditsDropdownOpen(false);
                  setProductsDropdownOpen(false);
                }}
                className="flex items-center gap-2 px-4 py-2 text-black hover:text-black/80 transition-colors rounded-lg hover:bg-slate-50 font-medium">
                Tools
                <ChevronDown className={`w-3 h-3 transition-transform ${toolsDropdownOpen ? "rotate-180" : ""}`} />
              </button>
              {toolsDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-72 bg-gray-900/95 backdrop-blur-xl rounded-xl border border-gray-700/50 shadow-xl overflow-hidden z-[210]">
                  <div className="p-2">
                    <Link
                      href="/intelligence-hub"
                      onClick={() => setToolsDropdownOpen(false)}
                      className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-purple-500/10 rounded-lg transition-colors duration-150">
                      <div className="font-medium flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-purple-400" />
                        Intelligence Hub
                      </div>
                      <div className="text-xs text-gray-400">Central access to all tools & agents</div>
                    </Link>
                    <Link
                      href="/evidence-spine"
                      onClick={() => setToolsDropdownOpen(false)}
                      className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-blue-500/10 rounded-lg transition-colors duration-150">
                      <div className="font-medium flex items-center gap-2">
                        <Shield className="w-4 h-4 text-blue-400" />
                        Evidence Spine
                      </div>
                      <div className="text-xs text-gray-400">Audit logs & activity tracking</div>
                    </Link>
                    <Link
                      href="/api-documentation"
                      onClick={() => setToolsDropdownOpen(false)}
                      className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-emerald-500/10 rounded-lg transition-colors duration-150">
                      <div className="font-medium flex items-center gap-2">
                        <Code className="w-4 h-4 text-emerald-400" />
                        API Documentation
                      </div>
                      <div className="text-xs text-gray-400">FastAPI endpoint reference</div>
                    </Link>
                    <Link
                      href="/databank-manager"
                      onClick={() => setToolsDropdownOpen(false)}
                      className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-cyan-500/10 rounded-lg transition-colors duration-150">
                      <div className="font-medium flex items-center gap-2">
                        <Database className="w-4 h-4 text-cyan-400" />
                        Data Upload
                      </div>
                      <div className="text-xs text-gray-400">CSV/Excel file ingestion</div>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Engines Link - NEW */}
            <Link
              href="/engines"
              className="px-4 py-2 text-black hover:text-black/80 transition-colors rounded-lg hover:bg-slate-50 font-medium">
              Engines
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden rounded-lg p-2 text-black hover:bg-slate-50 hover:text-black/80">
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden border-t border-white/10 bg-gradient-to-b from-black/98 to-black/95 backdrop-blur-xl shadow-2xl">
          <div className="space-y-2 px-4 py-4 max-h-[calc(100vh-4rem)] overflow-y-auto">
            {/* Direct Link on Mobile - Highlighted */}
            <Link
              href="/broker-compensation"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-3.5 text-white bg-gradient-to-r from-[#8C1515] to-[#a61c1c] hover:from-[#a61c1c] hover:to-[#8C1515] font-bold rounded-xl transition-all duration-300 shadow-lg shadow-[#8C1515]/20 transform hover:scale-[1.02]">
              <div className="flex items-center justify-between">
                <span>5-Year Broker Auditor</span>
                <Calculator className="w-4 h-4" />
              </div>
            </Link>

            {/* Tools Dropdown - Mobile - NEW */}
            <div className="bg-white/5 rounded-xl overflow-hidden">
              <button
                onClick={() => setToolsDropdownOpen(!toolsDropdownOpen)}
                className="flex items-center justify-between w-full px-4 py-3.5 text-gray-200 hover:text-white hover:bg-white/10 transition-all duration-200">
                <span className="font-semibold">Intelligence Tools</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${toolsDropdownOpen ? "rotate-180" : ""}`} />
              </button>
              {toolsDropdownOpen && (
                <div className="bg-black/40 border-t border-white/5 animate-in slide-in-from-top-2 duration-200">
                  <div className="px-2 py-2 space-y-1">
                    <Link 
                      href="/intelligence-hub" 
                      onClick={() => setIsOpen(false)}
                      className="block px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-purple-500/20 rounded-lg transition-all duration-150">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-purple-400" />
                        Intelligence Hub
                      </div>
                      <div className="text-xs text-gray-400 mt-0.5">Central access point</div>
                    </Link>
                    <Link 
                      href="/evidence-spine" 
                      onClick={() => setIsOpen(false)}
                      className="block px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-blue-500/20 rounded-lg transition-all duration-150">
                      <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4 text-blue-400" />
                        Evidence Spine
                      </div>
                      <div className="text-xs text-gray-400 mt-0.5">Audit & provenance</div>
                    </Link>
                    <Link 
                      href="/api-documentation" 
                      onClick={() => setIsOpen(false)}
                      className="block px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-emerald-500/20 rounded-lg transition-all duration-150">
                      <div className="flex items-center gap-2">
                        <Code className="w-4 h-4 text-emerald-400" />
                        API Docs
                      </div>
                      <div className="text-xs text-gray-400 mt-0.5">Backend API reference</div>
                    </Link>
                    <Link 
                      href="/databank-manager" 
                      onClick={() => setIsOpen(false)}
                      className="block px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-cyan-500/20 rounded-lg transition-all duration-150">
                      <div className="flex items-center gap-2">
                        <Database className="w-4 h-4 text-cyan-400" />
                        Data Upload
                      </div>
                      <div className="text-xs text-gray-400 mt-0.5">CSV/Excel ingestion</div>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Products Dropdown - Mobile */}
            <div className="bg-white/5 rounded-xl overflow-hidden">
              <button
                onClick={() => setProductsDropdownOpen(!productsDropdownOpen)}
                className="flex items-center justify-between w-full px-4 py-3.5 text-gray-200 hover:text-white hover:bg-white/10 transition-all duration-200">
                <span className="font-semibold">Products</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${productsDropdownOpen ? "rotate-180" : ""}`} />
              </button>
              {productsDropdownOpen && (
                <div className="bg-black/40 border-t border-white/5 animate-in slide-in-from-top-2 duration-200">
                  <div className="px-2 py-2 space-y-1">
                    <Link 
                      href="/#dashboard" 
                      onClick={() => setIsOpen(false)}
                      className="block px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-purple-500/20 rounded-lg transition-all duration-150">
                      <div className="flex items-center gap-2">
                        <BarChart3 className="w-4 h-4 text-purple-400" />
                        Kincaid Health™
                      </div>
                      <div className="text-xs text-gray-400 mt-0.5">CFO war room & command center</div>
                    </Link>
                    <Link 
                      href="/solutions/claims-recovery-iq" 
                      onClick={() => setIsOpen(false)}
                      className="block px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-emerald-500/20 rounded-lg transition-all duration-150">
                      <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4 text-emerald-400" />
                        Claims Recovery IQ™
                      </div>
                      <div className="text-xs text-gray-400 mt-0.5">Forensic recovery engine</div>
                    </Link>
                    <Link 
                      href="/broker-compensation" 
                      onClick={() => setIsOpen(false)}
                      className="block px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-[#8C1515]/30 rounded-lg transition-all duration-150">
                      <div className="flex items-center gap-2">
                        <Calculator className="w-4 h-4 text-red-400" />
                        5-Year Broker Auditor
                      </div>
                      <div className="text-xs text-gray-400 mt-0.5">Commission audit tool</div>
                    </Link>
                    <Link 
                      href="/solutions/sales-iq" 
                      onClick={() => setIsOpen(false)}
                      className="block px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-blue-500/20 rounded-lg transition-all duration-150">
                      <div className="flex items-center gap-2">
                        <Search className="w-4 h-4 text-blue-400" />
                        Sales IQ™
                      </div>
                      <div className="text-xs text-gray-400 mt-0.5">Sales intelligence platform</div>
                    </Link>
                    <Link 
                      href="/solutions/rx-defense" 
                      onClick={() => setIsOpen(false)}
                      className="block px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-rose-500/20 rounded-lg transition-all duration-150">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-rose-400" />
                        Rx Defense IQ™
                      </div>
                      <div className="text-xs text-gray-400 mt-0.5">PBM contract analyzer</div>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Company Dropdown - Mobile */}
            <div className="bg-white/5 rounded-xl overflow-hidden">
              <button
                onClick={() => setCompanyDropdownOpen(!companyDropdownOpen)}
                className="flex items-center justify-between w-full px-4 py-3.5 text-gray-200 hover:text-white hover:bg-white/10 transition-all duration-200">
                <span className="font-semibold">Company</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${companyDropdownOpen ? "rotate-180" : ""}`} />
              </button>
              {companyDropdownOpen && (
                <div className="bg-black/40 border-t border-white/5 animate-in slide-in-from-top-2 duration-200">
                  <div className="px-2 py-2 space-y-1">
                    <Link 
                      href="/board-of-directors" 
                      onClick={() => setIsOpen(false)}
                      className="block px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-amber-500/20 rounded-lg transition-all duration-150">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-amber-400" />
                        Board of Directors
                      </div>
                    </Link>
                    <Link 
                      href="/investor" 
                      onClick={() => setIsOpen(false)}
                      className="block px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-amber-500/20 rounded-lg transition-all duration-150">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-amber-400" />
                        Investor Groups
                      </div>
                    </Link>
                    <Link 
                      href="/ma-vc-pe" 
                      onClick={() => setIsOpen(false)}
                      className="block px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-amber-500/20 rounded-lg transition-all duration-150">
                      <div className="flex items-center gap-2">
                        <Briefcase className="w-4 h-4 text-amber-400" />
                        M&A / VC / PE
                      </div>
                    </Link>
                    <Link 
                      href="/family-offices" 
                      onClick={() => setIsOpen(false)}
                      className="block px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-amber-500/20 rounded-lg transition-all duration-150">
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-amber-400" />
                        Family Offices
                      </div>
                    </Link>
                    <Link 
                      href="/capital-markets" 
                      onClick={() => setIsOpen(false)}
                      className="block px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-amber-500/20 rounded-lg transition-all duration-150">
                      <div className="flex items-center gap-2">
                        <LineChart className="w-4 h-4 text-amber-400" />
                        Capital Markets
                      </div>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Intelligence Series Dropdown - Mobile */}
            <div className="bg-white/5 rounded-xl overflow-hidden">
              <button
                onClick={() => setKincaidHealthDropdownOpen(!kincaidHealthDropdownOpen)}
                className="flex items-center justify-between w-full px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-rose-500/20 rounded-lg transition-all duration-150">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-rose-400" />
                  Intelligence Series
                </div>
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${kincaidHealthDropdownOpen ? "rotate-180" : ""}`} />
              </button>
              {kincaidHealthDropdownOpen && (
                <div className="bg-black/40 border-t border-white/5 animate-in slide-in-from-top-2 duration-200">
                  <div className="px-2 py-2 space-y-1">
                    <Link 
                      href="/kincaid-iq-intelligence-series" 
                      onClick={() => setIsOpen(false)}
                      className="block px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-purple-500/20 rounded-lg transition-all duration-150">
                      <div className="flex items-center gap-2">
                        <LineChart className="w-4 h-4 text-purple-400" />
                        Intelligence Products
                      </div>
                    </Link>
                    <Link 
                      href="/solutions/rx-defense" 
                      onClick={() => setIsOpen(false)}
                      className="block px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-rose-500/20 rounded-lg transition-all duration-150">
                      <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4 text-rose-400" />
                        PBM Contract Clarity 360*
                      </div>
                    </Link>
                    <Link 
                      href="/solutions/nadac-benchmarking" 
                      onClick={() => setIsOpen(false)}
                      className="block px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-rose-500/20 rounded-lg transition-all duration-150">
                      <div className="flex items-center gap-2">
                        <Pill className="w-4 h-4 text-rose-400" />
                        NADAC Benchmarking Intelligence
                      </div>
                    </Link>
                    <Link 
                      href="/solutions/actuarial-benefits" 
                      onClick={() => setIsOpen(false)}
                      className="block px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-cyan-500/20 rounded-lg transition-all duration-150">
                      <div className="flex items-center gap-2">
                        <BarChart3 className="w-4 h-4 text-cyan-400" />
                        Actuarial Analysis
                      </div>
                    </Link>
                    <Link 
                      href="/solutions/mark-cuban-cost-drugs" 
                      onClick={() => setIsOpen(false)}
                      className="block px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-blue-500/20 rounded-lg transition-all duration-150">
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-blue-400" />
                        Mark Cuban Cost Drugs
                      </div>
                    </Link>
                    <Link 
                      href="/pbm-crime-boss" 
                      onClick={() => setIsOpen(false)}
                      className="block px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-orange-500/20 rounded-lg transition-all duration-150">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-orange-400" />
                        PBM Crime Boss
                      </div>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Areas of Focus Dropdown - Mobile */}
            <div className="bg-white/5 rounded-xl overflow-hidden">
              <button
                onClick={() => setFocusAreasDropdownOpen(!focusAreasDropdownOpen)}
                className="flex items-center justify-between w-full px-4 py-3.5 text-gray-200 hover:text-white hover:bg-white/10 transition-all duration-200">
                <span className="font-semibold">Areas of Focus</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${focusAreasDropdownOpen ? "rotate-180" : ""}`} />
              </button>
              {focusAreasDropdownOpen && (
                <div className="bg-black/40 border-t border-white/5 animate-in slide-in-from-top-2 duration-200">
                  <div className="px-2 py-2 space-y-1">
                    <Link 
                      href="/personas/board-members" 
                      onClick={() => setIsOpen(false)}
                      className="block px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-purple-500/20 rounded-lg transition-all duration-150">
                      <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4 text-purple-400" />
                        For Board Members
                      </div>
                    </Link>
                    <Link 
                      href="/personas/pe-operators" 
                      onClick={() => setIsOpen(false)}
                      className="block px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-emerald-500/20 rounded-lg transition-all duration-150">
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-emerald-400" />
                        For PE Operators
                      </div>
                    </Link>
                    <Link 
                      href="/capital-markets" 
                      onClick={() => setIsOpen(false)}
                      className="block px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-indigo-500/20 rounded-lg transition-all duration-150">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-indigo-400" />
                        For Capital Markets
                      </div>
                    </Link>
                    <Link 
                      href="/personas/cfo" 
                      onClick={() => setIsOpen(false)}
                      className="block px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-emerald-500/20 rounded-lg transition-all duration-150">
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-emerald-400" />
                        For CFOs
                      </div>
                    </Link>
                    <Link 
                      href="/personas/hr" 
                      onClick={() => setIsOpen(false)}
                      className="block px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-blue-500/20 rounded-lg transition-all duration-150">
                      <div className="flex items-center gap-2">
                        <Heart className="w-4 h-4 text-blue-400" />
                        For HR Directors
                      </div>
                    </Link>
                    <Link 
                      href="/personas/broker" 
                      onClick={() => setIsOpen(false)}
                      className="block px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-amber-500/20 rounded-lg transition-all duration-150">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-amber-400" />
                        For Brokers
                      </div>
                    </Link>
                    <Link 
                      href="/personas/actuarial" 
                      onClick={() => setIsOpen(false)}
                      className="block px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-cyan-500/20 rounded-lg transition-all duration-150">
                      <div className="flex items-center gap-2">
                        <BarChart3 className="w-4 h-4 text-cyan-400" />
                        For Actuaries
                      </div>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* CTA Button */}
            <Link
              href="/request-demo"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-3.5 text-center bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg shadow-purple-500/20 transform hover:scale-[1.02] mt-3">
              Request Demo
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}