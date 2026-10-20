import { experiences } from "@/data/profile";

export default function Experience() {
  return (
    <section className="section" id="experience">
      <div className="wrap">
        <div className="sec-head" data-reveal>
          <div>
            <span className="sec-kicker">02 / experience</span>
            <h2 className="sec-title">
              Where I&apos;ve <em>shipped</em>
            </h2>
          </div>
          <p className="sec-note">Newest first.</p>
        </div>

        <div className="timeline">
          {experiences.map((job) => (
            <article key={job.company} className={`job${job.current ? " now" : ""}`} data-reveal>
              <div className="job-meta">
                <span>{job.period}</span>
                <span>{job.location}</span>
                <span>{job.type}</span>
              </div>
              <div className="card spot job-body">
                <h3>
                  {job.role}
                  {job.program && <span className="program-badge">{job.program}</span>}
                </h3>
                <p className="org">{job.company}</p>
                <ul>
                  {job.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
                <div className="tags">
                  {job.tags.map((t) => (
                    <span key={t} className="tag">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
