import { useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown, Sparkles, Search, Users, Building2, AlertTriangle, Calculator, FileText, TrendingUp, Briefcase, BarChart3, Shield, LineChart } from "lucide-react";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const [companyDropdownOpen, setCompanyDropdownOpen] = useState(false);
  const [solutionsDropdownOpen, setSolutionsDropdownOpen] = useState(false);
  const [actuarialDropdownOpen, setActuarialDropdownOpen] = useState(false);
  const [agenticDropdownOpen, setAgenticDropdownOpen] = useState(false);
  const [platformDropdownOpen, setPlatformDropdownOpen] = useState(false);
  const [focusAreasDropdownOpen, setFocusAreasDropdownOpen] = useState(false);

  return (
    <nav className="fixed top-0 z-[200] w-full border-b border-white/10 bg-black/80 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Sparkles className="h-6 w-6 text-purple-400 flex-shrink-0" />
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              <span className="hidden sm:inline">Kincaid IQ</span>
              <span className="sm:hidden">Kincaid IQ</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-1">
            {/* Company Menu - NOW CLICK-BASED */}
            <div className="relative">
              <button
                onClick={() => setCompanyDropdownOpen(!companyDropdownOpen)}
                className="flex items-center gap-2 px-4 py-2 text-gray-300 hover:text-white transition-colors rounded-lg hover:bg-white/5">
                
                Company
                <ChevronDown className={`w-3 h-3 transition-transform ${companyDropdownOpen ? "rotate-180" : ""}`} />
              </button>
              {companyDropdownOpen &&
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
                    <Link
                    href="/pbm-crime-boss"
                    onClick={() => setCompanyDropdownOpen(false)}
                    className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-rose-500/10 rounded-lg transition-colors duration-150 border-t border-gray-700/50 mt-2 pt-3">
                    
                      <div className="font-medium flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-rose-400" />
                        <span className="text-rose-300">PBM Crime Boss</span>
                      </div>
                      <div className="text-xs text-gray-400">LinkedIn publication series</div>
                    </Link>
                  </div>
                </div>
              }
            </div>

            {/* Solutions Menu - CLICK-BASED */}
            <div className="relative">
              <button
                onClick={() => setSolutionsDropdownOpen(!solutionsDropdownOpen)}
                className="flex items-center gap-2 px-4 py-2 text-gray-300 hover:text-white transition-colors rounded-lg hover:bg-white/5">
                
                Solutions
                <ChevronDown className={`w-3 h-3 transition-transform ${solutionsDropdownOpen ? "rotate-180" : ""}`} />
              </button>
              {solutionsDropdownOpen && <div className="absolute top-full left-0 mt-2 w-64 bg-gray-900/95 backdrop-blur-xl rounded-xl border border-gray-700/50 shadow-xl overflow-hidden z-[210]">
                  <div className="p-2">
                    <Link
                    href="/solutions/contract-xray"
                    onClick={() => setSolutionsDropdownOpen(false)}
                    className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-purple-500/10 rounded-lg transition-colors duration-150">
                    
                      <div className="font-medium">PBM Contract X-Ray</div>
                      <div className="text-xs text-gray-400">Deep contract analysis</div>
                    </Link>
                    <Link
                    href="/executive-war-room"
                    onClick={() => setSolutionsDropdownOpen(false)}
                    className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-purple-500/10 rounded-lg transition-colors duration-150">
                    
                      <div className="font-medium">Kincaid IQ</div>
                      <div className="text-xs text-gray-400">Real-time healthcare intelligence</div>
                    </Link>
                  </div>
                </div>
              }
            </div>

            {/* Focus Areas Menu - NOW CLICK-BASED */}
            <div className="relative">
              <button
                onClick={() => setFocusAreasDropdownOpen(!focusAreasDropdownOpen)}
                className="flex items-center gap-2 px-4 py-2 text-gray-300 hover:text-white transition-colors rounded-lg hover:bg-white/5">
                
                Focus Areas
                <ChevronDown className={`w-3 h-3 transition-transform ${focusAreasDropdownOpen ? "rotate-180" : ""}`} />
              </button>
              {focusAreasDropdownOpen &&
              <div className="absolute top-full left-0 mt-2 w-72 bg-gray-900/95 backdrop-blur-xl rounded-xl border border-gray-700/50 shadow-xl overflow-hidden z-[210]">
                  <div className="p-2">
                    <Link
                    href="/board-of-directors"
                    onClick={() => setFocusAreasDropdownOpen(false)}
                    className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-purple-500/10 rounded-lg transition-colors duration-150">
                    
                      <div className="font-medium flex items-center gap-2">
                        <Shield className="w-4 h-4 text-purple-400" />
                        For Board Members
                      </div>
                      <div className="text-xs text-gray-400">Strategic governance & value creation oversight</div>
                    </Link>
                    <Link
                    href="/capital-markets"
                    onClick={() => setFocusAreasDropdownOpen(false)}
                    className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-indigo-500/10 rounded-lg transition-colors duration-150">
                    
                      <div className="font-medium flex items-center gap-2">
                        <LineChart className="w-4 h-4 text-indigo-400" />
                        For Capital Markets
                      </div>
                      <div className="text-xs text-gray-400">Deal intelligence & value architecture</div>
                    </Link>
                    <Link
                    href="/ma-vc-pe"
                    onClick={() => setFocusAreasDropdownOpen(false)}
                    className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-violet-500/10 rounded-lg transition-colors duration-150">
                    
                      <div className="font-medium flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-violet-400" />
                        For PE Operators
                      </div>
                      <div className="text-xs text-gray-400">Portfolio optimization & operational excellence</div>
                    </Link>
                    <Link
                    href="/personas/cfo"
                    onClick={() => setFocusAreasDropdownOpen(false)}
                    className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-emerald-500/10 rounded-lg transition-colors duration-150">
                    
                      <div className="font-medium flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-emerald-400" />
                        For CFOs
                      </div>
                      <div className="text-xs text-gray-400">EBITDA protection & fiduciary defense</div>
                    </Link>
                    <Link
                    href="/personas/hr"
                    onClick={() => setFocusAreasDropdownOpen(false)}
                    className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-blue-500/10 rounded-lg transition-colors duration-150">
                    
                      <div className="font-medium flex items-center gap-2">
                        <Users className="w-4 h-4 text-blue-400" />
                        For HR Directors
                      </div>
                      <div className="text-xs text-gray-400">Member experience & vendor management</div>
                    </Link>
                    <Link
                    href="/personas/broker"
                    onClick={() => setFocusAreasDropdownOpen(false)}
                    className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-amber-500/10 rounded-lg transition-colors duration-150">
                    
                      <div className="font-medium flex items-center gap-2">
                        <Briefcase className="w-4 h-4 text-amber-400" />
                        For Brokers
                      </div>
                      <div className="text-xs text-gray-400">White-label tools & referral revenue</div>
                    </Link>
                    <Link
                    href="/personas/actuarial"
                    onClick={() => setFocusAreasDropdownOpen(false)}
                    className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-cyan-500/10 rounded-lg transition-colors duration-150">
                    
                      <div className="font-medium flex items-center gap-2">
                        <BarChart3 className="w-4 h-4 text-cyan-400" />
                        For Actuaries
                      </div>
                      <div className="text-xs text-gray-400">Statistical validation & Monte Carlo</div>
                    </Link>
                  </div>
                </div>
              }
            </div>

            {/* Platform Menu - NOW CLICK-BASED */}
            <div className="relative">
              <button
                onClick={() => setPlatformDropdownOpen(!platformDropdownOpen)}
                className="flex items-center gap-2 px-4 py-2 text-gray-300 hover:text-white transition-colors rounded-lg hover:bg-white/5">
                
                Platform
                <ChevronDown className={`w-3 h-3 transition-transform ${platformDropdownOpen ? "rotate-180" : ""}`} />
              </button>
              {platformDropdownOpen &&
              <div className="absolute top-full left-0 mt-2 w-64 bg-gray-900/95 backdrop-blur-xl rounded-xl border border-gray-700/50 shadow-xl overflow-hidden z-[210]">
                  <div className="p-2">
                    <Link
                    href="/actuarial-benefits"
                    onClick={() => setPlatformDropdownOpen(false)}
                    className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-amber-500/10 rounded-lg transition-colors duration-150">
                    
                      <div className="font-medium">Actuarial Benefits</div>
                      <div className="text-xs text-gray-400">Benefits modeling & analysis</div>
                    </Link>
                    <Link
                    href="/solutions/risk-assessment"
                    onClick={() => setPlatformDropdownOpen(false)}
                    className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-amber-500/10 rounded-lg transition-colors duration-150">
                    
                      <div className="font-medium">Risk Assessment</div>
                      <div className="text-xs text-gray-400">Predictive risk modeling</div>
                    </Link>
                    <Link
                    href="/solutions/premium-calculation"
                    onClick={() => setPlatformDropdownOpen(false)}
                    className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-amber-500/10 rounded-lg transition-colors duration-150">
                    
                      <div className="font-medium">Premium Calculation</div>
                      <div className="text-xs text-gray-400">Accurate rate setting</div>
                    </Link>
                    <Link
                    href="/solutions/claims-analytics"
                    onClick={() => setPlatformDropdownOpen(false)}
                    className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-amber-500/10 rounded-lg transition-colors duration-150">
                    
                      <div className="font-medium">Claims Analytics</div>
                      <div className="text-xs text-gray-400">Advanced claims intelligence</div>
                    </Link>
                  </div>
                </div>
              }
            </div>

            <Link href="/request-demo">
              <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                Contact Sales
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden rounded-lg p-2 text-gray-400 hover:bg-white/5 hover:text-white">
            
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen &&
      <div className="md:hidden border-t border-white/10 bg-black/95 backdrop-blur-xl">
          <div className="space-y-1 px-4 py-3">
            {/* Company Dropdown - Mobile */}
            <div>
              <button
              onClick={() => setCompanyDropdownOpen(!companyDropdownOpen)}
              className="flex items-center justify-between w-full px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
              
                <span className="font-medium">Company</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${companyDropdownOpen ? "rotate-180" : ""}`} />
              </button>
              {companyDropdownOpen &&
            <div className="ml-4 mt-2 space-y-1">
                  <Link href="/board-of-directors" className="block px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                    Board of Directors
                  </Link>
                  <Link href="/investor" className="block px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                    Investor Groups
                  </Link>
                  <Link href="/ma-vc-pe" className="block px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                    M&A / VC / PE
                  </Link>
                  <Link href="/family-offices" className="block px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                    Family Offices
                  </Link>
                  <Link href="/capital-markets" className="block px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                    Capital Markets
                  </Link>
                  <Link href="/pbm-crime-boss" className="block px-4 py-2 text-sm text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-lg transition-colors border-t border-gray-700/50 mt-2 pt-2">
                    <span className="flex items-center gap-2">
                      <AlertTriangle className="h-3 w-3" />
                      PBM Crime Boss
                    </span>
                  </Link>
                </div>
            }
            </div>

            {/* Solutions Dropdown - Mobile */}
            <div>
              <button
              onClick={() => setSolutionsDropdownOpen(!solutionsDropdownOpen)}
              className="flex items-center justify-between w-full px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
              
                <span className="font-medium">Solutions</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${solutionsDropdownOpen ? "rotate-180" : ""}`} />
              </button>
              {solutionsDropdownOpen &&
            <div className="ml-4 mt-2 space-y-1">
                  <Link href="/solutions/contract-xray" className="block px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-purple-500/10 rounded-lg transition-colors">
                    PBM Contract X-Ray
                  </Link>
                  <Link href="/executive-war-room" className="block px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-purple-500/10 rounded-lg transition-colors">
                    Kincaid IQ
                  </Link>
                </div>
            }
            </div>

            {/* Focus Areas Dropdown - Mobile */}
            <div>
              <button
              onClick={() => setFocusAreasDropdownOpen(!focusAreasDropdownOpen)}
              className="flex items-center justify-between w-full px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
              
                <span className="font-medium">Focus Areas</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${focusAreasDropdownOpen ? "rotate-180" : ""}`} />
              </button>
              {focusAreasDropdownOpen &&
            <div className="ml-4 mt-2 space-y-1">
                  <Link href="/board-of-directors" className="block px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-purple-500/10 rounded-lg transition-colors">
                    For Board Members
                  </Link>
                  <Link href="/capital-markets" className="block px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-indigo-500/10 rounded-lg transition-colors">
                    For Capital Markets
                  </Link>
                  <Link href="/ma-vc-pe" className="block px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-violet-500/10 rounded-lg transition-colors">
                    For PE Operators
                  </Link>
                  <Link href="/personas/cfo" className="block px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-emerald-500/10 rounded-lg transition-colors">
                    For CFOs
                  </Link>
                  <Link href="/personas/hr" className="block px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-blue-500/10 rounded-lg transition-colors">
                    For HR Directors
                  </Link>
                  <Link href="/personas/broker" className="block px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-amber-500/10 rounded-lg transition-colors">
                    For Brokers
                  </Link>
                  <Link href="/personas/actuarial" className="block px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-cyan-500/10 rounded-lg transition-colors">
                    For Actuaries
                  </Link>
                </div>
            }
            </div>

            {/* Platform Dropdown - Mobile */}
            <div>
              <button
              onClick={() => setPlatformDropdownOpen(!platformDropdownOpen)}
              className="flex items-center justify-between w-full px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
              
                <span className="font-medium">Platform</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${platformDropdownOpen ? "rotate-180" : ""}`} />
              </button>
              {platformDropdownOpen &&
            <div className="ml-4 mt-2 space-y-1">
                  <Link href="/actuarial-benefits" className="block px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                    Actuarial Benefits
                  </Link>
                  <Link href="/solutions/risk-assessment" className="block px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                    Risk Assessment
                  </Link>
                  <Link href="/solutions/premium-calculation" className="block px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                    Premium Calculation
                  </Link>
                  <Link href="/solutions/claims-analytics" className="block px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                    Claims Analytics
                  </Link>
                </div>
            }
            </div>

            {/* Agentic Workflows Dropdown - Mobile */}
            <div>
              <button
              onClick={() => setAgenticDropdownOpen(!agenticDropdownOpen)}
              className="flex items-center justify-between w-full px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
              
                <span className="font-medium">Agentic Workflows</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${agenticDropdownOpen ? "rotate-180" : ""}`} />
              </button>
              {agenticDropdownOpen &&
            <div className="ml-4 mt-2 space-y-1">
                  <Link href="/agentic-workflow" className="block px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                    Agentic Workflows
                  </Link>
                  <Link href="/gen-ai-agents" className="block px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                    Gen AI Agents
                  </Link>
                  <Link href="/agentic-transformation" className="block px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                    Agentic Transformation
                  </Link>
                  <Link href="/agentic-policy" className="block px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                    Agentic Policy
                  </Link>
                  <Link href="/solutions/ai-automation" className="block px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                    AI Automation
                  </Link>
                </div>
            }
            </div>

            <Link
            href="/request-demo"
            className="block px-4 py-3 text-center bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all">
            
              Request Demo
            </Link>
          </div>
        </div>
      }
    </nav>);

}