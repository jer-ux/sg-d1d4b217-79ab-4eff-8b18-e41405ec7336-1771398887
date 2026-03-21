import React from "react";
import Head from "next/head";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MoveLeft, Home, Compass } from "lucide-react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default function Custom404() {
  return (
    <>
      <Head>
        <title>404 - Page Not Found | SiriusB iQ</title>
        <meta name="description" content="The page you are looking for does not exist." />
      </Head>

      <Nav />

      <main className="flex min-h-[80vh] flex-col items-center justify-center p-6 bg-slate-50 dark:bg-[#020817]">
        <div className="text-center space-y-8 max-w-2xl">
          <div className="space-y-4">
            <h1 className="text-8xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-400">
              404
            </h1>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
              Page Not Found
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-lg mx-auto">
              We've searched the data lake, but the page you're looking for seems to have been moved, deleted, or never existed.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button asChild size="lg" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white">
              <Link href="/">
                <Home className="mr-2 h-5 w-5" />
                Return to Homepage
              </Link>
            </Button>
            
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
              <Link href="/platform">
                <Compass className="mr-2 h-5 w-5" />
                Explore Platform
              </Link>
            </Button>
            
            <Button 
              variant="ghost" 
              size="lg" 
              className="w-full sm:w-auto"
              onClick={() => window.history.back()}
            >
              <MoveLeft className="mr-2 h-5 w-5" />
              Go Back
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}