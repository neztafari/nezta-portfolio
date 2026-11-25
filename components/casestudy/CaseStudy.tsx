import type { CaseStudy, CaseStudySection } from "@/data/profile";

// Shell for a case study card: header with summary, then the full write-up inside a native
// <details>, so it needs no JavaScript and keeps the page short until someone opens it.
export default function CaseStudyCard({
  cs,
  delay,
  children,
}: {
  cs: CaseStudy;
  delay: number;
  children: React.ReactNode;
}) {
  return (
    <article className="card spot proj cs" data-reveal style={{ "--d": `${delay}ms` } as React.CSSProperties}>
      <div className="cs-head">
        <span className="proj-kind">{cs.kind}</span>
        <h3>{cs.title}</h3>
        {cs.subtitle && <p className="cs-sub">{cs.subtitle}</p>}
        <span className="cs-status">
          <i aria-hidden="true" />
          {cs.status}
        </span>
        <p className="cs-sum">{cs.summary}</p>
        <dl className="cs-facts">
          {cs.facts.map((f) => (
            <div key={f.label}>
              <dt>{f.label}</dt>
              <dd>{f.value}</dd>
            </div>
          ))}
        </dl>
        <div className="tags">
          {cs.tags.map((t) => (
            <span key={t} className="tag">
              {t}
            </span>
          ))}
        </div>
      </div>
      <details className="cs-more">
        <summary>
          <span>Read the case study</span>
          <i aria-hidden="true" />
        </summary>
        <div className="cs-sections">{children}</div>
      </details>
    </article>
  );
}

export function Section({ s, children }: { s: CaseStudySection; children?: React.ReactNode }) {
  return (
    <section className="cs-sec">
      <h4>{s.title}</h4>
      {s.text && <p className="cs-lead">{s.text}</p>}
      {s.points && (
        <ul>
          {s.points.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      )}
      {children}
    </section>
  );
}

export type FlowStep = { title: string; note?: string; check?: string };

// Numbered steps. "row" lays a short flow out left to right, "rail" stacks a long one vertically.
// The list is real content (an ordered list), so it reads in order for screen readers.
export function FlowSteps({ steps, layout, label }: { steps: FlowStep[]; layout: "row" | "rail"; label: string }) {
  return (
    <ol
      className={`cs-flow ${layout}`}
      aria-label={label}
      style={{ "--n": steps.length } as React.CSSProperties}
    >
      {steps.map((st, i) => (
        <li key={st.title}>
          <b aria-hidden="true">{i + 1}</b>
          <span className="cs-flow-t">{st.title}</span>
          {st.note && <small>{st.note}</small>}
          {st.check && <em>{st.check}</em>}
        </li>
      ))}
    </ol>
  );
}
