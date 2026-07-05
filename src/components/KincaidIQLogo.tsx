import React from "react";

export function KincaidIQLogo({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 180 50"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="shield-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#DC2626" />
          <stop offset="50%" stopColor="#B91C1C" />
          <stop offset="100%" stopColor="#991B1B" />
        </linearGradient>
        <linearGradient id="gold-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FCD34D" />
          <stop offset="50%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#D97706" />
        </linearGradient>
        <linearGradient id="accent-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#DC2626" />
          <stop offset="100%" stopColor="#F97316" />
        </linearGradient>
        <filter id="shadow">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.3"/>
        </filter>
      </defs>

      {/* Heraldic Shield */}
      <path
        d="M 25 5 L 45 5 Q 47 5 47 7 L 47 25 Q 47 35 35 42 Q 25 47 25 47 Q 25 47 15 42 Q 3 35 3 25 L 3 7 Q 3 5 5 5 Z"
        fill="url(#shield-gradient)"
        stroke="url(#gold-gradient)"
        strokeWidth="1.5"
        filter="url(#shadow)"
      />

      {/* Inner shield detail */}
      <path
        d="M 25 8 L 42 8 Q 44 8 44 10 L 44 24 Q 44 32 35 38 Q 25 43 25 43 Q 25 43 15 38 Q 6 32 6 24 L 6 10 Q 6 8 8 8 Z"
        fill="none"
        stroke="#FCD34D"
        strokeWidth="0.5"
        opacity="0.3"
      />

      {/* Ornate K with cross */}
      <g transform="translate(25, 25)">
        {/* Left vertical stem */}
        <rect x="-8" y="-15" width="3" height="30" fill="white" rx="1"/>
        
        {/* Upper diagonal */}
        <path
          d="M -5 -5 L 8 -15 L 10 -13 L -3 -3 Z"
          fill="white"
        />
        
        {/* Lower diagonal */}
        <path
          d="M -5 5 L 8 15 L 10 13 L -3 3 Z"
          fill="white"
        />
        
        {/* Medical cross integration */}
        <g opacity="0.9">
          <rect x="2" y="-3" width="6" height="1.5" fill="url(#gold-gradient)" rx="0.5"/>
          <rect x="4" y="-5" width="2" height="6" fill="url(#gold-gradient)" rx="0.5"/>
        </g>
        
        {/* Crown detail at top */}
        <path
          d="M -8 -16 L -7 -17 L -6 -16 L -5 -17 L -4 -16"
          stroke="url(#gold-gradient)"
          strokeWidth="0.8"
          fill="none"
        />
      </g>

      {/* Decorative ribbons */}
      <path
        d="M 10 40 Q 15 42 20 40"
        stroke="url(#gold-gradient)"
        strokeWidth="1.5"
        fill="none"
        opacity="0.6"
      />
      <path
        d="M 30 40 Q 35 42 40 40"
        stroke="url(#gold-gradient)"
        strokeWidth="1.5"
        fill="none"
        opacity="0.6"
      />

      {/* KINCAID text */}
      <text
        x="60"
        y="28"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize="20"
        fontWeight="700"
        fill="#1F2937"
        letterSpacing="-0.5"
      >
        KINCAID
      </text>

      {/* HEALTH text with accent bar */}
      <text
        x="60"
        y="42"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize="9"
        fontWeight="400"
        fill="#6B7280"
        letterSpacing="2"
      >
        HEALTH
      </text>
      <rect x="60" y="44" width="40" height="1.5" fill="url(#accent-gradient)" opacity="0.6" />
      
      {/* Laurel detail */}
      <path
        d="M 165 25 Q 167 23 169 25 Q 167 27 165 25 M 171 25 Q 173 23 175 25 Q 173 27 171 25"
        stroke="#D97706"
        strokeWidth="0.8"
        fill="none"
        opacity="0.4"
      />
    </svg>
  );
}