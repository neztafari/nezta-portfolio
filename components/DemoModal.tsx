"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

// Live demo in a phone-shaped frame. Mounted only while open, so the iframe never loads with the
// page. Closes on Esc, backdrop click or the close button; locks body scroll while open.
// Focus is trapped with two sentinels: a keydown handler alone cannot catch Tab once focus is
// inside the cross-origin iframe, but leaving it still lands on a sentinel, which wraps focus.
export default function DemoModal({ title, url, onClose }: { title: string; url: string; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  // focusables in DOM order: "Open in new tab" link, close button, iframe
  const wrapTo = (end: "first" | "last") => {
    const items = dialogRef.current?.querySelectorAll<HTMLElement>("a[href], button:not([disabled]), iframe");
    if (!items?.length) return;
    (end === "first" ? items[0] : items[items.length - 1]).focus();
  };
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    closeRef.current?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return createPortal(
    <div className="demo-backdrop" onClick={onClose}>
      <div
        ref={dialogRef}
        className="demo-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="demo-title"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="demo-sentinel" tabIndex={0} onFocus={() => wrapTo("last")} />
        <div className="demo-head">
          <span id="demo-title">{title}</span>
          <a href={url} target="_blank" rel="noopener noreferrer">
            Open in new tab ↗
          </a>
          <button ref={closeRef} type="button" className="demo-close" aria-label="Close demo" onClick={onClose}>
            ✕
          </button>
        </div>
        <div className="demo-phone">
          {!loaded && <span className="demo-loading">Loading demo…</span>}
          <iframe
            src={url}
            title={`${title} live demo`}
            allow="autoplay; fullscreen"
            referrerPolicy="no-referrer"
            onLoad={() => setLoaded(true)}
          />
        </div>
        <span className="demo-sentinel" tabIndex={0} onFocus={() => wrapTo("first")} />
      </div>
    </div>,
    document.body,
  );
}
