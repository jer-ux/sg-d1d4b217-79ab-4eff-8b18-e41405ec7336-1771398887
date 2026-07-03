import React from "react";

export function KincaidHealthLogo({ className = "w-48 h-auto" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 100"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Kincaid Health wordmark */}
      <text
        x="20"
        y="60"
        fontFamily="serif"
        fontSize="48"
        fontWeight="bold"
        fill="currentColor"
      >
        Kincaid Health
      </text>
      
      {/* Tagline */}
      <text
        x="20"
        y="85"
        fontFamily="sans-serif"
        fontSize="14"
        fill="currentColor"
        opacity="0.6"
      >
        Forensic Intelligence Platform
      </text>
    </svg>
  );
}