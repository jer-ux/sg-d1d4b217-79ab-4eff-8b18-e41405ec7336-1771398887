import React from "react";

export function KincaidIQLogo({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 50"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="brand-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#DC2626" />
          <stop offset="50%" stopColor="#EF4444" />
          <stop offset="100%" stopColor="#F97316" />
        </linearGradient>
        <linearGradient id="text-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#111827" />
          <stop offset="100%" stopColor="#374151" />
        </linearGradient>
      </defs>

      {/* Modern shield/badge shape */}
      <path
        d="M 8 15 L 8 28 Q 8 35 15 38 L 20 40 L 25 38 Q 32 35 32 28 L 32 15 Q 32 12 29 12 L 11 12 Q 8 12 8 15 Z"
        fill="url(#brand-gradient)"
        opacity="0.9"
      />

      {/* K letterform with medical cross integration */}
      <g>
        <path
          d="M 13 17 L 13 36 L 15 36 L 15 27 L 23 36 L 26 36 L 18 27 L 25 17 L 22 17 L 15 26 L 15 17 Z"
          fill="white"
          opacity="0.95"
        />
        
        {/* Integrated medical cross */}
        <rect x="17.5" y="22" width="1.5" height="6" fill="white" opacity="0.95" />
        <rect x="16" y="23.5" width="4.5" height="1.5" fill="white" opacity="0.95" />
      </g>

      {/* Pulse indicator dot */}
      <circle cx="30" cy="14" r="2" fill="#EF4444">
        <animate
          attributeName="opacity"
          values="1;0.3;1"
          dur="2s"
          repeatCount="indefinite"
        />
      </circle>

      {/* KINCAID HEALTH text */}
      <text
        x="40"
        y="26"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize="16"
        fontWeight="700"
        fill="url(#text-gradient)"
        letterSpacing="-0.5"
      >
        KINCAID
      </text>

      <text
        x="40"
        y="38"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize="10"
        fontWeight="500"
        fill="#6B7280"
        letterSpacing="1.5"
      >
        HEALTH
      </text>

      {/* Accent line under HEALTH */}
      <rect x="40" y="40" width="40" height="1.5" fill="url(#brand-gradient)" opacity="0.6" />
    </svg>
  );
}