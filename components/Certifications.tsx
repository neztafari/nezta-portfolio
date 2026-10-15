"use client";

import { useState } from "react";
import { certifications } from "@/data/profile";

const filters = ["All", "Cisco", "Oracle", "Language"] as const;
type Filter = (typeof filters)[number];

function matches(issuer: string, f: Filter) {
  if (f === "All") return true;
  if (f === "Language") return !issuer.includes("Cisco") && !issuer.includes("Oracle");
  return issuer.includes(f);
}

export default function Certifications() {
  const [filter, setFilter] = useState<Filter>("All");
  const list = certifications.filter((c) => matches(c.issuer, filter));

  return (
    <div className="card certs">
      <div className="cert-tabs" role="group" aria-label="Filter certifications">
        {filters.map((f) => (
          <button key={f} type="button" className="cert-tab" aria-pressed={filter === f} onClick={() => setFilter(f)}>
            {f}
          </button>
        ))}
      </div>
      <p className="cert-count">
        {list.length} of {certifications.length}
      </p>
      <ul className="cert-list">
        {list.map((c) => (
          <li key={`${filter}-${c.name}`}>
            <span>{c.issuer}</span>
            <span>{c.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
