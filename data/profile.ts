// All portfolio content lives here. Update this file when your CV changes;
// the components only read from it.

export type Experience = {
  role: string;
  company: string;
  period: string;
  location: string;
  type: string;
  program?: string;
  current?: boolean;
  points: string[];
  tags: string[];
};

export type Project = {
  kind: string;
  title: string;
  description: string;
  tags: string[];
  // Illustration shown until you add a real screenshot.
  preview: "tablet" | "dashboard" | "radar" | "phone-quota" | "phone-music";
  // Put a screenshot in /public/projects and set its path here, e.g. "/projects/dx-workspace.png"
  image?: string;
  // Live demo opened in a phone-frame modal when the card is clicked.
  demoUrl?: string;
  internal?: boolean;
};

export type FpsRow = {
  gpu: string;
  kind: string;
  integrated?: boolean;
  values: [number, number, number];
};

export type CaseStudySection = {
  title: string;
  text?: string;
  points?: string[];
};

export type CaseStudy = {
  id: "apm" | "miles";
  kind: string;
  title: string;
  subtitle?: string;
  status: string;
  summary: string;
  tags: string[];
  // short label/value pairs shown under the summary
  facts: { label: string; value: string }[];
  sections: Record<string, CaseStudySection>;
};

export type ImageSlot = {
  title: string;
  show: string;
  // Path of an image or GIF in /public/projects. Keep it free of real data.
  image?: string;
};

export const profile = {
  name: { first: "Nezta Misgi", last: "Febyandanu" },
  headline: "Software Engineer",
  focus: "Mobile, Web & Unity WebGL",
  location: "Jakarta, Indonesia",
  now: "IT Intern · Garuda Indonesia · MagangHub Kemnaker",
  summary:
    "Computer Engineering graduate from Universitas Diponegoro, currently interning in Garuda Indonesia's IT Development unit. I build mobile apps with Flutter and React Native, web applications with Next.js, and browser-based 3D with Unity WebGL, and I test what I ship, from API payloads to payment flows.",
  interests: ["Software Development", "Quality Assurance", "Application Support"],
  contact: {
    email: "neztanez@gmail.com",
    phone: "+62818432630",
    linkedin: "https://www.linkedin.com/in/nezta-misgi-febyandanu/",
    github: ["https://github.com/neztafari"],
  },
};

// Steps of the scroll intro at the top of the homepage.
export const introSteps = [
  { title: "Mobile apps", tech: ["Flutter", "React Native"] },
  { title: "Web apps", tech: ["Next.js", "React"] },
  { title: "3D web apps", tech: ["Unity", "WebGL"] },
];

export const facts = [
  { label: "GPA", value: "3.70", note: "out of 4.00 · UNDIP" },
  { label: "Internships", value: "2", note: "Garuda Indonesia, Telkomsel" },
  { label: "Certifications", value: "11", note: "Cisco, Oracle, TOEFL" },
  { label: "Thesis peak", value: "160 FPS", note: "Unity WebGL in Chrome" },
];

export const career = [
  { title: "Computer Engineering, UNDIP", meta: "main · Aug 2022", kind: "root" },
  { title: "Front-End Developer Intern", meta: "Telkomsel · Jul–Sep 2024", kind: "branch" },
  { title: "Unity Developer (Capstone)", meta: "CV Virtualign Inova Cipta · 2025", kind: "branch" },
  { title: "Graduated · GPA 3.70", meta: "main · Apr 2026", kind: "main" },
  { title: "IT Intern – IT Development", meta: "Garuda Indonesia · MagangHub Kemnaker · Aug 2026", kind: "head" },
] as const;

export const experiences: Experience[] = [
  {
    role: "IT Intern – IT Development",
    company: "PT Garuda Indonesia (Persero) Tbk",
    period: "Aug 2026 — Present",
    location: "Tangerang",
    type: "National Internship Program",
    program: "MagangHub Kemnaker",
    current: true,
    points: [
      "Develop and maintain the Flutter-based e-AFL tablet app used by flight crews to record flight, takeoff, landing, and fuel data.",
      "Implemented a dark mode theme aligned with Garuda Indonesia's design standards while preserving existing light mode behavior.",
      "Traced data submission failures from UI to API payload, including empty date/time field validation and signature export issues.",
      "Built an internal proof-of-concept flight tracker: a Node.js + Express backend that reads aircraft positions from an internal MariaDB database with a one-minute in-memory cache, plus a React + MapLibre map frontend.",
      "Redesigned every module of DX Workspace, an internal Next.js platform, and migrated it to Runway, Garuda Indonesia's design system, with dark mode and English/Indonesian support. Built its User Acceptance Testing (UAT) module end to end and automated Word document generation from official templates.",
      "Performed manual testing of payment flows on Garuda Indonesia's flight ticket booking website.",
    ],
    tags: ["Flutter", "Dart", "Next.js", "React", "PostgreSQL", "Node.js", "Express", "Manual Testing", "UAT"],
  },
  {
    role: "Unity Developer",
    company: "CV Virtualign Inova Cipta",
    period: "Mar 2025 — Dec 2025",
    location: "Bandung",
    type: "Capstone Project",
    points: [
      "Developed a web-based Virtual Tour application using Unity and WebGL.",
      "Built interactive 3D environments optimized for browser deployment.",
      "Integrated the Virtual Tour into the company website.",
    ],
    tags: ["Unity", "C#", "WebGL", "3D"],
  },
  {
    role: "Front-End Developer Intern",
    company: "Telkomsel",
    period: "Jul 2024 — Sep 2024",
    location: "Semarang",
    type: "Internship",
    points: [
      "Developed frontend interfaces for a mobile-based Data Quota Tracker application using React Native.",
      "Built responsive and user-friendly UI components for internet data monitoring.",
      "Collaborated with the development team to integrate frontend features with backend services.",
    ],
    tags: ["React Native", "TypeScript", "Mobile UI", "API Integration"],
  },
];

export const projects: Project[] = [
  {
    kind: "2026 · Garuda Indonesia internship · internal",
    title: "e-AFL",
    preview: "tablet",
    internal: true,
    description:
      "Flutter tablet app that flight crews use to record flight, takeoff, landing, and fuel data. Built a dark mode aligned with Garuda Indonesia's design standards and traced data submission failures from the UI to the API payload.",
    tags: ["Flutter", "Dart", "Tablet UI", "Dark Mode", "API Integration"],
  },
  {
    kind: "2026 · Garuda Indonesia internship · internal",
    title: "DX Workspace",
    preview: "dashboard",
    internal: true,
    description:
      "Internal platform for Garuda Indonesia's IT division to manage business requirements, service requests, approvals, projects, and UAT, now in production. I redesigned every module and migrated the app to Runway, Garuda's design system, with light and dark themes and English/Indonesian switching. I built the UAT module end to end and automated Word document generation, so signatures, document numbers, dates, and attachments fill the official templates.",
    tags: ["Next.js", "Tailwind", "PostgreSQL", "Design System", "Dark Mode", "i18n", "UAT", "Document Automation"],
  },
  {
    kind: "2026 · Garuda Indonesia internship · proof of concept",
    title: "Flight Tracker",
    preview: "radar",
    internal: true,
    description:
      "Internal proof of concept that shows Garuda Indonesia aircraft on a live map. A Node.js + Express backend reads aircraft positions from an internal MariaDB database, caches them in memory and refreshes every minute, then serves them to a React + MapLibre frontend. An OpenSky Network data source is still available as an option.",
    tags: ["Node.js", "Express", "MariaDB", "React", "MapLibre", "OpenSky API"],
  },
  {
    kind: "2024 · Telkomsel internship",
    title: "Data Quota Tracker",
    preview: "phone-quota",
    description:
      "Mobile app for monitoring internet data usage. Built responsive UI components and integrated frontend features with backend services.",
    tags: ["React Native", "TypeScript", "Mobile UI"],
  },
  {
    kind: "2024 · Mobile Device Programming course",
    title: "ComBeats Music Application",
    demoUrl: "https://combeats-neztanez.netlify.app",
    preview: "phone-music",
    description:
      "Music app where users browse tracks and play short previews, built for the Mobile Device Programming practicum.",
    tags: ["React Native", "TypeScript", "Audio Preview"],
  },
];

// Case studies for work at the airline. Public-safe on purpose: no internal system names, URLs,
// IP addresses, login details, colleague names, real registrations, or real figures.
export const caseStudies: CaseStudy[] = [
  {
    id: "apm",
    kind: "2026 · Garuda Indonesia internship · internal",
    title: "Aircraft Performance Monitoring (APM) Report Converter",
    status: "Developed and tested locally, not in production",
    summary:
      "A web application that turns raw engine performance monitoring data files (TXT) into monthly Excel and PDF reports. I developed the flow for Boeing B737-800 aircraft, which uses two file types (SFP and NON SFP), and fixed the points that could produce a wrong report without anyone noticing.",
    tags: ["Vue 3", "Vite", "Vuetify", "Express", "TypeScript", "Sequelize", "MariaDB", "Python", "LibreOffice", "node:test"],
    facts: [
      { label: "Frontend", value: "Vue 3 + Vite + Vuetify" },
      { label: "Backend", value: "Express + TypeScript + Sequelize + MariaDB" },
      { label: "Reports", value: "Python script + LibreOffice (Excel and PDF)" },
      { label: "Testing", value: "node:test" },
    ],
    sections: {
      needs: {
        title: "What users need",
        text: "Drawn from the work, not from an official document.",
        points: [
          "A monthly report generated automatically from the raw files.",
          "Accurate P-Factor values that do not carry over old data.",
          "Data errors that are detected and explained in plain language, instead of a silently wrong result.",
          "A report that looks complete when it is printed to PDF.",
        ],
      },
      flow: { title: "How a report is made" },
      problems: {
        title: "Problems found and fixed",
        points: [
          "The CA page was cut off in the PDF. The print area did not move when rows were added, so the chart section went missing.",
          "Converting only one file type showed old P-Factor values from the database for aircraft that had no data in the file.",
          "Problem data could slip through silently: the same tail number in two files, or a date that could not be read.",
        ],
      },
      fixes: {
        title: "What I added",
        points: [
          "The CA print area follows the number of rows, so the chart section shows in full in the PDF.",
          "P-Factor for the report month is calculated from the uploaded files only. Aircraft without data show \"-\".",
          "Validation: an aircraft that appears in more than one file is rejected with a clear message, and a row with an unreadable date stops the conversion with the row number and its raw value.",
          "Non-fatal warnings in the frontend (toasts) for rows outside the selected month, a file with no data in that month, and an aircraft that is not registered yet. They do not block the download.",
          "Exact duplicate rows are written to the backend log. This does not change the calculation.",
        ],
      },
      testing: {
        title: "Testing",
        points: [
          "44 automated tests with 17 synthetic fixtures: SFP only, SFP + NON SFP together, duplicate tail, fewer than 20 rows, tail without ESN, unregistered tail, empty or corrupt file, two months in one file, broken date, duplicate rows, aircraft code suffix, and the P-Factor calculation.",
          "Mutation testing: I deliberately broke the code 14 times and checked that the tests failed each time. All 14 were caught.",
          "Manual end-to-end testing in a local environment (local frontend and backend) with one month of raw files: a normal conversion with no warnings, the warning cases, the duplicate-tail and broken-date errors, then a check of the PDF and Excel output.",
        ],
      },
      slots: {
        title: "Screens",
        text: "Mockups drawn with sample data. They are not screenshots of the real tool.",
      },
    },
  },
  {
    id: "miles",
    kind: "2026 · Garuda Indonesia internship · QA",
    title: "QA Testing, GarudaMiles Award Redemption",
    subtitle: "E-commerce, Garuda Indonesia",
    status: "Tested in a dev environment before go-live",
    summary:
      "QA testing of a new feature on the Garuda Indonesia website that lets GarudaMiles members redeem miles for flight tickets (award redemption). I tested it in a dev environment before go-live, as a software developer intern assigned to QA.",
    tags: ["Exploratory Testing", "Regression Testing", "Test Cases", "Bug Reports", "Chrome DevTools", "Kibana", "2C2P Sandbox"],
    facts: [
      { label: "Role", value: "QA Intern" },
      { label: "Period", value: "Nov 2026" },
      { label: "Tools", value: "Chrome DevTools (Network, Console), Kibana, 2C2P payment sandbox" },
      { label: "Method", value: "Exploratory testing and repeated regression retests" },
    ],
    sections: {
      flow: {
        title: "Flow under test",
        text: "From searching for an award flight to the booking showing up in My Trip.",
      },
      scope: {
        title: "Test coverage",
        points: [
          "One-way (domestic and international) and return trips.",
          "Multiple passengers (including an infant) and Business cabin.",
          "Garuda-operated flights and airline partner flights.",
          "Miles balance before and after, confirmation email, issuance status, and OTP.",
        ],
      },
      method: {
        title: "How I tested",
        points: [
          "Exploratory testing plus repeated regression retests.",
          "Writing test cases and standard bug reports: title, steps, expected vs actual, severity, and evidence.",
          "Cross-checking what the UI shows against Network and Console in Chrome DevTools and against server logs in Kibana.",
        ],
      },
      templates: {
        title: "Templates I work with",
        text: "Both examples are fictional and generic. They are not from the feature I tested.",
      },
      layers: {
        title: "DevTools vs Kibana",
        text: "The browser and the server each show half of the story, so I cross-check both.",
      },
      learned: {
        title: "What I learned",
        points: [
          "Writing bug reports that someone else can reproduce.",
          "Telling severity apart from priority.",
          "Backing up a finding with evidence instead of assumptions.",
          "Reading server logs in Kibana.",
          "Understanding the payment and issuance flow end to end.",
        ],
      },
      view: {
        title: "How to view",
        points: [
          "The feature was tested in an internal dev environment, so it is not publicly accessible.",
          "What you can see here: this case study, the flow diagram, the coverage matrix, and the template examples.",
        ],
      },
    },
  },
];

// Images for the APM case study. These are mockups drawn with sample data, not screenshots of the
// real tool. To use a real screenshot instead, replace the file in /public/projects (keep it free of
// real data, logos, and internal system names).
export const apmSlots: ImageSlot[] = [
  { title: "Upload dialog", show: "Choosing the report month and adding one SFP and one NON SFP file.", image: "/projects/apm-upload.png" },
  { title: "Warning toasts", show: "After a conversion, non-blocking warnings appear and the downloads stay available.", image: "/projects/apm-toasts.png" },
  { title: "Error message", show: "A file with the same aircraft as another file is rejected with a clear message.", image: "/projects/apm-error.png" },
  { title: "CA page", show: "The CA page of the PDF with the table and the chart section complete.", image: "/projects/apm-ca-page.png" },
  { title: "End to end", show: "From choosing files to converting and getting the downloads, with the warnings.", image: "/projects/apm-flow.gif" },
];

export const thesis = {
  kind: "2025 · Capstone & undergraduate thesis",
  title: "Unity Virtual Tour",
  description:
    "A browser-based 3D property tour built in Unity, exported to WebGL and embedded in a company website. My thesis measured its frame rate in Google Chrome across three exploration scenarios and three GPUs, 30 seconds per run. The main test machine averaged 149–160 FPS, and even integrated graphics stayed around the 30 FPS mark.",
  tags: ["Unity", "WebGL", "C#", "FPS Analysis"],
  scenarios: ["Navigasi Dasar", "Interaksi Objek", "Full Scene Load"] as const,
  maxFps: 170,
  floorFps: 30,
  fps: [
    { gpu: "RX 6600", kind: "AMD · dedicated", values: [153.5, 149.3, 160.1] },
    { gpu: "GTX 1650", kind: "NVIDIA · dedicated", values: [143.5, 141.3, 143.8] },
    { gpu: "UHD 620", kind: "Intel · integrated", integrated: true, values: [32.8, 26.8, 30.4] },
  ] satisfies FpsRow[],
};

export const skills = [
  { group: "Mobile & frontend", items: ["Flutter", "Dart", "React Native", "JavaScript", "TypeScript", "HTML & CSS"] },
  { group: "Web", items: ["Next.js", "React", "Node.js", "Express", "REST API Integration"] },
  { group: "3D & graphics", items: ["Unity", "C#", "WebGL", "Performance Testing"] },
  { group: "Quality & process", items: ["Manual Testing", "UAT", "Debugging", "SDLC", "Agile Scrum"] },
  { group: "Data & tools", items: ["SQL", "MariaDB", "Git", "VS Code", "Android Emulator"] },
];

export const education = [
  {
    school: "Universitas Diponegoro",
    detail: "Bachelor of Computer Engineering · GPA 3.70 / 4.00",
    period: "Aug 2022 — Apr 2026 · Semarang",
  },
  {
    school: "SMA Negeri 24 Jakarta",
    detail: "Senior High School · 88.05 / 100",
    period: "Jul 2018 — Jun 2021 · Jakarta",
  },
];

// Software-engineering certifications first, then networking / security / IoT.
export const certifications = [
  { issuer: "Cisco · 2024", name: "JavaScript Essentials 1" },
  { issuer: "Cisco · 2024", name: "Python Essentials 1" },
  { issuer: "Oracle · 2024", name: "Database Design" },
  { issuer: "Oracle · 2024", name: "Database Foundations" },
  { issuer: "2026", name: "TOEFL Prediction Test" },
  { issuer: "Cisco · 2024", name: "CCNA: Introduction to Networks" },
  { issuer: "Cisco · 2024", name: "CCNA: Switching, Routing, and Wireless Essentials" },
  { issuer: "Cisco · 2024", name: "Cyber Threat Management" },
  { issuer: "Cisco · 2025", name: "Digital Safety and Security Awareness" },
  { issuer: "Cisco · 2023", name: "IT Essentials" },
  { issuer: "Cisco · 2023", name: "Introduction to IoT" },
];

export const organizations = [
  { period: "Oct 2023 — Apr 2025", role: "Interest, Talent & Hobby Division Staff", org: "Computer Engineering Student Association" },
  { period: "Jun — Oct 2024", role: "Vice Head of Event Division", org: "The Ace 2024, Dies Natalis of Computer Engineering" },
  { period: "Sep — Oct 2023", role: "Secretary", org: "Computer Engineering Sports Week 2023" },
  { period: "Sep — Dec 2022", role: "Medical Staff", org: "Olimdipo 2022" },
];
