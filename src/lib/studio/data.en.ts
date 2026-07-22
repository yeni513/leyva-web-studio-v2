import type { StmEl, StudioPackage, WorkItem } from "./data";

/* ==========================================================================
   English content mirror — same shapes as data.ts, English copy.
   Shared assets (media paths, pools) intentionally repeat the same files.
   ========================================================================== */

export const heroTitles = [
  "Leyva Web Studio",
  "Web Design",
  "Mobile Apps",
  "Motion & UI",
  "Custom Code",
];

export const heroOverlay = {
  hugeLeft: "LEYVA",
  smallTag: "( Digital Studio )",
  hugeRight: "STUDIO",
  servicesEs: [
    "Conversion strategy",
    "Brand identity",
    "Creative content",
    "Custom development",
  ],
  servicesEn: ["Web Design", "Local SEO", "Motion & UI", "Next.js Build"],
  quickLinks: [
    { label: "Services", href: "#sectores" },
    { label: "Work", href: "#proyectos" },
    { label: "Pricing", href: "#precios" },
    { label: "Contact", href: "#contacto" },
  ],
  tags: [
    { text: "( Interactive Development )", h1: false },
    { text: "( Motion Design )", h1: false },
    { text: "( Premium Web Design )", h1: true },
    { text: "( Brand Identity )", h1: false },
  ],
  footNote: ["Strategy, design and", "development. Fast, lean and", "sensibly priced."],
  series: "SERIES · LOCAL BUSINESS",
};

export const waveLeft: { text: string; img: string }[] = [
  { text: "Custom Websites", img: "/media/g6.webp" },
  { text: "Local SEO", img: "/media/g3.webp" },
  { text: "Motion UI", img: "/media/hero4.webp?v=3" },
  { text: "Digital Catalogs", img: "/media/g1.webp" },
  { text: "WhatsApp Booking", img: "/media/g4.webp" },
  { text: "E-commerce", img: "/media/g5.webp" },
  { text: "Landing Pages", img: "/media/g2.webp" },
  { text: "Branding", img: "/media/x1.webp" },
  { text: "Next.js Core", img: "/media/hero1.webp?v=3" },
  { text: "Copywriting", img: "/media/t4.webp?v=3" },
  { text: "Mobile Apps", img: "/media/hero3.webp?v=3" },
  { text: "24/7 Support", img: "/media/t2.webp?v=3" },
];

export const waveRight = [
  "Strategy",
  "Design",
  "Code",
  "Motion",
  "Brand",
  "Local",
  "Vision",
  "System",
  "Craft",
  "Core",
  "Future",
  "Digital",
];

export const introPanel = {
  eyebrow: "( Local business specialists )",
  heading: "( Design with purpose, results you can measure )",
  bottomLine: "( Cleveland, Ohio · USA & LATAM )",
};

export const marqueeBlocks = [
  { title: "WEB DESIGN", label: "（ Custom-built sites ）" },
  { title: "UI · UX", label: "（ Interface / Experience ）" },
  { title: "MOTION", label: "（ Motion design ）" },
  { title: "BRANDING", label: "（ Visual identity ）" },
];

export const newTextGroup = {
  subtitle: "( From concept to launch in 14 days )",
  line1: "BUILT TO",
  line2: "MEASURE",
  desc: "Every pixel working for your business. No templates, no shortcuts — clean code, cinematic design and one goal: turning visitors into customers.",
};

export const stmGroups: StmEl[][] = [
  [
    { text: "Brand identity", pos: 4, alt: 2 },
    { text: "Visual strategy", pos: 4, alt: 2 },
    { text: "Leyva Web Studio", pos: 4, alt: 2 },
  ],
  [
    { text: "Motion design", pos: 1, alt: 3 },
    { text: "Micro-interactions", pos: 1, alt: 3 },
    { text: "Type systems", pos: 1, alt: 3 },
    { text: "Creative direction", pos: 1, alt: 3 },
    { text: "Design language", pos: 1, alt: 3 },
  ],
  [{ text: "L", pos: 1, alt: 2, xl: true, scramble: 2.5 }],
  [
    { text: "Building your digital presence", pos: 1, alt: 3, scramble: 0 },
    { text: "█", pos: 1, alt: 3, scramble: 0, typing: true },
  ],
  [
    { text: "Interface design", pos: 2, alt: 5 },
    { text: "Web experience", pos: 2, alt: 5 },
    { text: "Digital storytelling", pos: 2, alt: 5 },
  ],
  [{ text: "E", pos: 3, alt: 9, xl: true, scramble: 2.5 }],
  [
    { text: "Art direction", pos: 3, alt: 2 },
    { text: "Campaign design", pos: 3, alt: 2 },
    { text: "Visual narrative", pos: 3, alt: 2 },
    { text: "Brand experience", pos: 3, alt: 2 },
  ],
  [
    { text: "Visual system loading", pos: 1, alt: 3, scramble: 0 },
    { text: "█", pos: 1, alt: 3, scramble: 0, typing: true },
  ],
  [
    { text: "UX strategy", pos: 2, alt: 4 },
    { text: "Creative coding", pos: 2, alt: 4 },
    { text: "Logo design", pos: 2, alt: 4 },
    { text: "Editorial layout", pos: 2, alt: 4 },
    { text: "Technical SEO", pos: 2, alt: 4 },
    { text: "Digital experience", pos: 2, alt: 4 },
  ],
  [{ text: "Y", pos: 1, alt: 3, xl: true, scramble: 2.5 }],
  [
    { text: "Interaction design", pos: 2, alt: 9 },
    { text: "Brand guidelines", pos: 2, alt: 9 },
    { text: "Typography", pos: 2, alt: 9 },
    { text: "Color systems", pos: 2, alt: 9 },
    { text: "Digital consulting", pos: 2, alt: 9 },
  ],
  [{ text: "V", pos: 3, alt: 10, xl: true, scramble: 2.5, flipEase: "expo.in" }],
  [
    { text: "Social media design", pos: 4, alt: 3 },
    { text: "Video production", pos: 4, alt: 3 },
    { text: "Illustration", pos: 4, alt: 3 },
    { text: "Creative strategy", pos: 4, alt: 3 },
  ],
  [
    { text: "Creative energy flowing", pos: 1, alt: 3, scramble: 0 },
    { text: "█", pos: 1, alt: 3, scramble: 0, typing: true },
  ],
  [
    { text: "Digital catalogs", pos: 3, alt: 5 },
    { text: "Online booking", pos: 3, alt: 5 },
    { text: "Interactive menus", pos: 3, alt: 5 },
    { text: "Web quote builders", pos: 3, alt: 5 },
  ],
  [{ text: "A", pos: 2, alt: 3, xl: true, scramble: 2.5 }],
  [
    { text: "Concept development", pos: 3, alt: 6 },
    { text: "Local positioning", pos: 3, alt: 6 },
    { text: "Brand personality", pos: 3, alt: 6 },
    { text: "Audience insight", pos: 3, alt: 6 },
  ],
  [
    { text: "Design thinking", pos: 2, alt: 7 },
    { text: "Prototyping", pos: 2, alt: 7 },
    { text: "User research", pos: 2, alt: 7 },
    { text: "Content strategy", pos: 2, alt: 7 },
  ],
  [
    { text: "Visual identity", pos: 3, alt: 8 },
    { text: "Responsive design", pos: 3, alt: 8 },
    { text: "Animation direction", pos: 3, alt: 8 },
    { text: "UI components", pos: 3, alt: 8 },
    { text: "Design systems", pos: 3, alt: 8 },
    { text: "Cross-channel brand", pos: 3, alt: 8 },
    { text: "Landing pages", pos: 3, alt: 8 },
    { text: "Scroll experiences", pos: 3, alt: 8 },
    { text: "WebGL interfaces", pos: 3, alt: 8 },
    { text: "Kinetic typography", pos: 3, alt: 8 },
    { text: "Motion design", pos: 3, alt: 8 },
  ],
  [
    { text: "Brand audit", pos: 1, alt: 1 },
    { text: "Competitor analysis", pos: 1, alt: 2 },
    { text: "Mood boards", pos: 1, alt: 4 },
    { text: "Brand core values", pos: 1, alt: 5 },
    { text: "Style guides", pos: 1, alt: 6 },
    { text: "Launch strategy", pos: 1, alt: 4 },
  ],
];

export const mobileShowcase = {
  eyebrow: "（ Local-first specialists ）",
  title: "WHO WE ARE",
  copy: "Every great digital presence starts from one precise point. LEYVA Web Studio specializes in cinematic web design, visual identity and custom development for local businesses — every pixel works to make your business look serious and sell more.",
};

export const ringSection = {
  stats: ["14D_MAX_DELIVERY", "100%_CUSTOM_BUILT", "EST_2025 · CLEVELAND"],
  title: "THE SECTORS",
  subLine1: "DEFINING THE DIGITAL DNA OF",
  subLine2: "LOCAL BUSINESSES",
  centerLabel: "Vision and technology for real businesses",
  tags: [
    "( Restaurants )",
    "( Contractors )",
    "( Real Estate )",
    "( Barbershops · Salons )",
  ],
};

export const works: WorkItem[] = [
  {
    name: "Emberline Chimney Co.",
    industry: "Chimney services · Real client",
    result: "Live production site — Cleveland, OH",
    cover: "/media/work1.webp",
    url: "https://www.emberlinechimney.com/",
  },
  {
    name: "Apex Ride",
    industry: "Boutique fitness · Demo",
    result: "Luxury indoor cycling — live demo",
    cover: "/media/work2.webp",
    url: "https://apex-ride-final.vercel.app/",
  },
  {
    name: "Chino Electrodomésticos",
    industry: "Appliances · Demo",
    result: "Catalog + direct contact — live demo",
    cover: "/media/work3.webp",
    url: "https://chino-electrodomesticos.vercel.app/",
  },
  {
    name: "Premier Landscaping",
    industry: "Landscaping · Demo",
    result: "Service quote builder — live demo",
    cover: "/media/work4.webp",
    url: "https://landscaping-premium-demo.vercel.app/",
  },
  {
    name: "Tapatias Taqueria",
    industry: "Restaurant · Demo",
    result: "Menu + online ordering — live demo",
    cover: "/media/work5.webp",
    url: "https://tapatias-premium-demo.vercel.app/",
  },
  {
    name: "Your Business Here",
    industry: "Next project",
    result: "Let's talk today — built in 14 days",
    cover: "/media/g6.webp",
  },
];

export const galleryHeader = {
  label: "( Redefining local digital presence )",
  lines: ["ARCHIVE OF", "SELECTED PROJECTS", "BY LEYVA"],
  sub: "Real work and studio concepts · ready for your industry",
};

export const packagesHeader = {
  label: "( Clear pricing, no surprises )",
  title: ["PACKAGES", "& PRICING"],
  sub: "One setup payment + a monthly plan covering hosting, support and improvements.",
};

export const studioPackages: StudioPackage[] = [
  {
    name: "Starter Local",
    tag: "Light launch",
    setupPrice: "$900",
    monthlyPrice: "$99",
    desc: "For local businesses that need a professional online presence and a direct contact channel.",
    features: [
      "Custom 1–3 section site",
      "Direct WhatsApp button",
      "Basic local SEO",
      "Hosting + domain included",
      "Monthly edits included",
    ],
    highlight: false,
  },
  {
    name: "Growth Pro",
    tag: "Recommended",
    setupPrice: "$1,800",
    monthlyPrice: "$149",
    desc: "For growing businesses that need to show their work, build trust and convert more visitors into customers.",
    features: [
      "Full multi-section site",
      "Work catalog / gallery",
      "Quote request forms",
      "Advanced local SEO",
      "Analytics + reports",
      "Priority support",
    ],
    highlight: true,
  },
  {
    name: "Authority Premium",
    tag: "Heavyweight brand",
    setupPrice: "$3,500",
    monthlyPrice: "$299",
    desc: "For established businesses that want a powerful digital presence and a serious conversion system that owns their market.",
    features: [
      "Full cinematic experience",
      "Animations & micro-interactions",
      "Booking / quote system",
      "Persuasive copywriting",
      "Dominant local SEO",
      "Same-day support",
    ],
    highlight: false,
  },
];

export const contactBlock = {
  label: "( Let's talk about your project )",
  title: ["LET'S BUILD", "SOMETHING BIG"],
  copy: "Tell me about your business and I'll reply the same day with concrete ideas, timelines and a fixed price. No commitment, no fine print.",
  formNote: "Reply within 24h · Your data is never shared",
};

export const footerBlock = {
  infoBar: [
    "Web design studio",
    "Local businesses · USA & LATAM",
    "Est. 2025 · Cleveland, OH",
  ],
  description:
    "LEYVA Web Studio — cinematic web design, visual identity and custom Next.js development. Websites that make your business look professional, build trust and turn visitors into customers.",
  legalName: "LEYVA WEB STUDIO",
  copyright: "© 2026 LEYVA WEB STUDIO. ALL RIGHTS RESERVED.",
};

export const menuRows = [
  { label: "HOME", index: "( home )", href: "#inicio" },
  { label: "SECTORS", index: "( what we do )", href: "#sectores" },
  { label: "WORK", index: "( projects )", href: "#proyectos" },
  { label: "PRICING", index: "( packages )", href: "#precios" },
  { label: "CONTACT", index: "( say hi )", href: "#contacto" },
];

export const ui = {
  darkNav: [
    { label: "Sectors", href: "#sectores" },
    { label: "Work", href: "#proyectos" },
    { label: "Pricing", href: "#precios" },
    { label: "Contact", href: "#contacto" },
  ],
  scrollDown: "Scroll",
  s2Subtitle: "( What we do, no fluff )",
  s2Desc:
    "Design, motion and code in service of one thing: making your business sell more.",
  form: {
    name: "Name",
    namePh: "What's your name?",
    contact: "WhatsApp or email",
    contactPh: "So we can reply",
    business: "Business",
    businessPh: "Your business name (optional)",
    industry: "Industry",
    industryPh: "Pick one (optional)",
    industries: [
      "Restaurant",
      "Contractor",
      "Real Estate",
      "Barbershop / Salon",
      "Cleaning",
      "Other",
    ],
    project: "Your project",
    projectPh: "Tell me what you need…",
    submit: "Get my quote →",
    sending: "Sending…",
    ok: "Received! I'll reply today — check your WhatsApp or email.",
    fail: "Couldn't send. Message me directly on WhatsApp and I'll help right away.",
    prefilledFrom: "Pre-filled from:",
  },
  footerLinks: {
    whatsapp: "WhatsApp",
    email: "Email",
    privacy: "Privacy",
    terms: "Terms",
  },
  visitCursor: "VISIT",
  startCursor: "START",
  quoteCta: "Get a quote",
  prevCursor: "PREV",
  nextCursor: "NEXT",
  prevAria: "Previous scene",
  nextAria: "Next scene",
  menuOpenCursor: "MENU",
  menuCloseCursor: "CLOSE",
  menuOpenAria: "Open menu",
  menuCloseAria: "Close menu",
  pkSetupSuffix: "setup +",
  pkMonthSuffix: "/mo",
  pkCtaPrefix: "Start with",
  pkPrefill: (name: string, setup: string, monthly: string) =>
    `Hi, I'm interested in the ${name} package (${setup} + ${monthly}/mo).`,
  galleryPrefill: "Hi, I saw the portfolio and want my own premium site.",
  wkVisit: "Visit site ↗",
  wkCta: "Start my project →",
  location: "Cleveland, Ohio · serving all of the USA & LATAM",
  waMessages: {
    quote: "Hi, I'd like a quote for a website for my business.",
    generic: "Hi, I'm coming from the LEYVA Web Studio site and want a quote.",
    interested: "Hi, I saw leyvawebstudio.com and I'm interested.",
    info: "Hi, I'd like information about a website.",
  },
};
