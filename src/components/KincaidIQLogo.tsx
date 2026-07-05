import React from "react";

export function KincaidIQLogo({ className = "" }: { className?: string }) {
  return (
    <svg
      width="300"
      height="75"
      viewBox="0 0 200 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="shield-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="border-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#60a5fa" />
          <stop offset="50%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#2563eb" />
        </linearGradient>
        <linearGradient id="brand-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#60a5fa" />
        </linearGradient>
      </defs>

      {/* Heraldic Shield */}
      <path
        d="M 25 5 
           L 33 5 
           C 35 5, 37 7, 37 9 
           L 37 22 
           C 37 26, 35 28, 31 32 
           L 29 34 
           L 27 32 
           C 23 28, 21 26, 21 22 
           L 21 9 
           C 21 7, 23 5, 25 5 Z"
        fill="url(#shield-gradient)"
        stroke="url(#border-gradient)"
        strokeWidth="1"
      />

      {/* Ornate K with Crown and Medical Cross */}
      <g transform="translate(24, 12)">
        {/* Crown detail at top */}
        <path
          d="M 2 0 L 3 -1 L 4 0 L 5 -1 L 6 0 L 7 -1 L 8 0"
          stroke="#60a5fa"
          strokeWidth="1"
          fill="none"
        />
        
        {/* K letterform - medieval style */}
        <path
          d="M 2 2 L 2 18 M 2 8 L 8 2 M 2 10 L 8 18"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* Medical cross integrated into K */}
        <rect x="4" y="8" width="1.5" height="4" fill="#60a5fa" />
        <rect x="2.5" y="9.5" width="4" height="1.5" fill="#60a5fa" />
      </g>

      {/* Decorative ribbon below shield */}
      <path
        d="M 18 36 Q 20 38, 22 36 Q 24 34, 26 36 Q 28 38, 30 36 Q 32 34, 34 36 Q 36 38, 38 36 Q 40 34, 42 36"
        stroke="#3b82f6"
        strokeWidth="1.2"
        fill="none"
        opacity="0.6"
      />

      {/* Laurel accents on right */}
      <path
        d="M 42 20 Q 44 21, 43 23 Q 42 25, 44 26"
        stroke="#60a5fa"
        strokeWidth="1.2"
        fill="none"
        opacity="0.5"
      />

      {/* KINCAID text */}
      <text
        x="50"
        y="25"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize="20"
        fontWeight="800"
        fill="white"
        letterSpacing="-0.5"
      >
        KINCAID
      </text>

      {/* HEALTH text with accent bar */}
      <text
        x="50"
        y="42"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize="10"
        fontWeight="600"
        fill="#9CA3AF"
        letterSpacing="2"
      >
        HEALTH
      </text>
      <rect x="50" y="44" width="40" height="2" fill="url(#brand-gradient)" opacity="0.7" />
    </svg>
  );
}