import Link from "next/link";
import { Shield, CheckCircle, Lock, Award } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-gray-800">
      {/* Compliance Badges Section */}
      <div className="max-w-7xl mx-auto px-6 py-8 border-b border-gray-800">
        <div className="flex flex-wrap justify-center items-center gap-8">
          <div className="flex items-center gap-2 text-gray-400 hover:text-amber-400 transition-colors">
            <Shield className="w-5 h-5" />
            <span className="text-sm font-medium">SOC 2 Type II Certified</span>
          </div>
          <div className="flex items-center gap-2 text-gray-400 hover:text-amber-400 transition-colors">
            <Lock className="w-5 h-5" />
            <span className="text-sm font-medium">HIPAA Compliant</span>
          </div>
          <div className="flex items-center gap-2 text-gray-400 hover:text-amber-400 transition-colors">
            <CheckCircle className="w-5 h-5" />
            <span className="text-sm font-medium">ERISA Certified</span>
          </div>
          <div className="flex items-center gap-2 text-gray-400 hover:text-amber-400 transition-colors">
            <Award className="w-5 h-5" />
            <span className="text-sm font-medium">ISO 27001</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
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
                  <Link href="/solutions/erisa-compliance" className="text-gray-400 hover:text-white transition-colors">
                    ERISA
                  </Link>
                </li>
                <li>
                  <Link href="/solutions/hipaa-compliance" className="text-gray-400 hover:text-white transition-colors">
                    HIPAA
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
        
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            © 2026 Kincaid IQ. All rights reserved.
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