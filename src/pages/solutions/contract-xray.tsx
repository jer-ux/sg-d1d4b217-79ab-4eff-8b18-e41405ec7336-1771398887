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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { 
  Shield, 
  Upload, 
  FileText, 
  Search, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle2,
  Download,
  Eye,
  Clock,
  DollarSign,
  Users,
  BarChart3,
  Zap,
  FileCheck,
  X,
  Loader2,
  ArrowRight
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

  // Analysis state
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);

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
  };

  const uploadContract = async () => {
    if (!selectedFile) return;

    setUploading(true);
    setUploadProgress(0);

    try {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Authentication Required",
          description: "Please sign in to upload contracts.",
          variant: "destructive"
        });
        setUploading(false);
        return;
      }

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

      // Upload file to storage
      const fileExt = selectedFile.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `contracts/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('contract-uploads')
        .upload(filePath, selectedFile);

      if (uploadError) throw uploadError;

      // 2. Add record to contract_uploads
      const { data: uploadData, error: dbError } = await supabase
        .from('contract_uploads')
        .insert({
          file_name: selectedFile.name,
          file_size: selectedFile.size,
          file_type: selectedFile.type || 'application/pdf',
          storage_path: filePath,
          upload_status: 'completed',
          organization_id: '11111111-1111-1111-1111-111111111111' // Demo org ID
        })
        .select()
        .single();

      if (dbError) throw dbError;

      clearInterval(progressInterval);
      setUploadProgress(100);
      setUploadedContractId(uploadData.id);
      setUploadSuccess(true);

      // Start analysis simulation
      setTimeout(() => {
        startAnalysis(uploadData.id);
      }, 1000);

      toast({
        title: "Upload Successful!",
        description: "Your contract is being analyzed. You'll receive results shortly.",
      });

    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Upload Failed",
        description: "There was an error uploading your contract. Please try again.",
        variant: "destructive"
      });
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const startAnalysis = async (contractId: string) => {
    setAnalyzing(true);
    setAnalysisProgress(0);

    // Simulate AI analysis progress
    const stages = [
      { progress: 20, message: "Extracting text and provisions..." },
      { progress: 40, message: "Analyzing pricing structures..." },
      { progress: 60, message: "Identifying red flags..." },
      { progress: 80, message: "Calculating risk scores..." },
      { progress: 100, message: "Generating report..." }
    ];

    for (const stage of stages) {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setAnalysisProgress(stage.progress);
    }

    // Update contract status
    await supabase
      .from('contract_uploads')
      .update({ 
        upload_status: 'completed'
      })
      .eq('id', contractId);

    // Insert mock analysis results
    await supabase
      .from('contract_analysis_results')
      .insert({
        upload_id: contractId,
        contract_name: selectedFile?.name || "Uploaded Contract",
        overall_score: Math.floor(Math.random() * 30) + 60,
        potential_savings: Math.floor(Math.random() * 2000000) + 500000,
        risk_level: 'Medium'
      });

    setAnalyzing(false);
    
    toast({
      title: "Analysis Complete!",
      description: "Your contract analysis is ready to view.",
    });

    // Redirect to results after a moment
    setTimeout(() => {
      router.push(`/contract-analysis/${contractId}`);
    }, 2000);
  };

  const exportToPDF = () => {
    window.print();
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
        <title>Rx Defense: Contract X-Ray | Enterprise PBM Contract Intelligence</title>
        <meta name="description" content="AI-powered PBM contract analysis identifying hidden costs, unfavorable clauses, and savings opportunities. Enterprise-grade contract intelligence for CFOs and benefits leaders." />
      </Head>

      <div className="min-h-screen bg-black text-white">
        <SiteHeader />

        <main className="relative">
          {/* Hero Section */}
          <section className="relative py-20 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 via-transparent to-transparent" />
            <div className="absolute inset-0">
              <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
              <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-4xl mx-auto text-center">
                <Badge className="mb-6 bg-blue-500/10 text-blue-400 border-blue-500/20">
                  <Shield className="w-3 h-3 mr-1" />
                  Enterprise Contract Intelligence
                </Badge>
                
                <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Rx Defense: Contract X-Ray
                </h1>
                
                <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                  AI-powered analysis of PBM contracts identifying hidden costs, unfavorable clauses, and millions in potential savings. 
                  Get comprehensive contract intelligence in minutes, not months.
                </p>

                <div className="flex flex-wrap gap-4 justify-center">
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    onClick={() => setShowUploadModal(true)}
                  >
                    <Upload className="w-5 h-5 mr-2" />
                    Analyze Your Contract
                  </Button>
                  <Link href="/pbm-contract-vault">
                    <Button size="lg" variant="outline">
                      <FileText className="w-5 h-5 mr-2" />
                      Browse Contract Database
                    </Button>
                  </Link>
                  <Link href="/board/contract-intelligence">
                    <Button size="lg" variant="outline">
                      <BarChart3 className="w-5 h-5 mr-2" />
                      Board Dashboard
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Stats Section */}
          <section className="py-12 border-y border-gray-800">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {stats.map((stat, idx) => (
                  <div key={idx} className="text-center">
                    <div className="flex items-center justify-center mb-3">
                      <div className="p-3 bg-blue-500/10 rounded-lg">
                        <stat.icon className="w-6 h-6 text-blue-400" />
                      </div>
                    </div>
                    <div className="text-3xl font-bold mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-400 mb-1">{stat.label}</div>
                    <Badge variant="outline" className="text-xs text-green-500">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      {stat.trend}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Key Provisions Section */}
          <section className="py-20">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <Badge className="mb-4 bg-purple-500/10 text-purple-400 border-purple-500/20">
                  <Search className="w-3 h-3 mr-1" />
                  10 Critical Provisions Analyzed
                </Badge>
                <h2 className="text-4xl font-bold mb-4">What We Examine in Every Contract</h2>
                <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                  Our AI analyzes each provision for unfavorable terms, hidden costs, and potential savings opportunities
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
                {provisions.map((provision, idx) => (
                  <Card key={idx} className="bg-gray-900 border-gray-800 p-6 hover:border-blue-500/50 transition-all">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-2">{provision.title}</h3>
                        <p className="text-sm text-gray-400">{provision.description}</p>
                      </div>
                      <Badge 
                        variant="outline" 
                        className={`ml-4 ${
                          provision.risk === 'Critical' ? 'text-red-500 border-red-500/50' :
                          provision.risk === 'High' ? 'text-orange-500 border-orange-500/50' :
                          provision.risk === 'Medium' ? 'text-yellow-500 border-yellow-500/50' :
                          'text-green-500 border-green-500/50'
                        }`}
                      >
                        {provision.risk}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-800">
                      <span className="text-sm text-gray-400">Avg Savings Impact</span>
                      <span className="text-lg font-bold text-green-400">{provision.impact}</span>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* How It Works Section */}
          <section className="py-20 bg-gradient-to-b from-transparent via-blue-900/5 to-transparent">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <Badge className="mb-4 bg-green-500/10 text-green-400 border-green-500/20">
                  <Zap className="w-3 h-3 mr-1" />
                  Fast & Simple Process
                </Badge>
                <h2 className="text-4xl font-bold mb-4">How Contract X-Ray Works</h2>
                <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                  From upload to actionable insights in under 5 minutes
                </p>
              </div>

              <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Upload className="w-8 h-8 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">1. Upload Contract</h3>
                  <p className="text-gray-400">Securely upload your PBM contract (PDF, DOC, DOCX)</p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="w-8 h-8 text-purple-400" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">2. AI Analysis</h3>
                  <p className="text-gray-400">Our AI extracts and analyzes 35+ critical provisions</p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <AlertTriangle className="w-8 h-8 text-green-400" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">3. Risk Scoring</h3>
                  <p className="text-gray-400">Identify red flags and unfavorable terms instantly</p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-pink-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Download className="w-8 h-8 text-pink-400" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">4. Get Report</h3>
                  <p className="text-gray-400">Receive comprehensive analysis with savings opportunities</p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20">
            <div className="container mx-auto px-4">
              <Card className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 border-blue-500/20 p-12">
                <div className="max-w-3xl mx-auto text-center">
                  <h2 className="text-4xl font-bold mb-4">Ready to Uncover Hidden Contract Costs?</h2>
                  <p className="text-xl text-gray-300 mb-8">
                    Join 89 leading organizations using Contract X-Ray to identify millions in potential savings
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button 
                      size="lg" 
                      className="bg-white text-black hover:bg-gray-100"
                      onClick={() => setShowUploadModal(true)}
                    >
                      <Upload className="w-5 h-5 mr-2" />
                      Upload Your Contract
                    </Button>
                    <Link href="/request-demo">
                      <Button size="lg" variant="outline">
                        <Users className="w-5 h-5 mr-2" />
                        Schedule a Demo
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            </div>
          </section>
        </main>

        {/* Upload Modal */}
        <Dialog open={showUploadModal} onOpenChange={setShowUploadModal}>
          <DialogContent className="bg-gray-900 border-gray-800 max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-2xl">Upload PBM Contract for Analysis</DialogTitle>
              <DialogDescription>
                Our AI will analyze your contract and identify potential savings opportunities within minutes
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
              {!uploadSuccess && !analyzing && (
                <>
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
                        <span>AI analyst evaluates 35+ contract provisions</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>Identifies hidden costs and unfavorable terms</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>Generates comprehensive analysis report</span>
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
                    <p className="text-gray-400">Our AI is examining your contract provisions...</p>
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
                      <span>Generating report</span>
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
                    <Button className="flex-1" onClick={() => router.push(`/contract-analysis/${uploadedContractId}`)}>
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