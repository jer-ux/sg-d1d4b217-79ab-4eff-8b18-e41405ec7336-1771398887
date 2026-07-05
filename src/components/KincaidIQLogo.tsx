import React from "react";

export function KincaidIQLogo({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 220 50"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="k-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#DC2626" />
          <stop offset="50%" stopColor="#F43F5E" />
          <stop offset="100%" stopColor="#FB7185" />
        </linearGradient>
        <linearGradient id="text-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#111827" />
          <stop offset="100%" stopColor="#374151" />
        </linearGradient>
        <linearGradient id="pulse-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#EF4444" stopOpacity="0.3" />
          <stop offset="50%" stopColor="#F43F5E" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#EF4444" stopOpacity="0.3" />
        </linearGradient>
      </defs>

      {/* Hexagonal badge background */}
      <g>
        <polygon
          points="18,5 30,5 36,15 30,25 18,25 12,15"
          fill="url(#k-gradient)"
          opacity="0.15"
        />
        <polygon
          points="18,7 30,7 35,15 30,23 18,23 13,15"
          fill="none"
          stroke="url(#k-gradient)"
          strokeWidth="1.5"
        />
      </g>

      {/* Bold K with integrated cross */}
      <g>
        <path
          d="M 16 10 L 19 10 L 19 21 L 28 10 L 32 10 L 24 19.5 L 32 29 L 28 29 L 19 19.5 L 19 29 L 16 29 Z"
          fill="url(#k-gradient)"
          strokeWidth="0.5"
          stroke="url(#k-gradient)"
        />
        
        {/* Medical cross - sharp and modern */}
        <rect x="22.5" y="12" width="1.5" height="6" fill="#DC2626" />
        <rect x="20.5" y="14" width="5.5" height="1.5" fill="#DC2626" />
      </g>

      {/* KINCAID - bold modern font */}
      <text
        x="42"
        y="23"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize="20"
        fontWeight="900"
        fill="url(#text-gradient)"
        letterSpacing="-0.5"
      >
        KINCAID
      </text>

      {/* HEALTH - with accent bar */}
      <g>
        <rect x="42" y="28" width="16" height="1.5" fill="url(#k-gradient)" opacity="0.6" />
        <text
          x="42"
          y="39"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontSize="9"
          fontWeight="600"
          fill="#6B7280"
          letterSpacing="2"
        >
          HEALTH
        </text>
      </g>

      {/* Pulse indicator */}
      <circle cx="200" cy="15" r="3" fill="url(#k-gradient)">
        <animate
          attributeName="opacity"
          values="1;0.3;1"
          dur="2s"
          repeatCount="indefinite"
        />
      </circle>
      <circle cx="200" cy="15" r="5" fill="none" stroke="url(#k-gradient)" strokeWidth="0.5" opacity="0.5">
        <animate
          attributeName="r"
          values="3;6;3"
          dur="2s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          values="0.5;0;0.5"
          dur="2s"
          repeatCount="indefinite"
        />
      </circle>

      {/* IQ indicator */}
      <text
        x="170"
        y="20"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize="10"
        fontWeight="700"
        fill="url(#k-gradient)"
      >
        iQ
      </text>
    </svg>
  );
}