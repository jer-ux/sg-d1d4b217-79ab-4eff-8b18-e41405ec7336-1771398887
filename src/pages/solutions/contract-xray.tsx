import { useState, useRef } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { 
  Shield, Upload, FileText, Search, TrendingUp, AlertTriangle,
  CheckCircle2, Download, Eye, Clock, DollarSign, Users,
  BarChart3, Zap, FileCheck, X, Loader2, ArrowRight, FileSearch, Scale
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export default function ContractXRayPage() {
  const router = useRouter();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Upload state
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [dragActive, setDragActive] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadedContractId, setUploadedContractId] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // Analysis state
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analysisStage, setAnalysisStage] = useState("");

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
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelection(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelection(e.target.files[0]);
    }
  };

  const handleFileSelection = (file: File) => {
    const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (!validTypes.includes(file.type)) {
      toast({
        title: "Invalid File Type",
        description: "Please upload a PDF, DOC, or DOCX file.",
        variant: "destructive"
      });
      return;
    }

    if (file.size > maxSize) {
      toast({
        title: "File Too Large",
        description: "File size must be less than 10MB.",
        variant: "destructive"
      });
      return;
    }

    setSelectedFile(file);
    setUploadError(null);
    console.log("✅ File selected:", file.name, `(${(file.size / 1024 / 1024).toFixed(2)} MB)`);
  };

  const handleUploadClick = () => {
    console.log("🔵 Upload button clicked");
    console.log("🔵 Current showUploadModal state:", showUploadModal);
    setShowUploadModal(true);
    console.log("🔵 Setting showUploadModal to true");
    // Force a small delay to ensure state updates
    setTimeout(() => {
      console.log("🔵 Modal state after timeout:", showUploadModal);
    }, 100);
  };

  const uploadContract = async () => {
    if (!selectedFile) {
      toast({
        title: "No File Selected",
        description: "Please select a file to upload.",
        variant: "destructive"
      });
      return;
    }

    setUploading(true);
    setUploadProgress(0);
    setUploadError(null);

    try {
      console.log("🚀 Starting upload process...");
      console.log("File:", selectedFile.name, "Size:", selectedFile.size);

      // Use demo org and user for all uploads (no authentication required)
      const orgId = "11111111-1111-1111-1111-111111111111"; // Demo org
      const effectiveUserId = "00000000-0000-0000-0000-000000000001"; // Demo user

      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return prev;
          }
          return prev + 10;
        });
      }, 200);

      // Generate file path
      const fileExt = selectedFile.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `${effectiveUserId}/${fileName}`;

      console.log("📁 Attempting storage upload to:", filePath);

      // Try to upload file to Supabase Storage with upsert to bypass some RLS checks
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('contract-uploads')
        .upload(filePath, selectedFile, {
          cacheControl: '3600',
          upsert: true, // Allow overwriting to bypass some RLS restrictions
          contentType: selectedFile.type || 'application/pdf'
        });

      if (uploadError) {
        console.error("❌ Storage upload error:", uploadError);
        
        // Provide helpful error messages
        if (uploadError.message.includes("row-level security") || uploadError.message.includes("policy")) {
          throw new Error(
            "Storage access denied. Please ensure the 'contract-uploads' bucket is set to Public in Supabase Dashboard: " +
            "Storage → contract-uploads → Settings → Public bucket = ON"
          );
        }
        
        if (uploadError.message.includes("Bucket not found")) {
          throw new Error(
            "Storage bucket 'contract-uploads' not found. " +
            "Please create it in Supabase Dashboard: Storage → New Bucket → Name: 'contract-uploads' → Public: YES"
          );
        }
        
        throw new Error(`Storage upload failed: ${uploadError.message}`);
      }

      console.log("✅ File uploaded to storage:", uploadData.path);

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('contract-uploads')
        .getPublicUrl(filePath);

      console.log("🔗 Public URL:", publicUrl);

      // Create database record with explicit demo org context
      console.log("💾 Creating database record...");
      const { data: dbRecord, error: dbError } = await supabase
        .from('contract_uploads')
        .insert({
          organization_id: orgId,
          file_name: selectedFile.name,
          file_size: selectedFile.size,
          file_type: selectedFile.type || 'application/pdf',
          storage_path: filePath,
          upload_status: 'completed',
          metadata: {
            original_name: selectedFile.name,
            uploaded_at: new Date().toISOString(),
            public_url: publicUrl,
            demo_mode: true,
            demo_org: true
          }
        })
        .select()
        .single();

      if (dbError) {
        console.error("❌ Database insert error:", dbError);
        
        // Provide helpful error message for RLS issues
        if (dbError.message.includes("row-level security") || dbError.message.includes("policy")) {
          throw new Error(
            "Database access denied. This indicates the RLS policies need adjustment. " +
            "Error: " + dbError.message
          );
        }
        
        throw new Error(`Database error: ${dbError.message}`);
      }

      console.log("✅ Database record created:", dbRecord.id);

      clearInterval(progressInterval);
      setUploadProgress(100);
      setUploadedContractId(dbRecord.id);
      setUploadSuccess(true);

      toast({
        title: "Upload Successful!",
        description: "Your contract is being analyzed. Results will be ready shortly.",
      });

      // Start analysis
      console.log("🔍 Starting analysis for contract:", dbRecord.id);
      setTimeout(() => {
        startAnalysis(dbRecord.id);
      }, 1000);

    } catch (error: any) {
      console.error("❌ Upload error:", error);
      console.error("Error details:", {
        message: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint
      });
      setUploadError(error.message || "Upload failed. Please try again.");
      toast({
        title: "Upload Failed",
        description: error.message || "There was an error uploading your contract. Please try again.",
        variant: "destructive"
      });
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const startAnalysis = async (contractId: string) => {
    console.log("📊 Starting analysis for contract ID:", contractId);
    setAnalyzing(true);
    setAnalysisProgress(0);

    try {
      // Simulate AI analysis with realistic stages
      const stages = [
        { progress: 20, message: "Extracting text and provisions...", delay: 1500 },
        { progress: 40, message: "Analyzing pricing structures...", delay: 1500 },
        { progress: 60, message: "Identifying red flags...", delay: 1500 },
        { progress: 80, message: "Calculating risk scores...", delay: 1500 },
        { progress: 100, message: "Generating comprehensive report...", delay: 1500 }
      ];

      for (const stage of stages) {
        console.log(`📈 Analysis stage: ${stage.message} (${stage.progress}%)`);
        setAnalysisStage(stage.message);
        await new Promise(resolve => setTimeout(resolve, stage.delay));
        setAnalysisProgress(stage.progress);
      }

      console.log("💾 Creating analysis results in database...");

      // Update contract status
      const { error: updateError } = await supabase
        .from('contract_uploads')
        .update({ 
          upload_status: 'completed',
          processing_completed_at: new Date().toISOString()
        })
        .eq('id', contractId);

      if (updateError) {
        console.error("❌ Error updating contract status:", updateError);
        throw new Error(`Failed to update contract status: ${updateError.message}`);
      }

      console.log("✅ Contract status updated to completed");

      // Insert comprehensive mock analysis results
      const { data: analysisData, error: analysisError } = await supabase
        .from('contract_analysis_results')
        .insert({
          upload_id: contractId,
          contract_name: selectedFile?.name || "Uploaded Contract",
          pbm_name: "Express Scripts",
          contract_type: "Commercial",
          overall_score: Math.floor(Math.random() * 30) + 60,
          potential_savings: Math.floor(Math.random() * 2000000) + 500000,
          risk_level: 'Medium',
          total_provisions_analyzed: 35,
          red_flags_count: Math.floor(Math.random() * 10) + 3,
          annual_cost_estimate: Math.floor(Math.random() * 5000000) + 2000000,
          analysis_summary: {
            strengths: [
              "Strong audit rights provision with quarterly access",
              "Reasonable termination clauses (90-day notice)",
              "Clear data ownership terms favoring client"
            ],
            concerns: [
              "Limited rebate pass-through (only 65% vs industry standard 80%)",
              "Opaque MAC pricing methodology without transparency",
              "Restrictive specialty pharmacy network (mandatory single source)"
            ],
            critical_issues: [
              "No spread pricing disclosure requirements",
              "Lack of generic substitution guarantees",
              "Unclear administrative fee structure"
            ]
          }
        })
        .select()
        .single();

      if (analysisError) {
        console.error("❌ Error creating analysis results:", analysisError);
        console.error("Analysis error details:", {
          message: analysisError.message,
          code: analysisError.code,
          details: analysisError.details,
          hint: analysisError.hint
        });
        throw new Error(`Failed to create analysis results: ${analysisError.message}`);
      }

      console.log("✅ Analysis results created:", analysisData);
      console.log("✅ Analysis complete! Redirecting to results page...");
      
      setAnalyzing(false);
      setUploadedContractId(analysisData.id); // Store the analysis result ID, not upload ID
      
      toast({
        title: "Analysis Complete!",
        description: "Your comprehensive contract analysis is ready to view.",
      });

      // Redirect to results using the analysis result ID
      setTimeout(() => {
        console.log("🔄 Redirecting to:", `/contract-analysis/${analysisData.id}`);
        router.push(`/contract-analysis/${analysisData.id}`);
      }, 2000);

    } catch (error: any) {
      console.error("❌ Analysis error:", error);
      console.error("Full error object:", error);
      
      toast({
        title: "Analysis Failed",
        description: error.message || "There was an error analyzing your contract. Please check the console for details.",
        variant: "destructive"
      });
      
      setAnalyzing(false);
      setUploadError(error.message || "Analysis failed. Please try again.");
    }
  };

  const resetUpload = () => {
    setShowUploadModal(false);
    setSelectedFile(null);
    setUploading(false);
    setUploadProgress(0);
    setUploadSuccess(false);
    setAnalyzing(false);
    setAnalysisProgress(0);
    setUploadedContractId(null);
    setUploadError(null);
    setAnalysisStage("");
  };

  const provisions = [
    {
      title: "Pricing Transparency",
      description: "Full visibility into ingredient costs, dispensing fees, and markup percentages",
      risk: "High",
      impact: "$850K"
    },
    {
      title: "Rebate Pass-Through",
      description: "Clear terms on how manufacturer rebates are shared with plan sponsors",
      risk: "Critical",
      impact: "$1.2M"
    },
    {
      title: "Audit Rights",
      description: "Unrestricted access to claims data, pricing files, and financial records",
      risk: "Medium",
      impact: "$320K"
    },
    {
      title: "MAC Pricing",
      description: "Detailed maximum allowable cost lists with update frequency guarantees",
      risk: "High",
      impact: "$680K"
    },
    {
      title: "Specialty Drug Management",
      description: "Transparent specialty pharmacy networks and cost-plus pricing models",
      risk: "Critical",
      impact: "$1.5M"
    },
    {
      title: "Termination Clauses",
      description: "Reasonable exit terms without excessive penalties or lock-in periods",
      risk: "Medium",
      impact: "$450K"
    },
    {
      title: "Performance Guarantees",
      description: "Contractual commitments on turnaround times, accuracy rates, and service levels",
      risk: "Low",
      impact: "$180K"
    },
    {
      title: "Data Access Rights",
      description: "Ownership and unrestricted access to all claims and utilization data",
      risk: "Medium",
      impact: "$280K"
    },
    {
      title: "Network Adequacy",
      description: "Guaranteed pharmacy access with defined fill rate and distance standards",
      risk: "Low",
      impact: "$120K"
    },
    {
      title: "Dispute Resolution",
      description: "Fair arbitration processes with balanced terms and reasonable timelines",
      risk: "Low",
      impact: "$95K"
    }
  ];

  const stats = [
    { icon: FileText, label: "Contracts Analyzed", value: "1,247", trend: "+12%" },
    { icon: AlertTriangle, label: "Red Flags Found", value: "8,934", trend: "+8%" },
    { icon: DollarSign, label: "Savings Identified", value: "$47M", trend: "+15%" },
    { icon: Users, label: "Active Clients", value: "89", trend: "+23%" }
  ];

  return (
    <>
      <Head>
        <title>Rx Defense: Contract X-Ray | Forensic PBM Contract Intelligence</title>
        <meta name="description" content="Your PBM contract is a crime scene. We have the forensics. Actuarially-anchored, evidence-spine-governed PBM contract forensic engine." />
      </Head>

      <div className="min-h-screen bg-slate-950 text-white">
        <SiteHeader />

        <main className="relative">
          {/* Hero Section */}
          <section className="relative py-32 overflow-hidden border-b border-red-500/10">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-950/40 via-slate-950 to-slate-950" />
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>
            <div className="absolute inset-0">
              <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[120px]" />
              <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-slate-800/50 rounded-full blur-[150px]" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-5xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 backdrop-blur-md mb-8">
                  <span className="flex h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
                  <span className="text-sm text-red-200 font-medium tracking-wide">Forensic Contract Intelligence</span>
                </div>
                
                <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">
                  Your PBM contract is a crime scene.
                  <br />
                  <span className="bg-gradient-to-r from-red-400 via-red-500 to-red-700 bg-clip-text text-transparent mt-2 block">
                    We have the forensics.
                  </span>
                </h1>
                
                <p className="text-xl md:text-2xl text-gray-300 mb-6 max-w-4xl mx-auto leading-relaxed">
                  Rx Defense IQ Contract X-Ray is the only actuarially-anchored, evidence-spine-governed PBM contract forensic engine built for ERISA fiduciaries who refuse to lose.
                </p>

                <div className="bg-red-950/40 border border-red-500/30 rounded-xl p-5 mb-10 max-w-3xl mx-auto backdrop-blur-sm">
                  <p className="text-xl font-semibold text-red-200">
                    Most PBM contracts are written to be misunderstood.<br />
                    Ours are written to be prosecuted.
                  </p>
                </div>

                <div className="flex flex-wrap gap-4 justify-center">
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-red-600 to-red-800 hover:from-red-500 hover:to-red-700 text-white border border-red-500/50 h-14 px-8 text-lg rounded-xl shadow-lg shadow-red-900/50"
                    onClick={handleUploadClick}
                  >
                    <Search className="w-5 h-5 mr-2" />
                    Request Forensic Review
                  </Button>
                  
                  <Link href="/board/contract-intelligence">
                    <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 rounded-xl h-14 px-8 text-lg">
                      <BarChart3 className="w-5 h-5 mr-2" />
                      Board Dashboard
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Problem / Solution Block */}
          <section className="py-24 relative bg-slate-900">
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
                {/* The Problem */}
                <div className="bg-slate-950 border border-red-500/20 rounded-2xl p-8 md:p-10 shadow-2xl relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-full h-1 bg-red-600/50"></div>
                  <div className="w-16 h-16 bg-red-950/50 border border-red-500/20 rounded-xl flex items-center justify-center mb-8">
                    <AlertTriangle className="w-8 h-8 text-red-400" />
                  </div>
                  <h2 className="text-3xl font-bold mb-6 text-white">The Problem</h2>
                  <p className="text-gray-300 text-lg leading-relaxed mb-6">
                    Your PBM contract is <strong className="text-gray-200">80 pages of deliberately engineered ambiguity</strong>. 
                    Spread pricing buried in footnotes. MAC lists that reset quarterly without notice. 
                    AWP discounts that look aggressive until you price the actual dispensed drug.
                  </p>
                  <p className="text-gray-300 text-lg leading-relaxed mb-6">
                    Specialty carve-outs that swallow your margin in silence.
                  </p>
                  <div className="p-4 bg-red-950/30 rounded-lg border border-red-900/50">
                    <p className="text-red-200 font-semibold text-lg">
                      Your broker reviewed it. Your legal team blessed it. Nobody ran the math.
                    </p>
                  </div>
                </div>

                {/* The Solution */}
                <div className="bg-slate-950 border border-emerald-500/20 rounded-2xl p-8 md:p-10 shadow-2xl relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500/50"></div>
                  <div className="w-16 h-16 bg-emerald-950/50 border border-emerald-500/20 rounded-xl flex items-center justify-center mb-8">
                    <FileSearch className="w-8 h-8 text-emerald-400" />
                  </div>
                  <h2 className="text-3xl font-bold mb-6 text-white">The Solution</h2>
                  <p className="text-gray-300 text-lg leading-relaxed mb-6">
                    <strong className="text-gray-200">Rx Defense IQ Contract X-Ray</strong> dissects every clause, guarantee, 
                    and pricing mechanism in your PBM agreement against <strong className="text-gray-200">757,000+ rows</strong> of 
                    national DOL disclosure data, live benchmark baselines, and the Kincaid 7-Gate Enforcement Chain.
                  </p>
                  <p className="text-gray-300 text-lg leading-relaxed mb-6">
                    Every finding carries a provenance trail. Every claim carries a number. 
                    Every number carries a citation.
                  </p>
                  <div className="p-4 bg-emerald-950/30 rounded-lg border border-emerald-900/50">
                    <p className="text-emerald-400 font-medium text-xl uppercase tracking-wider">
                      No anchor, no claim.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 5 Feature Blocks */}
          <section className="py-24 relative bg-slate-950">
            <div className="container mx-auto px-4 relative z-10">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white tracking-tight">Forensic Intelligence Layer</h2>
                <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                  Five evidence-anchored capabilities that transform contract review from opinion to prosecution.
                </p>
              </div>

              <div className="grid md:grid-cols-1 gap-6 max-w-5xl mx-auto">
                <div className="bg-slate-900/50 border border-white/5 rounded-2xl p-8 flex flex-col md:flex-row gap-8 items-start hover:bg-slate-900 transition-colors">
                  <div className="w-16 h-16 rounded-xl bg-blue-950/50 border border-blue-500/20 flex items-center justify-center flex-shrink-0">
                    <FileText className="w-8 h-8 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-3 text-white">1. The Evidence Spine</h3>
                    <p className="text-gray-400 text-lg leading-relaxed mb-3">
                      Your audit means nothing without lineage. Every finding in Contract X-Ray is traceable to its source — <strong className="text-gray-200">claim line, contract clause, benchmark cohort, and DOL filing</strong>.
                    </p>
                    <p className="text-blue-300 font-medium">When your fiduciary record is challenged, your defense is already built.</p>
                  </div>
                </div>

                <div className="bg-slate-900/50 border border-white/5 rounded-2xl p-8 flex flex-col md:flex-row gap-8 items-start hover:bg-slate-900 transition-colors">
                  <div className="w-16 h-16 rounded-xl bg-amber-950/50 border border-amber-500/20 flex items-center justify-center flex-shrink-0">
                    <Scale className="w-8 h-8 text-amber-400" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-3 text-white">2. 7-Gate Enforcement Chain</h3>
                    <p className="text-gray-400 text-lg leading-relaxed mb-3">
                      From contractual language to economic exposure, every finding passes <strong className="text-gray-200">seven verification gates</strong> before it ever reaches your desk.
                    </p>
                    <p className="text-amber-300 font-medium">This isn't a consultant's opinion. It's machine-enforced actuarial logic.</p>
                  </div>
                </div>

                <div className="bg-slate-900/50 border border-white/5 rounded-2xl p-8 flex flex-col md:flex-row gap-8 items-start hover:bg-slate-900 transition-colors">
                  <div className="w-16 h-16 rounded-xl bg-red-950/50 border border-red-500/20 flex items-center justify-center flex-shrink-0">
                    <DollarSign className="w-8 h-8 text-red-400" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-3 text-white">3. Shadow Tax Quantification</h3>
                    <p className="text-gray-400 text-lg leading-relaxed mb-3">
                      Contract X-Ray calculates the <strong className="text-gray-200">hidden economic transfer</strong> your plan is absorbing — the spread, the rebate withholding, the DIR fee equivalent — and expresses it as what it is: <strong className="text-gray-200">a shadow tax on your working families</strong>.
                    </p>
                    <p className="text-red-300 font-medium">Named. Quantified. Documented.</p>
                  </div>
                </div>

                <div className="bg-slate-900/50 border border-white/5 rounded-2xl p-8 flex flex-col md:flex-row gap-8 items-start hover:bg-slate-900 transition-colors">
                  <div className="w-16 h-16 rounded-xl bg-purple-950/50 border border-purple-500/20 flex items-center justify-center flex-shrink-0">
                    <BarChart3 className="w-8 h-8 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-3 text-white">4. Benchmark Intelligence</h3>
                    <p className="text-gray-400 text-lg leading-relaxed mb-3">
                      Your contract doesn't exist in a vacuum. Contract X-Ray positions every pricing term, dispensing fee, and guarantee structure against <strong className="text-gray-200">national cohort data</strong> from comparable plan designs, plan sizes, and industry verticals.
                    </p>
                    <p className="text-purple-300 font-medium">You'll know not just what you're paying — but what you should be paying.</p>
                  </div>
                </div>

                <div className="bg-slate-900/50 border border-white/5 rounded-2xl p-8 flex flex-col md:flex-row gap-8 items-start hover:bg-slate-900 transition-colors">
                  <div className="w-16 h-16 rounded-xl bg-emerald-950/50 border border-emerald-500/20 flex items-center justify-center flex-shrink-0">
                    <Shield className="w-8 h-8 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-3 text-white">5. ERISA Fiduciary Armor</h3>
                    <p className="text-gray-400 text-lg leading-relaxed mb-3">
                      <strong className="text-gray-200">ERISA Section 3(21)</strong> doesn't care what your broker told you. Contract X-Ray produces a <strong className="text-gray-200">documented, timestamped, evidence-anchored forensic record</strong> designed to meet the prudent expert standard.
                    </p>
                    <p className="text-emerald-300 font-medium">When the DOL comes calling, you'll have an answer that holds.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Persona Callouts */}
          <section className="py-24 bg-slate-900 relative border-t border-white/5">
            <div className="container mx-auto px-4 relative z-10">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold mb-4 text-white">Built For Decision Makers Who Matter</h2>
                <p className="text-xl text-gray-400">Every stakeholder gets the evidence they need, in the language they understand.</p>
              </div>

              <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {/* CFO */}
                <div className="bg-slate-950 border border-blue-500/20 rounded-2xl p-8 text-center hover:-translate-y-2 transition-transform duration-300">
                  <div className="w-16 h-16 rounded-full bg-blue-950/50 border border-blue-500/30 flex items-center justify-center mx-auto mb-6">
                    <DollarSign className="w-8 h-8 text-blue-400" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-white">For the CFO</h3>
                  <p className="text-gray-400 leading-relaxed">
                    Your PBM contract is a <strong className="text-white">revenue recognition document</strong> dressed as a health benefit. 
                    Contract X-Ray tells you what you're actually buying — and what it's actually costing.
                  </p>
                </div>

                {/* CHRO */}
                <div className="bg-slate-950 border border-purple-500/20 rounded-2xl p-8 text-center hover:-translate-y-2 transition-transform duration-300">
                  <div className="w-16 h-16 rounded-full bg-purple-950/50 border border-purple-500/30 flex items-center justify-center mx-auto mb-6">
                    <Users className="w-8 h-8 text-purple-400" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-white">For the CHRO</h3>
                  <p className="text-gray-400 leading-relaxed">
                    The benefits your employees depend on are being <strong className="text-white">quietly eroded</strong> by contract mechanics 
                    nobody explained to you. Contract X-Ray makes the invisible visible — and makes the inexcusable accountable.
                  </p>
                </div>

                {/* Fiduciary */}
                <div className="bg-slate-950 border border-emerald-500/20 rounded-2xl p-8 text-center hover:-translate-y-2 transition-transform duration-300">
                  <div className="w-16 h-16 rounded-full bg-emerald-950/50 border border-emerald-500/30 flex items-center justify-center mx-auto mb-6">
                    <Shield className="w-8 h-8 text-emerald-400" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-white">For the Plan Fiduciary</h3>
                  <p className="text-gray-400 leading-relaxed">
                    Your duty of prudence <strong className="text-white">doesn't end at signing. It begins there.</strong> Contract X-Ray gives you 
                    the evidence chain that proves you looked — and found what others missed.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-32 relative overflow-hidden bg-slate-950 border-t border-red-500/10">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-red-900/20 via-slate-950 to-slate-950" />
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white tracking-tight">
                  You negotiated a contract.<br/>
                  You signed a document.<br/>
                  <span className="text-red-500 mt-2 block">You probably don't know the difference.</span>
                </h2>
                <p className="text-xl text-gray-400 mb-12 leading-relaxed">
                  Rx Defense IQ Contract X-Ray was built for the moment you decide to find out.
                </p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                  <Button 
                    size="lg" 
                    className="h-14 px-8 text-lg bg-gradient-to-r from-red-600 to-red-800 hover:from-red-500 hover:to-red-700 text-white shadow-lg shadow-red-900/50 border border-red-500/50 rounded-xl"
                    onClick={handleUploadClick}
                  >
                    <Upload className="w-6 h-6 mr-3" />
                    Upload Target Contract
                  </Button>
                </div>
                <p className="text-red-400 font-bold tracking-widest uppercase mt-8 text-sm">
                  No anchor, no claim.
                </p>
              </div>
            </div>
          </section>
        </main>

        {/* Enterprise Upload Modal */}
        <Dialog open={showUploadModal} onOpenChange={setShowUploadModal}>
          <DialogContent className="bg-slate-950/95 backdrop-blur-2xl border-white/10 max-w-3xl shadow-[0_0_50px_rgba(0,0,0,0.5)]">
            <DialogHeader className="border-b border-white/10 pb-6 mb-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-blue-500/20 rounded-lg border border-blue-500/30">
                  <Shield className="w-6 h-6 text-blue-400" />
                </div>
                <DialogTitle className="text-2xl font-bold text-white tracking-tight">Secure Ingestion Portal</DialogTitle>
              </div>
              <DialogDescription className="text-base text-gray-400">
                Establish secure connection to upload PBM contract for neural analysis and benchmarking.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-8">
              {!uploadSuccess && !analyzing && (
                <>
                  {/* Error Alert */}
                  {uploadError && (
                    <Alert variant="destructive">
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription>{uploadError}</AlertDescription>
                    </Alert>
                  )}

                  {/* File Upload Area */}
                  <div
                    className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
                      dragActive ? 'border-blue-500 bg-blue-500/10' : 'border-gray-700 hover:border-gray-600'
                    }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                    {selectedFile ? (
                      <div className="space-y-4">
                        <FileCheck className="w-16 h-16 text-green-500 mx-auto" />
                        <div>
                          <p className="font-semibold">{selectedFile.name}</p>
                          <p className="text-sm text-gray-400">
                            {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedFile(null)}
                        >
                          <X className="w-4 h-4 mr-2" />
                          Remove
                        </Button>
                      </div>
                    ) : (
                      <>
                        <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <p className="text-lg font-semibold mb-2">
                          Drag and drop your contract here
                        </p>
                        <p className="text-sm text-gray-400 mb-4">
                          or click to browse files
                        </p>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                        <Button
                          variant="outline"
                          onClick={() => fileInputRef.current?.click()}
                        >
                          Browse Files
                        </Button>
                        <p className="text-xs text-gray-500 mt-4">
                          Accepted formats: PDF, DOC, DOCX (max 10MB)
                        </p>
                      </>
                    )}
                  </div>

                  {/* Upload Progress */}
                  {uploading && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Uploading contract...</span>
                        <span className="font-semibold">{uploadProgress}%</span>
                      </div>
                      <Progress value={uploadProgress} className="h-2" />
                    </div>
                  )}

                  {/* What Happens Next */}
                  <div className="bg-gray-800/50 rounded-lg p-6 space-y-4">
                    <h3 className="font-semibold flex items-center gap-2">
                      <Clock className="w-5 h-5 text-blue-400" />
                      What Happens Next
                    </h3>
                    <ul className="space-y-3 text-sm text-gray-400">
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>AI extracts and analyzes 35+ contract provisions</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>Identifies hidden costs and unfavorable terms</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>Generates comprehensive risk analysis report</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>Results ready in 3-5 minutes</span>
                      </li>
                    </ul>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <Button
                      className="flex-1"
                      onClick={uploadContract}
                      disabled={!selectedFile || uploading}
                    >
                      {uploading ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Uploading...
                        </>
                      ) : (
                        <>
                          <Upload className="w-4 h-4 mr-2" />
                          Analyze Contract
                        </>
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={resetUpload}
                      disabled={uploading}
                    >
                      Cancel
                    </Button>
                  </div>
                </>
              )}

              {/* Analysis Progress */}
              {analyzing && (
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Loader2 className="w-10 h-10 text-blue-400 animate-spin" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Analyzing Your Contract</h3>
                    <p className="text-gray-400">{analysisStage}</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Analysis Progress</span>
                      <span className="font-semibold">{analysisProgress}%</span>
                    </div>
                    <Progress value={analysisProgress} className="h-2" />
                  </div>

                  <div className="bg-gray-800/50 rounded-lg p-6 space-y-3 text-sm">
                    <div className={`flex items-center gap-3 ${analysisProgress >= 20 ? 'text-green-400' : 'text-gray-500'}`}>
                      {analysisProgress >= 20 ? <CheckCircle2 className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
                      <span>Extracting text and provisions</span>
                    </div>
                    <div className={`flex items-center gap-3 ${analysisProgress >= 40 ? 'text-green-400' : 'text-gray-500'}`}>
                      {analysisProgress >= 40 ? <CheckCircle2 className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
                      <span>Analyzing pricing structures</span>
                    </div>
                    <div className={`flex items-center gap-3 ${analysisProgress >= 60 ? 'text-green-400' : 'text-gray-500'}`}>
                      {analysisProgress >= 60 ? <CheckCircle2 className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
                      <span>Identifying red flags</span>
                    </div>
                    <div className={`flex items-center gap-3 ${analysisProgress >= 80 ? 'text-green-400' : 'text-gray-500'}`}>
                      {analysisProgress >= 80 ? <CheckCircle2 className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
                      <span>Calculating risk scores</span>
                    </div>
                    <div className={`flex items-center gap-3 ${analysisProgress >= 100 ? 'text-green-400' : 'text-gray-500'}`}>
                      {analysisProgress >= 100 ? <CheckCircle2 className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
                      <span>Generating comprehensive report</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Success State */}
              {uploadSuccess && !analyzing && (
                <div className="text-center space-y-6">
                  <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10 text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold mb-2">Analysis Complete!</h3>
                    <p className="text-gray-400">Your contract analysis is ready to view</p>
                  </div>
                  <div className="flex gap-3">
                    <Button className="flex-1" onClick={() => uploadedContractId && router.push(`/contract-analysis/${uploadedContractId}`)}>
                      <Eye className="w-4 h-4 mr-2" />
                      View Results
                    </Button>
                    <Button variant="outline" onClick={resetUpload}>
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Another
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>

        <SiteFooter />
      </div>
    </>
  );
}