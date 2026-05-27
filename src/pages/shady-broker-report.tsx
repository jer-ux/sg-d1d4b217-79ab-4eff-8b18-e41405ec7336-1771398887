import { useState } from "react";
import { motion } from "framer-motion";
import { Check, FileText, Shield, TrendingDown, Users, Building2, AlertCircle, Download, ChevronRight, Clock, DollarSign, ExternalLink } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";
import Nav from "@/components/Nav";

export default function ShadyBrokerReport() {
  const [showCheckout, setShowCheckout] = useState(false);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.2, ease: "easeOut" }
  };

  return (
    <>
      <SEO 
        title="The Shady Broker Report | Kincaid Risk Management Co."
        description="A 24-page forensic dossier on what your broker is not telling you. Anchored to a 757,294-row benchmark index. Delivered in 10 business days."
        image="/og-shady-broker-report.png"
      />
      
      <div className="min-h-screen bg-[#FAF8F5]">
        <Nav />
        
        {/* Hero Section */}
        <section className="pt-32 pb-24 px-6">
          <div className="max-w-[1120px] mx-auto">
            <div className="grid grid-cols-12 gap-8">
              <div className="col-span-12 md:col-span-7">
                <motion.div {...fadeIn}>
                  <div className="font-mono text-xs tracking-wider text-[#8C1515] mb-6">
                    KINCAID IQ / FORENSIC SERIES
                  </div>
                  
                  <h1 className="font-serif font-semibold text-6xl md:text-7xl leading-[1.1] text-[#0B1220] mb-6">
                    The Shady Broker Report
                  </h1>
                  
                  <p className="font-serif text-2xl text-[#5B6472] mb-8 leading-relaxed">
                    A 24-page forensic dossier on what your broker is not telling you. Anchored to a 757,294-row benchmark index. Delivered in 10 business days.
                  </p>
                  
                  <div className="font-mono text-sm text-[#0B1220] mb-10">
                    $4,500 USD / one-time / board-ready
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      onClick={() => setShowCheckout(true)}
                      className="bg-[#8C1515] text-[#FAF8F5] hover:bg-[#8C1515]/90 px-8 py-6 text-base font-sans"
                    >
                      Commission the report
                    </Button>
                    
                    <Link 
                      href="/shady-broker-report-sample.pdf"
                      className="text-[#0B1220] underline hover:text-[#8C1515] transition-colors py-6 px-4 text-base font-sans inline-flex items-center gap-2"
                    >
                      Read a redacted sample
                      <ExternalLink className="w-4 h-4" />
                    </Link>
                  </div>
                </motion.div>
              </div>
              
              <div className="col-span-12 md:col-span-5">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="relative aspect-[4/3] rounded-lg overflow-hidden"
                >
                  <img
                    src="/generated/boardroom-morning.png"
                    alt="Empty boardroom at dawn"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-[#8C1515]/20 to-[#0B1220]/30 mix-blend-multiply" />
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="max-w-[1120px] mx-auto px-6">
          <div className="h-px bg-[#EDE6D6]" />
        </div>

        {/* The Problem Section */}
        <section className="py-32 px-6">
          <div className="max-w-[1120px] mx-auto">
            <motion.h2
              {...fadeIn}
              className="font-serif font-semibold text-4xl md:text-5xl text-[#0B1220] mb-16 max-w-4xl"
            >
              The compensation your broker discloses is not the compensation your broker receives.
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div {...fadeIn}>
                <p className="font-sans text-base leading-relaxed text-[#0B1220]">
                  ERISA Section 408(b)(2) requires service providers to disclose direct and indirect compensation. Most brokers comply with the letter of the requirement by listing their base commission on Schedule A of the Form 5500.
                </p>
              </motion.div>
              
              <motion.div {...fadeIn} transition={{ delay: 0.1 }}>
                <p className="font-sans text-base leading-relaxed text-[#0B1220]">
                  What rarely appears: carrier-paid overrides, contingent bonuses tied to renewal retention, volume-based compensation pools, PBM rebate sharing agreements, and indirect payments routed through affiliated entities. These mechanisms are not illegal. They are simply not disclosed in a format plan fiduciaries can audit.
                </p>
              </motion.div>
              
              <motion.div {...fadeIn} transition={{ delay: 0.2 }}>
                <p className="font-sans text-base leading-relaxed text-[#0B1220]">
                  The Consolidated Appropriations Act (CAA) of 2021 expanded fiduciary obligations to include ongoing monitoring of service provider compensation reasonableness. The problem is structural: plan sponsors cannot monitor what they cannot see, and they cannot see what is not systematically disclosed.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="max-w-[1120px] mx-auto px-6">
          <div className="h-px bg-[#EDE6D6]" />
        </div>

        {/* Method Section */}
        <section className="py-32 px-6">
          <div className="max-w-[1120px] mx-auto">
            <motion.h2
              {...fadeIn}
              className="font-serif font-semibold text-4xl md:text-5xl text-[#0B1220] mb-16"
            >
              Method
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
              {[
                {
                  number: "01",
                  title: "Ingest",
                  description: "Form 5500, Schedule A, broker disclosures, PBM contracts, claims summaries"
                },
                {
                  number: "02",
                  title: "Anchor",
                  description: "Every claim tied to a source document via the Evidence Spine Protocol"
                },
                {
                  number: "03",
                  title: "Benchmark",
                  description: "Plan cost normalized to PEPY, PMPM, PEPM and compared against the Kincaid IQ EFAST2 Index plus Mercer, KFF, Milliman validators"
                },
                {
                  number: "04",
                  title: "Verify",
                  description: "Six constitutional agents run a 7-Gate Enforcement Chain before any figure is allowed into the final PDF"
                }
              ].map((step, index) => (
                <motion.div
                  key={step.number}
                  {...fadeIn}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  <div className="font-mono text-2xl text-[#8C1515] mb-3">{step.number}</div>
                  <div className="font-serif font-semibold text-xl text-[#0B1220] mb-2">{step.title}</div>
                  <p className="font-sans text-sm leading-relaxed text-[#5B6472]">{step.description}</p>
                  
                  {index < 3 && (
                    <div className="hidden md:block absolute top-8 -right-4 w-8 h-px bg-[#EDE6D6]" />
                  )}
                </motion.div>
              ))}
            </div>
            
            <motion.p
              {...fadeIn}
              className="font-serif italic text-lg text-[#5B6472] text-center"
            >
              No anchor, no claim. No lineage, no publish.
            </motion.p>
          </div>
        </section>

        {/* Divider */}
        <div className="max-w-[1120px] mx-auto px-6">
          <div className="h-px bg-[#EDE6D6]" />
        </div>

        {/* What You Receive Section */}
        <section className="py-32 px-6">
          <div className="max-w-[1120px] mx-auto">
            <motion.h2
              {...fadeIn}
              className="font-serif font-semibold text-4xl md:text-5xl text-[#0B1220] mb-16"
            >
              The deliverable
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              <motion.div {...fadeIn}>
                <div className="grid grid-cols-3 gap-4">
                  {[1, 2, 3, 4, 5, 6].map((page) => (
                    <div
                      key={page}
                      className="aspect-[8.5/11] bg-white border border-[#EDE6D6] rounded flex items-center justify-center"
                    >
                      <span className="font-mono text-xs text-[#5B6472]">Page {page}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
              
              <motion.div {...fadeIn} transition={{ delay: 0.1 }}>
                <ol className="space-y-3 font-sans text-base text-[#0B1220]">
                  <li className="flex items-start gap-3">
                    <span className="font-mono text-[#5B6472] min-w-[2rem]">01</span>
                    <span>Cover</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="font-mono text-[#5B6472] min-w-[2rem]">02</span>
                    <span>Executive Snapshot</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="font-mono text-[#5B6472] min-w-[2rem]">03</span>
                    <span>Problem Statement</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="font-mono text-[#5B6472] min-w-[2rem]">04</span>
                    <span>Data Provenance</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="font-mono text-[#5B6472] min-w-[2rem]">05</span>
                    <span>Benchmark Comparator</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="font-mono text-[#5B6472] min-w-[2rem]">06</span>
                    <span>Shadow Tax Quantification</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="font-mono text-[#5B6472] min-w-[2rem]">07</span>
                    <span>Predictive Scenarios</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="font-mono text-[#5B6472] min-w-[2rem]">08</span>
                    <span>Risk Map</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="font-mono text-[#5B6472] min-w-[2rem]">09</span>
                    <span>Fiduciary Levers</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="font-mono text-[#5B6472] min-w-[2rem]">10</span>
                    <span>Synthesis</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="font-mono text-[#5B6472] min-w-[2rem]">11</span>
                    <span>Roadmap</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="font-mono text-[#5B6472] min-w-[2rem]">12</span>
                    <span>Principals</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="font-mono text-[#5B6472] min-w-[2rem]">13</span>
                    <span>Verdict</span>
                  </li>
                </ol>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="max-w-[1120px] mx-auto px-6">
          <div className="h-px bg-[#EDE6D6]" />
        </div>

        {/* Evidence Layer Section */}
        <section className="py-32 px-6">
          <div className="max-w-[1120px] mx-auto">
            <motion.h2
              {...fadeIn}
              className="font-serif font-semibold text-4xl md:text-5xl text-[#0B1220] mb-16"
            >
              Why the numbers hold up in a deposition
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-12">
              <motion.div {...fadeIn} className="space-y-4">
                <div className="flex items-baseline gap-4">
                  <span className="font-mono text-sm text-[#5B6472] min-w-[12rem]">Benchmark index size</span>
                  <span className="font-mono text-sm text-[#0B1220]">757,294 rows</span>
                </div>
                <div className="flex items-baseline gap-4">
                  <span className="font-mono text-sm text-[#5B6472] min-w-[12rem]">Source</span>
                  <span className="font-mono text-sm text-[#0B1220]">DOL EFAST2 public filings, multi-vintage</span>
                </div>
                <div className="flex items-baseline gap-4">
                  <span className="font-mono text-sm text-[#5B6472] min-w-[12rem]">Validators</span>
                  <span className="font-mono text-sm text-[#0B1220]">Mercer NSEHBP, KFF Employer Health Benefits Survey, Milliman Medical Index</span>
                </div>
              </motion.div>
              
              <motion.div {...fadeIn} transition={{ delay: 0.1 }} className="space-y-4">
                <div className="flex items-baseline gap-4">
                  <span className="font-mono text-sm text-[#5B6472] min-w-[12rem]">Engine</span>
                  <span className="font-mono text-sm text-[#0B1220]">Verify Multi-Agent (6 constitutional agents)</span>
                </div>
                <div className="flex items-baseline gap-4">
                  <span className="font-mono text-sm text-[#5B6472] min-w-[12rem]">Enforcement</span>
                  <span className="font-mono text-sm text-[#0B1220]">7-Gate Chain</span>
                </div>
                <div className="flex items-baseline gap-4">
                  <span className="font-mono text-sm text-[#5B6472] min-w-[12rem]">Lineage primitive</span>
                  <span className="font-mono text-sm text-[#0B1220]">EvidenceRef / TransformRef / PolicyResult / Claim</span>
                </div>
              </motion.div>
            </div>
            
            <motion.p
              {...fadeIn}
              className="font-serif text-lg text-[#0B1220]"
            >
              Every figure in the report is traceable to a source document. That is the entire point.
            </motion.p>
          </div>
        </section>

        {/* Divider */}
        <div className="max-w-[1120px] mx-auto px-6">
          <div className="h-px bg-[#EDE6D6]" />
        </div>

        {/* Who This Is For Section */}
        <section className="py-32 px-6">
          <div className="max-w-[1120px] mx-auto">
            <motion.h2
              {...fadeIn}
              className="font-serif font-semibold text-4xl md:text-5xl text-[#0B1220] mb-16"
            >
              Commissioned by
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  title: "CFOs and CHROs at self-funded employers",
                  description: "Plan fiduciaries seeking to quantify the total cost of broker and PBM relationships across all compensation layers."
                },
                {
                  title: "Private equity operating partners",
                  description: "Portfolio company oversight teams auditing benefit plan efficiency and fiduciary compliance during hold period management."
                },
                {
                  title: "Plan fiduciaries and benefits committees",
                  description: "Committee members discharging their duty of prudence under ERISA Section 404(a)(1)(B) and CAA 2021 disclosure requirements."
                },
                {
                  title: "General counsel and ERISA litigators",
                  description: "Legal teams preparing for fiduciary breach claims, building defense against participant lawsuits, or establishing damages in service provider disputes."
                }
              ].map((audience, index) => (
                <motion.div
                  key={audience.title}
                  {...fadeIn}
                  transition={{ delay: index * 0.1 }}
                  className="border-l-2 border-[#8C1515] pl-6"
                >
                  <h3 className="font-serif font-semibold text-xl text-[#0B1220] mb-3">{audience.title}</h3>
                  <p className="font-sans text-base leading-relaxed text-[#5B6472]">{audience.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="max-w-[1120px] mx-auto px-6">
          <div className="h-px bg-[#EDE6D6]" />
        </div>

        {/* Pricing and Timeline Section */}
        <section className="py-32 px-6">
          <div className="max-w-[1120px] mx-auto">
            <motion.h2
              {...fadeIn}
              className="font-serif font-semibold text-4xl md:text-5xl text-[#0B1220] mb-16"
            >
              Engagement
            </motion.h2>
            
            <motion.div {...fadeIn} className="mb-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-6 font-sans text-base">
                <div className="flex justify-between py-4 border-b border-[#EDE6D6]">
                  <span className="text-[#5B6472]">Price</span>
                  <span className="text-[#0B1220] font-medium">$4,500 USD, one-time</span>
                </div>
                <div className="flex justify-between py-4 border-b border-[#EDE6D6]">
                  <span className="text-[#5B6472]">Turnaround</span>
                  <span className="text-[#0B1220] font-medium">10 business days from intake completion</span>
                </div>
                <div className="flex justify-between py-4 border-b border-[#EDE6D6]">
                  <span className="text-[#5B6472]">Format</span>
                  <span className="text-[#0B1220] font-medium">24-page PDF, board-ready, evidence appendix</span>
                </div>
                <div className="flex justify-between py-4 border-b border-[#EDE6D6]">
                  <span className="text-[#5B6472]">Confidentiality</span>
                  <span className="text-[#0B1220] font-medium">NDA executed at intake, mutual</span>
                </div>
                <div className="flex justify-between py-4 border-b border-[#EDE6D6] md:col-span-2">
                  <span className="text-[#5B6472]">Revisions</span>
                  <span className="text-[#0B1220] font-medium">One round of clarification calls included</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div {...fadeIn} className="text-center">
              <Button
                onClick={() => setShowCheckout(true)}
                className="bg-[#8C1515] text-[#FAF8F5] hover:bg-[#8C1515]/90 px-8 py-6 text-base font-sans"
              >
                Commission the report
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Divider */}
        <div className="max-w-[1120px] mx-auto px-6">
          <div className="h-px bg-[#EDE6D6]" />
        </div>

        {/* Humanitarian Close Section */}
        <section className="py-32 px-6 bg-[#EDE6D6]">
          <div className="max-w-[1120px] mx-auto">
            <motion.div
              {...fadeIn}
              className="max-w-3xl mx-auto text-center"
            >
              <p className="font-serif text-2xl md:text-3xl leading-relaxed text-[#0B1220]">
                Every dollar of Shadow Tax comes from somewhere. It comes from a paycheck. It comes from a copay a family did not budget for. It comes from a retiree comparing two prescription prices at the pharmacy counter. This report exists so that the people whose names never appear on the contract are no longer the ones paying for its opacity.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-16 px-6 bg-[#FAF8F5]">
          <div className="max-w-[1120px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
              <div>
                <h3 className="font-serif font-semibold text-lg text-[#0B1220] mb-4">Kincaid Risk Management Co.</h3>
                <p className="font-sans text-base text-[#5B6472]">Carmel, Indiana</p>
              </div>
              
              <div>
                <h3 className="font-serif font-semibold text-lg text-[#0B1220] mb-4">Contact</h3>
                <a href="mailto:jer@kincaidrmc.com" className="font-sans text-base text-[#5B6472] hover:text-[#8C1515] transition-colors">
                  jer@kincaidrmc.com
                </a>
              </div>
              
              <div>
                <h3 className="font-serif font-semibold text-lg text-[#0B1220] mb-4">Links</h3>
                <div className="flex flex-col gap-2">
                  <a href="https://www.linkedin.com/company/kincaid-iq" target="_blank" rel="noopener noreferrer" className="font-sans text-base text-[#5B6472] hover:text-[#8C1515] transition-colors">
                    LinkedIn
                  </a>
                  <a href="https://kincaidrmc.substack.com" target="_blank" rel="noopener noreferrer" className="font-sans text-base text-[#5B6472] hover:text-[#8C1515] transition-colors">
                    Substack
                  </a>
                  <a href="https://kincaidrmc.com" target="_blank" rel="noopener noreferrer" className="font-sans text-base text-[#5B6472] hover:text-[#8C1515] transition-colors">
                    kincaidrmc.com
                  </a>
                </div>
              </div>
            </div>
            
            <div className="pt-8 border-t border-[#EDE6D6]">
              <p className="font-mono text-xs text-[#5B6472] text-center">
                Kincaid IQ / Forensic Series / v1.0
              </p>
            </div>
          </div>
        </footer>
      </div>

      {showCheckout && (
        <CheckoutModal onClose={() => setShowCheckout(false)} />
      )}
    </>
  );
}

function CheckoutModal({ onClose }: { onClose: () => void }) {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    
    try {
      const response = await fetch("/api/shady-broker-report/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" }
      });

      const { url } = await response.json();
      
      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      console.error("Checkout error:", error);
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-[#0B1220]/50 backdrop-blur-sm z-[300] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-[#FAF8F5] max-w-2xl w-full rounded-lg p-12 relative"
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-[#5B6472] hover:text-[#0B1220] transition-colors"
          aria-label="Close"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="text-center mb-8">
          <div className="font-mono text-xs tracking-wider text-[#8C1515] mb-4">
            PAYMENT REQUIRED
          </div>
          <h2 className="font-serif font-semibold text-4xl text-[#0B1220] mb-4">
            Commission the report
          </h2>
          <p className="font-sans text-lg text-[#5B6472]">
            You will be redirected to Stripe to complete your payment securely.
          </p>
        </div>

        <div className="bg-white border border-[#EDE6D6] rounded-lg p-8 mb-8">
          <div className="flex justify-between items-baseline mb-6">
            <span className="font-serif text-xl text-[#0B1220]">The Shady Broker Report</span>
            <span className="font-mono text-2xl text-[#0B1220]">$4,500</span>
          </div>
          
          <div className="space-y-3 text-sm font-sans text-[#5B6472]">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#8C1515]" />
              <span>24-page forensic dossier</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#8C1515]" />
              <span>10 business day turnaround</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#8C1515]" />
              <span>Board-ready PDF with evidence appendix</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#8C1515]" />
              <span>One round of clarification calls</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#8C1515]" />
              <span>Mutual NDA protection</span>
            </div>
          </div>
        </div>

        <Button
          onClick={handleCheckout}
          disabled={loading}
          className="w-full bg-[#8C1515] text-[#FAF8F5] hover:bg-[#8C1515]/90 px-8 py-6 text-base font-sans"
        >
          {loading ? "Redirecting to Stripe..." : "Proceed to payment"}
        </Button>
        
        <p className="text-center text-xs text-[#5B6472] mt-6 font-sans">
          Payment processed securely by Stripe. Tax calculated automatically. You will receive a receipt and intake form link upon successful payment.
        </p>
      </motion.div>
    </div>
  );
}