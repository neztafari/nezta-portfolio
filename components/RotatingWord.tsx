"use client";

import { useEffect, useState } from "react";

export default function RotatingWord({ words, interval = 2400 }: { words: string[]; interval?: number }) {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setI((n) => (n + 1) % words.length), interval);
    return () => clearInterval(id);
  }, [words.length, interval]);

  return (
    <span className="rotator-word" aria-live="polite">
      <span key={i}>{words[i]}</span>
    </span>
  );
}
