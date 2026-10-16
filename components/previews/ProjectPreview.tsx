import Image from "next/image";
import type { Project } from "@/data/profile";

// Shows the real screenshot when `image` is set in data/profile.ts,
// otherwise a drawn illustration of the project.
export default function ProjectPreview({ project }: { project: Project }) {
  if (project.image) {
    return (
      <div className="proj-preview">
        <Image src={project.image} alt={`${project.title} screenshot`} fill sizes="(max-width: 860px) 100vw, 50vw" />
      </div>
    );
  }

  return (
    <div className="proj-preview" aria-hidden="true" data-loop>
      <span className="preview-label">{project.internal ? "INTERNAL PROJECT · ILLUSTRATION" : "ILLUSTRATION"}</span>
      {project.preview === "tablet" && <Tablet />}
      {project.preview === "dashboard" && <Dashboard />}
      {project.preview === "radar" && <Radar />}
      {project.preview === "phone-quota" && <PhoneQuota />}
      {project.preview === "phone-music" && <PhoneMusic />}
    </div>
  );
}

// Abstract tablet flow on one 14s CSS loop: night mode turns on, a menu card is
// tapped, a draft sheet slides up, "Create New" opens the flight log form, and the
// form fills in before everything fades back to the light dashboard.
function Tablet() {
  return (
    <div className="pv-tablet">
      <div className="pv-screens">
        <TabletScreen />
        <TabletScreen dark />
        <div className="pv-flow">
          <i className="pv-scrim" />
          <div className="pv-sheet">
            <i className="pv-handle" />
            <b>Draft e-AFL</b>
            <i className="pv-divider" />
            {Array.from({ length: 3 }, (_, i) => (
              <div key={i} className="pv-draft">
                <span className="pv-draft-bar" />
                <em>Draft</em>
                <span className="pv-draft-del" />
              </div>
            ))}
            <span className="pv-btn">
              Create New
              <em className="pv-tap two" />
            </span>
          </div>
          <div className="pv-fscreen">
            <div className="pv-f-head">
              <i className="pv-back" />
              <b>Aircraft Flight Log</b>
            </div>
            <div className="pv-f-tabs">
              <span className="on" />
              <span />
              <span />
            </div>
            <b className="pv-f-h">Flight Information</b>
            <div className="pv-f-grid">
              {Array.from({ length: 8 }, (_, i) => (
                <div key={i} className="pv-f-cell">
                  <span className="pv-f-label" />
                  <span className="pv-f-val">
                    <i style={{ animationDelay: `${i * 0.3}s` }} />
                  </span>
                </div>
              ))}
            </div>
            <b className="pv-f-h">Crew Information</b>
            <span className="pv-f-sub" />
            <div className="pv-f-row">
              {Array.from({ length: 5 }, (_, i) => (
                <span key={i}>
                  <i />
                </span>
              ))}
            </div>
            <span className="pv-btn">Submit</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function TabletScreen({ dark }: { dark?: boolean }) {
  return (
    <div className={`pv-screen${dark ? " dark" : ""}`}>
      <div className="pv-s-head">
        <i className="pv-s-logo" />
        <span className="pv-skel pv-s-title" />
        <span className="pv-s-night">
          Night Mode
          <span className="pv-switch">
            <i />
          </span>
        </span>
      </div>
      <div className="pv-s-banner">
        <i className="pv-s-avatar" />
        <div>
          <b>Hi, Pilot</b>
          <span className="pv-skel" />
        </div>
      </div>
      <b className="pv-s-label">Cockpit Menu</b>
      <div className="pv-s-menu">
        {Array.from({ length: 7 }, (_, i) => (
          <div key={i} className="pv-s-card">
            <i />
            <span className="pv-skel" />
            {dark && i === 0 && <em className="pv-tap" />}
          </div>
        ))}
      </div>
    </div>
  );
}

function Dashboard() {
  return (
    <div className="pv-browser">
      <div className="pv-bar">
        <i />
        <i />
        <i />
        <span />
      </div>
      <div className="pv-admin">
        <div className="pv-a-side">
          <div className="pv-a-brand">
            <i />
            <span />
          </div>
          {Array.from({ length: 6 }, (_, i) => (
            <div key={i} className={`pv-a-nav${i === 3 ? " on" : ""}`}>
              <i />
              <span />
            </div>
          ))}
        </div>
        <div className="pv-a-main">
          <span className="pv-a-crumb" />
          <div className="pv-a-hero">
            <div>
              <b>UAT</b>
              <span />
            </div>
            <span className="pv-a-new">Create New</span>
          </div>
          <div className="pv-a-filters">
            <span />
            <span />
          </div>
          <div className="pv-a-docs">
            {Array.from({ length: 3 }, (_, i) => (
              <div key={i} className="pv-a-doc">
                <div className="pv-a-doc-top">
                  <span />
                  <em>DRAFT</em>
                </div>
                <span className="pv-a-title" />
                <div className="pv-a-progress">
                  {i === 0 && (
                    <b>
                      <i />
                      <i />
                    </b>
                  )}
                </div>
                <div className="pv-a-foot">
                  <i />
                  <span />
                  <span />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Abstract dark flight-tracking map: a cropped globe with faint islands,
// map UI chrome, and planes flying curved routes over the islands.
function Radar() {
  const planes = [
    { path: "M110 150 Q200 110 300 140", dur: "9s" },
    { path: "M140 210 Q230 170 340 200", dur: "12s" },
    { path: "M370 130 Q280 160 180 130", dur: "10s" },
    { path: "M200 118 Q245 160 262 218", dur: "14s" },
    { path: "M335 214 Q260 186 150 196", dur: "8s" },
  ];
  return (
    <div className="pv-radar">
      <svg viewBox="0 0 400 250" preserveAspectRatio="xMidYMid slice">
        <defs>
          <radialGradient id="trkGlobe" cx="0.45" cy="0.35" r="0.65">
            <stop offset="0" stopColor="#1f3270" />
            <stop offset="1" stopColor="#15204a" />
          </radialGradient>
          <clipPath id="trkClip">
            <circle cx="230" cy="190" r="170" />
          </clipPath>
        </defs>
        <rect width="400" height="250" fill="#0b1222" />
        <circle cx="230" cy="190" r="170" fill="url(#trkGlobe)" />
        <ellipse className="grat" cx="230" cy="190" rx="170" ry="60" />
        <ellipse className="grat" cx="230" cy="190" rx="60" ry="170" />
        <ellipse className="grat" cx="230" cy="190" rx="125" ry="170" />

        <g className="land" clipPath="url(#trkClip)">
          <path d="M120 60 C150 40 190 52 220 44 C255 36 290 50 320 46 C345 44 360 58 352 74 C340 92 312 84 296 96 C282 106 268 98 256 108 C246 116 232 104 222 96 C204 84 182 92 166 84 C148 76 126 80 120 60Z" />
          <path d="M232 100 C238 112 236 124 242 134 C246 140 240 142 236 136 C230 126 226 112 232 100Z" />
          <path d="M150 140 C160 140 176 154 190 168 C198 176 196 184 188 182 C176 176 160 160 150 150 C144 144 144 140 150 140Z" />
          <path d="M196 190 C214 186 240 188 262 192 C270 194 268 200 258 200 C238 200 214 198 198 198 C190 196 190 192 196 190Z" />
          <path d="M222 142 C232 132 252 134 262 144 C270 154 266 170 254 176 C240 182 224 174 220 162 C218 154 216 148 222 142Z" />
          <path d="M284 146 C292 144 296 150 292 158 C298 158 306 156 308 162 C302 166 294 164 292 170 C296 178 290 184 286 176 C284 168 282 158 284 146Z" />
          <path d="M326 172 C340 164 362 168 378 178 C384 184 376 190 364 188 C350 186 336 190 328 184 C322 180 322 176 326 172Z" />
          <ellipse cx="274" cy="205" rx="6" ry="2.5" />
          <ellipse cx="288" cy="206" rx="5" ry="2" />
          <ellipse cx="301" cy="204" rx="4" ry="2" />
        </g>

        {planes.map((p, i) => (
          <g key={i}>
            <path className="route" d={p.path} />
            <g className="plane">
              <path d="M7 0 L-2 -1.2 L-5 -5 L-6.5 -5 L-4.5 -1.2 L-6 -1 L-7 -2.5 L-8 -2.5 L-7.3 0 L-8 2.5 L-7 2.5 L-6 1 L-4.5 1.2 L-6.5 5 L-5 5 L-2 1.2 Z" />
              <animateMotion dur={p.dur} repeatCount="indefinite" path={p.path} rotate="auto" />
            </g>
          </g>
        ))}

        {/* status pill */}
        <rect className="panel" x="10" y="222" width="66" height="16" rx="8" />
        <circle cx="19" cy="230" r="3" fill="#37b24d" />
        <rect className="skel" x="27" y="228" width="40" height="4" rx="2" />

        {/* zoom controls */}
        <rect className="panel" x="378" y="190" width="14" height="14" rx="3" />
        <rect className="panel" x="378" y="207" width="14" height="14" rx="3" />
        <rect className="panel" x="378" y="224" width="14" height="14" rx="3" />
        <path className="glyph" d="M381.5 197 H388.5 M385 193.5 V200.5 M381.5 214 H388.5" />
        <circle className="glyph" cx="385" cy="231" r="2.5" />
      </svg>
      {/* top bar is HTML, not SVG, so it can sit below the preview label at a fixed offset */}
      <div className="pv-trk-bar">
        <i className="pv-trk-accent" />
        <div className="pv-trk-title">
          <span />
          <span />
        </div>
        <div className="pv-trk-seg">
          <b />
          <span />
          <span />
        </div>
        <div className="pv-trk-seg">
          <b />
          <span />
        </div>
        <div className="pv-trk-search">
          <i />
          <span />
        </div>
        <i className="pv-trk-btn" />
      </div>
    </div>
  );
}

// Abstract quota app on one 12s CSS loop: Home, then the Pilih tab, a typed
// amount, package results, a package popup, and back to Home. Taps are one
// shared ripple keyframe shifted by animationDelay.
const quotaApps = ["#ffb703", "#3a86ff", "#8338ec", "#06d6a0", "#ff6b6b", "#118ab2", "#f4a261", "#2ec4b6"];

function QuotaHeader() {
  return (
    <div className="pv-q-head">
      <i className="pv-q-avatar" />
      <div className="pv-q-hi">
        <b>Halo, User</b>
        <span />
      </div>
      <svg className="pv-q-out" viewBox="0 0 12 12">
        <path d="M5 2H2.5v8H5M7.5 4L10 6L7.5 8M10 6H5" />
      </svg>
    </div>
  );
}

function QuotaTap({ at }: { at: number }) {
  return <i className="pv-q-tap" style={{ animationDelay: `${at}s` }} />;
}

function PhoneQuota() {
  return (
    <div className="pv-phone fit">
      <div className="pv-notch" />
      <div className="pv-q">
        <div className="pv-q-home">
          <QuotaHeader />
          <div className="pv-q-card">
            <b className="pv-q-title">Paket Terpilih</b>
            {[72, 45].map((w) => (
              <div key={w} className="pv-q-meter">
                <span className="pv-q-meter-label" />
                <span className="pv-q-track">
                  <span className="pv-q-fill" style={{ width: `${w}%` }} />
                </span>
              </div>
            ))}
          </div>
          <b className="pv-q-section">Aplikasi</b>
          <div className="pv-q-apps">
            {quotaApps.map((c) => (
              <span key={c} style={{ background: c }} />
            ))}
          </div>
        </div>

        <div className="pv-q-pilih">
          <QuotaHeader />
          <div className="pv-q-card">
            <span className="pv-q-lbl" />
            <div className="pv-q-input">
              <span>Rp 100.000</span>
            </div>
            <span className="pv-q-btn">
              Cari
              <QuotaTap at={6} />
            </span>
          </div>
          {Array.from({ length: 3 }, (_, i) => (
            <div key={i} className="pv-q-pkg" style={{ animationDelay: `${i * 0.2}s` }}>
              <div className="pv-q-pkg-top">
                <span className="pv-q-pkg-title" />
                <small>30 Hari</small>
              </div>
              <span className="pv-q-price" />
              <span className="pv-q-bullet" />
              <span className="pv-q-bullet" />
              {i === 0 && <QuotaTap at={8} />}
            </div>
          ))}
        </div>

        <div className="pv-q-nav">
          <span className="pv-q-navi one">
            <svg viewBox="0 0 12 12">
              <path d="M2 6L6 2.5L10 6V10H2Z" />
            </svg>
          </span>
          <span className="pv-q-navi two">
            <svg viewBox="0 0 12 12">
              <path d="M3 3.5H9M3 6H9M3 8.5H7" />
            </svg>
            <QuotaTap at={3.4} />
          </span>
          <span className="pv-q-navi">
            <svg viewBox="0 0 12 12">
              <circle cx="6" cy="6" r="4" />
              <path d="M6 3.8V6L7.6 7" />
            </svg>
          </span>
          <span className="pv-q-navi">
            <svg viewBox="0 0 12 12">
              <circle cx="6" cy="4.5" r="2" />
              <path d="M2.5 10.5C3 8.3 9 8.3 9.5 10.5" />
            </svg>
          </span>
        </div>

        <div className="pv-q-modal">
          <div className="pv-q-pop">
            <span className="pv-q-pkg-title" />
            <small>30 Hari</small>
            <span className="pv-q-price" />
            <span className="pv-q-bullet" />
            <span className="pv-q-bullet" />
            <span className="pv-q-bullet" />
            <span className="pv-q-btn sm">
              Tutup
              <QuotaTap at={10.5} />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Abstract music app on one 10s CSS loop: Browse, a tapped track opens the
// Now playing sheet, the track plays, then the sheet closes back to Browse.
function MusicTap({ at }: { at: number }) {
  return <i className="pv-m-tap" style={{ animationDelay: `${at}s` }} />;
}

function PhoneMusic() {
  return (
    <div className="pv-phone fit">
      <div className="pv-notch" />
      <div className="pv-m">
        <div className="pv-m-browse">
          <span className="pv-m-appname" />
          <span className="pv-m-search">
            <i />
          </span>
          <div className="pv-m-albums">
            <span />
            <span />
            <span />
          </div>
          <div className="pv-m-tracks">
            {Array.from({ length: 4 }, (_, i) => (
              <div key={i} className={`pv-m-track${i === 1 ? " picked" : ""}`}>
                <span className="pv-m-thumb" />
                <span className="pv-m-meta">
                  <span className="pv-m-name" />
                  <span className="pv-m-artist" />
                </span>
                <small>0:30</small>
                {i === 1 && <MusicTap at={3} />}
              </div>
            ))}
          </div>
        </div>

        <div className="pv-m-player">
          <span className="pv-m-down">
            <svg viewBox="0 0 12 12">
              <path d="M3 4.5L6 7.5L9 4.5" />
            </svg>
            <MusicTap at={8.5} />
          </span>
          <span className="pv-m-art" />
          <span className="pv-m-name" />
          <span className="pv-m-artist" />
          <div className="pv-m-progress">
            <span className="pv-m-bar">
              <span />
            </span>
            <span className="pv-m-times">
              <small>0:00</small>
              <small>0:30</small>
            </span>
          </div>
          <div className="pv-m-controls">
            <svg viewBox="0 0 12 12">
              <path d="M3 2.5V9.5M9.5 2.5L4.5 6L9.5 9.5Z" />
            </svg>
            <span className="pv-m-play">
              <i />
              <i />
            </span>
            <svg viewBox="0 0 12 12">
              <path d="M9 2.5V9.5M2.5 2.5L7.5 6L2.5 9.5Z" />
            </svg>
          </div>
          <div className="pv-m-eq">
            {Array.from({ length: 5 }, (_, i) => (
              <i key={i} style={{ animationDelay: `${(i % 3) * -0.25}s`, animationDuration: `${0.7 + (i % 2) * 0.3}s` }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
