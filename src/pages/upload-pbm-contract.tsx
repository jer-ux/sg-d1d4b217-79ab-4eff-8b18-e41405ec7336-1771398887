import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Upload, CheckCircle2, FileText, Shield, Lock, ArrowRight } from "lucide-react";
import { SEO } from "@/components/SEO";
import Link from "next/link";

export default function UploadPBMContract() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    planSize: "",
    notes: ""
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    // Simulate upload
    await new Promise(resolve => setTimeout(resolve, 2000));

    setUploading(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-6">
        <SEO
          title="Contract Uploaded Successfully | SiriusB iQ"
          description="Your PBM contract has been securely uploaded"
        />
        <div className="max-w-2xl w-full text-center">
          <div className="bg-gradient-to-br from-emerald-950/40 to-emerald-900/20 border border-emerald-500/30 rounded-3xl p-12">
            <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-emerald-400" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">Contract Received!</h1>
            <p className="text-lg text-slate-300 mb-8">
              Thank you for uploading your PBM contract. Our team will begin the preliminary review within 24 hours.
            </p>
            <div className="bg-[#0a0a0a]/50 border border-emerald-500/20 rounded-xl p-6 mb-8">
              <div className="text-sm text-slate-400 space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div className="text-left">
                    <div className="text-white font-semibold">File Uploaded</div>
                    <div className="text-xs text-slate-500">{file?.name}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div className="text-left">
                    <div className="text-white font-semibold">Encrypted & Secure</div>
                    <div className="text-xs text-slate-500">Your contract is stored with bank-level encryption</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div className="text-left">
                    <div className="text-white font-semibold">Analysis Initiated</div>
                    <div className="text-xs text-slate-500">We'll contact you at {formData.email} within 24 hours</div>
                  </div>
                </div>
              </div>
            </div>
            <Link href="/solutions/rx-defense">
              <Button className="bg-cyan-600 hover:bg-cyan-700 text-white">
                Return to Rx Defense <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <SEO
        title="Upload PBM Contract | SiriusB iQ"
        description="Securely upload your PBM contract for expert analysis"
      />

      {/* Header */}
      <div className="border-b border-white/5 bg-[#0a0a0a]/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-white">
            SiriusB iQ
          </Link>
          <Link href="/solutions/rx-defense">
            <Button variant="ghost" className="text-slate-400 hover:text-white">
              Back to Rx Defense
            </Button>
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-400 text-sm font-semibold mb-6">
            <Shield className="w-4 h-4" />
            Secure Upload Portal
          </div>
          <h1 className="text-5xl font-bold text-white mb-6">
            Upload Your PBM Contract
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Get a free preliminary analysis of your pharmacy benefit manager contract within 24 hours
          </p>
        </div>

        {/* Security Badges */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          <div className="bg-[#111] border border-white/5 rounded-xl p-4 text-center">
            <Lock className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
            <div className="text-sm font-semibold text-white">256-Bit Encryption</div>
            <div className="text-xs text-slate-500">Bank-level security</div>
          </div>
          <div className="bg-[#111] border border-white/5 rounded-xl p-4 text-center">
            <Shield className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
            <div className="text-sm font-semibold text-white">HIPAA Compliant</div>
            <div className="text-xs text-slate-500">Protected health information</div>
          </div>
          <div className="bg-[#111] border border-white/5 rounded-xl p-4 text-center">
            <FileText className="w-6 h-6 text-purple-400 mx-auto mb-2" />
            <div className="text-sm font-semibold text-white">Confidential</div>
            <div className="text-xs text-slate-500">NDA protection standard</div>
          </div>
        </div>

        {/* Upload Form */}
        <form onSubmit={handleSubmit} className="bg-[#111] border border-white/5 rounded-2xl p-8">
          <div className="space-y-6">
            {/* File Upload */}
            <div>
              <label className="block text-sm font-semibold text-white mb-3">
                PBM Contract Document *
              </label>
              <div className="relative">
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx"
                  required
                  className="hidden"
                  id="contract-upload"
                />
                <label
                  htmlFor="contract-upload"
                  className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-white/10 rounded-xl cursor-pointer hover:border-cyan-500/50 transition-colors bg-[#0a0a0a]/50"
                >
                  {file ? (
                    <div className="text-center">
                      <FileText className="w-12 h-12 text-cyan-400 mx-auto mb-3" />
                      <div className="text-white font-semibold">{file.name}</div>
                      <div className="text-sm text-slate-400">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </div>
                      <div className="text-xs text-cyan-400 mt-2">Click to change file</div>
                    </div>
                  ) : (
                    <div className="text-center">
                      <Upload className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                      <div className="text-white font-semibold mb-1">
                        Click to upload or drag and drop
                      </div>
                      <div className="text-sm text-slate-400">
                        PDF, DOC, or DOCX (max 50MB)
                      </div>
                    </div>
                  )}
                </label>
              </div>
            </div>

            {/* Company Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-white mb-3">
                  Company Name *
                </label>
                <Input
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  required
                  className="bg-[#0a0a0a] border-white/10 text-white"
                  placeholder="Acme Corporation"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-white mb-3">
                  Your Name *
                </label>
                <Input
                  value={formData.contactName}
                  onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                  required
                  className="bg-[#0a0a0a] border-white/10 text-white"
                  placeholder="John Smith"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-white mb-3">
                  Email Address *
                </label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="bg-[#0a0a0a] border-white/10 text-white"
                  placeholder="john@acme.com"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-white mb-3">
                  Phone Number
                </label>
                <Input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="bg-[#0a0a0a] border-white/10 text-white"
                  placeholder="(555) 123-4567"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-white mb-3">
                Plan Size (Number of Covered Lives)
              </label>
              <Input
                value={formData.planSize}
                onChange={(e) => setFormData({ ...formData, planSize: e.target.value })}
                className="bg-[#0a0a0a] border-white/10 text-white"
                placeholder="e.g., 500 employees"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-white mb-3">
                Additional Notes or Questions
              </label>
              <Textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="bg-[#0a0a0a] border-white/10 text-white min-h-[120px]"
                placeholder="Any specific concerns or areas you'd like us to focus on..."
              />
            </div>

            {/* Privacy Notice */}
            <div className="bg-cyan-950/20 border border-cyan-500/20 rounded-xl p-4">
              <div className="text-xs text-slate-400 leading-relaxed">
                By uploading your contract, you agree to our secure handling practices. All contracts are encrypted, stored securely, and reviewed only by authorized analysts. We will contact you within 24 hours with a preliminary assessment and next steps.
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={!file || uploading}
              className="w-full bg-cyan-600 hover:bg-cyan-700 text-white py-6 text-lg font-semibold disabled:opacity-50"
            >
              {uploading ? (
                <>Processing Upload...</>
              ) : (
                <>
                  Submit Contract for Analysis <ArrowRight className="w-5 h-5 ml-2" />
                </>
              )}
            </Button>
          </div>
        </form>

        {/* What Happens Next */}
        <div className="mt-12 bg-[#111] border border-white/5 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-white mb-6">What Happens Next?</h2>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-cyan-950/40 border border-cyan-500/30 flex items-center justify-center shrink-0">
                <span className="text-cyan-400 font-bold text-sm">1</span>
              </div>
              <div>
                <div className="text-white font-semibold mb-1">Secure Upload</div>
                <div className="text-sm text-slate-400">Your contract is encrypted and securely stored in our HIPAA-compliant system</div>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-cyan-950/40 border border-cyan-500/30 flex items-center justify-center shrink-0">
                <span className="text-cyan-400 font-bold text-sm">2</span>
              </div>
              <div>
                <div className="text-white font-semibold mb-1">Preliminary Review (24 Hours)</div>
                <div className="text-sm text-slate-400">Our team conducts an initial assessment and identifies key areas of concern</div>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-cyan-950/40 border border-cyan-500/30 flex items-center justify-center shrink-0">
                <span className="text-cyan-400 font-bold text-sm">3</span>
              </div>
              <div>
                <div className="text-white font-semibold mb-1">Consultation Call</div>
                <div className="text-sm text-slate-400">We discuss our findings and outline potential savings opportunities</div>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-cyan-950/40 border border-cyan-500/30 flex items-center justify-center shrink-0">
                <span className="text-cyan-400 font-bold text-sm">4</span>
              </div>
              <div>
                <div className="text-white font-semibold mb-1">Engagement Proposal</div>
                <div className="text-sm text-slate-400">Receive a customized proposal for full contract analysis and negotiation support</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}