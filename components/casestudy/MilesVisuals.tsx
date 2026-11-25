import type { CaseStudy } from "@/data/profile";
import CaseStudyCard, { FlowSteps, Section, type FlowStep } from "./CaseStudy";

// Everything here is generic. The matrix shows scope only (no results), and the templates use
// fictional examples that are not from the feature under test. Edit the dots to match what you tested.

const flow: FlowStep[] = [
  { title: "Search award flight" },
  { title: "Select flight" },
  { title: "Fill in passenger details" },
  { title: "Verify identity", check: "OTP" },
  { title: "Payment (sandbox)", check: "2C2P sandbox" },
  { title: "Ticket issuance", check: "Issuance status" },
  { title: "Miles deducted", check: "Balance before and after" },
  { title: "Confirmation email", check: "Email" },
  { title: "My Trip and print documents" },
];

const areas = ["Miles balance", "OTP", "Payment (sandbox)", "Issuance status", "Confirmation email", "My Trip and print"];

// true = in scope. Rows are scenarios, columns follow `areas`.
const matrix: { group: string; rows: { name: string; scope: boolean[] }[] }[] = [
  {
    group: "Trip type",
    rows: [
      { name: "One-way, domestic", scope: [true, true, true, true, true, true] },
      { name: "One-way, international", scope: [true, true, true, true, true, true] },
      { name: "Return", scope: [true, true, true, true, true, true] },
    ],
  },
  {
    group: "Passengers and cabin",
    rows: [
      { name: "Multiple passengers, including an infant", scope: [true, true, true, true, true, true] },
      { name: "Business cabin", scope: [true, true, true, true, true, true] },
    ],
  },
  {
    group: "Operating airline",
    rows: [
      { name: "Garuda Indonesia flight", scope: [true, true, true, true, true, true] },
      { name: "Airline partner flight", scope: [true, true, true, true, true, true] },
    ],
  },
];

function Matrix() {
  return (
    <div className="cs-table-wrap" tabIndex={0} role="region" aria-label="Test coverage matrix, scrollable">
      <table className="cs-matrix">
        <caption>Scenarios against the areas checked. A dot means in scope. No results are shown.</caption>
        <thead>
          <tr>
            <th scope="col">Scenario</th>
            {areas.map((a) => (
              <th key={a} scope="col">
                {a}
              </th>
            ))}
          </tr>
        </thead>
        {matrix.map((g) => (
          <tbody key={g.group}>
            <tr className="grp">
              <th colSpan={areas.length + 1} scope="colgroup">
                {g.group}
              </th>
            </tr>
            {g.rows.map((r) => (
              <tr key={r.name}>
                <th scope="row">{r.name}</th>
                {r.scope.map((on, i) => (
                  <td key={i}>
                    {on ? (
                      <>
                        <i aria-hidden="true" />
                        <span className="sr-only">In scope</span>
                      </>
                    ) : (
                      <span className="sr-only">Not in scope</span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        ))}
      </table>
    </div>
  );
}

function Doc({ tag, title, rows }: { tag: string; title: string; rows: [string, string][] }) {
  return (
    <div className="cs-doc">
      <div className="cs-doc-head">
        <b>{title}</b>
        <span className="tag">{tag}</span>
      </div>
      <dl>
        {rows.map(([k, v]) => (
          <div key={k}>
            <dt>{k}</dt>
            <dd>{v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function Templates() {
  return (
    <div className="cs-docs">
      <Doc
        title="Test case"
        tag="Fictional example"
        rows={[
          ["ID", "TC-001"],
          ["Title", "Search returns results for a valid keyword"],
          ["Preconditions", "Test account is signed in on an example web shop"],
          ["Test data", "Keyword: \"sample\" (dummy)"],
          ["Steps", "1. Open the search box. 2. Type the keyword. 3. Press Enter."],
          ["Expected result", "A list of matching items is shown, sorted by relevance."],
          ["Actual result", "Filled in when the test is run."],
          ["Status", "Not run"],
        ]}
      />
      <Doc
        title="Bug report"
        tag="Fictional example"
        rows={[
          ["Title", "Tooltip text is cut off on small screens"],
          ["Environment", "Example web shop, test build, Chrome on desktop at 360 px width"],
          ["Steps", "1. Open the product page. 2. Hover the help icon."],
          ["Expected", "The full tooltip text is visible."],
          ["Actual", "The text is cut off at the right edge."],
          ["Severity", "Low (impact on the product)"],
          ["Priority", "Medium (order of fixing, decided with the team)"],
          ["Evidence", "Screenshot and console output attached."],
        ]}
      />
    </div>
  );
}

function Layers() {
  return (
    <figure className="cs-layers" aria-label="What DevTools shows compared with what Kibana shows">
      <div className="cs-layer-ui">
        <b>UI</b>
        <span>What the user sees on screen</span>
      </div>
      <div className="cs-layer-cols">
        <div className="cs-layer">
          <span className="cs-layer-tag">Browser</span>
          <h5>Chrome DevTools</h5>
          <ul>
            <li>
              <b>Network</b>
              <span>Requests the page sent and the responses it got back: status, payload, timing.</span>
            </li>
            <li>
              <b>Console</b>
              <span>JavaScript errors and warnings raised in the page.</span>
            </li>
          </ul>
          <p>Shows what the page asked for and received.</p>
        </div>
        <div className="cs-layer-arrow" aria-hidden="true">
          <span>compare</span>
        </div>
        <div className="cs-layer">
          <span className="cs-layer-tag">Server</span>
          <h5>Kibana</h5>
          <ul>
            <li>
              <b>Logs</b>
              <span>What the backend recorded while it handled the same request.</span>
            </li>
            <li>
              <b>Errors</b>
              <span>Failures raised on the server side that never reach the browser.</span>
            </li>
          </ul>
          <p>Shows what the backend did with it.</p>
        </div>
      </div>
      <figcaption>When the UI, the browser, and the server logs do not tell the same story, that is worth a closer look.</figcaption>
    </figure>
  );
}

export default function MilesCaseStudy({ cs, delay }: { cs: CaseStudy; delay: number }) {
  const s = cs.sections;
  return (
    <CaseStudyCard cs={cs} delay={delay}>
      <Section s={s.flow}>
        <FlowSteps steps={flow} layout="rail" label="Award redemption flow" />
      </Section>
      <Section s={s.scope}>
        <Matrix />
      </Section>
      <Section s={s.method} />
      <Section s={s.templates}>
        <Templates />
      </Section>
      <Section s={s.layers}>
        <Layers />
      </Section>
      <Section s={s.learned} />
      <Section s={s.view}>
        <p className="cs-link">
          <a href="https://www.garuda-indonesia.com" target="_blank" rel="noopener noreferrer">
            Garuda Indonesia website (context only) ↗
          </a>
        </p>
        <p className="cs-note">
          The public website is linked for context only. The feature I tested is not necessarily the same as what is live.
        </p>
      </Section>
    </CaseStudyCard>
  );
}
