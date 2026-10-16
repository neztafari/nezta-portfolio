"use client";

import Image from "next/image";
import { useRef } from "react";

type Props = {
  src: string;
  alt: string;
  location: string;
  // intrinsic size of the source image and the focal point kept in view by object-fit: cover
  width: number;
  height: number;
  position?: string;
};

export default function TiltPhoto({ src, alt, location, width, height, position }: Props) {
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
      {/* the slot is min(100%, 380px) wide (.photo-wrap), so request a matching width */}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        style={position ? { objectPosition: position } : undefined}
        sizes="(max-width: 412px) calc(100vw - 32px), 380px"
        loading="eager"
        fetchPriority="high"
      />

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
