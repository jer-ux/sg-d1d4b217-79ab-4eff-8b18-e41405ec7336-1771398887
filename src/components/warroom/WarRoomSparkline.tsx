import React from "react";

export function MiniSparkline({ points }: { points: number[] }) {
  if (points.length < 2) return <div className="h-8" />;

  const max = Math.max(...points);
  const min = Math.min(...points);
  const range = max - min || 1;

  const normalized = points.map((p) => ((p - min) / range) * 100);
  const width = 100;
  const height = 32;
  const step = width / (points.length - 1);

  const pathData = normalized
    .map((val, i) => {
      const x = i * step;
      const y = height - (val / 100) * height;
      return i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`;
    })
    .join(" ");

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-8">
      <path
        d={pathData}
        fill="none"
        stroke="rgba(255,255,255,0.5)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}