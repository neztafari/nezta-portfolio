"use client";

import { useEffect, useRef, useState } from "react";

function parse(value: string) {
  const m = value.match(/^(\d+(?:\.\d+)?)(.*)$/);
  if (!m) return null;
  return {
    target: parseFloat(m[1]),
    decimals: m[1].includes(".") ? m[1].split(".")[1].length : 0,
    suffix: m[2],
  };
}

// Counts a number up when it scrolls into view. Non-numeric parts (like " FPS") stay as-is.
export default function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(value);

  useEffect(() => {
    const el = ref.current;
    const parsed = parse(value);
    if (!el || !parsed) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const step = (t: number) => {
        const p = Math.min(1, (t - t0) / 1200);
        const eased = 1 - Math.pow(1 - p, 3);
        setShown((parsed.target * eased).toFixed(parsed.decimals) + parsed.suffix);
        if (p < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    });
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value]);

  return <span ref={ref}>{shown}</span>;
}
