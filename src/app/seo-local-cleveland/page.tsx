import type { Metadata } from "next";
import {
  Building2,
  FileText,
  MapPin,
  Search,
  ShieldCheck,
  Sparkles,
  Store,
  Wrench,
} from "lucide-react";
import {
  commonDeliverableIcons,
  commonInternalLinks,
  LocalSeoPage,
  type LocalSeoPageData,
} from "@/components/seo/LocalSeoPage";
import { site } from "@/lib/site";

const PATH = "/seo-local-cleveland";
const TITLE = "Local SEO Cleveland | Google-Ready Websites for Local Businesses";
const DESCRIPTION =
  "Local SEO in Cleveland for restaurants, contractors, service businesses, tax offices, notaries, beauty studios and small businesses that need to show up and convert.";

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
  eyebrow: "Local SEO foundation for Cleveland businesses",
  h1: "Local SEO in Cleveland that makes your",
  h1Accent: "business easier to find.",
  intro:
    "Local SEO is not just stuffing city names into a page. For a Cleveland business, it means building a website that clearly explains what you do, where you serve, why customers should trust you and how Google can understand the business.",
  primaryCta: "Ask about local SEO",
  primaryMessage:
    "Hi Leyva, I want to improve local SEO for my Cleveland business. Can you review what I need?",
  secondaryMessage:
    "Hi Leyva, I need help with local SEO and a better website for my Cleveland business.",
  trust: [
    "Built around Cleveland search intent",
    "Website + Google Business Profile strategy",
    "No fake ranking promises",
  ],
  audienceTitle: "Useful for service-area and storefront businesses",
  audiences: [
    {
      icon: Wrench,
      title: "Home and repair services",
      text: "Plumbing, electrical, appliance repair, cleaning, landscaping and contractors that need service-area clarity.",
    },
    {
      icon: Store,
      title: "Shops and restaurants",
      text: "Local storefronts that need hours, menus, photos, location context and clear calls to visit or order.",
    },
    {
      icon: Building2,
      title: "Professional offices",
      text: "Tax preparers, notaries, insurance offices and consultants that need trust before a prospect calls.",
    },
    {
      icon: Sparkles,
      title: "Beauty and wellness",
      text: "Barbers, salons, spas and gyms that depend on location, appointment intent and mobile-first booking.",
    },
  ],
  problemTitle: "Google needs more than a nice homepage.",
  problemIntro:
    "A local business can look good and still be hard to understand in search. The site needs structured content, specific service pages, local signals and a clean conversion path.",
  problems: [
    {
      title: "Weak service context",
      text: "If the site does not clearly explain each service, Google and customers both have less to work with.",
    },
    {
      title: "Thin local relevance",
      text: "A Cleveland phone number is not enough. The content should reflect service areas, common customer needs and local buying behavior.",
    },
    {
      title: "Traffic without conversion",
      text: "Ranking helps, but local SEO should lead to calls, forms, bookings or WhatsApp messages, not just page views.",
    },
  ],
  solutionTitle: "A local SEO structure built into the website.",
  solutionIntro:
    "We build the technical and content foundation first, then connect it to conversion-focused pages that are useful to real customers.",
  deliverables: [
    {
      icon: Search,
      title: "Keyword and intent mapping",
      text: "Map services to real search intent: emergency repair, restaurant menu, tax help, notary appointment or contractor quote.",
    },
    {
      icon: MapPin,
      title: "Service-area clarity",
      text: "Explain Cleveland, Cuyahoga County and nearby service areas without turning the page into awkward keyword stuffing.",
    },
    {
      icon: FileText,
      title: "Page structure",
      text: "Headings, internal links, metadata and sections planned so each page has a clear job.",
    },
    {
      icon: commonDeliverableIcons.shield,
      title: "Schema basics",
      text: "Safe service, FAQ and breadcrumb schema on local SEO pages where it fits.",
    },
    {
      icon: commonDeliverableIcons.message,
      title: "Lead paths",
      text: "Phone, WhatsApp and contact flows placed where local visitors are ready to act.",
    },
    {
      icon: ShieldCheck,
      title: "No fake guarantees",
      text: "We do not promise exact rankings. We build a serious foundation that gives your business a stronger chance.",
    },
  ],
  processTitle: "Local SEO without the mystery.",
  process: [
    {
      title: "Audit the current signals",
      text: "We look at the website, business type, service areas, page structure and obvious gaps.",
    },
    {
      title: "Build focused pages",
      text: "We create useful pages for services, industries and local intent instead of generic SEO filler.",
    },
    {
      title: "Connect search to leads",
      text: "Each SEO page includes CTAs, internal links and a clear path to quote, call or book.",
    },
  ],
  internalLinks: commonInternalLinks.filter((link) => link.href !== PATH),
  faqs: [
    {
      q: "Can you guarantee first place on Google in Cleveland?",
      a: "No. Nobody can honestly guarantee a specific ranking. We can build a stronger local SEO foundation with better structure, content, internal links and technical basics.",
    },
    {
      q: "Do I need local SEO if I already have Google Business Profile?",
      a: "Yes. Your website and Google Business Profile should support each other. A stronger site gives customers more context and gives Google clearer information about the business.",
    },
    {
      q: "What businesses benefit most from local SEO?",
      a: "Restaurants, contractors, repair shops, cleaning companies, beauty studios, tax offices, notaries and service-area businesses usually benefit because customers search with local intent.",
    },
  ],
  schemaName: "Local SEO in Cleveland",
  schemaServiceType: "Local SEO and website structure",
  schemaDescription: DESCRIPTION,
};

export default function LocalSeoClevelandPage() {
  return <LocalSeoPage data={data} />;
}
