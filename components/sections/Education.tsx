import { education, organizations } from "@/data/profile";
import Certifications from "../Certifications";

export default function Education() {
  return (
    <>
      <section className="section" id="education">
        <div className="wrap">
          <div className="sec-head" data-reveal>
            <div>
              <span className="sec-kicker">05 / education</span>
              <h2 className="sec-title">
                Learning <em>record</em>
              </h2>
            </div>
          </div>
          <div className="edu-grid">
            <div className="edu-list">
              {education.map((e, i) => (
                <div key={e.school} className="card spot edu" data-reveal style={{ "--d": `${i * 80}ms` } as React.CSSProperties}>
                  <h3>{e.school}</h3>
                  <p>{e.detail}</p>
                  <p className="ms">{e.period}</p>
                </div>
              ))}
            </div>
            <div data-reveal style={{ "--d": "120ms" } as React.CSSProperties}>
              <Certifications />
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="organizations">
        <div className="wrap">
          <div className="sec-head" data-reveal>
            <div>
              <span className="sec-kicker">06 / organizations</span>
              <h2 className="sec-title">
                Off the <em>keyboard</em>
              </h2>
            </div>
            <p className="sec-note">Committee and student association roles at Universitas Diponegoro.</p>
          </div>
          <div className="orgs">
            {organizations.map((o, i) => (
              <div key={o.role} className="card spot org-card" data-reveal style={{ "--d": `${i * 70}ms` } as React.CSSProperties}>
                <span className="w">{o.period}</span>
                <b>{o.role}</b>
                <span>{o.org}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
