import React, { useState } from "react";
import { Mail, Calendar } from "lucide-react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function FounderContactButton() {
  const [isOpen, setIsOpen] = useState(false);

  const contactOptions = [
    {
      icon: Calendar,
      label: "Schedule a Meeting",
      href: "https://calendly.com/jer-kincaidrmc/new-meeting?month=2026-07",
      color: "bg-cyan-500 hover:bg-cyan-600",
      description: "Book a time on my calendar",
    },
    {
      icon: Mail,
      label: "Send an Email",
      href: "mailto:jer@kincaidrmc.com",
      color: "bg-blue-500 hover:bg-blue-600",
      description: "jer@kincaidrmc.com",
    },
  ];

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

          {/* Contact Options */}
          <div className="space-y-3">
            {contactOptions.map((option) => {
              const Icon = option.icon;
              return (
                <a
                  key={option.label}
                  href={option.href}
                  target={option.href.startsWith("http") ? "_blank" : undefined}
                  rel={option.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className={`flex flex-col gap-1 w-full p-4 rounded-lg text-white transition-colors ${option.color}`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{option.label}</span>
                  </div>
                  <span className="text-sm text-white/80 ml-8">{option.description}</span>
                </a>
              );
            })}
          </div>

          <div className="text-xs text-gray-500 text-center mt-4">
            I typically respond within 24 hours
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}