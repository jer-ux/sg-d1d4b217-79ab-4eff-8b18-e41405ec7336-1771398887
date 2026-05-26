import { useState } from "react";
import { motion } from "framer-motion";
import { Check, FileText, Shield, Users, Building2, Clock, DollarSign, ChevronRight, X } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default function ShadyBrokerReport() {
  const [showCheckout, setShowCheckout] = useState(false);

  return (
    <>
      <SEO 
        title="The Shady Broker Report | Kincaid Risk Management Co."
        description="A 24-page forensic dossier on what your broker is not telling you. Anchored to a 757,294-row benchmark index. Delivered in 10 business days."
        image="/og-shady-broker-report.png"
      />
      
      <div className="min-h-screen bg-[#FAF8F5]">
        <Nav />
        
        <section className="pt-32 pb-24 px-6">
          <div className="max-w-[1120px] mx-auto">
            <div className="grid grid-cols-12 gap-12 items-center">
              <div className="col-span-12 md:col-span-7">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <div className="font-mono text-xs tracking-wider text-[#8C1515] mb-6">
                    KINCAID IQ / FORENSIC SERIES
                  </div>
                  
                  <h1 className="font-serif font-semibold text-[64px] md:text-[72px] leading-[1.05] text-[#0B1220] mb-6">
                    The Shady Broker Report
                  </h1>
                  
                  <p className="font-serif text-2xl text-[#5B6472] mb-8 leading-[1.5]">
                    A 24-page forensic dossier on what your broker is not telling you. Anchored to a 757,294-row benchmark index. Delivered in 10 business days.
                  </p>
                  
                  <div className="font-mono text-sm text-[#0B1220] mb-10">
                    $4,500 USD / one-time / board-ready
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      onClick={() => setShowCheckout(true)}
                      className="bg-[#8C1515] hover:bg-[#7A1212] text-[#FAF8F5] px-8 py-6 text-base font-medium rounded-none shadow-none"
                    >
                      Commission the report
                    </Button>
                    
                    <Link
                      href="/sample-shady-broker-report.pdf"
                      className="inline-flex items-center justify-center border-b-2 border-[#0B1220] text-[#0B1220] px-8 py-6 text-base font-medium hover:border-[#8C1515] hover:text-[#8C1515] transition-colors"
                    >
                      Read a redacted sample
                    </Link>
                  </div>
                </motion.div>
              </div>
              
              <div className="col-span-12 md:col-span-5">
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
                  className="relative aspect-[4/3] overflow-hidden"
                >
                  <img
                    src="/generated/boardroom-morning.png"
                    alt="Empty boardroom, morning light"
                    className="w-full h-full object-cover grayscale"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-[#8C1515]/15 to-[#0B1220]/25 mix-blend-multiply" />
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-[1120px] mx-auto px-6">
          <div className="h-px bg-[#EDE6D6]" />
        </div>

        <section className="py-32 px-6">
          <div className="max-w-[1120px] mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="font-serif text-[40px] md:text-[48px] text-[#0B1220] mb-16 max-w-4xl leading-[1.15]"
            >
              The compensation your broker discloses is not the compensation your broker receives.
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.2, delay: 0.05, ease: "easeOut" }}
              >
                <p className="text-base leading-[1.6] text-[#0B1220] mb-4">
                  Schedule A documents the direct fees. What it does not document is the carrier override structure, the bonus compensation tied to renewal patterns, and the contingent payments that flow through separate agreements never disclosed to the plan sponsor.
                </p>
                <p className="text-base leading-[1.6] text-[#0B1220]">
                  ERISA 408(b)(2) requires disclosure of all direct and indirect compensation. The disclosure regime, in practice, has been architected to permit opacity.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.2, delay: 0.1, ease: "easeOut" }}
              >
                <p className="text-base leading-[1.6] text-[#0B1220] mb-4">
                  The PBM layer compounds the problem. Rebates are retained, not passed through. Spread pricing creates a second revenue stream invisible to the employer. Specialty pharmacy vertical integration routes high-cost claims through captive channels, extracting margin at every transfer point.
                </p>
                <p className="text-base leading-[1.6] text-[#0B1220]">
                  The broker has no incentive to surface these arrangements. The broker is compensated by the same parties who benefit from the arrangement.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.2, delay: 0.15, ease: "easeOut" }}
              >
                <p className="text-base leading-[1.6] text-[#0B1220] mb-4">
                  The Consolidated Appropriations Act of 2021 elevated plan fiduciaries to a new standard of care. Prudent process is no longer optional. The failure to audit broker and PBM compensation structures is now a measurable breach.
                </p>
                <p className="text-base leading-[1.6] text-[#0B1220]">
                  The Shady Broker Report was built to give plan fiduciaries the evidence required to meet that standard. It is not a summary. It is a forensic accounting.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        <div className="max-w-[1120px] mx-auto px-6">
          <div className="h-px bg-[#EDE6D6]" />
        </div>

        <section className="py-32 px-6">
          <div className="max-w-[1120px] mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="font-serif text-[40px] text-[#0B1220] mb-16"
            >
              Method
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
              {[
                {
                  num: "01",
                  title: "Ingest",
                  desc: "Form 5500, Schedule A, broker disclosures, PBM contracts, claims summaries"
                },
                {
                  num: "02",
                  title: "Anchor",
                  desc: "Every claim tied to a source document via the Evidence Spine Protocol"
                },
                {
                  num: "03",
                  title: "Benchmark",
                  desc: "Plan cost normalized to PEPY, PMPM, PEPM and compared against the Kincaid IQ EFAST2 Index plus Mercer, KFF, Milliman validators"
                },
                {
                  num: "04",
                  title: "Verify",
                  desc: "Six constitutional agents run a 7-Gate Enforcement Chain before any figure is allowed into the final PDF"
                }
              ].map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.2, delay: i * 0.05, ease: "easeOut" }}
                  className="relative"
                >
                  <div className="font-mono text-xs text-[#8C1515] mb-3">
                    {step.num}
                  </div>
                  <h3 className="font-serif text-xl text-[#0B1220] mb-3">
                    {step.title}
                  </h3>
                  <p className="text-sm leading-[1.6] text-[#5B6472]">
                    {step.desc}
                  </p>
                  {i < 3 && (
                    <div className="hidden md:block absolute top-8 left-full w-8 h-px bg-[#EDE6D6]" />
                  )}
                </motion.div>
              ))}
            </div>
            
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.2, delay: 0.2, ease: "easeOut" }}
              className="font-serif italic text-lg text-[#5B6472] text-center"
            >
              No anchor, no claim. No lineage, no publish.
            </motion.p>
          </div>
        </section>

        <div className="max-w-[1120px] mx-auto px-6">
          <div className="h-px bg-[#EDE6D6]" />
        </div>

        <section className="py-32 px-6">
          <div className="max-w-[1120px] mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="font-serif text-[40px] text-[#0B1220] mb-16"
            >
              The deliverable
            </motion.h2>
            
            <div className="grid grid-cols-12 gap-12">
              <div className="col-span-12 md:col-span-5">
                <div className="grid grid-cols-2 gap-4">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="aspect-[8.5/11] bg-[#EDE6D6] border border-[#0B1220]/10" />
                  ))}
                </div>
              </div>
              
              <div className="col-span-12 md:col-span-7">
                <div className="space-y-4">
                  {[
                    "Cover",
                    "Executive Snapshot",
                    "Problem Statement",
                    "Data Provenance",
                    "Benchmark Comparator",
                    "Shadow Tax Quantification",
                    "Predictive Scenarios",
                    "Risk Map",
                    "Fiduciary Levers",
                    "Synthesis",
                    "Roadmap",
                    "Principals",
                    "Verdict",
                    "Evidence Lineage Appendix"
                  ].map((section, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.2, delay: i * 0.03, ease: "easeOut" }}
                      className="flex items-center gap-4 text-[#0B1220]"
                    >
                      <span className="font-mono text-xs text-[#8C1515] w-8">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-base">{section}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-[1120px] mx-auto px-6">
          <div className="h-px bg-[#EDE6D6]" />
        </div>

        <section className="py-32 px-6">
          <div className="max-w-[1120px] mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="font-serif text-[40px] text-[#0B1220] mb-16"
            >
              Why the numbers hold up in a deposition
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
              <div className="space-y-6">
                <div>
                  <div className="font-mono text-xs text-[#8C1515] mb-2">BENCHMARK INDEX SIZE</div>
                  <div className="font-mono text-2xl text-[#0B1220]">757,294 rows</div>
                </div>
                <div>
                  <div className="font-mono text-xs text-[#8C1515] mb-2">SOURCE</div>
                  <div className="text-base text-[#0B1220]">DOL EFAST2 public filings, multi-vintage</div>
                </div>
                <div>
                  <div className="font-mono text-xs text-[#8C1515] mb-2">VALIDATORS</div>
                  <div className="text-base text-[#0B1220]">Mercer NSEHBP, KFF Employer Health Benefits Survey, Milliman Medical Index</div>
                </div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <div className="font-mono text-xs text-[#8C1515] mb-2">ENGINE</div>
                  <div className="text-base text-[#0B1220]">Verify Multi-Agent (6 constitutional agents)</div>
                </div>
                <div>
                  <div className="font-mono text-xs text-[#8C1515] mb-2">ENFORCEMENT</div>
                  <div className="text-base text-[#0B1220]">7-Gate Chain</div>
                </div>
                <div>
                  <div className="font-mono text-xs text-[#8C1515] mb-2">LINEAGE PRIMITIVE</div>
                  <div className="font-mono text-sm text-[#0B1220]">EvidenceRef / TransformRef / PolicyResult / Claim</div>
                </div>
              </div>
            </div>
            
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.2, delay: 0.15, ease: "easeOut" }}
              className="font-serif text-lg text-[#5B6472]"
            >
              Every figure in the report is traceable to a source document. That is the entire point.
            </motion.p>
          </div>
        </section>

        <div className="max-w-[1120px] mx-auto px-6">
          <div className="h-px bg-[#EDE6D6]" />
        </div>

        <section className="py-32 px-6">
          <div className="max-w-[1120px] mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="font-serif text-[40px] text-[#0B1220] mb-16"
            >
              Commissioned by
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  title: "CFOs and CHROs at self-funded employers",
                  desc: "Organizations with 250 to 25,000 covered lives seeking fiduciary-grade audit of broker and PBM arrangements."
                },
                {
                  title: "Private equity operating partners",
                  desc: "PE firms auditing portfolio company health plans as part of value creation initiatives and pre-exit preparation."
                },
                {
                  title: "Plan fiduciaries and benefits committees",
                  desc: "Trustees and committee members seeking documentation of prudent process under CAA 2021 standards."
                },
                {
                  title: "General counsel and ERISA litigators",
                  desc: "Legal teams building defense or offense positions in broker commission or PBM pricing disputes."
                }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.2, delay: i * 0.05, ease: "easeOut" }}
                  className="border border-[#EDE6D6] p-8"
                >
                  <h3 className="font-serif text-xl text-[#0B1220] mb-3">
                    {item.title}
                  </h3>
                  <p className="text-base leading-[1.6] text-[#5B6472]">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <div className="max-w-[1120px] mx-auto px-6">
          <div className="h-px bg-[#EDE6D6]" />
        </div>

        <section className="py-32 px-6">
          <div className="max-w-[1120px] mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="font-serif text-[40px] text-[#0B1220] mb-16"
            >
              Engagement
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-6 mb-12">
              {[
                { label: "Price", value: "$4,500 USD, one-time" },
                { label: "Turnaround", value: "10 business days from intake completion" },
                { label: "Format", value: "24-page PDF, board-ready, evidence appendix" },
                { label: "Confidentiality", value: "NDA executed at intake, mutual" },
                { label: "Revisions", value: "One round of clarification calls included" }
              ].map((row, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.2, delay: i * 0.05, ease: "easeOut" }}
                  className="flex items-start gap-8"
                >
                  <div className="font-mono text-xs text-[#8C1515] w-32 flex-shrink-0 pt-1">
                    {row.label}
                  </div>
                  <div className="text-base text-[#0B1220]">
                    {row.value}
                  </div>
                </motion.div>
              ))}
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.2, delay: 0.25, ease: "easeOut" }}
              className="flex justify-center"
            >
              <Button
                onClick={() => setShowCheckout(true)}
                className="bg-[#8C1515] hover:bg-[#7A1212] text-[#FAF8F5] px-12 py-6 text-lg font-medium rounded-none shadow-none"
              >
                Commission the report
              </Button>
            </motion.div>
          </div>
        </section>

        <section className="py-32 px-6 bg-[#EDE6D6]">
          <div className="max-w-[1120px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="text-center"
            >
              <p className="font-serif text-[28px] leading-[1.5] text-[#0B1220] max-w-4xl mx-auto">
                Every dollar of Shadow Tax comes from somewhere. It comes from a paycheck. It comes from a copay a family did not budget for. It comes from a retiree comparing two prescription prices at the pharmacy counter. This report exists so that the people whose names never appear on the contract are no longer the ones paying for its opacity.
              </p>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>

      {showCheckout && (
        <CheckoutModal onClose={() => setShowCheckout(false)} />
      )}
    </>
  );
}

function CheckoutModal({ onClose }: { onClose: () => void }) {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCommission = async () => {
    setIsProcessing(true);
    
    try {
      const response = await fetch("/api/shady-broker-report/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" }
      });
      
      const { url } = await response.json();
      if (url) window.location.href = url;
    } catch (error) {
      console.error("Checkout error:", error);
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-[#0B1220]/60 backdrop-blur-sm z-[300] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
        className="bg-[#FAF8F5] max-w-2xl w-full relative"
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-[#5B6472] hover:text-[#0B1220] transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
        
        <div className="p-12">
          <h3 className="font-serif text-3xl text-[#0B1220] mb-6">
            Commission The Shady Broker Report
          </h3>
          
          <div className="space-y-4 mb-8">
            <div className="flex justify-between items-center text-base">
              <span className="text-[#5B6472]">Report fee</span>
              <span className="font-mono text-[#0B1220]">$4,500.00</span>
            </div>
            <div className="h-px bg-[#EDE6D6]" />
            <div className="flex justify-between items-center text-lg font-medium">
              <span className="text-[#0B1220]">Total</span>
              <span className="font-mono text-[#0B1220]">$4,500.00</span>
            </div>
          </div>
          
          <div className="space-y-4 mb-8 text-sm text-[#5B6472]">
            <p className="leading-[1.6]">
              Upon payment, you will be directed to the secure intake form where you will upload your documents (Form 5500, Schedule A, broker compensation disclosures, and PBM contracts).
            </p>
            <p className="leading-[1.6]">
              Your 10 business day delivery window begins upon completion of the intake form and document upload.
            </p>
          </div>
          
          <Button
            onClick={handleCommission}
            disabled={isProcessing}
            className="w-full bg-[#8C1515] hover:bg-[#7A1212] text-[#FAF8F5] px-8 py-6 text-base font-medium rounded-none shadow-none disabled:opacity-50"
          >
            {isProcessing ? "Processing..." : "Proceed to payment"}
          </Button>
        </div>
      </motion.div>
    </div>
  );
}