import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Nav from "@/components/Nav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Shield, Upload, BarChart3, FileText, CheckCircle2, AlertTriangle, XCircle, Zap, Lock, TrendingUp, Users, Download, ArrowRight, Star, X, FileCheck } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export default function ContractXRayPage() {
  const [selectedTier, setSelectedTier] = useState("professional");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [dragActive, setDragActive] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      validateAndSetFile(file);
    }
  };

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
    
    const file = e.dataTransfer.files?.[0];
    if (file) {
      validateAndSetFile(file);
    }
  };

  const validateAndSetFile = (file: File) => {
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ];
    
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (!allowedTypes.includes(file.type)) {
      toast({
        title: "Invalid File Type",
        description: "Please upload a PDF, DOC, or DOCX file.",
        variant: "destructive",
      });
      return;
    }

    if (file.size > maxSize) {
      toast({
        title: "File Too Large",
        description: "Please upload a file smaller than 10MB.",
        variant: "destructive",
      });
      return;
    }

    setUploadedFile(file);
  };

  const handleUpload = async () => {
    if (!uploadedFile) return;

    setUploading(true);
    setUploadProgress(0);

    try {
      // Simulate progress
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return prev;
          }
          return prev + 10;
        });
      }, 200);

      // Upload to Supabase Storage
      const fileExt = uploadedFile.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `contracts/${fileName}`;

      const { data, error } = await supabase.storage
        .from("contract-uploads")
        .upload(filePath, uploadedFile);

      clearInterval(progressInterval);
      setUploadProgress(100);

      if (error) {
        throw error;
      }

      // Success
      setTimeout(() => {
        toast({
          title: "Contract Uploaded Successfully!",
          description: "Our AI analyst will evaluate your contract within 24-48 hours. We'll email you when your reports are ready.",
        });
        setShowUploadModal(false);
        setUploadedFile(null);
        setUploading(false);
        setUploadProgress(0);
      }, 500);

    } catch (error) {
      console.error("Upload error:", error);
      toast({
        title: "Upload Failed",
        description: "There was an error uploading your contract. Please try again or contact support.",
        variant: "destructive",
      });
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const provisions = [
    { name: "Fiduciary Loyalty Commitment", score: 42, rating: "red", weight: 10 },
    { name: "Pass-Through Pricing Integrity", score: 73, rating: "good", weight: 10 },
    { name: "Rebate & Manufacturer Revenue", score: 85, rating: "good", weight: 10 },
    { name: "Data Ownership & Rights", score: 78, rating: "good", weight: 10 },
    { name: "Audit Rights & Verification", score: 41, rating: "red", weight: 10 },
    { name: "COI & Network Neutrality", score: 88, rating: "good", weight: 10 },
    { name: "Carve-Out & Vendor Rights", score: 14, rating: "red", weight: 10 },
    { name: "Lowest Net Cost & Clinical Integrity", score: 91, rating: "excellent", weight: 10 },
    { name: "Termination & Clean Exit", score: 67, rating: "fair", weight: 10 },
    { name: "Administrative Fee Transparency", score: 83, rating: "good", weight: 10 }
  ];

  const overallScore = Math.round(provisions.reduce((sum, p) => sum + p.score, 0) / provisions.length);

  const getRatingColor = (rating: string) => {
    switch (rating) {
      case "excellent": return "text-green-600 bg-green-50";
      case "good": return "text-blue-600 bg-blue-50";
      case "fair": return "text-yellow-600 bg-yellow-50";
      case "red": return "text-red-600 bg-red-50";
      default: return "text-gray-600 bg-gray-50";
    }
  };

  const getRatingLabel = (score: number) => {
    if (score >= 90) return "Excellent";
    if (score >= 75) return "Good";
    if (score >= 60) return "Fair";
    if (score >= 45) return "Concern";
    return "Red Flag";
  };

  return (
    <>
      <Head>
        <title>Kincaid iQ Rx Defense Contract X-Ray™ | AI-Powered PBM Contract Analysis</title>
        <meta name="description" content="AI-powered PBM contract analysis. Evaluate your pharmacy benefit contracts against fiduciary-aligned standards. Enterprise-grade contract intelligence." />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <Nav />

        {/* Hero Section */}
        <section className="relative pt-32 pb-20 px-6">
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
          
          <div className="max-w-7xl mx-auto relative">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-blue-500/10 text-blue-400 border-blue-500/20">
                <Shield className="w-3 h-3 mr-1" />
                Powered by Nautilus Health Institute Standards
              </Badge>
              
              <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
                CONTRACT X-RAY™
              </h1>
              
              <p className="text-2xl md:text-3xl text-blue-200 mb-4 font-light">
                Fiduciary-Aligned PBM Contract Standards
              </p>
              
              <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
                AI-powered contract analysis evaluates PBM contracts against 35 issues across 10 key provisions. 
                Know exactly what you're signing before you commit.
              </p>

              <div className="flex flex-wrap gap-4 justify-center mb-12">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700" onClick={() => setShowUploadModal(true)}>
                  <Upload className="w-5 h-5 mr-2" />
                  Analyze Your Contract
                </Button>
                <Button size="lg" variant="outline" className="border-blue-400/30 text-blue-300 hover:bg-blue-500/10">
                  <FileText className="w-5 h-5 mr-2" />
                  View Sample Report
                </Button>
              </div>

              {/* Key Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                <Card className="bg-slate-800/50 border-blue-500/20 backdrop-blur">
                  <CardContent className="pt-6 text-center">
                    <div className="text-4xl font-bold text-blue-400 mb-2">35</div>
                    <div className="text-gray-400">Issues Evaluated</div>
                  </CardContent>
                </Card>
                <Card className="bg-slate-800/50 border-blue-500/20 backdrop-blur">
                  <CardContent className="pt-6 text-center">
                    <div className="text-4xl font-bold text-cyan-400 mb-2">10</div>
                    <div className="text-gray-400">Key Provisions</div>
                  </CardContent>
                </Card>
                <Card className="bg-slate-800/50 border-blue-500/20 backdrop-blur">
                  <CardContent className="pt-6 text-center">
                    <div className="text-4xl font-bold text-teal-400 mb-2">0-100</div>
                    <div className="text-gray-400">Score Scale</div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* The Challenge */}
        <section className="py-20 px-6 bg-slate-900/50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">The Challenge</h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                PBM procurement is divide-and-conquer. Each employer negotiates in isolation with no way to benchmark what "good" looks like.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {["Employer A", "Employer B", "Employer C"].map((employer, idx) => (
                <Card key={idx} className="bg-gradient-to-br from-slate-800 to-slate-900 border-blue-500/20">
                  <CardHeader>
                    <CardTitle className="text-cyan-400">{employer}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-blue-400" />
                        Runs own RFP
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-blue-400" />
                        Negotiates alone
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-blue-400" />
                        Different terms
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center">
              <p className="text-2xl text-blue-300 italic">
                "What's missing is not intelligence, effort, or expertise. <span className="text-cyan-400 font-semibold">It's coordination.</span>"
              </p>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">How It Works</h2>
              <p className="text-xl text-gray-300">
                Delivered as a service. No software. No platform. No learning curve.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="bg-gradient-to-br from-blue-900/50 to-slate-900/50 border-blue-500/30">
                <CardHeader>
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl font-bold text-white">1</span>
                  </div>
                  <CardTitle className="text-center text-yellow-400">SEND</CardTitle>
                </CardHeader>
                <CardContent className="text-center text-gray-300">
                  <p>Email your PBM contract to Kincaid iQ. If your PBM requires an NDA, we can sign one electronically.</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-cyan-900/50 to-slate-900/50 border-cyan-500/30">
                <CardHeader>
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl font-bold text-white">2</span>
                  </div>
                  <CardTitle className="text-center text-yellow-400">ANALYZE</CardTitle>
                </CardHeader>
                <CardContent className="text-center text-gray-300">
                  <p>Our AI analyst evaluates the full contract against 35 issues across 10 provisions using calibrated scoring rules.</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-teal-900/50 to-slate-900/50 border-teal-500/30">
                <CardHeader>
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-teal-500 to-blue-500 flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl font-bold text-white">3</span>
                  </div>
                  <CardTitle className="text-center text-yellow-400">DELIVER</CardTitle>
                </CardHeader>
                <CardContent className="text-center text-gray-300">
                  <p>Receive a suite of reports from a one-page triage snapshot to detailed negotiation guidance.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Interactive Demo - Scorecard */}
        <section className="py-20 px-6 bg-slate-900/50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">Live Contract Analysis Demo</h2>
              <p className="text-xl text-gray-300">
                See how Contract X-Ray™ evaluates PBM contracts in real-time
              </p>
            </div>

            <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-blue-500/30">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl text-white">CONTRACT X-RAY™ SCORECARD</CardTitle>
                    <CardDescription className="text-gray-400">Fiduciary-Aligned PBM Contract Standards</CardDescription>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-400 mb-1">Overall Score</div>
                    <div className={`text-4xl font-bold ${overallScore >= 75 ? 'text-green-400' : overallScore >= 60 ? 'text-yellow-400' : 'text-red-400'}`}>
                      {overallScore}/100
                    </div>
                    <Badge className={overallScore >= 75 ? 'bg-green-500/20 text-green-400' : overallScore >= 60 ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400'}>
                      {getRatingLabel(overallScore)}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {provisions.map((provision, idx) => (
                    <div key={idx} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-medium text-gray-400">#{idx + 1}</span>
                            <span className="text-white font-medium">{provision.name}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-2xl font-bold text-white w-12 text-right">{provision.score}</span>
                          <Badge className={getRatingColor(provision.rating)}>
                            {getRatingLabel(provision.score)}
                          </Badge>
                          <span className="text-gray-400 text-sm w-12 text-right">{provision.weight}%</span>
                        </div>
                      </div>
                      <Progress value={provision.score} className="h-2" />
                    </div>
                  ))}
                </div>

                <div className="mt-8 p-4 bg-slate-800/50 rounded-lg border border-blue-500/20">
                  <p className="text-sm text-gray-300">
                    <strong className="text-blue-400">EXECUTIVE SUMMARY:</strong> Contract X-Ray evaluates PBM contracts against Fiduciary-Aligned PBM Contract Standards. 
                    Scoring enabled contract language only. This PBM contract demonstrates strong transparency in pricing, fees, and conflict-of-interest management, 
                    but significant gaps remain in client-directed audit rights (41), carve-out and vendor flexibility (14), and fiduciary loyalty commitment (42).
                  </p>
                </div>

                <div className="mt-6 flex gap-4">
                  <Button className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600">
                    <Download className="w-4 h-4 mr-2" />
                    Download Full Report
                  </Button>
                  <Button variant="outline" className="flex-1 border-blue-500/30 text-blue-300">
                    <FileText className="w-4 h-4 mr-2" />
                    View Negotiation Guide
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Report Types */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">Comprehensive Report Suite</h2>
              <p className="text-xl text-gray-300">
                Every analysis includes multiple report formats tailored to different stakeholders
              </p>
            </div>

            <Tabs defaultValue="quicklook" className="w-full">
              <TabsList className="grid w-full max-w-3xl mx-auto grid-cols-4 bg-slate-800/50">
                <TabsTrigger value="quicklook">Quick Look</TabsTrigger>
                <TabsTrigger value="scorecard">Scorecard</TabsTrigger>
                <TabsTrigger value="negotiation">Negotiation</TabsTrigger>
                <TabsTrigger value="comparison">Comparison</TabsTrigger>
              </TabsList>

              <TabsContent value="quicklook" className="mt-8">
                <Card className="bg-slate-800/50 border-blue-500/20">
                  <CardHeader>
                    <CardTitle className="text-xl text-yellow-400">QUICK LOOK — One-Page Triage Report</CardTitle>
                    <CardDescription className="text-gray-400">Vital Signs Check: 10 questions, 3 tiers</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 mb-4">
                      Answers one question: does this contract warrant a deeper look? Each of the 10 provisions gets categorized as Good, Concern, or Red Flag giving you a fast directional read before committing to a full analysis.
                    </p>
                    <div className="flex gap-4 mb-4">
                      <Badge className="bg-green-500/20 text-green-400">Good</Badge>
                      <Badge className="bg-yellow-500/20 text-yellow-400">Concern</Badge>
                      <Badge className="bg-red-500/20 text-red-400">Red Flag</Badge>
                    </div>
                    <p className="text-sm text-gray-400">
                      <strong>Audience:</strong> Executive leadership, procurement teams
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="scorecard" className="mt-8">
                <Card className="bg-slate-800/50 border-blue-500/20">
                  <CardHeader>
                    <CardTitle className="text-xl text-yellow-400">SCORECARD — Executive Dashboard</CardTitle>
                    <CardDescription className="text-gray-400">Full Evaluation: 35 issues, 10 provisions, color-coded</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 mb-4">
                      The complete evaluation condensed to a single page. Shows the overall 0–100 score, provision-by-provision breakdown with color-coded ratings, and key findings. This is what you bring to the benefits committee or the board meeting.
                    </p>
                    <div className="grid grid-cols-5 gap-2 mb-4">
                      <Badge className="bg-green-500/20 text-green-400 text-center">Excellent 90+</Badge>
                      <Badge className="bg-blue-500/20 text-blue-400 text-center">Good 75-89</Badge>
                      <Badge className="bg-yellow-500/20 text-yellow-400 text-center">Fair 60-74</Badge>
                      <Badge className="bg-orange-500/20 text-orange-400 text-center">Concern 45-59</Badge>
                      <Badge className="bg-red-500/20 text-red-400 text-center">Red Flag &lt;45</Badge>
                    </div>
                    <p className="text-sm text-gray-400">
                      <strong>Audience:</strong> C-suite, benefits committee, board
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="negotiation" className="mt-8">
                <Card className="bg-slate-800/50 border-blue-500/20">
                  <CardHeader>
                    <CardTitle className="text-xl text-yellow-400">NEGOTIATION GUIDE — Scores Become Strategy</CardTitle>
                    <CardDescription className="text-gray-400">Multi-page gap analysis with actionable recommendations</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4 mb-4">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-blue-400 mt-1" />
                        <div>
                          <strong className="text-white">Gap Analysis:</strong>
                          <span className="text-gray-300"> Contract language that's missing or weak</span>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-blue-400 mt-1" />
                        <div>
                          <strong className="text-white">Model Provisions:</strong>
                          <span className="text-gray-300"> Exact language you can propose to your PBM</span>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-blue-400 mt-1" />
                        <div>
                          <strong className="text-white">Talking Points:</strong>
                          <span className="text-gray-300"> Conversation guidance for brokers or legal team</span>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-blue-400 mt-1" />
                        <div>
                          <strong className="text-white">Before-Signing Checklist:</strong>
                          <span className="text-gray-300"> Final verification before you commit</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-400">
                      <strong>Audience:</strong> Employers, brokers, legal counsel
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="comparison" className="mt-8">
                <Card className="bg-slate-800/50 border-blue-500/20">
                  <CardHeader>
                    <CardTitle className="text-xl text-yellow-400">COMPARISON — Side-by-Side Contract Analysis</CardTitle>
                    <CardDescription className="text-gray-400">Negotiation Progress: Improvements. Regressions. Quantified.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 mb-4">
                      Compares two contract versions to show what improved, what regressed, and what critical gaps remain. Used to validate negotiation outcomes or evaluate competing PBM proposals during procurement.
                    </p>
                    <p className="text-sm text-gray-400">
                      <strong>Audience:</strong> C-suite, benefits committee, board
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-20 px-6 bg-slate-900/50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">Enterprise Pricing</h2>
              <p className="text-xl text-gray-300">
                Choose the plan that fits your organization's needs
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Starter */}
              <Card className={`bg-slate-800/50 border-2 ${selectedTier === 'starter' ? 'border-blue-500' : 'border-blue-500/20'}`}>
                <CardHeader>
                  <CardTitle className="text-2xl text-white">Starter</CardTitle>
                  <CardDescription className="text-gray-400">For single contract analysis</CardDescription>
                  <div className="text-4xl font-bold text-blue-400 mt-4">$2,500</div>
                  <div className="text-sm text-gray-400">per contract</div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-blue-400 mt-0.5" />
                      <span className="text-gray-300">Quick Look Report</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-blue-400 mt-0.5" />
                      <span className="text-gray-300">Full Scorecard (0-100)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-blue-400 mt-0.5" />
                      <span className="text-gray-300">35-issue evaluation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-blue-400 mt-0.5" />
                      <span className="text-gray-300">48-hour turnaround</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-blue-400 mt-0.5" />
                      <span className="text-gray-300">Email support</span>
                    </li>
                  </ul>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={() => setSelectedTier('starter')}>
                    Get Started
                  </Button>
                </CardContent>
              </Card>

              {/* Professional */}
              <Card className={`bg-slate-800/50 border-2 ${selectedTier === 'professional' ? 'border-cyan-500' : 'border-cyan-500/20'} relative`}>
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <Badge className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
                    <Star className="w-3 h-3 mr-1" />
                    Most Popular
                  </Badge>
                </div>
                <CardHeader>
                  <CardTitle className="text-2xl text-white">Professional</CardTitle>
                  <CardDescription className="text-gray-400">For active contract management</CardDescription>
                  <div className="text-4xl font-bold text-cyan-400 mt-4">$8,500</div>
                  <div className="text-sm text-gray-400">per contract</div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-cyan-400 mt-0.5" />
                      <span className="text-gray-300">Everything in Starter</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-cyan-400 mt-0.5" />
                      <span className="text-gray-300">Negotiation Guide (full)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-cyan-400 mt-0.5" />
                      <span className="text-gray-300">Model contract provisions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-cyan-400 mt-0.5" />
                      <span className="text-gray-300">Comparison report (2 versions)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-cyan-400 mt-0.5" />
                      <span className="text-gray-300">24-hour turnaround</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-cyan-400 mt-0.5" />
                      <span className="text-gray-300">Priority email & phone support</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-cyan-400 mt-0.5" />
                      <span className="text-gray-300">1-hour strategy consultation</span>
                    </li>
                  </ul>
                  <Button className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700" onClick={() => setSelectedTier('professional')}>
                    Get Started
                  </Button>
                </CardContent>
              </Card>

              {/* Enterprise */}
              <Card className={`bg-slate-800/50 border-2 ${selectedTier === 'enterprise' ? 'border-teal-500' : 'border-teal-500/20'}`}>
                <CardHeader>
                  <CardTitle className="text-2xl text-white">Enterprise</CardTitle>
                  <CardDescription className="text-gray-400">For organizations with multiple contracts</CardDescription>
                  <div className="text-4xl font-bold text-teal-400 mt-4">Custom</div>
                  <div className="text-sm text-gray-400">volume pricing</div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-teal-400 mt-0.5" />
                      <span className="text-gray-300">Everything in Professional</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-teal-400 mt-0.5" />
                      <span className="text-gray-300">Unlimited contract analyses</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-teal-400 mt-0.5" />
                      <span className="text-gray-300">PBM Accountability Index access</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-teal-400 mt-0.5" />
                      <span className="text-gray-300">12-hour turnaround</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-teal-400 mt-0.5" />
                      <span className="text-gray-300">Dedicated account manager</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-teal-400 mt-0.5" />
                      <span className="text-gray-300">Quarterly strategy sessions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-teal-400 mt-0.5" />
                      <span className="text-gray-300">Custom training for your team</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-teal-400 mt-0.5" />
                      <span className="text-gray-300">API access</span>
                    </li>
                  </ul>
                  <Button className="w-full bg-teal-600 hover:bg-teal-700" onClick={() => setSelectedTier('enterprise')}>
                    Contact Sales
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* PBM Accountability Index */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">PBM Accountability Index</h2>
              <p className="text-xl text-gray-300">
                How compliant are PBM contracts? Public ratings create market-wide transparency.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <Card className="bg-gradient-to-br from-blue-900/50 to-slate-900/50 border-blue-500/30">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center mb-4">
                    <Star className="w-6 h-6 text-yellow-400" />
                  </div>
                  <CardTitle className="text-xl text-yellow-400">EMPLOYER DEMAND</CardTitle>
                </CardHeader>
                <CardContent className="text-gray-300">
                  <p>Employers require a Contract X-Ray rating before considering a PBM proposal. Ratings become procurement table stakes.</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-cyan-900/50 to-slate-900/50 border-cyan-500/30">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-cyan-500/20 flex items-center justify-center mb-4">
                    <TrendingUp className="w-6 h-6 text-cyan-400" />
                  </div>
                  <CardTitle className="text-xl text-cyan-400">PBM COMPETITION</CardTitle>
                </CardHeader>
                <CardContent className="text-gray-300">
                  <p>PBMs compete to improve their ratings because strong scores become a market differentiator and competitive credential.</p>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-slate-800/50 border-blue-500/20">
              <CardHeader>
                <CardTitle className="text-center text-xl text-yellow-400">ACCOUNTABILITY INDEX PREVIEW</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded bg-green-500/10">
                    <Badge className="bg-green-500/20 text-green-400">Excellent (90+)</Badge>
                    <span className="text-gray-300">PBM A</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded bg-blue-500/10">
                    <Badge className="bg-blue-500/20 text-blue-400">Good (75-89)</Badge>
                    <span className="text-gray-300">PBM D, PBM F</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded bg-yellow-500/10">
                    <Badge className="bg-yellow-500/20 text-yellow-400">Fair (60-74)</Badge>
                    <span className="text-gray-300">PBM B, PBM G, PBM H</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded bg-orange-500/10">
                    <Badge className="bg-orange-500/20 text-orange-400">Concern (45-59)</Badge>
                    <span className="text-gray-300">PBM C, PBM E, PBM I</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded bg-red-500/10">
                    <Badge className="bg-red-500/20 text-red-400">Red Flag (&lt;45)</Badge>
                    <span className="text-gray-300">PBM J</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-6 bg-gradient-to-br from-blue-900/50 to-slate-900/50">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to See What's in Your PBM Contract?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Employer-first. Independent expertise. No vendor conflicts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700" onClick={() => setShowUploadModal(true)}>
                <Upload className="w-5 h-5 mr-2" />
                Upload Your Contract
              </Button>
              <Button size="lg" variant="outline" className="border-blue-400/30 text-blue-300 hover:bg-blue-500/10">
                <Users className="w-5 h-5 mr-2" />
                Schedule a Demo
              </Button>
            </div>
          </div>
        </section>

        {/* Upload Modal */}
        <Dialog open={showUploadModal} onOpenChange={setShowUploadModal}>
          <DialogContent className="sm:max-w-[600px] bg-slate-900 border-blue-500/30">
            <DialogHeader>
              <DialogTitle className="text-2xl text-white flex items-center gap-2">
                <Shield className="w-6 h-6 text-blue-400" />
                Upload PBM Contract for Analysis
              </DialogTitle>
              <DialogDescription className="text-gray-400">
                Upload your PBM contract (PDF, DOC, or DOCX). Our AI analyst will evaluate it against Fiduciary-Aligned Standards.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6 py-4">
              {!uploadedFile ? (
                <div
                  className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
                    dragActive
                      ? "border-blue-500 bg-blue-500/10"
                      : "border-gray-600 hover:border-blue-500/50"
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <p className="text-lg text-gray-300 mb-2">
                    Drag and drop your contract here
                  </p>
                  <p className="text-sm text-gray-500 mb-4">or</p>
                  <label htmlFor="file-upload">
                    <Button variant="outline" className="cursor-pointer border-blue-500/30 text-blue-300" asChild>
                      <span>
                        <FileText className="w-4 h-4 mr-2" />
                        Browse Files
                      </span>
                    </Button>
                    <input
                      id="file-upload"
                      type="file"
                      className="hidden"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                    />
                  </label>
                  <p className="text-xs text-gray-500 mt-4">
                    Accepted formats: PDF, DOC, DOCX (Max 10MB)
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg border border-blue-500/20">
                    <div className="flex items-center gap-3">
                      <FileCheck className="w-8 h-8 text-green-400" />
                      <div>
                        <p className="text-white font-medium">{uploadedFile.name}</p>
                        <p className="text-sm text-gray-400">
                          {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    {!uploading && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setUploadedFile(null)}
                        className="text-gray-400 hover:text-white"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>

                  {uploading && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Uploading...</span>
                        <span className="text-blue-400">{uploadProgress}%</span>
                      </div>
                      <Progress value={uploadProgress} className="h-2" />
                    </div>
                  )}

                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                    <h4 className="text-white font-medium mb-2 flex items-center gap-2">
                      <Shield className="w-4 h-4 text-blue-400" />
                      What Happens Next?
                    </h4>
                    <ul className="space-y-2 text-sm text-gray-300">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <span>AI analyst evaluates your contract against 35 issues across 10 provisions</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <span>Receive comprehensive reports (Quick Look, Scorecard, Negotiation Guide)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <span>Analysis typically completed within 24-48 hours</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <span>Email notification when reports are ready for download</span>
                      </li>
                    </ul>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
                      onClick={handleUpload}
                      disabled={uploading}
                    >
                      {uploading ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                          Uploading...
                        </>
                      ) : (
                        <>
                          <Upload className="w-4 h-4 mr-2" />
                          Upload & Analyze
                        </>
                      )}
                    </Button>
                    {!uploading && (
                      <Button
                        variant="outline"
                        className="border-gray-600 text-gray-300"
                        onClick={() => {
                          setShowUploadModal(false);
                          setUploadedFile(null);
                        }}
                      >
                        Cancel
                      </Button>
                    )}
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