import { useState, useEffect } from "react";
import { Upload, Shield, AlertTriangle, CheckCircle, FileText, Loader2, Sparkles, ArrowRight, User, Mail, Building2, Users } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function LandingUploader() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [formData, setFormData] = useState({ name: "", company: "", email: "", lives: "" });
  const [gateSubmitting, setGateSubmitting] = useState(false);

  const [dragActive, setDragActive] = useState(false);
  const [status, setStatus] = useState<"idle" | "uploading" | "scanning" | "completed">("idle");
  const [progress, setProgress] = useState(0);
  const [fileName, setFileName] = useState("");
  const [scannedIssues, setScannedIssues] = useState<string[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsUnlocked(localStorage.getItem("fiduciary_lab_unlocked") === "true");
    }

    const handleUnlockSync = () => {
      setIsUnlocked(localStorage.getItem("fiduciary_lab_unlocked") === "true");
    };

    window.addEventListener("fiduciary_lab_unlocked_change", handleUnlockSync);
    return () => window.removeEventListener("fiduciary_lab_unlocked_change", handleUnlockSync);
  }, []);

  const handleGateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.company || !formData.email) return;
    setGateSubmitting(true);

    try {
      await fetch("/api/contact/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          company: formData.company,
          email: formData.email,
          message: `Gated Fiduciary Lab Unlock (Uploader). Lives: ${formData.lives || "N/A"}`,
          source: "fiduciary_lab_gate"
        })
      });
    } catch (err) {
      console.error("Lead capture submission failed:", err);
    }

    localStorage.setItem("fiduciary_lab_unlocked", "true");
    window.dispatchEvent(new Event("fiduciary_lab_unlocked_change"));
    setIsUnlocked(true);
    setGateSubmitting(false);
  };

  useEffect(() => {
    if (status === "uploading") {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setStatus("scanning");
            return 100;
          }
          return prev + 10;
        });
      }, 150);
      return () => clearInterval(interval);
    }
  }, [status]);

  useEffect(() => {
    if (status === "scanning") {
      const issuesList = [
        "Hidden Specialty Drug Spread pricing (>40% markup detected)",
        "Opaque GPO Rebate exclusion clauses in Section 14.2",
        "Restrictive audit provisions limiting plan access to MAC lists",
        "Absence of fiduciary standard definitions in definitions appendix"
      ];
      
      const interval = setInterval(() => {
        setScannedIssues((prev) => {
          if (prev.length >= issuesList.length) {
            clearInterval(interval);
            setTimeout(() => setStatus("completed"), 1000);
            return prev;
          }
          return [...prev, issuesList[prev.length]];
        });
      }, 1200);
      return () => clearInterval(interval);
    }
  }, [status]);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    if (!isUnlocked) return;
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFileName(e.dataTransfer.files[0].name);
      setStatus("uploading");
      setProgress(0);
      setScannedIssues([]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
      setStatus("uploading");
      setProgress(0);
      setScannedIssues([]);
    }
  };

  const resetUploader = () => {
    setStatus("idle");
    setProgress(0);
    setFileName("");
    setScannedIssues([]);
  };

  return (
    <div className="bg-[#0C1117] border border-[#2A3F54] rounded-xl p-6 relative overflow-hidden flex flex-col justify-between min-h-[460px]">
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#B8860B]/5 rounded-full blur-3xl" />
      
      <div className="mb-4">
        <h4 className="text-lg font-serif font-bold text-white flex items-center gap-2">
          <Shield className="h-5 w-5 text-[#B8860B]" />
          Secure PBM Contract Forensic Scanner
        </h4>
        <p className="text-xs text-neutral-400 mt-1">
          Simulate a secure PBM agreement compliance audit. Uncover hidden spreads and restrictive clauses instantly.
        </p>
      </div>

      <AnimatePresence mode="wait">
        {!isUnlocked ? (
          <motion.form
            key="gate"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            onSubmit={handleGateSubmit}
            className="space-y-3.5 bg-[#151B23]/40 border border-[#2A3F54] p-5 rounded-lg relative z-10"
          >
            <div className="text-center pb-1">
              <span className="text-[10px] font-mono text-[#B8860B] uppercase tracking-wider font-semibold">Fiduciary Verification Required</span>
              <p className="text-xs text-neutral-300 mt-1">Enter your business coordinates to unlock the diagnostic sandbox tools.</p>
            </div>

            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-neutral-500" />
              <input
                type="text"
                required
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-[#0C1117] border border-[#2A3F54] rounded-md pl-9 pr-3 py-2 text-xs text-neutral-200 focus:outline-none focus:border-[#B8860B]"
              />
            </div>

            <div className="relative">
              <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-neutral-500" />
              <input
                type="text"
                required
                placeholder="Company Name"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="w-full bg-[#0C1117] border border-[#2A3F54] rounded-md pl-9 pr-3 py-2 text-xs text-neutral-200 focus:outline-none focus:border-[#B8860B]"
              />
            </div>

            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-neutral-500" />
              <input
                type="email"
                required
                placeholder="Work Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-[#0C1117] border border-[#2A3F54] rounded-md pl-9 pr-3 py-2 text-xs text-neutral-200 focus:outline-none focus:border-[#B8860B]"
              />
            </div>

            <div className="relative">
              <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-neutral-500" />
              <input
                type="number"
                placeholder="Employee Count / Covered Lives"
                value={formData.lives}
                onChange={(e) => setFormData({ ...formData, lives: e.target.value })}
                className="w-full bg-[#0C1117] border border-[#2A3F54] rounded-md pl-9 pr-3 py-2 text-xs text-neutral-200 focus:outline-none focus:border-[#B8860B]"
              />
            </div>

            <button
              type="submit"
              disabled={gateSubmitting}
              className="w-full bg-[#1A3A52] hover:bg-[#234766] disabled:opacity-80 text-white py-2 px-4 rounded text-xs font-semibold transition-all flex items-center justify-center gap-1.5"
            >
              {gateSubmitting ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  Verifying...
                </>
              ) : (
                <>
                  Unlock Forensic Sandbox
                  <ArrowRight className="h-3.5 w-3.5" />
                </>
              )}
            </button>
          </motion.form>
        ) : (
          <div className="flex-1 flex flex-col justify-center">
            {status === "idle" && (
              <motion.div
                key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer transition-all ${
                  dragActive ? "border-[#B8860B] bg-[#1A3A52]/10" : "border-[#2A3F54] hover:border-[#3A4F64] bg-[#151B23]/40"
                }`}
              >
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="hidden"
                  id="landing-pdf-uploader"
                />
                <label htmlFor="landing-pdf-uploader" className="flex flex-col items-center justify-center cursor-pointer w-full">
                  <div className="bg-[#1A3A52]/20 p-3 rounded-full mb-3 text-[#B8860B]">
                    <Upload className="h-6 w-6" />
                  </div>
                  <p className="text-sm font-semibold text-neutral-200">Drag & drop your PBM contract here</p>
                  <p className="text-xs text-neutral-500 mt-1">or click to browse local files (PDF only)</p>
                </label>
              </motion.div>
            )}

            {status === "uploading" && (
              <motion.div
                key="uploading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="border border-[#2A3F54] bg-[#151B23]/40 rounded-lg p-8 flex flex-col items-center justify-center text-center"
              >
                <Loader2 className="h-8 w-8 text-[#B8860B] animate-spin mb-4" />
                <p className="text-sm font-semibold text-neutral-200">Ingesting Contract...</p>
                <p className="text-xs text-neutral-500 mt-1 mb-4">{fileName}</p>
                <div className="w-full max-w-xs h-1.5 bg-[#0C1117] rounded-full overflow-hidden">
                  <div className="h-full bg-[#B8860B] transition-all duration-150" style={{ width: `${progress}%` }} />
                </div>
                <span className="text-[10px] font-mono text-neutral-400 mt-2">{progress}%</span>
              </motion.div>
            )}

            {status === "scanning" && (
              <motion.div
                key="scanning"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="border border-[#2A3F54] bg-[#151B23]/40 rounded-lg p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono text-[#B8860B] flex items-center gap-1.5">
                    <Sparkles className="h-3.5 w-3.5 animate-spin" />
                    RUNNING FORENSIC SCANS...
                  </span>
                  <span className="text-xs font-mono text-neutral-500">{fileName}</span>
                </div>
                <div className="space-y-3 min-h-[140px]">
                  {scannedIssues.map((issue, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-start gap-2 bg-red-950/20 border border-red-900/30 p-2.5 rounded text-xs"
                    >
                      <AlertTriangle className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                      <span className="text-red-200 font-mono">{issue}</span>
                    </motion.div>
                  ))}
                  {scannedIssues.length < 4 && (
                    <div className="flex items-center gap-2 text-xs text-neutral-500 font-mono italic p-2">
                      <Loader2 className="h-3 w-3 animate-spin text-[#B8860B]" />
                      Parsing clauses, MAC definitions, and rebate exclusions...
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {status === "completed" && (
              <motion.div
                key="completed"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="border border-red-900/40 bg-red-950/10 rounded-lg p-6 space-y-4"
              >
                <div className="flex items-center gap-2 text-red-400 font-mono text-xs">
                  <AlertTriangle className="h-4 w-4 shrink-0" />
                  CRITICAL CONTRACT RISK HIGHLIGHTED
                </div>
                
                <p className="text-xs text-neutral-300 leading-relaxed">
                  Forensic scanning simulator detected **4 critical profit-leakage clauses** inside your uploaded contract. These clauses legally grant the carrier the right to extract undisclosed markups and withhold GPO rebates.
                </p>

                <div className="bg-[#0C1117] border border-[#2A3F54] p-3 rounded flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-neutral-300">
                    <FileText className="h-4 w-4 text-[#B8860B]" />
                    <span>forensic-leakage-report.pdf</span>
                  </div>
                  <a
                    href="/SiriusB_iQ_Glassmorphic_v1_Rimes_Market_Validation_Brief.pdf"
                    download
                    className="text-[#B8860B] hover:text-[#D4AF37] font-semibold flex items-center gap-1 text-[11px]"
                  >
                    Download Summary <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <a
                    href="https://calendly.com/jer-kincaidrmc/new-meeting"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-[#1A3A52] hover:bg-[#234766] text-white font-semibold text-center text-xs py-3 rounded transition-all"
                  >
                    Book Expert Review
                  </a>
                  <button
                    onClick={resetUploader}
                    className="border border-[#2A3F54] hover:bg-[#151B23] text-neutral-400 text-xs py-3 px-4 rounded transition-all"
                  >
                    Scan Another
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}