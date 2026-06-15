"use client";

import { useEffect } from "react";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CalendlyWidgetProps {
  url?: string;
  className?: string;
  buttonText?: string;
  buttonVariant?: "default" | "outline" | "ghost";
}

export function CalendlyWidget({ 
  url = "https://calendly.com/jer-kincaidrmc/30min",
  className = "",
  buttonText = "Book Your Free Fiduciary Audit",
  buttonVariant = "default"
}: CalendlyWidgetProps) {
  
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const openCalendly = () => {
    if (typeof window !== "undefined" && (window as any).Calendly) {
      (window as any).Calendly.initPopupWidget({ url });
    }
  };

  return (
    <Button
      onClick={openCalendly}
      variant={buttonVariant}
      className={className}
    >
      <Calendar className="w-4 h-4 mr-2" />
      {buttonText}
    </Button>
  );
}