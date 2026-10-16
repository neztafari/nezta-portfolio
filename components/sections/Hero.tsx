import { facts, profile } from "@/data/profile";
import CountUp from "../CountUp";
import HeroField from "../HeroField";
import RotatingWord from "../RotatingWord";
import TiltPhoto from "../TiltPhoto";

// About section right after the intro (the intro opens the page with the big name).
// It renders immediately instead of waiting for the scroll reveal.
export default function Hero() {
  return (
    <section className="hero" id="about">
      <HeroField />
      <div className="wrap">
        <div className="hero-grid">
          <div>
            <p className="chip-now">
              <b>now</b>
              {profile.now}
            </p>
            <h2 className="sec-title hero-title">
              About <em>me</em>
            </h2>
            <p className="rotator">
              {profile.headline} who builds
              <RotatingWord words={["mobile apps", "web apps", "3D for the browser", "things that get tested"]} />
            </p>
            <p className="lede">
              {profile.summary}
            </p>
            <div className="cta">
              <a className="btn btn-primary" href="#projects">
                See my work →
              </a>
              <a className="btn btn-ghost" href="#contact">
                Get in touch
              </a>
            </div>
          </div>

          <div className="photo-wrap">
            {/* 2:3 portrait in a 4:5 frame: keep the face (upper left) and the UNDIP sash in view */}
            <TiltPhoto
              src="/nezta-grad.jpg"
              alt="Nezta Misgi Febyandanu at his UNDIP graduation"
              width={1067}
              height={1600}
              position="40% 22%"
              location={profile.location}
            />
          </div>
        </div>

        <div className="facts">
          {facts.map((f, i) => (
            <div key={f.label} className="card spot fact" data-reveal style={{ "--d": `${i * 80}ms` } as React.CSSProperties}>
              <div className="k">{f.label}</div>
              <div className="v">
                <CountUp value={f.value} />
              </div>
              <div className="s">{f.note}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
