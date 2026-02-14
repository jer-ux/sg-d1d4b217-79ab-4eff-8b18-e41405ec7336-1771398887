import { HelpCircle, ChevronDown } from "lucide-react";
import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FAQ() {
  const faqs = [
    {
      question: "What is credibility weighting?",
      answer: "Credibility weighting is an actuarial technique that blends your group's historical experience with industry benchmarks. For smaller groups (<1,000 lives), we weight industry data more heavily to protect against statistical noise. Formula: Z = √(n/N) where n = your lives, N = full credibility threshold (1,000)."
    },
    {
      question: "How do you calculate trend decomposition?",
      answer: "We separate your total healthcare trend into three components: Medical Core (typically 6-7%), Pharmacy Core (8-12%), and Catastrophic Load (1-3% for large claims >$100K). This allows us to model interventions on each component independently for more precise forecasting."
    },
    {
      question: "What is PEPM and why does it matter?",
      answer: "Per Employee Per Month (PEPM) normalizes your total healthcare cost across your covered population. Formula: (Medical + Rx + Admin + Stop Loss) / Average Lives / 12. This standardized metric allows apples-to-apples comparison across years and against market benchmarks."
    },
    {
      question: "How accurate are the projections?",
      answer: "Our projections use deterministic actuarial formulas based on your historical claims data. For groups under 500 lives, we apply credibility weighting with industry benchmarks. All assumptions are documented with source lineage. Typical accuracy range: ±3-5% for 1-year projections, wider for multi-year due to external factors."
    },
    {
      question: "What interventions can I model?",
      answer: "Available interventions: PBM optimization (8-12% Rx savings), vendor/carrier switch (5-15% savings), benefit redesign (HDHP migration, 6-10%), stop-loss restructure (8-12%), wellness programs (2-5% long-term), pharmacy carve-outs (15-20%), reference-based pricing (20-30%), and direct contracting (10-18%)."
    },
    {
      question: "Can I upload my own data?",
      answer: "Yes. You can upload census data (employee counts, salaries) and claims data (medical, Rx, admin fees, stop-loss premiums) via CSV or manual entry. You can also upload Form 5500s to auto-extract 3 years of historical data including broker compensation analysis."
    },
    {
      question: "What is broker compensation arbitrage?",
      answer: "We extract broker/consultant compensation from your Form 5500 Schedule C and compare it to fair market value (typically 3-5% of premium). Excess compensation represents extractable value through re-negotiation or transition to transparent fee-for-service models."
    },
    {
      question: "How do I export results for my board?",
      answer: "Click 'Export PDF Report' to generate a board-grade actuarial analysis packet including: executive summary, cost comparison tables, 3-year projection charts, EBITDA impact analysis, and assumptions appendix with full formula lineage. All exports are timestamped and cryptographically signed."
    },
    {
      question: "What is savings durability?",
      answer: "Durability measures whether your cost compression is structural or temporary. We calculate: Durability = Savings_Year_3 / Savings_Year_1. Score >1.5 = structural improvement, ~1.0 = one-time compression, <1.0 = temporary impact. This tells your CFO if savings persist."
    },
    {
      question: "Do you store my data?",
      answer: "Your data is processed in real-time for modeling. We store scenario outputs and assumptions for your reference, but raw claims data is not retained unless you explicitly enable data persistence for multi-year analysis. All data handling complies with HIPAA and SOC 2 standards."
    }
  ];

  return (
    <Card className="border-slate-700 bg-slate-900/50 p-6">
      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-lg bg-blue-500/10 p-2">
          <HelpCircle className="h-5 w-5 text-blue-400" />
        </div>
        <div>
          <h3 className="font-semibold text-white">Frequently Asked Questions</h3>
          <p className="text-sm text-slate-400">Actuarial methodology and platform capabilities</p>
        </div>
      </div>

      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, idx) => (
          <AccordionItem key={idx} value={`item-${idx}`} className="border-slate-700">
            <AccordionTrigger className="text-left text-slate-200 hover:text-white hover:no-underline">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-sm text-slate-400">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Card>
  );
}