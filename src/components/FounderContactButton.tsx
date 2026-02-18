import React, { useState } from "react";
import { Mail, MessageCircle, Send, X, Linkedin, Instagram, Facebook, FileText } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { supabase } from "@/integrations/supabase/client";
import { useRouter } from "next/router";

export function FounderContactButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const router = useRouter();

  const contactOptions = [
    {
      icon: Mail,
      label: "Email Me",
      href: "mailto:jer@kincaidrmc.com",
      color: "bg-blue-500 hover:bg-blue-600",
    },
    {
      icon: MessageCircle,
      label: "iMessage",
      href: "sms:2192563331",
      color: "bg-green-500 hover:bg-green-600",
    },
    {
      icon: Send,
      label: "Telegram",
      href: "https://t.me/+12192563331",
      color: "bg-sky-500 hover:bg-sky-600",
    },
  ];

  const socialLinks = [
    {
      label: "LinkedIn",
      href: "https://linkedin.com/in/shrack",
      icon: Linkedin,
      color: "text-blue-600 hover:text-blue-700",
    },
    {
      label: "Instagram",
      href: "https://instagram.com/jfshrack",
      icon: Instagram,
      color: "text-pink-600 hover:text-pink-700",
    },
    {
      label: "Facebook",
      href: "https://facebook.com/yourusername", // TODO: Replace with actual Facebook profile URL
      icon: Facebook,
      color: "text-blue-500 hover:text-blue-600",
    },
  ];

  const handleGoogleLogin = async () => {
    setIsLoggingIn(true);
    
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/case-studies?download=true`,
        },
      });

      if (error) {
        console.error("Login error:", error);
        alert("Failed to login. Please try again.");
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      alert("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <>
      {/* Floating Contact Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 group"
        aria-label="Contact Jeremiah"
      >
        <div className="relative">
          {/* Pulse ring animation */}
          <div className="absolute inset-0 rounded-full bg-blue-500 animate-ping opacity-75" />
          
          {/* Profile picture */}
          <div className="relative w-16 h-16 rounded-full overflow-hidden ring-4 ring-white dark:ring-gray-800 shadow-2xl transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
            <Image
              src="/jeremiah-shrack-outdoor.png"
              alt="Jeremiah Shrack"
              fill
              className="object-cover"
            />
          </div>
          
          {/* Online indicator */}
          <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full ring-2 ring-white dark:ring-gray-800" />
        </div>
        
        {/* Tooltip */}
        <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Contact Jeremiah
        </div>
      </button>

      {/* Contact Modal */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex items-center gap-4 mb-2">
              <div className="relative w-16 h-16 rounded-full overflow-hidden ring-2 ring-blue-500">
                <Image
                  src="/jeremiah-shrack-outdoor.png"
                  alt="Jeremiah Shrack"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <DialogTitle className="text-2xl">Get in Touch</DialogTitle>
                <DialogDescription className="text-sm">
                  Let's connect and discuss your needs
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          {/* Direct Contact Options */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400">Direct Contact</h3>
            {contactOptions.map((option) => {
              const Icon = option.icon;
              return (
                <a
                  key={option.label}
                  href={option.href}
                  target={option.href.startsWith("http") ? "_blank" : undefined}
                  rel={option.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className={`flex items-center gap-3 w-full p-3 rounded-lg text-white transition-colors ${option.color}`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{option.label}</span>
                </a>
              );
            })}
          </div>

          <Separator className="my-4" />

          {/* Social Media Links */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400">Connect on Social</h3>
            <div className="flex items-center justify-around">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex flex-col items-center gap-2 p-3 rounded-lg transition-colors ${social.color}`}
                    aria-label={social.label}
                  >
                    <Icon className="w-8 h-8" />
                    <span className="text-xs font-medium">{social.label}</span>
                  </a>
                );
              })}
            </div>
          </div>

          <Separator className="my-4" />

          {/* Google Login for Case Study */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400">Get Case Studies</h3>
            <Button
              onClick={handleGoogleLogin}
              disabled={isLoggingIn}
              className="w-full bg-white hover:bg-gray-50 text-gray-800 border border-gray-300 shadow-sm"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              {isLoggingIn ? "Signing in..." : "Sign in with Google for Case Studies"}
            </Button>
            <p className="text-xs text-gray-500 text-center">
              Access exclusive case studies and insights
            </p>
          </div>

          <div className="text-xs text-gray-500 text-center mt-4">
            I typically respond within 24 hours
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}