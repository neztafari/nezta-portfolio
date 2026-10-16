"use client";

import { useEffect, useRef, useState } from "react";
import TourRoom from "./TourRoom";

// First-person walkthrough of a simple interior, built from CSS 3D planes (no WebGL).
// The camera moves on an 18s CSS loop in three phases that match the thesis scenarios.
// The FPS counter jitters around the RX 6600 averages for the phase the camera is in,
// reading the camera animation's own clock so the two stay in sync.

const LOOP_MS = 18000;
const PHASE_FPS = [153.5, 149.3, 160.1];

const scenarios = ["Navigasi Dasar", "Interaksi Objek", "Full Scene Load"];

export default function TourViewport() {
  const viewRef = useRef<HTMLDivElement>(null);
  const camRef = useRef<HTMLDivElement>(null);
  const [fps, setFps] = useState(153);

  useEffect(() => {
    const view = viewRef.current;
    if (!view || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let timer = 0;
    let value = PHASE_FPS[0];
    const tick = () => {
      const anim = camRef.current?.getAnimations()[0];
      const t = (Number(anim?.currentTime ?? performance.now()) % LOOP_MS + LOOP_MS) % LOOP_MS;
      const target = PHASE_FPS[Math.min(2, Math.floor(t / (LOOP_MS / 3)))];
      // drift toward the phase average with a little noise, kept within ±3
      value += (target - value) * 0.35 + (Math.random() - 0.5) * 2.4;
      value = Math.max(target - 3, Math.min(target + 3, value));
      setFps(Math.round(value));
    };
    // run only while the viewport is on screen and the tab is visible
    let onScreen = false;
    const sync = () => {
      if (onScreen && !document.hidden) {
        if (!timer) timer = window.setInterval(tick, 280);
      } else {
        window.clearInterval(timer);
        timer = 0;
      }
    };
    const io = new IntersectionObserver(([e]) => {
      onScreen = e.isIntersecting;
      sync();
    });
    io.observe(view);
    document.addEventListener("visibilitychange", sync);
    return () => {
      window.clearInterval(timer);
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);

  return (
    <div className="tour" aria-hidden="true">
      <div className="tour-view" ref={viewRef}>
        <TourRoom camRef={camRef} />

        <div className="tour-hud">
          <span className="tour-fps">FPS {fps}</span>
          <span className="tour-tags">
            {scenarios.map((s, i) => (
              <b key={s} style={{ animationDelay: `${i * 6}s` }}>
                {s}
              </b>
            ))}
          </span>
          <i className="tour-dot" />
          <span className="tour-keys">WASD</span>
          <span className="tour-info">
            <i />
            <i />
            <i />
          </span>
        </div>
        <span className="preview-label">ILLUSTRATION</span>
      </div>
    </div>
  );
}
