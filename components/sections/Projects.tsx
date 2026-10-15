import { projects, thesis, type Project } from "@/data/profile";
import ProjectPreview from "../previews/ProjectPreview";

function ProjectCard({ project, delay, wide }: { project: Project; delay: number; wide?: boolean }) {
  return (
    <article className={`card spot proj${wide ? " wide" : ""}`} data-reveal style={{ "--d": `${delay}ms` } as React.CSSProperties}>
      <ProjectPreview project={project} />
      <div className="proj-body">
        <span className="proj-kind">{project.kind}</span>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <div className="tags">
          {project.tags.map((t) => (
            <span key={t} className="tag">
              {t}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

function FpsChart() {
  const pct = (v: number) => `${((v / thesis.maxFps) * 100).toFixed(1)}%`;
  return (
    <figure className="fps" data-reveal style={{ margin: 0 }}>
      <figcaption>
        <p className="fps-title">Average FPS by scenario and GPU</p>
        <p className="fps-sub">3 scenarios × 3 GPUs · 30 s per run · Google Chrome</p>
      </figcaption>
      <div className="fps-grid" role="table" aria-label="Average FPS by scenario and GPU">
        <div className="fps-row fps-head" role="row">
          <span role="columnheader">GPU</span>
          {thesis.scenarios.map((s) => (
            <span key={s} role="columnheader">
              {s}
            </span>
          ))}
        </div>
        {thesis.fps.map((row, r) => (
          <div key={row.gpu} className="fps-row" role="row">
            <span className="fps-dev" role="rowheader">
              <b>{row.gpu}</b>
              <small>{row.kind}</small>
            </span>
            {row.values.map((v, c) => (
              <span key={c} className="fps-cell" role="cell" title={`${row.gpu} · ${thesis.scenarios[c]}: ${v} FPS`}>
                <span className="fps-track">
                  <span
                    className={`fps-bar${row.integrated ? " low" : ""}`}
                    style={{ width: pct(v), "--d": `${(r * 3 + c) * 70}ms` } as React.CSSProperties}
                  />
                  <span className="fps-ref" style={{ left: pct(thesis.floorFps) }} />
                </span>
                <span className="fps-val">{v.toFixed(1)}</span>
              </span>
            ))}
          </div>
        ))}
      </div>
      <p className="fps-foot">
        <i aria-hidden="true" />
        {thesis.floorFps} FPS, the usual floor for smooth interaction
      </p>
    </figure>
  );
}

export default function Projects() {
  const [eafl, dx, tracker, ...rest] = projects;
  return (
    <section className="section" id="projects">
      <div className="wrap">
        <div className="sec-head" data-reveal>
          <div>
            <span className="sec-kicker">03 / projects</span>
            <h2 className="sec-title">
              Things I&apos;ve <em>built</em>
            </h2>
          </div>
          <p className="sec-note">Work at Garuda, my thesis, and apps from internships and coursework.</p>
        </div>

        <div className="bento">
          <ProjectCard project={eafl} delay={0} wide />

          <ProjectCard project={dx} delay={0} />
          <ProjectCard project={tracker} delay={80} />

          <article className="card spot proj wide" data-reveal>
            <div className="proj-preview" style={{ display: "grid", alignItems: "center" }}>
              <FpsChart />
            </div>
            <div className="proj-body">
              <span className="proj-kind">{thesis.kind}</span>
              <h3>{thesis.title}</h3>
              <p>{thesis.description}</p>
              <div className="tags">
                {thesis.tags.map((t) => (
                  <span key={t} className="tag">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </article>

          {rest.map((p, i) => (
            <ProjectCard key={p.title} project={p} delay={i * 80} />
          ))}
        </div>
      </div>
    </section>
  );
}
