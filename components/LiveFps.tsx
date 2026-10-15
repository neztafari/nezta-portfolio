"use client";

import { useEffect, useState } from "react";

// Measures how many frames per second this page renders in the visitor's browser.
export default function LiveFps() {
  const [fps, setFps] = useState<number | null>(null);

  useEffect(() => {
    let frames = 0;
    let start = performance.now();
    let id = 0;
    const tick = (t: number) => {
      frames++;
      if (t - start >= 1000) {
        setFps(Math.round((frames * 1000) / (t - start)));
        frames = 0;
        start = t;
      }
      id = requestAnimationFrame(tick);
    };
    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <span className="fps-live" title="Frame rate of this page, measured live in your browser">
      <span className="live-dot" aria-hidden="true" />
      <b>{fps ?? "--"}</b>fps
    </span>
  );
}
