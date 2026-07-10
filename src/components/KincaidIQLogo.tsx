import React from "react";

export function KincaidIQLogo({ className = "" }: { className?: string }) {
  return (
    <svg
      width="240"
      height="60"
      viewBox="0 0 240 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="shield-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1e40af" />
          <stop offset="100%" stopColor="#0c1e47" />
        </linearGradient>
        <linearGradient id="border-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#1e3a8a" />
        </linearGradient>
        <linearGradient id="brand-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#1e40af" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
      </defs>

      <path
        d="M 24 8 
           L 32 8 
           L 35 11 
           L 35 24 
           L 32 32 
           L 28 38 
           L 24 41 
           L 20 38 
           L 16 32 
           L 13 24 
           L 13 11 
           L 16 8 
           Z"
        fill="url(#shield-gradient)"
        stroke="url(#border-gradient)"
        strokeWidth="1.5"
      />

      <g transform="translate(18, 14)">
        <rect x="2" y="2" width="2.5" height="20" fill="white" />
        
        <polygon 
          points="4.5,7 11,2 12.5,3.5 6,11" 
          fill="white"
        />
        
        <polygon 
          points="4.5,13 6,11 12.5,21 11,22.5" 
          fill="white"
        />
        
        <rect x="5.5" y="10" width="2" height="5" fill="#3b82f6" />
        <rect x="4" y="12" width="5" height="2" fill="#3b82f6" />
      </g>

      <line x1="13" y1="42" x2="35" y2="42" stroke="#3b82f6" strokeWidth="1.5" opacity="0.4" />

      <text
        x="48"
        y="32"
        fontSize="24"
        fontWeight="700"
        fontFamily="'Inter', sans-serif"
        fill="#1a1a1a"
        letterSpacing="-0.5"
      >
        Kincaid
      </text>

      <text
        x="48"
        y="50"
        fontSize="16"
        fontWeight="600"
        fontFamily="'Inter', sans-serif"
        fill="#8C1515"
        letterSpacing="0.5"
      >
        HEALTH
      </text>
      
      <rect x="48" y="52" width="65" height="2" fill="url(#brand-gradient)" opacity="0.6" />
    </svg>
  );
}