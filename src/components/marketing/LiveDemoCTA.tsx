"use client";

import { useState } from "react";
import { Upload, ArrowRight, FileText, Sparkles, CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface LiveDemoCTAProps {
  variant?: "hero" | "inline";
  headline?: string;
  subheadline?: string;
}

export function LiveDemoCTA({
  variant = "inline",
  headline = "See Your Contract's Hidden Leakage in Real-Time",
  subheadline = "Upload your PBM contract. We'll run a live forensic scan in 30 minutes and show you the spread documentation, rebate tracking gaps, and ERISA compliance issues."
}: LiveDemoCTAProps) {
  const [dragActive, setDragActive] = useState(false);

  const benefits = [
    "Live forensic scan during the call",
    "Instant spread & rebate analysis",
    "ERISA compliance scorecard",
    "No commitment, no sales pitch"
  ];

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
    // In production, would handle file upload here
    window.location.href = "/request-demo";
  };

  if (variant === "hero") {
    return (
      <div className="w-full py-20 bg-gradient-to-b from-slate-950 via-blue-950/20 to-slate-950">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-blue-950/30 border border-blue-800/50 rounded-full px-4 py-2 mb-6">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-blue-300 font-medium">Live Demo With Your Data</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {headline}
          </h2>
          <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
            {subheadline}
          </p>

          <Card
            className={`bg-slate-900/50 border-2 transition-all ${
              dragActive ? "border-blue-500 bg-blue-950/30" : "border-slate-800 border-dashed"
            } p-8 mb-6`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <p className="text-slate-300 mb-4">
              Drag your PBM contract here, or click to browse
            </p>
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => window.location.href = "/request-demo"}
            >
              <FileText className="w-5 h-5 mr-2" />
              Upload Contract & Schedule Demo
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <p className="text-xs text-slate-500 mt-4">
              PDF, Word, or scanned image. 100% confidential.
            </p>
          </Card>

          <div className="grid md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {benefits.map((benefit, idx) => (
              <div key={idx} className="flex items-center gap-2 text-sm text-slate-400">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <Card className="bg-gradient-to-br from-blue-950/30 to-slate-900 border-blue-800/50 p-8">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h3 className="text-2xl font-bold text-white mb-3">{headline}</h3>
          <p className="text-slate-400 mb-6">{subheadline}</p>
          <ul className="space-y-2 mb-6">
            {benefits.map((benefit, idx) => (
              <li key={idx} className="flex items-center gap-2 text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                {benefit}
              </li>
            ))}
          </ul>
          <Button
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 w-full md:w-auto"
            onClick={() => window.location.href = "/request-demo"}
          >
            Schedule Live Demo
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>

        <Card
          className={`bg-slate-900 border-2 transition-all ${
            dragActive ? "border-blue-500" : "border-slate-800 border-dashed"
          } p-8 text-center`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <Upload className="w-16 h-16 text-slate-400 mx-auto mb-4" />
          <p className="text-slate-300 mb-2 font-medium">Or upload your contract now</p>
          <p className="text-sm text-slate-500 mb-4">
            We'll review it and call you within 24 hours
          </p>
          <Button
            variant="outline"
            className="border-slate-700 hover:border-slate-600"
            onClick={() => window.location.href = "/request-demo"}
          >
            <FileText className="w-4 h-4 mr-2" />
            Browse Files
          </Button>
        </Card>
      </div>
    </Card>
  );
}