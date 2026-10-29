"use client";

import { useEffect, useRef } from "react";

// Page-wide effects in one place:
// - reveal elements marked with data-reveal when they scroll into view
// - pointer spotlight on .spot cards
// - pause looping animations inside [data-loop] containers while they are off screen
//   (CSS animations via the is-paused class, SVG <animateMotion> via pauseAnimations)
// - scroll progress bar at the top
export default function Effects() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // reveal on scroll
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );
    document.querySelectorAll("[data-reveal]").forEach((el) => io.observe(el));

    // pause looping animations off screen
    const loops = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const paused = !e.isIntersecting;
          e.target.classList.toggle("is-paused", paused);
          e.target.querySelectorAll("svg").forEach((svg) => (paused ? svg.pauseAnimations() : svg.unpauseAnimations()));
        }
      },
      { rootMargin: "100px 0px" },
    );
    document.querySelectorAll("[data-loop]").forEach((el) => loops.observe(el));

    // spotlight: one delegated listener, coordinates written once per frame, only for a fine hovering pointer
    const spotOn = window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    let spotFrame = 0;
    let spot: { card: HTMLElement; x: number; y: number } | null = null;
    const onPointer = (ev: PointerEvent) => {
      if (!spotOn.matches) return;
      const card = (ev.target as HTMLElement | null)?.closest<HTMLElement>(".spot");
      if (!card) return;
      spot = { card, x: ev.clientX, y: ev.clientY };
      if (spotFrame) return;
      spotFrame = requestAnimationFrame(() => {
        spotFrame = 0;
        if (!spot) return;
        const r = spot.card.getBoundingClientRect();
        spot.card.style.setProperty("--mx", `${spot.x - r.left}px`);
        spot.card.style.setProperty("--my", `${spot.y - r.top}px`);
      });
    };
    document.addEventListener("pointermove", onPointer, { passive: true });

    // scroll progress
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const p = max > 0 ? window.scrollY / max : 0;
        if (barRef.current) barRef.current.style.transform = `scaleX(${p})`;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      io.disconnect();
      loops.disconnect();
      document.removeEventListener("pointermove", onPointer);
      cancelAnimationFrame(spotFrame);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return <div ref={barRef} className="progress" aria-hidden="true" />;
}
