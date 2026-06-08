import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import {
  ArrowUpRight,
  Check,
  Clock,
  MapPin,
  MessageCircle,
  Phone,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
} from "lucide-react";
import { BrandMark } from "@/components/brand";
import { AnchorButton } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { Footer } from "@/components/sections/Footer";
import { site, whatsappLink, mailtoLink } from "@/lib/site";

export interface SeoLink {
  href: string;
  label: string;
}

export interface SeoCard {
  title: string;
  text: string;
}

export interface SeoIconCard extends SeoCard {
  icon: LucideIcon;
}

export interface SeoFaq {
  q: string;
  a: string;
}

export interface LocalSeoPageData {
  path: string;
  eyebrow: string;
  h1: string;
  h1Accent: string;
  intro: string;
  primaryCta: string;
  primaryMessage: string;
  secondaryMessage: string;
  trust: string[];
  audienceTitle: string;
  audiences: SeoIconCard[];
  problemTitle: string;
  problemIntro: string;
  problems: SeoCard[];
  solutionTitle: string;
  solutionIntro: string;
  deliverables: SeoIconCard[];
  processTitle: string;
  process: SeoCard[];
  internalLinks: SeoLink[];
  faqs: SeoFaq[];
  schemaName: string;
  schemaServiceType: string;
  schemaDescription: string;
}

export function LocalSeoPage({ data }: { data: LocalSeoPageData }) {
  const pageUrl = `${site.url}${data.path}`;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        name: data.schemaName,
        serviceType: data.schemaServiceType,
        provider: { "@id": `${site.url}#business` },
        areaServed: [
          { "@type": "City", name: "Cleveland, Ohio" },
          { "@type": "AdministrativeArea", name: "Cuyahoga County, Ohio" },
          { "@type": "State", name: "Ohio" },
        ],
        url: pageUrl,
        description: data.schemaDescription,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: site.url },
          {
            "@type": "ListItem",
            position: 2,
            name: data.schemaName,
            item: pageUrl,
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: data.faqs.map((f) => ({
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

      <header className="fixed top-0 inset-x-0 z-50">
        <div className="container">
          <nav
            className="mt-3 flex items-center justify-between gap-3 rounded-full border border-white/[0.08] bg-ink-950/70 backdrop-blur-xl px-4 sm:px-5 h-14 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.8)]"
            aria-label="Service page navigation"
          >
            <Link
              href="/"
              aria-label="Leyva Web Studio - home"
              className="no-tap-highlight"
            >
              <BrandMark />
            </Link>
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
                href={whatsappLink(data.primaryMessage)}
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
        <section className="relative isolate overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-24">
          <div
            className="absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_50%_0%,rgba(236,139,42,0.18),transparent_60%)]"
            aria-hidden
          />
          <div className="container text-center">
            <Reveal>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-ember-300/25 bg-ember-300/[0.05] backdrop-blur-md text-xs sm:text-sm text-ember-50/85">
                <MapPin className="w-3.5 h-3.5 text-ember-300" />
                {data.eyebrow}
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="mt-7 max-w-5xl mx-auto font-display font-semibold tracking-tight text-balance text-[clamp(2.15rem,6vw,4.8rem)] leading-[1.08]">
                <span className="block text-ember-50">{data.h1}</span>
                <span className="block gradient-text pb-[0.12em]">
                  {data.h1Accent}
                </span>
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-3xl mx-auto text-base sm:text-lg text-ember-50/75 leading-relaxed text-pretty">
                {data.intro}
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3">
                <AnchorButton
                  href={whatsappLink(data.primaryMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  size="xl"
                  className="w-full sm:w-auto"
                >
                  {data.primaryCta}
                  <ArrowUpRight className="w-5 h-5" />
                </AnchorButton>
                <Link
                  href="/#contact"
                  className="no-tap-highlight inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium tracking-tight transition-all duration-300 border border-ember-300/30 bg-ember-300/[0.04] text-ember-50 hover:bg-ember-300/[0.10] hover:border-ember-300/55 backdrop-blur-md active:scale-[0.98] h-14 px-7 text-[17px] w-full sm:w-auto"
                >
                  Contact form
                  <MessageCircle className="w-5 h-5" />
                </Link>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs sm:text-sm text-ember-50/65">
                {data.trust.map((item, i) => (
                  <span key={item} className="contents">
                    {i > 0 && (
                      <span className="hidden sm:block w-1 h-1 rounded-full bg-ember-50/20" />
                    )}
                    <span className="inline-flex items-center gap-1.5">
                      {i === 0 && (
                        <Star className="w-3.5 h-3.5 fill-ember-300 text-ember-300" />
                      )}
                      {item}
                    </span>
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <section className="relative py-10 sm:py-14 border-y border-white/[0.06] bg-ink-950/40">
          <div className="container">
            <p className="text-center text-xs uppercase tracking-[0.22em] text-ember-50/55">
              {data.audienceTitle}
            </p>
            <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {data.audiences.map((it) => {
                const Icon = it.icon;
                return (
                  <Reveal key={it.title}>
                    <article className="h-full rounded-2xl border border-white/[0.07] bg-white/[0.02] px-4 py-4">
                      <span className="grid place-items-center w-10 h-10 shrink-0 rounded-xl border border-ember-300/25 bg-ember-300/[0.06] text-ember-300">
                        <Icon className="w-4 h-4" />
                      </span>
                      <h2 className="mt-4 text-base font-semibold text-ember-50">
                        {it.title}
                      </h2>
                      <p className="mt-2 text-sm leading-relaxed text-ember-50/65">
                        {it.text}
                      </p>
                    </article>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        <ContentBand
          eyebrow="Local reality"
          title={data.problemTitle}
          intro={data.problemIntro}
          cards={data.problems}
        />

        <section className="relative py-12 sm:py-20 bg-ink-950/40">
          <div className="container">
            <Reveal>
              <div className="max-w-3xl mx-auto text-center">
                <p className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-ember-300/20 bg-ember-300/[0.04] text-[11px] uppercase tracking-[0.18em] text-ember-300/90">
                  What we build
                </p>
                <h2 className="mt-4 font-display font-semibold tracking-tight text-balance text-[clamp(1.9rem,4.5vw,3rem)] leading-[1.05] text-ember-50">
                  {data.solutionTitle}
                </h2>
                <p className="mt-4 text-base sm:text-lg text-ember-50/70 leading-relaxed">
                  {data.solutionIntro}
                </p>
              </div>
            </Reveal>
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {data.deliverables.map((item, i) => {
                const Icon = item.icon;
                return (
                  <Reveal key={item.title} delay={i * 0.04}>
                    <article className="group relative h-full rounded-2xl border border-white/[0.07] bg-gradient-to-b from-white/[0.04] to-white/[0.01] p-6 sm:p-7 transition-all duration-500 hover:border-ember-300/30 shadow-card">
                      <span className="inline-grid place-items-center w-11 h-11 rounded-xl border border-ember-300/25 bg-ember-300/[0.06] text-ember-300">
                        <Icon className="w-5 h-5" />
                      </span>
                      <h3 className="mt-6 text-lg sm:text-xl font-semibold tracking-tight text-ember-50">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-[15px] leading-relaxed text-ember-50/70">
                        {item.text}
                      </p>
                    </article>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        <ContentBand
          eyebrow="Process"
          title={data.processTitle}
          intro="The work is structured so a local owner can make decisions quickly without getting buried in agency jargon."
          cards={data.process}
          numbered
        />

        <section className="relative py-12 sm:py-20 bg-ink-950/40">
          <div className="container">
            <Reveal>
              <div className="max-w-3xl mx-auto text-center">
                <p className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-ember-300/20 bg-ember-300/[0.04] text-[11px] uppercase tracking-[0.18em] text-ember-300/90">
                  Related services
                </p>
                <h2 className="mt-4 font-display font-semibold tracking-tight text-balance text-[clamp(1.9rem,4.5vw,3rem)] leading-[1.05] text-ember-50">
                  Keep exploring the local growth system.
                </h2>
              </div>
            </Reveal>
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <LinkCard href="/" label="Main studio site" />
              {data.internalLinks.map((link) => (
                <LinkCard key={link.href} href={link.href} label={link.label} />
              ))}
            </div>
          </div>
        </section>

        <section className="relative py-12 sm:py-20">
          <div className="container">
            <Reveal>
              <div className="max-w-3xl mx-auto text-center">
                <p className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-ember-300/20 bg-ember-300/[0.04] text-[11px] uppercase tracking-[0.18em] text-ember-300/90">
                  FAQ
                </p>
                <h2 className="mt-4 font-display font-semibold tracking-tight text-balance text-[clamp(1.9rem,4.5vw,3rem)] leading-[1.05] text-ember-50">
                  Questions Cleveland owners ask before starting.
                </h2>
              </div>
            </Reveal>
            <div className="mt-10 max-w-3xl mx-auto space-y-3">
              {data.faqs.map((f) => (
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

        <section className="relative py-14 sm:py-24">
          <div className="container">
            <div className="relative overflow-hidden rounded-3xl border border-ember-300/25 bg-gradient-to-br from-ember-300/[0.10] via-white/[0.02] to-white/[0.01] p-8 sm:p-14 text-center shadow-glow">
              <div
                className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-ember-400/[0.12] blur-3xl pointer-events-none"
                aria-hidden
              />
              <div className="relative">
                <h2 className="font-display font-semibold tracking-tight text-balance text-[clamp(1.8rem,4.5vw,3rem)] leading-[1.05] text-ember-50 max-w-2xl mx-auto">
                  Want a Cleveland site that feels serious before the first call?
                </h2>
                <p className="mt-4 max-w-xl mx-auto text-base sm:text-lg text-ember-50/75">
                  Send a quick message with your business type, city, and what you
                  need the website to do. We will respond with a clear next step.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <AnchorButton
                    href={whatsappLink(data.secondaryMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    size="xl"
                    className="w-full sm:w-auto"
                  >
                    Talk on WhatsApp
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
                  <a
                    href={mailtoLink(
                      "Website quote",
                      "Hi Leyva, I would like a quote for my Cleveland business.",
                    )}
                    className="hover:text-ember-300 transition-colors"
                  >
                    {site.contact.email}
                  </a>
                  <span className="hidden sm:block w-1 h-1 rounded-full bg-ember-50/20" />
                  <Link
                    href="/"
                    className="hover:text-ember-300 transition-colors underline-offset-4 hover:underline"
                  >
                    See the full studio
                  </Link>
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

function ContentBand({
  eyebrow,
  title,
  intro,
  cards,
  numbered,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  cards: SeoCard[];
  numbered?: boolean;
}) {
  return (
    <section className="relative py-12 sm:py-20">
      <div className="container">
        <Reveal>
          <div className="max-w-3xl mx-auto text-center">
            <p className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-ember-300/20 bg-ember-300/[0.04] text-[11px] uppercase tracking-[0.18em] text-ember-300/90">
              {eyebrow}
            </p>
            <h2 className="mt-4 font-display font-semibold tracking-tight text-balance text-[clamp(1.9rem,4.5vw,3rem)] leading-[1.05] text-ember-50">
              {title}
            </h2>
            <p className="mt-4 text-base sm:text-lg text-ember-50/70 leading-relaxed">
              {intro}
            </p>
          </div>
        </Reveal>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
          {cards.map((card, i) => (
            <Reveal key={card.title} delay={i * 0.05}>
              <article className="h-full rounded-2xl border border-white/[0.07] bg-gradient-to-b from-white/[0.035] to-white/[0.01] p-6">
                <div className="flex items-center gap-3">
                  <span className="grid place-items-center w-9 h-9 rounded-full border border-ember-300/25 bg-ember-300/[0.06] text-ember-300">
                    {numbered ? (
                      <span className="font-mono text-xs tabular-nums">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    ) : (
                      <Check className="w-4 h-4" />
                    )}
                  </span>
                  <h3 className="text-lg font-semibold text-ember-50">
                    {card.title}
                  </h3>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-ember-50/68">
                  {card.text}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function LinkCard({ href, label }: SeoLink) {
  return (
    <Link
      href={href}
      className="group flex items-center justify-between gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.02] px-4 py-4 text-ember-50/85 hover:text-ember-50 hover:border-ember-300/35 hover:bg-ember-300/[0.06] transition-colors"
    >
      <span className="text-sm font-medium">{label}</span>
      <ArrowUpRight className="w-4 h-4 text-ember-300 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </Link>
  );
}

export const commonTrust = [
  "Built for Cleveland businesses",
  "No templates or page-builders",
  "Bilingual English / Spanish",
];

export const commonInternalLinks: SeoLink[] = [
  { href: "/web-design-cleveland", label: "Web design Cleveland" },
  { href: "/seo-local-cleveland", label: "Local SEO Cleveland" },
  { href: "/websites-for-restaurants", label: "Restaurant websites" },
  { href: "/small-business-web-design", label: "Small business web design" },
  { href: "/landing-pages-cleveland", label: "Landing pages Cleveland" },
];

export const commonDeliverableIcons = {
  search: Search,
  shield: ShieldCheck,
  sparkle: Sparkles,
  message: MessageCircle,
  map: MapPin,
};
