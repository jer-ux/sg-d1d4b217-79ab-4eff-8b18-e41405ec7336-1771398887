import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  {
    q: "How does the 48-hour analysis work?",
    a: "Once we receive your fully executed PBM agreement and a 90-day de-identified claims file via our SOC 2 compliant portal, our algorithmic engine extracts all clauses and runs deterministic financial modeling. Within 48 hours, you receive a fiduciary-grade report identifying exact dollar-value leaks."
  },
  {
    q: "What if you don't find any savings?",
    a: "We offer a 3:1 Guarantee: If we identify less than three times your engagement fee in recoverable leakage, the analysis is completely free. To date, we have never had to invoke this clause."
  },
  {
    q: "Is this going to disrupt our current broker relationship?",
    a: "No. We operate purely as an independent auditor and technology layer. Many brokers actually bring us in to help their clients because our forensic findings give them the leverage they need at the renewal table."
  },
  {
    q: "Are you going to try and sell us a new PBM?",
    a: "No. We do not sell pharmacy benefits, we take zero broker commissions, and we have no carrier relationships. Our only fiduciary duty is to the plan."
  }
];

export function FAQSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <section className="mt-32 mb-16 max-w-4xl mx-auto">
      <div className="text-xs font-bold tracking-[0.25em] text-slate-500 mb-6 uppercase text-center">
        Clarifications
      </div>
      <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12 tracking-tight">
        Frequently Asked Questions
      </h2>
      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <div 
            key={i} 
            className="bg-[#0a0a0a] border border-white/10 rounded-xl overflow-hidden transition-all duration-200 hover:border-white/20"
          >
            <button 
              onClick={() => setOpenFaq(openFaq === i ? null : i)}
              className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
            >
              <span className="text-lg font-bold text-white">{faq.q}</span>
              {openFaq === i ? (
                <ChevronUp className="text-cyan-400 flex-shrink-0 ml-4" size={20} />
              ) : (
                <ChevronDown className="text-slate-500 flex-shrink-0 ml-4" size={20} />
              )}
            </button>
            {openFaq === i && (
              <div className="px-6 pb-6 pt-2 border-t border-white/5">
                <p className="text-slate-300 leading-relaxed">{faq.a}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}