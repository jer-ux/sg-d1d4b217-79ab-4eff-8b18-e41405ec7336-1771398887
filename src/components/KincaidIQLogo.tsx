import React from "react";

export function KincaidIQLogo({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 50"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="kincaid-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#1F2937" />
          <stop offset="100%" stopColor="#111827" />
        </linearGradient>
        <linearGradient id="cross-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F43F5E" />
          <stop offset="100%" stopColor="#BE123C" />
        </linearGradient>
      </defs>

      {/* K monogram with health cross */}
      <g>
        {/* K letter form */}
        <path
          d="M 12 10 L 12 40 L 16 40 L 16 26 L 28 40 L 33 40 L 21 26 L 32 10 L 27 10 L 16 24 L 16 10 Z"
          fill="url(#kincaid-gradient)"
        />
        
        {/* Health cross symbol integrated in K */}
        <rect x="19" y="18" width="2" height="8" fill="url(#cross-gradient)" />
        <rect x="17" y="20" width="6" height="2" fill="url(#cross-gradient)" />
      </g>

      {/* KINCAID text */}
      <text
        x="40"
        y="28"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize="18"
        fontWeight="700"
        fill="url(#kincaid-gradient)"
      >
        KINCAID
      </text>

      {/* HEALTH text */}
      <text
        x="40"
        y="42"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize="11"
        fontWeight="400"
        fill="#6B7280"
        letterSpacing="1"
      >
        HEALTH
      </text>
    </svg>
  );
}