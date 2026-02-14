import Head from "next/head";
import React, { useState, useCallback } from "react";
import { SEO } from "@/components/SEO";
import Footer from "@/components/Footer";
import { 
  Upload, 
  FileText, 
  CheckCircle2, 
  AlertTriangle,
  XCircle,
  Download,
  ExternalLink,
  Info,
  Shield
} from "lucide-react";
import { useRouter } from "next/router";

type Upload5500File = {
  id: string;
  fileName: string;
  year: string;
  size: number;
  uploadedAt: string;
  status: "pending" | "processing" | "verified" | "error";
  checksum?: string;
  errorMessage?: string;
};

export default function Upload5500Page() {
  const router = useRouter();
  const [files, setFiles] = useState<Upload5500File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const validateFile = (file: File): { valid: boolean; error?: string } => {
    // Check file type
    if (file.type !== "application/pdf") {
      return { valid: false, error: "Only PDF files are accepted" };
    }

    // Check file size (max 50MB)
    if (file.size > 50 * 1024 * 1024) {
      return { valid: false, error: "File size must be less than 50MB" };
    }

    // Check file name contains year (basic validation)
    const yearMatch = file.name.match(/20\d{2}/);
    if (!yearMatch) {
      return { valid: false, error: "File name should contain the year (e.g., 2023)" };
    }

    return { valid: true };
  };

  const uploadFile = async (file: File) => {
    const validation = validateFile(file);
    if (!validation.valid) {
      return {
        id: Math.random().toString(36).substr(2, 9),
        fileName: file.name,
        year: "Unknown",
        size: file.size,
        uploadedAt: new Date().toISOString(),
        status: "error" as const,
        errorMessage: validation.error,
      };
    }

    const yearMatch = file.name.match(/20\d{2}/);
    const year = yearMatch ? yearMatch[0] : "Unknown";

    // Get presigned URL
    try {
      const presignRes = await fetch("/api/uploads/presign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fileName: file.name,
          contentType: file.type,
          category: "form-5500",
        }),
      });

      if (!presignRes.ok) {
        throw new Error("Failed to get upload URL");
      }

      const { uploadUrl, fileKey } = await presignRes.json();

      // Upload to presigned URL
      const uploadRes = await fetch(uploadUrl, {
        method: "PUT",
        headers: { "Content-Type": file.type },
        body: file,
      });

      if (!uploadRes.ok) {
        throw new Error("Failed to upload file");
      }

      // Calculate checksum (simplified)
      const arrayBuffer = await file.arrayBuffer();
      const hashBuffer = await crypto.subtle.digest("SHA-256", arrayBuffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const checksum = hashArray.map(b => b.toString(16).padStart(2, "0")).join("");

      return {
        id: fileKey,
        fileName: file.name,
        year,
        size: file.size,
        uploadedAt: new Date().toISOString(),
        status: "verified" as const,
        checksum: `sha256:${checksum.substring(0, 16)}...`,
      };
    } catch (error) {
      return {
        id: Math.random().toString(36).substr(2, 9),
        fileName: file.name,
        year,
        size: file.size,
        uploadedAt: new Date().toISOString(),
        status: "error" as const,
        errorMessage: error instanceof Error ? error.message : "Upload failed",
      };
    }
  };

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    if (droppedFiles.length === 0) return;

    setUploading(true);
    const uploadedFiles = await Promise.all(droppedFiles.map(uploadFile));
    setFiles(prev => [...uploadedFiles, ...prev]);
    setUploading(false);
  }, []);

  const handleFileInput = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const selectedFiles = Array.from(e.target.files);
    setUploading(true);
    const uploadedFiles = await Promise.all(selectedFiles.map(uploadFile));
    setFiles(prev => [...uploadedFiles, ...prev]);
    setUploading(false);
  }, []);

  const verifiedFiles = files.filter(f => f.status === "verified");
  const uniqueYears = new Set(verifiedFiles.map(f => f.year));
  const meetsMinimum = uniqueYears.size >= 3;

  return (
    <>
      <SEO
        title="Upload Form 5500 | Broker Compensation Study"
        description="Upload your Form 5500s for comprehensive broker compensation analysis"
      />
      <div className="relative min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black text-white overflow-hidden">
        {/* Premium Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent" />
          
          <div 
            className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-500/30 rounded-full blur-[120px]"
            style={{ animation: "float 8s ease-in-out infinite" }}
          />
          <div 
            className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-cyan-500/25 rounded-full blur-[100px]"
            style={{ animation: "float 10s ease-in-out infinite", animationDelay: "2s" }}
          />

          <div 
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgb(59 130 246 / 0.1) 1px, transparent 1px),
                linear-gradient(to bottom, rgb(59 130 246 / 0.1) 1px, transparent 1px)
              `,
              backgroundSize: "60px 60px",
              maskImage: "radial-gradient(ellipse at center, black 30%, transparent 70%)",
            }}
          />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8 backdrop-blur-xl bg-gradient-to-br from-blue-500/10 via-black/40 to-black/40 rounded-3xl border border-blue-500/20 p-8 shadow-2xl shadow-blue-500/10 hover:shadow-blue-500/20 transition-all duration-500 group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
            <div className="relative z-10">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-r from-white via-blue-200 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(59,130,246,0.3)]">
                    Form 5500 Upload
                  </h1>
                  <p className="mt-3 text-lg text-blue-200/70 max-w-2xl">
                    Upload your last 3 years of Form 5500s for comprehensive broker compensation analysis
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-sm text-blue-300/70">Files Uploaded</div>
                    <div className="text-3xl font-bold text-blue-400">{verifiedFiles.length}</div>
                  </div>
                  <div className="h-12 w-px bg-blue-500/20" />
                  <div className="text-right">
                    <div className="text-sm text-blue-300/70">Years Covered</div>
                    <div className="text-3xl font-bold text-cyan-400">{uniqueYears.size}</div>
                  </div>
                </div>
              </div>

              {meetsMinimum && (
                <div className="mt-6 flex items-center gap-3 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-6 py-4">
                  <CheckCircle2 className="h-6 w-6 text-emerald-400 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-emerald-200">Minimum Requirement Met</div>
                    <div className="text-sm text-emerald-300/70">You have uploaded 5500s for {uniqueYears.size} years. Ready for broker compensation analysis.</div>
                  </div>
                  <button
                    onClick={() => router.push("/evidence-receipts")}
                    className="ml-auto flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/20 px-4 py-2 text-sm font-semibold hover:bg-emerald-500/30 transition-all duration-300"
                  >
                    View Evidence
                    <ExternalLink className="h-4 w-4" />
                  </button>
                </div>
              )}

              {!meetsMinimum && verifiedFiles.length > 0 && (
                <div className="mt-6 flex items-center gap-3 rounded-2xl border border-amber-500/30 bg-amber-500/10 px-6 py-4">
                  <AlertTriangle className="h-6 w-6 text-amber-400 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-amber-200">Additional Years Required</div>
                    <div className="text-sm text-amber-300/70">Upload Form 5500s for {3 - uniqueYears.size} more year(s) to meet the 3-year minimum for broker compensation analysis.</div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Instructions Section */}
          {showInstructions && (
            <div className="mb-8 rounded-3xl border border-blue-500/20 bg-gradient-to-br from-blue-500/10 via-black/40 to-black/40 backdrop-blur-xl shadow-2xl shadow-blue-500/10 overflow-hidden hover:shadow-blue-500/20 transition-all duration-500 group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative p-8">
                <button
                  onClick={() => setShowInstructions(false)}
                  className="absolute top-6 right-6 text-blue-300/40 hover:text-blue-300/80 transition-colors"
                >
                  ✕
                </button>

                <div className="flex items-start gap-4 mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/20 flex-shrink-0">
                    <Info className="h-6 w-6 text-blue-400 drop-shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-blue-200 mb-2">How to Obtain Your Form 5500</h2>
                    <p className="text-blue-200/70">Form 5500 is an annual information return filed by employee benefit plans with the Department of Labor.</p>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Method 1 */}
                  <div className="rounded-2xl border border-blue-500/20 bg-blue-500/5 p-6 hover:border-blue-500/30 transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/20 text-sm font-bold text-blue-300 flex-shrink-0">
                        1
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-white mb-2">From Your Benefits Broker or TPA</h3>
                        <p className="text-sm text-blue-200/70 mb-3">
                          Your benefits broker or Third Party Administrator (TPA) files Form 5500 on your behalf annually. Simply request copies for the last 3 years.
                        </p>
                        <div className="rounded-lg bg-blue-500/10 p-4 border border-blue-500/20">
                          <div className="text-xs font-semibold text-blue-300 mb-2">Email Template:</div>
                          <div className="text-xs font-mono text-blue-100/80 leading-relaxed">
                            "Hi [Broker/TPA Name],<br/><br/>
                            Could you please provide PDF copies of our Form 5500 filings for plan years [Year-3], [Year-2], and [Year-1]?<br/><br/>
                            We need these for a comprehensive broker compensation analysis.<br/><br/>
                            Thank you!"
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Method 2 */}
                  <div className="rounded-2xl border border-blue-500/20 bg-blue-500/5 p-6 hover:border-blue-500/30 transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/20 text-sm font-bold text-blue-300 flex-shrink-0">
                        2
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-white mb-2">Download from DOL EFAST2 Website</h3>
                        <p className="text-sm text-blue-200/70 mb-3">
                          All Form 5500 filings are public record and available through the Department of Labor's EFAST2 system.
                        </p>
                        <div className="space-y-3">
                          <div className="flex items-start gap-2">
                            <div className="flex h-5 w-5 items-center justify-center rounded bg-blue-500/20 text-xs font-bold text-blue-300 flex-shrink-0 mt-0.5">
                              a
                            </div>
                            <div className="text-sm text-blue-100/80">
                              Visit <a href="https://www.efast.dol.gov/5500Search/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline">www.efast.dol.gov/5500Search/</a>
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <div className="flex h-5 w-5 items-center justify-center rounded bg-blue-500/20 text-xs font-bold text-blue-300 flex-shrink-0 mt-0.5">
                              b
                            </div>
                            <div className="text-sm text-blue-100/80">
                              Search by your company name or EIN (Employer Identification Number)
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <div className="flex h-5 w-5 items-center justify-center rounded bg-blue-500/20 text-xs font-bold text-blue-300 flex-shrink-0 mt-0.5">
                              c
                            </div>
                            <div className="text-sm text-blue-100/80">
                              Download PDF copies for the last 3 plan years
                            </div>
                          </div>
                        </div>
                        <a
                          href="https://www.efast.dol.gov/5500Search/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-4 inline-flex items-center gap-2 rounded-xl border border-blue-500/30 bg-blue-500/20 px-4 py-2 text-sm font-semibold hover:bg-blue-500/30 transition-all duration-300"
                        >
                          <ExternalLink className="h-4 w-4" />
                          Open EFAST2 Portal
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* What We Need */}
                  <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6 hover:border-emerald-500/30 transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20 flex-shrink-0">
                        <Shield className="h-5 w-5 text-emerald-400 drop-shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-emerald-200 mb-2">What We Need for Analysis</h3>
                        <ul className="space-y-2 text-sm text-emerald-100/80">
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                            <span><span className="font-semibold text-emerald-100">Complete Form 5500</span> - Full filing, not summary pages</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                            <span><span className="font-semibold text-emerald-100">Schedule A</span> - Insurance Information (if applicable)</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                            <span><span className="font-semibold text-emerald-100">Schedule C</span> - Service Provider Information (most important for broker comp analysis)</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                            <span><span className="font-semibold text-emerald-100">3 consecutive years</span> - To identify trends and establish baseline</span>
                          </li>
                        </ul>
                        <div className="mt-4 rounded-lg bg-emerald-500/10 p-3 border border-emerald-500/20">
                          <div className="text-xs font-semibold text-emerald-300 mb-1">📋 Pro Tip</div>
                          <div className="text-xs text-emerald-100/80">
                            Schedule C contains detailed broker compensation information. Make sure this section is included in your upload for the most accurate analysis.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Upload Area */}
          <div className="mb-8">
            <div
              className={`relative rounded-3xl border-2 border-dashed transition-all duration-300 ${
                dragActive
                  ? "border-blue-500 bg-blue-500/20 scale-[1.02]"
                  : "border-blue-500/30 bg-gradient-to-br from-blue-500/10 via-black/40 to-black/40"
              } backdrop-blur-xl p-12 text-center shadow-2xl hover:border-blue-500/50 hover:shadow-blue-500/20 group`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
              
              <input
                type="file"
                id="file-upload"
                multiple
                accept="application/pdf"
                onChange={handleFileInput}
                className="hidden"
              />

              <div className="relative z-10">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-blue-500/20">
                  <Upload className="h-10 w-10 text-blue-400 drop-shadow-[0_0_12px_rgba(59,130,246,0.6)]" />
                </div>

                <h3 className="mb-2 text-2xl font-bold text-white">
                  {uploading ? "Uploading files..." : "Drop Form 5500 PDFs here"}
                </h3>
                <p className="mb-6 text-blue-200/70">
                  or click to browse your files
                </p>

                <label
                  htmlFor="file-upload"
                  className="inline-flex cursor-pointer items-center gap-2 rounded-2xl border border-blue-500/30 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 backdrop-blur-xl px-6 py-3 text-sm font-semibold hover:from-blue-500/30 hover:to-cyan-500/30 transition-all duration-500 shadow-lg hover:shadow-blue-500/50 hover:scale-105"
                >
                  <FileText className="h-5 w-5" />
                  Select Files
                </label>

                <div className="mt-6 text-xs text-blue-300/50">
                  PDF format only • Max 50MB per file • 3 years minimum required
                </div>
              </div>
            </div>
          </div>

          {/* Uploaded Files List */}
          {files.length > 0 && (
            <div className="rounded-3xl border border-blue-500/20 bg-gradient-to-br from-blue-500/10 via-black/40 to-black/40 backdrop-blur-xl p-8 shadow-2xl shadow-blue-500/10">
              <h3 className="mb-6 text-2xl font-semibold text-white">Uploaded Files</h3>
              <div className="space-y-3">
                {files.map((file) => (
                  <div
                    key={file.id}
                    className="flex items-center gap-4 rounded-2xl border border-blue-500/20 bg-blue-500/5 p-4 hover:border-blue-500/30 hover:scale-[1.01] transition-all duration-300"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/20 flex-shrink-0">
                      {file.status === "verified" ? (
                        <CheckCircle2 className="h-6 w-6 text-emerald-400 drop-shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
                      ) : file.status === "error" ? (
                        <XCircle className="h-6 w-6 text-red-400 drop-shadow-[0_0_8px_rgba(239,68,68,0.6)]" />
                      ) : (
                        <FileText className="h-6 w-6 text-blue-400" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-white truncate">{file.fileName}</div>
                      <div className="flex items-center gap-3 text-sm text-blue-200/60">
                        <span>Year: {file.year}</span>
                        <span>•</span>
                        <span>{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                        <span>•</span>
                        <span>{new Date(file.uploadedAt).toLocaleString()}</span>
                      </div>
                      {file.checksum && (
                        <div className="text-xs font-mono text-blue-300/50 mt-1">
                          {file.checksum}
                        </div>
                      )}
                      {file.errorMessage && (
                        <div className="text-xs text-red-300 mt-1">
                          ⚠️ {file.errorMessage}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      {file.status === "verified" && (
                        <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-300 border border-emerald-500/30">
                          Verified
                        </span>
                      )}
                      {file.status === "error" && (
                        <span className="rounded-full bg-red-500/20 px-3 py-1 text-xs font-semibold text-red-300 border border-red-500/30">
                          Error
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <Footer />
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          25% {
            transform: translateY(-20px) translateX(10px);
          }
          50% {
            transform: translateY(-10px) translateX(-10px);
          }
          75% {
            transform: translateY(-30px) translateX(5px);
          }
        }
      `}</style>
    </>
  );
}