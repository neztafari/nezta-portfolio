import Image from "next/image";
import type { CaseStudy, ImageSlot } from "@/data/profile";
import CaseStudyCard, { FlowSteps, Section } from "./CaseStudy";

// All figures, aircraft codes and messages below are made-up sample data (PK-XXX style).
// Nothing here comes from a real report or file.

const flow = [
  { title: "Raw TXT files", note: "SFP and NON SFP, one month" },
  { title: "Parse and validate", note: "Tail numbers, dates, row checks" },
  { title: "Calculate P-Factor", note: "Per aircraft, report month only" },
  { title: "Excel and PDF", note: "Python script + LibreOffice" },
];

function Pane({ kind, children }: { kind: "before" | "after"; children: React.ReactNode }) {
  return (
    <div className={`cs-pane ${kind}`}>
      <span className="cs-pane-tag">{kind === "before" ? "Before" : "After"}</span>
      {children}
    </div>
  );
}

function CaSheet({ cut }: { cut?: boolean }) {
  return (
    <div className={`cs-sheet${cut ? " cut" : ""}`} aria-hidden="true">
      <div className="cs-sheet-page">
        <i className="l1" />
        <i className="l2" />
        <i className="l3" />
        <div className="cs-sheet-chart">
          <span style={{ height: "45%" }} />
          <span style={{ height: "70%" }} />
          <span style={{ height: "55%" }} />
          <span style={{ height: "85%" }} />
          <span style={{ height: "60%" }} />
        </div>
      </div>
      {cut && <u>print area ends here</u>}
    </div>
  );
}

function PfTable({ stale }: { stale?: boolean }) {
  const rows = [
    { tail: "PK-XXA", pf: "0.98", note: "in file" },
    { tail: "PK-XXB", pf: stale ? "1.02" : "-", note: stale ? "old value from database" : "no data in file", bad: stale },
    { tail: "PK-XXC", pf: "0.97", note: "in file" },
  ];
  return (
    <table className="cs-mini">
      <thead>
        <tr>
          <th scope="col">Aircraft</th>
          <th scope="col">P-Factor</th>
          <th scope="col">Source</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr key={r.tail} className={r.bad ? "bad" : undefined}>
            <th scope="row">{r.tail}</th>
            <td>{r.pf}</td>
            <td>{r.note}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}


function BeforeAfter() {
  return (
    <div className="cs-ba-list" role="group" aria-label="Before and after, with sample data">
      <div className="cs-ba">
        <h5>CA page in the PDF</h5>
        <div className="cs-ba-pair">
          <Pane kind="before">
            <CaSheet cut />
            <p>The chart section is cut off.</p>
          </Pane>
          <Pane kind="after">
            <CaSheet />
            <p>The chart section is complete.</p>
          </Pane>
        </div>
      </div>

      <div className="cs-ba">
        <h5>P-Factor with only one file type</h5>
        <div className="cs-ba-pair">
          <Pane kind="before">
            <PfTable stale />
            <p>An aircraft with no data in the file shows an old value.</p>
          </Pane>
          <Pane kind="after">
            <PfTable />
            <p>It shows &quot;-&quot; instead.</p>
          </Pane>
        </div>
      </div>

      <div className="cs-ba">
        <h5>Problem data</h5>
        <div className="cs-ba-pair">
          <Pane kind="before">
            <div className="cs-msg ok">
              <b>Report generated</b>
              <span>PK-XXA is in two files. Nothing was flagged.</span>
            </div>
            <p>Duplicate tail numbers and unreadable dates could pass.</p>
          </Pane>
          <Pane kind="after">
            <div className="cs-msg err">
              <b>Conversion stopped</b>
              <span>Row 14: the date could not be read. Raw value: 32/13/2026</span>
            </div>
            <p>The user gets the row number and the raw value.</p>
          </Pane>
        </div>
      </div>
    </div>
  );
}

function Messages() {
  return (
    <div className="cs-msgs" role="group" aria-label="Message mockups, with sample data">
      <div>
        <h5>Errors stop the conversion</h5>
        <div className="cs-msg err">
          <b>Aircraft in more than one file</b>
          <span>PK-XXA appears in both the SFP and the NON SFP file. Keep it in one file and convert again.</span>
        </div>
        <div className="cs-msg err">
          <b>Date could not be read</b>
          <span>Row 14: the date could not be read. Raw value: 32/13/2026. Fix the row and convert again.</span>
        </div>
      </div>
      <div>
        <h5>Warnings are toasts, the download stays available</h5>
        <div className="cs-msg warn">
          <b>Warning</b>
          <span>3 rows are outside the selected month.</span>
        </div>
        <div className="cs-msg warn">
          <b>Warning</b>
          <span>The SFP file has no data for the selected month.</span>
        </div>
        <div className="cs-msg warn">
          <b>Warning</b>
          <span>PK-XXC is not registered yet.</span>
        </div>
      </div>
    </div>
  );
}

function Slots({ slots }: { slots: ImageSlot[] }) {
  return (
    <ul className="cs-slots">
      {slots.map((sl) => (
        <li key={sl.title}>
          <div className={`cs-slot${sl.image ? " filled" : ""}`}>
            {sl.image ? (
              <>
                <Image src={sl.image} alt={`${sl.title}: ${sl.show}`} fill sizes="(max-width: 860px) 100vw, 33vw" />
                <span className="cs-slot-tag solid">Mockup</span>
              </>
            ) : (
              <>
                <span className="cs-slot-tag">Placeholder</span>
                <span className="cs-slot-ico" aria-hidden="true" />
              </>
            )}
          </div>
          <strong>{sl.title}</strong>
          <p>{sl.show}</p>
        </li>
      ))}
    </ul>
  );
}

export default function ApmCaseStudy({ cs, slots, delay }: { cs: CaseStudy; slots: ImageSlot[]; delay: number }) {
  const s = cs.sections;
  return (
    <CaseStudyCard cs={cs} delay={delay}>
      <Section s={s.needs} />
      <Section s={s.flow}>
        <FlowSteps steps={flow} layout="row" label="Report conversion flow" />
      </Section>
      <Section s={s.problems}>
        <BeforeAfter />
      </Section>
      <Section s={s.fixes}>
        <Messages />
      </Section>
      <Section s={s.testing} />
      <Section s={s.slots}>
        <Slots slots={slots} />
      </Section>
    </CaseStudyCard>
  );
}
