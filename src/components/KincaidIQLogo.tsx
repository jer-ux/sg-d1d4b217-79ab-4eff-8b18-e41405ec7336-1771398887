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

      {/* Angular Military Shield */}
      <path
        d="M 29 4 
           L 37 4 
           L 40 7 
           L 40 20 
           L 37 28 
           L 33 34 
           L 29 37 
           L 25 34 
           L 21 28 
           L 18 20 
           L 18 7 
           L 21 4 
           Z"
        fill="url(#shield-gradient)"
        stroke="url(#border-gradient)"
        strokeWidth="2"
      />

      {/* Powerful K with Sharp Angles */}
      <g transform="translate(23, 10)">
        {/* Vertical bar - thicker */}
        <rect x="2" y="2" width="3" height="22" fill="white" />
        
        {/* Upper diagonal - sharp angle */}
        <polygon 
          points="5,8 12,2 14,4 7,12" 
          fill="white"
        />
        
        {/* Lower diagonal - sharp angle */}
        <polygon 
          points="5,14 7,12 14,22 12,24" 
          fill="white"
        />
        
        {/* Medical cross - bold and centered */}
        <rect x="6" y="11" width="2.5" height="6" fill="#3b82f6" />
        <rect x="4" y="13" width="6" height="2.5" fill="#3b82f6" />
      </g>

      {/* Sharp accent lines */}
      <line x1="18" y1="38" x2="40" y2="38" stroke="#3b82f6" strokeWidth="2" opacity="0.5" />
      <line x1="20" y1="40" x2="38" y2="40" stroke="#1e40af" strokeWidth="1.5" opacity="0.3" />

      {/* KINCAID text - bold and industrial */}
      <text
        x="50"
        y="26"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize="22"
        fontWeight="900"
        fill="white"
        letterSpacing="-1"
      >
        KINCAID
      </text>

      {/* HEALTH text - strong and wide */}
      <text
        x="50"
        y="42"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize="11"
        fontWeight="700"
        fill="#94a3b8"
        letterSpacing="3"
      >
        HEALTH
      </text>
      
      {/* Bold accent bar */}
      <rect x="50" y="45" width="50" height="2.5" fill="url(#brand-gradient)" opacity="0.8" />
    </svg>
  );
}