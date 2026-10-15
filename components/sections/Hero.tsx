import { facts, profile } from "@/data/profile";
import CountUp from "../CountUp";
import HeroField from "../HeroField";
import RotatingWord from "../RotatingWord";
import TiltPhoto from "../TiltPhoto";

export default function Hero() {
  return (
    <section className="hero" id="top">
      <HeroField />
      <div className="wrap">
        <div className="hero-grid">
          <div>
            <p className="chip-now" data-reveal>
              <b>now</b>
              {profile.now}
            </p>
            <h1 data-reveal style={{ "--d": "80ms" } as React.CSSProperties}>
              {profile.name.first}{" "}
              <span className="l2">
                {profile.name.last}
                <span className="dot">.</span>
              </span>
            </h1>
            <p className="rotator" data-reveal style={{ "--d": "160ms" } as React.CSSProperties}>
              {profile.headline} who builds
              <RotatingWord words={["mobile apps", "web apps", "3D for the browser", "things that get tested"]} />
            </p>
            <p className="lede" data-reveal style={{ "--d": "240ms" } as React.CSSProperties}>
              {profile.summary}
            </p>
            <div className="cta" data-reveal style={{ "--d": "320ms" } as React.CSSProperties}>
              <a className="btn btn-primary" href="#projects">
                See my work →
              </a>
              <a className="btn btn-ghost" href="#contact">
                Get in touch
              </a>
            </div>
          </div>

          <div className="photo-wrap" data-reveal style={{ "--d": "200ms" } as React.CSSProperties}>
            <TiltPhoto src="/nezta.jpg" alt={`${profile.name.first} ${profile.name.last}`} location={profile.location} />
            <span className="orbit o1">
              <b>Flutter</b> · e-AFL
            </span>
            <span className="orbit o2">
              <b>Next.js</b> · DX Workspace
            </span>
            <span className="orbit o3">
              <b>Unity</b> · WebGL
            </span>
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
