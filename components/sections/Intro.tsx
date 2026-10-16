"use client";

import { useEffect, useRef } from "react";
import { introSteps, profile } from "@/data/profile";
import TourRoom from "../previews/TourRoom";

// Pinned scroll intro. Step 01 shows a CSS 3D phone whose screen wakes (lock screen → mobile UI); it then turns
// away and hands over to a CSS 3D laptop whose lid opens for step 02 (web dashboard in a browser)
// and whose browser tab switches to the 3D room for step 03.
// JS only measures scroll progress (0→1) and writes it to --p on the stage; every motion is
// derived from --p in CSS (transform/opacity). The listener runs only while the section is
// near the viewport. With reduced motion (or no JS) the intro is a short static block.

const stepAt = (p: number) => (p < 0.55 ? 1 : p < 0.8 ? 2 : 3);
const dateFormat = new Intl.DateTimeFormat("en-GB", { weekday: "long", day: "numeric", month: "long" });

export default function Intro() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const pctRef = useRef<HTMLSpanElement>(null);
  const stepRef = useRef<HTMLSpanElement>(null);
  const timeRef = useRef<HTMLSpanElement>(null);
  const dateRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    if (!section || !stage || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let lastPct = -1;
    let lastStep = 0;
    const update = () => {
      raf = 0;
      const total = section.offsetHeight - window.innerHeight;
      const p = total > 0 ? Math.min(1, Math.max(0, -section.getBoundingClientRect().top / total)) : 0;
      stage.style.setProperty("--p", p.toFixed(4));
      const pct = Math.round(p * 100);
      if (pct !== lastPct && pctRef.current) {
        lastPct = pct;
        pctRef.current.textContent = `${String(pct).padStart(2, "0")}%`;
      }
      const step = stepAt(p);
      if (step !== lastStep && stepRef.current) {
        lastStep = step;
        stepRef.current.textContent = `0${step} / 0${introSteps.length}`;
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    // lock screen clock: visitor's local time/date, written straight to the two spans.
    // One timeout re-armed at each new minute, only while the intro is near and the tab visible.
    let clock = 0;
    const tick = () => {
      const now = new Date();
      if (timeRef.current) {
        timeRef.current.textContent = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
      }
      if (dateRef.current) dateRef.current.textContent = dateFormat.format(now);
      clock = window.setTimeout(tick, 60_000 - (now.getSeconds() * 1000 + now.getMilliseconds()) + 50);
    };
    const stopClock = () => {
      window.clearTimeout(clock);
      clock = 0;
    };

    let listening = false;
    const syncClock = () => {
      stopClock();
      if (listening && !document.hidden) tick();
    };
    const listen = (on: boolean) => {
      if (on === listening) return;
      listening = on;
      if (on) {
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);
        onScroll();
      } else {
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onScroll);
      }
      syncClock();
    };
    const io = new IntersectionObserver(([entry]) => listen(entry.isIntersecting), { rootMargin: "200px 0px" });
    io.observe(section);
    document.addEventListener("visibilitychange", syncClock);

    return () => {
      io.disconnect();
      listen(false);
      stopClock();
      document.removeEventListener("visibilitychange", syncClock);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="intro" ref={sectionRef} aria-label="Intro">
      <div className="intro-stage" ref={stageRef}>
        <div className="intro-glow" aria-hidden="true" />

        <div className="intro-copy">
          <div className="intro-title">
            <h1 className="intro-name">
              {profile.name.first}{" "}
              <span className="l2">
                {profile.name.last}
                <span className="dot">.</span>
              </span>
            </h1>
            <p className="intro-role">{profile.headline}</p>
          </div>
          {introSteps.map((s, i) => (
            <div key={s.title} className={`intro-step s${i + 1}`}>
              <span className="intro-step-n">0{i + 1}</span>
              <p className="intro-step-title">{s.title}</p>
              <div className="tags">
                {s.tech.map((t) => (
                  <span key={t} className="tag">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="intro-device" aria-hidden="true">
          <Phone timeRef={timeRef} dateRef={dateRef} />
          <Laptop />
        </div>

        <div className="intro-bar">
          <span className="intro-progress">
            <span ref={pctRef}>00%</span>
            <i />
          </span>
          <span className="intro-hint">Scroll ↓</span>
          <span className="intro-end">
            <span ref={stepRef}>01 / 0{introSteps.length}</span>
            <a className="intro-skip" href="#about">
              Skip intro →
            </a>
          </span>
        </div>
      </div>
    </section>
  );
}

// Flagship-style phone, always shown from the front (it never turns past ~35°, so there is no
// back face): metal rail + stacked slices that share the metal gradient, thin black bezels with a
// pill camera, side buttons. The screen layers are the app UI, a lock screen and an "off" glass
// layer on top; the wrapper fades, the 3D element itself only transforms.
// The lock screen time/date are filled in on the client (see the clock in Intro); the server
// renders neutral placeholders so hydration always matches.
function Phone({ timeRef, dateRef }: { timeRef: React.Ref<HTMLSpanElement>; dateRef: React.Ref<HTMLSpanElement> }) {
  return (
    <div className="dev dev-phone">
      <i className="dev-shadow" />
      <div className="phone">
        {Array.from({ length: 7 }, (_, i) => (
          <i key={i} className="phone-slice" style={{ "--k": i } as React.CSSProperties} />
        ))}
        <i className="phone-btn power" />
        <i className="phone-btn volume" />
        <div className="phone-face phone-front">
          <div className="phone-glass">
            <div className="phone-screen">
              <MobileScreen />
              <div className="scr-lock">
                <span className="lock-time" ref={timeRef}>
                  --:--
                </span>
                <span className="lock-date" ref={dateRef}>
                  {" "}
                </span>
                <i className="lock-home" />
              </div>
              <i className="scr-off" />
              <i className="phone-pill" />
              <i className="phone-glare" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Laptop: a base with real thickness (deck with key plates and a trackpad) and a lid hinged at
// the back edge. The lid's screen shows a browser window: tabs, URL pill, and a viewport that
// switches from the web dashboard to the 3D room.
function Laptop() {
  return (
    <div className="dev dev-laptop">
      <i className="dev-shadow" />
      <div className="laptop">
        <div className="lt-base">
          <div className="lt-f lt-deck">
            <i className="lt-keys" />
            <i className="lt-pad" />
          </div>
          <i className="lt-f lt-front" />
          <i className="lt-f lt-side l" />
          <i className="lt-f lt-side r" />
        </div>
        <div className="lt-lid">
          <i className="lt-f lt-lid-back" />
          <i className="lt-f lt-lid-top" />
          <i className="lt-f lt-lid-side l" />
          <i className="lt-f lt-lid-side r" />
          <div className="lt-f lt-screen">
            <div className="br">
              <div className="br-tabs">
                <i />
                <i />
                <i />
              </div>
              <div className="br-url">
                <i />
                <span />
              </div>
              <div className="br-view">
                <WebScreen />
                <div className="br-room">
                  <TourRoom still />
                  <span className="br-fps">FPS 153</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MobileScreen() {
  return (
    <div className="scr-mobile">
      <div className="sm-status">
        <i />
        <i />
      </div>
      <div className="sm-head">
        <i />
        <span />
      </div>
      <div className="sm-hero">
        <span />
        <span />
      </div>
      <div className="sm-tiles">
        <i />
        <i />
        <i />
        <i />
      </div>
      <div className="sm-list">
        {Array.from({ length: 3 }, (_, i) => (
          <div key={i}>
            <i />
            <span />
          </div>
        ))}
      </div>
      <div className="sm-nav">
        <i />
        <i />
        <i />
        <i />
      </div>
    </div>
  );
}

function WebScreen() {
  return (
    <div className="sw">
      <div className="sw-side">
        <i />
        <i />
        <i />
        <i />
      </div>
      <div className="sw-main">
        <div className="sw-kpis">
          <span />
          <span />
          <span />
        </div>
        <div className="sw-chart">
          {[0.45, 0.7, 0.55, 0.9, 0.65, 0.8, 0.5, 0.95, 0.75, 0.6].map((h, i) => (
            <i key={i} style={{ height: `${h * 100}%` }} />
          ))}
        </div>
      </div>
    </div>
  );
}
