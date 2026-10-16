"use client";

import { useEffect, useRef, useState } from "react";

// Cycles through words; the timer only runs while the word is on screen and the tab is visible.
export default function RotatingWord({ words, interval = 2400 }: { words: string[]; interval?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [i, setI] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let id = 0;
    let onScreen = false;
    const sync = () => {
      if (onScreen && !document.hidden) {
        if (!id) id = window.setInterval(() => setI((n) => (n + 1) % words.length), interval);
      } else {
        window.clearInterval(id);
        id = 0;
      }
    };
    const io = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      sync();
    });
    io.observe(el);
    document.addEventListener("visibilitychange", sync);
    return () => {
      window.clearInterval(id);
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, [words.length, interval]);

  return (
    <span ref={ref} className="rotator-word" aria-live="polite">
      <span key={i}>{words[i]}</span>
    </span>
  );
}
