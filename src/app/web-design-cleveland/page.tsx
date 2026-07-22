import type { Metadata } from "next";
import {
  Building2,
  HardHat,
  Scissors,
  ShoppingBag,
  UtensilsCrossed,
  Wrench,
} from "lucide-react";
import {
  commonDeliverableIcons,
  commonInternalLinks,
  commonTrust,
  LocalSeoPage,
  type LocalSeoPageData,
} from "@/components/seo/LocalSeoPage";
import { site } from "@/lib/site";

const PATH = "/web-design-cleveland";
const TITLE =
  "Web Design Cleveland, Ohio | Premium Small Business Websites";
const DESCRIPTION =
  "Premium web design in Cleveland for restaurants, contractors, beauty, cleaning, repair, tax, notary and local service businesses that need more calls and better clients.";

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
  eyebrow: "Premium web design for Cleveland, OH",
  h1: "Web design in Cleveland for",
  h1Accent: "serious local businesses.",
  intro:
    "Leyva Web Studio builds custom websites for Cleveland owners who need to look professional fast: restaurants, contractors, cleaning companies, beauty studios, repair shops, notaries, tax preparers and neighborhood service businesses. The goal is simple: make the business easier to trust, easier to contact and easier to choose.",
  primaryCta: "Get a Cleveland website quote",
  primaryMessage:
    "Hi Leyva, I need a website for my Cleveland business. Can you send me a quote?",
  secondaryMessage:
    "Hi Leyva, I would like to talk about a premium website for my Cleveland business.",
  trust: commonTrust,
  audienceTitle: "Built for owners who need trust before the first call",
  audiences: [
    {
      icon: UtensilsCrossed,
      title: "Restaurants and food",
      text: "Menus, photos, catering, hours and one-tap calls for diners deciding where to eat tonight.",
    },
    {
      icon: HardHat,
      title: "Contractors and trades",
      text: "Service pages, project proof and quote flows for roofers, remodelers, landscaping and home services.",
    },
    {
      icon: Scissors,
      title: "Beauty and appointments",
      text: "Clear services, pricing context and booking paths for barbers, salons, spas and wellness studios.",
    },
    {
      icon: Building2,
      title: "Local offices",
      text: "Professional pages for notaries, tax preparers, insurance offices and independent local professionals.",
    },
  ],
  problemTitle: "Cleveland customers compare you before they call.",
  problemIntro:
    "A basic website can make a real business look smaller than it is. Local customers often check Google, scan a site on mobile and decide in seconds whether the business feels legitimate.",
  problems: [
    {
      title: "Your first impression is happening on mobile",
      text: "Many Cleveland searches happen between errands, lunch breaks or after work. If the site feels slow or confusing, the next competitor is one tap away.",
    },
    {
      title: "Local trust needs specifics",
      text: "Customers want to see what you do, where you serve, how to contact you and why they should believe you. Generic copy does not answer that.",
    },
    {
      title: "Design has to support conversion",
      text: "Premium visuals matter, but the site also needs strong calls to action, service context, contact options and a path to quote or book.",
    },
  ],
  solutionTitle: "A website built like a local sales tool.",
  solutionIntro:
    "Every page is planned around the action you need: calls, WhatsApp messages, quote requests, reservations, bookings or visits to your storefront.",
  deliverables: [
    {
      icon: commonDeliverableIcons.sparkle,
      title: "Custom visual direction",
      text: "A premium dark visual system, structured around your business instead of a reused template.",
    },
    {
      icon: commonDeliverableIcons.search,
      title: "Local SEO foundation",
      text: "Metadata, headings, schema, internal links and Cleveland-oriented copy built into the site from the start.",
    },
    {
      icon: commonDeliverableIcons.message,
      title: "Lead capture paths",
      text: "WhatsApp, phone, form and email flows that make it easy for a prospect to take the next step.",
    },
    {
      icon: Wrench,
      title: "Monthly care",
      text: "Hosting, updates, small edits and technical checks so the website does not go stale after launch.",
    },
    {
      icon: ShoppingBag,
      title: "Service and product clarity",
      text: "Clear sections for menus, service areas, offers, packages, galleries, catalogs or appointment paths.",
    },
    {
      icon: commonDeliverableIcons.shield,
      title: "Ownership clarity",
      text: "Your domain stays in your name and the project terms stay clear from the beginning.",
    },
  ],
  processTitle: "A practical process for busy Cleveland owners.",
  process: [
    {
      title: "Discovery",
      text: "We map your business type, customer, service area and the fastest path from visitor to lead.",
    },
    {
      title: "Design and copy",
      text: "We shape the page structure, message and visual direction before development starts.",
    },
    {
      title: "Build and launch",
      text: "The site is built in Next.js, connected to your domain and launched with analytics and SEO basics in place.",
    },
  ],
  internalLinks: commonInternalLinks.filter((link) => link.href !== PATH),
  faqs: [
    {
      q: "Do you only build websites for Cleveland businesses?",
      a: "Cleveland is the primary local market, but Leyva Web Studio also works remotely with businesses across Ohio, the U.S. and LATAM.",
    },
    {
      q: "What makes this different from a template website?",
      a: "The structure, copy and design are planned around your business and customer. A template usually starts with a layout; we start with what needs to convert.",
    },
    {
      q: "Can the website include local SEO?",
      a: "Yes. Local SEO foundations are part of the build: metadata, page structure, internal links, schema and content written around your service area.",
    },
  ],
  schemaName: "Web Design in Cleveland, Ohio",
  schemaServiceType: "Custom web design and development",
  schemaDescription: DESCRIPTION,
};

export default function ClevelandWebDesignPage() {
  return <LocalSeoPage data={data} />;
}
