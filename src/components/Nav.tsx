import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown, Search, Users, Building2, AlertTriangle, Calculator, FileText, TrendingUp, Briefcase, BarChart3, Shield, LineChart, DollarSign, Heart, FolderOpen } from "lucide-react";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const [companyDropdownOpen, setCompanyDropdownOpen] = useState(false);
  const [focusAreasDropdownOpen, setFocusAreasDropdownOpen] = useState(false);
  const [kincaidIqDropdownOpen, setKincaidIqDropdownOpen] = useState(false);
  const [auditsDropdownOpen, setAuditsDropdownOpen] = useState(false);
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);

  return (
    <nav className="fixed top-0 z-[200] w-full border-b border-slate-200/20 bg-white/95 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <Image 
              src="/1772951240194-20bfeb68-285b-4423-9485-b2585796d66a.jpeg"
              alt="Kincaid IQ Data Sciences Lab"
              width={57}
              height={57}
              className="h-[57px] w-[57px] rounded-full object-cover border-2 border-[#B8860B]/30 transition-transform duration-300 ease-out group-hover:scale-110"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-1">
            {/* Intelligence Series - Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setKincaidIqDropdownOpen(!kincaidIqDropdownOpen);
                  setCompanyDropdownOpen(false);
                  setFocusAreasDropdownOpen(false);
                  setAuditsDropdownOpen(false);
                  setProductsDropdownOpen(false);
                }}
                className="flex items-center gap-2 px-4 py-2 text-black hover:text-black/80 transition-colors rounded-lg hover:bg-slate-50 font-medium">
                Intelligence Series
                <ChevronDown className={`w-3 h-3 transition-transform ${kincaidIqDropdownOpen ? "rotate-180" : ""}`} />
              </button>
              {kincaidIqDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-72 bg-gray-900/95 backdrop-blur-xl rounded-xl border border-gray-700/50 shadow-xl overflow-hidden z-[210]">
                  <div className="p-2">
                    <Link
                      href="/kincaid-iq-intelligence-series"
                      onClick={() => setKincaidIqDropdownOpen(false)}
                      className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-purple-500/10 rounded-lg transition-colors duration-150">
                      <div className="font-medium">Intelligence Overview</div>
                      <div className="text-xs text-gray-400">Main dashboard and analytics</div>
                    </Link>
                    <Link
                      href="/solutions/rx-defense"
                      onClick={() => setKincaidIqDropdownOpen(false)}
                      className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-rose-500/10 rounded-lg transition-colors duration-150">
                      <div className="font-medium">Rx PBM Defense Contract x-Ray</div>
                      <div className="text-xs text-gray-400">PBM contract forensics</div>
                    </Link>
                    <Link
                      href="/solutions/actuarial-benefits"
                      onClick={() => setKincaidIqDropdownOpen(false)}
                      className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-cyan-500/10 rounded-lg transition-colors duration-150">
                      <div className="font-medium">Actuarial Analysis</div>
                      <div className="text-xs text-gray-400">Risk modeling & projections</div>
                    </Link>
                    <Link
                      href="/solutions/mark-cuban-cost-drugs"
                      onClick={() => setKincaidIqDropdownOpen(false)}
                      className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-blue-500/10 rounded-lg transition-colors duration-150">
                      <div className="font-medium">Mark Cuban Cost Drugs</div>
                      <div className="text-xs text-gray-400">Drug cost benchmarking</div>
                    </Link>
                    <Link
                      href="/pbm-crime-boss"
                      onClick={() => setKincaidIqDropdownOpen(false)}
                      className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-orange-500/10 rounded-lg transition-colors duration-150">
                      <div className="font-medium">PBM Crime Boss</div>
                      <div className="text-xs text-gray-400">Insider newsletter & investigations</div>
                    </Link>

                    {/* Premium PDF Case Study Showcase */}
                    <a
                      href="/Kincaid_iQ_JBHunt_EBITDA_Defense.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setKincaidIqDropdownOpen(false)}
                      className="block mx-1 mt-2 px-4 py-3 bg-gradient-to-r from-amber-500/10 to-amber-600/5 hover:from-amber-500/20 hover:to-amber-600/10 text-amber-300 hover:text-amber-100 rounded-lg border border-amber-500/30 transition-all duration-150">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-xs uppercase tracking-wider text-amber-400">Featured Audit Report</span>
                        <span className="text-[9px] bg-amber-500/20 border border-amber-500/30 text-amber-300 px-1.5 py-0.5 rounded font-bold uppercase">PDF</span>
                      </div>
                      <div className="font-bold text-sm mt-1">JB Hunt EBITDA Defense</div>
                      <div className="text-[11px] text-amber-300/70 mt-0.5 leading-snug">Forensic actuarial intelligence and EBITDA shielding</div>
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Company Menu */}
            <div className="relative">
              <button
                onClick={() => {
                  setCompanyDropdownOpen(!companyDropdownOpen);
                  setKincaidIqDropdownOpen(false);
                  setFocusAreasDropdownOpen(false);
                  setAuditsDropdownOpen(false);
                  setProductsDropdownOpen(false);
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

            {/* Areas of Focus - Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setFocusAreasDropdownOpen(!focusAreasDropdownOpen);
                  setKincaidIqDropdownOpen(false);
                  setCompanyDropdownOpen(false);
                  setAuditsDropdownOpen(false);
                  setProductsDropdownOpen(false);
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
            <div className="relative">
              <button
                onClick={() => {
                  setProductsDropdownOpen(!productsDropdownOpen);
                  setKincaidIqDropdownOpen(false);
                  setCompanyDropdownOpen(false);
                  setFocusAreasDropdownOpen(false);
                  setAuditsDropdownOpen(false);
                }}
                className="flex items-center gap-2 px-4 py-2 text-[#8C1515] hover:text-[#a61c1c] font-semibold transition-colors rounded-lg hover:bg-red-50/50">
                Products
                <ChevronDown className={`w-3 h-3 transition-transform ${productsDropdownOpen ? "rotate-180" : ""}`} />
              </button>
              {productsDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-80 bg-gray-900/95 backdrop-blur-xl rounded-xl border border-gray-700/50 shadow-xl overflow-hidden z-[210]">
                  <div className="p-2">
                    <Link
                      href="/request-demo"
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
                      href="/request-demo"
                      onClick={() => setProductsDropdownOpen(false)}
                      className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-blue-500/10 rounded-lg transition-colors duration-150">
                      <div className="font-medium flex items-center gap-2">
                        <Search className="w-4 h-4 text-blue-400" />
                        Sales IQ™
                      </div>
                      <div className="text-xs text-gray-400 mt-1">Sales intelligence platform for self-funded benefits market</div>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Broker Audits & Vault Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setAuditsDropdownOpen(!auditsDropdownOpen);
                  setKincaidIqDropdownOpen(false);
                  setCompanyDropdownOpen(false);
                  setFocusAreasDropdownOpen(false);
                  setProductsDropdownOpen(false);
                }}
                className="flex items-center gap-2 px-4 py-2 text-black hover:text-black/80 transition-colors rounded-lg hover:bg-slate-50 font-medium">
                Audits & Briefs
                <ChevronDown className={`w-3 h-3 transition-transform ${auditsDropdownOpen ? "rotate-180" : ""}`} />
              </button>
              {auditsDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-72 bg-gray-900/95 backdrop-blur-xl rounded-xl border border-gray-700/50 shadow-xl overflow-hidden z-[210]">
                  <div className="p-2">
                    <Link
                      href="/broker-compensation"
                      onClick={() => setAuditsDropdownOpen(false)}
                      className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-[#8C1515]/20 rounded-lg transition-colors duration-150">
                      <div className="font-medium flex items-center gap-2">
                        <Calculator className="w-4 h-4 text-amber-500" />
                        5-Year Broker Auditor
                      </div>
                      <div className="text-xs text-gray-400">Audit commissions & secret plan kickbacks</div>
                    </Link>
                    <Link
                      href="/all-uploads"
                      onClick={() => setAuditsDropdownOpen(false)}
                      className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-blue-500/10 rounded-lg transition-colors duration-150">
                      <div className="font-medium flex items-center gap-2">
                        <FolderOpen className="w-4 h-4 text-blue-400" />
                        Uploads & Briefs
                      </div>
                      <div className="text-xs text-gray-400">Access full forensic PDF libraries</div>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link href="/request-demo">
              <Button className="bg-[#8C1515] hover:bg-[#a61c1c] text-white">
                Contact Sales
              </Button>
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
                      href="/request-demo" 
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
                      href="/request-demo" 
                      onClick={() => setIsOpen(false)}
                      className="block px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-blue-500/20 rounded-lg transition-all duration-150">
                      <div className="flex items-center gap-2">
                        <Search className="w-4 h-4 text-blue-400" />
                        Sales IQ™
                      </div>
                      <div className="text-xs text-gray-400 mt-0.5">Sales intelligence platform</div>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Intelligence Series Dropdown - Mobile */}
            <div className="bg-white/5 rounded-xl overflow-hidden">
              <button
                onClick={() => setKincaidIqDropdownOpen(!kincaidIqDropdownOpen)}
                className="flex items-center justify-between w-full px-4 py-3.5 text-gray-200 hover:text-white hover:bg-white/10 transition-all duration-200">
                <span className="font-semibold">Intelligence Series</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${kincaidIqDropdownOpen ? "rotate-180" : ""}`} />
              </button>
              {kincaidIqDropdownOpen && (
                <div className="bg-black/40 border-t border-white/5 animate-in slide-in-from-top-2 duration-200">
                  <div className="px-2 py-2 space-y-1">
                    <Link 
                      href="/kincaid-iq-intelligence-series" 
                      onClick={() => setIsOpen(false)}
                      className="block px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-purple-500/20 rounded-lg transition-all duration-150">
                      <div className="flex items-center gap-2">
                        <LineChart className="w-4 h-4 text-purple-400" />
                        Intelligence Overview
                      </div>
                    </Link>
                    <Link 
                      href="/solutions/rx-defense" 
                      onClick={() => setIsOpen(false)}
                      className="block px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-rose-500/20 rounded-lg transition-all duration-150">
                      <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4 text-rose-400" />
                        Rx PBM Defense
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

            {/* Audits & Briefs Dropdown - Mobile */}
            <div className="bg-white/5 rounded-xl overflow-hidden">
              <button
                onClick={() => setAuditsDropdownOpen(!auditsDropdownOpen)}
                className="flex items-center justify-between w-full px-4 py-3.5 text-gray-200 hover:text-white hover:bg-white/10 transition-all duration-200">
                <span className="font-semibold">Audits & Briefs</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${auditsDropdownOpen ? "rotate-180" : ""}`} />
              </button>
              {auditsDropdownOpen && (
                <div className="bg-black/40 border-t border-white/5 animate-in slide-in-from-top-2 duration-200">
                  <div className="px-2 py-2 space-y-1">
                    <Link 
                      href="/broker-compensation" 
                      onClick={() => setIsOpen(false)}
                      className="block px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-[#8C1515]/30 rounded-lg transition-all duration-150">
                      <div className="flex items-center gap-2">
                        <Calculator className="w-4 h-4 text-red-400" />
                        5-Year Broker Auditor
                      </div>
                    </Link>
                    <Link 
                      href="/all-uploads" 
                      onClick={() => setIsOpen(false)}
                      className="block px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-blue-500/20 rounded-lg transition-all duration-150">
                      <div className="flex items-center gap-2">
                        <FolderOpen className="w-4 h-4 text-blue-400" />
                        Uploads & Briefs Library
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