import React from "react";
import Head from "next/head";
import { 
  ShieldAlert, 
  AlertTriangle, 
  CheckCircle2, 
  DollarSign, 
  FileText,
  AlertCircle,
  ArrowRight,
  Lock,
  Search
} from "lucide-react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";

export default function RxDefenseReport() {
  return (
    <div className="min-h-screen bg-[#050505] text-slate-300 font-sans selection:bg-rose-500/30">
      <Head>
        <title>RX Defense IQ | Fiduciary Analysis Report</title>
      </Head>

      <SiteHeader />

      <main className="max-w-5xl mx-auto px-6 py-12 pt-24">
        {/* Report Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 border-b border-white/10 pb-8">
          <div>
            <div className="text-[10px] md:text-xs font-bold tracking-[0.2em] text-slate-500 mb-2 uppercase">
              Kincaid IQ &middot; RX Defense IQ&trade;
            </div>
            <h2 className="text-sm md:text-base text-slate-400">Fiduciary-Grade PBM Contract Intelligence</h2>
          </div>
          <div className="mt-4 md:mt-0 text-left md:text-right">
            <div className="text-sm text-slate-400">March 25, 2026</div>
            <div className="text-[10px] md:text-xs font-mono tracking-wider text-slate-500 mt-1 uppercase">
              Account: SHRACK-7742
            </div>
          </div>
        </header>

        {/* Title Section */}
        <div className="mb-12">
          <div className="text-xs font-bold tracking-[0.15em] text-slate-500 mb-4 uppercase">
            PBM Contract Fiduciary Analysis Report
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-4">
            TrueRx
          </h1>
          <p className="text-lg text-slate-400 font-mono text-sm">
            Boone County - TrueRx PSA 2026 Fully Executed.pdf
          </p>
        </div>

        {/* Main Scorecard */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8">
          <div className="md:col-span-12 rounded-2xl bg-gradient-to-br from-[#1a050a] to-[#0a0204] border border-rose-900/50 p-8 md:p-12 relative overflow-hidden">
            {/* Glow effect */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-rose-600/10 blur-[100px] rounded-full pointer-events-none" />
            
            <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
              <div className="text-center md:text-left">
                <div className="text-8xl md:text-[140px] font-black text-rose-500 leading-none tracking-tighter">
                  38
                </div>
                <div className="text-sm font-mono text-slate-400 tracking-widest mt-2 uppercase">Out of 100</div>
              </div>
              <div className="w-px h-32 bg-rose-900/30 hidden md:block mx-4" />
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-rose-500 tracking-tight mb-2">RED FLAG</h2>
                <p className="text-xl text-slate-300 mb-1">CAA 2026 Fiduciary Alignment Score</p>
                <p className="text-slate-500">50 Issues &middot; 10 Provisions Evaluated</p>
              </div>
            </div>
          </div>
        </div>

        {/* 5 Metric Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-24">
          <div className="bg-[#0f0f0f] border border-white/5 rounded-xl p-6 flex flex-col justify-between">
            <div className="text-3xl font-bold text-emerald-400 mb-2">$3.6M</div>
            <div className="text-[10px] font-bold tracking-widest text-slate-500 uppercase leading-relaxed">Estimated<br/>Annual<br/>Savings</div>
          </div>
          <div className="bg-[#0f0f0f] border border-white/5 rounded-xl p-6 flex flex-col justify-between">
            <div className="text-3xl font-bold text-rose-500 mb-2">2</div>
            <div className="text-[10px] font-bold tracking-widest text-slate-500 uppercase leading-relaxed">Critical<br/>Flags</div>
          </div>
          <div className="bg-[#0f0f0f] border border-white/5 rounded-xl p-6 flex flex-col justify-between">
            <div className="text-3xl font-bold text-orange-400 mb-2">14</div>
            <div className="text-[10px] font-bold tracking-widest text-slate-500 uppercase leading-relaxed">Issues Not<br/>Met</div>
          </div>
          <div className="bg-[#0f0f0f] border border-white/5 rounded-xl p-6 flex flex-col justify-between">
            <div className="text-3xl font-bold text-emerald-500 mb-2">5</div>
            <div className="text-[10px] font-bold tracking-widest text-slate-500 uppercase leading-relaxed">Protections<br/>Found</div>
          </div>
          <div className="bg-[#0f0f0f] border border-white/5 rounded-xl p-6 flex flex-col justify-between">
            <div className="text-3xl font-bold text-blue-400 mb-2">10</div>
            <div className="text-[10px] font-bold tracking-widest text-slate-500 uppercase leading-relaxed">Provisions<br/>Analyzed</div>
          </div>
        </div>

        {/* Section 1: Executive Summary */}
        <section className="mb-24">
          <div className="text-xs font-bold tracking-[0.2em] text-blue-500 mb-4 uppercase">Section 1</div>
          <h2 className="text-3xl font-bold text-white mb-8 tracking-tight">Executive Summary</h2>
          
          <div className="bg-[#111] border-l-4 border-rose-500 p-8 rounded-r-xl mb-12 text-lg text-slate-300 leading-relaxed">
            This contract presents severe fiduciary risk. With a score of 38/100, it falls in the Red Flag tier — indicating that the PBM retains significant authority to act against the economic interests of the plan and its participants. Immediate renegotiation is warranted across all major provisions.
          </div>

          <div className="bg-gradient-to-r from-[#051510] to-[#052015] border border-emerald-900/30 rounded-2xl p-8 mb-12 flex flex-col md:flex-row items-center gap-8">
            <div className="text-6xl text-emerald-400"><DollarSign size={64} className="stroke-[2.5]" /></div>
            <div>
              <div className="text-5xl font-bold text-emerald-400 tracking-tight mb-2">$3.6M</div>
              <p className="text-slate-300 text-lg leading-relaxed">
                Estimated annual savings opportunity if all identified gaps are remediated through renegotiation. This represents the cumulative financial impact of spread pricing, unreturned rebates, audit recovery potential, specialty pharmacy excess cost, and administrative fee reduction.
              </p>
            </div>
          </div>

          <h3 className="text-xs font-bold tracking-[0.15em] text-slate-500 mb-6 uppercase">Key Findings</h3>
          
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <ShieldAlert className="text-rose-500 shrink-0 mt-1" size={20} />
              <div className="bg-[#110505] border border-rose-900/30 rounded-xl p-5 flex-1">
                <p className="text-rose-200">No explicit acceptance of fiduciary status or compliance with ERISA fiduciary standards.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <ShieldAlert className="text-rose-500 shrink-0 mt-1" size={20} />
              <div className="bg-[#110505] border border-rose-900/30 rounded-xl p-5 flex-1">
                <p className="text-rose-200">Data ownership rights are insufficiently defined, and PBM retains commercial control over plan data.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 mt-6">
              <AlertTriangle className="text-orange-400 shrink-0 mt-1" size={20} />
              <div className="bg-[#151005] border border-orange-900/30 rounded-xl p-5 flex-1">
                <p className="text-orange-200">Rebate and manufacturer revenue disclosures lack transparency and specificity.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <AlertTriangle className="text-orange-400 shrink-0 mt-1" size={20} />
              <div className="bg-[#151005] border border-orange-900/30 rounded-xl p-5 flex-1">
                <p className="text-orange-200">Audit rights and processes have limited detail and lack sufficient guarantees for independent verification.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Financial Impact Analysis */}
        <section className="mb-24">
          <div className="text-xs font-bold tracking-[0.2em] text-emerald-500 mb-4 uppercase">Section 2</div>
          <h2 className="text-3xl font-bold text-white mb-8 tracking-tight">Financial Impact Analysis</h2>
          <p className="text-slate-400 text-lg mb-12 max-w-3xl leading-relaxed">
            The following savings estimates represent the potential annual financial benefit to the plan if the identified contractual gaps in each provision are remediated through renegotiation.
          </p>

          <div className="space-y-6">
            {/* Impact Item 1 */}
            <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-6">
              <div className="flex justify-between items-end mb-4">
                <div className="flex items-center gap-4">
                  <span className="text-slate-500 font-mono text-sm">02</span>
                  <h3 className="text-xl font-bold text-white">Pass-Through Pharmacy Costs</h3>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-orange-400 tracking-wider uppercase px-2 py-1 bg-orange-400/10 rounded mr-4">Concern (4.0/10)</span>
                  <span className="text-3xl font-bold text-emerald-400">$960K</span>
                </div>
              </div>
              <div className="w-full bg-slate-900 rounded-full h-1.5 mb-4">
                <div className="bg-emerald-400 h-1.5 rounded-full" style={{ width: '27%' }}></div>
              </div>
              <p className="text-slate-500 text-sm">Spread pricing elimination and MAC pricing transparency (27% of total)</p>
            </div>

            {/* Impact Item 2 */}
            <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-6">
              <div className="flex justify-between items-end mb-4">
                <div className="flex items-center gap-4">
                  <span className="text-slate-500 font-mono text-sm">03</span>
                  <h3 className="text-xl font-bold text-white">Rebate & Manufacturer Revenue</h3>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-orange-400 tracking-wider uppercase px-2 py-1 bg-orange-400/10 rounded mr-4">Concern (3.0/10)</span>
                  <span className="text-3xl font-bold text-emerald-400">$583K</span>
                </div>
              </div>
              <div className="w-full bg-slate-900 rounded-full h-1.5 mb-4">
                <div className="bg-emerald-400 h-1.5 rounded-full" style={{ width: '16%' }}></div>
              </div>
              <p className="text-slate-500 text-sm">Full manufacturer revenue pass-through including pooled rebates (16% of total)</p>
            </div>

            {/* Impact Item 3 */}
            <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-6">
              <div className="flex justify-between items-end mb-4">
                <div className="flex items-center gap-4">
                  <span className="text-slate-500 font-mono text-sm">07</span>
                  <h3 className="text-xl font-bold text-white">Carve-Out & Vendor Rights</h3>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-rose-500 tracking-wider uppercase px-2 py-1 bg-rose-500/10 rounded mr-4">Red Flag (2.0/10)</span>
                  <span className="text-3xl font-bold text-emerald-400">$410K</span>
                </div>
              </div>
              <div className="w-full bg-slate-900 rounded-full h-1.5 mb-4">
                <div className="bg-emerald-400 h-1.5 rounded-full" style={{ width: '11%' }}></div>
              </div>
              <p className="text-slate-500 text-sm">Specialty carve-out and competitive vendor flexibility (11% of total)</p>
            </div>
          </div>
        </section>

        {/* Section 4: Deep Dive Provision */}
        <section className="mb-24">
          <div className="text-xs font-bold tracking-[0.2em] text-rose-500 mb-4 uppercase">Section 4 &middot; Provision 1 of 10</div>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 border-b border-white/10 pb-8">
            <div>
              <h2 className="text-4xl font-bold text-white tracking-tight mb-3">Fiduciary Loyalty Commitment</h2>
              <div className="flex items-center gap-3">
                <span className="bg-rose-500 text-white text-xs font-bold px-3 py-1 rounded tracking-widest uppercase">Red Flag</span>
                <span className="text-slate-400 text-sm">0 of 2 requirements met</span>
              </div>
            </div>
            <div className="mt-6 md:mt-0 text-right">
              <div className="text-5xl font-black text-rose-500 mb-1 tracking-tighter">1.5 <span className="text-xl text-slate-500 font-medium">/ 10</span></div>
              <div className="text-xl font-bold text-emerald-400">$174K <span className="text-sm font-normal text-slate-500 block uppercase tracking-widest mt-1">Savings Opp</span></div>
            </div>
          </div>

          <div className="bg-[#111] border border-white/5 rounded-2xl p-8 mb-12">
            <h4 className="text-xs font-bold tracking-[0.15em] text-rose-500 mb-3 uppercase">Why This Provision Matters</h4>
            <p className="text-slate-300 leading-relaxed mb-8">
              CAA 2026 §3101 requires PBM transparency and fiduciary alignment for group health plans. A fiduciary loyalty commitment is the foundational protection for all other contract provisions.
            </p>
            
            <h4 className="text-xs font-bold tracking-[0.15em] text-cyan-500 mb-3 uppercase">Financial Context</h4>
            <p className="text-slate-300 leading-relaxed mb-8">
              Without explicit fiduciary acceptance, the PBM can legally act in its own economic interest — routing volume to owned pharmacies, retaining undisclosed revenue, and making formulary decisions for profit. Plans facing regulatory audit under CAA 2026 without this clause carry significant legal exposure.
            </p>

            <h4 className="text-xs font-bold tracking-[0.15em] text-purple-500 mb-3 uppercase">Fiduciary Significance</h4>
            <p className="text-slate-300 leading-relaxed">
              ERISA §404 creates personal liability for plan fiduciaries who fail to monitor the PBM. A contractual fiduciary commitment shifts this burden and creates a private right of action.
            </p>
          </div>

          {/* Issue Breakdown */}
          <div className="border-l-2 border-rose-500 pl-8 relative">
            <div className="absolute -left-[17px] top-0 bg-[#050505] p-1">
              <AlertCircle className="text-rose-500" size={24} />
            </div>
            
            <h3 className="text-2xl font-bold text-white mb-6">PBM does not explicitly accept fiduciary status in writing.</h3>
            
            <div className="bg-[#1a0505] border border-rose-900/30 rounded-xl p-6 mb-8">
              <h4 className="text-xs font-bold tracking-[0.15em] text-rose-500 mb-3 uppercase">AI Analysis &mdash; What was found in this contract</h4>
              <p className="text-rose-200">Explicit fiduciary status and compliance with ERISA fiduciary duty standards are missing.</p>
            </div>

            <h4 className="text-xs font-bold tracking-[0.15em] text-orange-400 mb-4 uppercase flex items-center gap-2">
              <AlertTriangle size={16} /> How PBMs Exploit This Gap
            </h4>
            <ul className="space-y-4 mb-8 text-slate-300">
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-orange-400/20 text-orange-400 flex items-center justify-center text-xs font-bold">1</span>
                <p>Without a fiduciary loyalty clause, the PBM's contractual obligation is to itself — not the plan. This means every formulary decision, network design choice, and vendor routing decision can legally be made to maximize the PBM's own economic interest.</p>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-orange-400/20 text-orange-400 flex items-center justify-center text-xs font-bold">2</span>
                <p>PBMs exploit this absence by routing volume to their own owned pharmacies, retaining undisclosed manufacturer payments, favoring brand drugs with high rebate revenue over cheaper generics.</p>
              </li>
            </ul>

            <div className="bg-gradient-to-r from-[#051510] to-[#052015] border border-emerald-900/30 rounded-xl p-6 mb-8">
              <h4 className="text-xs font-bold tracking-[0.15em] text-emerald-400 mb-3 uppercase flex items-center gap-2">
                <DollarSign size={16} /> Dollar Impact &mdash; How this costs your plan
              </h4>
              <p className="text-emerald-100/80 leading-relaxed">
                Fiduciary misalignment allows the PBM to legally capture an estimated 3–8% of total drug spend in undisclosed revenue. For a $3M drug spend plan, this represents $90,000–$240,000 per year in value diverted from the plan to the PBM.
              </p>
            </div>

            <h4 className="text-xs font-bold tracking-[0.15em] text-rose-500 mb-4 uppercase flex items-center gap-2">
              <ShieldAlert size={16} /> Red-Flag Language Found In Your Contract
            </h4>
            <div className="space-y-3 mb-8">
              <div className="bg-[#111] border border-rose-900/50 rounded-lg p-4 font-mono text-sm text-rose-300/80">
                "PBM acts as an independent contractor and not as a fiduciary of the Plan"
              </div>
              <div className="bg-[#111] border border-rose-900/50 rounded-lg p-4 font-mono text-sm text-rose-300/80">
                "Nothing in this Agreement shall create a fiduciary relationship between PBM and Plan"
              </div>
            </div>

            <div className="bg-[#05101a] border border-cyan-900/50 rounded-xl p-6">
              <h4 className="text-xs font-bold tracking-[0.15em] text-cyan-400 mb-4 uppercase flex items-center gap-2">
                <Lock size={16} /> Required Fix &mdash; Add this language to the contract
              </h4>
              <div className="font-mono text-sm text-cyan-300/90 leading-relaxed bg-[#020810] p-5 rounded-lg border border-cyan-900/30">
                Add: "PBM acknowledges it is acting as a functional fiduciary of the Plan within the meaning of ERISA §3(21) with respect to all formulary management, network design, and pricing decisions. PBM shall at all times act in the sole interest of Plan participants and beneficiaries and shall not place its own economic interests above those of the Plan."
              </div>
            </div>
          </div>
        </section>

        {/* Playbook Section */}
        <section className="mb-24">
          <div className="text-xs font-bold tracking-[0.2em] text-orange-400 mb-4 uppercase">Section 14</div>
          <h2 className="text-3xl font-bold text-white mb-8 tracking-tight">Negotiation Playbook</h2>
          <p className="text-slate-400 text-lg mb-12 max-w-3xl leading-relaxed">
            The following is a consolidated negotiation roadmap, ordered by financial impact. Use this as your primary action document in PBM renegotiation meetings.
          </p>

          <div className="space-y-4">
            {/* Playbook Item */}
            <div className="bg-[#0a0a0a] border border-white/10 hover:border-white/20 transition-colors rounded-xl p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-slate-500 font-mono font-bold">#1</span>
                  <h3 className="text-lg font-bold text-white">Provision 2: Pass-Through Pharmacy Costs</h3>
                </div>
                <div className="text-right flex items-center gap-4">
                  <span className="text-[10px] font-bold text-orange-400 tracking-widest uppercase border border-orange-400/20 px-2 py-1 bg-orange-400/5 rounded">Concern</span>
                  <span className="text-xl font-bold text-emerald-400">$960K</span>
                </div>
              </div>
              <div className="bg-[#111] rounded-lg p-4 mb-4 flex items-start gap-3">
                <ArrowRight className="text-orange-400 shrink-0 mt-0.5" size={16} />
                <p className="text-slate-300 italic">"Stress the importance of fair pricing and access for plan participants."</p>
              </div>
              <p className="text-sm text-slate-500"><span className="font-bold text-slate-400">Gap:</span> Ambiguities around cost pass-through and MAC transparency.</p>
            </div>

            {/* Playbook Item */}
            <div className="bg-[#0a0a0a] border border-white/10 hover:border-white/20 transition-colors rounded-xl p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-slate-500 font-mono font-bold">#2</span>
                  <h3 className="text-lg font-bold text-white">Provision 3: Rebate & Manufacturer Revenue</h3>
                </div>
                <div className="text-right flex items-center gap-4">
                  <span className="text-[10px] font-bold text-orange-400 tracking-widest uppercase border border-orange-400/20 px-2 py-1 bg-orange-400/5 rounded">Concern</span>
                  <span className="text-xl font-bold text-emerald-400">$583K</span>
                </div>
              </div>
              <div className="bg-[#111] rounded-lg p-4 mb-4 flex items-start gap-3">
                <ArrowRight className="text-orange-400 shrink-0 mt-0.5" size={16} />
                <p className="text-slate-300 italic">"Ensure alignment with plan's cost-management goals and audit readiness for compliance."</p>
              </div>
              <p className="text-sm text-slate-500"><span className="font-bold text-slate-400">Gap:</span> Rebate transparency and allocation need clarity and commitment.</p>
            </div>
            
            {/* Playbook Item */}
            <div className="bg-[#0a0a0a] border border-rose-900/30 hover:border-rose-900/60 transition-colors rounded-xl p-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-rose-500" />
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-slate-500 font-mono font-bold">#4</span>
                  <h3 className="text-lg font-bold text-white">Provision 7: Carve-Out & Vendor Rights</h3>
                </div>
                <div className="text-right flex items-center gap-4">
                  <span className="text-[10px] font-bold text-rose-500 tracking-widest uppercase border border-rose-500/20 px-2 py-1 bg-rose-500/5 rounded">Red Flag</span>
                  <span className="text-xl font-bold text-emerald-400">$410K</span>
                </div>
              </div>
              <div className="bg-[#111] rounded-lg p-4 mb-4 flex items-start gap-3">
                <ArrowRight className="text-rose-500 shrink-0 mt-0.5" size={16} />
                <p className="text-slate-300 italic">"Focus on ensuring plan flexibility and adaptability for managing specialty drugs."</p>
              </div>
              <p className="text-sm text-slate-500"><span className="font-bold text-slate-400">Gap:</span> Carve-out and vendor flexibility for specialty drugs are not supported.</p>
            </div>
          </div>
        </section>

        {/* Disclaimer Footer */}
        <div className="border-t border-white/10 pt-12 text-center pb-12">
          <p className="text-xs text-slate-600 uppercase tracking-widest font-bold mb-4">
            Kincaid IQ &mdash; Strictly Confidential &middot; Account SHRACK-7742
          </p>
          <p className="text-[10px] text-slate-700 max-w-4xl mx-auto leading-relaxed">
            IMPORTANT DISCLAIMER: This report is for informational purposes only and does not constitute legal advice. Savings estimates are projections based on industry data and should not be relied upon as guarantees of actual savings. Plan fiduciaries should consult qualified ERISA counsel before making contractual decisions based on this analysis. Kincaid IQ makes no representation as to the legal enforceability of any model contract language provided herein.
          </p>
        </div>

      </main>
      
      <SiteFooter />
    </div>
  );
}