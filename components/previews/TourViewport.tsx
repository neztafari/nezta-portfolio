"use client";

import { useEffect, useRef, useState } from "react";

// First-person walkthrough of a simple interior, built from CSS 3D planes (no WebGL).
// The camera moves on an 18s CSS loop in three phases that match the thesis scenarios.
// The FPS counter jitters around the RX 6600 averages for the phase the camera is in,
// reading the camera animation's own clock so the two stay in sync.

const LOOP_MS = 18000;
const PHASE_FPS = [153.5, 149.3, 160.1];

type Face = { c: string; w: number; h: number; t: string };

// A plane w×h (in cqi) centered at x, y, z. Floor is at y = 20, ceiling at y = -30.
const face = (c: string, w: number, h: number, x: number, y: number, z: number, rot = ""): Face => ({
  c,
  w,
  h,
  t: `translate3d(${x}cqi, ${y}cqi, ${z}cqi) ${rot}`,
});

// An open-bottom box standing on the floor (or on yb), w along x, d along z, h tall.
function box(c: string, cx: number, cz: number, w: number, d: number, h: number, yb = 20): Face[] {
  const yt = yb - h;
  const ym = yb - h / 2;
  return [
    face(`${c} top`, w, d, cx, yt, cz, "rotateX(90deg)"),
    face(`${c} front`, w, h, cx, ym, cz + d / 2),
    face(`${c} side`, w, h, cx, ym, cz - d / 2),
    face(`${c} side`, d, h, cx - w / 2, ym, cz, "rotateY(90deg)"),
    face(`${c} side`, d, h, cx + w / 2, ym, cz, "rotateY(90deg)"),
  ];
}

const faces: Face[] = [
  // main room, x -60..60, z +20..-160
  face("floor", 120, 180, 0, 20, -70, "rotateX(90deg)"),
  face("ceil", 120, 180, 0, -30, -70, "rotateX(90deg)"),
  face("wall", 180, 50, -60, -5, -70, "rotateY(90deg)"),
  face("wall", 180, 50, 60, -5, -70, "rotateY(90deg)"),
  // back wall with a doorway at x 6..34
  face("wall back", 66, 50, -27, -5, -160),
  face("wall back", 26, 50, 47, -5, -160),
  face("wall back", 28, 12, 20, -24, -160),
  // second room seen through the doorway
  face("floor two", 60, 60, 20, 20, -190, "rotateX(90deg)"),
  face("ceil", 60, 60, 20, -30, -190, "rotateX(90deg)"),
  face("wall two", 60, 50, -10, -5, -190, "rotateY(90deg)"),
  face("wall two", 60, 50, 50, -5, -190, "rotateY(90deg)"),
  face("wall two back", 60, 50, 20, -5, -220),
  face("art", 18, 12, 20, -10, -219.5),
  // window on the left wall and the light it throws on the floor
  face("sun", 60, 52, -34, 19.8, -80, "rotateX(90deg)"),
  face("window", 44, 22, -59.6, -9, -80, "rotateY(90deg)"),
  face("rug", 30, 44, 30, 19.8, -95, "rotateX(90deg)"),
  // furniture
  ...box("cab", -54, -135, 12, 18, 30),
  ...box("tbl", 28, -95, 6, 12, 7),
  ...box("tbl", 28, -95, 12, 20, 1.6, 13),
  ...box("sofa", 49, -95, 14, 32, 7),
  ...box("sofa", 56, -95, 4, 40, 17),
  ...box("sofa", 49, -77, 14, 4, 11),
  ...box("sofa", 49, -113, 14, 4, 11),
];

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
        <div className="tour-scene">
          <div className="tour-cam" ref={camRef}>
            {faces.map((f, i) => (
              <i
                key={i}
                className={`tf ${f.c}`}
                style={{ width: `${f.w}cqi`, height: `${f.h}cqi`, left: `${-f.w / 2}cqi`, top: `${-f.h / 2}cqi`, transform: f.t }}
              />
            ))}
          </div>
        </div>

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
