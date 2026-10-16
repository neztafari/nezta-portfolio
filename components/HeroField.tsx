"use client";

import { useEffect, useRef } from "react";

// Animated dot field behind the hero. Dots ripple from a blue and a red source,
// and brighten and push away from the mouse pointer.
export default function HeroField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    let pts: [number, number][] = [];
    const mouse = { x: -9999, y: -9999 };
    let raf = 0;
    let visible = true;
    let looping = true;

    const size = () => {
      const r = canvas.getBoundingClientRect();
      w = r.width;
      h = r.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      pts = [];
      const gap = w < 600 ? 22 : 26;
      for (let y = gap / 2; y < h; y += gap) for (let x = gap / 2; x < w; x += gap) pts.push([x, y]);
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      const s = t * 0.00025;
      const bx = w * (0.3 + 0.18 * Math.sin(s));
      const by = h * (0.45 + 0.2 * Math.cos(s * 1.3));
      const rx = w * (0.72 + 0.15 * Math.cos(s * 0.9));
      const ry = h * (0.5 + 0.25 * Math.sin(s * 1.1));
      const theme = document.documentElement.dataset.theme;
      const light = theme === "light" || (!theme && window.matchMedia("(prefers-color-scheme: light)").matches);
      const base = light ? 0.18 : 0.1;

      for (const [px, py] of pts) {
        const db = Math.hypot(px - bx, py - by);
        const dr = Math.hypot(px - rx, py - ry);
        const wb = Math.max(0, Math.sin(db * 0.035 - t * 0.002)) * Math.exp(-db / 360);
        const wr = Math.max(0, Math.sin(dr * 0.04 - t * 0.0024)) * Math.exp(-dr / 280);

        const dm = Math.hypot(px - mouse.x, py - mouse.y);
        const near = Math.max(0, 1 - dm / 140);
        const push = near * 10;
        const ox = dm > 0 ? ((px - mouse.x) / dm) * push : 0;
        const oy = dm > 0 ? ((py - mouse.y) / dm) * push : 0;

        const k = Math.max(wb, wr, near * 0.9);
        const a = base + 0.75 * k;
        const rad = 0.9 + 1.5 * k;
        ctx.fillStyle = wr > wb && wr > near ? `rgba(255,66,98,${a.toFixed(3)})` : `rgba(76,125,255,${a.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(px + ox, py + oy, rad, 0, Math.PI * 2);
        ctx.fill();
      }
      // keep going only while on screen and the tab is visible; reduced motion draws one frame
      if (!reduce && visible && !document.hidden) raf = requestAnimationFrame(draw);
      else looping = false;
    };
    const start = () => {
      if (looping || reduce || !visible || document.hidden) return;
      looping = true;
      raf = requestAnimationFrame(draw);
    };

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    // stop drawing when the hero is off screen or the tab is hidden, resume when back
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      start();
    });
    io.observe(canvas);

    size();
    raf = requestAnimationFrame(draw);
    window.addEventListener("resize", size);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    document.addEventListener("visibilitychange", start);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      document.removeEventListener("visibilitychange", start);
      window.removeEventListener("resize", size);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={ref} className="hero-field" aria-hidden="true" />;
}
