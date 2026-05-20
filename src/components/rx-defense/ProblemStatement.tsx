import { AlertCircle, TrendingDown, FileX, ShieldAlert } from "lucide-react";

const problems = [
  {
    icon: <AlertCircle className="w-6 h-6" />,
    title: "Hidden Spread Pricing",
    description: "PBMs mark up drug costs 20-400% while claiming they're saving you money. Your contract allows it.",
    impact: "$2.4M average annual leakage",
  },
  {
    icon: <TrendingDown className="w-6 h-6" />,
    title: "Contract Leakage",
    description: "89% of pharmacy contracts have material gaps that PBMs exploit for profit while your members pay more.",
    impact: "$180 per employee per year",
  },
  {
    icon: <FileX className="w-6 h-6" />,
    title: "Audit Rights Watered Down",
    description: "Your contract limits when, how, and what you can audit. PBMs wrote these clauses — not your lawyers.",
    impact: "3-5 year discovery delay",
  },
  {
    icon: <ShieldAlert className="w-6 h-6" />,
    title: "Fiduciary Blind Spots",
    description: "ERISA requires prudent oversight. Your current contract makes that legally impossible to demonstrate.",
    impact: "DOL audit exposure",
  },
];

export function ProblemStatement() {
  return (
    <section id="the-problem" className="py-24 bg-[#070B12]">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            The Problem Nobody Wants to Talk About
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Your PBM contract isn't protecting you — it's protecting them. Here's what's hiding in the fine print.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {problems.map((problem, index) => (
            <ProblemCard key={index} {...problem} />
          ))}
        </div>

        <div className="mt-16 p-8 bg-gradient-to-r from-red-900/20 to-orange-900/20 border border-red-500/30 rounded-2xl">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-red-400" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">The Real Cost</h3>
              <p className="text-white/80 text-lg mb-4">
                A mid-sized employer with 2,000 covered lives loses an average of <span className="font-bold text-red-400">$360,000 annually</span> to 
                contract leakage alone. Over a typical 3-year contract term, that's <span className="font-bold text-red-400">$1.08M</span> straight to PBM profit margins.
              </p>
              <p className="text-white/70">
                And that's just spread pricing. Add DIR fees, rebate retention, formulary steering, and specialty carve-outs — 
                the actual number is often 3-5x higher.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProblemCard({ icon, title, description, impact }: {
  icon: React.ReactNode;
  title: string;
  description: string;
  impact: string;
}) {
  return (
    <div className="group bg-gradient-to-br from-[#0a1520] to-[#050a10] border border-cyan-900/30 hover:border-cyan-700/50 rounded-2xl p-8 transition-all">
      <div className="flex items-start gap-4 mb-4">
        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center text-red-400 group-hover:bg-red-500/20 transition-colors">
          {icon}
        </div>
        <div>
          <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
          <p className="text-white/70 mb-4">{description}</p>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30">
            <span className="text-sm font-semibold text-red-400">{impact}</span>
          </div>
        </div>
      </div>
    </div>
  );
}