import React from "react";
import Head from "next/head";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, Search } from "lucide-react";

export default function NotFound() {
  return (
    <>
      <Head>
        <title>404 - Page Not Found | SiriusB iQ</title>
        <meta name="description" content="The page you're looking for doesn't exist." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 flex items-center justify-center px-4">
        <div className="max-w-2xl w-full text-center space-y-8">
          {/* Error Code */}
          <div className="space-y-4">
            <h1 className="text-9xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              404
            </h1>
            <h2 className="text-3xl font-semibold text-slate-900">
              Page Not Found
            </h2>
            <p className="text-lg text-slate-600 max-w-md mx-auto">
              Sorry, we couldn't find the page you're looking for. It may have been moved, deleted, or never existed.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild size="lg" className="gap-2">
              <Link href="/">
                <Home className="w-4 h-4" />
                Return Home
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="gap-2">
              <Link href="/platform">
                <Search className="w-4 h-4" />
                Explore Platform
              </Link>
            </Button>
            <Button asChild variant="ghost" size="lg" className="gap-2" onClick={() => window.history.back()}>
              <a>
                <ArrowLeft className="w-4 h-4" />
                Go Back
              </a>
            </Button>
          </div>

          {/* Helpful Links */}
          <div className="pt-8 border-t border-slate-200">
            <p className="text-sm text-slate-500 mb-4">You might be interested in:</p>
            <div className="flex flex-wrap gap-3 justify-center text-sm">
              <Link href="/platform" className="text-blue-600 hover:text-blue-700 hover:underline">
                Platform Overview
              </Link>
              <span className="text-slate-300">•</span>
              <Link href="/request-demo" className="text-blue-600 hover:text-blue-700 hover:underline">
                Request Demo
              </Link>
              <span className="text-slate-300">•</span>
              <Link href="/contact" className="text-blue-600 hover:text-blue-700 hover:underline">
                Contact Us
              </Link>
              <span className="text-slate-300">•</span>
              <Link href="/about" className="text-blue-600 hover:text-blue-700 hover:underline">
                About Us
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}