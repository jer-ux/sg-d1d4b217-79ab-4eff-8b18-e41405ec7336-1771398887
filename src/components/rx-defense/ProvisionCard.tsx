import { AlertCircle, ArrowRight, DollarSign, ShieldAlert, Lock, AlertTriangle } from "lucide-react";
import { LucideIcon } from "lucide-react";

interface Issue {
  title: string;
  found: string;
  exploits: string[];
  impact: string;
  redFlags: string[];
  fix: string;
}

interface Provision {
  id: number;
  title: string;
  score: number;
  savings: string;
  status: string;
  statusColor: string;
  bgStatusColor: string;
  met: string;
  why: string;
  financial: string;
  fiduciary: string;
  issues: Issue[];
}

interface ProvisionCardProps {
  provision: Provision;
  icon: LucideIcon;
}

export function ProvisionCard({ provision, icon: Icon }: ProvisionCardProps) {
  return (
    <section className="mb-24">
      <div className={`text-xs font-bold tracking-[0.2em] ${provision.statusColor} mb-4 uppercase`}>
        Provision {provision.id} of 10
      </div>
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 border-b border-white/10 pb-8">
        <div>
          <h2 className="text-4xl font-bold text-white tracking-tight mb-3">{provision.title}</h2>
          <div className="flex items-center gap-3">
            <span className={`${provision.bgStatusColor} text-black text-xs font-bold px-3 py-1 rounded tracking-widest uppercase`}>
              {provision.status}
            </span>
            <span className="text-slate-400 text-sm">{provision.met}</span>
          </div>
        </div>
        <div className="mt-6 md:mt-0 text-right">
          <div className={`text-5xl font-black ${provision.statusColor} mb-1 tracking-tighter`}>
            {provision.score.toFixed(1)} <span className="text-xl text-slate-500 font-medium">/ 10</span>
          </div>
          <div className="text-xl font-bold text-emerald-400">
            {provision.savings} <span className="text-sm font-normal text-slate-500 block uppercase tracking-widest mt-1">Savings Opp</span>
          </div>
        </div>
      </div>

      <div className="bg-[#111] border border-white/5 rounded-2xl p-8 mb-12">
        <h4 className={`text-xs font-bold tracking-[0.15em] ${provision.statusColor} mb-3 uppercase`}>
          Why This Provision Matters
        </h4>
        <p className="text-slate-300 leading-relaxed mb-8">{provision.why}</p>
        
        <h4 className="text-xs font-bold tracking-[0.15em] text-cyan-500 mb-3 uppercase">Financial Context</h4>
        <p className="text-slate-300 leading-relaxed mb-8">{provision.financial}</p>

        <h4 className="text-xs font-bold tracking-[0.15em] text-purple-500 mb-3 uppercase">Fiduciary Significance</h4>
        <p className="text-slate-300 leading-relaxed">{provision.fiduciary}</p>
      </div>

      {provision.issues.map((issue, issueIdx) => (
        <div key={issueIdx} className={`border-l-2 border-rose-500 pl-8 relative ${issueIdx > 0 ? 'mt-16' : ''}`}>
          <div className="absolute -left-[17px] top-0 bg-[#050505] p-1">
            <AlertCircle className="text-rose-500" size={24} />
          </div>
          
          <h3 className="text-2xl font-bold text-white mb-6">{issue.title}</h3>
          
          <div className="bg-[#1a0505] border border-rose-900/30 rounded-xl p-6 mb-8">
            <h4 className="text-xs font-bold tracking-[0.15em] text-rose-500 mb-3 uppercase">
              AI Analysis — What was found in this contract
            </h4>
            <p className="text-rose-200">{issue.found}</p>
          </div>

          <h4 className="text-xs font-bold tracking-[0.15em] text-orange-400 mb-4 uppercase flex items-center gap-2">
            <AlertTriangle size={16} /> How PBMs Exploit This Gap
          </h4>
          <ul className="space-y-4 mb-8 text-slate-300">
            {issue.exploits.map((exploit, idx) => (
              <li key={idx} className="flex gap-4">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-orange-400/20 text-orange-400 flex items-center justify-center text-xs font-bold">
                  {idx + 1}
                </span>
                <p>{exploit}</p>
              </li>
            ))}
          </ul>

          <div className="bg-gradient-to-r from-[#051510] to-[#052015] border border-emerald-900/30 rounded-xl p-6 mb-8">
            <h4 className="text-xs font-bold tracking-[0.15em] text-emerald-400 mb-3 uppercase flex items-center gap-2">
              <DollarSign size={16} /> Dollar Impact — How this costs your plan
            </h4>
            <p className="text-emerald-100/80 leading-relaxed">{issue.impact}</p>
          </div>

          <h4 className="text-xs font-bold tracking-[0.15em] text-rose-500 mb-4 uppercase flex items-center gap-2">
            <ShieldAlert size={16} /> Red-Flag Language Found In Your Contract
          </h4>
          <div className="space-y-3 mb-8">
            {issue.redFlags.map((flag, idx) => (
              <div key={idx} className="bg-[#111] border border-rose-900/50 rounded-lg p-4 font-mono text-sm text-rose-300/80">
                {flag}
              </div>
            ))}
          </div>

          <div className="bg-[#05101a] border border-cyan-900/50 rounded-xl p-6">
            <h4 className="text-xs font-bold tracking-[0.15em] text-cyan-400 mb-4 uppercase flex items-center gap-2">
              <Lock size={16} /> Required Fix — Add this language to the contract
            </h4>
            <div className="font-mono text-sm text-cyan-300/90 leading-relaxed bg-[#020810] p-5 rounded-lg border border-cyan-900/30 whitespace-pre-line">
              {issue.fix}
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}