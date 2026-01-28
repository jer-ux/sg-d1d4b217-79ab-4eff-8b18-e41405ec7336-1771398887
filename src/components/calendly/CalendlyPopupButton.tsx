import * as React from "react";
import { Button } from "@/components/ui/button";

interface CalendlyPopupButtonProps {
  url: string;
  children: React.ReactNode;
  className?: string;
}

export function CalendlyPopupButton({ url, children, className }: CalendlyPopupButtonProps) {
  const handleClick = () => {
    if (typeof window !== "undefined") {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <Button onClick={handleClick} className={className}>
      {children}
    </Button>
  );
}