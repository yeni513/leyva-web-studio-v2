import type { Metadata } from "next";
import {
  ArrowDownToLine,
  BadgeDollarSign,
  CalendarClock,
  ClipboardCheck,
  MessageCircle,
  MousePointerClick,
  Search,
  Target,
} from "lucide-react";
import {
  commonInternalLinks,
  LocalSeoPage,
  type LocalSeoPageData,
} from "@/components/seo/LocalSeoPage";
import { site } from "@/lib/site";

const PATH = "/landing-pages-cleveland";
const TITLE = "Landing Pages Cleveland | Campaign Pages for Local Leads";
const DESCRIPTION =
  "Landing pages in Cleveland for local ads, seasonal offers, contractors, restaurants, beauty, cleaning, tax, notary and service businesses that need leads fast.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `${site.url}${PATH}`,
    title: TITLE,
    description: DESCRIPTION,
    siteName: `${site.brand} ${site.brandSub}`,
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: TITLE }],
  },
};

const data: LocalSeoPageData = {
  path: PATH,
  eyebrow: "Landing pages for Cleveland campaigns",
  h1: "Landing pages in Cleveland for",
  h1Accent: "offers that need leads now.",
  intro:
    "A landing page is built for one focused action: book, call, request a quote, claim an offer or send a message. For Cleveland businesses running ads, seasonal promotions or new service launches, that focus matters.",
  primaryCta: "Quote my landing page",
  primaryMessage:
    "Hi Leyva, I need a landing page for a Cleveland campaign or offer. Can you quote it?",
  secondaryMessage:
    "Hi Leyva, I want a landing page that helps generate leads for my local offer.",
  trust: [
    "Focused on one conversion goal",
    "Built for ads and local offers",
    "Fast launch path",
  ],
  audienceTitle: "Best for campaigns where every click matters",
  audiences: [
    {
      icon: BadgeDollarSign,
      title: "Seasonal offers",
      text: "Tax season, cleaning promos, restaurant catering, repair specials or appointment pushes.",
    },
    {
      icon: Target,
      title: "Paid ad traffic",
      text: "Google or Meta ad clicks need a focused page, not a busy homepage with too many choices.",
    },
    {
      icon: CalendarClock,
      title: "Event or booking pushes",
      text: "Use a focused page for pop-ups, limited-time menus, workshops, classes or appointments.",
    },
    {
      icon: ClipboardCheck,
      title: "Quote campaigns",
      text: "Contractors, home services and repair businesses can route visitors straight to quote requests.",
    },
  ],
  problemTitle: "A homepage is often too broad for a campaign.",
  problemIntro:
    "When someone clicks an ad or a seasonal offer, they need a direct answer. A focused landing page removes distractions and matches the visitor's intent.",
  problems: [
    {
      title: "Too many choices",
      text: "A general website can split attention across services, portfolio, about, FAQs and multiple CTAs.",
    },
    {
      title: "Weak message match",
      text: "If the ad says one thing but the page says everything, the visitor loses confidence.",
    },
    {
      title: "No clear conversion path",
      text: "Landing pages need a strong form, call button, WhatsApp path or booking CTA above and throughout the page.",
    },
  ],
  solutionTitle: "A page that matches the offer and pushes action.",
  solutionIntro:
    "We design landing pages around one audience, one offer and one next step so the page can support traffic from ads, email, QR codes or local search.",
  deliverables: [
    {
      icon: MousePointerClick,
      title: "Single-goal layout",
      text: "A page structured around one action: call, book, quote, message or claim the offer.",
    },
    {
      icon: Search,
      title: "Local message match",
      text: "Copy that speaks to Cleveland customers and matches the campaign promise.",
    },
    {
      icon: MessageCircle,
      title: "Lead capture",
      text: "WhatsApp, form, phone or booking paths placed where the visitor is ready.",
    },
    {
      icon: ArrowDownToLine,
      title: "Fast loading",
      text: "Built lightweight so paid clicks are not wasted waiting for a bloated page.",
    },
    {
      icon: BadgeDollarSign,
      title: "Offer framing",
      text: "Present the offer, value, proof points and constraints without sounding cheap.",
    },
    {
      icon: ClipboardCheck,
      title: "Follow-up ready",
      text: "Form and WhatsApp messages can prefill details so leads arrive with context.",
    },
  ],
  processTitle: "A tight campaign workflow.",
  process: [
    {
      title: "Define the offer",
      text: "We clarify who the page is for, what they get and what action they should take.",
    },
    {
      title: "Write for conversion",
      text: "The copy answers objections quickly and keeps the visitor moving toward the CTA.",
    },
    {
      title: "Launch and learn",
      text: "The page goes live with clean tracking paths so you can evaluate the campaign.",
    },
  ],
  internalLinks: commonInternalLinks.filter((link) => link.href !== PATH),
  faqs: [
    {
      q: "Is a landing page different from a full website?",
      a: "Yes. A website explains the business broadly. A landing page is focused on one offer, audience or campaign goal.",
    },
    {
      q: "Can a landing page be used with Google or Meta ads?",
      a: "Yes. That is one of the strongest uses. The page should match the ad promise and make the next step obvious.",
    },
    {
      q: "Do Cleveland landing pages need SEO?",
      a: "Some are mainly for ads, but clean metadata, fast loading and local context still matter for trust and quality.",
    },
  ],
  schemaName: "Landing Pages in Cleveland",
  schemaServiceType: "Landing page design",
  schemaDescription: DESCRIPTION,
};

export default function LandingPagesClevelandPage() {
  return <LocalSeoPage data={data} />;
}
