import React, { useState } from "react";
import { Mail, MessageCircle, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
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
      name: "Email",
      icon: Mail,
      href: "mailto:jeremiah@siriusb.ai",
      description: "Send me an email",
      color: "bg-blue-500 hover:bg-blue-600",
    },
    {
      name: "iMessage",
      icon: MessageCircle,
      href: "sms:+1234567890", // TODO: Replace with your actual phone number
      description: "Text me via iMessage",
      color: "bg-green-500 hover:bg-green-600",
    },
    {
      name: "Telegram",
      icon: Send,
      href: "https://t.me/yourusername", // TODO: Replace with your actual Telegram username
      description: "Message me on Telegram",
      color: "bg-sky-500 hover:bg-sky-600",
    },
  ];

  return (
    <>
      {/* Floating Contact Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 group"
        aria-label="Contact Jeremiah Shrack"
      >
        <div className="relative">
          {/* Pulse animation ring */}
          <div className="absolute inset-0 rounded-full bg-purple-500 animate-ping opacity-75" />
          
          {/* Profile image */}
          <div className="relative w-16 h-16 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-2xl transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
            <img
              src="/jeremiah-shrack-outdoor.png"
              alt="Jeremiah Shrack - Founder"
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Online indicator */}
          <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full" />
        </div>
        
        {/* Hover tooltip */}
        <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          Contact Jeremiah
          <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900" />
        </div>
      </button>

      {/* Contact Options Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex items-center gap-4 mb-2">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-purple-500">
                <img
                  src="/jeremiah-shrack-outdoor.png"
                  alt="Jeremiah Shrack"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <DialogTitle className="text-2xl">Get in Touch</DialogTitle>
                <DialogDescription>
                  Choose your preferred way to reach me
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <div className="space-y-3 mt-4">
            {contactOptions.map((option) => {
              const Icon = option.icon;
              return (
                <a
                  key={option.name}
                  href={option.href}
                  target={option.name === "Telegram" ? "_blank" : undefined}
                  rel={option.name === "Telegram" ? "noopener noreferrer" : undefined}
                  className={`flex items-center gap-4 p-4 rounded-lg ${option.color} text-white transition-all duration-200 hover:shadow-lg hover:scale-105`}
                  onClick={() => setIsOpen(false)}
                >
                  <div className="flex-shrink-0">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold">{option.name}</div>
                    <div className="text-sm opacity-90">{option.description}</div>
                  </div>
                </a>
              );
            })}
          </div>

          <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
            I typically respond within 24 hours
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}