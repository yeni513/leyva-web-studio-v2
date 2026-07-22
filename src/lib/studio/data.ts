/* ==========================================================================
   LEYVA WEB STUDIO — content model for the Nudot-class experience
   ========================================================================== */

export const MOBILE_BP = 768;

export interface HeroSlide {
  id: string;
  title: string;
  video: string;
  poster: string;
}

export const heroSlides: HeroSlide[] = [
  {
    id: "codigo",
    title: "Leyva Web Studio",
    video: "/media/hero1.mp4?v=3",
    poster: "/media/hero1.webp?v=3",
  },
  {
    id: "diseno",
    title: "Diseño Web",
    video: "/media/hero2.mp4?v=3",
    poster: "/media/hero2.webp?v=3",
  },
  {
    id: "apps",
    title: "Apps Móviles",
    video: "/media/hero3.mp4?v=3",
    poster: "/media/hero3.webp?v=3",
  },
  {
    id: "motion",
    title: "Motion & UI",
    video: "/media/hero4.mp4?v=3",
    poster: "/media/hero4.webp?v=3",
  },
  {
    id: "dev",
    title: "Código a Medida",
    video: "/media/hero5.mp4?v=3",
    poster: "/media/hero5.webp?v=3",
  },
];

export const heroOverlay = {
  hugeLeft: "LEYVA",
  smallTag: "( Estudio Digital )",
  hugeRight: "STUDIO",
  servicesEs: [
    "Estrategia de conversión",
    "Identidad de marca",
    "Contenido creativo",
    "Desarrollo a la medida",
  ],
  servicesEn: ["Web Design", "Local SEO", "Motion & UI", "Next.js Build"],
  quickLinks: [
    { label: "Servicios", href: "#sectores" },
    { label: "Proyectos", href: "#proyectos" },
    { label: "Precios", href: "#precios" },
    { label: "Contacto", href: "#contacto" },
  ],
  tags: [
    { text: "( Desarrollo interactivo )", h1: false },
    { text: "( Diseño en movimiento )", h1: false },
    { text: "( Diseño web premium )", h1: true },
    { text: "( Identidad de marca )", h1: false },
  ],
  footNote: [
    "Estrategia, diseño y desarrollo.",
    "Rápido, ligero y a un",
    "precio sensato.",
  ],
  series: "SERIE · NEGOCIOS LOCALES",
};

/* Dark sequence — intro wave columns (thumbnail per focused word) */
export const waveLeft: { text: string; img: string }[] = [
  { text: "Sitio a Medida", img: "/media/g6.webp" },
  { text: "SEO Local", img: "/media/g3.webp" },
  { text: "Motion UI", img: "/media/hero4.webp?v=3" },
  { text: "Catálogo Digital", img: "/media/g1.webp" },
  { text: "Reservas WhatsApp", img: "/media/g4.webp" },
  { text: "E-commerce", img: "/media/g5.webp" },
  { text: "Landing Pages", img: "/media/g2.webp" },
  { text: "Branding", img: "/media/x1.webp" },
  { text: "Next.js Core", img: "/media/hero1.webp?v=3" },
  { text: "Copywriting", img: "/media/t4.webp?v=3" },
  { text: "Apps Móviles", img: "/media/hero3.webp?v=3" },
  { text: "Soporte 24/7", img: "/media/t2.webp?v=3" },
];

export const waveRight = [
  "Estrategia",
  "Diseño",
  "Código",
  "Motion",
  "Marca",
  "Local",
  "Visión",
  "Sistema",
  "Craft",
  "Core",
  "Futuro",
  "Digital",
];

export const introPanel = {
  eyebrow: "( Especialistas en negocios locales )",
  heading: "( Diseño con propósito, resultados que se miden )",
  bottomLine: "( Cleveland, Ohio · EE. UU. y LATAM )",
};

export const marqueeBlocks = [
  { title: "DISEÑO WEB", label: "（ Sitios a la medida ）" },
  { title: "UI · UX", label: "（ Interfaz / Experiencia ）" },
  { title: "MOTION", label: "（ Diseño en movimiento ）" },
  { title: "BRANDING", label: "（ Identidad visual ）" },
];

export const newTextGroup = {
  subtitle: "( Del concepto al lanzamiento en 14 días )",
  line1: "HECHO A",
  line2: "LA MEDIDA",
  desc: "Cada píxel al servicio de tu negocio. Sin plantillas y sin atajos — código limpio, diseño cinematográfico y una sola meta: convertir visitas en clientes.",
};

/* Cube faces — real footage stills; front face plays the ember film */
export const cubeFaceImages = [
  "/media/hero1.webp?v=3",
  "/media/g6.webp",
  "/media/hero3.webp?v=3",
  "/media/x1.webp",
  "/media/hero5.webp?v=3",
  "/media/hero4.webp?v=3",
];

export const cubeFrontVideo = "/media/hero1.mp4?v=3";

/* STM — letters matrix. Position classes mirror the Nudot choreography. */
export interface StmEl {
  text: string;
  pos: number;
  alt: number;
  xl?: boolean;
  scramble?: number;
  typing?: boolean;
  flipEase?: string;
}

export const stmGroups: StmEl[][] = [
  [
    { text: "Identidad de marca", pos: 4, alt: 2 },
    { text: "Estrategia visual", pos: 4, alt: 2 },
    { text: "Leyva Web Studio", pos: 4, alt: 2 },
  ],
  [
    { text: "Motion design", pos: 1, alt: 3 },
    { text: "Micro-interacciones", pos: 1, alt: 3 },
    { text: "Sistema tipográfico", pos: 1, alt: 3 },
    { text: "Dirección creativa", pos: 1, alt: 3 },
    { text: "Lenguaje de diseño", pos: 1, alt: 3 },
  ],
  [{ text: "L", pos: 1, alt: 2, xl: true, scramble: 2.5 }],
  [
    { text: "Construyendo tu presencia digital", pos: 1, alt: 3, scramble: 0 },
    { text: "█", pos: 1, alt: 3, scramble: 0, typing: true },
  ],
  [
    { text: "Diseño de interfaz", pos: 2, alt: 5 },
    { text: "Experiencia web", pos: 2, alt: 5 },
    { text: "Narrativa digital", pos: 2, alt: 5 },
  ],
  [{ text: "E", pos: 3, alt: 9, xl: true, scramble: 2.5 }],
  [
    { text: "Dirección de arte", pos: 3, alt: 2 },
    { text: "Diseño de campañas", pos: 3, alt: 2 },
    { text: "Narrativa visual", pos: 3, alt: 2 },
    { text: "Experiencia de marca", pos: 3, alt: 2 },
  ],
  [
    { text: "Sistema visual cargando", pos: 1, alt: 3, scramble: 0 },
    { text: "█", pos: 1, alt: 3, scramble: 0, typing: true },
  ],
  [
    { text: "Estrategia UX", pos: 2, alt: 4 },
    { text: "Creative coding", pos: 2, alt: 4 },
    { text: "Diseño de logotipos", pos: 2, alt: 4 },
    { text: "Layout editorial", pos: 2, alt: 4 },
    { text: "SEO técnico", pos: 2, alt: 4 },
    { text: "Experiencia digital", pos: 2, alt: 4 },
  ],
  [{ text: "Y", pos: 1, alt: 3, xl: true, scramble: 2.5 }],
  [
    { text: "Diseño de interacción", pos: 2, alt: 9 },
    { text: "Guías de marca", pos: 2, alt: 9 },
    { text: "Tipografía", pos: 2, alt: 9 },
    { text: "Sistemas de color", pos: 2, alt: 9 },
    { text: "Consultoría digital", pos: 2, alt: 9 },
  ],
  [{ text: "V", pos: 3, alt: 10, xl: true, scramble: 2.5, flipEase: "expo.in" }],
  [
    { text: "Diseño para redes", pos: 4, alt: 3 },
    { text: "Producción de video", pos: 4, alt: 3 },
    { text: "Ilustración", pos: 4, alt: 3 },
    { text: "Estrategia creativa", pos: 4, alt: 3 },
  ],
  [
    { text: "Energía creativa en curso", pos: 1, alt: 3, scramble: 0 },
    { text: "█", pos: 1, alt: 3, scramble: 0, typing: true },
  ],
  [
    { text: "Catálogos digitales", pos: 3, alt: 5 },
    { text: "Reservas online", pos: 3, alt: 5 },
    { text: "Menús interactivos", pos: 3, alt: 5 },
    { text: "Cotizadores web", pos: 3, alt: 5 },
  ],
  [{ text: "A", pos: 2, alt: 3, xl: true, scramble: 2.5 }],
  [
    { text: "Desarrollo de conceptos", pos: 3, alt: 6 },
    { text: "Posicionamiento local", pos: 3, alt: 6 },
    { text: "Personalidad de marca", pos: 3, alt: 6 },
    { text: "Insight de audiencia", pos: 3, alt: 6 },
  ],
  [
    { text: "Design thinking", pos: 2, alt: 7 },
    { text: "Prototipado", pos: 2, alt: 7 },
    { text: "Research de usuarios", pos: 2, alt: 7 },
    { text: "Estrategia de contenido", pos: 2, alt: 7 },
  ],
  [
    { text: "Identidad visual", pos: 3, alt: 8 },
    { text: "Diseño responsive", pos: 3, alt: 8 },
    { text: "Dirección de animación", pos: 3, alt: 8 },
    { text: "Componentes UI", pos: 3, alt: 8 },
    { text: "Design system", pos: 3, alt: 8 },
    { text: "Marca multicanal", pos: 3, alt: 8 },
    { text: "Landing pages", pos: 3, alt: 8 },
    { text: "Experiencia de scroll", pos: 3, alt: 8 },
    { text: "Interfaz WebGL", pos: 3, alt: 8 },
    { text: "Tipografía cinética", pos: 3, alt: 8 },
    { text: "Diseño en movimiento", pos: 3, alt: 8 },
  ],
  [
    { text: "Auditoría de marca", pos: 1, alt: 1 },
    { text: "Análisis de competencia", pos: 1, alt: 2 },
    { text: "Mood board", pos: 1, alt: 4 },
    { text: "Valores de marca", pos: 1, alt: 5 },
    { text: "Guía de estilo", pos: 1, alt: 6 },
    { text: "Estrategia de lanzamiento", pos: 1, alt: 4 },
  ],
];

/* Mobile cube showcase */
export const mobileShowcase = {
  eyebrow: "（ Especialistas en lo local ）",
  title: "QUIÉNES SOMOS",
  copy: "Toda gran presencia digital nace de un punto preciso. LEYVA Web Studio se especializa en diseño web cinematográfico, identidad visual y desarrollo a la medida para negocios locales — cada píxel trabaja para que tu negocio se vea serio y venda más.",
};

/* Ring sectors */
export const ringSection = {
  stats: ["14D_ENTREGA_MAXIMA", "100%_HECHO_A_MEDIDA", "EST_2025 · CLEVELAND"],
  title: "LOS SECTORES",
  subLine1: "DEFINIENDO EL ADN DIGITAL DE",
  subLine2: "LOS NEGOCIOS LOCALES",
  centerLabel: "Visión y tecnología para negocios reales",
  tags: [
    "( Restaurantes )",
    "( Contratistas )",
    "( Inmobiliarias )",
    "( Barberías · Salones )",
  ],
};

export const ringIndustries = [
  "Restaurantes",
  "Contratistas",
  "Inmobiliarias",
  "Barberías",
  "Limpieza",
  "Electrodomésticos",
  "Salones",
  "Cafeterías",
  "Talleres",
  "Clínicas",
  "Gimnasios",
  "Abogados",
  "Paisajismo",
  "Food Trucks",
];

/** Image pool for the orbital card cloud — every generated still. */
export const ringImagePool = [
  "/media/hero1.webp?v=3",
  "/media/g1.webp",
  "/media/hero3.webp?v=3",
  "/media/t1.webp?v=3",
  "/media/g3.webp",
  "/media/hero5.webp?v=3",
  "/media/t2.webp?v=3",
  "/media/g4.webp",
  "/media/hero4.webp?v=3",
  "/media/t3.webp?v=3",
  "/media/g5.webp",
  "/media/hero2.webp?v=3",
  "/media/t4.webp?v=3",
  "/media/g2.webp",
  "/media/x1.webp",
  "/media/g6.webp",
];

/* Works gallery */
export interface WorkItem {
  name: string;
  industry: string;
  result: string;
  cover: string;
  /** live site URL — items without one become a "your project" CTA */
  url?: string;
}

export const galleryHeader = {
  label: "( Redefiniendo la presencia digital local )",
  lines: ["ARCHIVO DE", "PROYECTOS SELECCIONADOS", "POR LEYVA"],
  sub: "Conceptos de estudio · listos para tu industria",
};

export const works: WorkItem[] = [
  {
    name: "Emberline Chimney Co.",
    industry: "Chimeneas · Cliente real",
    result: "Sitio en producción — Cleveland, OH",
    cover: "/media/work1.webp",
    url: "https://www.emberlinechimney.com/",
  },
  {
    name: "Apex Ride",
    industry: "Fitness boutique · Demo",
    result: "Luxury indoor cycling — demo en vivo",
    cover: "/media/work2.webp",
    url: "https://apex-ride-final.vercel.app/",
  },
  {
    name: "Chino Electrodomésticos",
    industry: "Electrodomésticos · Demo",
    result: "Catálogo + contacto directo — demo en vivo",
    cover: "/media/work3.webp",
    url: "https://chino-electrodomesticos.vercel.app/",
  },
  {
    name: "Premier Landscaping",
    industry: "Paisajismo · Demo",
    result: "Cotizador de servicios — demo en vivo",
    cover: "/media/work4.webp",
    url: "https://landscaping-premium-demo.vercel.app/",
  },
  {
    name: "Tapatias Taqueria",
    industry: "Restaurante · Demo",
    result: "Menú + ordena online — demo en vivo",
    cover: "/media/work5.webp",
    url: "https://tapatias-premium-demo.vercel.app/",
  },
  {
    name: "Tu Negocio Aquí",
    industry: "Próximo proyecto",
    result: "Hablemos hoy y lo construimos en 14 días",
    cover: "/media/g6.webp",
  },
];

/* Packages */
export interface StudioPackage {
  name: string;
  tag: string;
  setupPrice: string;
  monthlyPrice: string;
  desc: string;
  features: string[];
  highlight: boolean;
}

export const packagesHeader = {
  label: "( Precios claros, sin sorpresas )",
  title: ["PAQUETES", "Y PRECIOS"],
  sub: "Pago inicial + mensualidad que cubre hosting, soporte y mejoras.",
};

export const studioPackages: StudioPackage[] = [
  {
    name: "Starter Local",
    tag: "Lanzamiento ligero",
    setupPrice: "$900",
    monthlyPrice: "$99",
    desc: "Para negocios locales que necesitan una presencia online profesional y un canal directo de contacto.",
    features: [
      "Sitio de 1–3 secciones a la medida",
      "Botón de WhatsApp directo",
      "SEO local básico",
      "Hosting + dominio incluidos",
      "Cambios mensuales incluidos",
    ],
    highlight: false,
  },
  {
    name: "Growth Pro",
    tag: "Recomendado",
    setupPrice: "$1,800",
    monthlyPrice: "$149",
    desc: "Para negocios que crecen y necesitan mostrar trabajo, generar confianza y convertir más visitantes en clientes.",
    features: [
      "Sitio completo multi-sección",
      "Catálogo / galería de trabajos",
      "Formularios de cotización",
      "SEO local avanzado",
      "Analítica + reportes",
      "Soporte prioritario",
    ],
    highlight: true,
  },
  {
    name: "Authority Premium",
    tag: "Marca con peso",
    setupPrice: "$3,500",
    monthlyPrice: "$299",
    desc: "Para negocios establecidos que quieren una presencia digital fuerte y un sistema de conversión serio que domine su mercado.",
    features: [
      "Experiencia cinematográfica completa",
      "Animaciones y microinteracciones",
      "Sistema de reservas / cotizador",
      "Copywriting persuasivo",
      "SEO local dominante",
      "Soporte mismo día",
    ],
    highlight: false,
  },
];

/* Contact + footer */
export const contactBlock = {
  label: "( Hablemos de tu proyecto )",
  title: ["EMPECEMOS", "ALGO GRANDE"],
  copy: "Cuéntame de tu negocio y te respondo el mismo día con ideas concretas, tiempos y precio cerrado. Sin compromiso y sin letra chica.",
  formNote: "Respuesta en menos de 24h · Tus datos nunca se comparten",
};

export const footerBlock = {
  infoBar: [
    "Estudio de diseño web",
    "Negocios locales · EE. UU. y LATAM",
    "Est. 2025 · Cleveland, OH",
  ],
  description:
    "LEYVA Web Studio — diseño web cinematográfico, identidad visual y desarrollo Next.js a la medida. Sitios que hacen ver profesional a tu negocio, generan confianza y convierten visitantes en clientes.",
  legalName: "LEYVA WEB STUDIO",
  copyright: "© 2026 LEYVA WEB STUDIO. TODOS LOS DERECHOS RESERVADOS.",
};

export const menuRows = [
  { label: "INICIO", index: "( inicio )", href: "#inicio" },
  { label: "SECTORES", index: "( qué hacemos )", href: "#sectores" },
  { label: "PROYECTOS", index: "( casos )", href: "#proyectos" },
  { label: "PRECIOS", index: "( paquetes )", href: "#precios" },
  { label: "CONTACTO", index: "( hablemos )", href: "#contacto" },
];

/** Slide titles shown in the hero console (index-matched to heroSlides). */
export const heroTitles = [
  "Leyva Web Studio",
  "Diseño Web",
  "Apps Móviles",
  "Motion & UI",
  "Código a Medida",
];

/** Misc UI strings scattered across the experience. */
export const ui = {
  darkNav: [
    { label: "Sectores", href: "#sectores" },
    { label: "Proyectos", href: "#proyectos" },
    { label: "Precios", href: "#precios" },
    { label: "Contacto", href: "#contacto" },
  ],
  scrollDown: "Baja",
  s2Subtitle: "( Lo que hacemos, sin adornos )",
  s2Desc:
    "Diseño, movimiento y código al servicio de una sola cosa: que tu negocio venda más.",
  form: {
    name: "Nombre",
    namePh: "¿Cómo te llamas?",
    contact: "WhatsApp o email",
    contactPh: "Para responderte",
    business: "Negocio",
    businessPh: "Nombre de tu negocio (opcional)",
    industry: "Industria",
    industryPh: "Elige una (opcional)",
    industries: [
      "Restaurante",
      "Contratista",
      "Inmobiliaria",
      "Barbería / Salón",
      "Limpieza",
      "Otro",
    ],
    project: "Tu proyecto",
    projectPh: "Cuéntame qué necesitas…",
    submit: "Pedir mi cotización →",
    sending: "Enviando…",
    ok: "Recibido. Te respondo hoy mismo — revisa tu WhatsApp o email.",
    fail: "No se pudo enviar. Escríbeme directo por WhatsApp y te atiendo al momento.",
    prefilledFrom: "Pre-llenado desde:",
  },
  footerLinks: {
    whatsapp: "WhatsApp",
    email: "Email",
    privacy: "Privacidad",
    terms: "Términos",
  },
  visitCursor: "VISITAR",
  startCursor: "EMPEZAR",
  quoteCta: "Cotizar",
  prevCursor: "ANTERIOR",
  nextCursor: "SIGUIENTE",
  prevAria: "Escena anterior",
  nextAria: "Siguiente escena",
  menuOpenCursor: "MENÚ",
  menuCloseCursor: "CERRAR",
  menuOpenAria: "Abrir menú",
  menuCloseAria: "Cerrar menú",
  pkSetupSuffix: "inicial +",
  pkMonthSuffix: "/mes",
  pkCtaPrefix: "Empezar con",
  pkPrefill: (name: string, setup: string, monthly: string) =>
    `Hola, me interesa el paquete ${name} (${setup} + ${monthly}/mes).`,
  galleryPrefill: "Hola, vi el portafolio y quiero mi propio sitio premium.",
  wkVisit: "Visitar sitio ↗",
  wkCta: "Empezar mi proyecto →",
  location: "Cleveland, Ohio · trabajamos en todo EE. UU. y LATAM",
  waMessages: {
    quote: "Hola, quiero cotizar un sitio web para mi negocio.",
    generic: "Hola, vengo del sitio de LEYVA Web Studio y quiero cotizar mi página.",
    interested: "Hola, vi leyvawebstudio.com y me interesa.",
    info: "Hola, quiero información sobre un sitio web.",
  },
};

export const menuThumbs = [
  "/media/hero1.webp?v=3",
  "/media/g6.webp",
  "/media/t1.webp?v=3",
  "/media/g1.webp",
  "/media/g2.webp",
  "/media/g3.webp",
  "/media/x1.webp",
  "/media/t3.webp?v=3",
  "/media/hero4.webp?v=3",
  "/media/t4.webp?v=3",
];
