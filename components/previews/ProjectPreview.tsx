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

// Abstract DX Workspace layout: sidebar, header and a module grid, drawn with
// shapes only (no text or data). A 12s CSS loop: modules load in, the active menu row and the
// highlighted module hop together, the theme and language buttons get tapped (labels reflow),
// and the notification dot pulses. Like the other illustrations it is switched off by
// prefers-reduced-motion, which leaves the first row and two tiles highlighted.
const dxMenu = [
  { w: 34 },
  { w: 28 },
  { w: 38 },
  { w: 30, group: true },
  { w: 24, child: true },
  { w: 30, child: true },
  { w: 36 },
  { w: 26 },
];

function Dashboard() {
  return (
    <div className="pv-dx">
      <svg viewBox="0 0 400 250" preserveAspectRatio="xMidYMid slice">
        <defs>
          <clipPath id="dxClip">
            <rect x="16" y="40" width="368" height="196" rx="12" />
          </clipPath>
        </defs>
        <rect className="dx-frame" x="16" y="40" width="368" height="196" rx="12" />

        {/* sidebar */}
        <g clipPath="url(#dxClip)">
          <rect className="dx-side" x="16" y="40" width="81" height="196" />
        </g>
        <rect className="dx-acc" x="24" y="49" width="11" height="11" rx="3.5" />
        <rect className="dx-bar mid" x="40" y="52.75" width="30" height="3.5" rx="1.75" />
        {dxMenu.map((m, i) => {
          const y = 72 + i * 16;
          const x = m.child ? 8 : 0;
          return (
            <g key={i}>
              <rect className="dx-ico" x={28 + x} y={y + 2.5} width="7" height="7" rx="2" />
              <rect className="dx-bar" x={40 + x} y={y + 4.25} width={m.w} height="3.5" rx="1.75" />
              {m.group && <path className="dx-chev" d={`M80 ${y + 4.5} L82.5 ${y + 7.5} L85 ${y + 4.5}`} />}
              {i < 3 && (
                <g className={`dx-row r${i}`}>
                  <rect className="dx-on" x="22" y={y} width="69" height="12" rx="4" />
                  <rect className="dx-acc" x="16" y={y + 2} width="2.5" height="8" rx="1.25" />
                  <rect className="dx-acc" x="28" y={y + 2.5} width="7" height="7" rx="2" />
                  <rect className="dx-bar hi" x="40" y={y + 4.25} width={m.w} height="3.5" rx="1.75" />
                </g>
              )}
            </g>
          );
        })}
        <path className="dx-line" d="M97 40 V236" />

        {/* header */}
        <rect className="dx-bar" x="109" y="49" width="28" height="4" rx="2" />
        <rect className="dx-bar mid" x="143" y="49" width="38" height="4" rx="2" />
        <rect className="dx-btn" x="310" y="44" width="16" height="14" rx="5" />
        <path className="dx-moon" d="M319.8 47.88 A3.6 3.6 0 1 0 320.76 53.31 A3 3 0 0 1 319.8 47.88Z" />
        <circle className="dx-tap t1" cx="318" cy="51" r="7" />
        <rect className="dx-btn" x="331" y="44" width="26" height="14" rx="7" />
        <rect className="dx-bar lga" x="337" y="49.5" width="7" height="3" rx="1.5" />
        <rect className="dx-bar lgb" x="346" y="49.5" width="5" height="3" rx="1.5" />
        <circle className="dx-tap t2" cx="344" cy="51" r="9" />
        <circle className="dx-ping" cx="366" cy="51" r="3" />
        <circle className="dx-dot" cx="366" cy="51" r="3" />
        <path className="dx-line" d="M97 62 H384" />

        {/* greeting and banner */}
        <rect className="dx-bar hi" x="109" y="71" width="96" height="7" rx="3.5" />
        <rect className="dx-bar" x="109" y="83" width="64" height="4" rx="2" />
        <rect className="dx-banner" x="109" y="95" width="263" height="34" rx="8" />
        <circle className="dx-acc" cx="127" cy="112" r="9" />
        <rect className="dx-bar hi" x="143" y="104" width="78" height="5" rx="2.5" />
        <rect className="dx-bar" x="143" y="114" width="52" height="3.5" rx="1.75" />
        <rect className="dx-acc" x="322" y="104" width="40" height="16" rx="8" />
        <rect className="dx-bar pill" x="332" y="110.25" width="20" height="3.5" rx="1.75" />
        <circle className="dx-tap t3" cx="342" cy="112" r="11" />

        {/* module tiles, 4 x 2. Tiles 2, 5 and 1 take turns being highlighted, in step with menu rows 0-2 */}
        {Array.from({ length: 8 }, (_, i) => {
          const x = 109 + (i % 4) * 67.5;
          const y = 139 + Math.floor(i / 4) * 48;
          const hop = [2, 5, 1].indexOf(i);
          return (
            <g key={i} className="dx-t" style={{ animationDelay: `${(-(12 - i * 0.12)).toFixed(2)}s` }}>
              <rect className="dx-tile" x={x} y={y} width="59.5" height="40" rx="7" />
              <rect className="dx-ico" x={x + 7} y={y + 8} width="10" height="10" rx="3" />
              <rect className="dx-bar mid dx-lbl" x={x + 7} y={y + 25} width="38" height="4" rx="2" />
              <rect className="dx-bar" x={x + 7} y={y + 32} width="24" height="3" rx="1.5" />
              {hop >= 0 && (
                <g className={`dx-hlt h${hop}`}>
                  <rect className="dx-tile hl" x={x} y={y} width="59.5" height="40" rx="7" />
                  <rect className="dx-acc" x={x + 7} y={y + 8} width="10" height="10" rx="3" />
                  <rect className="dx-bar hi dx-lbl" x={x + 7} y={y + 25} width="38" height="4" rx="2" />
                </g>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}

// Abstract dark flight-tracking map: a cropped globe with faint islands,
// map UI chrome, and planes flying curved routes over the islands.
function Radar() {
  const planes = [
    // Parallel lanes 22 units apart, alternating direction: the durations differ, so routes that
    // crossed would eventually put two planes on the same spot. Min gap over the full cycle ≈ 21.9.
    { path: "M110 128 Q235 112 360 128", dur: "9s" },
    { path: "M360 150 Q235 134 110 150", dur: "12s" },
    { path: "M120 172 Q240 156 350 172", dur: "10s" },
    { path: "M350 194 Q240 178 130 194", dur: "14s" },
    { path: "M140 216 Q240 200 340 216", dur: "8s" },
  ];
  return (
    <div className="pv-radar">
      <svg viewBox="0 0 400 250" preserveAspectRatio="xMidYMid slice">
        <defs>
          <radialGradient id="trkGlobe" cx="0.45" cy="0.35" r="0.65">
            <stop offset="0" stopColor="#002561" />
            <stop offset="1" stopColor="#011134" />
          </radialGradient>
          <clipPath id="trkClip">
            <circle cx="230" cy="190" r="170" />
          </clipPath>
        </defs>
        <rect width="400" height="250" fill="#101218" />
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
        <circle cx="19" cy="230" r="3" fill="#52bdcc" />
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
