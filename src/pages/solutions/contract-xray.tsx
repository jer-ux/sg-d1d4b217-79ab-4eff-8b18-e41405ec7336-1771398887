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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { 
  Shield, Upload, FileText, Search, TrendingUp, AlertTriangle,
  CheckCircle2, Download, Eye, Clock, DollarSign, Users,
  BarChart3, Zap, FileCheck, X, Loader2, ArrowRight, FileSearch, Scale
} from "lucide-react";
import Nav from "@/components/Nav";

export default function ContractXRayPage() {
  const router = useRouter();
  const { toast } = useToast();
  
  // Contact form state
  const [showContactModal, setShowContactModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [contactInfo, setContactInfo] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    message: ""
  });

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // Simulate submission
      await new Promise(resolve => setTimeout(resolve, 1500));

      console.log("Contact information submitted:", contactInfo);
      
      setSubmitSuccess(true);
      toast({
        title: "Request Submitted!",
        description: "We'll contact you within 24 hours to schedule your forensic review.",
      });

      // Reset form after 3 seconds
      setTimeout(() => {
        resetContactForm();
      }, 3000);

    } catch (error: any) {
      console.error("Submit error:", error);
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your request. Please try again.",
        variant: "destructive"
      });
      setSubmitting(false);
    }
  };

  const resetContactForm = () => {
    setShowContactModal(false);
    setSubmitting(false);
    setSubmitSuccess(false);
    setContactInfo({
      name: "",
      email: "",
      company: "",
      phone: "",
      message: ""
    });
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
    },
    {
      title: "Formulary Management",
      description: "Control over drug tier placement, utilization management, and step therapy protocols",
      risk: "High",
      impact: "$720K"
    },
    {
      title: "DIR Fees",
      description: "Full disclosure of Direct and Indirect Remuneration fees charged to pharmacies",
      risk: "Critical",
      impact: "$980K"
    },
    {
      title: "Claims Processing Standards",
      description: "Defined timelines for adjudication, payment accuracy guarantees, and error resolution",
      risk: "Medium",
      impact: "$240K"
    },
    {
      title: "Accumulator Program Restrictions",
      description: "Clear rules on manufacturer copay assistance and patient benefit accumulation",
      risk: "High",
      impact: "$560K"
    },
    {
      title: "Network Steering Protections",
      description: "Safeguards against forced pharmacy network changes without member notification",
      risk: "Medium",
      impact: "$380K"
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

      <Nav />

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
                    onClick={() => setShowContactModal(true)}
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
                    onClick={() => setShowContactModal(true)}
                  >
                    <Search className="w-6 h-6 mr-3" />
                    Request Forensic Review
                  </Button>
                </div>
                <p className="text-red-400 font-bold tracking-widest uppercase mt-8 text-sm">
                  No anchor, no claim.
                </p>
              </div>
            </div>
          </section>
        </main>

        {/* Enterprise Contact Modal */}
        <Dialog open={showContactModal} onOpenChange={setShowContactModal}>
          <DialogContent className="bg-slate-950/95 backdrop-blur-2xl border-white/10 max-w-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)]">
            <DialogHeader className="border-b border-white/10 pb-6 mb-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-blue-500/20 rounded-lg border border-blue-500/30">
                  <Shield className="w-6 h-6 text-blue-400" />
                </div>
                <DialogTitle className="text-2xl font-bold text-white tracking-tight">Request Forensic Review</DialogTitle>
              </div>
              <DialogDescription className="text-base text-gray-400">
                Share your information and we'll contact you within 24 hours to begin your contract analysis.
              </DialogDescription>
            </DialogHeader>

            {!submitSuccess ? (
              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-white">Full Name *</Label>
                    <Input
                      id="name"
                      required
                      value={contactInfo.name}
                      onChange={(e) => setContactInfo({ ...contactInfo, name: e.target.value })}
                      placeholder="John Smith"
                      className="bg-slate-900 border-gray-700 text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={contactInfo.email}
                      onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                      placeholder="john.smith@company.com"
                      className="bg-slate-900 border-gray-700 text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company" className="text-white">Company Name *</Label>
                    <Input
                      id="company"
                      required
                      value={contactInfo.company}
                      onChange={(e) => setContactInfo({ ...contactInfo, company: e.target.value })}
                      placeholder="Acme Corporation"
                      className="bg-slate-900 border-gray-700 text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-white">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={contactInfo.phone}
                      onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                      placeholder="(555) 123-4567"
                      className="bg-slate-900 border-gray-700 text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-white">Additional Details</Label>
                    <Textarea
                      id="message"
                      value={contactInfo.message}
                      onChange={(e) => setContactInfo({ ...contactInfo, message: e.target.value })}
                      placeholder="Tell us about your PBM contract concerns..."
                      rows={4}
                      className="bg-slate-900 border-gray-700 text-white resize-none"
                    />
                  </div>
                </div>

                <div className="bg-blue-950/30 rounded-lg p-4 space-y-3 text-sm">
                  <h3 className="font-semibold flex items-center gap-2 text-white">
                    <Clock className="w-5 h-5 text-blue-400" />
                    What Happens Next
                  </h3>
                  <ul className="space-y-2 text-gray-400">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Our team reviews your information</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Schedule initial consultation call</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Secure contract upload and analysis begins</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Receive comprehensive forensic report</span>
                    </li>
                  </ul>
                </div>

                <div className="flex gap-3">
                  <Button
                    type="submit"
                    className="flex-1"
                    disabled={submitting}
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <ArrowRight className="w-4 h-4 mr-2" />
                        Submit Request
                      </>
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={resetContactForm}
                    disabled={submitting}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            ) : (
              <div className="text-center space-y-6 py-8">
                <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10 text-green-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-2 text-white">Request Submitted!</h3>
                  <p className="text-gray-400">We'll contact you within 24 hours to schedule your forensic contract review.</p>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        <SiteFooter />
      </div>
    </>
  );
}