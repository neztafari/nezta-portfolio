import { career, profile } from "@/data/profile";

function GraphIcon({ kind }: { kind: (typeof career)[number]["kind"] }) {
  if (kind === "root")
    return (
      <svg viewBox="0 0 56 76" aria-hidden="true">
        <path className="g-main" d="M16 38 V76" />
        <circle className="g-root" cx="16" cy="38" r="6" />
      </svg>
    );
  if (kind === "main")
    return (
      <svg viewBox="0 0 56 76" aria-hidden="true">
        <path className="g-main" d="M16 0 V76" />
        <circle className="g-mainnode" cx="16" cy="38" r="6" />
      </svg>
    );
  if (kind === "head")
    return (
      <svg viewBox="0 0 56 76" aria-hidden="true">
        <path className="g-main" d="M16 0 V38" />
        <path className="g-br" d="M16 4 C16 22 40 20 40 38" />
        <path className="g-br open" d="M40 44 V76" />
        <circle className="g-pulse" cx="40" cy="38" r="6" />
        <circle className="g-head" cx="40" cy="38" r="6" />
      </svg>
    );
  return (
    <svg viewBox="0 0 56 76" aria-hidden="true">
      <path className="g-main" d="M16 0 V76" />
      <path className="g-br" d="M16 4 C16 22 40 20 40 38 C40 56 16 54 16 72" />
      <circle className="g-node" cx="40" cy="38" r="6" />
    </svg>
  );
}

export default function Journey() {
  return (
    <section className="section" id="journey">
      <div className="wrap">
        <div className="sec-head" data-reveal>
          <div>
            <span className="sec-kicker">01 / journey</span>
            <h2 className="sec-title">
              From campus <em>to real projects</em>
            </h2>
          </div>
          <p className="sec-note">Every internship and project branched off my studies and merged back in. The current branch is still open.</p>
        </div>

        <div className="journey">
          <div className="card graph" data-reveal>
            <div className="graph-head">
              <span>git log --graph</span>
              <span>career</span>
            </div>
            {career.map((c) => (
              <div key={c.title} className="g-row">
                <GraphIcon kind={c.kind} />
                <div>
                  <b>
                    {c.title}
                    {c.kind === "head" && <span className="head-tag">HEAD</span>}
                  </b>
                  <span>{c.meta}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="about">
            <div className="card spot about-card" data-reveal style={{ "--d": "80ms" } as React.CSSProperties}>
              <h3>About</h3>
              <p>
                I started on the frontend at Telkomsel with React Native, spent most of 2025 building a Unity WebGL virtual tour for my capstone and thesis,
                and now ship Flutter and Next.js code for Garuda Indonesia&apos;s IT Development unit. I like work where I can trace a problem from the
                screen down to the payload.
              </p>
            </div>
            <div className="card spot about-card" data-reveal style={{ "--d": "160ms" } as React.CSSProperties}>
              <h3>Interested in</h3>
              <div className="chips">
                {profile.interests.map((i) => (
                  <span key={i} className="chip">
                    {i}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
