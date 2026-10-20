"use client";

import { useRef, useState } from "react";
import DemoModal from "./DemoModal";

// A project card that opens its live demo. The whole card acts as a button (click, Enter, Space);
// the demo iframe only exists while the modal is open.
export default function DemoCard({
  className,
  style,
  title,
  url,
  children,
}: {
  className: string;
  style: React.CSSProperties;
  title: string;
  url: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);

  const close = () => {
    setOpen(false);
    ref.current?.focus();
  };

  return (
    <>
      <article
        ref={ref}
        className={`${className} has-demo`}
        data-reveal
        style={style}
        role="button"
        tabIndex={0}
        aria-haspopup="dialog"
        aria-label={`${title}: open live demo`}
        onClick={() => setOpen(true)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setOpen(true);
          }
        }}
      >
        {children}
        <span className="demo-chip" aria-hidden="true">
          <i />
          Tap to try live
        </span>
      </article>
      {open && <DemoModal title={title} url={url} onClose={close} />}
    </>
  );
}
