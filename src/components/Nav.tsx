import { useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";

export default function Nav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [companyDropdownOpen, setCompanyDropdownOpen] = useState(false);
  const [solutionsDropdownOpen, setSolutionsDropdownOpen] = useState(false);
  const [actuarialDropdownOpen, setActuarialDropdownOpen] = useState(false);
  const [agenticDropdownOpen, setAgenticDropdownOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-lg border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center group-hover:shadow-lg group-hover:shadow-amber-500/50 transition-all">
              <span className="text-white font-bold text-xl">K</span>
            </div>
            <div className="flex flex-col">
              <span className="text-white font-bold text-lg leading-tight">Kincaid IQ</span>
              <span className="text-amber-400 text-xs leading-tight">Algorithmic Fiduciary</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {/* Company Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setCompanyDropdownOpen(true)}
              onMouseLeave={() => setCompanyDropdownOpen(false)}
            >
              <button className="flex items-center gap-1 text-gray-300 hover:text-white transition-colors">
                Company
                <ChevronDown className={`w-4 h-4 transition-transform ${companyDropdownOpen ? "rotate-180" : ""}`} />
              </button>
              {companyDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-gray-900/95 backdrop-blur-xl rounded-xl border border-gray-700/50 shadow-xl overflow-hidden">
                  <div className="p-2">
                    <Link
                      href="/company"
                      className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-amber-500/10 rounded-lg transition-all"
                    >
                      <div className="font-medium">About Us</div>
                      <div className="text-xs text-gray-400">Company overview</div>
                    </Link>
                    <Link
                      href="/board-of-directors"
                      className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-amber-500/10 rounded-lg transition-all"
                    >
                      <div className="font-medium">Board of Directors</div>
                      <div className="text-xs text-gray-400">Leadership team</div>
                    </Link>
                    <Link
                      href="/investor"
                      className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-amber-500/10 rounded-lg transition-all"
                    >
                      <div className="font-medium">Investors</div>
                      <div className="text-xs text-gray-400">Investment overview</div>
                    </Link>
                    <Link
                      href="/capital-markets"
                      className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-amber-500/10 rounded-lg transition-all"
                    >
                      <div className="font-medium">Capital Markets</div>
                      <div className="text-xs text-gray-400">Market solutions</div>
                    </Link>
                    <Link
                      href="/family-offices"
                      className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-amber-500/10 rounded-lg transition-all"
                    >
                      <div className="font-medium">Family Offices</div>
                      <div className="text-xs text-gray-400">Private wealth management</div>
                    </Link>
                    <Link
                      href="/ma-vc-pe"
                      className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-amber-500/10 rounded-lg transition-all"
                    >
                      <div className="font-medium">M&A / VC / PE</div>
                      <div className="text-xs text-gray-400">Deal intelligence</div>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Solutions Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setSolutionsDropdownOpen(true)}
              onMouseLeave={() => setSolutionsDropdownOpen(false)}
            >
              <button className="flex items-center gap-1 text-gray-300 hover:text-white transition-colors">
                Solutions
                <ChevronDown className={`w-4 h-4 transition-transform ${solutionsDropdownOpen ? "rotate-180" : ""}`} />
              </button>
              {solutionsDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-72 bg-gray-900/95 backdrop-blur-xl rounded-xl border border-gray-700/50 shadow-xl overflow-hidden max-h-[80vh] overflow-y-auto">
                  <div className="p-2">
                    <div className="px-4 py-2 text-xs font-semibold text-amber-400 uppercase tracking-wider">Core Platform</div>
                    <Link
                      href="/platform"
                      className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-amber-500/10 rounded-lg transition-all"
                    >
                      <div className="font-medium">Platform Overview</div>
                      <div className="text-xs text-gray-400">Complete solution suite</div>
                    </Link>
                    <Link
                      href="/war-room"
                      className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-amber-500/10 rounded-lg transition-all"
                    >
                      <div className="font-medium">War Room</div>
                      <div className="text-xs text-gray-400">Real-time monitoring</div>
                    </Link>
                    <Link
                      href="/verified-savings-ledger"
                      className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-amber-500/10 rounded-lg transition-all"
                    >
                      <div className="font-medium">Verified Savings Ledger</div>
                      <div className="text-xs text-gray-400">Financial transparency</div>
                    </Link>
                    <Link
                      href="/evidence-receipts"
                      className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-amber-500/10 rounded-lg transition-all"
                    >
                      <div className="font-medium">Evidence Receipts</div>
                      <div className="text-xs text-gray-400">Proof of performance</div>
                    </Link>

                    <div className="px-4 py-2 mt-2 text-xs font-semibold text-amber-400 uppercase tracking-wider">Compliance</div>
                    <Link
                      href="/compliance"
                      className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-amber-500/10 rounded-lg transition-all"
                    >
                      <div className="font-medium">Compliance Hub</div>
                      <div className="text-xs text-gray-400">All compliance solutions</div>
                    </Link>
                    <Link
                      href="/solutions/erisa-compliance"
                      className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-amber-500/10 rounded-lg transition-all"
                    >
                      <div className="font-medium">ERISA Compliance</div>
                      <div className="text-xs text-gray-400">Retirement plan regulations</div>
                    </Link>
                    <Link
                      href="/solutions/hipaa-compliance"
                      className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-amber-500/10 rounded-lg transition-all"
                    >
                      <div className="font-medium">HIPAA Compliance</div>
                      <div className="text-xs text-gray-400">Healthcare data protection</div>
                    </Link>
                    <Link
                      href="/solutions/soc2-certification"
                      className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-amber-500/10 rounded-lg transition-all"
                    >
                      <div className="font-medium">SOC 2 Type II</div>
                      <div className="text-xs text-gray-400">Security certification</div>
                    </Link>
                    <Link
                      href="/solutions/fiduciary-governance"
                      className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-amber-500/10 rounded-lg transition-all"
                    >
                      <div className="font-medium">Fiduciary Governance</div>
                      <div className="text-xs text-gray-400">408(b)(2) & 404(a)(5)</div>
                    </Link>

                    <div className="px-4 py-2 mt-2 text-xs font-semibold text-amber-400 uppercase tracking-wider">Industry Solutions</div>
                    <Link
                      href="/contract-intelligence"
                      className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-amber-500/10 rounded-lg transition-all"
                    >
                      <div className="font-medium">Contract Intelligence</div>
                      <div className="text-xs text-gray-400">PBM contract analysis</div>
                    </Link>
                    <Link
                      href="/ebitda-governance"
                      className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-amber-500/10 rounded-lg transition-all"
                    >
                      <div className="font-medium">EBITDA Governance</div>
                      <div className="text-xs text-gray-400">Financial integrity</div>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Actuarial Benefits Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActuarialDropdownOpen(true)}
              onMouseLeave={() => setActuarialDropdownOpen(false)}
            >
              <button className="flex items-center gap-1 text-gray-300 hover:text-white transition-colors">
                Actuarial Benefits
                <ChevronDown className={`w-4 h-4 transition-transform ${actuarialDropdownOpen ? "rotate-180" : ""}`} />
              </button>
              {actuarialDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-gray-900/95 backdrop-blur-xl rounded-xl border border-gray-700/50 shadow-xl overflow-hidden">
                  <div className="p-2">
                    <Link
                      href="/kincaid-iq"
                      className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-amber-500/10 rounded-lg transition-all"
                    >
                      <div className="font-medium">Kincaid IQ</div>
                      <div className="text-xs text-gray-400">Actuarial intelligence platform</div>
                    </Link>
                    <Link
                      href="/actuarial-benefits"
                      className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-amber-500/10 rounded-lg transition-all"
                    >
                      <div className="font-medium">Actuarial Benefits</div>
                      <div className="text-xs text-gray-400">Benefits modeling & analysis</div>
                    </Link>
                    <Link
                      href="/solutions/risk-assessment"
                      className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-amber-500/10 rounded-lg transition-all"
                    >
                      <div className="font-medium">Risk Assessment</div>
                      <div className="text-xs text-gray-400">Predictive risk modeling</div>
                    </Link>
                    <Link
                      href="/solutions/premium-calculation"
                      className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-amber-500/10 rounded-lg transition-all"
                    >
                      <div className="font-medium">Premium Calculation</div>
                      <div className="text-xs text-gray-400">Accurate rate setting</div>
                    </Link>
                    <Link
                      href="/solutions/claims-analytics"
                      className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-amber-500/10 rounded-lg transition-all"
                    >
                      <div className="font-medium">Claims Analytics</div>
                      <div className="text-xs text-gray-400">Advanced claims intelligence</div>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Agentic Workflows Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setAgenticDropdownOpen(true)}
              onMouseLeave={() => setAgenticDropdownOpen(false)}
            >
              <button className="flex items-center gap-1 text-gray-300 hover:text-white transition-colors">
                Agentic Workflows
                <ChevronDown className={`w-4 h-4 transition-transform ${agenticDropdownOpen ? "rotate-180" : ""}`} />
              </button>
              {agenticDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-gray-900/95 backdrop-blur-xl rounded-xl border border-gray-700/50 shadow-xl overflow-hidden">
                  <div className="p-2">
                    <Link
                      href="/agentic-workflow"
                      className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-amber-500/10 rounded-lg transition-all"
                    >
                      <div className="font-medium">Agentic Workflows</div>
                      <div className="text-xs text-gray-400">AI-powered automation</div>
                    </Link>
                    <Link
                      href="/gen-ai-agents"
                      className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-amber-500/10 rounded-lg transition-all"
                    >
                      <div className="font-medium">Gen AI Agents</div>
                      <div className="text-xs text-gray-400">Intelligent automation</div>
                    </Link>
                    <Link
                      href="/agentic-transformation"
                      className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-amber-500/10 rounded-lg transition-all"
                    >
                      <div className="font-medium">Agentic Transformation</div>
                      <div className="text-xs text-gray-400">Digital transformation</div>
                    </Link>
                    <Link
                      href="/agentic-policy"
                      className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-amber-500/10 rounded-lg transition-all"
                    >
                      <div className="font-medium">Agentic Policy</div>
                      <div className="text-xs text-gray-400">Policy automation</div>
                    </Link>
                    <Link
                      href="/solutions/ai-automation"
                      className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-amber-500/10 rounded-lg transition-all"
                    >
                      <div className="font-medium">AI Automation</div>
                      <div className="text-xs text-gray-400">Workflow optimization</div>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/request-demo"
              className="px-6 py-2.5 bg-gradient-to-r from-amber-600 to-amber-500 text-white font-medium rounded-full hover:shadow-lg hover:shadow-amber-500/50 transition-all hover:scale-105"
            >
              Request Demo
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-white/10 py-4 space-y-2">
            {/* Company Dropdown - Mobile */}
            <div>
              <button
                onClick={() => setCompanyDropdownOpen(!companyDropdownOpen)}
                className="flex items-center justify-between w-full px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
              >
                <span className="font-medium">Company</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${companyDropdownOpen ? "rotate-180" : ""}`} />
              </button>
              {companyDropdownOpen && (
                <div className="ml-4 mt-2 space-y-1">
                  <Link
                    href="/about"
                    className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                  >
                    About Us
                  </Link>
                  <Link href="/board-of-directors" className="block px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                    Board of Directors
                  </Link>
                  <Link href="/investor" className="block px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                    Investors
                  </Link>
                  <Link href="/capital-markets" className="block px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                    Capital Markets
                  </Link>
                  <Link href="/family-offices" className="block px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                    Family Offices
                  </Link>
                  <Link href="/ma-vc-pe" className="block px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                    M&A / VC / PE
                  </Link>
                </div>
              )}
            </div>

            {/* Solutions Dropdown - Mobile */}
            <div>
              <button
                onClick={() => setSolutionsDropdownOpen(!solutionsDropdownOpen)}
                className="flex items-center justify-between w-full px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
              >
                <span className="font-medium">Solutions</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${solutionsDropdownOpen ? "rotate-180" : ""}`} />
              </button>
              {solutionsDropdownOpen && (
                <div className="ml-4 mt-2 space-y-1 max-h-96 overflow-y-auto">
                  <div className="px-4 py-2 text-xs font-semibold text-amber-400 uppercase tracking-wider">Core Platform</div>
                  <Link href="/platform" className="block px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                    Platform Overview
                  </Link>
                  <Link href="/war-room" className="block px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                    War Room
                  </Link>
                  <Link href="/verified-savings-ledger" className="block px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                    Verified Savings Ledger
                  </Link>
                  <Link href="/evidence-receipts" className="block px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                    Evidence Receipts
                  </Link>
                  <div className="px-4 py-2 mt-2 text-xs font-semibold text-amber-400 uppercase tracking-wider">Compliance</div>
                  <Link href="/compliance" className="block px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                    Compliance Hub
                  </Link>
                  <Link href="/solutions/erisa-compliance" className="block px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                    ERISA Compliance
                  </Link>
                  <Link href="/solutions/hipaa-compliance" className="block px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                    HIPAA Compliance
                  </Link>
                  <Link href="/solutions/soc2-certification" className="block px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                    SOC 2 Type II
                  </Link>
                  <Link href="/solutions/fiduciary-governance" className="block px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                    Fiduciary Governance
                  </Link>
                  <div className="px-4 py-2 mt-2 text-xs font-semibold text-amber-400 uppercase tracking-wider">Industry Solutions</div>
                  <Link href="/contract-intelligence" className="block px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                    Contract Intelligence
                  </Link>
                  <Link href="/ebitda-governance" className="block px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                    EBITDA Governance
                  </Link>
                </div>
              )}
            </div>

            {/* Actuarial Benefits Dropdown - Mobile */}
            <div>
              <button
                onClick={() => setActuarialDropdownOpen(!actuarialDropdownOpen)}
                className="flex items-center justify-between w-full px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
              >
                <span className="font-medium">Actuarial Benefits</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${actuarialDropdownOpen ? "rotate-180" : ""}`} />
              </button>
              {actuarialDropdownOpen && (
                <div className="ml-4 mt-2 space-y-1">
                  <Link href="/kincaid-iq" className="block px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                    Kincaid IQ
                  </Link>
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
              )}
            </div>

            {/* Agentic Workflows Dropdown - Mobile */}
            <div>
              <button
                onClick={() => setAgenticDropdownOpen(!agenticDropdownOpen)}
                className="flex items-center justify-between w-full px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
              >
                <span className="font-medium">Agentic Workflows</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${agenticDropdownOpen ? "rotate-180" : ""}`} />
              </button>
              {agenticDropdownOpen && (
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
              )}
            </div>

            <Link
              href="/request-demo"
              className="block px-4 py-3 text-center bg-gradient-to-r from-amber-600 to-amber-500 text-white font-medium rounded-lg hover:shadow-lg hover:shadow-amber-500/50 transition-all"
            >
              Request Demo
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}