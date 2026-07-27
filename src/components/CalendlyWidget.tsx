"use client";

import { useEffect } from "react";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CalendlyWidgetProps {
  url?: string;
  className?: string;
  buttonText?: string;
  buttonVariant?: "default" | "outline" | "ghost" | "secondary";
}

export function CalendlyWidget({ 
  url = "https://calendly.com/jer-kincaidrmc/new-meeting?month=2026-07",
  className = "",
  buttonText = "Book Your Free Fiduciary Audit",
  buttonVariant = "default"
}: CalendlyWidgetProps) {
  
  useEffect(() => {
    // Inject the Calendly CSS file to style the modal popup perfectly
    const link = document.createElement("link");
    link.href = "https://assets.calendly.com/assets/external/widget.css";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    // Inject the script
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      if (document.head.contains(link)) {
        document.head.removeChild(link);
      }
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const openCalendly = () => {
    if (typeof window !== "undefined") {
      if ((window as any).Calendly) {
        (window as any).Calendly.initPopupWidget({ url });
      } else {
        // Fallback: Open the scheduler in a new tab if the script is blocked or delayed
        window.open(url, "_blank");
      }
    }
  };

  return (
    <Button
      onClick={openCalendly}
      variant={buttonVariant}
      className={cn("cursor-pointer", className)}
    >
      <Calendar className="w-4 h-4 mr-2" />
      {buttonText}
    </Button>
  );
}