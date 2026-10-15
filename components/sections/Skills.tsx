import { skills } from "@/data/profile";

export default function Skills() {
  const all = skills.flatMap((s) => s.items);
  return (
    <section className="section" id="skills">
      <div className="wrap">
        <div className="sec-head" data-reveal>
          <div>
            <span className="sec-kicker">04 / skills</span>
            <h2 className="sec-title">
              My <em>toolbox</em>
            </h2>
          </div>
        </div>
      </div>

      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {[...all, ...all].map((s, i) => (
            <span key={i}>{s}</span>
          ))}
        </div>
      </div>

      <div className="wrap">
        <div className="skills">
          {skills.map((g, i) => (
            <div
              key={g.group}
              className="card spot skill"
              data-reveal
              data-wide={g.group === "Quality & process" || undefined}
              style={{ "--d": `${(i % 3) * 80}ms` } as React.CSSProperties}
            >
              <h3>{g.group}</h3>
              <div className="chips">
                {g.items.map((s) => (
                  <span key={s} className="chip">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
