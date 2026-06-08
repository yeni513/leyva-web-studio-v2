import type { Metadata } from "next";
import Image from "next/image";
import {
  ArrowUpRight,
  Check,
  Clock,
  Code2,
  MapPin,
  MessageCircle,
  Phone,
  Search,
  ShoppingBag,
  Sparkles,
  Star,
  UtensilsCrossed,
  Wrench,
} from "lucide-react";
import { BrandMark } from "@/components/brand";
import { AnchorButton } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { Footer } from "@/components/sections/Footer";
import { site, whatsappLink, mailtoLink } from "@/lib/site";

const PATH = "/web-design-cleveland";
const TITLE =
  "Web Design in Cleveland, Ohio — Small Business Websites | Leyva Web Studio";
const DESCRIPTION =
  "Premium web design in Cleveland, Ohio for restaurants, contractors, landscaping, appliance stores and local services. Custom websites, local SEO, Google Business Profile, AI chatbots and monthly care — built to get you more calls and customers. Bilingual (English / Spanish).";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  keywords: [
    "web design Cleveland",
    "web designer Cleveland Ohio",
    "website design for small business Cleveland",
    "affordable web design Cleveland",
    "local SEO Cleveland",
    "web design for restaurants Cleveland",
    "web design for contractors Cleveland",
    "web design for appliance stores Cleveland",
    "business websites in Cleveland",
    "Spanish web designer Cleveland",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `${site.url}${PATH}`,
    title: "Web Design in Cleveland, Ohio | Leyva Web Studio",
    description: DESCRIPTION,
    siteName: `${site.brand} ${site.brandSub}`,
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: TITLE }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Web Design in Cleveland, Ohio | Leyva Web Studio",
    description: DESCRIPTION,
    images: ["/og-image.png"],
  },
};

const WA = (msg: string) => whatsappLink(msg);

const industries = [
  { icon: UtensilsCrossed, label: "Restaurants & food" },
  { icon: Wrench, label: "Contractors & landscaping" },
  { icon: ShoppingBag, label: "Appliance & retail stores" },
  { icon: Sparkles, label: "Barbers, cleaning & local services" },
];

const services = [
  {
    icon: Code2,
    title: "Custom premium websites",
    desc: "Hand-built in Next.js — fast, modern and made to convert. No templates, no page-builders.",
  },
  {
    icon: UtensilsCrossed,
    title: "Restaurant websites",
    desc: "Menus, photos, reservations and WhatsApp ordering that make people hungry and book a table.",
  },
  {
    icon: Wrench,
    title: "Contractor & service sites",
    desc: "Show your work, your service area and a one-tap quote button straight to your phone.",
  },
  {
    icon: Search,
    title: "Local SEO in Cleveland",
    desc: "Structure, schema and content so customers searching in Cleveland find you first.",
  },
  {
    icon: MapPin,
    title: "Google Business Profile",
    desc: "Optimization so you show up in the Google map pack and earn trust with reviews.",
  },
  {
    icon: Sparkles,
    title: "AI chatbot + lead capture",
    desc: "A 24/7 assistant that answers questions, recommends a package and captures the lead for you.",
  },
];

const work = [
  {
    name: "Tapatías Taquería",
    industry: "Restaurant",
    url: "https://tapatias-premium-demo.vercel.app/",
    img: "/work/tapatias.jpg",
    badge: "Concept demo",
  },
  {
    name: "Landscaping Premium",
    industry: "Landscaping / service business",
    url: "https://landscaping-premium-demo.vercel.app/",
    img: "/work/landscaping.jpg",
    badge: "Service demo",
  },
  {
    name: "Chino Appliances",
    industry: "Appliance store / ecommerce",
    url: "https://chino-electrodomesticos.vercel.app/",
    img: "/work/chino-v2.jpg",
    badge: "Ecommerce demo",
  },
  {
    name: "Leyva Web Studio",
    industry: "Our official live site",
    url: "https://leyvawebstudio.com/",
    img: "/work/leyva.jpg",
    badge: "Live site",
  },
];

const packages = [
  {
    name: "Starter Local",
    setup: "$900",
    monthly: "$99",
    for: "Barbers, cleaning, plumbers, small restaurants & solo services.",
    points: ["Premium one-page site", "Mobile-first & fast", "WhatsApp + call CTAs", "Basic local SEO"],
    highlight: false,
  },
  {
    name: "Growth Pro",
    setup: "$1,800",
    monthly: "$149",
    for: "Contractors, real estate, branded restaurants & appliance stores.",
    points: ["4–6 key sections", "Conversion copy", "Local SEO foundation", "Portfolio + analytics"],
    highlight: true,
  },
  {
    name: "Authority Premium",
    setup: "$3,500",
    monthly: "$299",
    for: "Established businesses that want to dominate local trust.",
    points: ["Custom premium build", "Advanced conversion strategy", "Social proof sections", "Strategic monthly growth"],
    highlight: false,
  },
];

const faqs = [
  {
    q: "How much does a website cost for a small business in Cleveland?",
    a: "Our websites start at $900 setup plus a $99/month care plan, and go up to $3,500 + $299/month for a full premium build. Final pricing depends on scope — we confirm it after a quick call.",
  },
  {
    q: "How long does it take to build a website?",
    a: "Most local business websites are ready in about 14 days, from our first call to going live. Larger custom projects can take 3–6 weeks.",
  },
  {
    q: "Do you work with restaurants, contractors and local businesses?",
    a: "Yes — restaurants, contractors, landscaping, appliance and retail stores, barbers, cleaning companies and local service businesses are exactly who we build for.",
  },
  {
    q: "Can you help my business appear on Google?",
    a: "Yes. We build local SEO into every site (structure, schema, content) and optimize your Google Business Profile. We can't promise specific rankings, but we build the right foundation to be found in Cleveland.",
  },
  {
    q: "Do you offer monthly website maintenance?",
    a: "Yes. Every project includes a monthly care plan — hosting, updates, backups, security checks, content edits and performance monitoring — so your site stays fast and current.",
  },
  {
    q: "Can you build a website with an AI chatbot?",
    a: "Yes. We build premium sites with a 24/7 AI assistant that answers questions, recommends the right package and captures leads for you — bilingual in English and Spanish.",
  },
  {
    q: "Do you serve businesses in Cleveland, Ohio?",
    a: "Yes — we're based in Cleveland, Ohio and serve the whole metro area, plus local businesses across the United States, remotely.",
  },
  {
    q: "Do you work with Spanish-speaking business owners?",
    a: "Absolutely. We're fully bilingual and work with Hispanic and Spanish-speaking business owners in English or Spanish, whichever you prefer.",
  },
];

export default function ClevelandWebDesignPage() {
  const businessId = `${site.url}#business`;

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${site.url}${PATH}#service`,
        name: "Web Design in Cleveland, Ohio",
        serviceType: "Web design & development for local businesses",
        provider: { "@id": businessId },
        areaServed: [
          { "@type": "City", name: "Cleveland, Ohio" },
          { "@type": "AdministrativeArea", name: "Cuyahoga County, Ohio" },
          { "@type": "State", name: "Ohio" },
        ],
        url: `${site.url}${PATH}`,
        description: DESCRIPTION,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: site.url },
          {
            "@type": "ListItem",
            position: 2,
            name: "Web Design Cleveland",
            item: `${site.url}${PATH}`,
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* Minimal landing header */}
      <header className="fixed top-0 inset-x-0 z-50">
        <div className="container">
          <nav
            className="mt-3 flex items-center justify-between gap-3 rounded-full border border-white/[0.08] bg-ink-950/60 backdrop-blur-xl px-4 sm:px-5 h-14"
            aria-label="Primary"
          >
            <a href="/" aria-label="Leyva Web Studio — home" className="no-tap-highlight">
              <BrandMark />
            </a>
            <div className="flex items-center gap-2">
              <a
                href={`tel:${site.contact.phone}`}
                className="hidden sm:inline-flex items-center gap-2 h-10 px-3 rounded-full text-sm text-ember-50/80 hover:text-ember-50 hover:bg-white/[0.04] transition-colors no-tap-highlight"
                aria-label={`Call ${site.contact.phoneDisplay}`}
              >
                <Phone className="w-3.5 h-3.5 text-ember-300/85" />
                <span className="tabular-nums">{site.contact.phoneDisplay}</span>
              </a>
              <AnchorButton
                href={WA("Hi Leyva, I'd like a free quote for a website for my Cleveland business.")}
                target="_blank"
                rel="noopener noreferrer"
                size="sm"
                className="h-10 px-4 text-sm"
              >
                Free quote
                <ArrowUpRight className="w-4 h-4" />
              </AnchorButton>
            </div>
          </nav>
        </div>
      </header>

      <main id="main-content" className="relative">
        {/* Hero */}
        <section className="relative isolate overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-24">
          <div
            className="absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_50%_0%,rgba(236,139,42,0.18),transparent_60%)]"
            aria-hidden
          />
          <div className="container text-center">
            <Reveal>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-ember-300/25 bg-ember-300/[0.05] backdrop-blur-md text-xs sm:text-sm text-ember-50/85">
                <MapPin className="w-3.5 h-3.5 text-ember-300" />
                Cleveland, Ohio · serving local businesses across the U.S.
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="mt-7 max-w-4xl mx-auto font-display font-semibold tracking-tight text-balance text-[clamp(2.2rem,6vw,4.5rem)] leading-[1.08]">
                <span className="block text-ember-50">Premium web design in</span>
                <span className="block gradient-text pb-[0.12em]">Cleveland, Ohio.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-2xl mx-auto text-base sm:text-lg text-ember-50/75 leading-relaxed text-pretty">
                Custom websites that make local businesses look professional, rank
                in Google and turn visitors into calls and customers — ready in 14
                days. Built for restaurants, contractors, stores and local services.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto">
                <AnchorButton
                  href={WA("Hi Leyva, I want to start a website for my Cleveland business. Can you send me a quote?")}
                  target="_blank"
                  rel="noopener noreferrer"
                  size="xl"
                  className="w-full sm:w-auto"
                >
                  Start your website
                  <ArrowUpRight className="w-5 h-5" />
                </AnchorButton>
                <AnchorButton
                  href={WA("Hi Leyva, I'd like to book a free consultation about a website for my business.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  size="xl"
                  variant="secondary"
                  className="w-full sm:w-auto"
                >
                  <MessageCircle className="w-5 h-5" />
                  Book a free consultation
                </AnchorButton>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs sm:text-sm text-ember-50/65">
                <span className="inline-flex items-center gap-1.5">
                  <Star className="w-3.5 h-3.5 fill-ember-300 text-ember-300" />
                  Custom-built, no templates
                </span>
                <span className="hidden sm:block w-1 h-1 rounded-full bg-ember-50/20" />
                <span>Live in 14 days</span>
                <span className="hidden sm:block w-1 h-1 rounded-full bg-ember-50/20" />
                <span>Bilingual · English &amp; Spanish</span>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Who we help */}
        <section className="relative py-10 sm:py-14 border-y border-white/[0.06] bg-ink-950/40">
          <div className="container">
            <p className="text-center text-xs uppercase tracking-[0.22em] text-ember-50/55">
              Built for local businesses in Cleveland
            </p>
            <div className="mt-7 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {industries.map((it) => {
                const Icon = it.icon;
                return (
                  <Reveal key={it.label}>
                    <div className="flex items-center gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.02] px-4 py-3.5">
                      <span className="grid place-items-center w-9 h-9 shrink-0 rounded-xl border border-ember-300/25 bg-ember-300/[0.06] text-ember-300">
                        <Icon className="w-4 h-4" />
                      </span>
                      <span className="text-sm text-ember-50/85 font-medium leading-tight">
                        {it.label}
                      </span>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="relative py-12 sm:py-20">
          <div className="container">
            <Reveal>
              <div className="max-w-3xl mx-auto text-center">
                <p className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-ember-300/20 bg-ember-300/[0.04] text-[11px] uppercase tracking-[0.18em] text-ember-300/90">
                  What you get
                </p>
                <h2 className="mt-4 font-display font-semibold tracking-tight text-balance text-[clamp(1.9rem,4.5vw,3rem)] leading-[1.05] text-ember-50">
                  Everything a Cleveland business needs to{" "}
                  <span className="gradient-text">win online.</span>
                </h2>
              </div>
            </Reveal>
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {services.map((s, i) => {
                const Icon = s.icon;
                return (
                  <Reveal key={s.title} delay={i * 0.05}>
                    <div className="group relative h-full rounded-2xl border border-white/[0.07] bg-gradient-to-b from-white/[0.04] to-white/[0.01] p-6 sm:p-7 transition-all duration-500 hover:border-ember-300/30 shadow-card">
                      <span className="inline-grid place-items-center w-11 h-11 rounded-xl border border-ember-300/25 bg-ember-300/[0.06] text-ember-300">
                        <Icon className="w-5 h-5" />
                      </span>
                      <h3 className="mt-6 text-lg sm:text-xl font-semibold tracking-tight text-ember-50">
                        {s.title}
                      </h3>
                      <p className="mt-2 text-[15px] leading-relaxed text-ember-50/70">
                        {s.desc}
                      </p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* Real work */}
        <section className="relative py-12 sm:py-20 bg-ink-950/40">
          <div className="container">
            <Reveal>
              <div className="max-w-3xl mx-auto text-center">
                <p className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-ember-300/20 bg-ember-300/[0.04] text-[11px] uppercase tracking-[0.18em] text-ember-300/90">
                  Real work
                </p>
                <h2 className="mt-4 font-display font-semibold tracking-tight text-balance text-[clamp(1.9rem,4.5vw,3rem)] leading-[1.05] text-ember-50">
                  Sites you can{" "}
                  <span className="gradient-text">click and judge.</span>
                </h2>
                <p className="mt-4 text-base sm:text-lg text-ember-50/70 leading-relaxed">
                  One live business site plus real industry concept demos. Open any
                  of them in a new tab and see the level we deliver.
                </p>
              </div>
            </Reveal>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-5">
              {work.map((w, i) => (
                <Reveal key={w.name} delay={i * 0.06}>
                  <a
                    href={w.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${w.name} (opens in a new tab)`}
                    className="group relative block rounded-3xl border border-white/[0.07] bg-gradient-to-b from-white/[0.035] to-white/[0.01] p-5 sm:p-6 overflow-hidden transition-all duration-500 hover:border-ember-300/35 hover:-translate-y-1.5 hover:shadow-[0_25px_60px_-20px_rgba(236,139,42,0.35)] no-tap-highlight"
                  >
                    <div className="rounded-2xl border border-white/[0.07] overflow-hidden bg-ink-900 aspect-[16/10] relative">
                      <Image
                        src={w.img}
                        alt={`${w.name} — ${w.industry} website designed by Leyva Web Studio in Cleveland, Ohio`}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                      />
                    </div>
                    <div className="mt-5 flex items-start justify-between gap-4">
                      <div>
                        <p className="text-[11px] uppercase tracking-[0.18em] text-ember-300/85">
                          {w.industry}
                        </p>
                        <h3 className="mt-1 text-xl font-semibold text-ember-50">
                          {w.name}
                        </h3>
                      </div>
                      <span className="shrink-0 inline-flex items-center px-2.5 py-1 rounded-full text-[10px] uppercase tracking-[0.16em] font-medium border border-ember-300/35 bg-ember-300/[0.10] text-ember-300">
                        {w.badge}
                      </span>
                    </div>
                  </a>
                </Reveal>
              ))}
            </div>
            <Reveal>
              <p className="mt-8 text-center text-[13px] text-ember-50/55">
                Concept demos are created for presentation purposes. Brand names are
                used for demonstration only.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Pricing */}
        <section className="relative py-12 sm:py-20">
          <div className="container">
            <Reveal>
              <div className="max-w-3xl mx-auto text-center">
                <p className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-ember-300/20 bg-ember-300/[0.04] text-[11px] uppercase tracking-[0.18em] text-ember-300/90">
                  Simple pricing
                </p>
                <h2 className="mt-4 font-display font-semibold tracking-tight text-balance text-[clamp(1.9rem,4.5vw,3rem)] leading-[1.05] text-ember-50">
                  One setup to build.{" "}
                  <span className="gradient-text">A monthly plan to grow.</span>
                </h2>
              </div>
            </Reveal>
            <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-5 items-stretch">
              {packages.map((p, i) => (
                <Reveal key={p.name} delay={i * 0.06}>
                  <div
                    className={
                      p.highlight
                        ? "relative h-full rounded-3xl p-7 flex flex-col border border-ember-300/40 bg-gradient-to-b from-ember-300/[0.10] to-white/[0.015] shadow-glow"
                        : "relative h-full rounded-3xl p-7 flex flex-col border border-white/[0.07] bg-gradient-to-b from-white/[0.035] to-white/[0.01]"
                    }
                  >
                    {p.highlight && (
                      <span className="absolute top-6 right-6 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-b from-ember-200 via-ember-300 to-ember-400 text-ink-950 text-[10px] uppercase tracking-[0.18em] font-semibold">
                        <Sparkles className="w-3 h-3" />
                        Popular
                      </span>
                    )}
                    <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-ember-50">
                      {p.name}
                    </h3>
                    <div className="mt-5 flex items-end gap-2">
                      <span className="font-display text-[2rem] font-semibold text-ember-50 leading-none tabular-nums">
                        {p.setup}
                      </span>
                      <span className="text-sm text-ember-50/55 pb-1">one-time</span>
                    </div>
                    <p className="mt-1 text-sm text-ember-300/90">
                      + {p.monthly}/month care plan
                    </p>
                    <p className="mt-4 text-[13px] text-ember-50/65 leading-relaxed">
                      <span className="text-ember-50/90 font-medium">Best for: </span>
                      {p.for}
                    </p>
                    <ul className="mt-5 space-y-2 flex-1">
                      {p.points.map((pt) => (
                        <li key={pt} className="flex gap-2.5 text-sm text-ember-50/85">
                          <span className="mt-0.5 grid place-items-center w-4 h-4 rounded-full bg-ember-300/15 text-ember-300 shrink-0">
                            <Check className="w-2.5 h-2.5" />
                          </span>
                          {pt}
                        </li>
                      ))}
                    </ul>
                    <AnchorButton
                      href={WA(`Hi Leyva, I'm interested in the ${p.name} package (${p.setup} + ${p.monthly}/mo) for my Cleveland business.`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      size="lg"
                      variant={p.highlight ? "primary" : "secondary"}
                      className="w-full mt-7"
                    >
                      Get started
                      <ArrowUpRight className="w-4 h-4" />
                    </AnchorButton>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal>
              <p className="mt-6 text-center text-sm text-ember-50/55">
                Final pricing depends on scope and is confirmed after a quick call.
              </p>
            </Reveal>
          </div>
        </section>

        {/* FAQ */}
        <section className="relative py-12 sm:py-20 bg-ink-950/40">
          <div className="container">
            <Reveal>
              <div className="max-w-3xl mx-auto text-center">
                <p className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-ember-300/20 bg-ember-300/[0.04] text-[11px] uppercase tracking-[0.18em] text-ember-300/90">
                  FAQ
                </p>
                <h2 className="mt-4 font-display font-semibold tracking-tight text-balance text-[clamp(1.9rem,4.5vw,3rem)] leading-[1.05] text-ember-50">
                  Web design in Cleveland —{" "}
                  <span className="gradient-text">answers.</span>
                </h2>
              </div>
            </Reveal>
            <div className="mt-10 max-w-3xl mx-auto space-y-3">
              {faqs.map((f) => (
                <details
                  key={f.q}
                  className="group rounded-2xl border border-white/[0.07] bg-gradient-to-b from-white/[0.03] to-white/[0.01] px-5 sm:px-6 py-4 [&_summary]:list-none"
                >
                  <summary className="flex items-center justify-between gap-4 cursor-pointer text-base sm:text-lg font-medium text-ember-50/95">
                    {f.q}
                    <span className="shrink-0 grid place-items-center w-7 h-7 rounded-full border border-white/[0.10] text-ember-300 transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-sm sm:text-[15px] text-ember-50/70 leading-relaxed">
                    {f.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="relative py-14 sm:py-24">
          <div className="container">
            <div className="relative overflow-hidden rounded-3xl border border-ember-300/25 bg-gradient-to-br from-ember-300/[0.10] via-white/[0.02] to-white/[0.01] p-8 sm:p-14 text-center shadow-glow">
              <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-ember-400/[0.12] blur-3xl pointer-events-none" aria-hidden />
              <div className="relative">
                <h2 className="font-display font-semibold tracking-tight text-balance text-[clamp(1.8rem,4.5vw,3rem)] leading-[1.05] text-ember-50 max-w-2xl mx-auto">
                  Ready to get more customers from your{" "}
                  <span className="gradient-text">website?</span>
                </h2>
                <p className="mt-4 max-w-xl mx-auto text-base sm:text-lg text-ember-50/75">
                  Free consultation, no pressure. Tell us about your Cleveland
                  business and we'll send a clear plan and quote.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <AnchorButton
                    href={WA("Hi Leyva, I'd like a free website audit/quote for my Cleveland business.")}
                    target="_blank"
                    rel="noopener noreferrer"
                    size="xl"
                    className="w-full sm:w-auto"
                  >
                    Get a free quote
                    <ArrowUpRight className="w-5 h-5" />
                  </AnchorButton>
                  <a
                    href={`tel:${site.contact.phone}`}
                    className="inline-flex items-center justify-center gap-2 h-14 px-7 rounded-full border border-ember-300/30 bg-ember-300/[0.04] text-ember-50 text-[17px] hover:bg-ember-300/[0.10] transition-colors no-tap-highlight w-full sm:w-auto"
                  >
                    <Phone className="w-5 h-5 text-ember-300" />
                    {site.contact.phoneDisplay}
                  </a>
                </div>
                <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs sm:text-sm text-ember-50/60">
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-ember-300" />
                    Same-day reply
                  </span>
                  <span className="hidden sm:block w-1 h-1 rounded-full bg-ember-50/20" />
                  <a href={mailtoLink("Website quote", "Hi Leyva, I'd like a quote for my business website.")} className="hover:text-ember-300 transition-colors">
                    {site.contact.email}
                  </a>
                  <span className="hidden sm:block w-1 h-1 rounded-full bg-ember-50/20" />
                  <a href="/" className="hover:text-ember-300 transition-colors underline-offset-4 hover:underline">
                    See the full studio →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
