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

      const count = Math.floor((Math.sqrt(w * h) / 10) * density);
      state.pts = new Array(count).fill(0).map(() => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: 0.8 + Math.random() * 2.2,
        a: 0.06 + Math.random() * 0.12,
      }));
    };

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      state.mx = (e.clientX - rect.left) / rect.width - 0.5;
      state.my = (e.clientY - rect.top) / rect.height - 0.5;
    };

    const draw = () => {
      state.t += 1;

      // base fade (keeps it smooth + premium)
      ctx.clearRect(0, 0, w, h);

      // gradient wash
      const g = ctx.createRadialGradient(
        w * (0.35 + state.mx * 0.08),
        h * (0.15 + state.my * 0.06),
        10,
        w * 0.5,
        h * 0.35,
        Math.max(w, h)
      );
      g.addColorStop(0, `rgba(120,140,255,${0.08 * intensity})`);
      g.addColorStop(0.35, `rgba(90,120,255,${0.04 * intensity})`);
      g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);

      // points + links
      const pts = state.pts;
      const maxLink = 125;

      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];

        // gentle drift with parallax
        p.x += p.vx + state.mx * 0.15;
        p.y += p.vy + state.my * 0.12;

        // wrap edges
        if (p.x < -20) p.x = w + 20;
        if (p.x > w + 20) p.x = -20;
        if (p.y < -20) p.y = h + 20;
        if (p.y > h + 20) p.y = -20;

        // node
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${p.a * intensity})`;
        ctx.fill();

        // links (only a few, keep it clean)
        for (let j = i + 1; j < i + 18 && j < pts.length; j++) {
          const q = pts[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxLink) {
            const alpha = (1 - dist / maxLink) * 0.10 * intensity;
            ctx.strokeStyle = `rgba(150,170,255,${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }
      }

      // subtle scanline (very light)
      ctx.fillStyle = `rgba(255,255,255,${0.015 * intensity})`;
      for (let y = (state.t % 14); y < h; y += 14) {
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
      {/* noise + vignette (premium cheat codes) */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.22] mix-blend-overlay bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(255,255,255,0.03)_2px,rgba(255,255,255,0.03)_4px)]" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/55" />
      <div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(circle_at_center,black,transparent_70%)] bg-black/40" />
    </div>
  );
}