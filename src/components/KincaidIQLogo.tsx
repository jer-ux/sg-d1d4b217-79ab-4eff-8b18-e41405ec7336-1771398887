import React from "react";

export function KincaidIQLogo({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 240 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* K monogram with health cross integration */}
      <g>
        {/* Left stroke of K */}
        <path
          d="M 8 8 L 8 40"
          stroke="url(#logo-gradient-1)"
          strokeWidth="3"
          strokeLinecap="round"
        />
        {/* Diagonal strokes forming K with health cross */}
        <path
          d="M 8 24 L 20 12 M 8 24 L 20 36"
          stroke="url(#logo-gradient-1)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Health cross integration */}
        <circle
          cx="20"
          cy="24"
          r="8"
          stroke="url(#logo-gradient-2)"
          strokeWidth="2"
          fill="none"
        />
        <path
          d="M 20 19 L 20 29 M 15 24 L 25 24"
          stroke="url(#logo-gradient-2)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </g>

      {/* KINCAID text */}
      <text
        x="36"
        y="30"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize="20"
        fontWeight="700"
        letterSpacing="-0.5"
        fill="url(#logo-gradient-3)"
      >
        KINCAID
      </text>

      {/* HEALTH text */}
      <text
        x="140"
        y="30"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize="20"
        fontWeight="300"
        letterSpacing="1"
        fill="#9CA3AF"
      >
        HEALTH
      </text>

      {/* Gradient Definitions */}
      <defs>
        <linearGradient id="logo-gradient-1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F43F5E" />
          <stop offset="100%" stopColor="#BE123C" />
        </linearGradient>
        <linearGradient id="logo-gradient-2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#F9FAFB" />
        </linearGradient>
        <linearGradient id="logo-gradient-3" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#F3F4F6" />
        </linearGradient>
      </defs>
    </svg>
  );
}