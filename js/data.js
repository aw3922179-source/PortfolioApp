/* ============================================================
   data.js  —  SINGLE SOURCE OF TRUTH
   ------------------------------------------------------------
   Every piece of content on the site comes from this file.
   Change anything here and every page updates automatically.

   YOUR PHOTO: replace  assets/profile.jpg  with your own picture.
   That is all — it appears everywhere on the site.
   ============================================================ */

/* ---------- 1. PERSONAL INFO ---------- */
const PROFILE = {
  name: "Abdul Wasay Ali",
  shortName: "Wasay",
  initials: "AWA",
  role: "Full-Stack Web Developer",
  roles: [
    "Full-Stack Web Developer",
    "PHP & MySQL Developer",
    "Frontend Engineer",
    "UI Craftsperson",
    "Problem Solver"
  ],
  tagline:
    "I build complete web applications — from database design to responsive user interfaces. Clean code, real features, and production-ready systems.",

  /* Photo — replace assets/profile.jpg with your own picture */
  photo: "assets/profile.jpg",
  photoFallback: "assets/profile.svg",

  email: "aw3922179@gmail.com",
  phone: "03110269718",
  phoneIntl: "+923110269718",
  whatsapp: "https://wa.me/923110269718",
  location: "Pakistan",
  availability: "Available for freelance projects",

  github: "https://github.com/aw3922179-source",
  githubUser: "aw3922179-source"
};

/* ---------- 2. NAVIGATION ---------- */
const NAV_LINKS = [
  { label: "Home",     href: "index.html",    page: "home" },
  { label: "About",    href: "about.html",    page: "about" },
  { label: "Projects", href: "projects.html", page: "projects" },
  { label: "Skills",   href: "index.html#skills", page: "skills" },
  { label: "Contact",  href: "contact.html",  page: "contact" }
];

/* ---------- 3. ABOUT PAGE CONTENT ---------- */
const ABOUT = {
  headline: "Writing code is not just a job for me — it is how I build systems.",

  paragraphs: [
    "My name is Abdul Wasay Ali and I am a <strong>full-stack web developer</strong>. My strength is taking an idea and turning it into a <em>working, real web application</em>: designing the database schema, writing the backend logic, and building an interface on top of it that is genuinely easy to use.",

    "I started my journey with frontend fundamentals — HTML, CSS and JavaScript. I began with small experiments, such as a pure-JavaScript calculator, and gradually worked my way up to larger systems. Today I can build complete multi-role applications in <strong>PHP and MySQL</strong> — including authentication, role-based dashboards, file uploads, audit logging, invoice generation and live tracking.",

    "The projects I enjoy most are the ones that solve a real-world problem. The Courier Management System is the best example of this — a complete logistics platform where admin, agent, staff and customer each have their own dashboard and their own responsibilities. Building systems like this forces me to think not only about the interface but also about <strong>data flow, security and business logic</strong> — and that is the part I enjoy the most.",

    "I am learning continuously. Every new project is built on the successes and the mistakes of the previous one. My goal is simple: <strong>to write code that is clear to read, reliable to run, and easy to extend.</strong>"
  ],

  /* Learning journey — built from your actual GitHub projects */
  timeline: [
    {
      year: "Step 01",
      title: "Web Fundamentals",
      text: "Started with HTML5 and CSS3 — semantic markup, the box model, flexbox, grid and a solid foundation in responsive design."
    },
    {
      year: "Step 02",
      title: "JavaScript Logic",
      text: "Learned the core concepts of JavaScript — variables, type coercion, conditional logic and the DOM. First project: a pure-JS Calculator."
    },
    {
      year: "Step 03",
      title: "First Real Frontend Project",
      text: "Built Wings of Wisdom — an 11-page educational platform with a custom CSS design system and over 185KB of vanilla JavaScript."
    },
    {
      year: "Step 04",
      title: "Full-Stack Engineering",
      text: "Built the Courier Management System on PHP 8 and MySQL — four role-based dashboards, a tracking engine, invoicing and audit logging."
    },
    {
      year: "Step 05",
      title: "What Comes Next",
      text: "Currently focused on modern JavaScript frameworks, REST APIs and clean architecture — so I can build larger, more scalable products."
    }
  ],

  /* Quick facts shown in the stats strip */
  stats: [
    { value: 3,  suffix: "+", label: "Published Projects" },
    { value: 5,  suffix: "",  label: "DB Tables Designed" },
    { value: 4,  suffix: "",  label: "User Roles Engineered" },
    { value: 15, suffix: "+", label: "Pages Built" }
  ],

  /* What I care about */
  principles: [
    { icon: "◆", title: "Clean & Readable", text: "Code is written for other people to read — the machine only has to run it." },
    { icon: "◆", title: "Security First",   text: "Sessions, role checks and input validation are the foundation of every system." },
    { icon: "◆", title: "Mobile Ready",     text: "Every interface should work properly on the smallest screen as well as the largest." },
    { icon: "◆", title: "Real Features",    text: "Not demos — the features that a real user will actually rely on every day." }
  ]
};

/* ---------- 4. SKILLS ---------- */
const SKILL_GROUPS = [
  {
    title: "Frontend",
    icon: "🎨",
    skills: [
      { name: "HTML5",            level: 92 },
      { name: "CSS3",             level: 88 },
      { name: "JavaScript (ES6+)",level: 82 },
      { name: "Bootstrap 5",      level: 85 },
      { name: "Responsive Design",level: 90 }
    ]
  },
  {
    title: "Backend",
    icon: "⚙️",
    skills: [
      { name: "PHP 8",            level: 86 },
      { name: "MySQL ",  level: 84 },
      { name: "Session & Auth",   level: 80 },
      { name: "File Uploads",     level: 78 },
      { name: "Database Design",  level: 82 }
    ]
  },
  {
    title: "Tools & Concepts",
    icon: "🧰",
    skills: [
      { name: "Git & GitHub",     level: 85 },
      { name: "VS Code",          level: 95 },
      { name: "phpMyAdmin",       level: 85 },
      { name: "XAMPP ",  level: 88 },
      { name: "REST API Basics",  level: 72 }
    ]
  }
];

/* ---------- 5. SERVICES ---------- */
const SERVICES = [
  {
    icon: "🖥️",
    title: "Full-Stack Web Apps",
    text: "From idea to live application — database schema, backend logic and a complete frontend. Delivered end to end."
  },
  {
    icon: "🧩",
    title: "Role-Based Dashboards",
    text: "Secure dashboards with separate permissions for admin, staff and customers, complete with an audit trail."
  },
  {
    icon: "📱",
    title: "Responsive Frontends",
    text: "Mobile-first HTML, CSS and JavaScript interfaces that run correctly and fast on every device."
  },
  {
    icon: "🗄️",
    title: "Database & Backend",
    text: "Normalized MySQL schemas, optimized queries, CRUD systems, file uploads and reporting modules."
  }
];

/* ---------- 6. PROJECTS ----------
   Details read directly from the GitHub repositories.
   -------------------------------------------------- */
const PROJECTS = [
  {
    id: "courier",
    title: "Courier Management System",
    subtitle: "Full-Stack Logistics Platform",
    repo: "Courier-Managment-System",
    url: "https://github.com/aw3922179-source/Courier-Managment-System",
    featured: true,
    category: "fullstack",
    accent: "#6366f1",
    icon: "📦",
    tech: ["PHP 8.2", "MySQL / MariaDB", "Bootstrap 5", "JavaScript", "phpMyAdmin"],
    short:
      "A complete courier and parcel logistics platform — with four role-based dashboards, live tracking, dynamic pricing, invoicing and audit logging.",
    long:
      "The Courier Management System is a production-grade web application that runs the entire daily operation of a courier company. It has four distinct user roles — Admin, Agent, Staff and Customer — and each role has its own dedicated dashboard, its own permissions and its own workflow. A customer books a parcel, staff verify it, an agent updates the delivery status, and the admin monitors the whole system. Every important action is written to an audit log.",
    highlights: [
      "Four-tier role-based access control (Admin / Agent / Staff / Customer) — a separate dashboard for each role",
      "Parcel booking with sender and receiver CNIC verification plus an approval workflow",
      "Live tracking engine — a six-stage status timeline (Pending → Picked Up → In Transit → Out for Delivery → Delivered / Cancelled)",
      "Dynamic pricing engine based on weight, service type (Standard / Express / Overnight), parcel type and declared value",
      "Automated invoice generation and printable courier labels (PDF-ready)",
      "Admin audit log — which user changed what, and when, is fully recorded",
      "In-app notification system and a complete user management module",
      "Built-in CMS for managing blog posts, services and contact enquiries",
      "Five normalized database tables: couriers, users_tbl, roles, tracking_history, contacts",
      "Proof-of-delivery file uploads (image evidence) to confirm a delivery"
    ],
    stats: [
      { label: "PHP Modules",  value: "40+" },
      { label: "User Roles",   value: "4" },
      { label: "DB Tables",    value: "5" },
      { label: "Track Stages", value: "6" }
    ]
  },
  {
    id: "wings",
    title: "Wings of Wisdom",
    subtitle: "Nobel Prize Educational Platform",
    repo: "Wings-Of-Wisdom",
    url: "https://github.com/aw3922179-source/Wings-Of-Wisdom",
    featured: true,
    category: "frontend",
    accent: "#06b6d4",
    icon: "🕊️",
    tech: ["HTML5", "CSS3", "Vanilla JavaScript", "Responsive Design"],
    short:
      "A modern, multi-page educational platform that presents the history, categories and laureates of the Nobel Prize in an interactive way.",
    long:
      "Wings of Wisdom is a large-scale frontend project — a complete educational platform about the Nobel Prize. It spans eleven separate pages and has its own custom CSS design system. The most interesting part is the interactive quiz, which tests the visitor's Nobel knowledge and shows their score with a result screen. This project was my biggest experiment in frontend architecture, content organisation and visual design.",
    highlights: [
      "Eleven fully responsive pages — Home, History, Winners, Gallery, Events, Nomination, FAQs, About, Contact and more",
      "Interactive knowledge quiz with live scoring and a result screen",
      "A detailed breakdown of the Nobel Prize categories — Physics, Chemistry, Medicine, Literature, Peace, Economics",
      "Recent laureates section with their achievements and contributions",
      "Custom CSS design system (~26KB) — reusable components, animations and gradients",
      "Large modular vanilla JavaScript codebase (~185KB) — no frameworks, no dependencies",
      "Rich gallery section with event and ceremony visuals",
      "Dedicated informative pages for nominations, events and FAQs"
    ],
    stats: [
      { label: "Pages",      value: "11" },
      { label: "Custom JS",  value: "185KB" },
      { label: "CSS System", value: "26KB" },
      { label: "Frameworks", value: "0" }
    ]
  },
  {
    id: "calculator",
    title: "JavaScript Calculator",
    subtitle: "Pure Logic, Zero Libraries",
    repo: "calculator",
    url: "https://github.com/aw3922179-source/calculator",
    featured: false,
    category: "javascript",
    accent: "#f59e0b",
    icon: "🧮",
    tech: ["HTML5", "JavaScript", "Logic & Type Coercion"],
    short:
      "My first JavaScript project — a lightweight calculator that takes two operands and an operator from the user and calculates the result.",
    long:
      "This is the project where my JavaScript journey began. The goal was simple: to understand the core concepts of the language by using them directly — variables, user input, conditional branching and, most importantly, type coercion. This small project still matters to me because it taught me how to break logic down into clear, ordered steps.",
    highlights: [
      "Pure vanilla JavaScript — no library or framework",
      "All four arithmetic operations: addition, subtraction, multiplication and division",
      "Explicit type coercion — user input is safely converted with Number()",
      "Proper error handling for an invalid operator",
      "Clean separation — markup (calculator.html) and logic (calculator.js) in separate files"
    ],
    stats: [
      { label: "Files",      value: "2" },
      { label: "Operations", value: "4" },
      { label: "Libraries",  value: "0" },
      { label: "Level",      value: "Core" }
    ]
  }
];

/* ---------- 7. CONTACT FORM SUBJECTS ---------- */
const CONTACT_SUBJECTS = [
  "New project",
  "Freelance work",
  "Job opportunity",
  "Collaboration",
  "Just saying hello"
];
