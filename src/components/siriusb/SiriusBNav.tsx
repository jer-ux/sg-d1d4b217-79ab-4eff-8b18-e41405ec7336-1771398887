import Link from "next/link";
import { Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

export function KincaidHealthNav() {
  return (
    <nav className="fixed top-0 z-50 w-full border-b border-neutral-800 bg-black/95 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-emerald-400" />
            <span className="text-xl font-bold text-white">Kincaid Health</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <Link href="/platform">
              <Button variant="ghost" className="text-neutral-300 hover:text-white">
                Platform
              </Button>
            </Link>
            <Link href="/company">
              <Button variant="ghost" className="text-neutral-300 hover:text-white">
                Company
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="ghost" className="text-neutral-300 hover:text-white">
                Contact
              </Button>
            </Link>
            <Link href="/request-demo">
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                Request Demo
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}