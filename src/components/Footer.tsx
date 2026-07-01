import Link from "next/link";
import Image from "next/image";
import { Shield, CheckCircle, Lock, Award } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-slate-200">
      {/* Compliance Badges Section */}
      <div className="max-w-7xl mx-auto px-6 py-8 border-b border-slate-200">
        <div className="flex flex-wrap justify-center items-center gap-8">
          <div className="flex items-center gap-2 text-slate-600 hover:text-navy-700 transition-colors">
            <Shield className="w-5 h-5" />
            <span className="text-sm font-medium">SOC 2 Type II Certified</span>
          </div>
          <div className="flex items-center gap-2 text-slate-600 hover:text-navy-700 transition-colors">
            <Lock className="w-5 h-5" />
            <span className="text-sm font-medium">HIPAA Compliant</span>
          </div>
          <div className="flex items-center gap-2 text-slate-600 hover:text-navy-700 transition-colors">
            <CheckCircle className="w-5 h-5" />
            <span className="text-sm font-medium">ERISA Certified</span>
          </div>
          <div className="flex items-center gap-2 text-slate-600 hover:text-navy-700 transition-colors">
            <Award className="w-5 h-5" />
            <span className="text-sm font-medium">ISO 27001</span>
          </div>
        </div>
      </div>

      {/* PBM Contract Clarity 360° CTA */}
      <div className="max-w-7xl mx-auto px-6 py-12 border-b border-slate-200">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-semibold border border-blue-200">
            <Shield className="w-4 h-4" />
            <span>PBM Contract Intelligence</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
            PBM Contract Clarity 360°
          </h2>
          
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Upload your PBM contract and get instant 0-100 fiduciary scoring, redline generator, and clause-by-clause analysis. See exactly where your contract deviates from fiduciary standards.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/solutions/rx-defense"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-semibold px-8 py-4 rounded-lg shadow-lg shadow-blue-500/30 transition-all duration-300 hover:scale-105"
            >
              <Shield className="w-5 h-5" />
              Analyze Your Contract
            </Link>
            <Link
              href="/solutions/rx-defense"
              className="text-blue-600 hover:text-blue-700 font-semibold underline underline-offset-4 transition-colors"
            >
              Learn more about Contract Clarity →
            </Link>
          </div>
          
          <div className="flex items-center justify-center gap-6 text-sm text-slate-500 flex-wrap pt-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-blue-600" />
              <span>Instant 0-100 scoring</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-blue-600" />
              <span>Automated redlines</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-blue-600" />
              <span>Clause-level analysis</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12">
          <Image 
            src="/1772951240194-20bfeb68-285b-4423-9485-b2585796d66a.jpeg"
            alt="Kincaid IQ Data Sciences Lab"
            width={240}
            height={60}
            className="h-14 w-auto"
          />
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-white font-semibold mb-4">Product</h3>
            <ul className="space-y-3">
              <li><Link href="/platform" className="text-gray-400 hover:text-white transition-colors text-sm">Platform</Link></li>
              <li><Link href="/war-room" className="text-gray-400 hover:text-white transition-colors text-sm">War Room</Link></li>
              <li><Link href="/evidence-receipts" className="text-gray-400 hover:text-white transition-colors text-sm">Evidence</Link></li>
            </ul>
          </div>

            {/* Compliance */}
            <div>
              <h3 className="text-white font-semibold mb-4">Compliance</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/compliance" className="text-gray-400 hover:text-white transition-colors">
                    Compliance Hub
                  </Link>
                </li>
                <li>
                  <Link href="/solutions/soc2-certification" className="text-gray-400 hover:text-white transition-colors">
                    SOC 2 Type II
                  </Link>
                </li>
                <li>
                  <Link href="/solutions/fiduciary-governance" className="text-gray-400 hover:text-white transition-colors">
                    Fiduciary Governance
                  </Link>
                </li>
              </ul>
            </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              <li><Link href="/company" className="text-gray-400 hover:text-white transition-colors text-sm">About</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors text-sm">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-3">
              <li><Link href="/docs" className="text-gray-400 hover:text-white transition-colors text-sm">Documentation</Link></li>
              <li><Link href="/case-studies" className="text-gray-400 hover:text-white transition-colors text-sm">Case Studies</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-3">
              <li><Link href="/security-governance" className="text-gray-400 hover:text-white transition-colors text-sm">Security</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-600">
            © 2026 Kincaid IQ Data Sciences Lab. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="text-gray-500 hover:text-white transition-colors text-sm">
              Privacy
            </Link>
            <Link href="#" className="text-gray-500 hover:text-white transition-colors text-sm">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}