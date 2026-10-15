"use client";

import { useState } from "react";

export default function CopyEmail({ email }: { email: string }) {
  const [done, setDone] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setDone(true);
      setTimeout(() => setDone(false), 1800);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <button type="button" className={`copy-btn${done ? " done" : ""}`} onClick={copy}>
      {done ? "copied" : "copy"}
    </button>
  );
}
