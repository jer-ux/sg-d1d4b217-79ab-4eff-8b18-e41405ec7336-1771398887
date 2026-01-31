import * as React from "react";

type Props = {
  intensity?: number; // 0.5–2.0
  density?: number;   // 0.6–1.6
};

export function TechBackdrop({ intensity = 1.0, density = 1.0 }: Props) {
  const ref = React.useRef<HTMLCanvasElement | null>(null);

  React.useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let w = 0, h = 0, dpr = 1;

    const state = {
      mx: 0,
      my: 0,
      t: 0,
      pts: [] as { x: number; y: number; vx: number; vy: number; r: number; a: number }[],
    };

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = parent.clientWidth;
      h = parent.clientHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.floor((Math.sqrt(w * h) / 8) * density);
      state.pts = new Array(count).fill(0).map(() => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: 1.2 + Math.random() * 2.8,
        a: 0.15 + Math.random() * 0.25,
      }));
    };

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      state.mx = (e.clientX - rect.left) / rect.width - 0.5;
      state.my = (e.clientY - rect.top) / rect.height - 0.5;
    };

    const draw = () => {
      state.t += 1;

      // Enhanced fade for smoother trails
      ctx.fillStyle = "rgba(7, 10, 18, 0.05)";
      ctx.fillRect(0, 0, w, h);

      // Richer gradient wash with more color
      const g = ctx.createRadialGradient(
        w * (0.35 + state.mx * 0.12),
        h * (0.15 + state.my * 0.1),
        10,
        w * 0.5,
        h * 0.35,
        Math.max(w, h) * 1.2
      );
      g.addColorStop(0, `rgba(139,92,246,${0.18 * intensity})`);
      g.addColorStop(0.25, `rgba(99,102,241,${0.14 * intensity})`);
      g.addColorStop(0.5, `rgba(59,130,246,${0.10 * intensity})`);
      g.addColorStop(0.75, `rgba(16,185,129,${0.08 * intensity})`);
      g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);

      // Enhanced points with glow
      const pts = state.pts;
      const maxLink = 160;

      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];

        // Enhanced drift with parallax
        p.x += p.vx + state.mx * 0.25;
        p.y += p.vy + state.my * 0.2;

        // wrap edges
        if (p.x < -20) p.x = w + 20;
        if (p.x > w + 20) p.x = -20;
        if (p.y < -20) p.y = h + 20;
        if (p.y > h + 20) p.y = -20;

        // Enhanced glow effect
        const glowGradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4);
        glowGradient.addColorStop(0, `rgba(139,92,246,${p.a * intensity * 0.6})`);
        glowGradient.addColorStop(0.5, `rgba(99,102,241,${p.a * intensity * 0.3})`);
        glowGradient.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = glowGradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2);
        ctx.fill();

        // Bright core node
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200,180,255,${p.a * intensity * 1.2})`;
        ctx.fill();

        // Enhanced links with gradient
        for (let j = i + 1; j < i + 20 && j < pts.length; j++) {
          const q = pts[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxLink) {
            const alpha = (1 - dist / maxLink) * 0.25 * intensity;
            const linkGradient = ctx.createLinearGradient(p.x, p.y, q.x, q.y);
            linkGradient.addColorStop(0, `rgba(139,92,246,${alpha})`);
            linkGradient.addColorStop(0.5, `rgba(99,102,241,${alpha * 1.2})`);
            linkGradient.addColorStop(1, `rgba(59,130,246,${alpha})`);
            ctx.strokeStyle = linkGradient;
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }
      }

      // Enhanced scanline effect
      ctx.fillStyle = `rgba(139,92,246,${0.04 * intensity})`;
      for (let y = (state.t % 16); y < h; y += 16) {
        ctx.fillRect(0, y, w, 1);
      }

      raf = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, [density, intensity]);

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <canvas ref={ref} className="absolute inset-0" />
      {/* Enhanced visual layers */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.15] mix-blend-overlay bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(139,92,246,0.05)_2px,rgba(139,92,246,0.05)_4px)]" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-purple-950/30 via-transparent to-black/60" />
      <div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(circle_at_center,black,transparent_75%)] bg-gradient-to-br from-purple-950/20 via-blue-950/20 to-black/40" />
      
      {/* Ambient light pools */}
      <div className="pointer-events-none absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-purple-500/10 blur-[120px]" />
      <div className="pointer-events-none absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-blue-500/10 blur-[120px]" />
    </div>
  );
}