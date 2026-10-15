"use client";

import Image from "next/image";
import { useRef } from "react";

export default function TiltPhoto({ src, alt, location }: { src: string; alt: string; location: string }) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse") return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    el.style.setProperty("--ry", `${(x - 0.5) * 14}deg`);
    el.style.setProperty("--rx", `${(0.5 - y) * 14}deg`);
    el.style.setProperty("--gx", `${x * 100}%`);
    el.style.setProperty("--gy", `${y * 100}%`);
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  };

  return (
    <div ref={ref} className="photo-card" onPointerMove={onMove} onPointerLeave={onLeave}>
      <Image src={src} alt={alt} width={700} height={875} loading="eager" fetchPriority="high" />
      <div className="photo-meta">
        <span>
          <i aria-hidden="true" />
          {location}
        </span>
        <span>Software Engineer</span>
      </div>
    </div>
  );
}
