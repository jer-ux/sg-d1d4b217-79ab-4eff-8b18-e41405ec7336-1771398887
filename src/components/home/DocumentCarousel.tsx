import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Download, Eye, ExternalLink, Shield, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DocumentBrief {
  title: string;
  filename: string;
  description: string;
  pages: number;
  date: string;
  category: "Arbitrage Forensics" | "EBITDA Defense" | "Fiduciary Tech" | "Briefs";
}

const documents: DocumentBrief[] = [
  {
    title: "The $6.4 Billion Arbitrage",
    filename: "The_6_4_Billion_Arbitrage.pdf",
    description: "An investigative forensic study exposing hidden PBM generic pricing arbitrage, spread markups, and rebate retention mechanisms across employer-sponsored health plans.",
    pages: 14,
    date: "June 2026",
    category: "Arbitrage Forensics"
  },
  {
    title: "Sovereign by Math: Evidence First Transformation",
    filename: "Kincaid_IQ_WP_2026_06_Evidence_First_Transformation.pdf",
    description: "A comprehensive actuarial manual detailing how mathematically verifiable transaction ledgers replace traditional, non-fiduciary benefits consulting.",
    pages: 44,
    date: "June 2026",
    category: "Fiduciary Tech"
  },
  {
    title: "JB Hunt EBITDA Defense Audit",
    filename: "Kincaid_iQ_JBHunt_EBITDA_Defense.pdf",
    description: "A real-world defense model analyzing strategic health plan waste containment and its direct compounding effect on corporate enterprise valuation.",
    pages: 18,
    date: "May 2026",
    category: "EBITDA Defense"
  },
  {
    title: "Designed to Replace Consultants",
    filename: "Kincaid_iQ_Designed_to_Replace_Consultants.pdf",
    description: "A strategic overview of algorithmic audit technology and self-driving contracts that render legacy brokerage override structures obsolete.",
    pages: 12,
    date: "April 2026",
    category: "Fiduciary Tech"
  }
];

export function DocumentCarousel() {
  const [activeDoc, setActiveDoc] = useState<DocumentBrief | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [email, setEmail] = useState("");

  const handleOpenDoc = (doc: DocumentBrief) => {
    setActiveDoc(doc);
    setDownloadSuccess(false);
  };

  const handleDownload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsDownloading(true);
    setTimeout(() => {
      setIsDownloading(false);
      setDownloadSuccess(true);
      
      // Trigger actual download of the file inside the public folder
      if (activeDoc) {
        const link = document.createElement("a");
        link.href = `/${activeDoc.filename}`;
        link.download = activeDoc.filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }, 1500);
  };

  return (
    <div className="w-full">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {documents.map((doc, idx) => (
          <motion.div
            key={doc.filename}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            whileHover={{ y: -6 }}
            className="group relative rounded-xl border border-slate-800/80 bg-[#0C1117]/60 backdrop-blur-xl p-6 flex flex-col justify-between hover:border-[#B8860B]/30 hover:shadow-[0_8px_32px_rgba(184,134,11,0.05)] cursor-pointer transition-all duration-300"
            onClick={() => handleOpenDoc(doc)}
          >
            <div className="space-y-4">
              {/* Document Icon & Category */}
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-[#B8860B] bg-[#B8860B]/5 border border-[#B8860B]/20 px-2 py-0.5 rounded-sm">
                  {doc.category}
                </span>
                <span className="text-[10px] font-mono text-slate-500">{doc.date}</span>
              </div>

              {/* Graphic Representation of PDF Cover */}
              <div className="relative aspect-[3/4] rounded-lg bg-gradient-to-b from-[#11161D] to-[#0A0D14] border border-slate-800/40 p-4 flex flex-col justify-between overflow-hidden group-hover:border-[#B8860B]/20 transition-colors">
                {/* Embedded Glow Effect */}
                <div className="absolute -top-12 -right-12 w-24 h-24 bg-[#B8860B] opacity-5 rounded-full blur-2xl group-hover:opacity-10 transition-opacity" />
                
                <div className="flex items-start justify-between">
                  <FileText className="h-7 w-7 text-slate-500 group-hover:text-[#B8860B] transition-colors" />
                  <span className="text-[9px] font-mono text-slate-500 font-bold">{doc.pages} Pages</span>
                </div>
                
                <div className="space-y-2">
                  <div className="h-0.5 w-1/3 bg-[#B8860B]/40 group-hover:w-1/2 transition-all duration-500" />
                  <h4 className="text-xs font-serif font-bold text-slate-300 group-hover:text-white leading-normal line-clamp-3">
                    {doc.title}
                  </h4>
                </div>
              </div>

              {/* Description Snippet */}
              <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                {doc.description}
              </p>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-900/60 flex items-center justify-between text-xs font-semibold text-slate-300 group-hover:text-[#B8860B] transition-colors">
              <span>Secure Access Gateway</span>
              <Download className="h-4 w-4 group-hover:translate-y-0.5 transition-transform" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Access Gate Modal */}
      <AnimatePresence>
        {activeDoc && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveDoc(null)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md rounded-2xl border border-slate-800 bg-[#0C1117] p-8 shadow-2xl overflow-hidden z-10"
            >
              {/* Corner Decorative Glow */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#B8860B] opacity-5 rounded-full blur-3xl" />

              <div className="flex flex-col gap-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono font-bold tracking-widest text-[#B8860B] uppercase">
                      Audit Intelligence Library
                    </span>
                    <h3 className="text-xl font-serif font-bold text-white">{activeDoc.title}</h3>
                  </div>
                  <button
                    onClick={() => setActiveDoc(null)}
                    className="rounded bg-slate-900/50 p-1.5 text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700 transition-all text-xs font-bold font-mono"
                  >
                    Esc
                  </button>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed">
                  {activeDoc.description}
                </p>

                <div className="rounded-lg border border-slate-800/80 bg-[#11161D]/50 p-4 space-y-2 font-mono text-xs text-slate-400">
                  <div className="flex justify-between">
                    <span>Document:</span>
                    <span className="text-white truncate max-w-[200px]">{activeDoc.filename}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Length:</span>
                    <span className="text-white">{activeDoc.pages} Actuarial Pages</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Standard:</span>
                    <span className="text-[#B8860B] font-bold">ERISA Fiduciary Grade</span>
                  </div>
                </div>

                {!downloadSuccess ? (
                  <form onSubmit={handleDownload} className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-semibold">
                        Enter Executive Email for PDF Access:
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="executive@yourcompany.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-lg border border-slate-800 bg-[#090D14] px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-[#B8860B]/40 transition-colors"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isDownloading}
                      className="w-full bg-[#1A3A52] hover:bg-[#234766] text-white font-bold h-12"
                    >
                      {isDownloading ? "Verifying Credentials..." : "Unlock & Download Brief"}
                    </Button>
                  </form>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-emerald-950/20 border border-emerald-900/40 rounded-xl p-5 text-center space-y-3"
                  >
                    <div className="inline-flex rounded-full bg-emerald-500/10 p-2 text-emerald-400">
                      <CheckCircle className="h-6 w-6" />
                    </div>
                    <div className="text-sm font-semibold text-white">Access Granted Successfully</div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Your download has started. Please verify your downloads directory for <b>{activeDoc.filename}</b>.
                    </p>
                  </motion.div>
                )}

                <div className="text-[10px] font-mono text-slate-500 text-center flex items-center justify-center gap-1">
                  <Shield className="h-3 w-3" />
                  SSAE-18 SOC 2 Secure Document Gateway
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}